import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://barbarostourism.com'
    const locales = ['en', 'ar', 'fr', 'tr', 'ru'] // Based on earlier context
    const paths = ['', '/about-us', '/tours', '/blogs', '/contact-us', '/medical-tourism']

    const allUrls: MetadataRoute.Sitemap = []

    locales.forEach((locale) => {
        paths.forEach((path) => {
            allUrls.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: path === '' ? 1 : 0.8,
            })
        })
    })

    return allUrls
}
