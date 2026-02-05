'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { LayoutGrid, LayoutList, Trash2, Power, Edit, ExternalLink, GripVertical, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toggleVipServiceStatusAction, deleteVipServiceAction, updateVipServiceOrderAction, toggleVipServiceComingSoonAction } from '@/app/actions/vip-tourism-services'
import { VipTourismService } from '@/lib/types'
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

interface VipServicesListProps {
    services: VipTourismService[]
}

function SortableRow({ service, viewMode, isPending, handleToggleStatus, handleToggleComingSoon, handleDelete }: {
    service: VipTourismService
    viewMode: 'table' | 'cards'
    isPending: boolean
    handleToggleStatus: (id: string) => void
    handleToggleComingSoon: (id: string, value: boolean) => void
    handleDelete: (id: string) => void
}) {
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
        <tr ref={setNodeRef} style={style} className={`bg-white hover:bg-gray-50 ${isDragging ? 'bg-gray-50' : ''}`}>
            <td className="px-6 py-4 whitespace-nowrap w-10">
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
                    {service.image_url && (
                        <img
                            src={service.image_url}
                            alt={typeof service.title === 'string' ? service.title : Object.values(service.title)[0] || ''}
                            className="w-10 h-10 rounded object-cover mr-3"
                        />
                    )}
                    <div className="text-sm font-medium text-gray-900">
                        {typeof service.title === 'string' ? service.title : Object.values(service.title)[0] || 'Untitled'}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex flex-col ">
                    <span className='max-w-[400px] truncate'>{typeof service.cta_text === 'string' ? service.cta_text : Object.values(service.cta_text)[0] || '-'}</span>
                    <span className="text-xs text-gray-400 max-w-[400px] truncate ">{service.cta_link}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {service.is_active ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex gap-2">
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
                    <div className="w-px h-4 bg-gray-200 mx-1" />
                    <Link
                        href={`./vip-tourism-services/${service.id}/edit`}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={() => handleToggleStatus(service.id)}
                        className={`p-1 ${service.is_active ? 'text-amber-600 hover:text-amber-900' : 'text-green-600 hover:text-green-900'}`}
                        title={service.is_active ? 'Deactivate' : 'Activate'}
                        disabled={isPending}
                    >
                        <Power className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete"
                        disabled={isPending}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default function VipServicesList({ services: initialServices }: VipServicesListProps) {
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards')
    const [services, setServices] = useState(initialServices)
    const [isPending, startTransition] = useTransition()
    const [isUpdating, setIsUpdating] = useState(false)
    const router = useRouter()

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
                        updateVipServiceOrderAction(service.id, index)
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

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return
        startTransition(async () => {
            await deleteVipServiceAction(id)
            setServices(services.filter(s => s.id !== id))
        })
    }

    const handleToggleStatus = async (id: string) => {
        startTransition(async () => {
            await toggleVipServiceStatusAction(id)
            router.refresh()
        })
    }

    async function handleToggleComingSoon(id: string, value: boolean) {
        // Optimistically update the UI immediately
        setServices(prevServices =>
            prevServices.map(s =>
                s.id === id ? { ...s, is_coming_soon: value } : s
            )
        );

        try {
            const result = await toggleVipServiceComingSoonAction(id, value);
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
        <div className="max-w-7xl mx-auto bg-white p-4 sm:p-8 shadow rounded-lg font-satoshi overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold font-cabinet text-primary">VIP Tourism Services</h2>

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
                        href="./vip-tourism-services/new"
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
                    <p>No VIP tourism services yet. Create your first service!</p>
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
                                            <th className="w-10 px-6 py-3"></th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Service
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                CTA
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
                                                <SortableRow
                                                    key={service.id}
                                                    service={service}
                                                    viewMode={viewMode}
                                                    isPending={isPending}
                                                    handleToggleStatus={handleToggleStatus}
                                                    handleToggleComingSoon={handleToggleComingSoon}
                                                    handleDelete={handleDelete}
                                                />
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
                                        {service.image_url ? (
                                            <img
                                                src={service.image_url}
                                                alt={typeof service.title === 'string' ? service.title : Object.values(service.title)[0] || ''}
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
                                            {typeof service.title === 'string' ? service.title : Object.values(service.title)[0] || 'Untitled'}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                            {typeof service.description === 'string' ? service.description : Object.values(service.description)[0] || 'No description'}
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

                                            <div className="flex items-center gap-2">
                                                {service.cta_link && (
                                                    <a href={service.cta_link} target="_blank" rel="noopener noreferrer" className="p-1 text-gray-400 hover:text-gray-600" title="Visit Link">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <Link
                                                    href={`./vip-tourism-services/${service.id}/edit`}
                                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleToggleStatus(service.id)}
                                                    className={`p-1 rounded ${service.is_active ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`}
                                                    title={service.is_active ? 'Deactivate' : 'Activate'}
                                                    disabled={isPending}
                                                >
                                                    <Power className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(service.id)}
                                                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                                                    title="Delete"
                                                    disabled={isPending}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
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
