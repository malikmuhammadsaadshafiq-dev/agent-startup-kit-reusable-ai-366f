'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Terminal, ExternalLink } from 'lucide-react'
import { clsx } from 'clsx'

const NAV_LINKS = [
  { href: '/workflows', label: 'Workflows' },
  { href: '/install', label: 'Install' },
  { href: '/docs', label: 'Docs' },
  { href: '/submit', label: 'Submit' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-zinc-950">
            <Terminal size={14} strokeWidth={2.5} />
          </span>
          <span className="font-display font-semibold text-sm tracking-tight text-zinc-100">
            agent<span className="text-accent">kit</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                'px-3 py-1.5 rounded-md text-sm transition-colors duration-150',
                pathname === l.href
                  ? 'text-zinc-100 bg-zinc-800'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900'
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://github.com/agent-startup-kit/kit"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <ExternalLink size={12} />
            GitHub
          </Link>
          <Link
            href="/install"
            className="px-3 py-1.5 rounded-md bg-accent hover:bg-accent-light text-zinc-950 text-sm font-semibold transition-colors duration-150 active:scale-[0.98]"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-1.5 text-zinc-400 hover:text-zinc-100"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-zinc-950 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm text-zinc-300 hover:text-zinc-100 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/install"
            onClick={() => setOpen(false)}
            className="mt-3 py-2 text-center rounded-md bg-accent text-zinc-950 text-sm font-semibold"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}
