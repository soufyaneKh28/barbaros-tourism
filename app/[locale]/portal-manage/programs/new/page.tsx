'use client'

import { useState } from 'react'
import { createProgramAction } from '@/app/actions/programs'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/components/portal/ImageUpload'
import MultiImageUpload from '@/components/portal/MultiImageUpload'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import MultiLangArrayInput from '@/components/portal/MultiLangArrayInput'
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext'
import GlobalLanguageSwitcher from '@/components/portal/GlobalLanguageSwitcher'

export default function NewProgramPage() {
    const [loading, setLoading] = useState(false)
    const [mainImage, setMainImage] = useState('')
    const [galleryImages, setGalleryImages] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const params = useParams()
    const locale = params?.locale || 'en'

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        formData.set('main_image', mainImage)
        formData.set('images', galleryImages.join(','))

        const result = await createProgramAction(formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push(`/${locale}/portal-manage/programs`)
            router.refresh()
        }
    }

    return (
        <AdminLanguageProvider>
            <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
                <h2 className="text-2xl font-bold mb-6 font-cabinet">Create New Program</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <GlobalLanguageSwitcher />
                    <MultiLangInput name="title" label="Program Title" required placeholder="e.g. Umrah Trip" />

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input name="slug" required className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="e.g. umrah-trip-2024" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <ImageUpload
                                bucket="trip-images"
                                onUploadComplete={setMainImage}
                                label="Main Image URL"
                                required
                            />
                            <input type="hidden" name="main_image" value={mainImage} />
                        </div>
                        <div>
                            <MultiImageUpload
                                bucket="trip-images"
                                onUploadComplete={setGalleryImages}
                                label="Gallery Images"
                                maxImages={8}
                            />
                            <input type="hidden" name="images" value={galleryImages.join(',')} />
                        </div>
                    </div>

                    <MultiLangInput name="duration_text" label="Duration" placeholder="e.g. 9 Days / 8 Nights" required />

                    <MultiLangInput name="accommodation_type" label="Accommodation Type" placeholder="e.g. 4 Star Hotel within 500m" required />

                    <MultiLangTextarea name="description" label="Short Description" required rows={3} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MultiLangArrayInput name="includes" label="Includes (One item per line)" rows={5} placeholder="Flight Tickets&#10;Visa&#10;Hotels" />
                        <MultiLangArrayInput name="excludes" label="Excludes (One item per line)" rows={5} placeholder="Personal Expenses&#10;Lunch/Dinner" />
                    </div>

                    <MultiLangTextarea name="itinerary" label="Detailed Itinerary / Program" rows={10} placeholder="Day 1: Arrival to Makkah...&#10;Day 2: Umrah performance..." />

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 disabled:bg-gray-400 font-bold transition"
                        >
                            {loading ? 'Creating...' : 'Create Program'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLanguageProvider>
    )
}
