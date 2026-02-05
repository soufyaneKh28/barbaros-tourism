'use client'

import { Edit2, Trash2, Clock } from 'lucide-react'
import Link from 'next/link'
import { deleteTripAction, toggleTripComingSoonAction } from '@/app/actions/trips'
import { useParams } from 'next/navigation'
import { useState } from 'react'

interface TripActionsProps {
    id: string
    initialIsComingSoon?: boolean
}

export default function TripActions({ id, initialIsComingSoon = false }: TripActionsProps) {
    const params = useParams()
    const locale = params?.locale || 'en'
    const [loading, setLoading] = useState(false)

    const [isComingSoon, setIsComingSoon] = useState(initialIsComingSoon)

    async function handleToggleComingSoon() {
        const newValue = !isComingSoon
        setIsComingSoon(newValue)

        try {
            const result = await toggleTripComingSoonAction(id, newValue)
            if (result.error) {
                // Revert on error
                setIsComingSoon(!newValue)
                alert('Error updating status: ' + result.error)
            }
        } catch (error) {
            setIsComingSoon(!newValue)
            console.error(error)
        }
    }

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
            <button
                onClick={handleToggleComingSoon}
                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors text-xs font-medium border ${isComingSoon
                    ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                    }`}
                title={isComingSoon ? "Mark as Active" : "Mark as Coming Soon"}
            >
                <Clock className={`w-3.5 h-3.5 ${isComingSoon ? 'fill-current' : ''}`} />
                {isComingSoon ? 'Coming Soon' : 'Active'}
            </button>
            <div className="w-px h-4 bg-gray-200 mx-1" />
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
