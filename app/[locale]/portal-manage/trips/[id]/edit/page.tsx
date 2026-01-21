'use client'

import { useState, useEffect } from 'react'
import { updateTripAction } from '@/app/actions/trips'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import ImageUpload from '@/components/portal/ImageUpload'
import MultiImageUpload from '@/components/portal/MultiImageUpload'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import MultiLangArrayInput from '@/components/portal/MultiLangArrayInput'

export default function EditTripPage() {
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [mainImage, setMainImage] = useState('')
    const [galleryImages, setGalleryImages] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [trip, setTrip] = useState<any>(null)
    const router = useRouter()
    const params = useParams()
    const locale = params?.locale || 'en'
    const id = params?.id as string

    useEffect(() => {
        async function fetchTrip() {
            setFetching(true)
            const supabase = createClient()
            const { data, error } = await supabase
                .from('trips')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Error fetching trip:', error)
                setError('Failed to load trip')
            } else {
                setTrip(data)
                setMainImage(data.main_image)
                setGalleryImages(data.images || [])
            }
            setFetching(false)
        }

        if (id) {
            fetchTrip()
        }
    }, [id])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        formData.set('mainImage', mainImage)
        formData.set('images', galleryImages.join(','))

        const result = await updateTripAction(id, formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push(`/${locale}/portal-manage/trips`)
            router.refresh()
        }
    }

    if (fetching) return <div className="p-8 text-center">Loading...</div>
    if (!trip && !fetching) return <div className="p-8 text-center text-red-500">Trip not found</div>

    // Formatting dates for inputs
    const formatDate = (dateString?: string) => {
        if (!dateString) return ''
        return new Date(dateString).toISOString().slice(0, 16)
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <h2 className="text-2xl font-bold mb-6 font-cabinet">Edit Trip</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <MultiLangInput name="title" label="Trip Title" required defaultValue={trip.title} />

                <div>
                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                    <input name="slug" defaultValue={trip.slug} required className="mt-1 block w-full border rounded-md px-3 py-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Trip Type</label>
                    <select name="tripType" defaultValue={trip.trip_type || 'daily'} className="mt-1 block w-full border rounded-md px-3 py-2 bg-white">
                        <option value="daily">Daily Tour</option>
                        <option value="group">Group Tour</option>
                        <option value="private">Private Tour</option>
                        <option value="tourism-programs">Tourism Programs</option>
                        <option value="specialized-packages">Specialized Tourism Packages</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <ImageUpload
                            bucket="trip-images"
                            onUploadComplete={setMainImage}
                            currentImage={trip.main_image}
                            label="Main Image URL"
                            required
                        />
                        <input type="hidden" name="mainImage" value={mainImage} />
                    </div>
                    <div>
                        <MultiImageUpload
                            bucket="trip-images"
                            onUploadComplete={setGalleryImages}
                            currentImages={trip.images || []}
                            label="Gallery Images"
                            maxImages={8}
                        />
                        <input type="hidden" name="images" value={galleryImages.join(',')} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input name="startDate" defaultValue={formatDate(trip.start_date)} type="datetime-local" className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input name="endDate" defaultValue={formatDate(trip.end_date)} type="datetime-local" className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($) (Optional)</label>
                        <input name="price" defaultValue={trip.price} type="number" step="0.01" className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
                        <input name="duration" defaultValue={trip.duration_days} type="number" required className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                </div>

                <MultiLangInput name="location" label="Location" required defaultValue={trip.location} />

                <MultiLangTextarea name="description" label="Description" required rows={3} defaultValue={trip.description} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <MultiLangArrayInput name="includes" label="Includes (One item per line)" rows={5} defaultValue={trip.includes} />
                    <MultiLangArrayInput name="excludes" label="Excludes (One item per line)" rows={5} defaultValue={trip.excludes} />
                </div>

                <MultiLangArrayInput name="itinerary" label="Highlights / Program (One step per line)" rows={6} defaultValue={trip.itinerary} />

                {/* Hot Deal Section */}
                <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 font-cabinet">Hot Deal Settings</h3>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input id="isHotDeal" name="isHotDeal" type="checkbox" defaultChecked={trip.is_hot_deal} className="h-4 w-4 text-primary border-gray-300 rounded" />
                            <label htmlFor="isHotDeal" className="ml-2 block text-sm text-gray-900 font-medium">
                                Mark as Hot Deal
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Priority (lower = higher priority)</label>
                                <input name="hotDealPriority" type="number" min="1" defaultValue={trip.hot_deal_priority} className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="1" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Start Date (Optional)</label>
                                <input name="hotDealStartDate" type="datetime-local" defaultValue={formatDate(trip.hot_deal_start_date)} className="mt-1 block w-full border rounded-md px-3 py-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">End Date (Optional)</label>
                                <input name="hotDealEndDate" type="datetime-local" defaultValue={formatDate(trip.hot_deal_end_date)} className="mt-1 block w-full border rounded-md px-3 py-2" />
                            </div>
                        </div>
                    </div>
                </div>

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
                        {loading ? 'Saving Changes...' : 'Update Trip'}
                    </button>
                </div>
            </form>
        </div>
    )
}
