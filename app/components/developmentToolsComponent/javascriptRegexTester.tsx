"use client"
import React, { useMemo, useState } from 'react'

type RegexFlags = {
  i: boolean
  g: boolean
  m: boolean
  s: boolean
  u: boolean
  y: boolean
}

const buildFlagsString = (flags: RegexFlags) =>
  (flags.g ? 'g' : '') +
  (flags.i ? 'i' : '') +
  (flags.m ? 'm' : '') +
  (flags.s ? 's' : '') +
  (flags.u ? 'u' : '') +
  (flags.y ? 'y' : '')

const presetExamples = [
  { label: 'Email', pattern: '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}', flags: 'i', sample: 'Contact us at support@example.com or sales@foo.co.uk' },
  { label: 'URL', pattern: 'https?:\\/\\/[^\\s]+', flags: '', sample: 'Docs: https://betterbugs.io and http://localhost:3000' },
  { label: 'IPv4', pattern: '(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(?:\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)){3}', flags: '', sample: 'Local: 127.0.0.1, Router: 192.168.0.1' },
  { label: 'Hex color', pattern: '#(?:[0-9a-fA-F]{3}){1,2}\b', flags: 'g', sample: 'Primary #FF5733 and neutral #333' },
]

const JavascriptRegexTester = () => {
  const [pattern, setPattern] = useState('')
  const [text, setText] = useState('')
  const [replaceWith, setReplaceWith] = useState('')
  const [literalMode, setLiteralMode] = useState(false)
  const [manualRunKey, setManualRunKey] = useState(0)
  const [flags, setFlags] = useState<RegexFlags>({ i: false, g: true, m: false, s: false, u: false, y: false })
  const [error, setError] = useState<string | null>(null)

  const flagsString = useMemo(() => buildFlagsString(flags), [flags])

  const regex = useMemo(() => {
    if (!pattern) return null
    try {
      setError(null)
      const source = literalMode ? pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : pattern
      return new RegExp(source, flagsString)
    } catch (e: any) {
      setError(e?.message || 'Invalid pattern')
      return null
    }
  }, [pattern, flagsString, literalMode, manualRunKey])

  const matches = useMemo(() => {
    if (!regex || !text) return [] as Array<{ match: string; index: number; groups: string[] }>
    const results: Array<{ match: string; index: number; groups: string[] }> = []
    if (regex.global) {
      let m: RegExpExecArray | null
      const r = new RegExp(regex.source, flagsString)
      while ((m = r.exec(text)) !== null) {
        results.push({ match: m[0], index: m.index, groups: Array.from(m).slice(1) })
        if (m.index === r.lastIndex) r.lastIndex++
      }
    } else {
      const m = text.match(regex)
      if (m) results.push({ match: m[0], index: (m as any).index ?? text.indexOf(m[0]), groups: Array.from(m).slice(1) })
    }
    return results
  }, [regex, text, flagsString, manualRunKey])

  const replaced = useMemo(() => {
    if (!regex || !text) return ''
    try {
      return text.replace(regex, replaceWith)
    } catch {
      return ''
    }
  }, [regex, text, replaceWith, manualRunKey])

  const replaceFirst = () => {
    if (!regex || !text) return
    try {
      const r = new RegExp(regex.source, flagsString.replace('g',''))
      setText(text.replace(r, replaceWith))
    } catch {}
  }

  const replaceAll = () => {
    if (!regex || !text) return
    try {
      const r = new RegExp(regex.source, flagsString.includes('g') ? flagsString : flagsString + 'g')
      setText(text.replace(r, replaceWith))
    } catch {}
  }

  const runTest = () => setManualRunKey((k) => k + 1)
  const resetAll = () => {
    setPattern('')
    setText('')
    setReplaceWith('')
    setFlags({ i: false, g: true, m: false, s: false, u: false, y: false })
    setLiteralMode(false)
    setError(null)
    setManualRunKey((k) => k + 1)
  }

  const toggleFlag = (key: keyof RegexFlags) => setFlags((f) => ({ ...f, [key]: !f[key] }))

  const applyPreset = (idx: number) => {
    const p = presetExamples[idx]
    setPattern(p.pattern)
    setText(p.sample)
    const next: RegexFlags = { i: false, g: false, m: false, s: false, u: false, y: false }
    for (const ch of p.flags) (next as any)[ch] = true
    setFlags(next)
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="bg-white/5 rounded-xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="block text-sm text-white/80 mb-1">Pattern</label>
            <input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. ^[A-Za-z]+$"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white outline-none focus:border-primary font-mono"
            />
          </div>
          <div className="md:w-56 w-full">
            <label className="block text-sm text-white/80 mb-1">Flags</label>
            <div className="grid grid-cols-6 gap-1 text-xs">
              {(['g','i','m','s','u','y'] as Array<keyof RegexFlags>).map((f) => (
                <button
                  key={f}
                  onClick={() => toggleFlag(f)}
                  className={`px-2 py-1 rounded border ${flags[f] ? 'bg-primary text-black border-primary' : 'bg-white/10 text-white border-white/20'}`}
                  aria-pressed={flags[f]}
                >{f}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-white/60">
          <div className="flex items-center gap-3">
            <span>RegExp: <code className="text-white">/{literalMode ? pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : (pattern || '')}/{flagsString}</code></span>
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={literalMode} onChange={() => setLiteralMode((v) => !v)} />
              <span className="text-white/80">Literal</span>
            </label>
          </div>
          <div className="flex gap-2">
            {presetExamples.map((p, i) => (
              <button key={p.label} onClick={() => applyPreset(i)} className="px-2 py-1 rounded-full bg-white/10 border border-white/20 hover:bg-white/20">{p.label}</button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded border border-red-500/40 bg-red-500/10 text-red-300 text-sm">{error}</div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-xl p-5">
          <label className="block text-sm text-white/80 mb-2">Test text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            placeholder="Paste or type text to test against the pattern"
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white outline-none focus:border-primary font-mono"
          />
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <button onClick={runTest} className="px-3 py-1 rounded bg-primary text-black">Test match</button>
            <button onClick={replaceFirst} className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white">Replace first</button>
            <button onClick={replaceAll} className="px-3 py-1 rounded bg-white/10 border border-white/20 text-white">Replace all</button>
            <button onClick={resetAll} className="px-3 py-1 rounded bg-red-500/20 border border-red-500/30 text-red-200">Reset</button>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-5 space-y-4">
          <div>
            <label className="block text-sm text-white/80 mb-2">Replace with</label>
            <input
              value={replaceWith}
              onChange={(e) => setReplaceWith(e.target.value)}
              placeholder="$1 - use $1, $2 for captured groups"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white outline-none focus:border-primary font-mono"
            />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-2">Replacement result</label>
            <pre className="min-h-[120px] whitespace-pre-wrap break-words px-3 py-2 bg-black/40 border border-white/10 rounded text-white font-mono">{replaced}</pre>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold">Matches ({matches.length})</h3>
          <span className="text-xs text-white/60">{regex ? 'index, match, groups' : 'Enter a pattern and text'}</span>
        </div>
        <div className="space-y-2">
          {matches.length === 0 ? (
            <div className="text-white/60 text-sm">No matches</div>
          ) : (
            matches.map((m, i) => (
              <div key={i} className="p-3 rounded border border-white/10 bg-white/5">
                <div className="text-xs text-white/60">index {m.index}</div>
                <div className="text-sm"><code className="text-primary font-mono">{m.match}</code></div>
                {m.groups.length > 0 && (
                  <div className="mt-2 text-xs text-white/80 space-y-1">
                    {m.groups.map((g, gi) => (
                      <div key={gi}><span className="text-white/50">group {gi + 1}:</span> <code className="font-mono">{g}</code></div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {!!regex && !!text && (
        <div className="bg-white/5 rounded-xl p-5">
          <h3 className="text-white font-semibold mb-3">Highlighted text</h3>
          <div className="prose prose-invert max-w-none text-sm leading-6">
            {(() => {
              const parts: Array<React.ReactNode> = []
              let last = 0
              const r = new RegExp(regex.source, regex.global ? flagsString : (flagsString.includes('g') ? flagsString : flagsString + 'g'))
              let m: RegExpExecArray | null
              while ((m = r.exec(text)) !== null) {
                const start = m.index
                const end = m.index + m[0].length
                if (last < start) parts.push(<span key={last + '-t'}>{text.slice(last, start)}</span>)
                parts.push(
                  <mark key={start + '-m'} className="bg-primary/30 text-white px-0.5 rounded">
                    {m[0]}
                  </mark>
                )
                last = end
                if (m.index === r.lastIndex) r.lastIndex++
              }
              if (last < text.length) parts.push(<span key={last + '-r'}>{text.slice(last)}</span>)
              return <div className="font-mono whitespace-pre-wrap break-words">{parts}</div>
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default JavascriptRegexTester