'use client'

import { useState } from 'react'
import { deleteServiceAction } from '@/app/actions/services'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

interface ServiceActionsProps {
    service: any
}

export default function ServiceActions({ service }: ServiceActionsProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleDelete() {
        if (!confirm(`Are you sure you want to delete "${service.service_name}"?`)) {
            return
        }

        setLoading(true)
        const result = await deleteServiceAction(service.id)

        if (result.error) {
            alert(result.error)
            setLoading(false)
        } else {
            router.refresh()
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="text-red-600 hover:text-red-900 disabled:opacity-50"
            title="Delete service"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    )
}
