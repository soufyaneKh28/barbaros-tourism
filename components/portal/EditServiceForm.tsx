'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { updateServiceAction } from '@/app/actions/services'
import MultiLangInput from '@/components/portal/MultiLangInput'
import MultiLangTextarea from '@/components/portal/MultiLangTextarea'
import ImageUpload from '@/components/portal/ImageUpload'

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
        <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded-lg font-satoshi">
            <h2 className="text-2xl font-bold mb-6 font-cabinet">Edit Service</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                    name="target_client_category"
                    label="Target Client Category (فئة العميل المستهدف)"
                    defaultValue={service.target_client_category}
                />

                <MultiLangTextarea
                    name="procedural_requirements"
                    label="Procedural Requirements (متطلبات إجرائية)"
                    defaultValue={service.procedural_requirements}
                    rows={3}
                />

                <MultiLangTextarea
                    name="additional_notes"
                    label="Additional Notes (ملاحظات إضافية)"
                    defaultValue={service.additional_notes}
                    rows={3}
                />

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
    )
}
