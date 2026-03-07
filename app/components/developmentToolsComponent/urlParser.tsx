"use client";
import React, { useState, useEffect } from "react";
import DevelopmentToolsStyles from "../../developmentToolsStyles.module.scss";

interface QueryParam {
  id: string;
  key: string;
  value: string;
  active: boolean;
  encoded: boolean;
}

const UrlParser = () => {
  const [urlInput, setUrlInput] = useState<string>("");
  const [parsedUrl, setParsedUrl] = useState<URL | null>(null);
  const [queryParams, setQueryParams] = useState<QueryParam[]>([]);
  const [error, setError] = useState<string>("");
  const isInternalUpdate = React.useRef(false);


  // Function to update the input and state from a URL object
  const updateStateFromUrl = (url: URL) => {
    setParsedUrl(url);
    const params: QueryParam[] = [];
    let index = 0;
    url.searchParams.forEach((value, key) => {
        // Use a stable ID based on index and key to avoid unnecessary re-renders
        // when only values change, or random regeneration on every parse.
        const id = `param-${index}-${key}`;
        params.push({
          id,
          key,
          value,
          active: true,
          encoded: true
        });
        index++;
    });
    setQueryParams(params);
  }

  // Initial parse on input change
  useEffect(() => {
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }

    if (!urlInput.trim()) {
      setParsedUrl(null);
      setQueryParams([]);
      setError("");
      return;
    }

    try {
      // Basic heuristic to add protocol if missing for better UX
      let urlToParse = urlInput;
      if (!urlInput.match(/^[a-zA-Z][a-zA-Z\d+\-.]*:/)) {
         // If doesn't start with scheme, assume http:// if it looks like a domain
         if (urlInput.includes('.') && !urlInput.startsWith('/')) {
             urlToParse = "http://" + urlInput;
         }
      }

      const url = new URL(urlToParse);
      updateStateFromUrl(url);
      setError("");
    } catch (err) {
      setParsedUrl(null);
      setError("Invalid URL");
    }
  }, [urlInput]);

  // Re-construct URL when params change
  const updateUrlFromParams = (newParams: QueryParam[]) => {
    if (!parsedUrl) return;

    try {
        const newUrl = new URL(parsedUrl.toString());
        const queryParts: string[] = [];
        
        newParams.forEach(p => {
        if (p.active && p.key) {
            const key = p.encoded ? encodeURIComponent(p.key) : p.key;
            const value = p.encoded ? encodeURIComponent(p.value) : p.value;
            queryParts.push(`${key}=${value}`);
        }
        });

        newUrl.search = queryParts.join('&');
        
        if (newUrl.toString() !== urlInput) {
            isInternalUpdate.current = true;
            setUrlInput(newUrl.toString());
        }
    } catch (e) {
        console.error("Error updating URL from params", e);
    }
  };

  const handleParamChange = (id: string, field: 'key' | 'value', newValue: string) => {
    const updatedParams = queryParams.map(p => 
      p.id === id ? { ...p, [field]: newValue } : p
    );
    // Optimistically update params state to feel responsive
    setQueryParams(updatedParams);
    // Then update the full URL
    updateUrlFromParams(updatedParams);
  };

  const handleToggleParamEncoding = (id: string) => {
    const updatedParams = queryParams.map(p =>
      p.id === id ? { ...p, encoded: !p.encoded } : p
    );
    setQueryParams(updatedParams);
    updateUrlFromParams(updatedParams);
  };

  const handleDeleteParam = (id: string) => {
    const updatedParams = queryParams.filter(p => p.id !== id);
    setQueryParams(updatedParams);
    updateUrlFromParams(updatedParams);
  };

  const handleAddParam = () => {
    const newParam: QueryParam = {
      id: Math.random().toString(36).substr(2, 9),
      key: "new_key",
      value: "value",
      active: true,
      encoded: true
    };
    const updatedParams = [...queryParams, newParam];
    setQueryParams(updatedParams);
    updateUrlFromParams(updatedParams);
  };

  const updateUrlPart = (part: 'protocol' | 'hostname' | 'pathname' | 'hash', value: string) => {
      if (!parsedUrl) return;
      try {
        const newUrl = new URL(parsedUrl.toString());
        if (part === 'protocol') {
             // Protocol needs the colon usually
             const protocol = value.endsWith(':') ? value : value + ':';
             // prevent invalid protocol assignment crash if possible, but URL object throws
             newUrl.protocol = protocol;
        } else if (part === 'hostname') {
            newUrl.hostname = value;
        } else if (part === 'pathname') {
            newUrl.pathname = value.startsWith('/') ? value : '/' + value;
        } else if (part === 'hash') {
            newUrl.hash = value;
        }
        if (newUrl.toString() !== urlInput) {
             isInternalUpdate.current = true;
            setUrlInput(newUrl.toString());
        }
      } catch (e) {
          // invalid part update, ignore or show hint
      }
  };

  return (
    <section>
      <div className="md:mt-8 mt-4">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
            <div className="md:w-[900px] mx-auto">
              <div className="flex flex-col gap-6 md:my-5 mt-2">
                
                {/* Title */}
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-medium text-white">URL Parser & Query Editor</h3>
                </div>

                {/* Main URL Input */}
                <div className="w-full">
                  <label className="block text-sm font-medium mb-2 text-white">URL</label>
                  <div className="relative">
                    <textarea
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="Enter URL to parse... (e.g. https://example.com/search?q=test)"
                        className={`${DevelopmentToolsStyles.scrollbar} w-full min-h-[80px] bg-black border border-[#222222] p-4 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors`}
                    />
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                  </div>
                </div>

                {parsedUrl && (
                    <div className="animate-fade-in space-y-6">
                        {/* URL Components Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/20 p-6 rounded-xl border border-[#222222]">
                            <h4 className="col-span-full text-lg font-medium text-white border-b border-white/10 pb-2">Components</h4>
                            
                            <div>
                                <label className="block text-xs font-medium mb-1 text-white/60 uppercase tracking-wider">Scheme</label>
                                <input 
                                    type="text" 
                                    value={parsedUrl.protocol.replace(':', '')}
                                    onChange={(e) => updateUrlPart('protocol', e.target.value)}
                                    className="w-full bg-black/40 border border-[#222222] p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium mb-1 text-white/60 uppercase tracking-wider">Host</label>
                                <input 
                                    type="text" 
                                    value={parsedUrl.hostname}
                                    onChange={(e) => updateUrlPart('hostname', e.target.value)}
                                    className="w-full bg-black/40 border border-[#222222] p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-xs font-medium mb-1 text-white/60 uppercase tracking-wider">Path</label>
                                <input 
                                    type="text" 
                                    value={parsedUrl.pathname}
                                    onChange={(e) => updateUrlPart('pathname', e.target.value)}
                                    className="w-full bg-black/40 border border-[#222222] p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-medium mb-1 text-white/60 uppercase tracking-wider">Hash</label>
                                <input 
                                    type="text" 
                                    value={parsedUrl.hash}
                                    onChange={(e) => updateUrlPart('hash', e.target.value)}
                                    className="w-full bg-black/40 border border-[#222222] p-2.5 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-medium mb-1 text-white/60 uppercase tracking-wider">Port</label>
                                <input 
                                    type="text" 
                                    value={parsedUrl.port}
                                    readOnly
                                    placeholder="80/443"
                                    className="w-full bg-black/40 border border-[#222222] p-2.5 rounded-lg text-white/50 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Query Parameters Table */}
                        <div className="w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-lg font-medium text-white">Query Parameters</h4>
                                <button
                                    onClick={handleAddParam}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                    </svg>
                                    Add New
                                </button>
                            </div>
                            
                            <div className="bg-black/20 rounded-xl overflow-hidden border border-[#222222]">
                                {queryParams.length === 0 ? (
                                    <div className="p-8 text-center text-white/40 text-sm flex flex-col items-center">
                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-2 opacity-30">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        No query parameters found. Add one or paste a URL with params.
                                    </div>
                                ) : (
                                    <div className="w-full overflow-x-auto">
                                      <table className="w-full text-left text-sm text-white">
                                          <thead className="bg-white/5 uppercase text-xs">
                                              <tr>
                                                  <th className="px-4 py-3 font-semibold text-white/70 w-1/3">Key</th>
                                                  <th className="px-4 py-3 font-semibold text-white/70 w-1/3">Value</th>
                                                  <th className="px-4 py-3 font-semibold text-white/70 w-24 text-center">Encoded</th>
                                                  <th className="px-4 py-3 font-semibold text-white/70 text-right w-24">Actions</th>
                                              </tr>
                                          </thead>
                                          <tbody className="divide-y divide-white/5">
                                              {queryParams.map((param) => (
                                                  <tr key={param.id} className="hover:bg-white/5 transition group">
                                                      <td className="px-4 py-2">
                                                          <input 
                                                              type="text" 
                                                              value={param.key} 
                                                              onChange={(e) => handleParamChange(param.id, 'key', e.target.value)}
                                                              className="bg-transparent w-full p-2 rounded border border-transparent focus:border-blue-500/50 focus:bg-black/20 focus:outline-none transition-colors"
                                                              placeholder="Key"
                                                          />
                                                      </td>
                                                      <td className="px-4 py-2">
                                                          <input 
                                                              type="text" 
                                                              value={param.value} 
                                                              onChange={(e) => handleParamChange(param.id, 'value', e.target.value)}
                                                              className="bg-transparent w-full p-2 rounded border border-transparent focus:border-blue-500/50 focus:bg-black/20 focus:outline-none transition-colors"
                                                              placeholder="Value"
                                                          />
                                                      </td>
                                                      <td className="px-4 py-2 text-center">
                                                          <input 
                                                              type="checkbox" 
                                                              checked={param.encoded}
                                                              onChange={() => handleToggleParamEncoding(param.id)}
                                                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600 accent-blue-600 cursor-pointer"
                                                              title="Toggle URL Encoding for this parameter"
                                                          />
                                                      </td>
                                                      <td className="px-4 py-2 text-right">
                                                          <button 
                                                              onClick={() => handleDeleteParam(param.id)}
                                                              className="text-white/40 hover:text-red-400 p-2 rounded-lg hover:bg-white/5 transition"
                                                              title="Delete Parameter"
                                                          >
                                                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                              </svg>
                                                          </button>
                                                      </td>
                                                  </tr>
                                              ))}
                                          </tbody>
                                      </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UrlParser;
