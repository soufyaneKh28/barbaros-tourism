'use client'

import { useState } from 'react'
import { deleteImmigrationServiceAction, toggleImmigrationServiceStatusAction } from '@/app/actions/immigration'
import { useRouter } from 'next/navigation'

interface ImmigrationServiceActionsProps {
    service: any
}

export default function ImmigrationServiceActions({ service }: ImmigrationServiceActionsProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isToggling, setIsToggling] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this immigration service?')) {
            return
        }

        setIsDeleting(true)
        try {
            const result = await deleteImmigrationServiceAction(service.id)
            if (result.error) {
                alert('Error deleting service: ' + result.error)
            } else {
                router.refresh()
            }
        } catch (error) {
            console.error('Error deleting service:', error)
            alert('Failed to delete service')
        } finally {
            setIsDeleting(false)
        }
    }

    const handleToggleStatus = async () => {
        setIsToggling(true)
        try {
            const result = await toggleImmigrationServiceStatusAction(service.id)
            if (result.error) {
                alert('Error toggling status: ' + result.error)
            } else {
                router.refresh()
            }
        } catch (error) {
            console.error('Error toggling status:', error)
            alert('Failed to toggle status')
        } finally {
            setIsToggling(false)
        }
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={handleToggleStatus}
                disabled={isToggling}
                className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
            >
                {isToggling ? 'Toggling...' : (service.is_active ? 'Hide' : 'Show')}
            </button>
            <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-600 hover:text-red-800 disabled:opacity-50"
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    )
}
