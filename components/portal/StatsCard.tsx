'use client'

import { Plane, MapPin, FileText, TrendingUp, LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

const iconMap: Record<string, LucideIcon> = {
    Plane,
    MapPin,
    FileText,
    TrendingUp
}

interface StatsCardProps {
    title: string
    value: number
    iconName: string
    trend?: {
        value: number
        isPositive: boolean
    }
}

export default function StatsCard({ title, value, iconName, trend }: StatsCardProps) {
    const [displayValue, setDisplayValue] = useState(0)
    const Icon = iconMap[iconName]

    // Animated counter effect
    useEffect(() => {
        const duration = 1000
        const steps = 30
        const increment = value / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= value) {
                setDisplayValue(value)
                clearInterval(timer)
            } else {
                setDisplayValue(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [value])

    if (!Icon) return null

    return (
        <div className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/5 rounded-xl">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-500'
                        }`}>
                        <span>{trend.isPositive ? '↑' : '↓'}</span>
                        <span>{Math.abs(trend.value)}%</span>
                    </div>
                )}
            </div>

            <div className="space-y-1">
                <p className="text-gray-500 text-sm font-medium font-satoshi">{title}</p>
                <p className="text-3xl font-bold text-gray-900 tabular-nums font-cabinet">
                    {displayValue.toLocaleString()}
                </p>
            </div>
        </div>
    )
}


