import type { Challenge } from "../types"

export const listenerLeak: Challenge = {
  id: "listener-leak",
  lab: "Frontend Ops Dashboard Lab",
  branch: "task/day-0-listener-leak",
  fileTarget: "hooks/createResizeTracker.js",
  title: "Event Listener Leak",
  description:
    "Every call to start() adds a new listener but nothing removes it. The tab leaks until it crashes.",
  starter: `function createResizeTracker(target, onSize) {
  function start() {
    target.addEventListener("resize", () => onSize(target.width))
  }
  function stop() {}
  return { start, stop }
}`,
  hints: [
    "Save the handler to a variable so you can pass the same reference to removeEventListener.",
    "Guard start() so it only adds a listener when one isn't already active.",
  ],
}
