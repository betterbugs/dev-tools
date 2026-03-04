"use client";

import React, { useState, useCallback, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button, Switch, Tooltip, message } from "antd";
import { CopySimple, Trash, Code, ArrowsLeftRight } from "@phosphor-icons/react";

// ─── HTML → JSX Attribute Mapping ────────────────────────────────────────────

/**
 * Maps lowercase HTML attribute names to their JSX equivalents.
 * Only attributes that differ from their lowercase HTML form are listed.
 */
const HTML_ATTR_TO_JSX: Record<string, string> = {
  // Core renames
  class: "className",
  for: "htmlFor",

  // Casing corrections
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  minlength: "minLength",
  cellspacing: "cellSpacing",
  cellpadding: "cellPadding",
  rowspan: "rowSpan",
  colspan: "colSpan",
  usemap: "useMap",
  frameborder: "frameBorder",
  contenteditable: "contentEditable",
  crossorigin: "crossOrigin",
  enctype: "encType",
  accesskey: "accessKey",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  novalidate: "noValidate",
  srcset: "srcSet",
  "http-equiv": "httpEquiv",
  allowfullscreen: "allowFullScreen",
  spellcheck: "spellCheck",
  autocomplete: "autoComplete",
  defaultvalue: "defaultValue",
  defaultchecked: "defaultChecked",
};

/**
 * Explicit mapping of every standard HTML event attribute to its React/JSX
 * equivalent.
 *
 * This lookup is required because HTML event names are fully lowercase
 * (e.g. "onmouseenter") while React uses camelCase with word boundaries that
 * cannot be inferred without prior knowledge ("onMouseEnter").
 *
 * Unknown / custom events not in this table fall back to just uppercasing the
 * first character after "on", which is correct for simple single-word events
 * like "onclick" → "onClick".
 */
const HTML_EVENT_TO_JSX: Record<string, string> = {
  onabort: "onAbort",
  onanimationend: "onAnimationEnd",
  onanimationiteration: "onAnimationIteration",
  onanimationstart: "onAnimationStart",
  onblur: "onBlur",
  oncanplay: "onCanPlay",
  oncanplaythrough: "onCanPlayThrough",
  onchange: "onChange",
  onclick: "onClick",
  oncompositionend: "onCompositionEnd",
  oncompositionstart: "onCompositionStart",
  oncompositionupdate: "onCompositionUpdate",
  oncontextmenu: "onContextMenu",
  oncopy: "onCopy",
  oncut: "onCut",
  ondblclick: "onDoubleClick",
  ondrag: "onDrag",
  ondragend: "onDragEnd",
  ondragenter: "onDragEnter",
  ondragexit: "onDragExit",
  ondragleave: "onDragLeave",
  ondragover: "onDragOver",
  ondragstart: "onDragStart",
  ondrop: "onDrop",
  ondurationchange: "onDurationChange",
  onemptied: "onEmptied",
  onencrypted: "onEncrypted",
  onended: "onEnded",
  onerror: "onError",
  onfocus: "onFocus",
  onfocusin: "onFocusIn",
  onfocusout: "onFocusOut",
  oninput: "onInput",
  oninvalid: "onInvalid",
  onkeydown: "onKeyDown",
  onkeypress: "onKeyPress",
  onkeyup: "onKeyUp",
  onload: "onLoad",
  onloadeddata: "onLoadedData",
  onloadedmetadata: "onLoadedMetadata",
  onloadstart: "onLoadStart",
  onmousedown: "onMouseDown",
  onmouseenter: "onMouseEnter",
  onmouseleave: "onMouseLeave",
  onmousemove: "onMouseMove",
  onmouseout: "onMouseOut",
  onmouseover: "onMouseOver",
  onmouseup: "onMouseUp",
  onpaste: "onPaste",
  onpause: "onPause",
  onplay: "onPlay",
  onplaying: "onPlaying",
  onpointercancel: "onPointerCancel",
  onpointerdown: "onPointerDown",
  onpointerenter: "onPointerEnter",
  onpointerleave: "onPointerLeave",
  onpointermove: "onPointerMove",
  onpointerout: "onPointerOut",
  onpointerover: "onPointerOver",
  onpointerup: "onPointerUp",
  onprogress: "onProgress",
  onratechange: "onRateChange",
  onreset: "onReset",
  onscroll: "onScroll",
  onseeked: "onSeeked",
  onseeking: "onSeeking",
  onselect: "onSelect",
  onstalled: "onStalled",
  onsubmit: "onSubmit",
  onsuspend: "onSuspend",
  ontimeupdate: "onTimeUpdate",
  ontouchcancel: "onTouchCancel",
  ontouchend: "onTouchEnd",
  ontouchmove: "onTouchMove",
  ontouchstart: "onTouchStart",
  ontransitionend: "onTransitionEnd",
  onvolumechange: "onVolumeChange",
  onwaiting: "onWaiting",
  onwheel: "onWheel",
};

/**
 * HTML void (self-closing) elements. In JSX these must be written as
 * <tag ... /> rather than <tag ...></tag>.
 */
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

/**
 * Boolean HTML attributes whose presence (with no value, or with a value equal
 * to their own name) implies `true`. In JSX these are emitted as bare attribute
 * names, e.g. `disabled` rather than `disabled={true}`.
 */
const BOOLEAN_ATTRS = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "readonly",
  "required",
  "reversed",
  "selected",
]);

/**
 * Numeric JSX attributes whose values are emitted as JSX expressions {n}
 * rather than quoted strings "n".
 */
const NUMERIC_JSX_ATTRS = new Set([
  "tabIndex",
  "rowSpan",
  "colSpan",
  "size",
  "span",
  "start",
  "cols",
  "rows",
]);

// ─── Conversion Helpers ───────────────────────────────────────────────────────

/**
 * Converts a CSS property name from kebab-case to camelCase, correctly
 * handling all vendor prefixes (-webkit-, -moz-, -ms-, -o-).
 *
 * Examples:
 *   "font-size"         → "fontSize"
 *   "-webkit-transform" → "WebkitTransform"
 *   "-moz-border-radius"→ "MozBorderRadius"
 *   "-ms-flex"          → "msFlex"   (React convention: ms is lowercase)
 *   "--my-var"          → "--my-var" (CSS custom properties stay unchanged)
 */
function cssToCamelCase(prop: string): string {
  // CSS custom properties stay as-is
  if (prop.startsWith("--")) return prop;

  /**
   * Camelcases `rest` (the portion after the vendor prefix):
   *   "transform"        → "Transform"
   *   "border-radius"    → "BorderRadius"
   */
  const camelRest = (rest: string): string =>
    rest.charAt(0).toUpperCase() +
    rest.slice(1).replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());

  if (prop.startsWith("-webkit-")) return "Webkit" + camelRest(prop.slice(8));
  if (prop.startsWith("-moz-"))    return "Moz"    + camelRest(prop.slice(5));
  if (prop.startsWith("-o-"))      return "O"      + camelRest(prop.slice(3));

  // -ms- is special: React uses lowercase "ms" prefix (not "Ms")
  if (prop.startsWith("-ms-")) return "ms" + camelRest(prop.slice(4));

  return prop.replace(/-([a-z])/g, (_: string, c: string) => c.toUpperCase());
}

/**
 * Converts an inline CSS style string into a JSX style object literal string.
 *
 * Examples:
 *   'color: red; font-size: 14px'
 *     → "{{ color: 'red', fontSize: '14px' }}"
 *
 *   'background: url(https://example.com/a:b.png); padding: 0'
 *     → "{{ background: 'url(https://example.com/a:b.png)', padding: '0' }}"
 *
 * The first `:` in each `;`-separated declaration is used as the
 * property/value boundary so that values containing colons (like URLs) are
 * preserved intact.
 */
function styleStringToJsxObject(styleStr: string): string {
  const entries: string[] = [];

  styleStr.split(";").forEach((declaration) => {
    const colonIdx = declaration.indexOf(":");
    if (colonIdx === -1) return;

    const prop  = declaration.slice(0, colonIdx).trim();
    const value = declaration.slice(colonIdx + 1).trim();

    if (!prop || !value) return;

    const camelProp    = cssToCamelCase(prop);
    const escapedValue = value
      .replace(/\\/g, "\\\\") // escape backslashes first
      .replace(/'/g, "\\'");  // then escape single quotes

    entries.push(`${camelProp}: '${escapedValue}'`);
  });

  if (entries.length === 0) return "{{}}";
  return `{{ ${entries.join(", ")} }}`;
}

/**
 * Converts an HTML attribute name to its JSX equivalent.
 *
 * Rules (applied in order):
 *  1. Explicit HTML-to-JSX attribute map  (class → className, etc.)
 *  2. Explicit HTML-to-JSX event map      (onmouseenter → onMouseEnter, etc.)
 *  3. Fallback for unknown event names    (capitalise char after "on")
 *  4. aria-* and data-* keep their hyphens
 *  5. Anything else is lowercased as-is
 */
function attrNameToJsx(name: string): string {
  const lower = name.toLowerCase();

  if (HTML_ATTR_TO_JSX[lower])  return HTML_ATTR_TO_JSX[lower];
  if (HTML_EVENT_TO_JSX[lower]) return HTML_EVENT_TO_JSX[lower];

  // Fallback for unknown / future event attributes
  if (lower.startsWith("on") && lower.length > 2) {
    return "on" + lower.charAt(2).toUpperCase() + lower.slice(3);
  }

  // aria-* and data-* keep their hyphens (React supports them natively)
  if (lower.startsWith("aria-") || lower.startsWith("data-")) return lower;

  return lower;
}

/**
 * Converts a single DOM `Attr` to its JSX attribute string representation.
 *
 * @param attr           The DOM attribute to convert
 * @param convertStyles  Whether to convert inline style strings to JS objects
 */
function attrToJsx(attr: Attr, convertStyles: boolean): string {
  const jsxName   = attrNameToJsx(attr.name);
  const htmlValue = attr.value;

  // ── Style attribute ──────────────────────────────────────────────────────
  if (attr.name === "style" && convertStyles) {
    return `${jsxName}=${styleStringToJsxObject(htmlValue)}`;
  }

  // ── Boolean attributes ───────────────────────────────────────────────────
  // e.g. <input disabled>  or  <input disabled="disabled">  →  disabled
  if (
    BOOLEAN_ATTRS.has(attr.name.toLowerCase()) &&
    (htmlValue === "" || htmlValue === attr.name.toLowerCase())
  ) {
    return jsxName;
  }

  // ── Numeric values for known numeric JSX props ───────────────────────────
  // e.g. tabindex="3" → tabIndex={3}
  if (NUMERIC_JSX_ATTRS.has(jsxName) && /^\d+$/.test(htmlValue)) {
    return `${jsxName}={${htmlValue}}`;
  }

  // ── Default: quoted string ───────────────────────────────────────────────
  // Escape any double-quotes inside the value to avoid breaking JSX attributes
  const escapedValue = htmlValue.replace(/"/g, "&quot;");
  return `${jsxName}="${escapedValue}"`;
}

/**
 * Recursively serialises a DOM `ChildNode` (and all its descendants) to JSX.
 *
 * @param node           DOM node to serialise
 * @param indent         Current indentation string (spaces only)
 * @param convertStyles  Whether to convert inline style strings to JS objects
 * @returns              JSX string for this node (may be multi-line)
 */
function nodeToJsxString(
  node: ChildNode,
  indent: string,
  convertStyles: boolean
): string {
  // ── Text nodes ────────────────────────────────────────────────────────────
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";

    // Drop whitespace-only text nodes that exist only due to HTML formatting
    if (!text.trim()) return "";

    // In JSX, bare { and } inside text content are syntax errors; escape them
    return text
      .trim()
      .replace(/\{/g, "{'{'}")
      .replace(/\}/g, "{'}'}");
  }

  // ── Comment nodes → JSX block comments ───────────────────────────────────
  if (node.nodeType === Node.COMMENT_NODE) {
    const commentText = (node.textContent ?? "").trim();
    return `{/* ${commentText} */}`;
  }

  // ── Element nodes ─────────────────────────────────────────────────────────
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el  = node as Element;
    const tag = el.tagName.toLowerCase();

    // Build the attribute string
    const attrParts = Array.from(el.attributes).map((attr) =>
      attrToJsx(attr, convertStyles)
    );
    const attrStr = attrParts.length > 0 ? " " + attrParts.join(" ") : "";

    // Void (self-closing) elements never have children in JSX
    if (VOID_ELEMENTS.has(tag)) {
      return `<${tag}${attrStr} />`;
    }

    // Process children recursively
    const childIndent  = indent + "  ";
    const childResults = Array.from(el.childNodes)
      .map((c) => nodeToJsxString(c, childIndent, convertStyles))
      .filter((s) => s !== "");

    // Empty element
    if (childResults.length === 0) {
      return `<${tag}${attrStr}></${tag}>`;
    }

    // Single short child with no embedded newlines → keep inline for readability
    const inlineCandidate = `<${tag}${attrStr}>${childResults[0]}</${tag}>`;
    if (
      childResults.length === 1 &&
      !childResults[0].includes("\n") &&
      inlineCandidate.length <= 80
    ) {
      return inlineCandidate;
    }

    // Multi-child or long single-child → expand to multiple indented lines
    const childLines = childResults.map((c) => childIndent + c).join("\n");
    return `<${tag}${attrStr}>\n${childLines}\n${indent}</${tag}>`;
  }

  // Ignore all other node types (processing instructions, CDATA, etc.)
  return "";
}

// ─── Main Conversion Function ─────────────────────────────────────────────────

interface ConversionOptions {
  createFunctionComponent: boolean;
  inlineStylesToObject: boolean;
}

/**
 * Converts an HTML string to valid JSX.
 *
 * Uses the browser's native `DOMParser` for robust HTML parsing — it handles
 * malformed HTML, implicit close tags, character entities, etc. — then walks
 * the resulting DOM tree to produce a JSX string.
 *
 * @param html     Raw HTML string (may contain one or more root elements)
 * @param options  Transformation options
 * @returns        JSX string ready to paste into a React project
 */
function convertHtmlToJsx(html: string, options: ConversionOptions): string {
  const trimmed = html.trim();
  if (!trimmed) return "";

  // ── Parse HTML ────────────────────────────────────────────────────────────
  // DOMParser wraps input in <html><head/><body>...</body></html>.
  // We extract only <body>'s children as the user-supplied content.
  let doc: Document;
  try {
    doc = new DOMParser().parseFromString(trimmed, "text/html");
  } catch {
    return "// Parse error: Could not parse the provided HTML.";
  }

  // DOMParser signals XML errors via a <parsererror> element.
  // HTML5 parsing is lenient, so this is rarely triggered for normal HTML.
  const parseError = doc.querySelector("parsererror");
  if (parseError) {
    return `// Parse error: ${parseError.textContent?.trim() ?? "Invalid HTML"}`;
  }

  // Filter out leading / trailing whitespace-only text nodes
  const bodyChildren = Array.from(doc.body.childNodes).filter(
    (n) =>
      !(n.nodeType === Node.TEXT_NODE && !(n.textContent ?? "").trim())
  );

  if (bodyChildren.length === 0) {
    return "// No convertible content found.";
  }

  // ── Serialise ─────────────────────────────────────────────────────────────
  const rootIndent = "  ";
  const parts = bodyChildren
    .map((n) => nodeToJsxString(n, rootIndent, options.inlineStylesToObject))
    .filter((s) => s !== "");

  if (parts.length === 0) {
    return "// No convertible content found.";
  }

  // ── Multiple root elements → React Fragment ───────────────────────────────
  let jsxContent: string;
  if (parts.length === 1) {
    jsxContent = parts[0];
  } else {
    const fragmentChildren = parts.map((p) => rootIndent + p).join("\n");
    jsxContent = `<>\n${fragmentChildren}\n</>`;
  }

  // ── Optionally wrap in a named function component ─────────────────────────
  if (options.createFunctionComponent) {
    // Indent every line of jsxContent by 4 spaces to sit inside return()
    const indented = jsxContent
      .split("\n")
      .map((line) => "    " + line)
      .join("\n");

    return (
      `export default function Component() {\n` +
      `  return (\n` +
      `${indented}\n` +
      `  );\n` +
      `}`
    );
  }

  return jsxContent;
}

// ─── Sample HTML shown in the editor on first load ────────────────────────────

const SAMPLE_HTML = `<div class="container" style="display: flex; flex-direction: column; gap: 16px;">
  <header class="header" id="main-header">
    <h1>Hello, World!</h1>
    <nav>
      <a href="/home" tabindex="1">Home</a>
      <a href="/about" tabindex="2">About</a>
    </nav>
  </header>

  <main>
    <form action="/submit" enctype="multipart/form-data" novalidate>
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        maxlength="50"
        autocomplete="username"
        readonly
      />

      <label for="agree">
        <input type="checkbox" id="agree" checked />
        I agree to the terms
      </label>

      <img src="/logo.png" alt="Logo" />
      <br />
      <hr />

      <button type="submit" disabled onclick="handleSubmit()">Submit</button>
    </form>
  </main>

  <!-- Footer section -->
  <footer class="footer" style="margin-top: 24px; color: #666;">
    <p>&copy; 2025 BetterBugs</p>
  </footer>
</div>`;

// ─── Component ────────────────────────────────────────────────────────────────

const HtmlToJsxConverter: React.FC = () => {
  const [htmlInput, setHtmlInput]                       = useState<string>(SAMPLE_HTML);
  const [jsxOutput, setJsxOutput]                       = useState<string>("");
  const [createFunctionComponent, setCreateFunctionComponent] = useState<boolean>(false);
  const [inlineStylesToObject, setInlineStylesToObject] = useState<boolean>(true);

  const [messageApi, contextHolder] = message.useMessage();

  // Re-run conversion whenever input or options change
  useEffect(() => {
    const output = convertHtmlToJsx(htmlInput, {
      createFunctionComponent,
      inlineStylesToObject,
    });
    setJsxOutput(output);
  }, [htmlInput, createFunctionComponent, inlineStylesToObject]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleCopy = useCallback(() => {
    if (!jsxOutput) {
      messageApi.warning("Nothing to copy.");
      return;
    }
    navigator.clipboard
      .writeText(jsxOutput)
      .then(() => messageApi.success("JSX copied to clipboard!"))
      .catch(() => messageApi.error("Failed to copy to clipboard."));
  }, [jsxOutput, messageApi]);

  const handleClear = useCallback(() => {
    setHtmlInput("");
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <>
      {contextHolder}

      <div className="flex flex-col h-full w-full gap-4 p-4">

        {/* ── Tool header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Code size={20} className="text-blue-500" weight="duotone" />
            <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 m-0">
              HTML to JSX Converter
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 m-0">
            Converts standard HTML to valid JSX — renames attributes
            (class&nbsp;→&nbsp;className, for&nbsp;→&nbsp;htmlFor), self-closes
            void tags, camelCases event handlers, and optionally converts inline
            styles to JavaScript objects.
          </p>
        </div>

        {/* ── Options / action bar ────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">

          {/* Option: Create Function Component */}
          <Tooltip title="Wrap the JSX output in an `export default function Component() { ... }` block.">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Switch
                size="small"
                checked={createFunctionComponent}
                onChange={setCreateFunctionComponent}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Create Function Component
              </span>
            </label>
          </Tooltip>

          {/* Option: Inline Styles to Object */}
          <Tooltip title='Convert inline style strings to JSX objects — e.g. style="color: red" → style={{ color: "red" }}.'>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <Switch
                size="small"
                checked={inlineStylesToObject}
                onChange={setInlineStylesToObject}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Inline Styles to Object
              </span>
            </label>
          </Tooltip>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Tooltip title="Clear the HTML input">
              <Button
                icon={<Trash size={15} weight="bold" />}
                size="small"
                onClick={handleClear}
                disabled={!htmlInput}
              >
                Clear
              </Button>
            </Tooltip>

            <Tooltip title="Copy JSX output to clipboard">
              <Button
                type="primary"
                icon={<CopySimple size={15} weight="bold" />}
                size="small"
                onClick={handleCopy}
                disabled={!jsxOutput}
              >
                Copy JSX
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* ── Dual editor panel ───────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0">

          {/* Left — HTML input (editable) */}
          <div className="flex flex-col flex-1 min-h-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                Input — HTML
              </span>
            </div>
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                language="html"
                value={htmlInput}
                onChange={(value) => setHtmlInput(value ?? "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  tabSize: 2,
                  renderWhitespace: "boundary",
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                }}
              />
            </div>
          </div>

          {/* Centre arrow (desktop only) */}
          <div className="hidden lg:flex items-center justify-center flex-shrink-0 self-center">
            <ArrowsLeftRight
              size={22}
              weight="bold"
              className="text-gray-400 dark:text-gray-500"
            />
          </div>

          {/* Right — JSX output (read-only) */}
          <div className="flex flex-col flex-1 min-h-0 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                Output — JSX&nbsp;
                <span className="font-normal text-gray-400 dark:text-gray-500">
                  (read-only)
                </span>
              </span>
            </div>
            <div className="flex-1 min-h-0">
              <Editor
                height="100%"
                language="javascript"
                value={jsxOutput}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  wordWrap: "on",
                  tabSize: 2,
                  renderWhitespace: "boundary",
                  smoothScrolling: true,
                  // Suppress "read-only" squiggles on the output pane
                  renderValidationDecorations: "off",
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default HtmlToJsxConverter;