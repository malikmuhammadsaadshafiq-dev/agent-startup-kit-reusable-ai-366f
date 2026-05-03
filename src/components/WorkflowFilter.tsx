'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import WorkflowCard from './WorkflowCard'
import type { Workflow, WorkflowCategory } from '@/lib/types'
import { clsx } from 'clsx'

const CATEGORIES: { value: WorkflowCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'auth', label: 'Auth' },
  { value: 'payments', label: 'Payments' },
  { value: 'database', label: 'Database' },
  { value: 'ai', label: 'AI' },
  { value: 'email', label: 'Email' },
  { value: 'storage', label: 'Storage' },
  { value: 'realtime', label: 'Realtime' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'export', label: 'Export' },
]

interface Props {
  workflows: Workflow[]
}

export default function WorkflowFilter({ workflows }: Props) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<WorkflowCategory>('all')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return workflows.filter((w) => {
      const matchCat = category === 'all' || w.category === category
      const matchQ =
        !q ||
        w.name.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.tags.some((t) => t.toLowerCase().includes(q))
      return matchCat && matchQ
    })
  }, [workflows, query, category])

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workflows..."
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={clsx(
              'px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150',
              category === cat.value
                ? 'bg-accent text-zinc-950 font-semibold'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-display text-lg text-zinc-400 mb-2">No workflows found</p>
          <p className="text-sm text-zinc-600">Try a different search term or category</p>
          <button
            onClick={() => { setQuery(''); setCategory('all') }}
            className="mt-6 px-4 py-2 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-zinc-600 mb-5 font-mono">{filtered.length} workflows</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((w, i) => (
              <WorkflowCard key={w.slug} workflow={w} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
