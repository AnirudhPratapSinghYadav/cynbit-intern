export const workerSource = `
self.onmessage = function(e) {
  const { code, tests } = e.data
  try {
    const fn = new Function(code + "\\n" + tests)
    const results = fn()
    const capped = Array.isArray(results) ? results.slice(0, 50) : []
    self.postMessage({ type: "results", results: capped })
  } catch(err) {
    self.postMessage({ type: "error", message: String(err.message || err) })
  }
}
`
