'use client'

import React, { useState, useTransition } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/components/portal/ImageUpload'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext'
import GlobalLanguageSwitcher from '@/components/portal/GlobalLanguageSwitcher'
import { createQuickAction, updateQuickAction } from '@/app/actions/home-quick-actions'
import { locales } from '@/i18n/config'

interface QuickActionFormProps {
    initialData?: any
    isEditing?: boolean
}

export default function QuickActionForm({ initialData, isEditing = false }: QuickActionFormProps) {
    const router = useRouter()
    const params = useParams()
    const locale = params.locale as string
    const [isPending, startTransition] = useTransition()
    const [image, setImage] = useState<string>(initialData?.icon_url || '')
    const [isActive, setIsActive] = useState(initialData?.is_active ?? true)

    const handleSubmit = async (formData: FormData) => {
        const rawData = Object.fromEntries(formData.entries())

        // Construct title and desc objects
        const title: Record<string, string> = {}
        const description: Record<string, string> = {}
        const link_url: Record<string, string> = {}

        // Use imported locales config
        locales.forEach(loc => {
            if (rawData[`title_${loc}`]) title[loc] = rawData[`title_${loc}`] as string
            if (rawData[`description_${loc}`]) description[loc] = rawData[`description_${loc}`] as string
            if (rawData[`link_url_${loc}`]) link_url[loc] = rawData[`link_url_${loc}`] as string
        })

        const payload = {
            title,
            description,
            icon_url: image, // Use state
            link_url,        // Use object
            sort_order: parseInt(rawData.sort_order as string || '0'),
            is_active: isActive,
            updated_at: new Date().toISOString()
        }

        startTransition(async () => {
            let result
            if (isEditing && initialData?.id) {
                result = await updateQuickAction(initialData.id, payload)
            } else {
                result = await createQuickAction(payload)
            }

            if (result?.error) {
                // Determine if error is string or object
                const errorMsg = typeof result.error === 'string'
                    ? result.error
                    : (result.error as any)?.message || 'Error saving quick action'
                alert(errorMsg)
            } else {
                router.push(`/${locale}/portal-manage/quick-actions`)
                router.refresh()
            }
        })
    }

    return (
        <AdminLanguageProvider>
            <form action={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow space-y-8 font-satoshi">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-cabinet text-primary">
                        {isEditing ? 'Edit Quick Action' : 'New Quick Action'}
                    </h2>
                    <GlobalLanguageSwitcher />
                </div>

                {/* Icon Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <ImageUpload
                        bucket="service-images"
                        currentImage={image}
                        onUploadComplete={setImage}
                    />
                    <p className="text-xs text-gray-500 mt-1">Recommended: SVG or PNG icon, transparent background.</p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Title */}
                    <div className="col-span-full">
                        <MultiLangInput
                            name="title"
                            label="Title"
                            defaultValue={initialData?.title}
                            placeholder="Enter title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="col-span-full">
                        <MultiLangTextarea
                            name="description"
                            label="Description"
                            defaultValue={initialData?.description}
                            placeholder="Enter description"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <MultiLangInput
                                name="link_url"
                                label="Link URL"
                                defaultValue={
                                    typeof initialData?.link_url === 'string'
                                        ? { en: initialData.link_url }
                                        : initialData?.link_url
                                }
                                placeholder="/services/medical"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                            <input
                                type="number"
                                name="sort_order"
                                defaultValue={initialData?.sort_order || 0}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="flex items-center pt-4">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700">Active (Visible on website)</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mr-4 px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                    >
                        {isPending ? 'Saving...' : isEditing ? 'Update Action' : 'Create Action'}
                    </button>
                </div>
            </form>
        </AdminLanguageProvider>
    )
}
