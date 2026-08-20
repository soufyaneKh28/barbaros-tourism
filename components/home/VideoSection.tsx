'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useSiteContent } from '@/contexts/SiteContentContext';

function getYouTubeEmbedUrl(url: string): string | null {
    if (!url) return null;
    const match = url.match(
        /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    const videoId = match?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;
}

export default function VideoSection() {
    const { generic } = useSiteContent();
    const content = generic.home_video_section;
    const embedUrl = getYouTubeEmbedUrl(content.videoUrl);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    return (
        <section className="py-12 px-2 lg:px-6">
            <div className="max-w-7xl mx-auto relative h-[500px] rounded-[32px] overflow-hidden group cursor-pointer">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={content.backgroundImage}
                        alt="Video background"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 bg-gradient-to-r from-black/60 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center px-8 lg:px-16 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-white/90 font-cabinet font-medium tracking-widest text-sm mb-4 uppercase">
                            {content.subtitle}
                        </h3>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-cabinet font-bold text-white mb-8 leading-tight">
                            {content.title}
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {embedUrl && (
                            <button
                                onClick={() => setIsOpen(true)}
                                className="flex items-center gap-3 bg-white hover:bg-white/90 text-primary px-6 py-3 rounded-xl transition-all font-cabinet font-bold group/btn"
                            >
                                <span className="flex items-center justify-center w-8 h-8 bg-primary rounded-full text-white">
                                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </span>
                                {content.ctaLabel}
                            </button>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {isOpen && embedUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm px-4"
                        onClick={() => setIsOpen(false)}
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50"
                            aria-label="Close video"
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-5xl aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <iframe
                                src={embedUrl}
                                title="Video player"
                                className="w-full h-full rounded-2xl"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
