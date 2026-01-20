'use client';

import { motion } from 'motion/react';

interface DestinationContentProps {
    content: string;
    highlights: string[];
    climate: string;
}

export default function DestinationContent({ content, highlights, climate }: DestinationContentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            {/* Main Content */}
            <div 
                className="prose prose-lg max-w-none font-satoshi
                    prose-headings:font-cabinet prose-headings:font-bold prose-headings:text-primary
                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-ul:my-6 prose-li:text-gray-700 prose-li:mb-2
                    prose-blockquote:border-l-4 prose-blockquote:border-secondary 
                    prose-blockquote:bg-secondary/5 prose-blockquote:py-4 prose-blockquote:px-6 
                    prose-blockquote:rounded-r-lg prose-blockquote:my-8
                    prose-blockquote:italic prose-blockquote:text-gray-800
                    prose-strong:text-primary prose-strong:font-bold"
                dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Highlights */}
            <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold font-cabinet text-primary mb-6">Top Highlights</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {highlights.map((highlight, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 bg-gray-50 rounded-lg p-4 hover:bg-primary/5 transition-colors"
                        >
                            <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0" />
                            <span className="text-gray-700 font-satoshi font-medium text-sm">{highlight}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Climate Info */}
            <div className="mt-8 bg-blue-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold font-cabinet text-primary mb-2">Climate Information</h4>
                        <p className="text-gray-700 font-satoshi">{climate}</p>
                    </div>
                </div>
            </div>

            {/* Travel Tips */}
            <div className="mt-8 bg-amber-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="font-bold font-cabinet text-primary mb-2">Travel Tip</h4>
                        <p className="text-gray-700 font-satoshi">
                            Book your accommodation and tours in advance, especially during peak season, to secure the best rates and availability.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
