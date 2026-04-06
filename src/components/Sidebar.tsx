import type { MasteryCategory, MasteryItem } from '@/types/mastery'

interface SidebarProps {
  categories: MasteryCategory[]
  selectedId: string
  onSelect: (id: string) => void
}

export function Sidebar({ categories, selectedId, onSelect }: SidebarProps) {
  return (
    <aside className="flex flex-col w-64 shrink-0 border-r border-zinc-800 overflow-y-auto bg-zinc-950">
      <div className="px-5 py-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="text-sm font-semibold tracking-tight text-zinc-100">
            Claude Code Mastery
          </span>
        </div>
        <p className="mt-1 text-xs text-zinc-500">主要機能を体系的に学ぶ</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6">
        {categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        ))}
      </nav>
    </aside>
  )
}

interface CategorySectionProps {
  category: MasteryCategory
  selectedId: string
  onSelect: (id: string) => void
}

function CategorySection({ category, selectedId, onSelect }: CategorySectionProps) {
  const completedCount = category.items.filter((i) => i.completed).length
  const totalCount = category.items.length

  return (
    <div>
      <div className="flex items-center justify-between px-2 mb-1">
        <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
          {category.icon} {category.label}
        </span>
        <span className="text-xs text-zinc-600">
          {completedCount}/{totalCount}
        </span>
      </div>
      <ul className="space-y-0.5">
        {category.items.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isSelected={item.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </div>
  )
}

interface SidebarItemProps {
  item: MasteryItem
  isSelected: boolean
  onSelect: (id: string) => void
}

function SidebarItem({ item, isSelected, onSelect }: SidebarItemProps) {
  return (
    <li>
      <button
        onClick={() => onSelect(item.id)}
        className={`w-full text-left flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
          isSelected
            ? 'bg-indigo-500/10 text-indigo-400 border-l-2 border-indigo-500 pl-[10px]'
            : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
        }`}
      >
        <span
          className={`shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${
            item.completed
              ? 'bg-indigo-500/20 border-indigo-500/50'
              : 'border-zinc-700'
          }`}
        >
          {item.completed && (
            <span className="text-[9px] text-indigo-400">✓</span>
          )}
        </span>
        <span className={item.completed ? 'text-zinc-500 line-through' : ''}>
          {item.label}
        </span>
      </button>
    </li>
  )
}
