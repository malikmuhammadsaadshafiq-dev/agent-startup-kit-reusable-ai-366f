import type { Workflow } from './types'

export const WORKFLOWS: Workflow[] = [
  {
    slug: 'auth-jwt',
    name: 'JWT Authentication',
    description:
      'Complete NextAuth.js v5 setup with Prisma adapter, JWT strategy, credential + OAuth providers, and middleware-protected routes.',
    readme:
      'Installs a fully wired NextAuth.js v5 configuration alongside a Prisma session adapter. Covers credential sign-in, GitHub/Google OAuth, JWT rotation, and a middleware guard that protects any route under /dashboard. Configure providers via environment variables — no manual wiring needed.',
    category: 'auth',
    tags: ['nextauth', 'prisma', 'jwt', 'oauth', 'middleware'],
    difficulty: 'intermediate',
    stars: 847,
    installs: 12_430,
    author: 'Mira Vance',
    authorSeed: 'mirav',
    updatedAt: '2024-11-18',
    installCommand: 'npx agent-kit add auth-jwt',
    files: [
      {
        name: 'src', type: 'dir', children: [
          { name: 'auth.ts', type: 'file' },
          { name: 'middleware.ts', type: 'file' },
          {
            name: 'app', type: 'dir', children: [
              {
                name: 'api', type: 'dir', children: [
                  {
                    name: 'auth', type: 'dir', children: [
                      {
                        name: '[...nextauth]', type: 'dir', children: [
                          { name: 'route.ts', type: 'file' },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: '(auth)', type: 'dir', children: [
                  { name: 'login', type: 'dir', children: [{ name: 'page.tsx', type: 'file' }] },
                ],
              },
            ],
          },
        ],
      },
    ],
    claudePrompts: [
      'Add the auth-jwt workflow to my Next.js project. Use my existing Prisma schema and protect everything under /dashboard.',
      'Set up Google OAuth with the auth-jwt workflow. Add a custom sign-in page at /login with email + password fallback.',
    ],
    envVars: [
      { key: 'AUTH_SECRET', description: 'Random secret for JWT signing', example: 'openssl rand -base64 32' },
      { key: 'AUTH_GITHUB_ID', description: 'GitHub OAuth App client ID', example: 'Ov23li...' },
      { key: 'AUTH_GITHUB_SECRET', description: 'GitHub OAuth App secret', example: 'abc123...' },
    ],
  },
  {
    slug: 'payments-stripe',
    name: 'Stripe Payments',
    description:
      'Checkout sessions, subscription management, customer portal, and battle-tested webhook handling with Stripe.',
    readme:
      'Scaffolds a complete Stripe integration: checkout session creation, Stripe Customer Portal redirect, webhook endpoint with signature verification, and a Prisma-backed subscription state. Handles plan upgrades, cancellations, and failed payment recovery automatically.',
    category: 'payments',
    tags: ['stripe', 'webhooks', 'subscriptions', 'billing'],
    difficulty: 'advanced',
    stars: 1_203,
    installs: 18_720,
    author: 'Theo Okafor',
    authorSeed: 'theook',
    updatedAt: '2024-11-22',
    installCommand: 'npx agent-kit add payments-stripe',
    files: [
      {
        name: 'src', type: 'dir', children: [
          { name: 'lib', type: 'dir', children: [{ name: 'stripe.ts', type: 'file' }] },
          {
            name: 'app', type: 'dir', children: [
              {
                name: 'api', type: 'dir', children: [
                  { name: 'checkout', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] },
                  { name: 'portal', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] },
                  {
                    name: 'webhooks', type: 'dir', children: [
                      { name: 'stripe', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    claudePrompts: [
      'Add the payments-stripe workflow. I have three plans: Starter ($9/mo), Pro ($29/mo), and Scale ($99/mo). Map them to my Prisma User model.',
      'Wire up the Stripe webhook handler from payments-stripe. Send a confirmation email via Resend when a subscription activates.',
    ],
    envVars: [
      { key: 'STRIPE_SECRET_KEY', description: 'Stripe API secret key', example: 'sk_live_...' },
      { key: 'STRIPE_WEBHOOK_SECRET', description: 'Webhook endpoint signing secret', example: 'whsec_...' },
      { key: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', description: 'Public key for client-side', example: 'pk_live_...' },
    ],
  },
  {
    slug: 'crud-prisma',
    name: 'Full CRUD with Prisma',
    description:
      'Type-safe server actions for create, read, update, delete operations using Prisma ORM with optimistic UI patterns.',
    readme:
      'Generates a complete CRUD layer with Next.js server actions, Zod input validation, Prisma transactions, and client-side optimistic updates. Includes pagination, soft-delete, and an audit log table.',
    category: 'database',
    tags: ['prisma', 'server-actions', 'zod', 'crud', 'typescript'],
    difficulty: 'intermediate',
    stars: 634,
    installs: 9_180,
    author: 'Priya Sundaram',
    authorSeed: 'priyasun',
    updatedAt: '2024-10-31',
    installCommand: 'npx agent-kit add crud-prisma',
    files: [
      {
        name: 'src', type: 'dir', children: [
          {
            name: 'lib', type: 'dir', children: [
              { name: 'db.ts', type: 'file' },
              { name: 'actions.ts', type: 'file' },
            ],
          },
          { name: 'schema', type: 'dir', children: [{ name: 'validation.ts', type: 'file' }] },
        ],
      },
      { name: 'prisma', type: 'dir', children: [{ name: 'schema.prisma', type: 'file' }] },
    ],
    claudePrompts: [
      'Add the crud-prisma workflow for a "Project" model with fields: title, description, status (enum), ownerId, and timestamps.',
      'Use the crud-prisma workflow to build CRUD for blog posts. Add rich text support and a published/draft status toggle.',
    ],
    envVars: [
      { key: 'DATABASE_URL', description: 'PostgreSQL connection string', example: 'postgresql://user:pass@host:5432/db' },
    ],
  },
  {
    slug: 'rag-openai',
    name: 'RAG Pipeline',
    description:
      'Retrieval-augmented generation with OpenAI embeddings, pgvector storage, and streaming chat responses.',
    readme:
      'Builds a production RAG pipeline: document ingestion with chunking, OpenAI text-embedding-3-small vectorization, pgvector similarity search, and a streaming chat endpoint. Includes a document upload UI and conversation history.',
    category: 'ai',
    tags: ['openai', 'rag', 'embeddings', 'pgvector', 'streaming'],
    difficulty: 'advanced',
    stars: 2_108,
    installs: 31_450,
    author: 'Yuki Tanaka',
    authorSeed: 'yukitan',
    updatedAt: '2024-11-28',
    installCommand: 'npx agent-kit add rag-openai',
    files: [
      {
        name: 'src', type: 'dir', children: [
          {
            name: 'lib', type: 'dir', children: [
              { name: 'embeddings.ts', type: 'file' },
              { name: 'vectorstore.ts', type: 'file' },
              { name: 'chunker.ts', type: 'file' },
            ],
          },
          {
            name: 'app', type: 'dir', children: [
              {
                name: 'api', type: 'dir', children: [
                  { name: 'ingest', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] },
                  { name: 'chat', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] },
                ],
              },
            ],
          },
        ],
      },
    ],
    claudePrompts: [
      'Add the rag-openai workflow. My documents are PDFs stored in S3. Configure ingestion to chunk at 512 tokens with 64 token overlap.',
      'Wire up the RAG chat endpoint from rag-openai to a streaming UI component. Show source citations below each answer.',
    ],
    envVars: [
      { key: 'OPENAI_API_KEY', description: 'OpenAI API key', example: 'sk-proj-...' },
      { key: 'DATABASE_URL', description: 'PostgreSQL + pgvector connection string', example: 'postgresql://...' },
    ],
  },
  {
    slug: 'email-resend',
    name: 'Transactional Email',
    description:
      'Resend-powered email system with React Email templates for welcome, password reset, and notification flows.',
    readme:
      'Sets up a full transactional email system using Resend and React Email. Ships with pre-built templates: welcome email, password reset, subscription confirmation, and weekly digest. All templates are responsive and render correctly across major clients.',
    category: 'email',
    tags: ['resend', 'react-email', 'templates', 'transactional'],
    difficulty: 'beginner',
    stars: 512,
    installs: 7_640,
    author: 'Camille Dubois',
    authorSeed: 'camdub',
    updatedAt: '2024-11-05',
    installCommand: 'npx agent-kit add email-resend',
    files: [
      {
        name: 'src', type: 'dir', children: [
          { name: 'lib', type: 'dir', children: [{ name: 'email.ts', type: 'file' }] },
          {
            name: 'emails', type: 'dir', children: [
              { name: 'welcome.tsx', type: 'file' },
              { name: 'reset-password.tsx', type: 'file' },
              { name: 'subscription.tsx', type: 'file' },
            ],
          },
          {
            name: 'app', type: 'dir', children: [
              {
                name: 'api', type: 'dir', children: [
                  { name: 'send-email', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] },
                ],
              },
            ],
          },
        ],
      },
    ],
    claudePrompts: [
      'Add the email-resend workflow. Send a welcome email when a user signs up via the auth-jwt workflow.',
      'Customize the welcome email template from email-resend to match our brand. Primary color: #10b981, logo at /public/logo.svg.',
    ],
    envVars: [
      { key: 'RESEND_API_KEY', description: 'Resend API key', example: 're_...' },
      { key: 'EMAIL_FROM', description: 'Verified sender address', example: 'noreply@yourdomain.com' },
    ],
  },
  {
    slug: 'file-upload-s3',
    name: 'S3 File Upload',
    description:
      'Presigned URL uploads to S3-compatible storage with progress tracking, file type validation, and CDN delivery.',
    readme:
      'Generates a complete file upload pipeline: presigned URL generation (server), direct-to-S3 upload (client), upload progress tracking, MIME type + size validation, and optional CloudFront CDN URL rewriting. Works with AWS S3, Cloudflare R2, and Supabase Storage.',
    category: 'storage',
    tags: ['s3', 'uploads', 'presigned-urls', 'cloudflare-r2', 'cdn'],
    difficulty: 'intermediate',
    stars: 729,
    installs: 11_200,
    author: 'Ravi Nair',
    authorSeed: 'ravinair',
    updatedAt: '2024-11-14',
    installCommand: 'npx agent-kit add file-upload-s3',
    files: [
      {
        name: 'src', type: 'dir', children: [
          { name: 'lib', type: 'dir', children: [{ name: 's3.ts', type: 'file' }] },
          {
            name: 'app', type: 'dir', children: [
              {
                name: 'api', type: 'dir', children: [
                  { name: 'upload-url', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] },
                ],
              },
            ],
          },
          {
            name: 'components', type: 'dir', children: [
              { name: 'FileUpload.tsx', type: 'file' },
            ],
          },
        ],
      },
    ],
    claudePrompts: [
      'Add the file-upload-s3 workflow using Cloudflare R2. Restrict uploads to images under 5 MB. Store the public URL in a Prisma Asset model.',
      'Wire up the file-upload-s3 component to a profile picture field. Show a circular crop preview after upload.',
    ],
    envVars: [
      { key: 'AWS_ACCESS_KEY_ID', description: 'AWS or R2 access key', example: 'AKIA...' },
      { key: 'AWS_SECRET_ACCESS_KEY', description: 'AWS or R2 secret key', example: 'wJalrXU...' },
      { key: 'S3_BUCKET_NAME', description: 'Target bucket name', example: 'my-uploads' },
      { key: 'S3_REGION', description: 'Bucket region', example: 'us-east-1' },
    ],
  },
  {
    slug: 'realtime-pusher',
    name: 'Real-time Channels',
    description:
      'Pusher Channels integration for live notifications, presence indicators, and collaborative cursor tracking.',
    readme:
      'Adds a full real-time layer using Pusher Channels: authenticated private channels, presence channels for online indicators, and a typed event system. Ships with a useChannel hook and server-side event emitter helper.',
    category: 'realtime',
    tags: ['pusher', 'websockets', 'presence', 'realtime', 'hooks'],
    difficulty: 'intermediate',
    stars: 388,
    installs: 5_940,
    author: 'Zara Mensah',
    authorSeed: 'zaramen',
    updatedAt: '2024-10-22',
    installCommand: 'npx agent-kit add realtime-pusher',
    files: [
      {
        name: 'src', type: 'dir', children: [
          { name: 'lib', type: 'dir', children: [{ name: 'pusher.ts', type: 'file' }, { name: 'pusher-client.ts', type: 'file' }] },
          { name: 'hooks', type: 'dir', children: [{ name: 'useChannel.ts', type: 'file' }, { name: 'usePresence.ts', type: 'file' }] },
          { name: 'app', type: 'dir', children: [{ name: 'api', type: 'dir', children: [{ name: 'pusher-auth', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] }] }] },
        ],
      },
    ],
    claudePrompts: [
      'Add the realtime-pusher workflow. Emit a "task.updated" event when a task status changes in my Prisma CRUD layer.',
      'Use realtime-pusher to show live presence avatars in my project dashboard — who is currently viewing the same project.',
    ],
    envVars: [
      { key: 'PUSHER_APP_ID', description: 'Pusher app ID', example: '1234567' },
      { key: 'PUSHER_KEY', description: 'Pusher app key', example: 'abc123def456' },
      { key: 'PUSHER_SECRET', description: 'Pusher app secret', example: 'xyz789...' },
      { key: 'NEXT_PUBLIC_PUSHER_KEY', description: 'Public Pusher key for client', example: 'abc123def456' },
    ],
  },
  {
    slug: 'ai-chat',
    name: 'AI Chat Interface',
    description:
      'Streaming chat UI with the Vercel AI SDK, message history persistence, and model-switching support.',
    readme:
      'Builds a complete streaming AI chat interface using the Vercel AI SDK. Includes a polished chat UI component, server-side streaming route, conversation history stored in Postgres, and a model picker (GPT-4o, Claude, Gemini). Supports system prompt customization and file attachments.',
    category: 'ai',
    tags: ['vercel-ai-sdk', 'streaming', 'chat', 'openai', 'claude'],
    difficulty: 'intermediate',
    stars: 1_674,
    installs: 24_890,
    author: 'Lukas Brenner',
    authorSeed: 'lukbren',
    updatedAt: '2024-11-30',
    installCommand: 'npx agent-kit add ai-chat',
    files: [
      {
        name: 'src', type: 'dir', children: [
          { name: 'lib', type: 'dir', children: [{ name: 'ai.ts', type: 'file' }] },
          { name: 'components', type: 'dir', children: [{ name: 'Chat.tsx', type: 'file' }, { name: 'MessageBubble.tsx', type: 'file' }] },
          { name: 'app', type: 'dir', children: [{ name: 'api', type: 'dir', children: [{ name: 'chat', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] }] }] },
        ],
      },
    ],
    claudePrompts: [
      'Add the ai-chat workflow. Use Claude claude-sonnet-4-5 as default model. Persist conversations to Postgres under the current user.',
      'Extend the ai-chat workflow to support file uploads. Let users attach PDFs and ask questions about them using RAG.',
    ],
    envVars: [
      { key: 'OPENAI_API_KEY', description: 'OpenAI API key', example: 'sk-proj-...' },
      { key: 'ANTHROPIC_API_KEY', description: 'Anthropic API key (optional)', example: 'sk-ant-...' },
    ],
  },
  {
    slug: 'search-algolia',
    name: 'Algolia Search',
    description:
      'Full-text search with Algolia InstantSearch, index syncing via Prisma middleware, and faceted filtering.',
    readme:
      'Adds production-grade search to any Next.js app using Algolia. Installs an Algolia InstantSearch UI, a Prisma middleware that keeps the index in sync on mutations, and server-side rendering for the initial search state (no layout flash).',
    category: 'database',
    tags: ['algolia', 'search', 'full-text', 'facets', 'prisma'],
    difficulty: 'intermediate',
    stars: 443,
    installs: 6_720,
    author: 'Ingrid Holm',
    authorSeed: 'ingholm',
    updatedAt: '2024-10-18',
    installCommand: 'npx agent-kit add search-algolia',
    files: [
      {
        name: 'src', type: 'dir', children: [
          { name: 'lib', type: 'dir', children: [{ name: 'algolia.ts', type: 'file' }] },
          { name: 'components', type: 'dir', children: [{ name: 'SearchBox.tsx', type: 'file' }, { name: 'SearchHits.tsx', type: 'file' }] },
        ],
      },
    ],
    claudePrompts: [
      'Add the search-algolia workflow. Index my Post model with fields: title, content, tags, authorName. Show facets by tags.',
    ],
    envVars: [
      { key: 'ALGOLIA_APP_ID', description: 'Algolia application ID', example: 'XXXXXXXXXX' },
      { key: 'ALGOLIA_ADMIN_KEY', description: 'Algolia admin API key', example: 'abc123...' },
      { key: 'NEXT_PUBLIC_ALGOLIA_APP_ID', description: 'Public app ID for client', example: 'XXXXXXXXXX' },
      { key: 'NEXT_PUBLIC_ALGOLIA_SEARCH_KEY', description: 'Search-only API key', example: 'def456...' },
    ],
  },
  {
    slug: 'notifications-push',
    name: 'Web Push Notifications',
    description:
      'Browser push notifications with service worker registration, subscription management, and a notification dispatch API.',
    readme:
      'Installs a complete web push notification system: VAPID key generation, service worker registration, push subscription storage in Postgres, and a server-side dispatch helper. Supports notification topics, click actions, and badge counts.',
    category: 'notifications',
    tags: ['web-push', 'service-worker', 'vapid', 'pwa'],
    difficulty: 'advanced',
    stars: 271,
    installs: 3_890,
    author: 'Dario Esposito',
    authorSeed: 'darioesp',
    updatedAt: '2024-09-29',
    installCommand: 'npx agent-kit add notifications-push',
    files: [
      {
        name: 'src', type: 'dir', children: [
          { name: 'lib', type: 'dir', children: [{ name: 'webpush.ts', type: 'file' }] },
          { name: 'app', type: 'dir', children: [{ name: 'api', type: 'dir', children: [{ name: 'push-subscribe', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] }, { name: 'push-send', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] }] }] },
        ],
      },
      { name: 'public', type: 'dir', children: [{ name: 'sw.js', type: 'file' }] },
    ],
    claudePrompts: [
      'Add the notifications-push workflow. Send a push notification when a user is @mentioned in a comment.',
    ],
    envVars: [
      { key: 'VAPID_PUBLIC_KEY', description: 'VAPID public key (generated)', example: 'BNFq...' },
      { key: 'VAPID_PRIVATE_KEY', description: 'VAPID private key (generated)', example: 'Kj3h...' },
    ],
  },
  {
    slug: 'export-pdf',
    name: 'PDF Export',
    description:
      'Server-side PDF generation with Puppeteer and React components as templates, with streaming download.',
    readme:
      'Generates pixel-perfect PDFs from React components using Puppeteer on the server. Ships with a base PDF template component, a streaming download route, and a client-side "Export PDF" button with loading state. Supports custom page sizes, headers/footers, and multi-page layouts.',
    category: 'export',
    tags: ['puppeteer', 'pdf', 'export', 'server-side', 'streaming'],
    difficulty: 'intermediate',
    stars: 317,
    installs: 4_560,
    author: 'Sofia Andrade',
    authorSeed: 'sofand',
    updatedAt: '2024-11-01',
    installCommand: 'npx agent-kit add export-pdf',
    files: [
      {
        name: 'src', type: 'dir', children: [
          { name: 'lib', type: 'dir', children: [{ name: 'pdf.ts', type: 'file' }] },
          { name: 'components', type: 'dir', children: [{ name: 'PdfTemplate.tsx', type: 'file' }, { name: 'ExportButton.tsx', type: 'file' }] },
          { name: 'app', type: 'dir', children: [{ name: 'api', type: 'dir', children: [{ name: 'export-pdf', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] }] }] },
        ],
      },
    ],
    claudePrompts: [
      'Add the export-pdf workflow. Generate a PDF invoice from an Order model with line items, totals, and company logo.',
    ],
    envVars: [],
  },
  {
    slug: 'auth-oauth',
    name: 'OAuth Social Login',
    description:
      'Multi-provider OAuth (GitHub, Google, Discord) with automatic account linking and profile syncing.',
    readme:
      'Adds GitHub, Google, and Discord OAuth login with automatic account linking when the same email is used across providers. Syncs profile picture and display name on each login. Includes a connected accounts management UI.',
    category: 'auth',
    tags: ['oauth', 'github', 'google', 'discord', 'nextauth'],
    difficulty: 'beginner',
    stars: 689,
    installs: 10_340,
    author: 'Felix Larsson',
    authorSeed: 'felixlar',
    updatedAt: '2024-11-10',
    installCommand: 'npx agent-kit add auth-oauth',
    files: [
      {
        name: 'src', type: 'dir', children: [
          { name: 'auth.ts', type: 'file' },
          { name: 'app', type: 'dir', children: [{ name: 'api', type: 'dir', children: [{ name: 'auth', type: 'dir', children: [{ name: '[...nextauth]', type: 'dir', children: [{ name: 'route.ts', type: 'file' }] }] }] }, { name: '(auth)', type: 'dir', children: [{ name: 'login', type: 'dir', children: [{ name: 'page.tsx', type: 'file' }] }] }] },
          { name: 'components', type: 'dir', children: [{ name: 'ConnectedAccounts.tsx', type: 'file' }] },
        ],
      },
    ],
    claudePrompts: [
      'Add auth-oauth. Enable GitHub and Google. After first login, redirect to /onboarding to collect a username.',
    ],
    envVars: [
      { key: 'AUTH_SECRET', description: 'Random secret for JWT signing', example: 'openssl rand -base64 32' },
      { key: 'AUTH_GITHUB_ID', description: 'GitHub OAuth App ID', example: 'Ov23li...' },
      { key: 'AUTH_GITHUB_SECRET', description: 'GitHub OAuth App secret', example: 'abc123...' },
      { key: 'AUTH_GOOGLE_ID', description: 'Google OAuth client ID', example: '12345-abc.apps.googleusercontent.com' },
      { key: 'AUTH_GOOGLE_SECRET', description: 'Google OAuth client secret', example: 'GOCSPX-...' },
    ],
  },
]
