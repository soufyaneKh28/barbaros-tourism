import { getAllImmigrationServices } from '@/lib/services/immigration'
import ImmigrationServicesList from '@/components/portal/ImmigrationServicesList'

import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic';

export default async function ImmigrationServicesPage() {
    const supabase = await createClient()
    const services = await getAllImmigrationServices('en', supabase)

    return <ImmigrationServicesList services={services} />
}
