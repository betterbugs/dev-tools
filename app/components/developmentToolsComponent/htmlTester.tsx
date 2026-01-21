"use client";
import React, { useState, useEffect } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">
    {children}
  </code>
);

interface ValidationError {
  line: number;
  column: number;
  message: string;
  type: 'error' | 'warning';
}

const HtmlTester = () => {
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Tester</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML Tester</h1>
        <p>This is a sample HTML document. Edit the code on the left to see changes in the preview.</p>
        <button onclick="alert('Hello World!')">Click Me</button>
    </div>
</body>
</html>`);

  const [previewHtml, setPreviewHtml] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Ensure preview text is white by injecting minimal CSS into the HTML
  const applyPreviewStyles = (code: string): string => {
    const styleTag = "<style>body{color:#ffffff}</style>";
    if (code.toLowerCase().includes("</head>")) {
      return code.replace(/<\/head>/i, `${styleTag}</head>`);
    }
    if (code.toLowerCase().includes("<body")) {
      // Insert style just after opening body tag if head is missing
      return code.replace(/<body[^>]*>/i, (m) => `${m}${styleTag}`);
    }
    // Fallback: prepend style at the beginning
    return `${styleTag}${code}`;
  };

  // Update preview when HTML code changes
  useEffect(() => {
    setPreviewHtml(applyPreviewStyles(htmlCode));
  }, [htmlCode]);

  // Basic HTML validation
  const validateHTML = (code: string): ValidationError[] => {
    const errors: ValidationError[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Check for unclosed tags
      const openTags = line.match(/<[^/][^>]*>/g) || [];
      const closeTags = line.match(/<\/[^>]*>/g) || [];
      
      // Check for common HTML issues
      if (line.includes('<script') && !line.includes('</script>') && !line.includes('</script')) {
        errors.push({
          line: lineNumber,
          column: 1,
          message: 'Script tag should be properly closed',
          type: 'warning'
        });
      }

      if (line.includes('<style') && !line.includes('</style>') && !line.includes('</style')) {
        errors.push({
          line: lineNumber,
          column: 1,
          message: 'Style tag should be properly closed',
          type: 'warning'
        });
      }

      // Check for missing alt attributes on images
      if (line.includes('<img') && !line.includes('alt=')) {
        errors.push({
          line: lineNumber,
          column: 1,
          message: 'Image should have alt attribute for accessibility',
          type: 'warning'
        });
      }

      // Check for deprecated tags
      const deprecatedTags = ['<center>', '<font>', '<marquee>', '<blink>'];
      deprecatedTags.forEach(tag => {
        if (line.includes(tag)) {
          errors.push({
            line: lineNumber,
            column: line.indexOf(tag) + 1,
            message: `Deprecated tag: ${tag}`,
            type: 'warning'
          });
        }
      });

      // Check for missing DOCTYPE
      if (index === 0 && !line.toLowerCase().includes('<!doctype')) {
        errors.push({
          line: lineNumber,
          column: 1,
          message: 'Missing DOCTYPE declaration',
          type: 'warning'
        });
      }
    });

    return errors;
  };

  const handleValidate = async () => {
    setIsValidating(true);
    
    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const errors = validateHTML(htmlCode);
    setValidationErrors(errors);
    setIsValidating(false);
  };

  const handleClear = () => {
    setHtmlCode("");
    setValidationErrors([]);
  };

  const handleReset = () => {
    setHtmlCode(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Tester</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to HTML Tester</h1>
        <p>This is a sample HTML document. Edit the code on the left to see changes in the preview.</p>
        <button onclick="alert('Hello World!')">Click Me</button>
    </div>
</body>
</html>`);
    setValidationErrors([]);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
    } catch {}
  };

  const downloadHTML = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'test.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getErrorIcon = (type: 'error' | 'warning') => {
    return type === 'error' ? '❌' : '⚠️';
  };

  const getErrorColor = (type: 'error' | 'warning') => {
    return type === 'error' ? 'text-red-300' : 'text-yellow-300';
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[950px] mx-auto space-y-6">
            
            {/* Toolbar */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={handleValidate}
                  disabled={isValidating}
                  className="px-4 py-2 bg-primary hover:bg-primary/80 disabled:bg-primary/50 text-black font-bold rounded-lg text-sm"
                >
                  {isValidating ? "Validating..." : "Validate HTML"}
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 bg-primary hover:bg-primary/80 font-bold rounded-lg text-sm text-black"
                >
                  Reset
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-red hover:bg-red/80 font-bold rounded-lg text-sm text-black"
                >
                  Clear
                </button>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={copyCode}
                  className="px-4 py-2 bg-primary hover:bg-primary/80 font-bold rounded-lg text-sm text-black"
                >
                  Copy Code
                </button>
                <button
                  onClick={downloadHTML}
                  className="px-4 py-2 bg-primary hover:bg-primary/80 font-bold rounded-lg text-sm text-black"
                >
                  Download HTML
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="grid lg:grid-cols-2 gap-6">
              
              {/* Code Editor */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">HTML Code Editor</h3>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={showLineNumbers}
                        onChange={(e) => setShowLineNumbers(e.target.checked)}
                        className="rounded"
                      />
                      Line Numbers
                    </label>
                  </div>
                </div>
                
                 <div className="relative">
                   <textarea
                     value={htmlCode}
                     onChange={(e) => setHtmlCode(e.target.value)}
                     className="w-full h-96 p-4 pl-12 bg-black/40 border border-white/10 rounded-lg font-mono text-sm resize-none focus:outline-none focus:border-primary"
                     placeholder="Enter your HTML code here..."
                     spellCheck={false}
                   />
                   {showLineNumbers && (
                     <div className="absolute left-0 top-0 h-96 overflow-hidden pointer-events-none">
                       <div className="p-4 pr-2 text-xs text-white/50 font-mono">
                         {htmlCode.split('\n').map((_, index) => (
                           <div key={index} className="h-4 leading-4 text-right">
                             {index + 1}
                           </div>
                         ))}
                       </div>
                     </div>
                   )}
                 </div>
              </div>

              {/* Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Live Preview</h3>
                 <div className="h-96 border border-white/10 rounded-lg overflow-hidden">
                   <iframe
                     srcDoc={previewHtml}
                     className="w-full h-full bg-black/40 text-white"
                     title="HTML Preview"
                     sandbox="allow-scripts allow-same-origin"
                   />
                 </div>
              </div>
            </div>

            {/* Validation Results */}
            {validationErrors.length > 0 && (
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-3">
                <h3 className="text-lg font-semibold">Validation Results</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {validationErrors.map((error, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 bg-black/20 rounded">
                      <span className="text-lg">{getErrorIcon(error.type)}</span>
                      <div className="flex-1">
                        <div className={`font-semibold ${getErrorColor(error.type)}`}>
                          Line {error.line}, Column {error.column}
                        </div>
                        <div className="text-sm text-white/80">{error.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* HTML Tips and Examples */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-primary">HTML Best Practices</h3>
                <ul className="list-disc pl-5 text-sm text-white/80 space-y-1">
                  <li>Always include DOCTYPE declaration</li>
                  <li>Use semantic HTML elements (header, nav, main, section, article)</li>
                  <li>Include alt attributes for images</li>
                  <li>Use proper heading hierarchy (h1, h2, h3...)</li>
                  <li>Close all tags properly</li>
                  <li>Use meaningful class and id names</li>
                  <li>Include meta tags for SEO</li>
                </ul>
              </div>
              
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-primary">Quick HTML Snippets</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <div className="text-white/70">Basic Structure:</div>
                    <Cmd>&lt;!DOCTYPE html&gt;</Cmd>
                  </div>
                  <div>
                    <div className="text-white/70">Meta Tags:</div>
                    <Cmd>&lt;meta charset=&#34;UTF-8&#34;&gt;</Cmd>
                  </div>
                  <div>
                    <div className="text-white/70">Link CSS:</div>
                    <Cmd>&lt;link rel=&#34;stylesheet&#34; href=&#34;style.css&#34;&gt;</Cmd>
                  </div>
                  <div>
                    <div className="text-white/70">Script Tag:</div>
                    <Cmd>&lt;script src=&#34;script.js&#34;&gt;&lt;/script&gt;</Cmd>
                  </div>
                </div>
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div className="bg-black/20 border border-white/10 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold">Keyboard Shortcuts</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="text-white/70">Editor Shortcuts:</div>
                  <div className="flex justify-between">
                    <span>Ctrl+A</span>
                    <span className="text-white/60">Select All</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ctrl+Z</span>
                    <span className="text-white/60">Undo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ctrl+Y</span>
                    <span className="text-white/60">Redo</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-white/70">Navigation:</div>
                  <div className="flex justify-between">
                    <span>Ctrl+Home</span>
                    <span className="text-white/60">Go to Start</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ctrl+End</span>
                    <span className="text-white/60">Go to End</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ctrl+F</span>
                    <span className="text-white/60">Find</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-white/70">Actions:</div>
                  <div className="flex justify-between">
                    <span>Ctrl+C</span>
                    <span className="text-white/60">Copy</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ctrl+V</span>
                    <span className="text-white/60">Paste</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ctrl+S</span>
                    <span className="text-white/60">Save (Download)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HtmlTester;
