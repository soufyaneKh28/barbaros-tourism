import { getTrips } from '@/lib/services/trips'
import { getPrograms } from '@/lib/services/programs'
import { getBlogs } from '@/lib/services/blogs'
import StatsCard from '@/components/portal/StatsCard'
import QuickActions from '@/components/portal/QuickActions'
import ActivityFeed from '@/components/portal/ActivityFeed'

export const dynamic = 'force-dynamic'

async function getDashboardData() {
    try {
        const [trips, programs, blogs] = await Promise.all([
            getTrips(),
            getPrograms(),
            getBlogs()
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

        return {
            stats: {
                trips: trips.length,
                programs: programs.length,
                blogs: blogs.length,
                publishedBlogs: blogs.filter((b: any) => b.is_published).length
            },
            activities
        }
    } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
        return {
            stats: { trips: 0, programs: 0, blogs: 0, publishedBlogs: 0 },
            activities: []
        }
    }
}

export default async function AdminDashboard() {
    const { stats, activities } = await getDashboardData()

    return (
        <div className="space-y-8 animate-fade-in font-satoshi">
            {/* Welcome Section */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2 text-primary font-cabinet">Welcome to Barbaros Portal</h1>
                    <p className="text-gray-600 text-lg">
                        Manage your tourism content with ease. Create trips, programs, and share stories.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Active Trips"
                    value={stats.trips}
                    iconName="Plane"
                    trend={{ value: 12, isPositive: true }}
                />
                <StatsCard
                    title="Programs"
                    value={stats.programs}
                    iconName="FileText"
                    trend={{ value: 8, isPositive: true }}
                />
                <StatsCard
                    title="Total Blogs"
                    value={stats.blogs}
                    iconName="FileText"
                    trend={{ value: 15, isPositive: true }}
                />
                <StatsCard
                    title="Published"
                    value={stats.publishedBlogs}
                    iconName="TrendingUp"
                />
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

