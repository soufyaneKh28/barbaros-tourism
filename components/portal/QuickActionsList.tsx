'use client'

import React from 'react'
import Link from 'next/link'
import { Edit2, Trash2 } from 'lucide-react'
import { deleteQuickAction, updateQuickActionOrderAction } from '@/app/actions/home-quick-actions' // Import update action
import { getLocalized } from '@/lib/utils'
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
    rectSortingStrategy, // Use rectSortingStrategy for grid
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface QuickActionsListProps {
    actions: any[]
}

function SortableCard({ action, handleDelete, isLoading }: {
    action: any
    handleDelete: (id: string) => void
    isLoading: boolean
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: action.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all bg-white group cursor-move ${isDragging ? 'shadow-xl ring-2 ring-primary ring-opacity-50' : ''}`}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-primary/5 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    {action.icon_url && <img src={action.icon_url} alt="" className="w-5 h-5 object-contain" />}
                </div>
                <div className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${action.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {action.is_active ? 'Active' : 'Inactive'}
                </div>
            </div>

            <h3 className="text-base font-bold text-gray-900 mb-1 line-clamp-1">{getLocalized(action.title, 'en')}</h3>
            <p className="text-gray-500 text-xs mb-3 line-clamp-2 min-h-[2.5em]">{getLocalized(action.description, 'en')}</p>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-[10px] text-gray-400">Order: {action.sort_order}</span>
                <div className="flex gap-1" onPointerDown={e => e.stopPropagation()}>
                    <Link
                        href={`./quick-actions/${action.id}/edit`}
                        className="p-1.5 text-primary hover:bg-primary/5 rounded-md transition-colors"
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                        onClick={() => handleDelete(action.id)}
                        disabled={isLoading}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function QuickActionsList({ actions: initialActions }: QuickActionsListProps) {
    const [actions, setActions] = React.useState(initialActions)
    const [isLoading, setIsLoading] = React.useState(false)
    const [isUpdating, setIsUpdating] = React.useState(false)

    // Sync state with props
    React.useEffect(() => {
        setActions(initialActions)
    }, [initialActions])

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = actions.findIndex((a) => a.id === active.id)
            const newIndex = actions.findIndex((a) => a.id === over.id)

            const newActions = arrayMove(actions, oldIndex, newIndex)
            setActions(newActions)

            // Update display_order for all affected actions
            setIsUpdating(true)
            try {
                await Promise.all(
                    newActions.map((action, index) =>
                        updateQuickActionOrderAction(action.id, index)
                    )
                )
            } catch (error) {
                console.error('Error updating order:', error)
                // Revert on error
                setActions(actions)
            } finally {
                setIsUpdating(false)
            }
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this action?')) return

        setIsLoading(true)
        const { error } = await deleteQuickAction(id)
        setIsLoading(false)

        if (error) {
            alert('Error deleting action')
            return
        }

        setActions(actions.filter(a => a.id !== id))
    }

    return (
        <div className="max-w-7xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-cabinet text-primary">Quick Actions</h2>
                <Link
                    href="./quick-actions/new"
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition font-medium"
                >
                    + Add New Action
                </Link>
            </div>

            {isUpdating && (
                <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm">
                    Updating order...
                </div>
            )}

            {actions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>No quick actions found. Create your first one!</p>
                </div>
            ) : (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={actions.map(a => a.id)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {actions.map((action) => (
                                <SortableCard
                                    key={action.id}
                                    action={action}
                                    handleDelete={handleDelete}
                                    isLoading={isLoading}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
            )}
        </div>
    )
}
