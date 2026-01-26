'use client';

import { useLanguage } from '@/hooks/use-language';

interface TourTabsProps {
    activeTab: string;
    onTabClick: (tab: string) => void;
}

export default function TourTabs({ activeTab, onTabClick }: TourTabsProps) {
    const { t } = useLanguage();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tripDetails = (t as any).tripDetails;

    const tabs = [
        { key: 'Program', label: tripDetails?.tabs?.program || 'Program' },
        { key: 'Inclusions', label: tripDetails?.tabs?.inclusions || 'Inclusions' },
        { key: 'Location', label: tripDetails?.tabs?.location || 'Location' },
        { key: 'Reviews', label: tripDetails?.tabs?.reviews || 'Reviews' }
    ];

    return (
        <div className=" top-20 z-30 bg-white border-b border-gray-100 mb-8 -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => onTabClick(tab.key)}
                        className={`py-4 text-sm font-bold font-cabinet border-b-2 transition-all whitespace-nowrap ${activeTab === tab.key
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
