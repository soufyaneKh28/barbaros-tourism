'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { type Locale } from '@/i18n';

interface BlogsGridProps {
    locale: Locale;
}

const blogs = [
    {
        id: 1,
        category: 'TRAVEL',
        title: 'Istanbul Bosphorus Experience',
        slug: 'istanbul-bosphorus-experience',
        excerpt: 'Discover the enchanting beauty of Istanbul and the Bosphorus strait. Experience the perfect blend of European and Asian cultures.',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
        author: 'Sarah Johnson',
        date: 'January 15, 2026',
        readTime: '8 min read',
    },
    {
        id: 2,
        category: 'TRAVEL',
        title: 'Kyoto Cultural Escape',
        slug: 'kyoto-cultural-escape',
        excerpt: 'Immerse yourself in the rich traditions and temples of ancient Kyoto. A journey through time and culture.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
        author: 'Michael Chen',
        date: 'January 12, 2026',
        readTime: '6 min read',
    },
    {
        id: 3,
        category: 'TRAVEL',
        title: 'Alpine Lake Adventures',
        slug: 'alpine-lake-adventures',
        excerpt: 'Experience the pristine beauty of alpine lakes and mountain scenery. Perfect for nature lovers and adventure seekers.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
        author: 'Emma Wilson',
        date: 'January 10, 2026',
        readTime: '7 min read',
    },
];

export default function BlogsGrid({ locale }: BlogsGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
                <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                >
                    <Link href={`/${locale}/blogs/${blog.slug}`} className="block">
                        {/* Image */}
                        <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                            <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <span className="absolute top-4 left-4 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold font-cabinet">
                                {blog.category}
                            </span>
                        </div>

                        {/* Content */}
                        <div>
                            <h3 className="text-xl font-bold font-cabinet text-primary mb-2 group-hover:text-secondary transition-colors">
                                {blog.title}
                            </h3>

                            <p className="text-gray-600 font-satoshi mb-4 line-clamp-2">
                                {blog.excerpt}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center justify-between text-sm text-gray-500 font-satoshi">
                                <span>{blog.author}</span>
                                <div className="flex items-center gap-3">
                                    <span>{blog.date}</span>
                                    <span>•</span>
                                    <span>{blog.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
