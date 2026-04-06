import type { MasteryItem } from '@/types/mastery'

interface ContentAreaProps {
  item: MasteryItem | undefined
}

export function ContentArea({ item }: ContentAreaProps) {
  if (!item) {
    return (
      <main className="flex-1 overflow-y-auto bg-zinc-900 flex items-center justify-center">
        <p className="text-zinc-600 text-sm">項目を選択してください</p>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto bg-zinc-900">
      <div className="max-w-2xl mx-auto px-10 py-12">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            {item.completed ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <span>✓</span> 完了
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                未着手
              </span>
            )}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 leading-snug">
            {item.label}
          </h1>
          <p className="mt-3 text-base text-zinc-300 leading-relaxed">
            {item.description}
          </p>
        </header>

        <div className="space-y-8">
          <section>
            <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
              詳細解説
            </h2>
            <p className="text-sm text-zinc-400 leading-7">{item.detail}</p>
          </section>

          {item.commands && item.commands.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
                コマンド例
              </h2>
              <ul className="space-y-2">
                {item.commands.map((cmd) => (
                  <li key={cmd}>
                    <code className="block font-mono text-sm bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-indigo-300 leading-relaxed">
                      {cmd}
                    </code>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="pt-4 border-t border-zinc-800">
            <p className="text-xs text-zinc-600">
              {item.completed
                ? 'このトピックは学習済みです。'
                : 'まだ試していません。実際に手を動かして体験してみましょう。'}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
