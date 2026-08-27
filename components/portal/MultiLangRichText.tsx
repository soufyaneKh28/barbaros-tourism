'use client'

import { useEffect, useRef, useState } from 'react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
    Bold, Italic, Underline, Strikethrough, Heading2, Heading3, Pilcrow,
    List, ListOrdered, Quote, Link2, Link2Off, Undo2, Redo2, Code2, Minus,
} from 'lucide-react'
import { locales, type Locale } from '@/i18n/config'
import { useAdminLanguage } from '@/contexts/AdminLanguageContext'

interface MultiLangRichTextProps {
    name: string
    label: string
    required?: boolean
    placeholder?: string
    defaultValue?: Record<string, string>
    /** Minimum editing height, in rem. */
    minHeight?: number
}

/* Mirrors the `prose` classes BlogContent uses on the public site, so what an
   author sees here is close to what gets published. */
const EDITOR_CLASS =
    'prose prose-sm sm:prose-base max-w-none px-4 py-3 focus:outline-none ' +
    'prose-headings:font-cabinet prose-headings:text-primary prose-headings:font-bold ' +
    'prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-primary ' +
    'prose-blockquote:border-secondary prose-a:text-secondary'

export default function MultiLangRichText({
    name,
    label,
    required = false,
    placeholder = 'Start writing…',
    defaultValue = {},
    minHeight = 20,
}: MultiLangRichTextProps) {
    const { activeLocale } = useAdminLanguage()
    const [values, setValues] = useState<Record<string, string>>(defaultValue || {})
    const [showSource, setShowSource] = useState(false)
    const [linkOpen, setLinkOpen] = useState(false)
    const [linkValue, setLinkValue] = useState('')

    /* onUpdate closes over the locale that was active when the editor was
       created, so the write target is read from a ref instead. */
    const localeRef = useRef<Locale>(activeLocale)
    const valuesRef = useRef(values)
    valuesRef.current = values

    const editor = useEditor({
        immediatelyRender: false, // server-rendered first paint would mismatch
        extensions: [
            StarterKit.configure({
                heading: { levels: [2, 3] },
                link: {
                    openOnClick: false,
                    autolink: true,
                    HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
                },
            }),
        ],
        content: defaultValue?.[activeLocale] || '',
        editorProps: {
            attributes: {
                class: EDITOR_CLASS,
                style: `min-height:${minHeight}rem`,
                dir: activeLocale === 'ar' ? 'rtl' : 'ltr',
            },
        },
        onUpdate: ({ editor }) => {
            // Store '' rather than the '<p></p>' an empty doc serialises to,
            // so `required` and downstream emptiness checks behave.
            const html = editor.isEmpty ? '' : editor.getHTML()
            setValues((prev) => ({ ...prev, [localeRef.current]: html }))
        },
    })

    // Swap the document when the admin switches language.
    useEffect(() => {
        localeRef.current = activeLocale
        if (!editor) return

        editor.setOptions({
            editorProps: {
                attributes: {
                    class: EDITOR_CLASS,
                    style: `min-height:${minHeight}rem`,
                    dir: activeLocale === 'ar' ? 'rtl' : 'ltr',
                },
            },
        })
        editor.commands.setContent(valuesRef.current[activeLocale] || '', { emitUpdate: false })
    }, [activeLocale, editor, minHeight])

    const state = useEditorState({
        editor,
        selector: ({ editor: e }) => e && {
            isEmpty: e.isEmpty,
            bold: e.isActive('bold'),
            italic: e.isActive('italic'),
            underline: e.isActive('underline'),
            strike: e.isActive('strike'),
            h2: e.isActive('heading', { level: 2 }),
            h3: e.isActive('heading', { level: 3 }),
            paragraph: e.isActive('paragraph'),
            bulletList: e.isActive('bulletList'),
            orderedList: e.isActive('orderedList'),
            blockquote: e.isActive('blockquote'),
            link: e.isActive('link'),
            canUndo: e.can().undo(),
            canRedo: e.can().redo(),
        },
    })

    function openLinkEditor() {
        setLinkValue(editor?.getAttributes('link').href || '')
        setLinkOpen(true)
    }

    function applyLink() {
        const href = linkValue.trim()
        if (!href) {
            editor?.chain().focus().extendMarkRange('link').unsetLink().run()
        } else {
            editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
        }
        setLinkOpen(false)
    }

    /* Leaving source mode replays whatever was hand-edited back into the
       document, so the two views can't drift apart. */
    function toggleSource() {
        if (showSource) {
            editor?.commands.setContent(valuesRef.current[activeLocale] || '', { emitUpdate: false })
        }
        setShowSource((open) => !open)
    }

    return (
        <div>
            <div className="mb-2 flex items-center justify-between gap-4">
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </label>
                <button
                    type="button"
                    onClick={toggleSource}
                    aria-pressed={showSource}
                    className="flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 aria-pressed:bg-primary aria-pressed:text-white"
                >
                    <Code2 className="h-3.5 w-3.5" />
                    HTML
                </button>
            </div>

            <div className="rounded-md border border-gray-300 transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">

                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
                    <ToolbarButton label="Undo" disabled={!state?.canUndo || showSource} onClick={() => editor?.chain().focus().undo().run()}>
                        <Undo2 className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton label="Redo" disabled={!state?.canRedo || showSource} onClick={() => editor?.chain().focus().redo().run()}>
                        <Redo2 className="h-4 w-4" />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton label="Paragraph" active={state?.paragraph} disabled={showSource} onClick={() => editor?.chain().focus().setParagraph().run()}>
                        <Pilcrow className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton label="Heading 2" active={state?.h2} disabled={showSource} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
                        <Heading2 className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton label="Heading 3" active={state?.h3} disabled={showSource} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
                        <Heading3 className="h-4 w-4" />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton label="Bold" active={state?.bold} disabled={showSource} onClick={() => editor?.chain().focus().toggleBold().run()}>
                        <Bold className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton label="Italic" active={state?.italic} disabled={showSource} onClick={() => editor?.chain().focus().toggleItalic().run()}>
                        <Italic className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton label="Underline" active={state?.underline} disabled={showSource} onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                        <Underline className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton label="Strikethrough" active={state?.strike} disabled={showSource} onClick={() => editor?.chain().focus().toggleStrike().run()}>
                        <Strikethrough className="h-4 w-4" />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton label="Bullet list" active={state?.bulletList} disabled={showSource} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
                        <List className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton label="Numbered list" active={state?.orderedList} disabled={showSource} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
                        <ListOrdered className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton label="Quote" active={state?.blockquote} disabled={showSource} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
                        <Quote className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton label="Divider" disabled={showSource} onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
                        <Minus className="h-4 w-4" />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton label="Add link" active={state?.link} disabled={showSource} onClick={openLinkEditor}>
                        <Link2 className="h-4 w-4" />
                    </ToolbarButton>
                    <ToolbarButton label="Remove link" disabled={!state?.link || showSource} onClick={() => editor?.chain().focus().extendMarkRange('link').unsetLink().run()}>
                        <Link2Off className="h-4 w-4" />
                    </ToolbarButton>
                </div>

                {linkOpen && !showSource && (
                    <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-3 py-2">
                        <input
                            type="url"
                            value={linkValue}
                            autoFocus
                            onChange={(event) => setLinkValue(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') { event.preventDefault(); applyLink() }
                                if (event.key === 'Escape') setLinkOpen(false)
                            }}
                            placeholder="https://example.com"
                            className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary focus:outline-none"
                        />
                        <button type="button" onClick={applyLink} className="rounded bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary-600">
                            Apply
                        </button>
                        <button type="button" onClick={() => setLinkOpen(false)} className="rounded px-2 py-1 text-sm text-gray-500 hover:bg-gray-100">
                            Cancel
                        </button>
                    </div>
                )}

                {/* The textarea is the single form control for the active locale.
                    In source mode it's the editing surface; otherwise it stays in
                    the DOM, transparent but focusable, so `required` can still be
                    reported by the browser against a visible position. */}
                <div className="relative">
                    {!showSource && (
                        <>
                            <EditorContent editor={editor} />
                            {state?.isEmpty && (
                                <p
                                    className="pointer-events-none absolute top-3 px-4 text-gray-400"
                                    style={{ insetInlineStart: 0 }}
                                >
                                    {placeholder}
                                </p>
                            )}
                        </>
                    )}

                    <textarea
                        name={`${name}_${activeLocale}`}
                        value={values[activeLocale] || ''}
                        onChange={(event) => setValues((prev) => ({ ...prev, [activeLocale]: event.target.value }))}
                        required={required && activeLocale === 'en'}
                        dir="ltr"
                        spellCheck={false}
                        aria-hidden={!showSource}
                        tabIndex={showSource ? undefined : -1}
                        className={
                            showSource
                                ? 'block w-full resize-y border-0 px-4 py-3 font-mono text-xs leading-relaxed text-gray-800 focus:outline-none'
                                : 'pointer-events-none absolute inset-x-0 bottom-0 h-8 w-full resize-none border-0 p-0 opacity-0'
                        }
                        style={showSource ? { minHeight: `${minHeight}rem` } : undefined}
                    />
                </div>
            </div>

            {/* Other languages ride along untouched so one save keeps all four. */}
            {locales.filter((locale) => locale !== activeLocale).map((locale) => (
                <input key={locale} type="hidden" name={`${name}_${locale}`} value={values[locale] || ''} />
            ))}
        </div>
    )
}

function Divider() {
    return <span className="mx-1 h-5 w-px bg-gray-300" aria-hidden="true" />
}

function ToolbarButton({
    label, onClick, children, active = false, disabled = false,
}: {
    label: string
    onClick: () => void
    children: React.ReactNode
    active?: boolean
    disabled?: boolean
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={label}
            aria-label={label}
            aria-pressed={active}
            className="flex h-8 w-8 items-center justify-center rounded text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-transparent aria-pressed:bg-primary aria-pressed:text-white"
        >
            {children}
        </button>
    )
}
