import { getAllImmigrationServices } from '@/lib/services/immigration'
import ImmigrationServicesList from '@/components/portal/ImmigrationServicesList'

export const dynamic = 'force-dynamic';

export default async function ImmigrationServicesPage() {
    const services = await getAllImmigrationServices('en')

    return <ImmigrationServicesList services={services} />
}
