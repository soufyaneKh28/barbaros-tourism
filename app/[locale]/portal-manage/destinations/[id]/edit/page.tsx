'use client'

import { useState, useEffect } from 'react'
import { updateDestinationAction } from '@/app/actions/destinations'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import ImageUpload from '@/components/portal/ImageUpload'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'

export default function EditDestinationPage() {
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [destination, setDestination] = useState<any>(null)
    const router = useRouter()
    const params = useParams()
    const locale = params?.locale || 'en'
    const id = params?.id as string

    useEffect(() => {
        async function fetchDestination() {
            setFetching(true)
            const supabase = createClient()
            const { data, error } = await supabase
                .from('destinations')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Error fetching destination:', error)
                setError('Failed to load destination')
            } else {
                setDestination(data)
                setImageUrl(data.image_url)
            }
            setFetching(false)
        }

        if (id) {
            fetchDestination()
        }
    }, [id])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        formData.set('imageUrl', imageUrl)

        const result = await updateDestinationAction(id, formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push(`/${locale}/portal-manage/destinations`)
            router.refresh()
        }
    }

    if (fetching) return <div className="p-8 text-center">Loading...</div>
    if (!destination && !fetching) return <div className="p-8 text-center text-red-500">Destination not found</div>

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <h2 className="text-2xl font-bold mb-6 font-cabinet">Edit Destination</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <MultiLangInput name="name" label="Destination Name" required placeholder="e.g. Antalya" defaultValue={destination.name} />

                <div>
                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                    <input name="slug" defaultValue={destination.slug} required className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="e.g. antalya" />
                </div>

                <div>
                    <ImageUpload
                        bucket="destination-images"
                        onUploadComplete={setImageUrl}
                        currentImage={destination.image_url}
                        label="Image URL"
                    />
                    <input type="hidden" name="imageUrl" value={imageUrl} />
                </div>

                <MultiLangTextarea name="description" label="Description" required rows={4} defaultValue={destination.description} />

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
                        {loading ? 'Saving Changes...' : 'Update Destination'}
                    </button>
                </div>
            </form>
        </div>
    )
}
