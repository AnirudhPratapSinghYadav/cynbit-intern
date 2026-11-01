import { readdir, readFile } from "fs/promises"
import { join, extname } from "path"

const SRC = join(process.cwd(), "src")
let failed = false

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) await walk(full)
    else if ([".ts", ".tsx"].includes(extname(e.name))) await check(full)
  }
}

async function check(file) {
  const lines = (await readFile(file, "utf8")).split("\n")
  lines.forEach((line, i) => {
    const t = line.trim()
    if (t.startsWith("//") || t.startsWith("/*") || t.startsWith("*")) {
      console.error(`${file}:${i + 1} — comment found`)
      failed = true
    }
  })
}

walk(SRC).then(() => { if (failed) process.exit(1) })
