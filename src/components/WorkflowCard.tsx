import Link from 'next/link'
import Image from 'next/image'
import { Star, Download, ArrowRight } from 'lucide-react'
import type { Workflow } from '@/lib/types'
import { clsx } from 'clsx'

const DIFFICULTY_STYLE = {
  beginner: 'text-emerald-400 bg-emerald-400/10',
  intermediate: 'text-yellow-400 bg-yellow-400/10',
  advanced: 'text-red-400 bg-red-400/10',
}

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

interface Props {
  workflow: Workflow
  index?: number
}

export default function WorkflowCard({ workflow, index = 0 }: Props) {
  return (
    <Link
      href={`/workflows/${workflow.slug}`}
      className="group block rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-200 active:scale-[0.99]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Image
            src={`https://picsum.photos/seed/${workflow.authorSeed}/32/32`}
            alt={workflow.author}
            width={24}
            height={24}
            className="rounded-full shrink-0 ring-1 ring-zinc-700"
          />
          <span className="text-xs text-zinc-500 truncate">{workflow.author}</span>
        </div>
        <span className={clsx('text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0', DIFFICULTY_STYLE[workflow.difficulty])}>
          {workflow.difficulty}
        </span>
      </div>

      <h3 className="font-display font-semibold text-zinc-100 mb-1.5 group-hover:text-white transition-colors">
        {workflow.name}
      </h3>
      <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-4">
        {workflow.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {workflow.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-500">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-zinc-600">
          <span className="flex items-center gap-1">
            <Star size={11} className="text-yellow-500/70" />
            {fmt(workflow.stars)}
          </span>
          <span className="flex items-center gap-1">
            <Download size={11} />
            {fmt(workflow.installs)}
          </span>
        </div>
        <span className="flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          View workflow
          <ArrowRight size={11} />
        </span>
      </div>
    </Link>
  )
}
