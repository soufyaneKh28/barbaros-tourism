'use client';

interface TourTabsProps {
    activeTab: string;
    onTabClick: (tab: string) => void;
}

export default function TourTabs({ activeTab, onTabClick }: TourTabsProps) {
    const tabs = ['Overview', 'Program', 'Inclusions', 'Policies', 'Location', 'Reviews'];

    return (
        <div className="sticky top-20 z-30 bg-white border-b border-gray-100 mb-8 -mx-6 px-6 md:mx-0 md:px-0">
            <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabClick(tab)}
                        className={`py-4 text-sm font-bold font-cabinet border-b-2 transition-all whitespace-nowrap ${activeTab === tab
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}
