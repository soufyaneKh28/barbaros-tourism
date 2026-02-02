import { getVipServiceByIdRaw } from '@/lib/services/vip-tourism-services'
import VipServiceForm from '@/components/portal/VipServiceForm'
import { notFound } from 'next/navigation'

export default async function EditVipServicePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const service = await getVipServiceByIdRaw(resolvedParams.id)

    if (!service) {
        notFound()
    }

    return (
        <div className="max-w-7xl mx-auto py-8">
            <VipServiceForm initialData={service} isEdit />
        </div>
    )
}
