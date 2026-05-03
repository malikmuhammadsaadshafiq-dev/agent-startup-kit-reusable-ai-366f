'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import CopyButton from './CopyButton'

const TABS = [
  {
    id: 'cli',
    label: 'CLI',
    steps: [
      { cmd: 'npm install -g agent-kit', desc: 'Install the global CLI' },
      { cmd: 'npx agent-kit init', desc: 'Initialize in your project' },
      { cmd: 'npx agent-kit add <workflow>', desc: 'Add any workflow' },
    ],
  },
  {
    id: 'vscode',
    label: 'VS Code',
    steps: [
      { cmd: 'ext install agentkit.agent-startup-kit', desc: 'Install the extension' },
      { cmd: 'Cmd+Shift+P → Agent Kit: Add Workflow', desc: 'Open the workflow picker' },
      { cmd: 'Select & confirm', desc: 'Files are scaffolded immediately' },
    ],
  },
  {
    id: 'claude',
    label: 'Claude Code',
    steps: [
      { cmd: 'npx agent-kit install-skill', desc: 'Register the Claude Code skill' },
      { cmd: '/add-workflow auth-jwt', desc: 'Use the slash command in Claude Code' },
      { cmd: 'Claude scaffolds & wires it up', desc: 'AI handles the integration for you' },
    ],
  },
]

export default function InstallTabs() {
  const [active, setActive] = useState('cli')
  const tab = TABS.find((t) => t.id === active) ?? TABS[0]

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
      <div className="flex border-b border-zinc-800">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={clsx(
              'px-5 py-3 text-sm font-medium transition-colors duration-150',
              active === t.id
                ? 'text-zinc-100 bg-zinc-900 border-b-2 border-accent -mb-px'
                : 'text-zinc-500 hover:text-zinc-300'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-6 space-y-4">
        {tab.steps.map((step, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-[10px] font-mono text-zinc-400">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 bg-zinc-950/80 rounded-lg px-3 py-2 mb-1.5 border border-zinc-800/60">
                <code className="text-xs text-accent font-mono truncate">{step.cmd}</code>
                <CopyButton text={step.cmd} size="sm" />
              </div>
              <p className="text-xs text-zinc-500">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
