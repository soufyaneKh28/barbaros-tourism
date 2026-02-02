'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/portal/ImageUpload'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import { createVipServiceAction, updateVipServiceAction } from '@/app/actions/vip-tourism-services'
import { VipTourismService } from '@/lib/types'
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext'
import GlobalLanguageSwitcher from '@/components/portal/GlobalLanguageSwitcher'

interface VipServiceFormProps {
    initialData?: VipTourismService
    isEdit?: boolean
}

export default function VipServiceForm({ initialData, isEdit = false }: VipServiceFormProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [image, setImage] = useState<string>(initialData?.image_url || '')
    const [isActive, setIsActive] = useState(initialData?.is_active ?? true)

    const handleSubmit = async (formData: FormData) => {
        if (!image) {
            alert('Please upload an image')
            return
        }

        formData.set('imageUrl', image)
        if (isActive) formData.set('isActive', 'on')

        startTransition(async () => {
            let result
            if (isEdit && initialData) {
                result = await updateVipServiceAction(initialData.id, formData)
            } else {
                result = await createVipServiceAction(formData)
            }

            if (result?.error) {
                alert(result.error)
            } else {
                router.push('/en/portal-manage/vip-tourism-services')
                router.refresh()
            }
        })
    }

    return (
        <AdminLanguageProvider>
            <form action={handleSubmit} className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow space-y-8 font-satoshi">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-cabinet text-primary">
                        {isEdit ? 'Edit VIP Service' : 'Create New VIP Service'}
                    </h2>
                    <GlobalLanguageSwitcher />
                </div>

                {/* Image Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Image</label>
                    <ImageUpload
                        currentImage={image}
                        onUploadComplete={setImage}
                        bucket="service-images"
                    />
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {/* Title */}
                    <div className="col-span-full">
                        <MultiLangInput
                            name="title"
                            label="Service Title"
                            defaultValue={initialData?.title}
                            placeholder="Enter service title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="col-span-full">
                        <MultiLangTextarea
                            name="description"
                            label="Description"
                            defaultValue={initialData?.description}
                            placeholder="Enter description"
                            rows={4}
                            required
                        />
                    </div>

                    {/* CTA Settings */}
                    <div className="col-span-full border-t border-gray-100 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">CTA Settings</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <MultiLangInput
                                    name="cta_text"
                                    label="CTA Text"
                                    defaultValue={initialData?.cta_text}
                                    placeholder="e.g., Book Now"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Link</label>
                                <input
                                    type="text"
                                    name="ctaLink"
                                    defaultValue={initialData?.cta_link}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Display Order */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                        <input
                            type="number"
                            name="displayOrder"
                            defaultValue={initialData?.display_order || 0}
                            min="0"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        />
                        <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                    </div>

                    {/* Status */}
                    <div className="flex items-center pt-6">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isActive}
                                onChange={(e) => setIsActive(e.target.checked)}
                                className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-700">Active</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="mr-4 px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 bg-white"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-8 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? 'Saving...' : isEdit ? 'Update Service' : 'Create Service'}
                    </button>
                </div>
            </form>
        </AdminLanguageProvider>
    )
}
