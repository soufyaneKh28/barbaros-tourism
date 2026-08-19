'use server'

import cloudinary from '@/lib/cloudinary'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function uploadImageAction(
    formData: FormData
): Promise<{ url: string | null; error: string | null }> {
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'uploads'

    if (!file) {
        return { url: null, error: 'No file provided' }
    }

    if (!file.type.startsWith('image/')) {
        return { url: null, error: 'Please upload an image file' }
    }

    if (file.size > MAX_FILE_SIZE) {
        return { url: null, error: 'File size must be less than 5MB' }
    }

    try {
        const buffer = Buffer.from(await file.arrayBuffer())
        const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

        const result = await cloudinary.uploader.upload(base64, {
            folder,
            resource_type: 'image',
        })

        const url = cloudinary.url(result.public_id, {
            secure: true,
            transformation: [{ quality: 'auto', fetch_format: 'auto' }],
        })

        return { url, error: null }
    } catch (error: unknown) {
        console.error('Error uploading image to Cloudinary:', error)
        const message =
            error instanceof Error
                ? error.message
                : (error && typeof error === 'object' && 'message' in error && typeof (error as any).message === 'string')
                    ? (error as any).message
                    : 'Failed to upload image'
        return { url: null, error: message }
    }
}
