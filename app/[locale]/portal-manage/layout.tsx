'use client'

export const dynamic = 'force-dynamic'

import React from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { signOutAction } from '@/app/actions/auth'
import { Plane, MapPin, FileText, Database, LogOut, LayoutDashboard, Mail } from 'lucide-react'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const params = useParams()
    const pathname = usePathname()
    const locale = params?.locale || 'en'
    const isLoginPage = pathname?.includes('/login')

    const navItems = [
        { href: `/${locale}/portal-manage`, label: 'Dashboard', icon: LayoutDashboard },
        { href: `/${locale}/portal-manage/trips`, label: 'Trips', icon: Plane },
        { href: `/${locale}/portal-manage/destinations`, label: 'Destinations', icon: MapPin },
        { href: `/${locale}/portal-manage/blogs`, label: 'Blogs', icon: FileText },
        { href: `/${locale}/portal-manage/messages`, label: 'Messages', icon: Mail },
        { href: `/${locale}/portal-manage/seed`, label: 'Seed', icon: Database, isSecondary: true }
    ]

    const isActive = (href: string) => {
        if (href === `/${locale}/portal-manage`) {
            return pathname === href
        }
        return pathname?.startsWith(href)
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-satoshi">
            {!isLoginPage && (
                <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <Link
                            href={`/${locale}/portal-manage`}
                            className="text-xl font-bold text-primary leading-tight flex items-center gap-3 group font-cabinet"
                        >
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-sm font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                                BT
                            </div>
                            <span>
                                Barbaros Portal
                            </span>
                        </Link>

                        <nav className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => {
                                const Icon = item.icon
                                const active = isActive(item.href)

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`
                                            flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                                            ${active
                                                ? 'bg-primary text-white shadow-md'
                                                : item.isSecondary
                                                    ? 'text-gray-400 hover:text-secondary hover:bg-secondary/5'
                                                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className={item.isSecondary ? 'text-sm' : ''}>{item.label}</span>
                                    </Link>
                                )
                            })}

                            <div className="h-8 w-[1px] bg-gray-200 mx-3" />

                            <form action={signOutAction}>
                                <button
                                    type="submit"
                                    className="flex items-center gap-2 bg-gray-100/50 hover:bg-red-50 hover:text-red-600 text-gray-700 px-4 py-2 rounded-lg font-medium transition-all group"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Sign Out</span>
                                </button>
                            </form>
                        </nav>
                    </div>
                </header>
            )}
            <main className={`${!isLoginPage ? 'max-w-7xl mx-auto py-8 px-6' : ''}`}>
                {children}
            </main>
        </div>
    )
}
