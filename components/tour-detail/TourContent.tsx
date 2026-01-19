'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from "motion/react";
import TourTabs from "./TourTabs";
import TourOverview from "./TourOverview";
import TourAmenities from "./TourAmenities";
import TourLocation from "./TourLocation";
import TourPolicies from "./TourPolicies";
import TourReviews from "./TourReviews";

interface TourContentProps {
    description: string;
    location: string;
}

export default function TourContent({ description, location }: TourContentProps) {
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

                    {activeTab === 'Amenities' && (
                        <motion.div
                            key="amenities"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TourAmenities />
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
