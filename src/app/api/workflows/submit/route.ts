import { NextResponse } from 'next/server'

interface SubmitPayload {
  name: string
  description: string
  category: string
  githubUrl: string
  authorName: string
  authorEmail: string
  tags: string
}

export async function POST(request: Request) {
  try {
    const body: SubmitPayload = await request.json()

    if (!body.name || !body.description || !body.githubUrl || !body.authorEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, githubUrl, authorEmail' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.authorEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const submission = {
      id: `sub_${Date.now()}`,
      ...body,
      status: 'pending_review',
      submittedAt: new Date().toISOString(),
    }

    console.log('[workflow-submit]', submission)

    return NextResponse.json(
      { success: true, submissionId: submission.id, message: 'Your workflow has been submitted for review. We will reach out within 48 hours.' },
      { status: 201 }
    )
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
