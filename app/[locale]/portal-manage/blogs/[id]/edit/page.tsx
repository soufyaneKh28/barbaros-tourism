'use client'

import { useState, useEffect } from 'react'
import { updateBlogAction } from '@/app/actions/blogs'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function EditBlogPage() {
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [blog, setBlog] = useState<any>(null)
    const router = useRouter()
    const params = useParams()
    const locale = params?.locale || 'en'
    const id = params?.id as string

    useEffect(() => {
        async function fetchBlog() {
            setFetching(true)
            const supabase = createClient()
            const { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Error fetching blog:', error)
                setError('Failed to load blog post')
            } else {
                setBlog(data)
            }
            setFetching(false)
        }

        if (id) {
            fetchBlog()
        }
    }, [id])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const result = await updateBlogAction(id, formData)

        if (result.error) {
            setError(result.error)
            setLoading(false)
        } else {
            router.push(`/${locale}/portal-manage/blogs`)
            router.refresh()
        }
    }

    if (fetching) return <div className="p-8 text-center">Loading...</div>
    if (!blog && !fetching) return <div className="p-8 text-center text-red-500">Blog post not found</div>

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <h2 className="text-2xl font-bold mb-6 font-cabinet">Edit Blog Post</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            name="title"
                            defaultValue={blog.title}
                            required
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            placeholder="Post title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input
                            name="slug"
                            defaultValue={blog.slug}
                            required
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            placeholder="post-url-slug"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                        <input
                            name="coverImage"
                            defaultValue={blog.cover_image}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            placeholder="https://unsplash.com/..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author Name</label>
                        <input
                            name="authorName"
                            defaultValue={blog.author_name}
                            className="mt-1 block w-full border rounded-md px-3 py-2"
                            placeholder="Barbaros Team"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Excerpt (Short summary)</label>
                    <textarea
                        name="excerpt"
                        defaultValue={blog.excerpt}
                        rows={2}
                        required
                        className="mt-1 block w-full border rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Content (HTML allowed)</label>
                    <textarea
                        name="content"
                        defaultValue={blog.content}
                        rows={10}
                        required
                        className="mt-1 block w-full border rounded-md px-3 py-2 font-mono text-sm"
                        placeholder="<p>Start writing...</p>"
                    />
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
                        {loading ? 'Saving Changes...' : 'Update Blog Post'}
                    </button>
                </div>
            </form>
        </div>
    )
}
