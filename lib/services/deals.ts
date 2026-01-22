import { getHotDeals } from './trips'
import { getHotDealServices } from './services'

export interface HotDealItem {
    id: string
    title: string
    slug: string
    description: string
    main_image?: string
    cover_image?: string
    price?: number
    type: 'trip' | 'service'
    category?: any
    trip_type?: string
    service_name?: string
    hot_deal_priority?: number
}

export async function getCombinedHotDeals(locale: string = 'en'): Promise<HotDealItem[]> {
    try {
        // Fetch both trips and services hot deals in parallel
        const [trips, services] = await Promise.all([
            getHotDeals(locale),
            getHotDealServices(locale)
        ])

        // Transform trips to unified format
        const tripDeals: HotDealItem[] = trips.map(trip => ({
            ...trip,
            type: 'trip' as const,
            title: trip.title,
            main_image: trip.main_image
        }))

        // Transform services to unified format
        const serviceDeals: HotDealItem[] = services.map(service => ({
            ...service,
            type: 'service' as const,
            title: service.service_name,
            description: service.service_details || '',
            main_image: service.cover_image
        }))

        // Combine and sort by priority
        const combined = [...tripDeals, ...serviceDeals]
        combined.sort((a, b) => {
            const priorityA = a.hot_deal_priority ?? 999
            const priorityB = b.hot_deal_priority ?? 999
            return priorityA - priorityB
        })

        return combined
    } catch (error) {
        console.error('Error fetching combined hot deals:', error)
        return []
    }
}
