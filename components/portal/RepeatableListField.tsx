'use client'

import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
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

export default function RepeatableListField({ name, label, itemLabel, itemFields, defaultItems }: RepeatableListFieldProps) {
    const [items, setItems] = useState(() =>
        (defaultItems.length > 0 ? defaultItems : [{}]).map(data => ({ id: makeId(), data }))
    )

    function addItem() {
        setItems(prev => [...prev, { id: makeId(), data: {} }])
    }

    function removeItem(id: string) {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    function updateItemField(id: string, key: string, value: any) {
        setItems(prev => prev.map(item => (item.id === id ? { ...item, data: { ...item.data, [key]: value } } : item)))
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

            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={item.id} className="relative border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50/50">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{itemLabel} {index + 1}</span>
                            <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                                aria-label={`Remove ${itemLabel} ${index + 1}`}
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {itemFields.map(f => {
                            const fieldName = `${name}.${index}.${f.key}`
                            if (f.type === 'image') {
                                return (
                                    <div key={f.key}>
                                        <ImageUpload
                                            bucket="site-content"
                                            label={f.label}
                                            currentImage={item.data[f.key] || ''}
                                            onUploadComplete={url => updateItemField(item.id, f.key, url)}
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
                ))}
            </div>
        </div>
    )
}
