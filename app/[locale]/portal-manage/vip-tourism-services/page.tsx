import { getAllVipServices } from '@/lib/services/vip-tourism-services'
import VipServicesList from '@/components/portal/VipServicesList'

export const dynamic = 'force-dynamic';

export default async function VipTourismServicesPage() {
    const services = await getAllVipServices('en')

    return <VipServicesList services={services} />
}
