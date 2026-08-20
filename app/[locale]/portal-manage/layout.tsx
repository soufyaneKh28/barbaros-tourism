'use client'

export const dynamic = 'force-dynamic'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { signOutAction } from '@/app/actions/auth'
import {
    Plane, FileText, LogOut, LayoutDashboard, Mail, Briefcase, FileCheck,
    BriefcaseMedical, Crown, LayoutGrid, Globe, Newspaper, Menu, X,
} from 'lucide-react'
import { AdminLanguageProvider } from '@/contexts/AdminLanguageContext'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const params = useParams()
    const pathname = usePathname()
    const locale = params?.locale || 'en'
    const isLoginPage = pathname?.includes('/login')
    const [sidebarOpen, setSidebarOpen] = useState(false)

    // Close the mobile drawer whenever the route changes.
    const [lastPathname, setLastPathname] = useState(pathname)
    if (pathname !== lastPathname) {
        setLastPathname(pathname)
        setSidebarOpen(false)
    }

    const navGroups = [
        {
            label: 'Overview',
            items: [
                { href: `/${locale}/portal-manage`, label: 'Dashboard', icon: LayoutDashboard },
            ],
        },
        {
            label: 'Website',
            items: [
                { href: `/${locale}/portal-manage/website-content`, label: 'Website Content', icon: Globe },
            ],
        },
        {
            label: 'Catalog',
            items: [
                { href: `/${locale}/portal-manage/trips`, label: 'Trips', icon: Plane },
                { href: `/${locale}/portal-manage/programs`, label: 'Programs', icon: FileText },
                { href: `/${locale}/portal-manage/special-packages`, label: 'Special Packages', icon: Briefcase },
                { href: `/${locale}/portal-manage/vip-tourism-services`, label: 'VIP Services', icon: Crown },
                { href: `/${locale}/portal-manage/medical-tourism`, label: 'Medical Tourism', icon: BriefcaseMedical },
                { href: `/${locale}/portal-manage/services`, label: 'Services', icon: Briefcase },
                { href: `/${locale}/portal-manage/immigration-services`, label: 'Immigration Services', icon: FileCheck },
                { href: `/${locale}/portal-manage/quick-actions`, label: 'Quick Actions', icon: LayoutGrid },
            ],
        },
        {
            label: 'Engagement',
            items: [
                { href: `/${locale}/portal-manage/blogs`, label: 'Blogs', icon: Newspaper },
                { href: `/${locale}/portal-manage/messages`, label: 'Messages', icon: Mail },
            ],
        },
    ]

    const isActive = (href: string) => {
        if (href === `/${locale}/portal-manage`) {
            return pathname === href
        }
        return pathname?.startsWith(href)
    }

    if (isLoginPage) {
        return <div className="min-h-screen bg-gray-50 text-gray-900 font-satoshi">{children}</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-satoshi lg:flex">
            {/* Mobile Topbar */}
            <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3 bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
                <Link href={`/${locale}/portal-manage`} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        BT
                    </div>
                    <span className="text-sm font-bold text-primary font-cabinet">Barbaros Portal</span>
                </Link>
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 -mr-2 text-gray-500 hover:text-primary transition-colors"
                    aria-label="Open menu"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Backdrop (mobile only, shown while drawer is open) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Left Sidebar — off-canvas drawer on mobile, pinned on lg+ */}
            <aside
                className={`
                    w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col fixed h-screen z-50
                    transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:translate-x-0
                `}
            >
                {/* Logo/Brand */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <Link
                        href={`/${locale}/portal-manage`}
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-700 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm group-hover:scale-105 transition-transform">
                            BT
                        </div>
                        <div>
                            <span className="text-lg font-bold text-primary font-cabinet block leading-tight">
                                Barbaros Portal
                            </span>
                            <span className="text-[11px] text-gray-400 font-medium">Admin Dashboard</span>
                        </div>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-5 px-3 space-y-6">
                    {navGroups.map((group) => (
                        <div key={group.label}>
                            <p className="px-4 mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                                {group.label}
                            </p>
                            <div className="space-y-1">
                                {group.items.map((item) => {
                                    const Icon = item.icon
                                    const active = isActive(item.href)

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`
                                                relative flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 w-full
                                                ${active
                                                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                                                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                                                }
                                            `}
                                        >
                                            <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2} />
                                            <span className="truncate">{item.label}</span>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Sign Out Button */}
                <div className="p-4 border-t border-gray-200">
                    <form action={signOutAction}>
                        <input type="hidden" name="locale" value={locale} />
                        <button
                            type="submit"
                            className="flex items-center gap-3 w-full bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-600 px-4 py-2.5 rounded-lg font-medium text-sm transition-all group"
                        >
                            <LogOut className="w-[18px] h-[18px]" />
                            <span>Sign Out</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 min-w-0">
                <AdminLanguageProvider>
                    {children}
                </AdminLanguageProvider>
            </main>
        </div>
    )
}
