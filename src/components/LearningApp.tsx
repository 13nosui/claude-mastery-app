'use client'

import { useEffect, useState } from 'react'
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

  // 初期値は常にデータの default を使う（SSR とクライアント初回描画を一致させる）
  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => new Set(defaultCompleted)
  )
  const [mounted, setMounted] = useState(false)

  // マウント後に localStorage の値でハイドレート（SSR と初回描画を一致させる必要があるためここで setState する）
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCompletedIds(new Set(JSON.parse(stored) as string[]))
      }
    } catch {}
    setMounted(true)
  }, [])

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
        mounted={mounted}
      />
      <ContentArea item={selectedItem} onToggle={toggleCompleted} />
    </div>
  )
}
