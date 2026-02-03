'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/hooks/use-language';

interface QuickAction {
    id: string;
    title: string;
    description: string;
    icon_url: string;
    link_url: string;
    sort_order: number;
}

interface QuickActionsProps {
    actions?: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
    const { t } = useLanguage();

    // If no actions (or empty array), normally we'd hide or show text.
    // Design requirement: "replace this section... with section like the second image"
    // Second image shows a grid of cards: Icon, Title, Description.

    if (!actions || actions.length === 0) {
        return null;
    }

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="border border-secondary/20 rounded-full px-6 py-2 text-secondary font-bold font-cabinet text-sm inline-block mb-4">
                        {t.home.quickActions?.subheading || 'Explore Our Services'}
                    </span>
                    <h2 className="text-[28px] lg:text-[40px] leading-[1.1] font-cabinet font-bold text-primary mb-4">
                        {t.home.quickActions?.heading || 'Quick Actions'}
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto font-satoshi">
                        {t.home.quickActions?.description || 'Choose from our wide range of services designed to meet your needs.'}
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {actions.map((action) => (
                        <div key={action.id} className="bg-white border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full flex flex-col items-center text-center md:items-start md:text-left relative overflow-hidden">
                            {/* Hover Effect Background */}
                            {/* <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/5 transition-colors duration-300" /> */}

                            {/* Icon */}
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-3 group-hover:bg-secondary group-hover:text-white transition-all duration-300 text-primary">
                                {action.icon_url ? (
                                    <img
                                        src={action.icon_url}
                                        alt=""
                                        className="w-8 h-8 object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                                    />
                                ) : (
                                    // Fallback icon
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                )}
                            </div>

                            <h3 className="text-2xl font-bold font-cabinet text-primary mb-3 group-hover:text-secondary transition-colors">
                                {action.title}
                            </h3>

                            <p className="text-gray-500 font-satoshi leading-relaxed mb-6 flex-grow">
                                {action.description}
                            </p>

                            {action.link_url && (
                                <Link
                                    href={action.link_url}
                                    className="absolute inset-0"
                                    aria-label={action.title}
                                >
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
