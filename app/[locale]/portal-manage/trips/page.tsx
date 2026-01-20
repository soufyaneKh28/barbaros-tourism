import { getTrips } from '@/lib/services/trips'
import Link from 'next/link'

export default async function TripsPage() {
    let trips = []
    try {
        trips = await getTrips()
    } catch (e) {
        console.error('Failed to fetch trips', e)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Manage Trips</h2>
                <Link
                    href="/portal-manage/trips/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Add New Trip
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {trips.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">No trips found. Start by adding one!</li>
                    ) : (
                        trips.map((trip: any) => (
                            <li key={trip.id}>
                                <div className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        {trip.images?.[0] && (
                                            <img
                                                src={trip.images[0]}
                                                alt=""
                                                className="h-10 w-10 rounded-full object-cover mr-4"
                                            />
                                        )}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">{trip.title}</h3>
                                            <p className="text-sm text-gray-500">{trip.destination?.name} • ${trip.price}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
                                        <button className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}
