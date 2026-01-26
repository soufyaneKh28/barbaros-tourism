'use client'

import { useState, useEffect, use } from 'react'
import { updateProgramAction } from '@/app/actions/programs'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/portal/ImageUpload'
import MultiImageUpload from '@/components/portal/MultiImageUpload'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import MultiLangArrayInput from '@/components/portal/MultiLangArrayInput'
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext'
import GlobalLanguageSwitcher from '@/components/portal/GlobalLanguageSwitcher'
import { getProgramBySlug } from '@/lib/services/programs' // We need getProgramById actually, let's assume index exports fetch methods

// We need a way to fetch data client-side or pass it from server component. 
// For simplicity and consistency with current "new" page structure, I'll make this a client component 
// that might need data passed to it, OR Fetch data in a Server Component wrapper.
// Let's use the Server Component pattern wrapping a Client Form, but for now, to keep it simple & consistent
// with how Barbaros usually does it (often client logic mixed), I'll try to fetch data in the Server Component and pass to Client Form.

// Actually, looking at previous files, "NewTripPage" is pure client. 
// "EditTripPage" (which I haven't seen but assume exists) likely fetches data.
// I will create a Client Form component and a Server Page component.

import { supabase } from '@/lib/supabase' // client side supabase if needed, but better use server fetch

export default function EditProgramPage({ params }: { params: Promise<{ id: string, locale: string }> }) {
    // Unwrapping params
    const { id, locale } = use(params)

    // State
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [program, setProgram] = useState<any>(null)

    // Form State
    const [mainImage, setMainImage] = useState('')
    const [galleryImages, setGalleryImages] = useState<string[]>([])

    const router = useRouter()

    useEffect(() => {
        async function fetchProgram() {
            // Fetch raw data to populate form fields correctly (handling JSON etc)
            // We can simple use supabase client here for admin side fetching
            const { data, error } = await supabase
                .from('programs')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error(error)
                setError("Failed to load program")
            } else {
                setProgram(data)
                setMainImage(data.main_image || '')
                setGalleryImages(data.images || [])
            }
            setInitialLoading(false)
        }
        fetchProgram()
    }, [id])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        formData.set('main_image', mainImage)
        formData.set('images', galleryImages.join(','))

        const result = await updateProgramAction(id, formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push(`/${locale}/portal-manage/programs`)
            router.refresh()
        }
    }

    if (initialLoading) return <div className="p-8">Loading...</div>
    if (error) return <div className="p-8 text-red-600">Error: {error}</div>
    if (!program) return <div className="p-8">Program not found</div>

    return (
        <AdminLanguageProvider>
            <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
                <h2 className="text-2xl font-bold mb-6 font-cabinet">Edit Program</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <GlobalLanguageSwitcher />
                    <MultiLangInput name="title" label="Program Title" required placeholder="e.g. Umrah Trip" defaultValue={program.title} />

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input name="slug" required defaultValue={program.slug} className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="e.g. umrah-trip-2024" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <ImageUpload
                                bucket="trip-images"
                                onUploadComplete={setMainImage}
                                label="Main Image URL"
                                required
                                currentImage={mainImage}
                            />
                            <input type="hidden" name="main_image" value={mainImage} />
                        </div>
                        <div>
                            <MultiImageUpload
                                bucket="trip-images"
                                onUploadComplete={setGalleryImages}
                                label="Gallery Images"
                                maxImages={8}
                                currentImages={galleryImages}
                            />
                            <input type="hidden" name="images" value={galleryImages.join(',')} />
                        </div>
                    </div>

                    <MultiLangInput name="duration_text" label="Duration" placeholder="e.g. 9 Days / 8 Nights" required defaultValue={program.duration_text} />

                    <MultiLangInput name="accommodation_type" label="Accommodation Type" placeholder="e.g. 4 Star Hotel within 500m" required defaultValue={program.accommodation_type} />

                    <MultiLangTextarea name="description" label="Short Description" required rows={3} defaultValue={program.description} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MultiLangArrayInput name="includes" label="Includes (One item per line)" rows={5} placeholder="Flight Tickets&#10;Visa&#10;Hotels" defaultValue={program.includes} />
                        <MultiLangArrayInput name="excludes" label="Excludes (One item per line)" rows={5} placeholder="Personal Expenses&#10;Lunch/Dinner" defaultValue={program.excludes} />
                    </div>

                    <MultiLangTextarea name="itinerary" label="Detailed Itinerary / Program" rows={10} placeholder="Day 1: Arrival to Makkah...&#10;Day 2: Umrah performance..." defaultValue={program.itinerary} />

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
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLanguageProvider>
    )
}
