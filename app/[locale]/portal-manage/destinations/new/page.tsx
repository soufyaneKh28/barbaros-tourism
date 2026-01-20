'use client'

import { useState } from 'react'
import { createDestinationAction } from '@/app/actions/destinations'
import { useRouter, useParams } from 'next/navigation'

export default function NewDestinationPage() {
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
        const result = await createDestinationAction(formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push(`/${locale}/portal-manage/destinations`)
            router.refresh()
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Create New Destination</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Destination Name</label>
                    <input name="name" required className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="e.g. Antalya" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                    <input name="slug" required className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="e.g. antalya" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input name="imageUrl" className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="https://unsplash.com/..." />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea name="description" rows={4} required className="mt-1 block w-full border rounded-md px-3 py-2" />
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
                        className="flex-[2] bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 font-bold transition"
                    >
                        {loading ? 'Creating...' : 'Create Destination'}
                    </button>
                </div>
            </form>
        </div>
    )
}
