'use client';

import { motion } from "motion/react";
import Image from "next/image";

const teamMembers = [
    {
        name: "Alexander Barbaros",
        role: "Founder & CEO",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Elena Petrov",
        role: "Co-Founder & COO",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Marco Rossi",
        role: "Head of Tourism",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Dr. Selin Yılmaz",
        role: "Medical Tourism Director",
        image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "James Chen",
        role: "Marketing Manager",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Sofia Müller",
        role: "Lead Tour Guide",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Lucas Dubois",
        role: "Customer Experience Lead",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Aisha Hassan",
        role: "Logistics Manager",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
    },
];

export default function Team() {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <span className="bg-primary/5 border border-primary/10 rounded-full px-6 py-2 text-primary font-bold font-cabinet text-sm">
                            Founder & Leadership Team
                        </span>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-extrabold font-cabinet text-primary mb-6"
                    >
                        Meet the minds behind Barbaros
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-lg text-gray-500 font-satoshi max-w-2xl mx-auto"
                    >
                        Our dedicated team of experts works tirelessly to ensure your travel and medical experiences in Türkiye are nothing short of extraordinary.
                    </motion.p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group relative h-[450px] rounded-20 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            {/* Member Image */}
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Info - Aligned bottom-left */}
                            <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500">
                                <h3 className="text-2xl font-bold font-cabinet text-white mb-1">
                                    {member.name}
                                </h3>
                                <p className="text-white/70 font-satoshi font-medium tracking-wide">
                                    {member.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
