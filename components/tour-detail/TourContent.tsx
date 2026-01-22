'use client';

import { useState, useEffect, useRef } from 'react';
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
    locale?: string;
}

export default function TourContent({ description, location, itinerary, includes, excludes, locale = 'en' }: TourContentProps) {
    const [activeTab, setActiveTab] = useState('Overview');
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const scrollToSection = (sectionId: string) => {
        const section = sectionRefs.current[sectionId];
        if (section) {
            const yOffset = -100; // Offset for sticky header
            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveTab(sectionId);
        }
    };

    // Track scroll position to update active tab
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 150;

            // Check which section is currently in view
            const sections = Object.entries(sectionRefs.current);
            for (let i = sections.length - 1; i >= 0; i--) {
                const [id, element] = sections[i];
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveTab(id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="lg:col-span-8">
            <TourTabs activeTab={activeTab} onTabClick={scrollToSection} />

            <div className="space-y-12">
                {/* Overview Section */}
                <div ref={(el) => { sectionRefs.current['Overview'] = el }} id="overview">
                    <TourOverview description={description} />
                </div>

                {/* Program Section */}
                <div ref={(el) => { sectionRefs.current['Program'] = el }} id="program">
                    <TourProgram itinerary={itinerary || []} locale={locale} />
                </div>

                {/* Inclusions Section */}
                <div ref={(el) => { sectionRefs.current['Inclusions'] = el }} id="inclusions">
                    <TourAmenities includes={includes} excludes={excludes} />
                </div>

                {/* Policies Section */}
                <div ref={(el) => { sectionRefs.current['Policies'] = el }} id="policies">
                    <TourPolicies />
                </div>

                {/* Location Section */}
                <div ref={(el) => { sectionRefs.current['Location'] = el }} id="location">
                    <TourLocation address={location} />
                </div>

                {/* Reviews Section */}
                <div ref={(el) => { sectionRefs.current['Reviews'] = el }} id="reviews">
                    <TourReviews />
                </div>
            </div>
        </div>
    );
}
