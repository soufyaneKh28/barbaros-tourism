import { getBlogs } from '@/lib/services/blogs'
import Link from 'next/link'

export default async function BlogsAdminPage() {
    let blogs = []
    try {
        blogs = await getBlogs()
    } catch (e) {
        console.error('Failed to fetch blogs', e)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Manage Blogs</h2>
                <Link
                    href="/portal-manage/blogs/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Add New Post
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {blogs.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">No blog posts found. Start by writing one!</li>
                    ) : (
                        blogs.map((blog: any) => (
                            <li key={blog.id}>
                                <div className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex items-center">
                                        {blog.cover_image && (
                                            <img
                                                src={blog.cover_image}
                                                alt=""
                                                className="h-10 w-10 rounded object-cover mr-4"
                                            />
                                        )}
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900">{blog.title}</h3>
                                            <p className="text-sm text-gray-500">
                                                {blog.is_published ? 'Published' : 'Draft'} • {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
                                        <button className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    )
}
