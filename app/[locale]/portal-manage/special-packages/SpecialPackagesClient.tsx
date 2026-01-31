'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { deleteSpecialPackageAction } from '@/app/actions/specialPackages';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

interface SpecialPackage {
    id: string;
    slug: string;
    package_name: string;
    target_categories: string;
    duration_nights: string;
    main_image: string;
}

interface Props {
    initialPackages: SpecialPackage[];
}

export default function SpecialPackagesClient({ initialPackages }: Props) {
    const router = useRouter();
    const params = useParams();
    const locale = (params?.locale as string) || 'en';
    const { t } = useLanguage();
    const [packages, setPackages] = useState<SpecialPackage[]>(initialPackages);
    const [deleteId, setDeleteId] = useState<string | null>(null);

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
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
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
                            {packages.map((pkg) => (
                                <tr key={pkg.id} className="hover:bg-gray-50">
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
                                        <Link
                                            href={`/${locale}/portal-manage/special-packages/${pkg.id}/edit`}
                                            className="text-primary hover:text-secondary mr-4 inline-flex items-center gap-1"
                                        >
                                            <Pencil className="w-4 h-4" />
                                            {t.portalAdmin.specialPackages.edit}
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(pkg.id)}
                                            disabled={deleteId === pkg.id}
                                            className="text-red-600 hover:text-red-900 inline-flex items-center gap-1 disabled:opacity-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            {deleteId === pkg.id ? t.portalAdmin.specialPackages.deleting : t.portalAdmin.specialPackages.delete}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
