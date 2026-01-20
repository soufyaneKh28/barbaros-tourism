'use client'

import { Clock, Plane, MapPin, FileText } from 'lucide-react'

interface Activity {
    id: string
    type: 'trip' | 'destination' | 'blog'
    action: string
    title: string
    timestamp: Date
}

interface ActivityFeedProps {
    activities: Activity[]
}

const iconMap = {
    trip: Plane,
    destination: MapPin,
    blog: FileText
}

const colorMap = {
    trip: 'bg-primary/5 text-primary',
    destination: 'bg-secondary/5 text-secondary',
    blog: 'bg-primary/5 text-primary'
}

function getRelativeTime(date: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
    if (activities.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 font-cabinet">Recent Activity</h3>
                <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-satoshi">No recent activity</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 font-cabinet">Recent Activity</h3>
            <div className="space-y-4">
                {activities.map((activity) => {
                    const Icon = iconMap[activity.type]
                    const colorClass = colorMap[activity.type]

                    return (
                        <div key={activity.id} className="flex items-start gap-3 group">
                            <div className={`p-2 rounded-lg ${colorClass} transition-colors`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 font-satoshi">
                                    <span className="font-medium">{activity.action}</span>
                                    {' '}
                                    <span className="text-gray-600">{activity.title}</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1 font-satoshi">
                                    {getRelativeTime(activity.timestamp)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

