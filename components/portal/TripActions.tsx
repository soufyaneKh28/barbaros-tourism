'use client'

import { Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { deleteTripAction } from '@/app/actions/trips'
import { useParams } from 'next/navigation'
import { useState } from 'react'

interface TripActionsProps {
    id: string
}

export default function TripActions({ id }: TripActionsProps) {
    const params = useParams()
    const locale = params?.locale || 'en'
    const [loading, setLoading] = useState(false)

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this trip?')) return

        setLoading(true)
        const result = await deleteTripAction(id)
        if (result.error) {
            alert('Error deleting trip: ' + result.error)
        }
        setLoading(false)
    }

    return (
        <div className="flex items-center gap-2">
            <Link
                href={`/${locale}/portal-manage/trips/${id}/edit`}
                className="p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                title="Edit Trip"
            >
                <Edit2 className="w-4 h-4" />
            </Link>
            <button
                onClick={handleDelete}
                disabled={loading}
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Delete Trip"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}
