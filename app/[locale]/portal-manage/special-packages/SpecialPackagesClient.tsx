'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { deleteSpecialPackageAction, updateSpecialPackageOrderAction, toggleSpecialPackageComingSoonAction } from '@/app/actions/specialPackages';
import { Pencil, Trash2, Plus, GripVertical, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
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

interface SpecialPackage {
    id: string;
    slug: string;
    package_name: string;
    target_categories: string;
    duration_nights: string;
    main_image: string;
    is_coming_soon?: boolean;
}

interface Props {
    initialPackages: SpecialPackage[];
}

function SortableRow({ pkg, locale, onDelete, onToggleComingSoon, isDeleting, t }: {
    pkg: SpecialPackage
    locale: string
    onDelete: (id: string) => void
    onToggleComingSoon: (id: string, value: boolean) => void
    isDeleting: string | null
    t: any
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: pkg.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <tr ref={setNodeRef} style={style} className={`hover:bg-gray-50 ${isDragging ? 'bg-gray-50' : ''}`}>
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
                    <div className="h-10 w-10 flex-shrink-0">
                        <img
                            className="h-10 w-10 rounded-lg object-cover"
                            src={pkg.main_image}
                            alt={pkg.package_name}
                        />
                    </div>
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{pkg.package_name}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                <div className="text-sm text-gray-900">{pkg.target_categories}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{pkg.duration_nights}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{pkg.slug}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end gap-2">
                    <button
                        onClick={() => onToggleComingSoon(pkg.id, !pkg.is_coming_soon)}
                        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors text-xs font-medium border ${pkg.is_coming_soon
                                ? 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                                : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                            }`}
                        title={pkg.is_coming_soon ? "Mark as Active" : "Mark as Coming Soon"}
                    >
                        <Clock className={`w-3.5 h-3.5 ${pkg.is_coming_soon ? 'fill-current' : ''}`} />
                        {pkg.is_coming_soon ? 'Coming Soon' : 'Active'}
                    </button>
                    <Link
                        href={`/${locale}/portal-manage/special-packages/${pkg.id}/edit`}
                        className="text-primary hover:text-secondary inline-flex items-center gap-1"
                    >
                        <Pencil className="w-4 h-4" />
                        {t.portalAdmin.specialPackages.edit}
                    </Link>
                    <button
                        onClick={() => onDelete(pkg.id)}
                        disabled={isDeleting === pkg.id}
                        className="text-red-600 hover:text-red-900 inline-flex items-center gap-1 disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" />
                        {isDeleting === pkg.id ? t.portalAdmin.specialPackages.deleting : t.portalAdmin.specialPackages.delete}
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default function SpecialPackagesClient({ initialPackages }: Props) {
    const router = useRouter();
    const params = useParams();
    const locale = (params?.locale as string) || 'en';
    const { t } = useLanguage();
    const [packages, setPackages] = useState<SpecialPackage[]>(initialPackages);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = packages.findIndex((p) => p.id === active.id)
            const newIndex = packages.findIndex((p) => p.id === over.id)

            const newPackages = arrayMove(packages, oldIndex, newIndex)
            setPackages(newPackages)

            // Update display_order for all affected packages
            setIsUpdating(true)
            try {
                await Promise.all(
                    newPackages.map((pkg, index) =>
                        updateSpecialPackageOrderAction(pkg.id, index)
                    )
                )
            } catch (error) {
                console.error('Error updating order:', error)
                // Revert on error
                setPackages(packages)
            } finally {
                setIsUpdating(false)
            }
        }
    }

    async function handleDelete(id: string) {
        if (!confirm(t.portalAdmin.specialPackages.deleteConfirm)) {
            return;
        }

        setDeleteId(id);
        try {
            const result = await deleteSpecialPackageAction(id);
            if (result.success) {
                setPackages(packages.filter(pkg => pkg.id !== id));
                router.refresh();
            } else {
                alert('Error deleting package: ' + result.error);
            }
        } catch (error) {
            console.error('Error deleting package:', error);
            alert('Error deleting package');
        } finally {
            setDeleteId(null);
        }
    }

    async function handleToggleComingSoon(id: string, value: boolean) {
        // Optimistically update the UI immediately
        setPackages(prevPackages =>
            prevPackages.map(p =>
                p.id === id ? { ...p, is_coming_soon: value } : p
            )
        );

        try {
            const result = await toggleSpecialPackageComingSoonAction(id, value);
            if (!result.success) {
                // Revert on error
                setPackages(prevPackages =>
                    prevPackages.map(p =>
                        p.id === id ? { ...p, is_coming_soon: !value } : p
                    )
                );
                alert("Failed to update package status: " + result.error);
            }
        } catch (error) {
            // Revert on error
            setPackages(prevPackages =>
                prevPackages.map(p =>
                    p.id === id ? { ...p, is_coming_soon: !value } : p
                )
            );
            console.error(error);
            alert("Failed to update package status");
        }
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-cabinet text-primary">
                    {t.portalAdmin.specialPackages.title}
                </h1>
                <Link
                    href={`/${locale}/portal-manage/special-packages/new`}
                    className="flex items-center gap-2 bg-secondary hover:bg-primary text-white px-6 py-3 rounded-lg font-bold transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    {t.portalAdmin.specialPackages.addNew}
                </Link>
            </div>

            {isUpdating && (
                <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg text-sm">
                    Updating order...
                </div>
            )}

            {packages.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                    <p className="text-gray-500 text-lg mb-4">{t.portalAdmin.specialPackages.noPackages}</p>
                    <Link
                        href={`/${locale}/portal-manage/special-packages/new`}
                        className="inline-flex items-center gap-2 bg-secondary hover:bg-primary text-white px-6 py-3 rounded-lg font-bold transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        {t.portalAdmin.specialPackages.createFirst}
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden">
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
                                        {t.portalAdmin.specialPackages.table.packageName}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t.portalAdmin.specialPackages.table.targetCategories}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t.portalAdmin.specialPackages.table.duration}
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t.portalAdmin.specialPackages.table.slug}
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {t.portalAdmin.specialPackages.table.actions}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <SortableContext
                                    items={packages.map(p => p.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {packages.map((pkg) => (
                                        <SortableRow
                                            key={pkg.id}
                                            pkg={pkg}
                                            locale={locale}
                                            onDelete={handleDelete}
                                            onToggleComingSoon={handleToggleComingSoon}
                                            isDeleting={deleteId}
                                            t={t}
                                        />
                                    ))}
                                </SortableContext>
                            </tbody>
                        </table>
                    </DndContext>
                </div>
            )}
        </div>
    );
}
