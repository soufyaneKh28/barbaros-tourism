'use client'

import { useState } from 'react'
import { Edit2, Trash2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { deleteBlogAction, toggleBlogStatusAction } from '@/app/actions/blogs'
import { useParams } from 'next/navigation'

interface BlogActionsProps {
    id: string
    isPublished: boolean
    slug: string
}

export default function BlogActions({ id, isPublished, slug }: BlogActionsProps) {
    const params = useParams()
    const locale = params?.locale || 'en'
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
            return
        }

        setLoading(true)
        const result = await deleteBlogAction(id)
        setLoading(false)

        if (result.error) {
            alert('Failed to delete blog: ' + result.error)
        }
    }

    async function handleToggleStatus() {
        setLoading(true)
        const result = await toggleBlogStatusAction(id, !isPublished)
        setLoading(false)

        if (result.error) {
            alert('Failed to update status: ' + result.error)
        }
    }

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleToggleStatus}
                disabled={loading}
                className={`p-2 rounded-lg transition-colors ${isPublished
                        ? 'text-amber-500 hover:text-amber-600 hover:bg-amber-50'
                        : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                    }`}
                title={isPublished ? 'Unpublish' : 'Publish'}
            >
                {loading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : isPublished ? (
                    <EyeOff className="w-4 h-4" />
                ) : (
                    <Eye className="w-4 h-4" />
                )}
            </button>
            <Link
                href={`/${locale}/portal-manage/blogs/${id}/edit`}
                className="p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                title="Edit"
            >
                <Edit2 className="w-4 h-4" />
            </Link>
            <button
                onClick={handleDelete}
                disabled={loading}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}
