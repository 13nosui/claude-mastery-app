'use client'

import { useState } from 'react'

interface CommandListProps {
  commands: string[]
}

export function CommandList({ commands }: CommandListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (cmd: string, index: number) => {
    try {
      await navigator.clipboard.writeText(cmd)
      setCopiedIndex(index)
      setTimeout(() => {
        setCopiedIndex((current) => (current === index ? null : current))
      }, 1500)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — silently ignore.
    }
  }

  return (
    <ul className="space-y-2">
      {commands.map((cmd, index) => {
        const isCopied = copiedIndex === index
        return (
          <li key={`${cmd}-${index}`} className="group relative">
            <code className="block font-mono text-sm bg-zinc-800 border border-zinc-700 rounded-lg pl-4 pr-12 py-3 text-indigo-300 leading-relaxed whitespace-pre-wrap break-words">
              {cmd}
            </code>
            <button
              type="button"
              onClick={() => handleCopy(cmd, index)}
              aria-label={isCopied ? 'コピーしました' : 'コマンドをコピー'}
              className="absolute top-2 right-2 inline-flex items-center justify-center w-8 h-8 rounded-md border border-zinc-700 bg-zinc-900/80 text-zinc-400 hover:text-zinc-100 hover:border-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 transition-colors"
            >
              {isCopied ? (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              ) : (
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m11.25 2.25h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a9.06 9.06 0 00-1.5-.124"
                  />
                </svg>
              )}
            </button>
            {isCopied && (
              <span
                role="status"
                className="absolute -top-7 right-2 text-xs text-emerald-400 bg-zinc-900 border border-emerald-500/30 rounded px-2 py-0.5 shadow"
              >
                コピーしました
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
