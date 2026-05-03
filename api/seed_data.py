"""8 starter workflows for Agent Startup Kit."""
import json


def _f(path: str, content: str) -> dict:
    return {"path": path, "content": content}


def _p(content: str) -> list:
    return [{"role": "system", "content": content}]


RAW = [
    dict(slug="nextjs-auth-clerk", title="Next.js Auth with Clerk", install_count=142,
         description="Clerk auth: middleware, sign-in/up pages, protected routes.",
         tags=["auth", "nextjs", "clerk"], stack="nextjs", author="agent-kit",
         files=[_f("middleware.ts", "import{clerkMiddleware}from'@clerk/nextjs/server';\nexport default clerkMiddleware();\nexport const config={matcher:['/((?!_next|.*\\..*).*)']};"),
                _f("app/sign-in/[[...sign-in]]/page.tsx", "import{SignIn}from'@clerk/nextjs';\nexport default function Page(){return<SignIn/>;}")],
         prompts=_p("Next.js + Clerk auth expert. Guide auth integration, middleware, and route protection."),
         readme="# nextjs-auth-clerk\n1. `npm i @clerk/nextjs`\n2. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY + CLERK_SECRET_KEY to .env.local\n3. Wrap root layout with `<ClerkProvider>`"),
    dict(slug="nextjs-stripe-checkout", title="Stripe Checkout for Next.js", install_count=98,
         description="Stripe payments: checkout session API route + webhook handler.",
         tags=["payments", "nextjs", "stripe"], stack="nextjs", author="agent-kit",
         files=[_f("app/api/checkout/route.ts", "import Stripe from'stripe';\nconst s=new Stripe(process.env.STRIPE_SECRET_KEY!);\nexport async function POST(req:Request){const{priceId}=await req.json();const sess=await s.checkout.sessions.create({mode:'payment',line_items:[{price:priceId,quantity:1}],success_url:`${process.env.NEXT_PUBLIC_URL}/success`,cancel_url:`${process.env.NEXT_PUBLIC_URL}/cancel`});return Response.json({url:sess.url});}"),
                _f("app/api/webhook/route.ts", "import Stripe from'stripe';\nconst s=new Stripe(process.env.STRIPE_SECRET_KEY!);\nexport async function POST(req:Request){const sig=req.headers.get('stripe-signature')!;const ev=s.webhooks.constructEvent(await req.text(),sig,process.env.STRIPE_WEBHOOK_SECRET!);if(ev.type==='checkout.session.completed'){/* fulfill order */}return Response.json({received:true});}")],
         prompts=_p("Stripe + Next.js expert. Guide checkout sessions, webhooks, and subscription flows."),
         readme="# nextjs-stripe-checkout\n1. `npm i stripe`\n2. Add STRIPE_SECRET_KEY + STRIPE_WEBHOOK_SECRET\n3. POST /api/checkout with {priceId}"),
    dict(slug="fastapi-jwt-auth", title="FastAPI JWT Auth", install_count=87,
         description="JWT auth for FastAPI: token creation, OAuth2 dependency, protected routes.",
         tags=["auth", "fastapi", "python", "jwt"], stack="fastapi", author="agent-kit",
         files=[_f("auth.py", "import os\nfrom fastapi import Depends,HTTPException,status\nfrom fastapi.security import OAuth2PasswordBearer\nfrom jose import JWTError,jwt\nfrom datetime import datetime,timedelta\nSECRET=os.getenv('JWT_SECRET','change-me');ALGO='HS256'\noauth2=OAuth2PasswordBearer(tokenUrl='token')\ndef create_token(data:dict)->str:\n  return jwt.encode({**data,'exp':datetime.utcnow()+timedelta(hours=24)},SECRET,algorithm=ALGO)\nasync def get_current_user(token:str=Depends(oauth2)):\n  try:return jwt.decode(token,SECRET,algorithms=[ALGO])\n  except JWTError:raise HTTPException(status.HTTP_401_UNAUTHORIZED,'Invalid token')")],
         prompts=_p("FastAPI + JWT auth expert. Guide token creation, OAuth2 flows, and route protection patterns."),
         readme="# fastapi-jwt-auth\n1. `pip install python-jose[cryptography] passlib[bcrypt]`\n2. Set JWT_SECRET env var\n3. Use `Depends(get_current_user)` on protected routes"),
    dict(slug="supabase-crud", title="Supabase CRUD", install_count=75,
         description="Typed Supabase CRUD: client setup, select/insert/update/delete helpers.",
         tags=["database", "supabase", "nextjs"], stack="nextjs", author="agent-kit",
         files=[_f("lib/supabase.ts", "import{createClient}from'@supabase/supabase-js';\nexport const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);"),
                _f("lib/db.ts", "import{supabase}from'./supabase';\nexport const getItems=()=>supabase.from('items').select('*');\nexport const createItem=(d:any)=>supabase.from('items').insert(d).select().single();\nexport const updateItem=(id:string,d:any)=>supabase.from('items').update(d).eq('id',id);\nexport const deleteItem=(id:string)=>supabase.from('items').delete().eq('id',id);")],
         prompts=_p("Supabase expert. Guide schema design, RLS policies, and real-time subscriptions."),
         readme="# supabase-crud\n1. `npm i @supabase/supabase-js`\n2. Add NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY\n3. Enable Row Level Security on tables in Supabase dashboard"),
    dict(slug="openai-rag-chat", title="OpenAI RAG Chat", install_count=134,
         description="RAG chatbot: context injection, streaming responses, embeddings helper.",
         tags=["ai", "openai", "rag", "nextjs"], stack="nextjs", author="agent-kit",
         files=[_f("app/api/chat/route.ts", "import OpenAI from'openai';\nconst openai=new OpenAI();\nexport async function POST(req:Request){const{messages,context}=await req.json();const stream=openai.chat.completions.stream({model:'gpt-4o-mini',messages:[{role:'system',content:`Answer using this context:\\n${context}`},...messages]});return new Response(stream.toReadableStream());}"),
                _f("lib/embeddings.ts", "import OpenAI from'openai';\nconst openai=new OpenAI();\nexport async function embed(text:string){const{data}=await openai.embeddings.create({model:'text-embedding-3-small',input:text});return data[0].embedding;}")],
         prompts=_p("OpenAI + RAG expert. Guide embedding generation, vector search, context injection, and streaming."),
         readme="# openai-rag-chat\n1. `npm i openai`\n2. Add OPENAI_API_KEY\n3. Connect vector DB (Pinecone/pgvector/Supabase)\n4. POST /api/chat with {messages, context}"),
    dict(slug="resend-email", title="Resend Email", install_count=63,
         description="Transactional email with Resend: send API route, React Email template.",
         tags=["email", "resend", "nextjs"], stack="nextjs", author="agent-kit",
         files=[_f("app/api/send/route.ts", "import{Resend}from'resend';\nconst resend=new Resend(process.env.RESEND_API_KEY);\nexport async function POST(req:Request){const{to,subject,html}=await req.json();const{data,error}=await resend.emails.send({from:'noreply@yourdomain.com',to,subject,html});if(error)return Response.json({error},{status:500});return Response.json(data);}")],
         prompts=_p("Resend email expert. Guide transactional email, React Email templates, and deliverability best practices."),
         readme="# resend-email\n1. `npm i resend`\n2. Add RESEND_API_KEY\n3. Verify domain in Resend dashboard\n4. POST /api/send with {to, subject, html}"),
    dict(slug="s3-file-upload", title="S3 File Upload", install_count=81,
         description="S3 presigned URL uploads: server-side URL gen, client PUT, CDN access.",
         tags=["storage", "s3", "aws", "nextjs"], stack="nextjs", author="agent-kit",
         files=[_f("app/api/upload/route.ts", "import{S3Client,PutObjectCommand}from'@aws-sdk/client-s3';\nimport{getSignedUrl}from'@aws-sdk/s3-request-presigner';\nconst s3=new S3Client({region:process.env.AWS_REGION!,credentials:{accessKeyId:process.env.AWS_ACCESS_KEY_ID!,secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!}});\nexport async function POST(req:Request){const{filename,contentType}=await req.json();const key=`uploads/${Date.now()}-${filename}`;const url=await getSignedUrl(s3,new PutObjectCommand({Bucket:process.env.S3_BUCKET!,Key:key,ContentType:contentType}),{expiresIn:3600});return Response.json({url,key});}")],
         prompts=_p("AWS S3 expert. Guide presigned URL uploads, bucket CORS, policies, and CloudFront CDN setup."),
         readme="# s3-file-upload\n1. `npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner`\n2. Add AWS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, S3_BUCKET\n3. PUT file directly to presigned URL from client"),
    dict(slug="claude-skill-template", title="Claude Skill Template", install_count=56,
         description="Starter template for Claude Code skills: spec format, triggers, process steps.",
         tags=["claude", "ai", "skills", "template"], stack="claude-code", author="agent-kit",
         files=[_f(".claude/skills/my-skill.md", "---\nname: my-skill\ndescription: Use when [trigger condition]. Does [what it does].\n---\n\n# My Skill\n\n## When to Use\nInvoke when the user asks to [specific task].\n\n## Process\n1. [Step one — what to check or gather]\n2. [Step two — what to do]\n3. [Step three — validate and finish]\n\n## Output Format\n- [Format specification]\n\n## Examples\n[Example usage scenario]")],
         prompts=_p("Claude skill design expert. Guide trigger conditions, process step design, and tool integration patterns."),
         readme="# claude-skill-template\n1. Copy .claude/skills/my-skill.md\n2. Replace all [placeholders] with your skill logic\n3. Reference skill in .claude/settings.json"),
]


def serialize_workflow(w: dict) -> dict:
    """Stringify list fields for SQLAlchemy Text columns."""
    return {
        **w,
        "tags": json.dumps(w.get("tags", [])),
        "files": json.dumps(w.get("files", [])),
        "prompts": json.dumps(w.get("prompts", [])),
    }
