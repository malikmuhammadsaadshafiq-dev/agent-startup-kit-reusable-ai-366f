import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Agent Startup Kit — Reusable AI Coding Workflows',
  description:
    'Ship features in minutes, not days. Install complete, production-ready AI coding workflows for Claude Code and VS Code with a single command.',
  openGraph: {
    title: 'Agent Startup Kit',
    description: 'Reusable AI coding workflows for Claude Code & VS Code',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased min-h-screen bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  )
}
