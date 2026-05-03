'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { clsx } from 'clsx'

interface Props {
  text: string
  className?: string
  size?: 'sm' | 'md'
}

export default function CopyButton({ text, className, size = 'md' }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard API blocked — silently fail
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied' : 'Copy to clipboard'}
      className={clsx(
        'flex items-center gap-1.5 rounded transition-all duration-150 active:scale-[0.96]',
        size === 'sm'
          ? 'px-2 py-1 text-xs'
          : 'px-2.5 py-1.5 text-xs',
        copied
          ? 'bg-accent/20 text-accent'
          : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200',
        className
      )}
    >
      {copied ? (
        <>
          <Check size={11} strokeWidth={2.5} />
          <span className="font-mono">Copied</span>
        </>
      ) : (
        <>
          <Copy size={11} strokeWidth={2} />
          <span className="font-mono">Copy</span>
        </>
      )}
    </button>
  )
}
