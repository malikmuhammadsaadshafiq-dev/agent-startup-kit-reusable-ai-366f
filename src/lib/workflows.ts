import { WORKFLOWS } from './workflow-data'
import type { Workflow, WorkflowCategory } from './types'

export function getAllWorkflows(): Workflow[] {
  return WORKFLOWS
}

export function getWorkflowBySlug(slug: string): Workflow | undefined {
  return WORKFLOWS.find((w) => w.slug === slug)
}

export function getWorkflowsByCategory(category: WorkflowCategory): Workflow[] {
  if (category === 'all') return WORKFLOWS
  return WORKFLOWS.filter((w) => w.category === category)
}

export function getAllCategories(): WorkflowCategory[] {
  const cats = Array.from(new Set(WORKFLOWS.map((w) => w.category))) as WorkflowCategory[]
  return ['all', ...cats]
}

export function getAllTags(): string[] {
  return Array.from(new Set(WORKFLOWS.flatMap((w) => w.tags))).sort()
}

export function getTotalInstalls(): number {
  return WORKFLOWS.reduce((sum, w) => sum + w.installs, 0)
}

export function getTotalStars(): number {
  return WORKFLOWS.reduce((sum, w) => sum + w.stars, 0)
}

export function getFeaturedWorkflows(): Workflow[] {
  return WORKFLOWS.sort((a, b) => b.installs - a.installs).slice(0, 6)
}

export { type Workflow, type WorkflowCategory }
