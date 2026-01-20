'use client'

import { useState } from 'react'
import { createBlogAction } from '@/app/actions/blogs'
import { useRouter, useParams } from 'next/navigation'

export default function NewBlogPage() {
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
        const result = await createBlogAction(formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push(`/${locale}/portal-manage/blogs`)
            router.refresh()
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Create New Blog Post</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input name="title" required className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="Post title" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input name="slug" required className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="post-url-slug" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                        <input name="coverImage" className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="https://unsplash.com/..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author Name</label>
                        <input name="authorName" className="mt-1 block w-full border rounded-md px-3 py-2" placeholder="Barbaros Team" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Excerpt (Short summary)</label>
                    <textarea name="excerpt" rows={2} required className="mt-1 block w-full border rounded-md px-3 py-2" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Content (HTML allowed)</label>
                    <textarea name="content" rows={10} required className="mt-1 block w-full border rounded-md px-3 py-2 font-mono text-sm" placeholder="<p>Start writing...</p>" />
                </div>

                <div className="flex items-center">
                    <input id="isPublished" name="isPublished" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                    <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-900">
                        Publish immediately
                    </label>
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
                        {loading ? 'Saving...' : 'Create Blog Post'}
                    </button>
                </div>
            </form>
        </div>
    )
}
