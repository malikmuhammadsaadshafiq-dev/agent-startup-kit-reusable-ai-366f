import Link from 'next/link'
import { Terminal } from 'lucide-react'

const LINKS = {
  Product: [
    { href: '/workflows', label: 'Browse Workflows' },
    { href: '/install', label: 'Install Guide' },
    { href: '/docs', label: 'Documentation' },
    { href: '/submit', label: 'Submit Workflow' },
  ],
  Community: [
    { href: 'https://github.com/agent-startup-kit/kit', label: 'GitHub', external: true },
    { href: 'https://discord.gg/agentkit', label: 'Discord', external: true },
    { href: 'https://twitter.com/agentkit_dev', label: 'Twitter', external: true },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/license', label: 'MIT License' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-zinc-950">
                <Terminal size={14} strokeWidth={2.5} />
              </span>
              <span className="font-display font-semibold text-sm tracking-tight">
                agent<span className="text-accent">kit</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[22ch]">
              Production workflows. One command. Ship faster.
            </p>
          </div>

          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-4">{group}</p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target={'external' in item && item.external ? '_blank' : undefined}
                      rel={'external' in item && item.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors duration-150"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Agent Startup Kit. Open source under MIT.
          </p>
          <p className="text-xs text-zinc-600 font-mono">v2.4.1</p>
        </div>
      </div>
    </footer>
  )
}
