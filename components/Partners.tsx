'use client';

import React from 'react';

export default function Partners() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-16">
                    {/* Pill Label */}
                    <div className="inline-block mb-6">
                        <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm">
                            Our trusted partners
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-[32px] lg:text-[42px] leading-[36px] lg:leading-[40px] font-cabinet font-extrabold text-primary max-w-3xl">
                        We collaborate with the best to provide you with an exceptional experience
                    </h2>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-12 items-center justify-items-center opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">

                    {/* Aspen Online */}
                    <div className="h-8 relative w-full flex justify-center items-center">
                        <span className="font-cabinet font-bold text-2xl tracking-tighter leading-none text-black">
                            ASPEN<br /><span className="text-lg tracking-normal">ONLINE</span>
                        </span>
                    </div>

                    {/* Crop and Highlight */}
                    <div className="h-12 relative w-full flex justify-center items-center">
                        <div className="text-center font-serif italic text-xl text-black">
                            Crop and <br /> <span className="not-italic font-bold font-cabinet">Highlight</span>
                        </div>
                    </div>

                    {/* N Logo */}
                    <div className="h-12 relative w-full flex justify-center items-center">
                        <svg viewBox="0 0 40 40" className="h-12 w-auto fill-current text-black">
                            <path d="M5,35 L5,5 L15,5 L15,25 L35,5 L35,35 L25,35 L25,15 L5,35 Z" fill="none" stroke="currentColor" strokeWidth="3" />
                        </svg>
                    </div>

                    {/* Millssy */}
                    <div className="h-12 relative w-full flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className="flex gap-1 mb-1">
                                <div className="w-1 h-1 bg-black rounded-full"></div>
                                <div className="w-1 h-1 bg-black rounded-full"></div>
                                <div className="w-1 h-1 bg-black rounded-full"></div>
                            </div>
                            <span className="font-cabinet font-light text-3xl text-black tracking-wide">Millssy</span>
                        </div>
                    </div>

                    {/* Peppermint */}
                    <div className="h-10 relative w-full flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-1 mb-1">
                                <div className="w-2 h-2 rotate-45 bg-black"></div>
                                <div className="w-16 border-t border-dotted border-black"></div>
                            </div>
                            <span className="font-serif text-lg text-black">Peppermint</span>
                        </div>
                    </div>

                    {/* Pixie Labs */}
                    <div className="h-12 relative w-full flex justify-center items-center">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-6 bg-black rounded-[100%] mb-1"></div>
                            <span className="font-serif font-bold text-lg text-black">Pixie Labs</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
