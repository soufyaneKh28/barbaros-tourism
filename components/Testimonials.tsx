'use client';

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
    {
        text: "Barbaros Tourism made our family trip to Turkey unforgettable. The guides were knowledgeable and the transfers were seamless.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        name: "Sarah Jenkins",
        role: "Family Traveler",
    },
    {
        text: "The medical tourism package was exceptional. From the clinic to the hotel, everything was handled with the utmost care and professionalism.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        name: "Michael Chen",
        role: "Medical Tourist",
    },
    {
        text: "I loved the hot air balloon tour in Cappadocia! It was a dream come true. Highly recommend their services for anyone visiting Turkey.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        name: "Elena Rodriguez",
        role: "Adventure Seeker",
    },
    {
        text: "Professional, reliable, and friendly. They tailored the itinerary exactly to our needs. Istanbul is magical thanks to them.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
        name: "James Wilson",
        role: "Cultural Enthusiast",
    },
    {
        text: "The VIP transfer service was top-notch. Comfortable vehicles and punctual drivers. Made our business trip stress-free.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
        name: "Emily Davis",
        role: "Business Traveler",
    },
    {
        text: "We booked a full package including flights, hotels, and tours. Best value for money and excellent customer support throughout.",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
        name: "Robert Taylor",
        role: "Vacationer",
    },
    {
        text: "Their attention to detail is amazing. They suggested hidden gems in Istanbul that we wouldn't have found on our own.",
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop",
        name: "David Kim",
        role: "Explorer",
    },
    {
        text: "Safe and trustworthy. As a solo female traveler, I felt completely secure with their guides and drivers.",
        image: "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=100&h=100&fit=crop",
        name: "Sophie Martin",
        role: "Solo Traveler",
    },
    {
        text: "The Bosphorus cruise dinner was the highlight of our trip. Great food, great views, and perfect organization.",
        image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop",
        name: "Thomas Anderson",
        role: "Foodie",
    },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


export default function Testimonials() {
    return (
        <section className="bg-white py-24 relative overflow-hidden">

            <div className="container z-10 mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-16 text-center"
                >
                    <div className="inline-block mb-6">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm bg-secondary/5">
                            Testimonials
                        </span>
                    </div>

                    <h2 className="text-[32px] lg:text-[42px] leading-tight font-cabinet font-extrabold text-primary mb-6">
                        Real Experiences from Travelers Who Trusted Us
                    </h2>
                    <p className="text-gray-600 font-satoshi text-md leading-relaxed">
                        Hear from our clients about their journeys with Barbaros Tourism. From seamless travel planning to exceptional medical tourism services, these real stories reflect our commitment to quality, care, and unforgettable experiences.
                    </p>
                </motion.div>

                <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[740px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={35} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={45} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
                </div>
            </div>
        </section>
    );
};
