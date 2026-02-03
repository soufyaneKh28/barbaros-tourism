import { getQuickActionById } from '@/lib/services/home-quick-actions'
import QuickActionForm from '@/components/portal/QuickActionForm'
import { notFound } from 'next/navigation'

export default async function EditQuickActionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const action = await getQuickActionById(id)

    if (!action) {
        notFound()
    }

    return <QuickActionForm initialData={action} isEditing />
}
