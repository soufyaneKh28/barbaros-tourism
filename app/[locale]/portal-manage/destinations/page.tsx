import { getDestinations } from '@/lib/services/destinations'
import Link from 'next/link'

export default async function DestinationsAdminPage() {
    let destinations = []
    try {
        destinations = await getDestinations()
    } catch (e) {
        console.error('Failed to fetch destinations', e)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Manage Destinations</h2>
                <Link
                    href="/portal-manage/destinations/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Add New Destination
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {destinations.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">No destinations found.</li>
                    ) : (
                        destinations.map((dest: any) => (
                            <li key={dest.id}>
                                <div className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        {dest.image_url && (
                                            <img
                                                src={dest.image_url}
                                                alt=""
                                                className="h-10 w-10 rounded object-cover mr-4"
                                            />
                                        )}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">{dest.name}</h3>
                                            <p className="text-sm text-gray-500">{dest.slug}</p>
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
