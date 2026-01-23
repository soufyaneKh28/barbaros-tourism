import { getTrips } from '@/lib/services/trips'
import TripsList from '@/components/portal/TripsList'

export const dynamic = 'force-dynamic';

export default async function TripsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    let trips = []
    try {
        trips = await getTrips()
    } catch (e) {
        console.error('Failed to fetch trips', e)
    }

    // Default to card view for trips is handled inside TripsList, or we can make it props controlled if needed.
    // The previous implementation was grid only.

    return <TripsList trips={trips} locale={locale} />
}
