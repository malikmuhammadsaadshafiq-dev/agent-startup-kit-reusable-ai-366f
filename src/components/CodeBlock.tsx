import { highlight } from '@/lib/highlight'
import CopyButton from './CopyButton'

interface Props {
  code: string
  lang?: string
  filename?: string
  showLineNumbers?: boolean
}

export default async function CodeBlock({ code, lang = 'typescript', filename }: Props) {
  const html = await highlight(code, lang)

  return (
    <div className="relative rounded-xl overflow-hidden border border-zinc-800 bg-[#0d1117]">
      {filename && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800">
          <span className="text-xs text-zinc-500 font-mono">{filename}</span>
          <CopyButton text={code} size="sm" />
        </div>
      )}
      {!filename && (
        <div className="absolute top-3 right-3 z-10">
          <CopyButton text={code} size="sm" />
        </div>
      )}
      <div
        className="shiki overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
