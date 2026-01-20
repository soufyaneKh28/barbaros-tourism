import { getTrips } from '@/lib/services/trips'
import Link from 'next/link'
import { Plus, Search, Edit2, Trash2, MapPin, DollarSign, Calendar, Plane } from 'lucide-react'

export default async function TripsPage() {
    let trips = []
    try {
        trips = await getTrips()
    } catch (e) {
        console.error('Failed to fetch trips', e)
    }

    return (
        <div className="space-y-6 font-satoshi">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-primary font-cabinet">
                        Manage Trips
                    </h2>
                    <p className="text-gray-600 mt-1">Create and manage your tour packages</p>
                </div>
                <Link
                    href="/portal-manage/trips/new"
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add New Trip
                </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search trips..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
            </div>

            {/* Trips Grid */}
            {trips.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plane className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 font-cabinet">No trips yet</h3>
                    <p className="text-gray-600 mb-6">Start by creating your first tour package</p>
                    <Link
                        href="/portal-manage/trips/new"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Create First Trip
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trips.map((trip: any) => (
                        <div
                            key={trip.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                        >
                            {/* Trip Image */}
                            <div className="relative h-56 bg-gray-100 overflow-hidden">
                                {trip.images?.[0] ? (
                                    <img
                                        src={trip.images[0]}
                                        alt={trip.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <Plane className="w-16 h-16 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <div className="flex items-center gap-2 text-sm font-medium mb-1 opacity-90">
                                        <MapPin className="w-4 h-4" />
                                        <span>{trip.destination?.name || 'No destination'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Trip Info */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 font-cabinet group-hover:text-primary transition-colors">
                                    {trip.title}
                                </h3>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-1.5 text-primary">
                                        <span className="text-lg font-bold">${trip.price}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}


