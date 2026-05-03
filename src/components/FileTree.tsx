import { Folder, FolderOpen, FileCode } from 'lucide-react'
import type { FileNode } from '@/lib/types'
import { clsx } from 'clsx'

interface Props {
  nodes: FileNode[]
  depth?: number
}

function getFileColor(name: string): string {
  if (name.endsWith('.ts') || name.endsWith('.tsx')) return 'text-sky-400'
  if (name.endsWith('.prisma')) return 'text-indigo-400'
  if (name.endsWith('.json')) return 'text-yellow-400'
  if (name.endsWith('.js')) return 'text-yellow-300'
  if (name.endsWith('.css')) return 'text-pink-400'
  if (name.endsWith('.env') || name.includes('.env')) return 'text-red-400'
  return 'text-zinc-400'
}

function TreeNode({ node, depth = 0 }: { node: FileNode; depth: number }) {
  const isDir = node.type === 'dir'
  const indent = depth * 16

  return (
    <div>
      <div
        className={clsx(
          'flex items-center gap-1.5 py-0.5 px-2 rounded hover:bg-zinc-800/60 transition-colors',
          'text-xs'
        )}
        style={{ paddingLeft: `${8 + indent}px` }}
      >
        {isDir ? (
          <>
            {node.children && node.children.length > 0 ? (
              <FolderOpen size={13} className="text-yellow-500/80 shrink-0" />
            ) : (
              <Folder size={13} className="text-yellow-500/60 shrink-0" />
            )}
            <span className="text-zinc-300 font-mono">{node.name}</span>
          </>
        ) : (
          <>
            <FileCode size={13} className={clsx('shrink-0', getFileColor(node.name))} />
            <span className={clsx('font-mono', getFileColor(node.name))}>{node.name}</span>
          </>
        )}
      </div>
      {isDir && node.children && (
        <div>
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function FileTree({ nodes, depth = 0 }: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-3 font-mono">
      {nodes.map((node, i) => (
        <TreeNode key={i} node={node} depth={depth} />
      ))}
    </div>
  )
}
