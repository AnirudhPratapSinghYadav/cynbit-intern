export const listenerLeakTests = `
function makeFakeTarget() {
  let listeners = []
  let width = 100
  return {
    get width() { return width },
    addEventListener(_, fn) { listeners.push(fn) },
    removeEventListener(_, fn) { listeners = listeners.filter(l => l !== fn) },
    fire(w) { width = w; listeners.forEach(fn => fn()) },
    listenerCount() { return listeners.length },
  }
}

const calls = []
const target = makeFakeTarget()
const tracker = createResizeTracker(target, w => calls.push(w))

const r1 = (() => { tracker.start(); target.fire(200); return { name: "start then fire", passed: calls.length === 1 && calls[0] === 200 } })()
const r2 = (() => { tracker.start(); return { name: "start twice listener count 1", passed: target.listenerCount() === 1 } })()
const r3 = (() => { tracker.stop(); return { name: "start stop listener count 0", passed: target.listenerCount() === 0 } })()
const r4 = (() => { try { createResizeTracker(makeFakeTarget(), () => {}).stop(); return { name: "stop without start no throw", passed: true } } catch { return { name: "stop without start no throw", passed: false } } })()
const r5 = (() => { const t2 = makeFakeTarget(); const c2 = []; const tr2 = createResizeTracker(t2, w => c2.push(w)); tr2.start(); tr2.stop(); t2.fire(99); return { name: "after stop fire not called", passed: c2.length === 0 } })()
const r6 = (() => { const t3 = makeFakeTarget(); const c3 = []; const tr3 = createResizeTracker(t3, w => c3.push(w)); tr3.start(); tr3.stop(); tr3.start(); t3.fire(42); return { name: "start stop start works again", passed: c3.length === 1 && c3[0] === 42 } })()

return [r1, r2, r3, r4, r5, r6]
`
