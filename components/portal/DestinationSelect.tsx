'use client'

import { useState, useEffect } from 'react'
import { getDestinations } from '@/lib/services/destinations'

interface DestinationSelectProps {
    name: string
    label: string
    required?: boolean
    defaultValue?: string
    locale?: string
}

export default function DestinationSelect({
    name,
    label,
    required = false,
    defaultValue = '',
    locale = 'en'
}: DestinationSelectProps) {
    const [destinations, setDestinations] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedDestination, setSelectedDestination] = useState(defaultValue)

    useEffect(() => {
        async function fetchDestinations() {
            try {
                const data = await getDestinations(locale)
                setDestinations(data)
            } catch (error) {
                console.error('Error fetching destinations:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchDestinations()
    }, [locale])

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <select
                name={name}
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                required={required}
                disabled={loading}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            >
                <option value="">
                    {loading ? 'Loading destinations...' : 'Select a destination'}
                </option>
                {destinations.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                        {dest.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
