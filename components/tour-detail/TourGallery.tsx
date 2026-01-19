'use client';

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface TourGalleryProps {
    images: string[];
}

export default function TourGallery({ images }: TourGalleryProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Ensure we have at least 5 images for the grid
    const mainImage = images[0] || "/placeholder.jpg";
    const gridImages = images.slice(1, 5);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Image */}
            <div className="md:col-span-2 h-full relative cursor-pointer">
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
                    <div key={index} className="relative h-full overflow-hidden cursor-pointer">
                        <Image
                            src={img}
                            alt={`Tour Image ${index + 2}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        {index === 3 && (
                            <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition-colors flex items-center justify-center">
                                <span className="text-white font-cabinet font-bold text-2xl">+12</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button className="absolute bottom-6 right-6 bg-white text-gray-900 px-6 py-2 rounded-full font-bold font-cabinet text-sm shadow-lg hover:shadow-xl transition-all duration-300 opacity-90 hover:opacity-100 hidden md:block">
                View All Photos
            </button>
        </motion.div>
    );
}
