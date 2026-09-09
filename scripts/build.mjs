#!/usr/bin/env node
/**
 * Build wrapper.
 *
 * The client editing portal (TinaCMS) needs TinaCloud credentials to compile.
 * Until those exist the site must still build and deploy normally, so this
 * checks for them and only adds the portal step when they are present.
 *
 * To turn the portal on, set these in Vercel (Settings, then Environment
 * Variables) for Production and Preview:
 *   NEXT_PUBLIC_TINA_CLIENT_ID
 *   TINA_TOKEN
 * No code change needed. The next deploy picks it up.
 */

import { spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";

// On Vercel the variables are already in the environment. Locally they live in
// .env.local, which Next loads for itself but not for this wrapper, so read it.
for (const file of [".env.local", ".env"]) {
  if (!existsSync(file)) continue;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
}

const hasTina =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) &&
  Boolean(process.env.TINA_TOKEN);

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: false });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (hasTina) {
  console.log("Tina credentials found. Building the client editing portal.");
  // --skip-cloud-checks: TinaCloud reindexes the schema on push, and Vercel
  // builds can start before that finishes. Without this flag a schema
  // change fails the deploy on a race. The site must always ship; the
  // portal catches up once indexing completes.
  run("npx", ["tinacms", "build", "--skip-cloud-checks"]);
} else {
  console.log(
    "No Tina credentials. Building the site without the editing portal. " +
      "Set NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN to enable /admin.",
  );
}

run("npx", ["next", "build"]);
