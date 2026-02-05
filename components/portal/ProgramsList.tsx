'use client';

import { Program } from "@/lib/types";
import { type Locale } from "@/i18n";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, LayoutGrid, LayoutList, GripVertical, Clock } from "lucide-react";
import { useState } from "react";
import { deleteProgramAction, updateProgramOrderAction, toggleProgramComingSoonAction } from "@/app/actions/programs";
import { useRouter } from "next/navigation";
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

interface ProgramsListProps {
    programs: Program[];
    locale: Locale;
}

function SortableRow({ program, locale, onDelete, onToggleComingSoon, isDeleting }: {
    program: Program
    locale: Locale
    onDelete: (id: string) => void
    onToggleComingSoon: (id: string, value: boolean) => void
    isDeleting: string | null
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: program.id })

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
                    {program.main_image && (
                        <div className="relative w-10 h-10 mr-3">
                            <Image
                                src={program.main_image}
                                alt={typeof program.title === 'string' ? program.title : program.title[locale] || 'Program'}
                                fill
                                className="rounded object-cover"
                            />
                        </div>
                    )}
                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {typeof program.title === 'string' ? program.title : program.title[locale]}
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="line-clamp-2 max-w-md">
                    {typeof program.description === 'string' ? program.description : program.description[locale]}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => onToggleComingSoon(program.id, !program.is_coming_soon)}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors text-xs font-medium border ${program.is_coming_soon
                            ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                            }`}
                        title={program.is_coming_soon ? "Mark as Active" : "Mark as Coming Soon"}
                    >
                        <Clock className={`w-3.5 h-3.5 ${program.is_coming_soon ? 'fill-current' : ''}`} />
                        {program.is_coming_soon ? 'Coming Soon' : 'Active'}
                    </button>
                    <div className="w-px h-4 bg-gray-200 mx-1" />
                    <Link
                        href={`/${locale}/portal-manage/programs/${program.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                    >
                        <Edit className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={() => onDelete(program.id)}
                        disabled={isDeleting === program.id}
                        className="text-red-600 hover:text-red-900 p-1 disabled:opacity-50"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default function ProgramsList({ programs: initialPrograms, locale }: ProgramsListProps) {
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [programs, setPrograms] = useState(initialPrograms);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const router = useRouter();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = programs.findIndex((p) => p.id === active.id)
            const newIndex = programs.findIndex((p) => p.id === over.id)

            const newPrograms = arrayMove(programs, oldIndex, newIndex)
            setPrograms(newPrograms)

            // Update display_order for all affected programs
            setIsUpdating(true)
            try {
                await Promise.all(
                    newPrograms.map((program, index) =>
                        updateProgramOrderAction(program.id, index)
                    )
                )
            } catch (error) {
                console.error('Error updating order:', error)
                // Revert on error
                setPrograms(programs)
            } finally {
                setIsUpdating(false)
            }
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this program?")) return;

        setIsDeleting(id);
        const result = await deleteProgramAction(id);

        if (result.success) {
            router.refresh();
        } else {
            alert("Failed to delete program");
        }
        setIsDeleting(null);
    }

    async function handleToggleComingSoon(id: string, value: boolean) {
        // Optimistically update the UI immediately
        setPrograms(prevPrograms =>
            prevPrograms.map(p =>
                p.id === id ? { ...p, is_coming_soon: value } : p
            )
        );

        try {
            const result = await toggleProgramComingSoonAction(id, value);
            if (result.error) {
                // Revert on error
                setPrograms(prevPrograms =>
                    prevPrograms.map(p =>
                        p.id === id ? { ...p, is_coming_soon: !value } : p
                    )
                );
                alert("Failed to update program status: " + result.error);
            }
        } catch (error) {
            // Revert on error
            setPrograms(prevPrograms =>
                prevPrograms.map(p =>
                    p.id === id ? { ...p, is_coming_soon: !value } : p
                )
            );
            console.error(error);
            alert("Failed to update program status");
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold font-cabinet text-gray-900">Programs</h1>

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
                        href={`/${locale}/portal-manage/programs/new`}
                        className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                        Add New Program
                    </Link>
                </div>
            </div>

            {isUpdating && (
                <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm">
                    Updating order...
                </div>
            )}

            {programs.length === 0 ? (
                <div className="py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    No programs found. Create your first one!
                </div>
            ) : (
                <>
                    {viewMode === 'cards' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {programs.map((program) => (
                                <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
                                    <div className="relative h-48 bg-gray-100">
                                        {program.main_image ? (
                                            <Image
                                                src={program.main_image}
                                                alt={typeof program.title === 'string' ? program.title : program.title[locale] || 'Program'}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                                            {typeof program.title === 'string' ? program.title : program.title[locale]}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                            {typeof program.description === 'string' ? program.description : program.description[locale]}
                                        </p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <button
                                                onClick={() => handleToggleComingSoon(program.id, !program.is_coming_soon)}
                                                className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors text-xs font-medium border ${program.is_coming_soon
                                                    ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                                                    : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                                                    }`}
                                                title={program.is_coming_soon ? "Mark as Active" : "Mark as Coming Soon"}
                                            >
                                                <Clock className={`w-3.5 h-3.5 ${program.is_coming_soon ? 'fill-current' : ''}`} />
                                                {program.is_coming_soon ? 'Coming Soon' : 'Active'}
                                            </button>
                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`/${locale}/portal-manage/programs/${program.id}`}
                                                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(program.id)}
                                                    disabled={isDeleting === program.id}
                                                    className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    {isDeleting === program.id ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
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
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <SortableContext
                                                items={programs.map(p => p.id)}
                                                strategy={verticalListSortingStrategy}
                                            >
                                                {programs.map((program) => (
                                                    <SortableRow
                                                        key={program.id}
                                                        program={program}
                                                        locale={locale}
                                                        onDelete={handleDelete}
                                                        onToggleComingSoon={handleToggleComingSoon}
                                                        isDeleting={isDeleting}
                                                    />
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
    );
}
