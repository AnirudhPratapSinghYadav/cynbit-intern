"use client"
import { useEffect, useRef } from "react"
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightActiveLine } from "@codemirror/view"
import { EditorState } from "@codemirror/state"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { javascript } from "@codemirror/lang-javascript"
import { editorTheme } from "./editorTheme"

type Props = {
  value: string
  onChange: (v: string) => void
  jumpLine?: number
}

export function CodeEditor({ value, onChange, jumpLine }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const initialValueRef = useRef(value)
  const onChangeRef = useRef(onChange)

  useEffect(() => {
    onChangeRef.current = onChange
  }, [onChange])

  useEffect(() => {
    if (!containerRef.current) return
    const view = new EditorView({
      state: EditorState.create({
        doc: initialValueRef.current,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          highlightActiveLineGutter(),
          history(),
          keymap.of([...defaultKeymap, ...historyKeymap]),
          javascript(),
          editorTheme,
          EditorView.updateListener.of((u) => {
            if (u.docChanged) onChangeRef.current(u.state.doc.toString())
          }),
        ],
      }),
      parent: containerRef.current,
    })
    viewRef.current = view
    return () => view.destroy()
  }, [])

  useEffect(() => {
    if (!jumpLine || !viewRef.current) return
    const line = viewRef.current.state.doc.line(Math.min(jumpLine, viewRef.current.state.doc.lines))
    viewRef.current.dispatch({ selection: { anchor: line.from }, scrollIntoView: true })
    viewRef.current.focus()
  }, [jumpLine])

  return <div ref={containerRef} style={{ height: "100%", overflow: "auto" }} />
}
