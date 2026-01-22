'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
    bucket: 'trip-images' | 'blog-images' | 'destination-images' | 'service-images'
    onUploadComplete: (url: string) => void
    currentImage?: string
    label?: string
    required?: boolean
}

export default function ImageUpload({
    bucket,
    onUploadComplete,
    currentImage,
    label = 'Upload Image',
    required = false
}: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [preview, setPreview] = useState<string | null>(currentImage || null)
    const [error, setError] = useState<string | null>(null)

    async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            setUploading(true)
            setError(null)

            if (!event.target.files || event.target.files.length === 0) {
                setUploading(false)
                return
            }

            const file = event.target.files[0]

            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file')
                setUploading(false)
                return
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('File size must be less than 5MB')
                setUploading(false)
                return
            }

            const supabase = createClient()

            // Create unique filename
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
            const filePath = fileName

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (uploadError) {
                throw uploadError
            }

            // Get public URL
            const { data } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath)

            const publicUrl = data.publicUrl

            // Set preview
            setPreview(publicUrl)

            // Notify parent component
            onUploadComplete(publicUrl)

        } catch (error: any) {
            console.error('Error uploading image:', error)
            setError(error.message || 'Failed to upload image')
        } finally {
            setUploading(false)
        }
    }

    function handleRemove() {
        setPreview(null)
        onUploadComplete('')
    }

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            {preview ? (
                <div className="relative w-full h-64 border-2 border-gray-200 rounded-lg overflow-hidden group">
                    <Image
                        src={preview}
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                            <>
                                <Loader2 className="w-10 h-10 mb-3 text-gray-400 animate-spin" />
                                <p className="text-sm text-gray-500">Uploading...</p>
                            </>
                        ) : (
                            <>
                                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                            </>
                        )}
                    </div>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                    />
                </label>
            )}

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}
