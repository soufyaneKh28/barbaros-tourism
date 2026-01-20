'use client'

import { useState } from 'react'
import { createTripAction } from '@/app/actions/trips'
import { useRouter, useParams } from 'next/navigation'

export default function NewTripPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const params = useParams()
    const locale = params?.locale || 'en'

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const result = await createTripAction(formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push(`/${locale}/portal-manage/trips`)
            router.refresh()
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <h2 className="text-2xl font-bold mb-6 font-cabinet">Create New Trip</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Trip Title</label>
                        <input name="title" required className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="e.g. Bosphorus Dinner Cruise" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input name="slug" required className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="e.g. bosphorus-dinner-cruise" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Main Image URL</label>
                        <input name="mainImage" required className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="https://..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Other Images (Comma separated)</label>
                        <input name="images" className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="https://..., https://..." />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input name="startDate" type="datetime-local" className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input name="endDate" type="datetime-local" className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($) (Optional)</label>
                        <input name="price" type="number" step="0.01" className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
                        <input name="duration" type="number" required className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input name="location" required className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" rows={3} required className="mt-1 block w-full border rounded-md px-3 py-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Includes (One item per line)</label>
                        <textarea name="includes" rows={5} className="mt-1 block w-full border rounded-md px-3 py-2 font-mono text-sm" placeholder="Hotel pickup&#10;Lunch&#10;Guide" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Excludes (One item per line)</label>
                        <textarea name="excludes" rows={5} className="mt-1 block w-full border rounded-md px-3 py-2 font-mono text-sm" placeholder="Personal expenses&#10;Tips" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Highlights / Program (One step per line)</label>
                    <textarea name="itinerary" rows={6} className="mt-1 block w-full border rounded-md px-3 py-2 font-mono text-sm" placeholder="Day 1: Arrival and Transfer&#10;Day 2: City Tour&#10;Day 3: Departure" />
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
                        {loading ? 'Creating...' : 'Create Trip'}
                    </button>
                </div>
            </form>
        </div>
    )
}
