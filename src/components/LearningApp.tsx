'use client'

import { useEffect, useMemo, useState } from 'react'
import type { MasteryCategory, Role } from '@/types/mastery'
import { Sidebar } from '@/components/Sidebar'
import { ContentArea } from '@/components/ContentArea'
import { RoleSelector } from '@/components/RoleSelector'

const STORAGE_KEY = 'claude-mastery-progress'
const ROLE_KEY = 'claude-mastery-role'

interface LearningAppProps {
  categories: MasteryCategory[]
  roles: Role[]
}

export function LearningApp({ categories, roles }: LearningAppProps) {
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  const defaultCompleted = useMemo(
    () =>
      categories
        .flatMap((c) => c.items)
        .filter((i) => i.completed)
        .map((i) => i.id),
    [categories]
  )

  const [completedIds, setCompletedIds] = useState<Set<string>>(
    () => new Set(defaultCompleted)
  )

  // マウント後に localStorage から進捗と選択職種を復元
  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(STORAGE_KEY)
      if (storedProgress) {
        setCompletedIds(new Set(JSON.parse(storedProgress) as string[]))
      }
      const storedRole = localStorage.getItem(ROLE_KEY)
      if (storedRole) {
        const role = roles.find((r) => r.id === storedRole)
        if (role) {
          setSelectedRoleId(storedRole)
          const firstRoleItem = role.items[0]
          if (firstRoleItem) {
            setSelectedId(firstRoleItem.id)
          }
        }
      }
    } catch {}
    setMounted(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const selectedRole = roles.find((r) => r.id === selectedRoleId) ?? null

  // 職種が選ばれている場合のみ、その職種のカテゴリを先頭に差し込む
  const mergedCategories: MasteryCategory[] = useMemo(() => {
    if (!selectedRole) return categories
    const roleCategory: MasteryCategory = {
      id: `role-${selectedRole.id}`,
      label: `${selectedRole.label}向け`,
      icon: selectedRole.icon,
      items: selectedRole.items,
    }
    return [roleCategory, ...categories]
  }, [categories, selectedRole])

  const firstItem = mergedCategories[0]?.items[0]
  const [selectedId, setSelectedId] = useState<string>(firstItem?.id ?? '')

  const handleSelectRole = (roleId: string) => {
    setSelectedRoleId(roleId)
    const role = roles.find((r) => r.id === roleId)
    const firstRoleItem = role?.items[0]
    if (firstRoleItem) setSelectedId(firstRoleItem.id)
    try {
      localStorage.setItem(ROLE_KEY, roleId)
    } catch {}
  }

  const handleChangeRole = () => {
    setSelectedRoleId(null)
    try {
      localStorage.removeItem(ROLE_KEY)
    } catch {}
  }

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {}
      return next
    })
  }

  const enrichedCategories: MasteryCategory[] = mergedCategories.map((cat) => ({
    ...cat,
    items: cat.items.map((item) => ({
      ...item,
      completed: completedIds.has(item.id) || item.completed,
    })),
  }))

  const selectedItem = enrichedCategories
    .flatMap((c) => c.items)
    .find((item) => item.id === selectedId)

  // 初回マウント前、または職種未選択時はセレクタを表示
  if (!mounted || !selectedRole) {
    return <RoleSelector roles={roles} onSelect={handleSelectRole} />
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden">
      <Sidebar
        categories={enrichedCategories}
        selectedId={selectedId}
        onSelect={setSelectedId}
        mounted={mounted}
        currentRoleLabel={selectedRole.label}
        onChangeRole={handleChangeRole}
      />
      <ContentArea item={selectedItem} onToggle={toggleCompleted} />
    </div>
  )
}
