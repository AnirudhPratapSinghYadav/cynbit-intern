import type { Challenge } from "../types"

export const cacheKey: Challenge = {
  id: "cache-key",
  lab: "Python Backend Lab (JS edition)",
  branch: "task/day-0-cache-key",
  fileTarget: "cache/userCache.js",
  title: "Cache Key Collision & Invalidation",
  description:
    "The cache key '1' + '11' equals '11' + '1'. Two users share one entry. And invalidate does nothing.",
  starter: `function createUserCache(loadUser) {
  const store = new Map()
  function key(userId, page) {
    return \`\${userId}\${page}\`
  }
  function get(userId, page) {
    const k = key(userId, page)
    if (!store.has(k)) store.set(k, loadUser(userId, page))
    return store.get(k)
  }
  function invalidate(userId) {}
  return { get, invalidate }
}`,
  hints: [
    "Add a separator character between userId and page so '1:11' !== '11:1'.",
    "invalidate should delete every key that starts with userId + your separator.",
  ],
}
