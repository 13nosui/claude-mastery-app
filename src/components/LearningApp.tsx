'use client'

import { useState } from 'react'
import type { MasteryCategory } from '@/types/mastery'
import { Sidebar } from '@/components/Sidebar'
import { ContentArea } from '@/components/ContentArea'

const STORAGE_KEY = 'claude-mastery-progress'

interface LearningAppProps {
  categories: MasteryCategory[]
}

export function LearningApp({ categories }: LearningAppProps) {
  const firstItem = categories[0]?.items[0]
  const [selectedId, setSelectedId] = useState<string>(firstItem?.id ?? '')

  const defaultCompleted = categories
    .flatMap((c) => c.items)
    .filter((i) => i.completed)
    .map((i) => i.id)

  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set(defaultCompleted)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return new Set(JSON.parse(stored) as string[])
    } catch {}
    return new Set(defaultCompleted)
  })

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      return next
    })
  }

  const enrichedCategories: MasteryCategory[] = categories.map((cat) => ({
    ...cat,
    items: cat.items.map((item) => ({ ...item, completed: completedIds.has(item.id) })),
  }))

  const selectedItem = enrichedCategories
    .flatMap((c) => c.items)
    .find((item) => item.id === selectedId)

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <Sidebar
        categories={enrichedCategories}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ContentArea item={selectedItem} onToggle={toggleCompleted} />
    </div>
  )
}
