import { getBlogs } from '@/lib/services/blogs'
import Link from 'next/link'
import { Plus, Search, Edit2, Trash2, FileText, Calendar, Eye, CheckCircle, Clock } from 'lucide-react'

export default async function BlogsAdminPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    let blogs = []
    try {
        blogs = await getBlogs()
    } catch (e) {
        console.error('Failed to fetch blogs', e)
    }

    return (
        <div className="space-y-6 font-satoshi">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-primary font-cabinet">
                        Manage Blogs
                    </h2>
                    <p className="text-gray-600 mt-1">Write and publish your travel stories</p>
                </div>
                <Link
                    href={`/${locale}/portal-manage/blogs/new`}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add New Post
                </Link>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search blog posts..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
            </div>

            {/* Blogs Grid */}
            {blogs.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
                    <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 font-cabinet">No blog posts yet</h3>
                    <p className="text-gray-600 mb-6">Start sharing your travel stories</p>
                    <Link
                        href={`/${locale}/portal-manage/blogs/new`}
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-all font-medium"
                    >
                        <Plus className="w-5 h-5" />
                        Write First Post
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog: any) => (
                        <div
                            key={blog.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                        >
                            {/* Blog Cover Image */}
                            <div className="relative h-48 bg-gray-100 overflow-hidden">
                                {blog.cover_image ? (
                                    <img
                                        src={blog.cover_image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <FileText className="w-16 h-16 opacity-20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Status Badge */}
                                <div className="absolute top-4 right-4">
                                    {blog.is_published ? (
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm text-green-600 text-xs font-bold rounded-full shadow-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                            Published
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm text-amber-500 text-xs font-bold rounded-full shadow-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                            Draft
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Blog Info */}
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 font-cabinet group-hover:text-primary transition-colors">
                                    {blog.title}
                                </h3>

                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {blog.published_at
                                            ? new Date(blog.published_at).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })
                                            : 'Not published'
                                        }
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors group/btn">
                                        <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                        Preview
                                    </button>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 text-gray-500 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
