'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { LucideIcon, PlusCircle, MapPin, FileText, Plane } from 'lucide-react'

interface QuickAction {
    title: string
    description: string
    href: string
    icon: LucideIcon
    colorClass: string
}

const actions: QuickAction[] = [
    {
        title: 'Add New Trip',
        description: 'Create a new tour package',
        href: '/portal-manage/trips/new',
        icon: Plane,
        colorClass: 'text-primary bg-primary/5'
    },
    {
        title: 'Add Destination',
        description: 'Add a new travel destination',
        href: '/portal-manage/destinations/new',
        icon: MapPin,
        colorClass: 'text-secondary bg-secondary/5'
    },
    {
        title: 'Write Blog Post',
        description: 'Share travel stories',
        href: '/portal-manage/blogs/new',
        icon: FileText,
        colorClass: 'text-primary bg-primary/5'
    }
]

export default function QuickActions() {
    const params = useParams()
    const locale = params?.locale || 'en'

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 font-cabinet">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {actions.map((action) => {
                    const Icon = action.icon
                    return (
                        <Link
                            key={action.href}
                            href={`/${locale}${action.href}`}
                            className="group relative overflow-hidden bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] border border-gray-100"
                        >
                            <div className="relative z-10 space-y-3">
                                <div className={`inline-flex p-3 rounded-xl ${action.colorClass}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1 font-cabinet">{action.title}</h4>
                                    <p className="text-sm text-gray-600 font-satoshi">{action.description}</p>
                                </div>
                                <div className="flex items-center text-sm font-medium text-gray-400 group-hover:text-primary transition-colors">
                                    <span>Get started</span>
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
