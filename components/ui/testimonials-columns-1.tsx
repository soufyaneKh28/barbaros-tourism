"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
}

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role }, i) => (
                                <div className="p-8 rounded-3xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 max-w-sm w-full" key={i}>
                                    <div className="text-gray-600 font-satoshi leading-relaxed">{text}</div>
                                    <div className="flex items-center gap-3 mt-6">
                                        <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                            <Image
                                                src={image}
                                                alt={name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="font-bold font-cabinet text-primary tracking-wide leading-tight">{name}</div>
                                            <div className="text-sm text-gray-400 font-satoshi">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};
