'use client'

import type { Role } from '@/types/mastery'

interface RoleSelectorProps {
  roles: Role[]
  onSelect: (roleId: string) => void
}

export function RoleSelector({ roles, onSelect }: RoleSelectorProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 sm:p-8">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-4">
            Claude Code 入門
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            あなたの職種は何ですか？
          </h1>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            選ぶと、あなたの仕事に直結する Claude Code の使い方と、
            <br className="hidden sm:block" />
            今日から真似できるコマンド例が表示されます。
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
          aria-label="職種選択"
        >
          {roles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelect(role.id)}
              className="group text-left p-6 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-blue-500/60 rounded-2xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              aria-label={`${role.label}として始める`}
            >
              <div className="text-4xl mb-3" aria-hidden="true">
                {role.icon}
              </div>
              <h2 className="text-xl font-bold mb-1 group-hover:text-blue-300 transition-colors">
                {role.label}
              </h2>
              <p className="text-sm text-blue-400 mb-2 font-medium">{role.tagline}</p>
              <p className="text-sm text-zinc-400 leading-relaxed">{role.description}</p>
              <div className="mt-4 text-xs text-zinc-500 group-hover:text-blue-400 transition-colors">
                {role.items.length} 個の活用シーンを見る →
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-xs mt-10">
          職種はあとからいつでも変更できます。
        </p>
      </div>
    </div>
  )
}
