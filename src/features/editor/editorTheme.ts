import { EditorView } from "@codemirror/view"

export const editorTheme = EditorView.theme({
  "&": {
    background: "#0d0d14",
    color: "#e8e8f0",
    height: "100%",
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
  },
  ".cm-content": { caretColor: "#6c63ff" },
  ".cm-cursor": { borderLeftColor: "#6c63ff" },
  ".cm-selectionBackground": { background: "rgba(108,99,255,0.25)" },
  ".cm-activeLine": { background: "rgba(108,99,255,0.07)" },
  ".cm-activeLineGutter": { background: "rgba(108,99,255,0.12)" },
  ".cm-gutters": { background: "#0a0a0f", color: "#6b6b8a", borderRight: "1px solid rgba(255,255,255,0.06)" },
  ".cm-lineNumbers .cm-gutterElement": { minWidth: "2.5rem", padding: "0 0.5rem" },
  ".cm-scroller": { overflow: "auto" },
}, { dark: true })
