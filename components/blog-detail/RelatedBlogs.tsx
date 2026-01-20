'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

interface RelatedBlogsProps {
    currentBlogId: number;
}

const allBlogs = [
    {
        id: 1,
        category: 'TRAVEL',
        title: 'Istanbul Bosphorus Experience',
        slug: 'istanbul-bosphorus-experience',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
        excerpt: 'Discover the enchanting beauty of Istanbul and the Bosphorus strait.',
        readTime: '8 min read',
    },
    {
        id: 2,
        category: 'TRAVEL',
        title: 'Kyoto Cultural Escape',
        slug: 'kyoto-cultural-escape',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
        excerpt: 'Immerse yourself in the rich traditions and temples of ancient Kyoto.',
        readTime: '6 min read',
    },
    {
        id: 3,
        category: 'TRAVEL',
        title: 'Alpine Lake Adventures',
        slug: 'alpine-lake-adventures',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
        excerpt: 'Experience the pristine beauty of alpine lakes and mountain scenery.',
        readTime: '7 min read',
    },
];

export default function RelatedBlogs({ currentBlogId }: RelatedBlogsProps) {
    const relatedBlogs = allBlogs.filter(blog => blog.id !== currentBlogId).slice(0, 2);

    return (
        <section className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-3xl font-extrabold font-cabinet text-primary mb-8">
                Related Articles
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
                {relatedBlogs.map((blog, index) => (
                    <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Link
                            href={`/blogs/${blog.slug}`}
                            className="group block"
                        >
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

                            <h3 className="text-xl font-bold font-cabinet text-primary mb-2 group-hover:text-secondary transition-colors">
                                {blog.title}
                            </h3>

                            <p className="text-gray-600 font-satoshi mb-3 line-clamp-2">
                                {blog.excerpt}
                            </p>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500 font-satoshi">
                                    {blog.readTime}
                                </span>
                                <span className="text-secondary font-cabinet font-medium group-hover:gap-2 flex items-center gap-1 transition-all">
                                    Read More
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
