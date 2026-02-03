'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createMedicalTourismSectionAction, updateMedicalTourismSectionAction } from '@/app/actions/medical-tourism'
import { MedicalTourismSection } from '@/lib/types'
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext'
import GlobalLanguageSwitcher from '@/components/portal/GlobalLanguageSwitcher'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import ImageUpload from '@/components/portal/ImageUpload'

interface MedicalSectionFormProps {
    section?: MedicalTourismSection
}

export default function MedicalSectionForm({ section }: MedicalSectionFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(section?.image_url || '')
    const isEditing = !!section

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        // Ensure image URL is included if it wasn't uploaded in this session but exists
        if (imageUrl && !formData.has('imageUrl')) {
            formData.append('imageUrl', imageUrl)
        }

        const result = isEditing
            ? await updateMedicalTourismSectionAction(section.id, formData)
            : await createMedicalTourismSectionAction(formData)

        if (result.error) {
            alert(result.error)
            setLoading(false)
        } else {
            router.push('/en/portal-manage/medical-tourism')
            router.refresh()
        }
    }

    return (
        <AdminLanguageProvider>
            <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold font-cabinet text-primary">
                        {isEditing ? 'Edit Section' : 'Add New Section'}
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage content for the Medical Tourism page sections.
                    </p>
                </div>

                <div className="mb-6">
                    <GlobalLanguageSwitcher />
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <div className="p-6 bg-gray-50 rounded-xl space-y-6 border border-gray-100">
                        <h3 className="text-lg font-bold font-cabinet text-gray-900 border-b border-gray-200 pb-3">
                            Section Content
                        </h3>

                        <MultiLangInput
                            name="title"
                            label="Section Title"
                            defaultValue={section?.title}
                            required
                            placeholder="e.g., Hair Transplant"
                        />

                        <MultiLangTextarea
                            name="description"
                            label="Description"
                            defaultValue={section?.description}
                            rows={4}
                            placeholder="Brief description of this medical service..."
                            required
                        />
                    </div>

                    {/* Media & Settings */}
                    <div className="p-6 bg-gray-50 rounded-xl space-y-6 border border-gray-100">
                        <h3 className="text-lg font-bold font-cabinet text-gray-900 border-b border-gray-200 pb-3">
                            Media & Settings
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Section Image
                                </label>
                                <ImageUpload
                                    bucket="service-images"
                                    onUploadComplete={(url) => {
                                        setImageUrl(url)
                                    }}
                                    currentImage={imageUrl}
                                    label="Upload Image"
                                />
                                <input type="hidden" name="imageUrl" value={imageUrl} />
                                <p className="text-xs text-gray-500 mt-2">
                                    Recommended size: 800x600px. JPG, PNG, or WebP.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-1">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        id="displayOrder"
                                        name="displayOrder"
                                        defaultValue={section?.display_order || 0}
                                        min={0}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
                                        placeholder="0"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Lower numbers appear first.
                                    </p>
                                </div>

                                <div className="flex items-center pt-4">
                                    <div className="relative flex items-start">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="isActive"
                                                name="isActive"
                                                type="checkbox"
                                                defaultChecked={section ? section.is_active : true}
                                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm leading-6">
                                            <label htmlFor="isActive" className="font-medium text-gray-900">
                                                Active Status
                                            </label>
                                            <p className="text-gray-500">
                                                Visible on the public website when checked.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-white px-8 py-2.5 rounded-lg hover:bg-primary-600 transition-all font-medium shadow-sm hover:shadow active:scale-95 disabled:opacity-70 disabled:active:scale-100"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    {isEditing ? 'Saving...' : 'Creating...'}
                                </span>
                            ) : (
                                isEditing ? 'Update Section' : 'Create Section'
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-white text-gray-700 border border-gray-300 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </AdminLanguageProvider>
    )
}
