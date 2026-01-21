'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Upload, X, Loader2, ImagePlus } from 'lucide-react'
import Image from 'next/image'

interface MultiImageUploadProps {
    bucket: 'trip-images' | 'blog-images' | 'destination-images'
    onUploadComplete: (urls: string[]) => void
    currentImages?: string[]
    label?: string
    maxImages?: number
}

export default function MultiImageUpload({
    bucket,
    onUploadComplete,
    currentImages = [],
    label = 'Gallery Images',
    maxImages = 10
}: MultiImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [images, setImages] = useState<string[]>(currentImages)
    const [error, setError] = useState<string | null>(null)

    async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            setUploading(true)
            setError(null)

            if (!event.target.files || event.target.files.length === 0) {
                return
            }

            const newFiles = Array.from(event.target.files)

            // Validate total count
            if (images.length + newFiles.length > maxImages) {
                setError(`You can only upload up to ${maxImages} images`)
                setUploading(false)
                return
            }

            const supabase = createClient()
            const newUrls: string[] = []

            for (const file of newFiles) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    continue
                }

                // Validate file size (5MB)
                if (file.size > 5 * 1024 * 1024) {
                    continue
                }

                // Create unique filename
                const fileExt = file.name.split('.').pop()
                const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`

                // Upload to Supabase Storage
                const { error: uploadError } = await supabase.storage
                    .from(bucket)
                    .upload(fileName, file, {
                        cacheControl: '3600',
                        upsert: false
                    })

                if (uploadError) {
                    console.error('Error uploading:', uploadError)
                    continue
                }

                // Get public URL
                const { data } = supabase.storage
                    .from(bucket)
                    .getPublicUrl(fileName)

                newUrls.push(data.publicUrl)
            }

            const updatedImages = [...images, ...newUrls]
            setImages(updatedImages)
            onUploadComplete(updatedImages)

        } catch (error: any) {
            console.error('Error uploading images:', error)
            setError(error.message || 'Failed to upload images')
        } finally {
            setUploading(false)
        }
    }

    function handleRemove(indexToRemove: number) {
        const updatedImages = images.filter((_, index) => index !== indexToRemove)
        setImages(updatedImages)
        onUploadComplete(updatedImages)
    }

    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-gray-700">
                    {label} <span className="text-gray-400 text-xs">({images.length}/{maxImages})</span>
                </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Existing Images */}
                {images.map((url, index) => (
                    <div key={index} className="relative aspect-square border-2 border-gray-200 rounded-lg overflow-hidden group">
                        <Image
                            src={url}
                            alt={`Gallery ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}

                {/* Upload Button */}
                {images.length < maxImages && (
                    <label className="flex flex-col items-center justify-center aspect-square border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center text-center p-4">
                            {uploading ? (
                                <Loader2 className="w-8 h-8 mb-2 text-gray-400 animate-spin" />
                            ) : (
                                <ImagePlus className="w-8 h-8 mb-2 text-gray-400" />
                            )}
                            <p className="text-xs text-gray-500">
                                {uploading ? 'Uploading...' : 'Add Images'}
                            </p>
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    )
}
