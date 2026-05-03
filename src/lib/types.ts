export interface FileNode {
  name: string
  type: 'file' | 'dir'
  children?: FileNode[]
}

export interface Workflow {
  slug: string
  name: string
  description: string
  readme: string
  category: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  stars: number
  installs: number
  author: string
  authorSeed: string
  updatedAt: string
  files: FileNode[]
  installCommand: string
  claudePrompts: string[]
  envVars?: { key: string; description: string; example: string }[]
}

export type WorkflowCategory =
  | 'all'
  | 'auth'
  | 'payments'
  | 'database'
  | 'ai'
  | 'email'
  | 'storage'
  | 'realtime'
  | 'export'
  | 'notifications'
