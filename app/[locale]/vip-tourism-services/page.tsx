import { getVipServices } from '@/lib/services/vip-tourism-services'
import { getMessages } from '@/i18n'
import { type Locale, locales, defaultLocale } from '@/i18n'
import Link from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'

export const dynamic = 'force-dynamic'

export default async function VipTourismServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale: localeParam } = await params
    const locale = (locales.includes(localeParam as Locale) ? localeParam : defaultLocale) as Locale
    const t = getMessages(locale)
    const services = await getVipServices(locale)

    return (
        <div className="min-h-screen bg-white">
            <Navbar transparent={false} />

            {/* Hero Section */}
            <div className="relative h-[40vh] bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop"
                        alt="VIP Services"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-cabinet text-white mb-4">
                        {(t as any).tourTypes?.vipPrograms?.heading || "VIP Tourism Services"}
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl max-w-2xl font-satoshi">
                        {(t as any).tourTypes?.vipPrograms?.description || "Exclusive services tailored for your comfort and luxury."}
                    </p>
                </div>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-16">
                {services.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl">
                        <p className="text-gray-500 text-lg">{(t as any).common?.comingSoon || "Coming soon..."}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div key={service.id} className="group bg-white rounded-[20px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                <div className="h-64 w-full m- bg-gray-100 relative overflow-hidden">
                                    {service.image_url ? (
                                        <img
                                            src={service.image_url}
                                            alt={typeof service.title === 'string' ? service.title : Object.values(service.title)[0] || 'Service'}
                                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                                            <span className="text-sm">No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold font-cabinet text-gray-900 mb-3 group-hover:text-primary transition-colors">
                                        {typeof service.title === 'string' ? service.title : Object.values(service.title)[0] || 'Untitled'}
                                    </h3>

                                    <p className="text-gray-600 font-satoshi mb-8 line-clamp-3 leading-relaxed flex-grow">
                                        {typeof service.description === 'string' ? service.description : Object.values(service.description)[0] || ''}
                                    </p>

                                    <div className="pt-4 mt-auto w-full">
                                        {service.cta_link ? (
                                            <a
                                                href={service.cta_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center w-full sm:w-auto gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold font-cabinet hover:bg-primary-600 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                                            >
                                                {typeof service.cta_text === 'string' && service.cta_text ? service.cta_text :
                                                    (Object.values(service.cta_text)[0] || 'Learn More')}
                                                {/* <ArrowRight className="w-5 h-5" /> */}
                                            </a>
                                        ) : (
                                            <div className="h-12" /> /* Spacer if no CTA */
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
