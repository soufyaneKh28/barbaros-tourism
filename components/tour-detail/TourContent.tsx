'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import TourTabs from "./TourTabs";
import TourOverview from "./TourOverview";
import TourAmenities from "./TourAmenities";
import TourProgram from "./TourProgram";
import TourLocation from "./TourLocation";
import TourPolicies from "./TourPolicies";
import TourReviews from "./TourReviews";

interface TourContentProps {
    description: string;
    location: string;
    itinerary?: any[];
    includes?: string[];
    excludes?: string[];
}

export default function TourContent({ description, location, itinerary, includes, excludes }: TourContentProps) {
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="lg:col-span-8">
            <TourTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="relative min-h-[300px]">
                <AnimatePresence mode='wait'>
                    {activeTab === 'Overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TourOverview description={description} />
                        </motion.div>
                    )}

                    {activeTab === 'Program' && (
                        <motion.div
                            key="program"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TourProgram itinerary={itinerary || []} />
                        </motion.div>
                    )}

                    {activeTab === 'Inclusions' && (
                        <motion.div
                            key="inclusions"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TourAmenities includes={includes} excludes={excludes} />
                        </motion.div>
                    )}

                    {activeTab === 'Policies' && (
                        <motion.div
                            key="policies"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TourPolicies />
                        </motion.div>
                    )}

                    {activeTab === 'Location' && (
                        <motion.div
                            key="location"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TourLocation address={location} />
                        </motion.div>
                    )}

                    {activeTab === 'Reviews' && (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TourReviews />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
