export interface MasteryItem {
  id: string
  label: string
  completed: boolean
  description: string
  detail: string
  commands?: string[]
  sourceUrl?: string
  usageExample?: string
}

export interface MasteryCategory {
  id: string
  label: string
  icon: string
  items: MasteryItem[]
}
