import type { MasteryItem } from '@/types/mastery'
import { CommandList } from '@/components/CommandList'

function renderDetail(text: string) {
  return text.split(/(（[^）]+）)/g).map((part, i) =>
    part.startsWith('（') && part.endsWith('）') ? (
      <span key={i} className="text-zinc-500">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

interface ContentAreaProps {
  item: MasteryItem | undefined
  onToggle: (id: string) => void
}

export function ContentArea({ item, onToggle }: ContentAreaProps) {
  if (!item) {
    return (
      <main className="flex-1 overflow-y-auto bg-zinc-900 flex items-center justify-center">
        <p className="text-zinc-400 text-sm">項目を選択してください</p>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto bg-zinc-900">
      <div className="max-w-2xl mx-auto px-10 py-12">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => onToggle(item.id)}
              aria-pressed={item.completed}
              aria-label={
                item.completed
                  ? '完了済み。クリックで未着手に戻す'
                  : '未着手。クリックで完了にする'
              }
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
                item.completed
                  ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500/20'
                  : 'bg-zinc-800 text-zinc-400 border-zinc-700 hover:bg-zinc-700 hover:text-zinc-200'
              }`}
            >
              {item.completed ? (
                <>
                  <span aria-hidden="true">✓</span> 完了済み
                </>
              ) : (
                <>
                  <span aria-hidden="true">○</span> 未着手
                </>
              )}
            </button>
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
            <p className="text-sm text-zinc-400 leading-7">{renderDetail(item.detail)}</p>
          </section>

          {item.usageExample && (
            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
                利用シーン例
              </h2>
              <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-5 py-4">
                <p className="text-sm text-amber-200/80 leading-7">{item.usageExample}</p>
              </div>
            </section>
          )}

          {item.commands && item.commands.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
                コマンド例
              </h2>
              <CommandList commands={item.commands} />
            </section>
          )}

          {item.sourceUrl && (
            <section>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
                公式ドキュメント
              </h2>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`公式ドキュメントを新しいタブで開く: ${item.sourceUrl}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-zinc-700 bg-zinc-800 text-sm text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 shrink-0 text-zinc-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
                <span className="truncate">{item.sourceUrl}</span>
              </a>
            </section>
          )}

          <div className="pt-4 border-t border-zinc-800">
            <p className="text-xs text-zinc-400">
              {item.completed
                ? 'このトピックは学習済みです。クリックで未着手に戻せます。'
                : 'まだ試していません。実際に手を動かして体験してみましょう。'}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
