export const cacheKeyTests = `
let callCount = 0
const cache = createUserCache((userId, page) => { callCount++; return { userId, page, id: callCount } })

const r1 = (() => {
  callCount = 0
  cache.get(1, 11)
  cache.get(11, 1)
  return { name: "get(1,11) and get(11,1) call loader twice", passed: callCount === 2 }
})()

const r2 = (() => {
  callCount = 0
  const cache2 = createUserCache((u, p) => { callCount++; return u + p })
  cache2.get(5, 3)
  cache2.get(5, 3)
  return { name: "same args twice loader called once", passed: callCount === 1 }
})()

const r3 = (() => {
  let lc = 0
  const c3 = createUserCache((u, p) => { lc++; return lc })
  c3.get(1, 0); c3.get(1, 1); c3.get(1, 2)
  c3.invalidate(1)
  lc = 0
  c3.get(1, 0); c3.get(1, 1); c3.get(1, 2)
  return { name: "invalidate clears all pages for user", passed: lc === 3 }
})()

const r4 = (() => {
  let lc = 0
  const c4 = createUserCache((u, p) => { lc++; return lc })
  c4.get(1, 0); c4.get(11, 0); c4.get(2, 0)
  const before = lc
  c4.invalidate(1)
  c4.get(11, 0); c4.get(2, 0)
  return { name: "invalidate does not touch other users", passed: lc === before }
})()

const r5 = (() => {
  let lc = 0
  const c5 = createUserCache((u, p) => { lc++; return lc })
  c5.get(7, 0)
  c5.invalidate(7)
  lc = 0
  c5.get(7, 0)
  return { name: "after invalidate get calls loader again", passed: lc === 1 }
})()

return [r1, r2, r3, r4, r5]
`
