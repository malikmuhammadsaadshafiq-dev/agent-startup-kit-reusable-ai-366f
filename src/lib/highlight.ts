import { getSingletonHighlighter } from 'shiki'

const THEME = 'github-dark-dimmed'

export async function highlight(code: string, lang = 'typescript'): Promise<string> {
  const hl = await getSingletonHighlighter({
    themes: [THEME],
    langs: [lang as Parameters<typeof getSingletonHighlighter>[0]['langs'][number]],
  })
  return hl.codeToHtml(code, { lang, theme: THEME })
}

export const SAMPLE_SNIPPETS: Record<string, { code: string; lang: string }> = {
  'auth-jwt': {
    lang: 'typescript',
    code: `import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/db'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { verifyPassword } from '@/lib/password'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    GitHub,
    Credentials({
      async authorize({ email, password }) {
        const user = await db.user.findUnique({ where: { email: String(email) } })
        if (!user?.passwordHash) return null
        const valid = await verifyPassword(String(password), user.passwordHash)
        return valid ? user : null
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      session.user.id = String(token.id)
      return session
    },
  },
})`,
  },
  'payments-stripe': {
    lang: 'typescript',
    code: `import { stripe } from '@/lib/stripe'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { priceId } = await req.json()

  const checkout = await stripe.checkout.sessions.create({
    customer_email: session.user.email ?? undefined,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: \`\${process.env.NEXT_PUBLIC_URL}/dashboard?success=1\`,
    cancel_url: \`\${process.env.NEXT_PUBLIC_URL}/pricing\`,
    metadata: { userId: session.user.id },
  })

  return NextResponse.json({ url: checkout.url })
}`,
  },
  'rag-openai': {
    lang: 'typescript',
    code: `import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { searchDocuments } from '@/lib/vectorstore'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const { messages } = await req.json()
  const query = messages.at(-1)?.content ?? ''

  const docs = await searchDocuments(query, { topK: 5 })
  const context = docs.map((d) => d.content).join('\\n\\n---\\n\\n')

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: \`You are a helpful assistant. Use the following context to answer:\\n\\n\${context}\`,
    messages,
  })

  return result.toDataStreamResponse()
}`,
  },
}
