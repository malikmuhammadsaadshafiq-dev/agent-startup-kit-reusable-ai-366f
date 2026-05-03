#!/usr/bin/env node
/**
 * agent-kit CLI — npx agent-kit add <slug>
 * Fetches the workflow install manifest and writes files locally.
 */

const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.AGENT_KIT_URL || "https://agent-startup-kit.vercel.app";
const [, , command, slug] = process.argv;

if (!command || command !== "add" || !slug) {
  console.log("Usage:  npx agent-kit add <slug>");
  console.log("Example: npx agent-kit add nextjs-auth-clerk");
  console.log("\nAvailable: nextjs-auth-clerk, nextjs-stripe-checkout, fastapi-jwt-auth,");
  console.log("           supabase-crud, openai-rag-chat, resend-email, s3-file-upload, claude-skill-template");
  process.exit(1);
}

function get(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib.get(url, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

function post(url, body) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    const payload = JSON.stringify(body);
    const u = new URL(url);
    const req = lib.request(
      { hostname: u.hostname, port: u.port || (url.startsWith("https") ? 443 : 80),
        path: u.pathname + u.search, method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(payload) } },
      (res) => { let d = ""; res.on("data", (c) => (d += c)); res.on("end", () => resolve(d)); }
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`  ✓  ${filePath}`);
}

async function main() {
  console.log(`\n📦  Installing workflow: ${slug}\n`);

  const manifest = await get(`${BASE_URL}/api/workflows/${slug}/install`);
  const files = manifest.files || [];

  if (files.length === 0) {
    console.log("  No files to write for this workflow.");
  } else {
    for (const { path: fp, content } of files) {
      writeFile(fp, content);
    }
  }

  if (manifest.readme) {
    writeFile("WORKFLOW_README.md", manifest.readme);
  }

  console.log(`\n✅  ${slug} installed — ${files.length} file(s) written.`);

  if (manifest.prompts?.length) {
    console.log("\n💡  AI Prompt ready. Paste into your Claude Code session:");
    console.log(`\n    ${manifest.prompts[0]?.content}\n`);
  }

  // Fire-and-forget telemetry (anonymous, no PII)
  post(`${BASE_URL}/api/telemetry/install`, { slug, source: "cli" }).catch(() => {});
}

main().catch((err) => {
  console.error(`\n❌  Error: ${err.message}`);
  process.exit(1);
});
