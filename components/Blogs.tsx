'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';

const blogs = [
    {
        id: 1,
        category: 'TRAVEL',
        title: 'Istanbul Bosphorus Experience',
        slug: 'istanbul-bosphorus-experience',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
        large: true,
    },
    {
        id: 2,
        category: 'TRAVEL',
        title: 'Kyoto Cultural Escape',
        slug: 'kyoto-cultural-escape',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
        large: false,
    },
    {
        id: 3,
        category: 'TRAVEL',
        title: 'Alpine Lake Adventures',
        slug: 'alpine-lake-adventures',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
        large: false,
    },
];

export default function Blogs() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 gap-6">
                    <div className="flex-1">
                        <div className="inline-block mb-4">
                            <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                                Our services
                            </span>
                        </div>

                        <h2 className="text-[32px] lg:text-[42px] leading-tight font-cabinet font-extrabold text-primary mb-4">
                            Integrated tourism solutions that meet all your needs in{' '}
                            <span className="text-secondary">Türkiye</span>
                        </h2>

                        <p className="max-w-2xl text-gray-600 font-satoshi text-base leading-relaxed">
                            At Barbaros Tourism, we offer a full range of carefully designed tourism services, to guarantee you a comfortable, safe, and distinctive experience, whether you are looking for comprehensive travel services, medical tourism, or unforgettable tourist tours.
                        </p>
                    </div>

                    <div>
                        <Link href="/en/blogs">
                            <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl font-cabinet font-bold transition-all">
                                See All Blogs
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {blogs.map((blog, index) => {
                        const isLarge = blog.large;

                        return (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative rounded-3xl overflow-hidden group ${isLarge ? 'lg:row-span-2 h-[500px] lg:h-full' : 'h-[300px]'
                                    }`}
                            >
                                <Link href={`/en/blogs/${blog.slug}`} className="block h-full">
                                    {/* Background Image */}
                                    <div className="absolute inset-0">
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                                        <span className="text-secondary font-cabinet font-bold text-sm mb-3 tracking-wider">
                                            {blog.category}
                                        </span>

                                        <h3 className="text-white font-cabinet font-bold text-2xl lg:text-3xl mb-4">
                                            {blog.title}
                                        </h3>

                                        <div className="flex items-center gap-2 text-white font-cabinet font-medium group-hover:gap-3 transition-all">
                                            <span>Read More</span>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
