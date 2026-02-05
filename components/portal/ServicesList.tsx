'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutGrid, LayoutList, GripVertical, Clock } from 'lucide-react'
import ServiceActions from '@/components/portal/ServiceActions'
import { updateServiceOrderAction, toggleServiceComingSoonAction } from '@/app/actions/services'
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

interface ServicesListProps {
    services: any[]
}

function SortableRow({ service, onToggleComingSoon }: { service: any, onToggleComingSoon: (id: string, value: boolean) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: service.id })

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
                    {service.cover_image && (
                        <img
                            src={service.cover_image}
                            alt={service.service_name}
                            className="w-10 h-10 rounded object-cover mr-3"
                        />
                    )}
                    <div className="text-sm font-medium text-gray-900">{service.service_name}</div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{service.cta_text || '-'}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {service.is_active ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => onToggleComingSoon(service.id, !service.is_coming_soon)}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors text-xs font-medium border ${service.is_coming_soon
                                ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                                : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                            }`}
                        title={service.is_coming_soon ? "Mark as Active" : "Mark as Coming Soon"}
                    >
                        <Clock className={`w-3.5 h-3.5 ${service.is_coming_soon ? 'fill-current' : ''}`} />
                        {service.is_coming_soon ? 'Coming Soon' : 'Active'}
                    </button>
                    <div className="w-px h-4 bg-gray-200" />
                    <Link
                        href={`./services/${service.id}/edit`}
                        className="text-primary hover:text-primary-600"
                    >
                        Edit
                    </Link>
                    <ServiceActions service={service} />
                </div>
            </td>
        </tr>
    )
}

export default function ServicesList({ services: initialServices }: ServicesListProps) {
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
    const [services, setServices] = useState(initialServices)
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
            const oldIndex = services.findIndex((s) => s.id === active.id)
            const newIndex = services.findIndex((s) => s.id === over.id)

            const newServices = arrayMove(services, oldIndex, newIndex)
            setServices(newServices)

            // Update display_order for all affected services
            setIsUpdating(true)
            try {
                await Promise.all(
                    newServices.map((service, index) =>
                        updateServiceOrderAction(service.id, index)
                    )
                )
            } catch (error) {
                console.error('Error updating order:', error)
                // Revert on error
                setServices(services)
            } finally {
                setIsUpdating(false)
            }
        }
    }

    async function handleToggleComingSoon(id: string, value: boolean) {
        // Optimistically update the UI immediately
        setServices(prevServices =>
            prevServices.map(s =>
                s.id === id ? { ...s, is_coming_soon: value } : s
            )
        );

        try {
            const result = await toggleServiceComingSoonAction(id, value);
            if (result.error) {
                // Revert on error
                setServices(prevServices =>
                    prevServices.map(s =>
                        s.id === id ? { ...s, is_coming_soon: !value } : s
                    )
                );
                alert("Failed to update service status: " + result.error);
            }
        } catch (error) {
            // Revert on error
            setServices(prevServices =>
                prevServices.map(s =>
                    s.id === id ? { ...s, is_coming_soon: !value } : s
                )
            );
            console.error(error);
            alert("Failed to update service status");
        }
    }

    return (
        <div className="max-w-7xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold font-cabinet text-primary">Services</h2>

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
                        href="./services/new"
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition font-medium whitespace-nowrap"
                    >
                        + Add New Service
                    </Link>
                </div>
            </div>

            {isUpdating && (
                <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm">
                    Updating order...
                </div>
            )}

            {services.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>No services yet. Create your first service!</p>
                </div>
            ) : (
                <>
                    {viewMode === 'table' ? (
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Service Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                CTA Text
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <SortableContext
                                            items={services.map(s => s.id)}
                                            strategy={verticalListSortingStrategy}
                                        >
                                            {services.map((service) => (
                                                <SortableRow key={service.id} service={service} onToggleComingSoon={handleToggleComingSoon} />
                                            ))}
                                        </SortableContext>
                                    </tbody>
                                </table>
                            </DndContext>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div key={service.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-48 w-full bg-gray-100 relative">
                                        {service.cover_image ? (
                                            <img
                                                src={service.cover_image}
                                                alt={service.service_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {service.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold font-cabinet text-primary mb-2 line-clamp-1">
                                            {service.service_name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                            {service.service_details || 'No details provided.'}
                                        </p>

                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => handleToggleComingSoon(service.id, !service.is_coming_soon)}
                                                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors text-xs font-medium border ${service.is_coming_soon
                                                        ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                                                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                                                    }`}
                                                title={service.is_coming_soon ? "Mark as Active" : "Mark as Coming Soon"}
                                            >
                                                <Clock className={`w-3.5 h-3.5 ${service.is_coming_soon ? 'fill-current' : ''}`} />
                                                {service.is_coming_soon ? 'Coming Soon' : 'Active'}
                                            </button>

                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`./services/${service.id}/edit`}
                                                    className="text-sm font-medium text-primary hover:text-primary-700"
                                                >
                                                    Edit
                                                </Link>
                                                <ServiceActions service={service} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
