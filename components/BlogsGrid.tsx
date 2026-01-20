'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { type Locale } from '@/i18n';

export interface BlogItem {
    id: string | number;
    category: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    author: string;
    date: string;
    readTime: string;
}

interface BlogsGridProps {
    locale: Locale;
    blogs: BlogItem[];
}

export default function BlogsGrid({ locale, blogs }: BlogsGridProps) {
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
