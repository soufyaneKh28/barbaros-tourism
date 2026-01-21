'use client'

import { useState } from 'react'
import { markMessageAsReadAction, deleteMessageAction } from '@/app/actions/messages'
import { useRouter } from 'next/navigation'
import { Mail, MailOpen, Trash2 } from 'lucide-react'

interface MessageActionsProps {
    message: any
}

export default function MessageActions({ message }: MessageActionsProps) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleToggleRead() {
        setLoading(true)
        await markMessageAsReadAction(message.id, !message.is_read)
        setLoading(false)
        router.refresh()
    }

    async function handleDelete() {
        if (!confirm('Are you sure you want to delete this message?')) {
            return
        }

        setLoading(true)
        await deleteMessageAction(message.id)
        setLoading(false)
        router.refresh()
    }

    return (
        <div className="flex gap-2">
            <button
                onClick={handleToggleRead}
                disabled={loading}
                className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition disabled:opacity-50"
                title={message.is_read ? 'Mark as unread' : 'Mark as read'}
            >
                {message.is_read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
            </button>
            <button
                onClick={handleDelete}
                disabled={loading}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                title="Delete message"
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}
