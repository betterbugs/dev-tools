"use client"
import React, { useMemo, useState } from 'react'

const StripHTML = () => {
  const [html, setHtml] = useState('')
  const [preserveLineBreaks, setPreserveLineBreaks] = useState(true)
  const [collapseWhitespace, setCollapseWhitespace] = useState(true)
  const [removeComments, setRemoveComments] = useState(true)
  const [dedupeBlankLines, setDedupeBlankLines] = useState(true)
  const [bulletizeListItems, setBulletizeListItems] = useState(true)

  const stripped = useMemo(() => {
    if (!html) return ''
    const noComments = removeComments ? html.replace(/<!--[\s\S]*?-->/g, '') : html
    const withoutScripts = noComments.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    const withoutStyles = withoutScripts.replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    const withBullets = bulletizeListItems ? withoutStyles.replace(/<li[^>]*>/gi, '\n- ').replace(/<\/(li)>/gi, '') : withoutStyles
    const withBreaks = preserveLineBreaks
      ? withBullets
          .replace(/<\/(p|div|h[1-6]|li|tr|table|section|article|ul|ol)>/gi, '\n')
          .replace(/<br\s*\/?>(?=\s*<)/gi, '\n')
      : withBullets
    const textOnly = withBreaks.replace(/<[^>]+>/g, '')
    const decoded = textOnly
      .replace(/&nbsp;/g, ' ')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
    let out = collapseWhitespace
      ? decoded.replace(/[\t\f\v\r ]+/g, ' ').replace(/\s*\n\s*/g, '\n').trim()
      : decoded
    if (dedupeBlankLines) out = out.replace(/\n{3,}/g, '\n\n')
    return out
  }, [html, preserveLineBreaks, collapseWhitespace, removeComments, dedupeBlankLines, bulletizeListItems])

  const copy = async () => {
    try { await navigator.clipboard.writeText(stripped) } catch {}
  }
  const clear = () => setHtml('')
  const paste = async () => { try { const t = await navigator.clipboard.readText(); setHtml(t) } catch {} }
  const download = () => {
    const blob = new Blob([stripped], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'plain-text.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return; const r = new FileReader(); r.onload = ev => setHtml(String(ev.target?.result || '')); r.readAsText(f)
  }

  return (
    <div className="md:mt-8 mt-4 text-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full bg-[#FFFFFF1A] rounded-2xl shadow-lg p-8">
          <div className="md:w-[850px] mx-auto space-y-8">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">HTML input</h2>
                  <div className="flex gap-2">
                    <button onClick={clear} className="px-3 py-1 bg-red hover:bg-red/80 rounded text-sm transition-colors text-black font-bold">Clear</button>
                  </div>
                </div>
                <textarea
                  value={html}
                  onChange={(e) => setHtml(e.target.value)}
                  placeholder="Paste or type HTML here"
                  className="w-full h-64 p-4 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
                />
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-primary" checked={preserveLineBreaks} onChange={(e) => setPreserveLineBreaks(e.target.checked)} />
                    Preserve line breaks
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-primary" checked={collapseWhitespace} onChange={(e) => setCollapseWhitespace(e.target.checked)} />
                    Collapse whitespace
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-primary" checked={removeComments} onChange={(e) => setRemoveComments(e.target.checked)} />
                    Remove comments
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-primary" checked={dedupeBlankLines} onChange={(e) => setDedupeBlankLines(e.target.checked)} />
                    Dedupe blank lines
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="accent-primary" checked={bulletizeListItems} onChange={(e) => setBulletizeListItems(e.target.checked)} />
                    Bulletize list items
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input id="upload-html" type="file" accept=".html,.htm,.txt" className="hidden" onChange={onUpload} />
                  <label htmlFor="upload-html" className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Upload</label>
                  <button onClick={paste} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Paste</button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Plain text output</h2>
                  <div className="flex items-center gap-3 text-xs text-white/70">
                    <span>{(stripped.trim().match(/\S+/g)?.length || 0)} words</span>
                    <span>•</span>
                    <span>{stripped ? stripped.split(/\r?\n/).length : 0} lines</span>
                    <span>•</span>
                    <span>{stripped.length} chars</span>
                  </div>
                </div>
                <pre className="h-64 p-4 bg-black/20 border border-white/20 rounded-lg overflow-auto text-sm font-mono whitespace-pre-wrap break-words">
                  {stripped || "\u00A0"}
                </pre>
                <div className="flex gap-2">
                  <button onClick={copy} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm cursor-pointer transition-colors text-black font-bold">Copy</button>
                  <button onClick={download} className="px-3 py-1 bg-primary hover:bg-primary/80 rounded text-sm transition-colors text-black font-bold">Download</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StripHTML