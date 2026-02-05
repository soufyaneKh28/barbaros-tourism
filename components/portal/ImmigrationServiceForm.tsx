'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createImmigrationServiceAction, updateImmigrationServiceAction } from '@/app/actions/immigration'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import ImageUpload from '@/components/portal/ImageUpload'
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext'
import GlobalLanguageSwitcher from '@/components/portal/GlobalLanguageSwitcher'

interface ImmigrationServiceFormProps {
    service?: any
    categories: any[]
}

export default function ImmigrationServiceForm(props: ImmigrationServiceFormProps) {
    const { service = null, categories = [] } = props || {}
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [mainImage, setMainImage] = useState(service?.main_image || '')
    const isEditing = !!service
    const defaultIsActive = service?.is_active ?? true

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        const result = isEditing
            ? await updateImmigrationServiceAction(service.id, formData)
            : await createImmigrationServiceAction(formData)

        if (result.error) {
            alert(result.error)
            setLoading(false)
        } else {
            router.push('/en/portal-manage/immigration-services')
            router.refresh()
        }
    }

    return (
        <AdminLanguageProvider>
            <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
                <h2 className="text-2xl font-bold mb-6 font-cabinet">
                    {isEditing ? 'Edit Immigration Service' : 'Add New Immigration Service'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <GlobalLanguageSwitcher />

                    <MultiLangInput
                        name="title"
                        label="Service Title"
                        defaultValue={service?.title}
                        required
                    />

                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                            Slug (URL-friendly name)
                        </label>
                        <input
                            type="text"
                            id="slug"
                            name="slug"
                            defaultValue={service?.slug || ''}
                            required
                            placeholder="e.g., tourist-visa-application"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                            Category *
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            defaultValue={service?.category_id || ''}
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <MultiLangTextarea
                        name="description"
                        label="Description"
                        defaultValue={service?.description}
                        required
                        rows={4}
                    />

                    <MultiLangInput
                        name="ctaText"
                        label="Button Text"
                        defaultValue={service?.cta_text}
                        placeholder="e.g., Apply Now"
                    />

                    <div>
                        <label htmlFor="ctaLink" className="block text-sm font-medium text-gray-700 mb-1">
                            Button Link (URL)
                        </label>
                        <input
                            type="text"
                            id="ctaLink"
                            name="ctaLink"
                            defaultValue={service?.cta_link || ''}
                            placeholder="e.g., https://example.com/apply"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-1">
                            Display Order (lower number = higher priority)
                        </label>
                        <input
                            type="number"
                            id="displayOrder"
                            name="displayOrder"
                            defaultValue={service?.display_order || 0}
                            min={0}
                            className="w-full md:w-48 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <div>
                        <ImageUpload
                            bucket="service-images"
                            onUploadComplete={setMainImage}
                            currentImage={service?.main_image}
                            label="Service Image"
                        />
                        <input type="hidden" name="mainImage" value={mainImage} />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            defaultChecked={defaultIsActive}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                            Active (visible to public)
                        </label>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition disabled:opacity-50 font-medium"
                        >
                            {loading ? (isEditing ? 'Updating...' : 'Creating...') : (isEditing ? 'Update Service' : 'Create Service')}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </AdminLanguageProvider>
    )
}
