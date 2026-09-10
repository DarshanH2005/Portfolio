/**
 * Export the public portfolio for static hosting without changing its normal
 * Next.js server build. Optional template API endpoints remain in the source
 * checkout; none are used by the public portfolio.
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
const root = process.cwd();
const stage = fs.mkdtempSync(path.join(os.tmpdir(), "darshan-portfolio-export-"));
const excluded = new Set([
  "src/app/api",
  "src/app/blog/page.tsx",
  "src/app/blog/[slug]",
  "src/app/gallery",
]);
for (const name of [
  "src",
  "public",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  "next-env.d.ts",
]) {
  if (!fs.existsSync(path.join(root, name))) continue;
  fs.cpSync(path.join(root, name), path.join(stage, name), {
    recursive: true,
    filter: (source) => !excluded.has(path.relative(root, source).split(path.sep).join("/")),
  });
}
fs.symlinkSync(
  path.join(root, "node_modules"),
  path.join(stage, "node_modules"),
  process.platform === "win32" ? "junction" : "dir",
);
const config = fs
  .readFileSync(path.join(root, "next.config.mjs"), "utf8")
  .replace(
    "const nextConfig = {",
    "const nextConfig = {\n  output: 'export',\n  trailingSlash: true,",
  )
  .replace("images: {", "images: {\n    unoptimized: true,");
fs.writeFileSync(path.join(stage, "next.config.mjs"), config);
const result = spawnSync(
  process.execPath,
  [path.join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"],
  {
    cwd: stage,
    stdio: "inherit",
    env: {
      ...process.env,
      NEXT_PUBLIC_SITE_URL:
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://darshan-selected-work.darshan1970h.chatgpt.site",
    },
  },
);
if (result.status !== 0) process.exit(result.status || 1);
const output = path.join(root, "out");
if (fs.existsSync(output)) {
  // Only this generated build directory is replaced.
  if (path.resolve(output) !== path.resolve(root, "out")) throw new Error("Unsafe output path");
  fs.rmSync(output, { recursive: true, force: true });
}
fs.cpSync(path.join(stage, "out"), output, { recursive: true });
console.log("Static portfolio exported to out/.");
// The temporary workspace is retained for troubleshooting; it contains no secrets.
