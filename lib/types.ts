export interface Program {
    id: string;
    title: Record<string, string> | string; // Localized or raw JSON
    slug: string;
    description: Record<string, string> | string;
    duration_text: Record<string, string> | string;
    accommodation_type: Record<string, string> | string;
    includes: Record<string, string[]> | string[]; // Localized array or raw
    excludes: Record<string, string[]> | string[];
    itinerary: any; // JSONB
    main_image: string | null;
    images: string[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Trip {
    id: string;
    title: Record<string, string> | string;
    slug: string;
    description: Record<string, string> | string;
    long_description?: Record<string, string> | string;
    price: number;
    duration_days: number;
    images: string[];
    location: Record<string, string> | string;
    itinerary: any;
    includes: string[];
    excludes: string[];
    is_active: boolean;
    category_id?: string;
    category?: {
        name: Record<string, string> | string;
        slug: string;
    };
    created_at: string;
    updated_at: string;
}
