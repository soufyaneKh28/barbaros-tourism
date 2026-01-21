import { getAllServices } from '@/lib/services/services'
import Link from 'next/link'
import ServiceActions from '@/components/portal/ServiceActions'

export default async function ServicesPage() {
    const services = await getAllServices('en')

    return (
        <div className="max-w-7xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-cabinet text-primary">Services</h2>
                <Link
                    href="./services/new"
                    className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition font-medium"
                >
                    + Add New Service
                </Link>
            </div>

            {services.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>No services yet. Create your first service!</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Target Category
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
                                        <div className="text-sm text-gray-900">{service.target_client_category || '-'}</div>
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
                                                href={`./services/${service.id}/edit`}
                                                className="text-primary hover:text-primary-600"
                                            >
                                                Edit
                                            </Link>
                                            <ServiceActions service={service} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
