'use client';

import { useState, useEffect, useRef } from 'react';
import TourTabs from "./TourTabs";
import TourAmenities from "./TourAmenities";
import TourProgram from "./TourProgram";
import TourLocation from "./TourLocation";
import TourReviews from "./TourReviews";

interface TourContentProps {
    location: string;
    itinerary?: any[];
    includes?: string[];
    excludes?: string[];
    locale?: string;
}

export default function TourContent({ location, itinerary, includes, excludes, locale = 'en' }: TourContentProps) {
    const [activeTab, setActiveTab] = useState('Program');
    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const scrollToSection = (sectionId: string) => {
        const section = sectionRefs.current[sectionId];
        if (section) {
            // Use scrollIntoView to avoid forced reflow from getBoundingClientRect
            const headerOffset = 100;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveTab(sectionId);
        }
    };

    // Track scroll position to update active tab using IntersectionObserver
    useEffect(() => {
        const observerOptions = {
            rootMargin: '-150px 0px 0px 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            // Find the first intersecting section from top to bottom
            const intersectingEntries = entries.filter(entry => entry.isIntersecting);
            if (intersectingEntries.length > 0) {
                // Get the topmost intersecting section
                const topEntry = intersectingEntries.reduce((top, entry) => {
                    return entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top;
                });

                const id = topEntry.target.id === 'program' ? 'Program' : 'Inclusions';
                setActiveTab(id);
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        Object.values(sectionRefs.current).forEach(element => {
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="lg:col-span-8">
            <TourTabs activeTab={activeTab} onTabClick={scrollToSection} />

            <div className="space-y-12">
                {/* Program Section */}
                <div ref={(el) => { sectionRefs.current['Program'] = el }} id="program">
                    <TourProgram itinerary={itinerary || []} locale={locale} />
                </div>

                {/* Inclusions Section */}
                <div ref={(el) => { sectionRefs.current['Inclusions'] = el }} id="inclusions">
                    <TourAmenities includes={includes} excludes={excludes} />
                </div>

                {/* Location Section */}
                {/* <div ref={(el) => { sectionRefs.current['Location'] = el }} id="location">
                    <TourLocation address={location} />
                </div> */}

                {/* Reviews Section */}
                {/* <div ref={(el) => { sectionRefs.current['Reviews'] = el }} id="reviews">
                    <TourReviews />
                </div> */}
            </div>
        </div>
    );
}
