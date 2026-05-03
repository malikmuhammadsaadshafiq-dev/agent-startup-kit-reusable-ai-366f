import { NextResponse } from 'next/server'
import { getAllWorkflows, getWorkflowsByCategory } from '@/lib/workflows'
import type { WorkflowCategory } from '@/lib/types'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = (searchParams.get('category') ?? 'all') as WorkflowCategory
  const query = searchParams.get('q')?.toLowerCase() ?? ''

  let workflows = getWorkflowsByCategory(category)

  if (query) {
    workflows = workflows.filter(
      (w) =>
        w.name.toLowerCase().includes(query) ||
        w.description.toLowerCase().includes(query) ||
        w.tags.some((t) => t.toLowerCase().includes(query))
    )
  }

  return NextResponse.json({
    workflows,
    total: getAllWorkflows().length,
    filtered: workflows.length,
  })
}
