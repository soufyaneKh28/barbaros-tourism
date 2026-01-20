'use client'

import { useState, useEffect } from 'react'
import { updateTripAction } from '@/app/actions/trips'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function EditTripPage() {
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
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

    const formatArray = (arr?: string[]) => arr?.join('\n') || ''
    const formatItinerary = (itinerary?: any[]) => itinerary?.map((i: any) => i.title).join('\n') || ''

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <h2 className="text-2xl font-bold mb-6 font-cabinet">Edit Trip</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Trip Title</label>
                        <input name="title" defaultValue={trip.title} required className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input name="slug" defaultValue={trip.slug} required className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Trip Type</label>
                    <select name="tripType" defaultValue={trip.trip_type || 'daily'} className="mt-1 block w-full border rounded-md px-3 py-2 bg-white">
                        <option value="daily">Daily Tour</option>
                        <option value="group">Group Tour</option>
                        <option value="private">Private Tour</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Main Image URL</label>
                        <input name="mainImage" defaultValue={trip.main_image} required className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Other Images (Comma separated)</label>
                        <input name="images" defaultValue={trip.images?.join(', ')} className="mt-1 block w-full border rounded-md px-3 py-2" />
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($) (Optional)</label>
                        <input name="price" defaultValue={trip.price} type="number" step="0.01" className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
                        <input name="duration" defaultValue={trip.duration_days} type="number" required className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input name="location" defaultValue={trip.location} required className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" defaultValue={trip.description} rows={3} required className="mt-1 block w-full border rounded-md px-3 py-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Includes (One item per line)</label>
                        <textarea name="includes" defaultValue={formatArray(trip.includes)} rows={5} className="mt-1 block w-full border rounded-md px-3 py-2 font-mono text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Excludes (One item per line)</label>
                        <textarea name="excludes" defaultValue={formatArray(trip.excludes)} rows={5} className="mt-1 block w-full border rounded-md px-3 py-2 font-mono text-sm" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Highlights / Program (One step per line)</label>
                    <textarea name="itinerary" defaultValue={formatItinerary(trip.itinerary)} rows={6} className="mt-1 block w-full border rounded-md px-3 py-2 font-mono text-sm" />
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
