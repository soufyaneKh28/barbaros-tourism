'use client'

import React from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { signOutAction } from '@/app/actions/auth'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const params = useParams()
    const pathname = usePathname()
    const locale = params?.locale || 'en'
    const isLoginPage = pathname?.includes('/login')

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {!isLoginPage && (
                <header className="bg-white border-b px-6 py-4 shadow-sm">
                    <div className="max-w-7xl mx-auto flex justify-between items-center">
                        <Link href={`/${locale}/portal-manage`} className="text-xl font-bold text-gray-900 leading-tight flex items-center gap-2">
                            <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs">BT</span>
                            Barbaros Portal
                        </Link>
                        <nav className="flex items-center space-x-6">
                            <Link href={`/${locale}/portal-manage/trips`} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Trips</Link>
                            <Link href={`/${locale}/portal-manage/destinations`} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Destinations</Link>
                            <Link href={`/${locale}/portal-manage/blogs`} className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Blogs</Link>
                            <Link href={`/${locale}/portal-manage/seed`} className="text-gray-400 hover:text-orange-500 font-medium text-sm transition-colors">Seed</Link>

                            <div className="h-6 w-[1px] bg-gray-200" />

                            <form action={signOutAction}>
                                <button
                                    type="submit"
                                    className="bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 px-4 py-1.5 rounded-md text-sm font-medium transition-all"
                                >
                                    Sign Out
                                </button>
                            </form>
                        </nav>
                    </div>
                </header>
            )}
            <main className={`${!isLoginPage ? 'max-w-7xl mx-auto py-6 sm:px-6 lg:px-8' : ''}`}>
                {children}
            </main>
        </div>
    )
}
