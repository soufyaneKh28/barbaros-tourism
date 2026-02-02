'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { LayoutGrid, LayoutList, Trash2, Power, Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toggleMedicalTourismSectionStatusAction, deleteMedicalTourismSectionAction } from '@/app/actions/medical-tourism'
import { MedicalTourismSection } from '@/lib/types'

interface MedicalTourismSectionsListProps {
    sections: MedicalTourismSection[]
}

export default function MedicalTourismSectionsList({ sections }: MedicalTourismSectionsListProps) {
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this section?')) return
        startTransition(async () => {
            await deleteMedicalTourismSectionAction(id)
        })
    }

    const handleToggleStatus = async (id: string) => {
        startTransition(async () => {
            await toggleMedicalTourismSectionStatusAction(id)
        })
    }

    return (
        <div className="max-w-7xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold font-cabinet text-primary">Medical Tourism Sections</h2>

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
                        href="./medical-tourism/new"
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition font-medium whitespace-nowrap"
                    >
                        + Add New Section
                    </Link>
                </div>
            </div>

            {sections.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>No medical tourism sections yet. Create your first section!</p>
                </div>
            ) : (
                <>
                    {viewMode === 'table' ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order
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
                                    {sections.map((section) => (
                                        <tr key={section.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {section.image_url && (
                                                        <img
                                                            src={section.image_url}
                                                            alt={typeof section.title === 'string' ? section.title : Object.values(section.title)[0] || ''}
                                                            className="w-10 h-10 rounded object-cover mr-3"
                                                        />
                                                    )}
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {typeof section.title === 'string' ? section.title : Object.values(section.title)[0] || 'Untitled'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {section.display_order}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${section.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {section.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`./medical-tourism/${section.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-900 p-1"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleToggleStatus(section.id)}
                                                        className={`p-1 ${section.is_active ? 'text-amber-600 hover:text-amber-900' : 'text-green-600 hover:text-green-900'}`}
                                                        title={section.is_active ? 'Deactivate' : 'Activate'}
                                                        disabled={isPending}
                                                    >
                                                        <Power className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(section.id)}
                                                        className="text-red-600 hover:text-red-900 p-1"
                                                        title="Delete"
                                                        disabled={isPending}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sections.map((section) => (
                                <div key={section.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-48 w-full bg-gray-100 relative">
                                        {section.image_url ? (
                                            <img
                                                src={section.image_url}
                                                alt={typeof section.title === 'string' ? section.title : Object.values(section.title)[0] || ''}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                        <div className="absolute top-3 right-3">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${section.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {section.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold font-cabinet text-primary mb-2 line-clamp-1">
                                            {typeof section.title === 'string' ? section.title : Object.values(section.title)[0] || 'Untitled'}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                            {typeof section.description === 'string' ? section.description : Object.values(section.description)[0] || 'No description'}
                                        </p>

                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                            <div className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded">
                                                Order: {section.display_order}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Link
                                                    href={`./medical-tourism/${section.id}/edit`}
                                                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleToggleStatus(section.id)}
                                                    className={`p-1 rounded ${section.is_active ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'}`}
                                                    title={section.is_active ? 'Deactivate' : 'Activate'}
                                                    disabled={isPending}
                                                >
                                                    <Power className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(section.id)}
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
