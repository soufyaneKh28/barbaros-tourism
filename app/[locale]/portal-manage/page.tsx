import Link from 'next/link'
import { ArrowRight, Globe } from 'lucide-react'
import { getTrips } from '@/lib/services/trips'
import { getPrograms } from '@/lib/services/programs'
import { getBlogs } from '@/lib/services/blogs'
import { getSiteContentRows, SITE_CONTENT_SECTIONS } from '@/lib/services/site-content'
import StatsCard from '@/components/portal/StatsCard'
import QuickActions from '@/components/portal/QuickActions'
import ActivityFeed from '@/components/portal/ActivityFeed'

export const dynamic = 'force-dynamic'

async function getDashboardData() {
    try {
        const [trips, programs, blogs, siteContentRows] = await Promise.all([
            getTrips(),
            getPrograms(),
            getBlogs(),
            getSiteContentRows(),
        ])

        // Get recent activities
        const activities = [
            ...trips.slice(0, 2).map((trip: any) => ({
                id: `trip-${trip.id}`,
                type: 'trip' as const,
                action: 'Added trip',
                title: trip.title,
                timestamp: new Date(trip.created_at || Date.now())
            })),
            ...programs.slice(0, 2).map((prog: any) => ({
                id: `prog-${prog.id}`,
                type: 'program' as const,
                action: 'Added program',
                title: prog.title,
                timestamp: new Date(prog.created_at || Date.now())
            })),
            ...blogs.slice(0, 2).map((blog: any) => ({
                id: `blog-${blog.id}`,
                type: 'blog' as const,
                action: blog.is_published ? 'Published' : 'Created draft',
                title: blog.title,
                timestamp: new Date(blog.created_at || Date.now())
            }))
        ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5)

        const customizedSections = siteContentRows.filter(r => r.updated_at).length

        return {
            stats: {
                trips: trips.length,
                programs: programs.length,
                blogs: blogs.length,
                publishedBlogs: blogs.filter((b: any) => b.is_published).length
            },
            activities,
            contentProgress: {
                customized: customizedSections,
                total: SITE_CONTENT_SECTIONS.length,
            },
        }
    } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
        return {
            stats: { trips: 0, programs: 0, blogs: 0, publishedBlogs: 0 },
            activities: [],
            contentProgress: { customized: 0, total: SITE_CONTENT_SECTIONS.length },
        }
    }
}

export default async function AdminDashboard({
    params,
}: {
    params: Promise<{ locale: string }>
}) {
    const { locale } = await params
    const { stats, activities, contentProgress } = await getDashboardData()
    const progressPct = Math.round((contentProgress.customized / Math.max(contentProgress.total, 1)) * 100)

    return (
        <div className="space-y-8 animate-fade-in font-satoshi">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-primary via-primary to-primary-700 text-white shadow-sm">
                <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/5 rounded-full blur-2xl" />
                <div className="absolute bottom-0 right-24 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2 font-cabinet">Welcome to Barbaros Portal</h1>
                    <p className="text-white/80 text-lg max-w-xl">
                        Manage your tourism content with ease — trips, programs, blog stories, and every page on the public site.
                    </p>
                </div>
            </div>

            {/* Website Content Spotlight */}
            <Link
                href={`/${locale}/portal-manage/website-content`}
                className="group flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                        <Globe className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-bold font-cabinet text-lg text-gray-900">Website Content</h3>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Edit titles, descriptions, badges, and images for every page — no code required.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="hidden sm:block w-40">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>{contentProgress.customized} of {contentProgress.total} customized</span>
                            <span>{progressPct}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-secondary rounded-full transition-all" style={{ width: `${progressPct}%` }} />
                        </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 bg-primary text-white px-5 py-2.5 rounded-lg font-medium text-sm group-hover:bg-primary-600 transition-colors">
                        Manage Content <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </div>
            </Link>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Active Trips" value={stats.trips} iconName="Plane" />
                <StatsCard title="Programs" value={stats.programs} iconName="FileText" />
                <StatsCard title="Total Blogs" value={stats.blogs} iconName="FileText" />
                <StatsCard title="Published Blogs" value={stats.publishedBlogs} iconName="TrendingUp" />
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Recent Activity */}
            <ActivityFeed activities={activities} />
        </div>
    )
}

// Add fade-in animation styles
const styles = `
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-out;
}
`
