'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createSpecialPackageAction } from '@/app/actions/specialPackages';
import MultiLangInput from '@/components/portal/MultiLangInput';
import MultiLangTextarea from '@/components/portal/MultiLangTextarea';
import ImageUpload from '@/components/portal/ImageUpload';
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext';
import { useLanguage } from '@/hooks/use-language';
import GlobalLanguageSwitcher from '@/components/portal/GlobalLanguageSwitcher';

export default function NewSpecialPackagePage() {
    const router = useRouter();
    const params = useParams();
    const locale = (params?.locale as string) || 'en';
    const { t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [mainImageUrl, setMainImageUrl] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const formData = new FormData(e.currentTarget);
            const result = await createSpecialPackageAction(formData);

            if (result.success) {
                router.push(`/${locale}/portal-manage/special-packages`);
            } else {
                setError(result.error || 'Failed to create package');
            }
        } catch (err) {
            setError('An unexpected error occurred');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <AdminLanguageProvider>
            <div className="p-8 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-cabinet text-primary">
                        {t.portalAdmin.specialPackages.addNewTitle}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {t.portalAdmin.specialPackages.addNewSubtitle}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                    <GlobalLanguageSwitcher />

                    {/* Slug */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slug (URL-friendly identifier)
                            <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            name="slug"
                            required
                            placeholder="luxury-istanbul-package"
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        />
                        <p className="text-sm text-gray-500 mt-1">Use lowercase letters, numbers, and hyphens only</p>
                    </div>

                    {/* Package Name */}
                    <MultiLangInput
                        name="package_name"
                        label="Package Name (اسم الباقة المقترح)"
                        required
                        placeholder="Enter package name"
                    />

                    {/* Target Categories */}
                    <MultiLangInput
                        name="target_categories"
                        label="Target Categories (الفئات المستفيدة)"
                        placeholder="e.g., Families, Couples, Luxury Travelers"
                    />

                    {/* Duration */}
                    <MultiLangInput
                        name="duration_nights"
                        label="Duration in Nights (المدة المقترحة)"
                        placeholder="e.g., 5 Nights"
                    />

                    {/* Daily Itinerary */}
                    <MultiLangTextarea
                        name="daily_itinerary"
                        label="Detailed Daily Itinerary (البرنامج اليومي التفصيلي)"
                        placeholder="Describe the daily activities and schedule"
                        rows={6}
                    />

                    {/* Transportation */}
                    <MultiLangTextarea
                        name="transportation"
                        label="Transportation (وسائل المواصلات)"
                        placeholder="Describe transportation methods included"
                        rows={4}
                    />

                    {/* What's Included */}
                    <MultiLangTextarea
                        name="includes"
                        label="What's Included (ما تشمله الباقة)"
                        placeholder="List what's included in the package"
                        rows={5}
                    />

                    {/* What's Not Included */}
                    <MultiLangTextarea
                        name="excludes"
                        label="What's Not Included (ما لا تشمله الباقة)"
                        placeholder="List what's not included in the package"
                        rows={5}
                    />

                    {/* Main Image */}
                    <div>
                        <ImageUpload
                            bucket="service-images"
                            onUploadComplete={(url) => setMainImageUrl(url)}
                            label="Main Package Image"
                            required
                        />
                        <input type="hidden" name="main_image" value={mainImageUrl} />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-secondary hover:bg-primary text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? t.portalAdmin.specialPackages.creating : t.portalAdmin.specialPackages.createPackage}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            {t.portalAdmin.specialPackages.cancel}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLanguageProvider>
    );
}
