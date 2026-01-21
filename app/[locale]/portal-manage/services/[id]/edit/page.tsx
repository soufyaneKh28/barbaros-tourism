import { notFound } from 'next/navigation'
import { getServiceById } from '@/lib/services/services'
import EditServiceForm from '@/components/portal/EditServiceForm'

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const service = await getServiceById(id)

    if (!service) {
        notFound()
    }

    return <EditServiceForm service={service} />
}
