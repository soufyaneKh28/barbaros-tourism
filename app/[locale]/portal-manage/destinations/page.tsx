import { getDestinations } from '@/lib/services/destinations'
import Link from 'next/link'
import { Plus, Search, Edit2, Trash2, MapPin, Compass } from 'lucide-react'
import DestinationActions from '@/components/portal/DestinationActions'

export default async function DestinationsAdminPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    let destinations = []
    try {
        destinations = await getDestinations()
    } catch (e) {
        console.error('Failed to fetch destinations', e)
    }

    return (
        <div className="space-y-6 font-satoshi">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-primary font-cabinet">
                        Manage Destinations
                    </h2>
                    <p className="text-gray-600 mt-1">Add and manage travel destinations</p>
                </div>
                <Link
                    href={`/${locale}/portal-manage/destinations/new`}
                    className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl hover:bg-secondary/90 transition-all shadow-sm font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add New Destination
                </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search destinations..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                />
            </div>

            {/* Destinations Grid */}
            {destinations.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                    <div className="w-20 h-20 bg-secondary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Compass className="w-10 h-10 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 font-cabinet">No destinations yet</h3>
                    <p className="text-gray-600 mb-6">Start by adding your first destination</p>
                    <Link
                        href={`/${locale}/portal-manage/destinations/new`}
                        className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl hover:bg-secondary/90 transition-all font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Create First Destination
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {destinations.map((dest: any) => (
                        <div
                            key={dest.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                        >
                            {/* Destination Image */}
                            <div className="relative h-64 bg-gray-100 overflow-hidden">
                                {dest.image_url ? (
                                    <img
                                        src={dest.image_url}
                                        alt={dest.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <MapPin className="w-16 h-16 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                    <h3 className="text-2xl font-bold mb-1 font-cabinet">
                                        {dest.name}
                                    </h3>
                                    <p className="text-white/80 text-sm font-medium tracking-wide uppercase">{dest.slug}</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="p-4 bg-gray-50 flex items-center justify-end gap-2 border-t border-gray-100">
                                <Link
                                    href={`/${locale}/portal-manage/destinations/${dest.id}/edit`}
                                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-primary hover:bg-white hover:shadow-sm rounded-lg transition-all font-medium text-sm"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </Link>
                                <DestinationActions destinationId={dest.id} destinationName={dest.name} locale={locale} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
