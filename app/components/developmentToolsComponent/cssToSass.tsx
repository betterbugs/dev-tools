"use client";
import React, { useMemo, useState } from "react";

const Cmd = ({ children }: { children: string }) => (
  <code className="px-2 py-1 rounded bg-black/40 border border-white/10 font-mono text-xs">{children}</code>
);

// Convert CSS to SASS/SCSS
const convertCssToSass = (css: string): string => {
  let sass = css;
  
  // Remove comments (/* */) - SASS uses //
  sass = sass.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Convert selectors and rules
  const lines = sass.split('\n');
  const result: string[] = [];
  let indentLevel = 0;
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    
    if (!line) {
      result.push('');
      continue;
    }
    
    // Handle opening braces
    if (line.includes('{')) {
      const selector = line.replace('{', '').trim();
      if (selector) {
        result.push('  '.repeat(indentLevel) + selector + ' {');
        indentLevel++;
      }
    }
    // Handle closing braces
    else if (line.includes('}')) {
      indentLevel = Math.max(0, indentLevel - 1);
      result.push('  '.repeat(indentLevel) + '}');
    }
    // Handle CSS properties
    else if (line.includes(':')) {
      const [property, value] = line.split(':', 2);
      const cleanProperty = property.trim();
      const cleanValue = value.replace(';', '').trim();
      result.push('  '.repeat(indentLevel) + cleanProperty + ': ' + cleanValue + ';');
    }
    // Handle @rules
    else if (line.startsWith('@')) {
      result.push('  '.repeat(indentLevel) + line);
    }
  }
  
  return result.join('\n');
};

const CssToSass = () => {
  const [css, setCss] = useState(`/* Sample CSS */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}`);

  const sass = useMemo(() => convertCssToSass(css), [css]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const clearAll = () => {
    setCss('');
  };

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[900px] mx-auto space-y-6">
            <div className="flex items-center justify-end">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(sass)}
                  className="px-4 py-2 bg-primary text-black rounded text-sm font-bold hover:bg-primary/80"
                >
                  Copy SASS
                </button>
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-red border border-white/10 text-black font-semibold rounded text-sm hover:bg-red/80 hover:border-black/20"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold">CSS Input</h3>
                <textarea
                  value={css}
                  onChange={(e) => setCss(e.target.value)}
                  className="w-full h-96 p-4 bg-black/40 border border-white/10 rounded font-mono text-sm resize-none"
                  placeholder="Paste your CSS here..."
                  spellCheck={false}
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">SASS Output</h3>
                <textarea
                  value={sass}
                  readOnly
                  className="w-full h-96 p-4 bg-black/40 border border-white/10 rounded font-mono text-sm resize-none"
                  placeholder="SASS output will appear here..."
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-3">
                <h3 className="font-semibold">Features</h3>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                  <li>Converts CSS selectors to SASS nested structure</li>
                  <li>Maintains proper indentation for readability</li>
                  <li>Preserves @media queries and other @rules</li>
                  <li>Removes CSS comments (SASS uses // for comments)</li>
                  <li>Handles complex selectors and properties</li>
                </ul>
              </div>

              <div className="bg-black/20 border border-white/10 rounded-lg p-4 text-sm space-y-3">
                <h3 className="font-semibold">Tips</h3>
                <ul className="list-disc pl-5 text-white/80 space-y-1">
                 <li>Use <Cmd>{"/* */"}</Cmd> for comments in SASS instead of <Cmd>{"//"}</Cmd></li>
                  <li>Consider using SASS variables for repeated values</li>
                  <li>Take advantage of SASS nesting for better organization</li>
                  <li>Use mixins for reusable styles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CssToSass;
