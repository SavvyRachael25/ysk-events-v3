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

const hasTina =
  Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) &&
  Boolean(process.env.TINA_TOKEN);

function run(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit", shell: false });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

if (hasTina) {
  console.log("Tina credentials found. Building the client editing portal.");
  run("npx", ["tinacms", "build"]);
} else {
  console.log(
    "No Tina credentials. Building the site without the editing portal. " +
      "Set NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN to enable /admin.",
  );
}

run("npx", ["next", "build"]);
