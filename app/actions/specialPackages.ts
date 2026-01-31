'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    createSpecialPackage,
    updateSpecialPackage,
    deleteSpecialPackage,
} from '@/lib/services/specialPackages';
import { type Locale } from '@/i18n';

/**
 * Create a new special package from form data
 */
export async function createSpecialPackageAction(formData: FormData) {
    try {
        // Extract multilingual fields
        const packageName = {
            en: formData.get('package_name_en') as string,
            ar: formData.get('package_name_ar') as string,
            tr: formData.get('package_name_tr') as string,
            fr: formData.get('package_name_fr') as string,
        };

        const targetCategories = {
            en: formData.get('target_categories_en') as string,
            ar: formData.get('target_categories_ar') as string,
            tr: formData.get('target_categories_tr') as string,
            fr: formData.get('target_categories_fr') as string,
        };

        const durationNights = {
            en: formData.get('duration_nights_en') as string,
            ar: formData.get('duration_nights_ar') as string,
            tr: formData.get('duration_nights_tr') as string,
            fr: formData.get('duration_nights_fr') as string,
        };

        const dailyItinerary = {
            en: formData.get('daily_itinerary_en') as string,
            ar: formData.get('daily_itinerary_ar') as string,
            tr: formData.get('daily_itinerary_tr') as string,
            fr: formData.get('daily_itinerary_fr') as string,
        };

        const transportation = {
            en: formData.get('transportation_en') as string,
            ar: formData.get('transportation_ar') as string,
            tr: formData.get('transportation_tr') as string,
            fr: formData.get('transportation_fr') as string,
        };

        const includes = {
            en: formData.get('includes_en') as string,
            ar: formData.get('includes_ar') as string,
            tr: formData.get('includes_tr') as string,
            fr: formData.get('includes_fr') as string,
        };

        const excludes = {
            en: formData.get('excludes_en') as string,
            ar: formData.get('excludes_ar') as string,
            tr: formData.get('excludes_tr') as string,
            fr: formData.get('excludes_fr') as string,
        };

        const mainImage = formData.get('main_image') as string;
        const slug = formData.get('slug') as string;

        // Validate required fields
        if (!packageName.en || !mainImage || !slug) {
            throw new Error('Missing required fields');
        }

        // Create the package
        await createSpecialPackage({
            slug,
            package_name: packageName,
            target_categories: targetCategories,
            duration_nights: durationNights,
            daily_itinerary: dailyItinerary,
            transportation,
            includes,
            excludes,
            main_image: mainImage,
        });

        revalidatePath('/en/portal-manage/special-packages');
        return { success: true };
    } catch (error) {
        console.error('Error creating special package:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Update an existing special package from form data
 */
export async function updateSpecialPackageAction(id: string, formData: FormData) {
    try {
        // Extract multilingual fields
        const packageName = {
            en: formData.get('package_name_en') as string,
            ar: formData.get('package_name_ar') as string,
            tr: formData.get('package_name_tr') as string,
            fr: formData.get('package_name_fr') as string,
        };

        const targetCategories = {
            en: formData.get('target_categories_en') as string,
            ar: formData.get('target_categories_ar') as string,
            tr: formData.get('target_categories_tr') as string,
            fr: formData.get('target_categories_fr') as string,
        };

        const durationNights = {
            en: formData.get('duration_nights_en') as string,
            ar: formData.get('duration_nights_ar') as string,
            tr: formData.get('duration_nights_tr') as string,
            fr: formData.get('duration_nights_fr') as string,
        };

        const dailyItinerary = {
            en: formData.get('daily_itinerary_en') as string,
            ar: formData.get('daily_itinerary_ar') as string,
            tr: formData.get('daily_itinerary_tr') as string,
            fr: formData.get('daily_itinerary_fr') as string,
        };

        const transportation = {
            en: formData.get('transportation_en') as string,
            ar: formData.get('transportation_ar') as string,
            tr: formData.get('transportation_tr') as string,
            fr: formData.get('transportation_fr') as string,
        };

        const includes = {
            en: formData.get('includes_en') as string,
            ar: formData.get('includes_ar') as string,
            tr: formData.get('includes_tr') as string,
            fr: formData.get('includes_fr') as string,
        };

        const excludes = {
            en: formData.get('excludes_en') as string,
            ar: formData.get('excludes_ar') as string,
            tr: formData.get('excludes_tr') as string,
            fr: formData.get('excludes_fr') as string,
        };

        const mainImage = formData.get('main_image') as string;
        const slug = formData.get('slug') as string;

        // Update the package
        await updateSpecialPackage(id, {
            slug,
            package_name: packageName,
            target_categories: targetCategories,
            duration_nights: durationNights,
            daily_itinerary: dailyItinerary,
            transportation,
            includes,
            excludes,
            main_image: mainImage,
        });

        revalidatePath('/en/portal-manage/special-packages');
        revalidatePath(`/en/portal-manage/special-packages/${id}/edit`);
        return { success: true };
    } catch (error) {
        console.error('Error updating special package:', error);
        return { success: false, error: (error as Error).message };
    }
}

/**
 * Delete a special package
 */
export async function deleteSpecialPackageAction(id: string) {
    try {
        await deleteSpecialPackage(id);
        revalidatePath('/en/portal-manage/special-packages');
        return { success: true };
    } catch (error) {
        console.error('Error deleting special package:', error);
        return { success: false, error: (error as Error).message };
    }
}
