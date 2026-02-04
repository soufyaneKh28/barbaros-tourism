import { getAllTrips } from '@/lib/services/trips'
import TripsList from '@/components/portal/TripsList'
import { getLocalized } from '@/lib/utils'

export const dynamic = 'force-dynamic';

export default async function TripsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    let trips = []
    try {
        const rawTrips = await getAllTrips()
        // Transform multi-language fields to strings for display
        trips = rawTrips.map(trip => ({
            ...trip,
            title: getLocalized(trip.title, locale),
            description: getLocalized(trip.description, locale),
        }))
    } catch (e) {
        console.error('Failed to fetch trips', e)
    }

    return <TripsList trips={trips} locale={locale} />
}
