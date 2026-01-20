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
        <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Create New Trip</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Trip Title</label>
                    <input name="title" required className="mt-1 block w-full border rounded-md px-3 py-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Slug (URL friendly)</label>
                    <input name="slug" required className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="e.g. bosphorus-dinner-cruise" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Images URL (single for now)</label>
                    <input name="imageUrl" className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="https://unsplash.com/..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input name="price" type="number" step="0.01" required className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Duration (Days)</label>
                        <input name="duration" type="number" required className="mt-1 block w-full border rounded-md px-3 py-2" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input name="location" required className="mt-1 block w-full border rounded-md px-3 py-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" rows={4} required className="mt-1 block w-full border rounded-md px-3 py-2" />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-bold"
                    >
                        {loading ? 'Creating...' : 'Create Trip'}
                    </button>
                </div>
            </form>
        </div>
    )
}
