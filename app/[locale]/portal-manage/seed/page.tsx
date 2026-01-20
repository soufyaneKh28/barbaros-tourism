'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function SeedPage() {
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<string>('')
    const supabase = createClient()

    const handleSeed = async () => {
        setLoading(true)
        setStatus('Seeding...')

        try {
            // 1. Create Destination
            const { data: dest, error: destErr } = await supabase
                .from('destinations')
                .insert([{
                    name: 'Istanbul',
                    slug: 'istanbul',
                    description: 'The city of two continents.',
                    image_url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200'
                }])
                .select()
                .single()

            if (destErr) throw destErr

            // 2. Create Category
            const { data: cat, error: catErr } = await supabase
                .from('categories')
                .insert([{ name: 'Cultural Tours', slug: 'cultural' }])
                .select()
                .single()

            if (catErr) throw catErr

            // 3. Create Trip
            const { error: tripErr } = await supabase
                .from('trips')
                .insert([{
                    title: 'Historical Istanbul Adventure',
                    slug: 'historical-istanbul',
                    description: 'Explore the heart of the Byzantine and Ottoman Empires.',
                    price: 299,
                    duration_days: 3,
                    images: ['https://images.unsplash.com/photo-1524231757912-21f4fe3a7200'],
                    location: 'Istanbul, Turkey',
                    destination_id: dest.id,
                    category_id: cat.id,
                    is_active: true,
                    itinerary: [
                        { day: 1, title: 'Hagia Sophia & Blue Mosque', activities: 'Visit the landmarks' },
                        { day: 2, title: 'Topkapi Palace', activities: 'Explore the palace grounds' },
                        { day: 3, title: 'Grand Bazaar', activities: 'Shopping and tea' }
                    ]
                }])

            if (tripErr) throw tripErr

            // 4. Create Blog
            const { error: blogErr } = await supabase
                .from('blogs')
                .insert([{
                    title: 'Top 5 Hidden Gems in Istanbul',
                    slug: 'istanbul-hidden-gems',
                    excerpt: 'Discover the secrets of the Bosphorus that tourists usually miss.',
                    content: 'Full content goes here...',
                    cover_image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b',
                    is_published: true,
                    published_at: new Date().toISOString()
                }])

            if (blogErr) throw blogErr

            setStatus('Success! Sample data created.')
        } catch (err: any) {
            console.error(err)
            setStatus(`Error: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Database Seeding</h2>
            <p className="mb-4 text-gray-600">Click the button below to populate your Supabase database with sample data.</p>
            <button
                onClick={handleSeed}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? 'Seeding...' : 'Seed Sample Data'}
            </button>
            {status && <p className="mt-4 font-medium text-blue-600">{status}</p>}
        </div>
    )
}
