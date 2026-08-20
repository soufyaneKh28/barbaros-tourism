'use client'

import { useState } from 'react'
import { Plus, Trash2, Copy, ChevronDown, GripVertical } from 'lucide-react'
import {
    DndContext, closestCenter, KeyboardSensor, PointerSensor,
    useSensor, useSensors, type DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove, SortableContext, sortableKeyboardCoordinates,
    useSortable, verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import ImageUpload from '@/components/portal/ImageUpload'
import type { GenericFieldSchema } from '@/lib/site-content-shared'

interface RepeatableListFieldProps {
    name: string
    label: string
    itemLabel: string
    itemFields: GenericFieldSchema[]
    defaultItems: Record<string, any>[]
}

let nextId = 0
function makeId() {
    nextId += 1
    return `item-${nextId}`
}

function textOf(value: any): string {
    if (!value) return ''
    if (typeof value === 'string') return value
    return value.en || Object.values(value).find((v): v is string => typeof v === 'string' && v.length > 0) || ''
}

function hasAnyContent(data: Record<string, any>): boolean {
    return Object.values(data).some(v => textOf(v).trim().length > 0)
}

interface Item {
    id: string
    data: Record<string, any>
    collapsed: boolean
}

function SortableItem({
    item, index, itemLabel, itemFields, name,
    onToggle, onDuplicate, onRemove, onFieldChange,
}: {
    item: Item
    index: number
    itemLabel: string
    itemFields: GenericFieldSchema[]
    name: string
    onToggle: () => void
    onDuplicate: () => void
    onRemove: () => void
    onFieldChange: (key: string, value: any) => void
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.6 : 1,
    }

    const imageField = itemFields.find(f => f.type === 'image')
    const labelField = itemFields.find(f => f.key === 'name' || f.key === 'title') || itemFields.find(f => f.type !== 'image')
    const snippetField = itemFields.find(f => f.type !== 'image' && f.key !== labelField?.key)
    const thumbnail = imageField ? item.data[imageField.key] : null
    const label = labelField ? textOf(item.data[labelField.key]) : ''
    const snippet = snippetField ? textOf(item.data[snippetField.key]) : ''

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`border border-gray-200 rounded-xl bg-gray-50/50 overflow-hidden ${isDragging ? 'shadow-xl ring-2 ring-primary ring-opacity-50' : ''}`}
        >
            <div className="flex items-center gap-3 p-3">
                <button
                    type="button"
                    {...attributes}
                    {...listeners}
                    className="shrink-0 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing touch-none"
                    aria-label="Drag to reorder"
                >
                    <GripVertical className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={onToggle}
                    className="flex-1 flex items-center gap-3 min-w-0 text-left"
                >
                    {imageField && (
                        thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={thumbnail} alt="" className="w-9 h-9 rounded-full object-cover shrink-0 border border-gray-200" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
                        )
                    )}
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                            {label || `${itemLabel} ${index + 1}`}
                        </p>
                        {snippet && (
                            <p className="text-xs text-gray-400 truncate">{snippet}</p>
                        )}
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${item.collapsed ? '' : 'rotate-180'}`} />
                </button>

                <div className="flex items-center gap-1 shrink-0" onPointerDown={e => e.stopPropagation()}>
                    <button
                        type="button"
                        onClick={onDuplicate}
                        className="p-1.5 text-gray-400 hover:text-primary transition-colors"
                        aria-label={`Duplicate ${itemLabel} ${index + 1}`}
                        title="Duplicate"
                    >
                        <Copy className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label={`Remove ${itemLabel} ${index + 1}`}
                        title="Remove"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Fields stay mounted (just visually hidden) so their values are
                still included in the form's FormData when collapsed. */}
            <div className={`px-4 pb-4 space-y-4 border-t border-gray-100 pt-4 ${item.collapsed ? 'hidden' : ''}`}>
                {itemFields.map(f => {
                    const fieldName = `${name}.${index}.${f.key}`
                    if (f.type === 'image') {
                        return (
                            <div key={f.key}>
                                <ImageUpload
                                    bucket="site-content"
                                    label={f.label}
                                    currentImage={item.data[f.key] || ''}
                                    onUploadComplete={url => onFieldChange(f.key, url)}
                                />
                                <input type="hidden" name={fieldName} value={item.data[f.key] || ''} />
                            </div>
                        )
                    }
                    if (f.multiLang === false) {
                        return (
                            <div key={f.key}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{f.label}</label>
                                <input
                                    type={f.inputType || 'text'}
                                    name={fieldName}
                                    defaultValue={item.data[f.key] || ''}
                                    placeholder={f.placeholder}
                                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                />
                            </div>
                        )
                    }
                    if (f.type === 'textarea') {
                        return (
                            <MultiLangTextarea
                                key={f.key}
                                name={fieldName}
                                label={f.label}
                                defaultValue={item.data[f.key]}
                                rows={f.rows || 3}
                                placeholder={f.placeholder}
                            />
                        )
                    }
                    return (
                        <MultiLangInput
                            key={f.key}
                            name={fieldName}
                            label={f.label}
                            defaultValue={item.data[f.key]}
                            placeholder={f.placeholder}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default function RepeatableListField({ name, label, itemLabel, itemFields, defaultItems }: RepeatableListFieldProps) {
    const [items, setItems] = useState<Item[]>(() =>
        (defaultItems.length > 0 ? defaultItems : [{}]).map(data => ({
            id: makeId(),
            data,
            collapsed: hasAnyContent(data),
        }))
    )

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    )

    function addItem() {
        setItems(prev => [...prev, { id: makeId(), data: {}, collapsed: false }])
    }

    function removeItem(id: string) {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    function duplicateItem(id: string) {
        setItems(prev => {
            const index = prev.findIndex(item => item.id === id)
            if (index === -1) return prev
            const clone: Item = { id: makeId(), data: { ...prev[index].data }, collapsed: false }
            return [...prev.slice(0, index + 1), clone, ...prev.slice(index + 1)]
        })
    }

    function toggleItem(id: string) {
        setItems(prev => prev.map(item => (item.id === id ? { ...item, collapsed: !item.collapsed } : item)))
    }

    function updateItemField(id: string, key: string, value: any) {
        setItems(prev => prev.map(item => (item.id === id ? { ...item, data: { ...item.data, [key]: value } } : item)))
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event
        if (over && active.id !== over.id) {
            setItems(prev => {
                const oldIndex = prev.findIndex(item => item.id === active.id)
                const newIndex = prev.findIndex(item => item.id === over.id)
                return arrayMove(prev, oldIndex, newIndex)
            })
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">{label}</label>
                <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-600 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add {itemLabel}
                </button>
            </div>

            <input type="hidden" name={`${name}.count`} value={items.length} />

            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <SortableItem
                                key={item.id}
                                item={item}
                                index={index}
                                itemLabel={itemLabel}
                                itemFields={itemFields}
                                name={name}
                                onToggle={() => toggleItem(item.id)}
                                onDuplicate={() => duplicateItem(item.id)}
                                onRemove={() => removeItem(item.id)}
                                onFieldChange={(key, value) => updateItemField(item.id, key, value)}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </div>
    )
}
