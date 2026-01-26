'use client';

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface TourGalleryProps {
    images: string[];
}

export default function TourGallery({ images }: TourGalleryProps) {
    // const [isHovered, setIsHovered] = useState(false); // Removed unused state
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    // Ensure we have at least 5 images for the grid
    const mainImage = images[0] || "/placeholder.jpg";
    const gridImages = images.slice(1, 5);
    const remainingImages = Math.max(0, images.length - 5);

    const openLightbox = (index: number) => {
        setPhotoIndex(index);
        setIsOpen(true);
    };

    const closeLightbox = () => {
        setIsOpen(false);
    };

    const nextImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setPhotoIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setPhotoIndex((prev) => (prev + images.length - 1) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") nextImage();
            if (e.key === "ArrowLeft") prevImage();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, nextImage, prevImage]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 relative group"
            >
                {/* Main Image */}
                <div
                    className="md:col-span-2 h-full relative cursor-pointer"
                    onClick={() => openLightbox(0)}
                >
                    <Image
                        src={mainImage}
                        alt="Tour Main Image"
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        priority
                    />
                </div>

                {/* Side Grid */}
                <div className="md:col-span-2 grid grid-cols-2 gap-2 md:gap-4 h-full">
                    {gridImages.map((img, index) => (
                        <div
                            key={index}
                            className="relative h-full overflow-hidden cursor-pointer"
                            onClick={() => openLightbox(index + 1)}
                        >
                            <Image
                                src={img}
                                alt={`Tour Image ${index + 2}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                            {index === 3 && remainingImages > 0 && (
                                <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <span className="text-white font-cabinet font-bold text-2xl">+{remainingImages}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => openLightbox(0)}
                    className="absolute bottom-6 right-6 bg-white text-gray-900 px-6 py-2 rounded-full font-bold font-cabinet text-sm shadow-lg hover:shadow-xl transition-all duration-300 opacity-90 hover:opacity-100 hidden md:block"
                >
                    View All Photos
                </button>
            </motion.div>

            {/* Lightbox */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm"
                        onClick={closeLightbox}
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50"
                        >
                            <X size={32} />
                        </button>

                        <button
                            onClick={prevImage}
                            className="absolute left-6 text-white/70 hover:text-white transition-colors p-2 z-50 hidden md:block"
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute right-6 text-white/70 hover:text-white transition-colors p-2 z-50 hidden md:block"
                        >
                            <ChevronRight size={48} />
                        </button>

                        <div
                            className="relative w-full h-full md:w-[90vw] md:h-[85vh] flex items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                key={photoIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={images[photoIndex]}
                                    alt={`Gallery Image ${photoIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </motion.div>

                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 font-cabinet font-medium">
                                {photoIndex + 1} / {images.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
