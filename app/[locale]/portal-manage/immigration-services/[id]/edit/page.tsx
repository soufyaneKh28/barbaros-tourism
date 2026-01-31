import { getImmigrationServiceById, getImmigrationCategories } from '@/lib/services/immigration'
import ImmigrationServiceForm from '@/components/portal/ImmigrationServiceForm'
import { notFound } from 'next/navigation'

export default async function EditImmigrationServicePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const [service, categories] = await Promise.all([
        getImmigrationServiceById(id, 'en'),
        getImmigrationCategories('en')
    ])

    if (!service) {
        notFound()
    }

    return <ImmigrationServiceForm service={service} categories={categories} />
}
