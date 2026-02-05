'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { LayoutGrid, LayoutList, Plus, Search, MapPin, Plane, GripVertical } from 'lucide-react'
import TripActions from '@/components/portal/TripActions'
import { updateTripOrderAction } from '@/app/actions/trips'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TripsListProps {
    trips: any[]
    locale: string
}

function SortableRow({ trip }: { trip: any }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: trip.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <tr ref={setNodeRef} style={style} className={isDragging ? 'bg-gray-50' : ''}>
            <td className="px-6 py-4 whitespace-nowrap">
                <button
                    {...attributes}
                    {...listeners}
                    className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 p-1"
                >
                    <GripVertical className="w-5 h-5" />
                </button>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                    {(trip.main_image || trip.images?.[0]) && (
                        <div className="relative w-10 h-10 mr-3">
                            <Image
                                src={`${trip.main_image || trip.images[0]}?v=${trip.updated_at ? new Date(trip.updated_at).getTime() : Date.now()}`}
                                alt={trip.title}
                                fill
                                className="rounded object-cover"
                                unoptimized
                            />
                        </div>
                    )}
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={trip.title}>
                        {trip.title}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {trip.destination?.name || '-'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                {trip.trip_type || '-'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {trip.price ? `$${trip.price}` : null}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex items-center gap-4">
                    <TripActions id={trip.id} initialIsComingSoon={trip.is_coming_soon} />
                </div>
            </td>
        </tr>
    )
}

export default function TripsList({ trips: initialTrips, locale }: TripsListProps) {
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards')
    const [trips, setTrips] = useState(initialTrips)
    const [isUpdating, setIsUpdating] = useState(false)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = trips.findIndex((t) => t.id === active.id)
            const newIndex = trips.findIndex((t) => t.id === over.id)

            const newTrips = arrayMove(trips, oldIndex, newIndex)
            setTrips(newTrips)

            // Update display_order for all affected trips
            setIsUpdating(true)
            try {
                await Promise.all(
                    newTrips.map((trip, index) =>
                        updateTripOrderAction(trip.id, index)
                    )
                )
            } catch (error) {
                console.error('Error updating order:', error)
                // Revert on error
                setTrips(trips)
            } finally {
                setIsUpdating(false)
            }
        }
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

                <div className="flex items-center gap-4">
                    {/* View Toggle */}
                    <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'table'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                            title="Table View"
                        >
                            <LayoutList className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('cards')}
                            className={`p-2 rounded-md transition-all ${viewMode === 'cards'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                            title="Card View"
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </div>

                    <Link
                        href={`/${locale}/portal-manage/trips/new`}
                        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Add New Trip
                    </Link>
                </div>
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

            {isUpdating && (
                <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm">
                    Updating order...
                </div>
            )}

            {/* Content */}
            {trips.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plane className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 font-cabinet">No trips yet</h3>
                    <p className="text-gray-600 mb-6">Start by creating your first tour package</p>
                    <Link
                        href={`/${locale}/portal-manage/trips/new`}
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Create First Trip
                    </Link>
                </div>
            ) : (
                <>
                    {viewMode === 'cards' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trips.map((trip: any) => (
                                <div
                                    key={trip.id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                                >
                                    {/* Trip Image */}
                                    <div className="relative h-56 bg-gray-100 overflow-hidden">
                                        {trip.main_image || trip.images?.[0] ? (
                                            <Image
                                                src={`${trip.main_image || trip.images[0]}?v=${trip.updated_at ? new Date(trip.updated_at).getTime() : Date.now()}`}
                                                alt={trip.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                unoptimized
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
                                            {trip.trip_type && (
                                                <div className="inline-block px-2 py-1 rounded bg-white/20 backdrop-blur-sm text-xs capitalize text-white">
                                                    {trip.trip_type}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Trip Info */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 font-cabinet group-hover:text-primary transition-colors">
                                            {trip.title}
                                        </h3>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-1.5 text-primary">
                                                {trip.price ? (
                                                    <span className="text-lg font-bold">
                                                        ${trip.price}
                                                    </span>
                                                ) : null}
                                            </div>
                                            <TripActions id={trip.id} initialIsComingSoon={trip.is_coming_soon} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">

                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <SortableContext
                                                items={trips.map(t => t.id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {trips.map((trip) => (
                                                    <SortableRow key={trip.id} trip={trip} />
                                                ))}
                                            </SortableContext>
                                        </tbody>
                                    </table>
                                </DndContext>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
