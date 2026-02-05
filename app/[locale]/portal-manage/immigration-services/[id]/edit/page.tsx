import { getImmigrationServiceById, getImmigrationCategories } from '@/lib/services/immigration'
import ImmigrationServiceForm from '@/components/portal/ImmigrationServiceForm'
import { notFound } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function EditImmigrationServicePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const supabase = await createClient()

    const [service, categories] = await Promise.all([
        getImmigrationServiceById(id, undefined, supabase, true),
        getImmigrationCategories('en')
    ])

    if (!service) {
        notFound()
    }

    return <ImmigrationServiceForm service={service} categories={categories} />
}
