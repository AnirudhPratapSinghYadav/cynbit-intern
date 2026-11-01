import { readdir, stat } from "fs/promises"
import { join, extname } from "path"
import { createReadStream } from "fs"
import { createInterface } from "readline"

const SRC = join(process.cwd(), "src")
const HARD_LIMIT = 60
let failed = false

async function countLines(file) {
  let count = 0
  const rl = createInterface({ input: createReadStream(file) })
  for await (const _ of rl) count++
  return count
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = join(dir, e.name)
    if (e.isDirectory()) await walk(full)
    else if ([".ts", ".tsx"].includes(extname(e.name))) {
      const n = await countLines(full)
      if (n > HARD_LIMIT) {
        console.error(`${full} — ${n} lines (limit ${HARD_LIMIT})`)
        failed = true
      }
    }
  }
}

walk(SRC).then(() => { if (failed) process.exit(1) })
