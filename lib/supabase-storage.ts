import { createClient } from '@/utils/supabase/client'

export type BucketName = 'trip-images' | 'blog-images' | 'destination-images'

/**
 * Upload an image to Supabase Storage
 */
export async function uploadImage(
    file: File,
    bucket: BucketName
): Promise<{ url: string | null; error: string | null }> {
    try {
        const supabase = createClient()

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return { url: null, error: 'Please upload an image file' }
        }

        // Validate file size (5MB)
        if (file.size > 5 * 1024 * 1024) {
            return { url: null, error: 'File size must be less than 5MB' }
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
            return { url: null, error: uploadError.message }
        }

        // Get public URL
        const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(fileName)

        return { url: data.publicUrl, error: null }
    } catch (error: any) {
        return { url: null, error: error.message || 'Failed to upload image' }
    }
}

/**
 * Delete an image from Supabase Storage
 */
export async function deleteImage(
    imageUrl: string,
    bucket: BucketName
): Promise<{ success: boolean; error: string | null }> {
    try {
        const supabase = createClient()

        // Extract filename from URL
        const urlParts = imageUrl.split('/')
        const fileName = urlParts[urlParts.length - 1]

        const { error } = await supabase.storage
            .from(bucket)
            .remove([fileName])

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, error: null }
    } catch (error: any) {
        return { success: false, error: error.message || 'Failed to delete image' }
    }
}
