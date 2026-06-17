// tsc drops the top-of-file `'use client'` directive when compiling to CJS, which would
// make Next treat hooks-using components as Server Components (runtime crash). Re-prepend
// it to the dist files whose source declared it.
import fs from 'fs'
import path from 'path'

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })
}

let count = 0
for (const src of walk('src')) {
  if (!/\.tsx?$/.test(src)) continue
  const head = fs.readFileSync(src, 'utf8').slice(0, 80)
  if (!/^\s*['"]use client['"]/.test(head)) continue
  const js = src.replace(/^src/, 'dist').replace(/\.tsx?$/, '.js')
  if (!fs.existsSync(js)) continue
  let c = fs.readFileSync(js, 'utf8')
  if (/^['"]use client['"]/.test(c)) continue
  fs.writeFileSync(js, `'use client';\n${c}`)
  console.log('use client →', js)
  count++
}
console.log(`postbuild: prepended 'use client' to ${count} file(s)`)
