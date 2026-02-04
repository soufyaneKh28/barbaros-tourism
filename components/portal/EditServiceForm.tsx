'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateServiceAction } from '@/app/actions/services'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import ImageUpload from '@/components/portal/ImageUpload'
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext'
import GlobalLanguageSwitcher from '@/components/portal/GlobalLanguageSwitcher'

interface EditServiceFormProps {
    service: any
}

export default function EditServiceForm({ service }: EditServiceFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [coverImage, setCoverImage] = useState(service.cover_image || '')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const result = await updateServiceAction(service.id, formData)

        if (result.error) {
            alert(result.error)
            setLoading(false)
        } else {
            router.push('../../services')
            router.refresh()
        }
    }

    return (
        <AdminLanguageProvider>
            <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
                <h2 className="text-2xl font-bold mb-6 font-cabinet">Edit Service</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <GlobalLanguageSwitcher />
                    <MultiLangInput
                        name="service_name"
                        label="Service Name (الخدمة اللوجستية)"
                        defaultValue={service.service_name}
                        required
                    />

                    <MultiLangTextarea
                        name="service_details"
                        label="Service Details (تفاصيل الخدمة)"
                        defaultValue={service.service_details}
                        required
                        rows={4}
                    />

                    <MultiLangInput
                        name="cta_text"
                        label="CTA Button Text (نص الزر)"
                        defaultValue={service.cta_text}
                    />

                    <div>
                        <label htmlFor="cta_link" className="block text-sm font-medium text-gray-700 mb-1">
                            CTA Link (Ex: /contact-us or https://...)
                        </label>
                        <input
                            type="text"
                            id="cta_link"
                            name="cta_link"
                            defaultValue={service.cta_link}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent dir-ltr"
                            placeholder="/en/contact-us"
                        />
                    </div>

                    <div>
                        <ImageUpload
                            bucket="service-images"
                            onUploadComplete={setCoverImage}
                            currentImage={service.cover_image}
                            label="Cover Image"
                        />
                        <input type="hidden" name="cover_image" value={coverImage} />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="is_active"
                            name="is_active"
                            defaultChecked={service.is_active}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                            Active
                        </label>
                    </div>

                    {/* Hot Deal Section */}
                    <div className="border-t pt-6 mt-6">
                        <h3 className="text-lg font-bold mb-4 font-cabinet text-gray-900">Hot Deal Settings</h3>

                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="is_hot_deal"
                                    name="is_hot_deal"
                                    defaultChecked={service.is_hot_deal}
                                    className="w-4 h-4 text-secondary border-gray-300 rounded focus:ring-secondary"
                                />
                                <label htmlFor="is_hot_deal" className="ml-2 block text-sm text-gray-900 font-medium">
                                    Mark as Hot Deal
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="hotDealStartDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        Hot Deal Start Date
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="hotDealStartDate"
                                        name="hotDealStartDate"
                                        defaultValue={service.hot_deal_start_date ? new Date(service.hot_deal_start_date).toISOString().slice(0, 16) : ''}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="hotDealEndDate" className="block text-sm font-medium text-gray-700 mb-1">
                                        Hot Deal End Date (Optional)
                                    </label>
                                    <input
                                        type="datetime-local"
                                        id="hotDealEndDate"
                                        name="hotDealEndDate"
                                        defaultValue={service.hot_deal_end_date ? new Date(service.hot_deal_end_date).toISOString().slice(0, 16) : ''}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="hotDealPriority" className="block text-sm font-medium text-gray-700 mb-1">
                                    Priority (lower number = higher priority)
                                </label>
                                <input
                                    type="number"
                                    id="hotDealPriority"
                                    name="hotDealPriority"
                                    defaultValue={service.hot_deal_priority || 999}
                                    min={1}
                                    max={9999}
                                    className="w-full md:w-48 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <p className="mt-1 text-xs text-gray-500">Lower numbers appear first in the Hot Deals section</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition disabled:opacity-50 font-medium"
                        >
                            {loading ? 'Updating...' : 'Update Service'}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </AdminLanguageProvider>
    )
}

