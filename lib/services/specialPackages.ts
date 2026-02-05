import { createClient } from '@/utils/supabase/server';
import { type Locale } from '@/i18n';

export interface SpecialPackage {
    id: string;
    slug: string;
    package_name: string;
    target_categories: string;
    duration_nights: string;
    daily_itinerary: string;
    transportation: string;
    includes: string;
    excludes: string;
    main_image: string;
    is_coming_soon?: boolean;
    created_at: string;
    updated_at: string;
}

export interface SpecialPackageRaw {
    id: string;
    slug: string;
    package_name: Record<Locale, string>;
    target_categories: Record<Locale, string>;
    duration_nights: Record<Locale, string>;
    daily_itinerary: Record<Locale, string>;
    transportation: Record<Locale, string>;
    includes: Record<Locale, string>;
    excludes: Record<Locale, string>;
    main_image: string;
    display_order: number;
    is_coming_soon?: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * Get all special packages with localized content
 */
export async function getSpecialPackages(locale: Locale = 'en'): Promise<SpecialPackage[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('special_packages')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching special packages:', error);
        throw error;
    }

    // Transform multilingual fields to locale-specific strings
    return (data as SpecialPackageRaw[]).map((pkg) => ({
        id: pkg.id,
        slug: pkg.slug,
        package_name: pkg.package_name[locale] || pkg.package_name.en,
        target_categories: pkg.target_categories[locale] || pkg.target_categories.en,
        duration_nights: pkg.duration_nights[locale] || pkg.duration_nights.en,
        daily_itinerary: pkg.daily_itinerary[locale] || pkg.daily_itinerary.en,
        transportation: pkg.transportation[locale] || pkg.transportation.en,
        includes: pkg.includes[locale] || pkg.includes.en,
        excludes: pkg.excludes[locale] || pkg.excludes.en,
        main_image: pkg.main_image,
        is_coming_soon: pkg.is_coming_soon,
        created_at: pkg.created_at,
        updated_at: pkg.updated_at,
    }));
}

/**
 * Get all special packages (raw data for admin)
 */
export async function getAllSpecialPackages(): Promise<SpecialPackageRaw[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('special_packages')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching all special packages:', error);
        throw error;
    }

    return data as SpecialPackageRaw[];
}


/**
 * Get a single special package by slug with localized content
 */
export async function getSpecialPackageBySlug(
    slug: string,
    locale: Locale = 'en'
): Promise<SpecialPackage | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('special_packages')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        console.error('Error fetching special package:', error);
        return null;
    }

    const pkg = data as SpecialPackageRaw;

    return {
        id: pkg.id,
        slug: pkg.slug,
        package_name: pkg.package_name[locale] || pkg.package_name.en,
        target_categories: pkg.target_categories[locale] || pkg.target_categories.en,
        duration_nights: pkg.duration_nights[locale] || pkg.duration_nights.en,
        daily_itinerary: pkg.daily_itinerary[locale] || pkg.daily_itinerary.en,
        transportation: pkg.transportation[locale] || pkg.transportation.en,
        includes: pkg.includes[locale] || pkg.includes.en,
        excludes: pkg.excludes[locale] || pkg.excludes.en,
        main_image: pkg.main_image,
        is_coming_soon: pkg.is_coming_soon,
        created_at: pkg.created_at,
        updated_at: pkg.updated_at,
    };
}

/**
 * Get a special package by ID (returns raw multilingual data for editing)
 */
export async function getSpecialPackageById(id: string): Promise<SpecialPackageRaw | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('special_packages')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching special package by ID:', error);
        return null;
    }

    return data as SpecialPackageRaw;
}

/**
 * Create a new special package
 */
export async function createSpecialPackage(packageData: Omit<SpecialPackageRaw, 'id' | 'created_at' | 'updated_at' | 'display_order'> & { display_order?: number }) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('special_packages')
        .insert([packageData])
        .select()
        .single();

    if (error) {
        console.error('Error creating special package:', error);
        throw error;
    }

    return data;
}

/**
 * Update an existing special package
 */
export async function updateSpecialPackage(
    id: string,
    packageData: Partial<Omit<SpecialPackageRaw, 'id' | 'created_at' | 'updated_at'>>
) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('special_packages')
        .update({ ...packageData, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Error updating special package:', error);
        throw error;
    }

    return data;
}

/**
 * Delete a special package
 */
export async function deleteSpecialPackage(id: string) {
    const supabase = await createClient();

    const { error } = await supabase
        .from('special_packages')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting special package:', error);
        throw error;
    }

    return true;
}
