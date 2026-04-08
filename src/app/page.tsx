import { LearningApp } from '@/components/LearningApp'
import { MASTERY_CATEGORIES } from '@/lib/mastery-data'

export default function Home() {
  return <LearningApp categories={MASTERY_CATEGORIES} />
}
