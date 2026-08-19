'use client';

import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";
import { useSiteContent } from '@/contexts/SiteContentContext';

export default function Testimonials() {
    const { generic } = useSiteContent();
    const content = generic.home_testimonials;

    const testimonials = content.items.map((item: { photo: string; text: string; name: string; role: string }) => ({
        ...item,
        image: item.photo,
    }));

    const firstColumn = testimonials.slice(0, 3);
    const secondColumn = testimonials.slice(3, 6);
    const thirdColumn = testimonials.slice(6, 9);

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
                            {content.badge}
                        </span>
                    </div>

                    <h2 className="text-[28px] lg:text-[35px] leading-tight font-cabinet font-extrabold text-primary mb-6">
                        {content.heading}
                    </h2>
                    <p className="text-gray-600 font-satoshi text-md leading-relaxed">
                        {content.description}
                    </p>
                </motion.div>

                <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[400px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={35} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={45} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
                </div>
            </div>
        </section>
    );
}
