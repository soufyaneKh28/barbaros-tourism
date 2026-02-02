'use client'

export const dynamic = 'force-dynamic'

import React from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { signOutAction } from '@/app/actions/auth'
import { Plane, MapPin, FileText, Database, LogOut, LayoutDashboard, Mail, Briefcase, FileCheck, BriefcaseMedical, Crown } from 'lucide-react'
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

    const navItems = [
        { href: `/${locale}/portal-manage`, label: 'Dashboard', icon: LayoutDashboard },
        { href: `/${locale}/portal-manage/trips`, label: 'Trips', icon: Plane },
        { href: `/${locale}/portal-manage/programs`, label: 'Programs', icon: FileText },
        { href: `/${locale}/portal-manage/special-packages`, label: 'Special Packages', icon: Briefcase },
        { href: `/${locale}/portal-manage/vip-tourism-services`, label: 'VIP Services', icon: Crown },
        { href: `/${locale}/portal-manage/blogs`, label: 'Blogs', icon: FileText },
        { href: `/${locale}/portal-manage/services`, label: 'Services', icon: Briefcase },
        { href: `/${locale}/portal-manage/immigration-services`, label: 'Immigration Services', icon: FileCheck },
        { href: `/${locale}/portal-manage/medical-tourism`, label: 'Medical Tourism', icon: BriefcaseMedical },
        { href: `/${locale}/portal-manage/messages`, label: 'Messages', icon: Mail },
        { href: `/${locale}/portal-manage/seed`, label: 'Seed', icon: Database, isSecondary: true }
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
        <div className="min-h-screen bg-gray-50 text-gray-900 font-satoshi flex">
            {/* Left Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 shadow-sm flex flex-col fixed h-screen">
                {/* Logo/Brand */}
                <div className="p-6 border-b border-gray-200">
                    <Link
                        href={`/${locale}/portal-manage`}
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-sm font-bold group-hover:bg-primary group-hover:text-white transition-colors">
                            BT
                        </div>
                        <span className="text-lg font-bold text-primary font-cabinet">
                            Barbaros Portal
                        </span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6 px-3">
                    <div className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const active = isActive(item.href)

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`
                                        flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 w-full
                                        ${active
                                            ? 'bg-primary text-white shadow-md'
                                            : item.isSecondary
                                                ? 'text-gray-400 hover:text-secondary hover:bg-secondary/5'
                                                : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span className={item.isSecondary ? 'text-sm' : ''}>{item.label}</span>
                                </Link>
                            )
                        })}
                    </div>
                </nav>

                {/* Sign Out Button */}
                <div className="p-4 border-t border-gray-200">
                    <form action={signOutAction}>
                        <input type="hidden" name="locale" value={locale} />
                        <button
                            type="submit"
                            className="flex items-center gap-3 w-full bg-gray-100/50 hover:bg-red-50 hover:text-red-600 text-gray-700 px-4 py-3 rounded-lg font-medium transition-all group"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-0">
                <AdminLanguageProvider>
                    {children}
                </AdminLanguageProvider>
            </main>
        </div>
    )
}
