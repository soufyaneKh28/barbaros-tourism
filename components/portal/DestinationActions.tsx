'use client'

import { useState } from 'react'
import { deleteDestinationAction } from '@/app/actions/destinations'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

interface DestinationActionsProps {
    destinationId: string
    destinationName: string
    locale: string
}

export default function DestinationActions({ destinationId, destinationName, locale }: DestinationActionsProps) {
    const [deleting, setDeleting] = useState(false)
    const router = useRouter()

    async function handleDelete() {
        if (!confirm(`Are you sure you want to delete "${destinationName}"? This action cannot be undone.`)) {
            return
        }

        setDeleting(true)
        const result = await deleteDestinationAction(destinationId)

        if (result.error) {
            alert('Failed to delete destination: ' + result.error)
            setDeleting(false)
        } else {
            router.refresh()
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-white hover:shadow-sm rounded-lg transition-all font-medium text-sm disabled:opacity-50"
        >
            <Trash2 className="w-4 h-4" />
            {deleting ? 'Deleting...' : 'Delete'}
        </button>
    )
}
