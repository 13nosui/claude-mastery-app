import { LearningApp } from '@/components/LearningApp'
import { MASTERY_CATEGORIES } from '@/lib/mastery-data'
import { ROLES } from '@/lib/roles-data'

export default function Home() {
  return <LearningApp categories={MASTERY_CATEGORIES} roles={ROLES} />
}
