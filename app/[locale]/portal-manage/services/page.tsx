import { getAllServices } from '@/lib/services/services'
import ServicesList from '@/components/portal/ServicesList'

export default async function ServicesPage() {
    const services = await getAllServices('en')

    return <ServicesList services={services} />
}
