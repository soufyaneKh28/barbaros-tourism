export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Management Portal</h2>
                <p className="text-gray-600">
                    This is your private dashboard for managing Barbaros Tourism content.
                    Use the navigation links above to manage your trips, destinations, and blog posts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
                    <h3 className="font-semibold text-lg mb-2">Active Trips</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
                    <h3 className="font-semibold text-lg mb-2">Destinations</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
                    <h3 className="font-semibold text-lg mb-2">Blog Posts</h3>
                    <p className="text-3xl font-bold">0</p>
                </div>
            </div>
        </div>
    )
}
