'use client'

import { useState } from 'react'
import type { MasteryCategory } from '@/types/mastery'
import { Sidebar } from '@/components/Sidebar'
import { ContentArea } from '@/components/ContentArea'

interface LearningAppProps {
  categories: MasteryCategory[]
}

export function LearningApp({ categories }: LearningAppProps) {
  const firstItem = categories[0]?.items[0]
  const [selectedId, setSelectedId] = useState<string>(firstItem?.id ?? '')

  const selectedItem = categories
    .flatMap((c) => c.items)
    .find((item) => item.id === selectedId)

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <Sidebar
        categories={categories}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />
      <ContentArea item={selectedItem} />
    </div>
  )
}
