'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutGrid, LayoutList } from 'lucide-react'
import ImmigrationServiceActions from '@/components/portal/ImmigrationServiceActions'

interface ImmigrationServicesListProps {
    services: any[]
}

export default function ImmigrationServicesList({ services }: ImmigrationServicesListProps) {
    const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

    return (
        <div className="max-w-7xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className="text-2xl font-bold font-cabinet text-primary">Immigration Services</h2>

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
                        href="./immigration-services/new"
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition font-medium whitespace-nowrap"
                    >
                        + Add New Service
                    </Link>
                </div>
            </div>

            {services.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>No immigration services yet. Create your first service!</p>
                </div>
            ) : (
                <>
                    {viewMode === 'table' ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Service Name
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Category
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
                                    {services.map((service) => (
                                        <tr key={service.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {service.main_image && (
                                                        <img
                                                            src={service.main_image}
                                                            alt={service.title}
                                                            className="w-10 h-10 rounded object-cover mr-3"
                                                        />
                                                    )}
                                                    <div className="text-sm font-medium text-gray-900">{service.title}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{service.category?.name || '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {service.is_active ? 'Active' : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={`./immigration-services/${service.id}/edit`}
                                                        className="text-primary hover:text-primary-600"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <ImmigrationServiceActions service={service} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div key={service.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="h-48 w-full bg-gray-100 relative">
                                        {service.main_image ? (
                                            <img
                                                src={service.main_image}
                                                alt={service.title}
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
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                            {service.description || 'No description provided.'}
                                        </p>

                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                                            <div className="text-xs text-gray-500 font-medium bg-gray-50 px-2 py-1 rounded">
                                                {service.category?.name || 'No Category'}
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Link
                                                    href={`./immigration-services/${service.id}/edit`}
                                                    className="text-sm font-medium text-primary hover:text-primary-700"
                                                >
                                                    Edit
                                                </Link>
                                                <ImmigrationServiceActions service={service} />
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
