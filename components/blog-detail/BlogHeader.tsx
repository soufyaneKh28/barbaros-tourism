'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

interface BlogHeaderProps {
    title: string;
    category: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    date: string;
    readTime: string;
    image: string;
}

export default function BlogHeader({
    title,
    category,
    author,
    date,
    readTime,
    image
}: BlogHeaderProps) {
    return (
        <div className="space-y-8">
            {/* Category Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-bold font-cabinet">
                    {category}
                </span>
            </motion.div>

            {/* Title */}
            <motion.h1
                className="text-4xl lg:text-5xl font-extrabold text-primary font-cabinet leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                {title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
                className="flex flex-wrap items-center gap-6 text-gray-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                            src={author.avatar}
                            alt={author.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 font-cabinet">{author.name}</p>
                        <p className="text-sm font-satoshi">{author.role}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-sm font-satoshi">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{readTime}</span>
                    </div>
                </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
                className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>
        </div>
    );
}
