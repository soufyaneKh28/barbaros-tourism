// Client-safe types & constants for the Website Content CMS.
//
// This file must NEVER import anything server-only (no `next/headers`, no
// `@/utils/supabase/server`). Client components (the admin overview grid,
// the per-section edit form) import from here directly so their bundle
// never pulls in server-only code. The server-only data-fetching functions
// (getSiteContentRow, getResolvedSiteContent, etc.) live in
// `@/lib/services/site-content`, which re-exports everything in this file
// for server components to keep using a single import path.

import { type Locale } from '@/i18n/config'

export type MultiLang = Partial<Record<Locale, string>>

export interface HomeHeroContent {
    tagline?: MultiLang
    heading?: MultiLang
    description?: MultiLang
    images?: string[]
    ctaPrimaryLabel?: MultiLang
    ctaPrimaryLink?: string
    ctaPrimaryEnabled?: boolean
    ctaSecondaryLabel?: MultiLang
    ctaSecondaryLink?: string
    ctaSecondaryEnabled?: boolean
}

export interface HeroContent {
    badge?: MultiLang
    heading?: MultiLang
    description?: MultiLang
    image?: string
}

export interface FooterContentData {
    about?: MultiLang
}

export interface GlobalSettingsData {
    logo?: string
    phone?: string
    email?: string
    officeName?: MultiLang
    officeAddress?: MultiLang
    officeCity?: MultiLang
    hoursMonFri?: MultiLang
    hoursSat?: MultiLang
    hoursSun?: MultiLang
    facebookUrl?: string
    instagramUrl?: string
    linkedinUrl?: string
}

// Simple page-hero sections: badge + heading + description (+ image for most).
// Keyed by the site_content.key value used both in the DB and the admin form.
export const HERO_SECTION_KEYS = [
    'about_hero',
    'contact_hero',
    'services_hero',
    'tours_hero',
    'medical_hero',
    'vip_programs_hero',
    'vip_tourism_services_hero',
    'special_packages_hero',
    'immigration_hero',
    'daily_tours_hero',
    'programs_hero',
    'blogs_hero',
] as const

export type HeroSectionKey = (typeof HERO_SECTION_KEYS)[number]

export type SiteContentKey = 'home_hero' | 'footer_content' | 'global_settings' | HeroSectionKey

// ---------------------------------------------------------------------------
// Generic sections — everything beyond hero banners (page body copy, list
// content like stats/testimonials/reasons). One schema-driven engine handles
// all of these instead of a bespoke type/form/action per section.
// ---------------------------------------------------------------------------

export const GENERIC_SECTION_KEYS = [
    'home_quick_actions',
    'home_hot_deals',
    'home_featured_programs',
    'home_testimonials',
    'home_video_section',
    'home_partners',
    'home_blogs',
    'about_story',
    'about_stats',
    'about_why_choose',
    'contact_form',
    'contact_info',
    'contact_map',
    'services_offerings',
    'services_cta',
    'tours_carousel_headers',
    'medical_why_choose',
    'immigration_citizenship_header',
    'immigration_residence_header',
    'immigration_cta',
    'special_packages_content',
    'vip_programs_content',
    'vip_tourism_services_content',
    'programs_content',
    'daily_tours_content',
    'blogs_content',
] as const

export type GenericSectionKey = (typeof GENERIC_SECTION_KEYS)[number]

export type GenericFieldType = 'text' | 'textarea' | 'image'

export interface GenericFieldSchema {
    key: string
    label: string
    type: GenericFieldType
    /** Defaults to true for text/textarea; always false for image. */
    multiLang?: boolean
    /** Passed through to MultiLangInput's `type` prop for link-shaped fields. */
    inputType?: 'text' | 'url'
    placeholder?: string
    rows?: number
}

export interface GenericListSchema {
    key: string
    label: string
    itemLabel: string
    itemFields: GenericFieldSchema[]
}

export interface GenericSectionSchema {
    fields: GenericFieldSchema[]
    lists?: GenericListSchema[]
}

export function isMultiLangField(f: GenericFieldSchema): boolean {
    return f.type !== 'image' && f.multiLang !== false
}

// Field-level schema for every generic section, shared by the admin edit
// form (which field/list to render) and the public resolver (which fields
// are multi-lang vs. plain vs. image).
export const GENERIC_SCHEMAS: Record<GenericSectionKey, GenericSectionSchema> = {
    home_quick_actions: {
        fields: [
            { key: 'subheading', label: 'Subheading Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
        ],
    },
    home_hot_deals: {
        fields: [
            { key: 'badge', label: 'Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'viewDealLabel', label: '"View Deal" Button Text', type: 'text' },
        ],
    },
    home_featured_programs: {
        fields: [
            { key: 'badge', label: 'Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'viewAllLabel', label: '"View All" Link Text', type: 'text' },
        ],
    },
    home_testimonials: {
        fields: [
            { key: 'badge', label: 'Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
        ],
        lists: [
            {
                key: 'items', label: 'Testimonials', itemLabel: 'Testimonial',
                itemFields: [
                    { key: 'photo', label: 'Photo', type: 'image' },
                    { key: 'text', label: 'Quote', type: 'textarea' },
                    { key: 'name', label: 'Name', type: 'text' },
                    { key: 'role', label: 'Role', type: 'text' },
                ],
            },
        ],
    },
    home_video_section: {
        fields: [
            { key: 'subtitle', label: 'Subtitle', type: 'text' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'ctaLabel', label: 'Button Text', type: 'text' },
            { key: 'backgroundImage', label: 'Background Image', type: 'image' },
            { key: 'videoUrl', label: 'YouTube Video URL', type: 'text', multiLang: false, inputType: 'url', placeholder: 'https://www.youtube.com/watch?v=...' },
        ],
    },
    home_partners: {
        fields: [
            { key: 'badge', label: 'Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
        ],
        lists: [
            {
                key: 'items', label: 'Partner Logos', itemLabel: 'Partner',
                itemFields: [
                    { key: 'name', label: 'Name', type: 'text', multiLang: false },
                    { key: 'logo', label: 'Logo', type: 'image' },
                ],
            },
        ],
    },
    home_blogs: {
        fields: [
            { key: 'badge', label: 'Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'seeAllLabel', label: '"See All" Button Text', type: 'text' },
            { key: 'readMoreLabel', label: '"Read More" Text', type: 'text' },
        ],
    },
    about_story: {
        fields: [
            { key: 'badge', label: 'Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'p1', label: 'Paragraph 1', type: 'textarea' },
            { key: 'p2', label: 'Paragraph 2', type: 'textarea' },
            { key: 'p3', label: 'Paragraph 3', type: 'textarea' },
            { key: 'readMoreLabel', label: 'Button Text', type: 'text' },
            { key: 'image1', label: 'Image 1', type: 'image' },
            { key: 'image2', label: 'Image 2', type: 'image' },
        ],
    },
    about_stats: {
        fields: [
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
        ],
        lists: [
            {
                key: 'items', label: 'Stats', itemLabel: 'Stat',
                itemFields: [
                    { key: 'value', label: 'Value (e.g. 10,000+)', type: 'text', multiLang: false },
                    { key: 'label', label: 'Label', type: 'text' },
                ],
            },
        ],
    },
    about_why_choose: {
        fields: [
            { key: 'heading', label: 'Heading', type: 'text' },
        ],
        lists: [
            {
                key: 'items', label: 'Reasons', itemLabel: 'Reason',
                itemFields: [
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                ],
            },
        ],
    },
    contact_form: {
        fields: [
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'subheading', label: 'Subheading', type: 'text' },
            { key: 'firstNameLabel', label: 'First Name — Label', type: 'text' },
            { key: 'lastNameLabel', label: 'Last Name — Label', type: 'text' },
            { key: 'emailLabel', label: 'Email — Label', type: 'text' },
            { key: 'phoneLabel', label: 'Phone — Label', type: 'text' },
            { key: 'interestPlaceholder', label: 'Interest — Placeholder', type: 'text' },
            { key: 'messageLabel', label: 'Message — Label', type: 'text' },
            { key: 'submitLabel', label: 'Submit Button Text', type: 'text' },
            { key: 'optionCultural', label: 'Interest Option — Cultural Tours', type: 'text' },
            { key: 'optionAdventure', label: 'Interest Option — Adventure Tours', type: 'text' },
            { key: 'optionHair', label: 'Interest Option — Hair Transplant', type: 'text' },
            { key: 'optionDental', label: 'Interest Option — Dental', type: 'text' },
            { key: 'optionCosmetic', label: 'Interest Option — Cosmetic Surgery', type: 'text' },
            { key: 'optionCustom', label: 'Interest Option — Custom Package', type: 'text' },
            { key: 'optionOther', label: 'Interest Option — Other', type: 'text' },
            { key: 'successMessage', label: 'Success Message', type: 'text' },
            { key: 'fullNameError', label: 'Validation — Name Error', type: 'text' },
            { key: 'emailError', label: 'Validation — Email Error', type: 'text' },
            { key: 'messageError', label: 'Validation — Message Error', type: 'text' },
        ],
    },
    contact_info: {
        fields: [
            { key: 'phoneLabel', label: 'Card Title — Phone', type: 'text' },
            { key: 'emailLabel', label: 'Card Title — Email', type: 'text' },
            { key: 'officeLabel', label: 'Card Title — Office', type: 'text' },
            { key: 'hoursLabel', label: 'Card Title — Hours', type: 'text' },
            { key: 'connectLabel', label: 'Card Title — Connect With Us', type: 'text' },
        ],
    },
    contact_map: {
        fields: [
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'addressLine1', label: 'Address Line 1', type: 'text' },
            { key: 'addressLine2', label: 'Address Line 2', type: 'text' },
            { key: 'buttonLabel', label: 'Button Text', type: 'text' },
            { key: 'mapUrl', label: 'Google Maps Link', type: 'text', multiLang: false, inputType: 'url' },
            { key: 'backgroundImage', label: 'Background Image', type: 'image' },
        ],
    },
    services_offerings: {
        fields: [
            { key: 'badge', label: 'Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'ctaButtonLabel', label: 'Default CTA Button Text', type: 'text' },
        ],
        lists: [
            {
                key: 'items', label: 'Offerings', itemLabel: 'Offering',
                itemFields: [
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'image', label: 'Image', type: 'image' },
                ],
            },
        ],
    },
    services_cta: {
        fields: [
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'button1Label', label: 'Button 1 Text (Contact Us)', type: 'text' },
            { key: 'button2Label', label: 'Button 2 Text (Explore Tours)', type: 'text' },
        ],
    },
    tours_carousel_headers: {
        fields: [
            { key: 'dailyToursBadge', label: 'Daily Tours — Badge', type: 'text' },
            { key: 'dailyToursTitle', label: 'Daily Tours — Title', type: 'text' },
            { key: 'dailyToursDescription', label: 'Daily Tours — Description', type: 'textarea' },
            { key: 'specialPackagesBadge', label: 'Specialized Packages — Badge', type: 'text' },
            { key: 'specialPackagesTitle', label: 'Specialized Packages — Title', type: 'text' },
            { key: 'specialPackagesDescription', label: 'Specialized Packages — Description', type: 'textarea' },
            { key: 'vipServicesBadge', label: 'VIP Services — Badge', type: 'text' },
            { key: 'vipServicesTitle', label: 'VIP Services — Title', type: 'text' },
            { key: 'vipServicesDescription', label: 'VIP Services — Description', type: 'textarea' },
        ],
    },
    medical_why_choose: {
        fields: [
            { key: 'badge', label: 'Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
        ],
        lists: [
            {
                key: 'items', label: 'Reasons', itemLabel: 'Reason',
                itemFields: [
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                ],
            },
        ],
    },
    immigration_citizenship_header: {
        fields: [
            { key: 'badge', label: 'Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'emptyStateMessage', label: 'Empty State Message', type: 'text' },
            { key: 'viewAllLabel', label: '"View All" Button Text', type: 'text' },
            { key: 'fallbackImage', label: 'Fallback Card Image', type: 'image' },
        ],
    },
    immigration_residence_header: {
        fields: [
            { key: 'badge', label: 'Badge', type: 'text' },
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'emptyStateMessage', label: 'Empty State Message', type: 'text' },
            { key: 'viewAllLabel', label: '"View All" Button Text', type: 'text' },
            { key: 'fallbackImage', label: 'Fallback Card Image', type: 'image' },
        ],
    },
    immigration_cta: {
        fields: [
            { key: 'heading', label: 'Heading', type: 'text' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'buttonLabel', label: 'Button Text', type: 'text' },
            { key: 'backgroundImage', label: 'Background Image', type: 'image' },
        ],
    },
    special_packages_content: {
        fields: [
            { key: 'emptyStateMessage', label: 'Empty State Message', type: 'text' },
            { key: 'noImageLabel', label: '"No Image" Placeholder', type: 'text' },
            { key: 'comingSoonLabel', label: '"Coming Soon" Badge', type: 'text' },
            { key: 'viewDetailsLabel', label: '"View Details" Link Text', type: 'text' },
        ],
    },
    vip_programs_content: {
        fields: [
            { key: 'emptyStateMessage', label: 'Empty State Message', type: 'text' },
        ],
    },
    vip_tourism_services_content: {
        fields: [
            { key: 'emptyStateMessage', label: 'Empty State Message', type: 'text' },
            { key: 'noImageLabel', label: '"No Image" Placeholder', type: 'text' },
            { key: 'comingSoonLabel', label: '"Coming Soon" Badge', type: 'text' },
        ],
    },
    programs_content: {
        fields: [
            { key: 'emptyStateMessage', label: 'Empty State Message', type: 'text' },
            { key: 'noImageLabel', label: '"No Image" Placeholder', type: 'text' },
            { key: 'comingSoonLabel', label: '"Coming Soon" Badge', type: 'text' },
        ],
    },
    daily_tours_content: {
        fields: [
            { key: 'emptyStateMessage', label: 'Empty State Message', type: 'text' },
        ],
    },
    blogs_content: {
        fields: [
            { key: 'category', label: 'Category', type: 'text' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
            { key: 'image', label: 'Image', type: 'image' },
            { key: 'author', label: 'Author', type: 'text' },
            { key: 'date', label: 'Date', type: 'text' },
            { key: 'readTime', label: 'Read Time', type: 'text' },
        ],
    },
}

export interface RawSiteContent {
    home_hero: HomeHeroContent
    footer_content: FooterContentData
    global_settings: GlobalSettingsData
    about_hero: HeroContent
    contact_hero: HeroContent
    services_hero: HeroContent
    tours_hero: HeroContent
    medical_hero: HeroContent
    vip_programs_hero: HeroContent
    vip_tourism_services_hero: HeroContent
    special_packages_hero: HeroContent
    immigration_hero: HeroContent
    daily_tours_hero: HeroContent
    programs_hero: HeroContent
    blogs_hero: HeroContent
}

export const ALL_SITE_CONTENT_KEYS = ['home_hero', 'footer_content', 'global_settings', ...HERO_SECTION_KEYS, ...GENERIC_SECTION_KEYS] as const

export const EMPTY_RAW_SITE_CONTENT: RawSiteContent = {
    home_hero: {},
    footer_content: {},
    global_settings: {},
    about_hero: {},
    contact_hero: {},
    services_hero: {},
    tours_hero: {},
    medical_hero: {},
    vip_programs_hero: {},
    vip_tourism_services_hero: {},
    special_packages_hero: {},
    immigration_hero: {},
    daily_tours_hero: {},
    programs_hero: {},
    blogs_hero: {},
}

// ---------------------------------------------------------------------------
// Section registry — single source of truth for both the admin "Website
// Content" card grid and each section's dedicated edit page.
// ---------------------------------------------------------------------------

export type SiteContentSectionType = 'home' | 'hero' | 'footer' | 'global' | 'generic'

export type SiteContentSectionGroup =
    | 'Homepage' | 'About Us' | 'Contact Us' | 'Our Services' | 'Tours' | 'Medical Tourism'
    | 'Immigration' | 'Special Packages' | 'VIP Programs' | 'VIP Tourism Services'
    | 'Programs' | 'Blog' | 'Global'

// The top-level "Website Content" landing page shows one card per group
// (roughly one per public page); clicking through lists that group's
// section cards. Slugs back the /website-content/[group] route.
export interface SiteContentGroupMeta {
    name: SiteContentSectionGroup
    slug: string
    blurb: string
    publicPath: string | null
}

export const SITE_CONTENT_GROUPS: SiteContentGroupMeta[] = [
    { name: 'Homepage', slug: 'homepage', blurb: 'The first thing visitors see.', publicPath: '/' },
    { name: 'About Us', slug: 'about-us', blurb: 'Story, stats, and why-choose-us copy.', publicPath: '/about-us' },
    { name: 'Contact Us', slug: 'contact-us', blurb: 'Form, contact cards, and map section.', publicPath: '/contact-us' },
    { name: 'Our Services', slug: 'our-services', blurb: 'Offerings and call-to-action.', publicPath: '/our-services' },
    { name: 'Tours', slug: 'tours', blurb: 'Hero, carousel headers, and daily tours.', publicPath: '/tours' },
    { name: 'Medical Tourism', slug: 'medical-tourism', blurb: 'Hero and why-choose-Türkiye reasons.', publicPath: '/medical-tourism' },
    { name: 'Immigration', slug: 'immigration', blurb: 'Citizenship, residence, and call-to-action.', publicPath: '/immigration' },
    { name: 'Special Packages', slug: 'special-packages', blurb: 'Hero and grid labels.', publicPath: '/special-tourism-packages' },
    { name: 'VIP Programs', slug: 'vip-programs', blurb: 'Hero and grid labels.', publicPath: '/vip-programs' },
    { name: 'VIP Tourism Services', slug: 'vip-tourism-services', blurb: 'Hero and grid labels.', publicPath: '/vip-tourism-services' },
    { name: 'Programs', slug: 'programs', blurb: 'Header and grid labels.', publicPath: '/programs' },
    { name: 'Blog', slug: 'blog', blurb: 'Header and fallback post content.', publicPath: '/blogs' },
    { name: 'Global', slug: 'global', blurb: 'Shared across the header, footer, and contact details.', publicPath: null },
]

export function getGroupMeta(slug: string): SiteContentGroupMeta | undefined {
    return SITE_CONTENT_GROUPS.find(g => g.slug === slug)
}

export function getGroupSlug(group: SiteContentSectionGroup): string {
    return SITE_CONTENT_GROUPS.find(g => g.name === group)?.slug || group.toLowerCase().replace(/\s+/g, '-')
}

export interface SiteContentSectionMeta {
    key: string
    type: SiteContentSectionType
    group: SiteContentSectionGroup
    title: string
    pageLabel: string
    publicPath: string | null
    hasImage: boolean
    schema?: GenericSectionSchema
}

export const SITE_CONTENT_SECTIONS: SiteContentSectionMeta[] = [
    { key: 'home_hero', type: 'home', group: 'Homepage', title: 'Homepage Hero', pageLabel: 'Home', publicPath: '/', hasImage: true },
    { key: 'home_quick_actions', type: 'generic', group: 'Homepage', title: 'Quick Actions — Header', pageLabel: 'Home', publicPath: '/', hasImage: false, schema: GENERIC_SCHEMAS.home_quick_actions },
    { key: 'home_hot_deals', type: 'generic', group: 'Homepage', title: 'Hot Deals — Header', pageLabel: 'Home', publicPath: '/', hasImage: false, schema: GENERIC_SCHEMAS.home_hot_deals },
    { key: 'home_featured_programs', type: 'generic', group: 'Homepage', title: 'Featured Programs — Header', pageLabel: 'Home', publicPath: '/', hasImage: false, schema: GENERIC_SCHEMAS.home_featured_programs },
    { key: 'home_testimonials', type: 'generic', group: 'Homepage', title: 'Testimonials', pageLabel: 'Home', publicPath: '/', hasImage: false, schema: GENERIC_SCHEMAS.home_testimonials },
    { key: 'home_video_section', type: 'generic', group: 'Homepage', title: 'Video Section', pageLabel: 'Home', publicPath: '/', hasImage: true, schema: GENERIC_SCHEMAS.home_video_section },
    { key: 'home_partners', type: 'generic', group: 'Homepage', title: 'Partners', pageLabel: 'Home', publicPath: '/', hasImage: false, schema: GENERIC_SCHEMAS.home_partners },
    { key: 'home_blogs', type: 'generic', group: 'Homepage', title: 'Blog Preview — Header', pageLabel: 'Home', publicPath: '/', hasImage: false, schema: GENERIC_SCHEMAS.home_blogs },

    { key: 'about_hero', type: 'hero', group: 'About Us', title: 'About Us — Hero', pageLabel: 'About Us', publicPath: '/about-us', hasImage: true },
    { key: 'about_story', type: 'generic', group: 'About Us', title: 'Our Story', pageLabel: 'About Us', publicPath: '/about-us', hasImage: true, schema: GENERIC_SCHEMAS.about_story },
    { key: 'about_stats', type: 'generic', group: 'About Us', title: 'Stats', pageLabel: 'About Us', publicPath: '/about-us', hasImage: false, schema: GENERIC_SCHEMAS.about_stats },
    { key: 'about_why_choose', type: 'generic', group: 'About Us', title: 'Why Choose Us', pageLabel: 'About Us', publicPath: '/about-us', hasImage: false, schema: GENERIC_SCHEMAS.about_why_choose },

    { key: 'contact_hero', type: 'hero', group: 'Contact Us', title: 'Contact Us — Hero', pageLabel: 'Contact Us', publicPath: '/contact-us', hasImage: false },
    { key: 'contact_form', type: 'generic', group: 'Contact Us', title: 'Contact Form', pageLabel: 'Contact Us', publicPath: '/contact-us', hasImage: false, schema: GENERIC_SCHEMAS.contact_form },
    { key: 'contact_info', type: 'generic', group: 'Contact Us', title: 'Contact Info Labels', pageLabel: 'Contact Us', publicPath: '/contact-us', hasImage: false, schema: GENERIC_SCHEMAS.contact_info },
    { key: 'contact_map', type: 'generic', group: 'Contact Us', title: 'Map Section', pageLabel: 'Contact Us', publicPath: '/contact-us', hasImage: true, schema: GENERIC_SCHEMAS.contact_map },

    { key: 'services_hero', type: 'hero', group: 'Our Services', title: 'Our Services — Hero', pageLabel: 'Our Services', publicPath: '/our-services', hasImage: true },
    { key: 'services_offerings', type: 'generic', group: 'Our Services', title: 'Offerings', pageLabel: 'Our Services', publicPath: '/our-services', hasImage: false, schema: GENERIC_SCHEMAS.services_offerings },
    { key: 'services_cta', type: 'generic', group: 'Our Services', title: 'Call to Action', pageLabel: 'Our Services', publicPath: '/our-services', hasImage: false, schema: GENERIC_SCHEMAS.services_cta },

    { key: 'tours_hero', type: 'hero', group: 'Tours', title: 'Tours — Hero', pageLabel: 'Tours', publicPath: '/tours', hasImage: true },
    { key: 'tours_carousel_headers', type: 'generic', group: 'Tours', title: 'Carousel Headers', pageLabel: 'Tours', publicPath: '/tours', hasImage: false, schema: GENERIC_SCHEMAS.tours_carousel_headers },

    { key: 'medical_hero', type: 'hero', group: 'Medical Tourism', title: 'Medical Tourism — Hero', pageLabel: 'Medical Tourism', publicPath: '/medical-tourism', hasImage: true },
    { key: 'medical_why_choose', type: 'generic', group: 'Medical Tourism', title: 'Why Choose Türkiye', pageLabel: 'Medical Tourism', publicPath: '/medical-tourism', hasImage: false, schema: GENERIC_SCHEMAS.medical_why_choose },

    { key: 'immigration_hero', type: 'hero', group: 'Immigration', title: 'Immigration — Hero', pageLabel: 'Immigration', publicPath: '/immigration', hasImage: true },
    { key: 'immigration_citizenship_header', type: 'generic', group: 'Immigration', title: 'Citizenship Section', pageLabel: 'Immigration', publicPath: '/immigration', hasImage: true, schema: GENERIC_SCHEMAS.immigration_citizenship_header },
    { key: 'immigration_residence_header', type: 'generic', group: 'Immigration', title: 'Residence Section', pageLabel: 'Immigration', publicPath: '/immigration', hasImage: true, schema: GENERIC_SCHEMAS.immigration_residence_header },
    { key: 'immigration_cta', type: 'generic', group: 'Immigration', title: 'Call to Action', pageLabel: 'Immigration', publicPath: '/immigration', hasImage: true, schema: GENERIC_SCHEMAS.immigration_cta },

    { key: 'special_packages_hero', type: 'hero', group: 'Special Packages', title: 'Special Tourism Packages — Hero', pageLabel: 'Special Tourism Packages', publicPath: '/special-tourism-packages', hasImage: true },
    { key: 'special_packages_content', type: 'generic', group: 'Special Packages', title: 'Grid Labels', pageLabel: 'Special Tourism Packages', publicPath: '/special-tourism-packages', hasImage: false, schema: GENERIC_SCHEMAS.special_packages_content },

    { key: 'vip_programs_hero', type: 'hero', group: 'VIP Programs', title: 'VIP Programs — Hero', pageLabel: 'VIP Programs', publicPath: '/vip-programs', hasImage: true },
    { key: 'vip_programs_content', type: 'generic', group: 'VIP Programs', title: 'Grid Labels', pageLabel: 'VIP Programs', publicPath: '/vip-programs', hasImage: false, schema: GENERIC_SCHEMAS.vip_programs_content },

    { key: 'vip_tourism_services_hero', type: 'hero', group: 'VIP Tourism Services', title: 'VIP Tourism Services — Hero', pageLabel: 'VIP Tourism Services', publicPath: '/vip-tourism-services', hasImage: true },
    { key: 'vip_tourism_services_content', type: 'generic', group: 'VIP Tourism Services', title: 'Grid Labels', pageLabel: 'VIP Tourism Services', publicPath: '/vip-tourism-services', hasImage: false, schema: GENERIC_SCHEMAS.vip_tourism_services_content },

    { key: 'programs_hero', type: 'hero', group: 'Programs', title: 'Programs — Header', pageLabel: 'Programs', publicPath: '/programs', hasImage: false },
    { key: 'programs_content', type: 'generic', group: 'Programs', title: 'Grid Labels', pageLabel: 'Programs', publicPath: '/programs', hasImage: false, schema: GENERIC_SCHEMAS.programs_content },

    { key: 'daily_tours_hero', type: 'hero', group: 'Tours', title: 'Daily Tours — Hero', pageLabel: 'Daily Tours', publicPath: '/daily-tours', hasImage: true },
    { key: 'daily_tours_content', type: 'generic', group: 'Tours', title: 'Daily Tours — Grid Labels', pageLabel: 'Daily Tours', publicPath: '/daily-tours', hasImage: false, schema: GENERIC_SCHEMAS.daily_tours_content },

    { key: 'blogs_hero', type: 'hero', group: 'Blog', title: 'Blog — Header', pageLabel: 'Blog', publicPath: '/blogs', hasImage: false },
    { key: 'blogs_content', type: 'generic', group: 'Blog', title: 'Fallback Post', pageLabel: 'Blog', publicPath: '/blogs', hasImage: true, schema: GENERIC_SCHEMAS.blogs_content },

    { key: 'footer_content', type: 'footer', group: 'Global', title: 'Footer', pageLabel: 'Footer', publicPath: null, hasImage: false },
    { key: 'global_settings', type: 'global', group: 'Global', title: 'Logo, Contact & Social', pageLabel: 'Site-wide', publicPath: null, hasImage: true },
]

export function getSectionMeta(key: string): SiteContentSectionMeta | undefined {
    return SITE_CONTENT_SECTIONS.find(s => s.key === key)
}

export interface SiteContentRow {
    key: string
    data: Record<string, any>
    updated_at: string | null
}

export interface ResolvedHero {
    badge: string
    heading: string
    description: string
    image: string
}

export interface ResolvedSiteContent {
    hero: {
        tagline: string
        heading: string
        description: string
        images: string[]
        ctaPrimaryLabel: string
        ctaPrimaryLink: string
        ctaPrimaryEnabled: boolean
        ctaSecondaryLabel: string
        ctaSecondaryLink: string
        ctaSecondaryEnabled: boolean
    }
    aboutHero: ResolvedHero
    contactHero: ResolvedHero
    servicesHero: ResolvedHero
    toursHero: ResolvedHero
    medicalHero: ResolvedHero
    vipProgramsHero: ResolvedHero
    vipTourismServicesHero: ResolvedHero
    specialPackagesHero: ResolvedHero
    immigrationHero: ResolvedHero
    dailyToursHero: ResolvedHero
    programsHero: ResolvedHero
    blogsHero: ResolvedHero
    footer: {
        about: string
    }
    global: {
        logo: string
        phone: string
        email: string
        officeName: string
        officeAddress: string
        officeCity: string
        hoursMonFri: string
        hoursSat: string
        hoursSun: string
        facebookUrl: string
        instagramUrl: string
        linkedinUrl: string
    }
    /** Resolved generic sections, keyed by GenericSectionKey. Shape matches each section's schema/defaults. */
    generic: Record<string, Record<string, any>>
}

export const DEFAULT_HERO_IMAGES = [
    '/images/heroBg.png',
    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1794&auto=format&fit=crop',
]

export const DEFAULT_HOME_HERO = {
    tagline: 'Trusted Tourism Services in Turkey',
    heading: 'Barbaros Tourism Your reliable partner in Türkiye',
    description: 'Comprehensive tourism solutions in Türkiye - from unforgettable tours to world-class medical tourism services.',
    ctaPrimaryLabel: 'Explore tours',
    ctaPrimaryLink: '/tours',
    ctaSecondaryLabel: 'Medical tourism',
    ctaSecondaryLink: '/medical-tourism',
}

export const DEFAULT_FOOTER = {
    about: 'Exceptional travel experiences and top-tier medical tourism services in Türkiye. We connect your journey with purpose.',
}

export const DEFAULT_GLOBAL = {
    logo: '/images/logo.png',
    phone: '+90 505 368 88 56',
    email: 'barbaros.grp@gmail.com',
    officeName: 'Barbaros Tourism Agency',
    officeAddress: 'Aksemsettin Mah. Akdeniz Cad. No: 70/2, 1',
    officeCity: 'Fatih, Istanbul, 34080',
    hoursMonFri: 'Mon - Fri: 9:00 AM - 6:00 PM',
    hoursSat: 'Sat: 10:00 AM - 4:00 PM',
    hoursSun: 'Sun: Closed',
    facebookUrl: 'https://www.facebook.com/barbaros.grp',
    instagramUrl: 'https://www.instagram.com/barbaros.grp/',
    linkedinUrl: '#',
}

// Hard-coded fallbacks per hero section — mirrors the current copy that's
// baked into each page today, so nothing changes until an admin edits it.
export const HERO_DEFAULTS: Record<HeroSectionKey, { badge: string; heading: string; description: string; image: string }> = {
    about_hero: {
        badge: 'WHO WE ARE',
        heading: 'About Us',
        description: 'We are a dedicated team of travel and medical tourism experts committed to providing unforgettable experiences in Türkiye.',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop',
    },
    contact_hero: {
        badge: 'GET IN TOUCH',
        heading: "Let's Start Your Journey",
        description: "Whether you're planning a dream vacation or seeking world-class medical care, our team of experts is here to guide you every step of the way.",
        image: '',
    },
    services_hero: {
        badge: 'Comprehensive Solutions',
        heading: 'Exceptional Services for Your Journey',
        description: 'From cultural treasures to world-class medical procedures, we provide end-to-end services to make your experience in Türkiye truly unforgettable.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop',
    },
    tours_hero: {
        badge: 'DISCOVER TÜRKİYE',
        heading: 'Your Gateway to Unforgettable Experiences',
        description: "Expertly curated journeys through the heart of Türkiye's most iconic landscapes and hidden gems.",
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
    },
    medical_hero: {
        badge: 'World-Class Healthcare',
        heading: 'Advanced Medical Tourism in Türkiye',
        description: 'Experience world-class medical treatments combined with exceptional hospitality. From hair transplants to advanced surgery, we handle every detail of your journey.',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2070&auto=format&fit=crop',
    },
    vip_programs_hero: {
        badge: 'VIP TOURISM SERVICES',
        heading: 'VIP Tourism Services',
        description: 'Indulge in the finest that Türkiye has to offer with our exclusive VIP programs. Enjoy personalized service, luxury accommodations, and unforgettable experiences.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    },
    vip_tourism_services_hero: {
        badge: 'VIP TOURISM SERVICES',
        heading: 'VIP Tourism Services',
        description: 'Exclusive services tailored for your comfort and luxury.',
        image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop',
    },
    special_packages_hero: {
        badge: 'SPECIAL TOURISM PACKAGES',
        heading: 'Exclusive Tourism Packages',
        description: 'Discover our specially curated tourism packages designed to give you unforgettable experiences in Turkey.',
        image: 'https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=2071&auto=format&fit=crop',
    },
    immigration_hero: {
        badge: 'Immigration Services',
        heading: 'Citizenship & Residence Solutions',
        description: 'Professional citizenship and residence services to help you navigate the process smoothly and efficiently.',
        image: '/images/citizenship_hero.png',
    },
    daily_tours_hero: {
        badge: 'DAILY TOURS',
        heading: 'Short & Sweet Adventures',
        description: "Perfect for those with limited time or looking to add excitement to their day. Experience the essentials of Türkiye's best spots in carefully curated daily tours.",
        image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?q=80&w=2071&auto=format&fit=crop',
    },
    programs_hero: {
        badge: 'OUR PROGRAMS',
        heading: 'Explore Our Tourism Programs',
        description: 'Discover our carefully curated programs designed to give you the best experience properly.',
        image: '',
    },
    blogs_hero: {
        badge: 'Our Blog',
        heading: 'Travel Stories & Tips',
        description: 'Explore inspiring travel stories, destination guides, and expert tips to help you plan your perfect journey.',
        image: '',
    },
}

export function pick(ml: MultiLang | undefined, locale: Locale, fallback: string): string {
    const value = ml?.[locale]
    return value && value.trim() ? value : fallback
}

// A code-level default is usually just an English fallback string (shown for
// every locale until an admin translates it), but some fields carry a real
// translation transcribed from the site's original i18n copy — those are
// {en, ar, ...} objects instead. This resolves either shape to one string.
export type LocalizedDefault = string | MultiLang

export function defaultText(d: LocalizedDefault | undefined, locale: Locale): string {
    if (!d) return ''
    if (typeof d === 'string') return d
    return d[locale] || d.en || ''
}

export function resolveHero(raw: HeroContent | undefined, locale: Locale, key: HeroSectionKey): ResolvedHero {
    const defaults = HERO_DEFAULTS[key]
    return {
        badge: pick(raw?.badge, locale, defaults.badge),
        heading: pick(raw?.heading, locale, defaults.heading),
        description: pick(raw?.description, locale, defaults.description),
        image: raw?.image || defaults.image,
    }
}

// ---------------------------------------------------------------------------
// Defaults for every generic section — plain English copy transcribed
// verbatim from what's hard-coded/i18n-sourced today, so nothing visibly
// changes on the public site until an admin edits a field. Same convention
// as HERO_DEFAULTS above: a single English fallback string per field, shown
// for every locale until a translation is saved.
// ---------------------------------------------------------------------------

export const GENERIC_SECTION_DEFAULTS: Record<GenericSectionKey, Record<string, any>> = {
    home_quick_actions: {
        subheading: { en: 'Explore Our Services', ar: 'استكشف خدماتنا' },
        heading: { en: 'Quick Actions', ar: 'الإجراءات السريعة' },
        description: { en: 'Choose from our wide range of services designed to meet your needs.', ar: 'اختر من بين مجموعة واسعة من الخدمات المصممة لتلبية احتياجاتك.' },
    },
    home_hot_deals: {
        badge: { en: 'Hot Deals', ar: 'عروض مميزة' },
        heading: { en: 'Limited-Time Offers on Selected Services', ar: 'عروض لفترة محدودة على خدمات مختارة' },
        description: { en: "Explore our best travel packages and services with exclusive discounts. Don't miss the chance to book your dream experience at an unbeatable price.", ar: 'استكشف أفضل باقات السفر والخدمات لدينا مع خصومات حصرية. لا تفوت فرصة حجز تجربة أحلامك بسعر لا يُنافس.' },
        viewDealLabel: 'View Deal',
    },
    home_featured_programs: {
        badge: { en: 'Our Programs', ar: 'برامجنا' },
        heading: { en: 'Featured Tourism Programs', ar: 'البرامج السياحية المميزة' },
        description: { en: 'Explore our top-rated programs designed for unforgettable experiences.', ar: 'استكشف أفضل برامجنا المصممة لتجارب لا تُنسى.' },
        viewAllLabel: { en: 'View All Programs', ar: 'عرض جميع البرامج' },
    },
    home_testimonials: {
        badge: { en: 'Testimonials', ar: 'آراء العملاء' },
        heading: { en: 'Real Experiences from Travelers Who Trusted Us', ar: 'تجارب حقيقية من مسافرين وثقوا بنا' },
        description: { en: 'Hear from our clients about their journeys with Barbaros Tourism. From seamless travel planning to exceptional medical tourism services, these real stories reflect our commitment to quality, care, and unforgettable experiences.', ar: 'استمع إلى قصص عملائنا مع بارباروس للسياحة. من تنظيم السفر بسلاسة إلى خدمات السياحة العلاجية المتميزة، تعكس هذه التجارب التزامنا بالجودة والرعاية وتجارب لا تُنسى.' },
        items: [
            { photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', text: { en: 'Barbaros Tourism made our family trip to Turkey unforgettable. The guides were knowledgeable and the transfers were seamless.', ar: 'جعلت بارباروس للسياحة رحلتنا العائلية إلى تركيا تجربة لا تُنسى. المرشدون كانوا محترفين والتنقلات منظمة بسلاسة.' }, name: { en: 'Sarah Jenkins', ar: 'سارة جينكنز' }, role: { en: 'Family Traveler', ar: 'مسافرة مع العائلة' } },
            { photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', text: { en: 'The medical tourism package was exceptional. From the clinic to the hotel, everything was handled with the utmost care and professionalism.', ar: 'باقة السياحة العلاجية كانت ممتازة. من العيادة إلى الفندق، كل شيء كان منظمًا بعناية واحترافية عالية.' }, name: { en: 'Michael Chen', ar: 'مايكل تشين' }, role: { en: 'Medical Tourist', ar: 'سائح علاجي' } },
            { photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', text: { en: "I loved the hot air balloon tour in Cappadocia! It was a dream come true. Highly recommend their services for anyone visiting Turkey.", ar: 'رحلة المنطاد في كابادوكيا كانت حلمًا تحقق! أنصح بشدة بخدماتهم لكل من يزور تركيا.' }, name: { en: 'Elena Rodriguez', ar: 'إيلينا رودريغيز' }, role: { en: 'Adventure Seeker', ar: 'محبة للمغامرات' } },
            { photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', text: { en: 'Professional, reliable, and friendly. They tailored the itinerary exactly to our needs. Istanbul is magical thanks to them.', ar: 'احترافية، موثوقية، وتعامل ودود. صمموا برنامج الرحلة بما يناسب احتياجاتنا تمامًا.' }, name: { en: 'James Wilson', ar: 'جيمس ويلسون' }, role: { en: 'Cultural Enthusiast', ar: 'محب للثقافة' } },
            { photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop', text: { en: 'The VIP transfer service was top-notch. Comfortable vehicles and punctual drivers. Made our business trip stress-free.', ar: 'خدمة النقل VIP كانت على أعلى مستوى. سيارات مريحة وسائقون في غاية الالتزام.' }, name: { en: 'Emily Davis', ar: 'إميلي ديفيس' }, role: { en: 'Business Traveler', ar: 'مسافرة لأعمال' } },
            { photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop', text: { en: 'We booked a full package including flights, hotels, and tours. Best value for money and excellent customer support throughout.', ar: 'حجزنا باقة متكاملة تشمل الطيران والفنادق والجولات. أفضل قيمة مقابل السعر ودعم ممتاز طوال الرحلة.' }, name: { en: 'Robert Taylor', ar: 'روبرت تايلور' }, role: { en: 'Vacationer', ar: 'سائح' } },
            { photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop', text: { en: "Their attention to detail is amazing. They suggested hidden gems in Istanbul that we wouldn't have found on our own.", ar: 'اهتمامهم بالتفاصيل رائع. اقترحوا أماكن مميزة في إسطنبول لم نكن لنعرفها وحدنا.' }, name: { en: 'David Kim', ar: 'ديفيد كيم' }, role: { en: 'Explorer', ar: 'مستكشف' } },
            { photo: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?w=100&h=100&fit=crop', text: { en: 'Safe and trustworthy. As a solo female traveler, I felt completely secure with their guides and drivers.', ar: 'شعرت بالأمان التام كمسافرة منفردة. فريقهم كان داعمًا ومحترفًا للغاية.' }, name: { en: 'Sophie Martin', ar: 'صوفي مارتن' }, role: { en: 'Solo Traveler', ar: 'مسافرة منفردة' } },
            { photo: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop', text: { en: 'The Bosphorus cruise dinner was the highlight of our trip. Great food, great views, and perfect organization.', ar: 'عشاء رحلة البوسفور كان أجمل جزء في الرحلة. تنظيم مثالي وتجربة رائعة.' }, name: { en: 'Thomas Anderson', ar: 'توماس أندرسون' }, role: { en: 'Foodie', ar: 'محب للطعام' } },
        ],
    },
    home_video_section: {
        subtitle: { en: 'Connecting Your Journey with Purpose', ar: 'نربط رحلتك بالغاية' },
        title: { en: 'Unforgettable journeys that make a difference.', ar: 'رحلات لا تُنسى تصنع الفارق.' },
        ctaLabel: { en: 'Play Video', ar: 'شاهد الفيديو' },
        backgroundImage: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop',
        videoUrl: '',
    },
    home_partners: {
        badge: { en: 'Our trusted partners', ar: 'شركاؤنا الموثوقون' },
        heading: { en: 'We collaborate with the best to provide you with an exceptional experience', ar: 'نتعاون مع الأفضل لنقدم لكم تجربة استثنائية' },
        items: [
            { name: 'Aspen Online', logo: '' },
            { name: 'Crop and Highlight', logo: '' },
            { name: 'N Logo', logo: '' },
            { name: 'Millssy', logo: '' },
            { name: 'Peppermint', logo: '' },
            { name: 'Pixie Labs', logo: '' },
        ],
    },
    home_blogs: {
        badge: { en: 'Our Blog', ar: 'مدونتنا' },
        heading: { en: 'Latest Stories & Insights', ar: 'أحدث القصص والرؤى' },
        description: { en: 'Discover travel tips, cultural insights, and hidden gems in Türkiye through our expert blog posts.', ar: 'اكتشف نصائح السفر والرؤى الثقافية والكنوز الخفية في تركيا من خلال مقالات مدونتنا.' },
        seeAllLabel: { en: 'View All Articles', ar: 'عرض جميع المقالات' },
        readMoreLabel: { en: 'Read More', ar: 'اقرأ المزيد' },
    },
    about_story: {
        badge: { en: 'OUR STORY', ar: 'قصتنا' },
        heading: { en: 'It feels like family (because it is)', ar: 'نشعر وكأننا عائلة (لأننا كذلك)' },
        p1: { en: 'Founded with a passion for showcasing the beauty and culture of Türkiye, Barbaros Tourism has grown from a small local agency to a comprehensive tourism and medical tourism provider.', ar: 'تأسست بارباروس للسياحة بشغف لإبراز جمال وثقافة تركيا، ونمت من وكالة محلية صغيرة إلى مزود متكامل للسياحة والسياحة العلاجية.' },
        p2: { en: "Our journey began with a simple mission: to share the wonders of Türkiye with the world while providing exceptional service. Over the years, we've expanded our services to include medical tourism, recognizing the growing demand for quality healthcare combined with travel.", ar: 'بدأت رحلتنا بمهمة بسيطة: مشاركة روائع تركيا مع العالم مع تقديم خدمة استثنائية.' },
        p3: { en: "Today, we're proud to serve thousands of clients annually, helping them discover Türkiye's rich history, stunning landscapes, and world-class medical facilities.", ar: 'اليوم نفخر بخدمة آلاف العملاء سنويًا، ومساعدتهم على اكتشاف تاريخ تركيا الغني ومناظرها الخلابة.' },
        readMoreLabel: { en: 'Read more', ar: 'اقرأ المزيد' },
        image1: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop',
        image2: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop',
    },
    about_stats: {
        heading: { en: 'We’re here to introduce you to all the places out there', ar: 'نحن هنا لنعرفك على كل الأماكن' },
        description: { en: 'Our impact across the globe through years of dedicated service and passion for travel.', ar: 'أثرنا العالمي عبر سنوات من الشغف والخدمة.' },
        items: [
            { value: '10,000+', label: { en: 'Happy customers', ar: 'عملاء سعداء' } },
            { value: '5,000+', label: { en: 'Tours and activities', ar: 'جولات وأنشطة' } },
            { value: '30+', label: { en: 'Countries around the globe', ar: 'دول حول العالم' } },
            { value: '200+', label: { en: 'Local Partners', ar: 'شركاء محليون' } },
        ],
    },
    about_why_choose: {
        heading: { en: 'Why Choose Barbaros Tourism?', ar: 'لماذا تختار بارباروس للسياحة؟' },
        items: [
            { title: { en: 'Trusted Experience', ar: 'خبرة موثوقة' }, description: { en: 'Years of expertise in tourism and medical services with thousands of satisfied clients.', ar: 'سنوات من الخبرة في مجال السياحة والخدمات الطبية مع آلاف العملاء الراضين.' } },
            { title: { en: '24/7 Support', ar: 'دعم على مدار الساعة' }, description: { en: 'Round-the-clock assistance to ensure your journey is smooth and worry-free.', ar: 'مساعدة على مدار الساعة لضمان أن تكون رحلتك سلسة وخالية من القلق.' } },
            { title: { en: 'Best Value', ar: 'أفضل قيمة' }, description: { en: 'Competitive pricing without compromising on quality or service excellence.', ar: 'أسعار تنافسية دون المساومة على الجودة أو تميز الخدمة.' } },
            { title: { en: 'Personalized Service', ar: 'خدمة مخصصة' }, description: { en: 'Tailored experiences designed to match your preferences and requirements.', ar: 'تجارب مصممة خصيصًا لتتناسب مع تفضيلاتك ومتطلباتك.' } },
            { title: { en: 'Expert Team', ar: 'فريق خبراء' }, description: { en: 'Professional guides and medical coordinators dedicated to your satisfaction.', ar: 'مرشدون محترفون ومنسقون طبيون مكرسون لرضاك.' } },
            { title: { en: 'Global Network', ar: 'شبكة عالمية' }, description: { en: 'Partnerships with top hotels, hospitals, and service providers across Türkiye.', ar: 'شراكات مع أفضل الفنادق والمستشفيات ومقدمي الخدمات في جميع أنحاء تركيا.' } },
        ],
    },
    contact_form: {
        heading: { en: 'Send us a Message', ar: 'أرسل لنا رسالة' },
        subheading: { en: 'Fill out the form below and our team will get back to you within 24 hours.', ar: 'املأ النموذج وسيتواصل معك فريقنا خلال 24 ساعة.' },
        firstNameLabel: { en: 'First Name', ar: 'الاسم الأول' },
        lastNameLabel: { en: 'Last Name', ar: 'اسم العائلة' },
        emailLabel: { en: 'Email Address', ar: 'البريد الإلكتروني' },
        phoneLabel: { en: 'Phone Number', ar: 'رقم الهاتف' },
        interestPlaceholder: { en: 'Select Interest', ar: 'اختر الاهتمام' },
        messageLabel: { en: 'Message', ar: 'الرسالة' },
        submitLabel: { en: 'Send Message', ar: 'إرسال الرسالة' },
        optionCultural: { en: 'Cultural Tours', ar: 'جولات ثقافية' },
        optionAdventure: { en: 'Adventure Tours', ar: 'جولات مغامرة' },
        optionHair: { en: 'Medical Tourism - Hair Transplant', ar: 'سياحة علاجية - زراعة الشعر' },
        optionDental: { en: 'Medical Tourism - Dental', ar: 'سياحة علاجية - طب الأسنان' },
        optionCosmetic: { en: 'Medical Tourism - Cosmetic Surgery', ar: 'سياحة علاجية - جراحة تجميلية' },
        optionCustom: { en: 'Custom Package', ar: 'باقة مخصصة' },
        optionOther: { en: 'Other', ar: 'أخرى' },
        successMessage: '✓ Thank you! Your message has been sent successfully.',
        fullNameError: 'Please enter your full name',
        emailError: 'Please enter a valid email address',
        messageError: 'Message must be at least 10 characters',
    },
    contact_info: {
        phoneLabel: { en: 'Phone', ar: 'الهاتف' },
        emailLabel: { en: 'Email', ar: 'البريد الإلكتروني' },
        officeLabel: { en: 'Office', ar: 'المكتب' },
        hoursLabel: { en: 'Hours', ar: 'ساعات العمل' },
        connectLabel: { en: 'Connect With Us', ar: 'تواصل معنا' },
    },
    contact_map: {
        heading: 'Visit Our Office',
        addressLine1: 'Aksemsettin Mah. Akdeniz Cad. No: 70/2, 1',
        addressLine2: 'Fatih, Istanbul, 34080',
        buttonLabel: 'Get Directions',
        mapUrl: 'https://maps.app.goo.gl/4Jy1T9zTn4xrNnDR8',
        backgroundImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
    },
    services_offerings: {
        badge: { en: 'OUR EXPERTISE', ar: 'خبرتنا' },
        heading: { en: 'What We Offer', ar: 'ما نقدمه' },
        ctaButtonLabel: { en: 'Learn More', ar: 'اعرف المزيد' },
        items: [
            { title: 'Cultural Tours', description: "Explore Türkiye's rich history and heritage with expert guides who bring ancient stories to life.", image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop' },
            { title: 'Adventure Tours', description: "Thrilling experiences for adrenaline seekers and nature lovers in Türkiye's most breathtaking landscapes.", image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Medical Tourism', description: 'Access world-class medical procedures with comprehensive care packages in top JCI-accredited hospitals.', image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop' },
            { title: 'Accommodation', description: 'Carefully selected hotels and resorts, ranging from boutique stays to luxury 5-star experiences.', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Transportation', description: 'Seamless travel arrangements including VIP airport transfers and private chauffeur services.', image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop' },
            { title: 'Custom Packages', description: 'Perfectly tailored itineraries designed specifically to match your interests and desires.', image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035&auto=format&fit=crop' },
        ],
    },
    services_cta: {
        heading: { en: 'Ready to Start Your Perfect Journey?', ar: 'هل أنت مستعد لبدء رحلتك المثالية؟' },
        description: { en: 'Contact us today to discuss your travel plans and let us create a personalized package that meets all your expectations.', ar: 'تواصل معنا اليوم ودعنا نصمم لك باقة مخصصة تلبي جميع تطلعاتك.' },
        button1Label: { en: 'Schedule a Consultation', ar: 'احجز استشارة' },
        button2Label: { en: 'Explore Our Tours', ar: 'استكشف جولاتنا' },
    },
    tours_carousel_headers: {
        dailyToursBadge: { en: 'DAILY TOURS', ar: 'الجولات اليومية' },
        dailyToursTitle: { en: 'Short & Sweet Adventures', ar: 'مغامرات قصيرة وممتعة' },
        dailyToursDescription: { en: "Perfect for those with limited time or looking to add excitement to their day. Experience the essentials of Türkiye's best spots in carefully curated daily tours.", ar: 'مثالي لأولئك الذين لديهم وقت محدود أو يبحثون عن إضافة الإثارة إلى يومهم. استمتع بأساسيات أفضل الأماكن في تركيا في جولات يومية منظمة بعناية.' },
        specialPackagesBadge: { en: 'SPECIAL TOURISM PACKAGES', ar: 'باقات سياحية خاصة' },
        specialPackagesTitle: { en: 'Tailored Tourism Solutions', ar: 'حلول سياحية مخصصة' },
        specialPackagesDescription: { en: 'Exclusive packages designed for specific interests - from cultural immersion to adventure experiences. Each package is carefully crafted to provide unique and memorable journeys.', ar: 'باقات حصرية مصممة لاهتمامات محددة - من الانغماس الثقافي إلى تجارب المغامرة. تم إعداد كل باقة بعناية لتوفير رحلات فريدة لا تُنسى.' },
        vipServicesBadge: { en: 'VIP TOURISM SERVICES', ar: 'خدمات السياحة VIP' },
        vipServicesTitle: { en: 'VIP Tourism Services', ar: 'خدمات السياحة VIP' },
        vipServicesDescription: { en: 'Indulge in the finest that Türkiye has to offer with our exclusive VIP programs. Enjoy personalized service, luxury accommodations, and unforgettable experiences.', ar: 'استمتع بأفضل ما تقدمه تركيا مع برامج VIP الحصرية. استمتع بخدمة شخصية وإقامة فاخرة وتجارب لا تُنسى.' },
    },
    medical_why_choose: {
        badge: { en: 'Why Türkiye', ar: 'لماذا تركيا' },
        heading: { en: 'World-Class Healthcare at Affordable Prices', ar: 'رعاية صحية عالمية بأسعار مناسبة' },
        description: { en: 'Türkiye has become a global leader in medical tourism, combining cutting-edge facilities with exceptional service and stunning locations.', ar: 'أصبحت تركيا رائدة عالميًا في السياحة العلاجية، حيث تجمع بين أحدث التقنيات الطبية وخدمة متميزة ومواقع خلابة.' },
        items: [
            { title: { en: 'JCI Accredited Hospitals', ar: 'مستشفيات معتمدة من JCI' }, description: { en: 'All our partner hospitals hold international Joint Commission International accreditation, ensuring the highest standards of care.', ar: 'جميع مستشفياتنا الشريكة حاصلة على اعتماد اللجنة الدولية المشتركة، مما يضمن أعلى معايير الرعاية.' } },
            { title: { en: 'Competitive Pricing', ar: 'أسعار تنافسية' }, description: { en: 'Save up to 70% compared to Western countries without compromising on quality or safety standards.', ar: 'وفر حتى 70٪ مقارنة بالدول الغربية دون أي تنازل عن الجودة أو السلامة.' } },
            { title: { en: 'Expert Surgeons', ar: 'أطباء خبراء' }, description: { en: 'Our medical professionals have years of international experience and specialized training in their fields.', ar: 'أطباؤنا يتمتعون بخبرة دولية وسنوات من التدريب المتخصص.' } },
            { title: { en: 'Full Support Package', ar: 'حزمة دعم متكاملة' }, description: { en: 'From translation services to accommodation and transfers, we handle all logistics for a seamless experience.', ar: 'من خدمات الترجمة إلى الإقامة والتنقل، نتولى جميع التفاصيل لتجربة سلسة.' } },
            { title: { en: 'Tourism Combination', ar: 'الجمع بين العلاج والسياحة' }, description: { en: "Combine your treatment with a memorable vacation in one of the world's most beautiful countries.", ar: 'اجمع بين علاجك وإجازة مميزة في واحدة من أجمل دول العالم.' } },
            { title: { en: 'Aftercare Support', ar: 'رعاية ما بعد العلاج' }, description: { en: 'Continued support after your return home with online consultations and follow-up care.', ar: 'دعم مستمر بعد عودتك من خلال الاستشارات والمتابعة عن بُعد.' } },
        ],
    },
    immigration_citizenship_header: {
        badge: { en: 'Citizenship Services', ar: 'خدمات الجنسية' },
        heading: { en: 'Citizenship Application Services', ar: 'خدمات تقديم طلبات الجنسية' },
        description: { en: 'Expert assistance with all types of citizenship applications for Türkiye and international destinations.', ar: 'مساعدة متخصصة في جميع أنواع طلبات الجنسية لتركيا والوجهات الدولية.' },
        emptyStateMessage: 'No visa services available at the moment.',
        viewAllLabel: 'View All Visa Services',
        fallbackImage: 'https://images.unsplash.com/photo-1554224311-beee415c201f?q=80&w=800&auto=format&fit=crop',
    },
    immigration_residence_header: {
        badge: { en: 'Residence Services', ar: 'خدمات الإقامة' },
        heading: { en: 'Residence Permit & Settlement', ar: 'خدمات تصريح الإقامة والاستقرار' },
        description: { en: 'Comprehensive residency solutions including residence permits, settlement applications, and legal support.', ar: 'حلول إقامة شاملة تشمل تصاريح الإقامة وطلبات الاستقرار والدعم القانوني.' },
        emptyStateMessage: 'No immigration services available at the moment.',
        viewAllLabel: 'View All Immigration Services',
        fallbackImage: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
    },
    immigration_cta: {
        heading: { en: 'Ready to Start Your Immigration Journey?', ar: 'هل أنت مستعد لبدء رحلة الهجرة الخاصة بك؟' },
        description: { en: 'Contact us today for a free consultation and let our experts guide you through the process.', ar: 'اتصل بنا اليوم للحصول على استشارة مجانية ودع خبراءنا يرشدونك خلال العملية.' },
        buttonLabel: { en: 'Get Free Consultation', ar: 'احصل على استشارة مجانية' },
        backgroundImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop',
    },
    special_packages_content: {
        emptyStateMessage: 'No special tourism packages available at the moment. Check back soon!',
        noImageLabel: 'No Image',
        comingSoonLabel: 'Coming Soon',
        viewDetailsLabel: 'View Details',
    },
    vip_programs_content: {
        emptyStateMessage: 'No VIP programs available at the moment. Check back soon!',
    },
    vip_tourism_services_content: {
        emptyStateMessage: 'Coming soon...',
        noImageLabel: 'No Image',
        comingSoonLabel: 'Coming Soon',
    },
    programs_content: {
        emptyStateMessage: 'No programs available at the moment.',
        noImageLabel: 'No Image',
        comingSoonLabel: 'Coming Soon',
    },
    daily_tours_content: {
        emptyStateMessage: 'No daily tours available at the moment. Check back soon!',
    },
    blogs_content: {
        category: 'TRAVEL',
        title: 'Istanbul Bosphorus Experience',
        excerpt: 'Discover the enchanting beauty of Istanbul and the Bosphorus strait. Experience the perfect blend of European and Asian cultures.',
        image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2071&auto=format&fit=crop',
        author: 'Sarah Johnson',
        date: 'January 15, 2026',
        readTime: '8 min read',
    },
}

/**
 * Resolves a repeatable list section (testimonials, stats, why-choose
 * reasons, etc.) for one locale. If the admin has saved their own items,
 * those are used wholesale (including added/removed items); otherwise the
 * defaults are used wholesale. Each item's multi-lang fields fall back to
 * the same-index default's English value; plain fields (image URLs, the
 * stat "value" string) pass through with a default fallback.
 */
export function resolveListItems<T extends Record<string, any>>(
    raw: any[] | undefined,
    locale: Locale,
    defaults: T[],
    multiLangKeys: (keyof T)[]
): T[] {
    const source = raw && raw.length > 0 ? raw : defaults
    const mlKeys = multiLangKeys as string[]
    return source.map((item: any, i: number) => {
        const fallback: any = defaults[i] || defaults[defaults.length - 1] || {}
        const result: any = {}
        const keys = new Set([...Object.keys(fallback), ...Object.keys(item || {})])
        keys.forEach((k) => {
            if (mlKeys.includes(k)) {
                result[k] = pick(item?.[k], locale, defaultText(fallback[k], locale))
            } else {
                result[k] = item?.[k] !== undefined && item?.[k] !== '' ? item[k] : fallback[k] || ''
            }
        })
        return result
    })
}

/** Resolves one generic section's flat fields + lists for one locale. */
export function resolveGenericSection(
    raw: Record<string, any> | undefined,
    locale: Locale,
    schema: GenericSectionSchema,
    defaults: Record<string, any>
): Record<string, any> {
    const result: Record<string, any> = {}
    for (const f of schema.fields) {
        if (f.type === 'image') {
            result[f.key] = raw?.[f.key] || defaults[f.key] || ''
        } else if (isMultiLangField(f)) {
            result[f.key] = pick(raw?.[f.key], locale, defaultText(defaults[f.key], locale))
        } else {
            result[f.key] = raw?.[f.key] || defaults[f.key] || ''
        }
    }
    for (const l of schema.lists || []) {
        const multiLangKeys = l.itemFields.filter(isMultiLangField).map(f => f.key)
        result[l.key] = resolveListItems(raw?.[l.key], locale, defaults[l.key] || [], multiLangKeys)
    }
    return result
}
