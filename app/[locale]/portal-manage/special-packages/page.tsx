import { getSpecialPackages } from '@/lib/services/specialPackages';
import SpecialPackagesClient from './SpecialPackagesClient';
import { Locale } from '@/i18n';

export default async function SpecialPackagesPage({ params }: { params: Promise<{ locale: Locale }> }) {
    const { locale } = await params;
    const packages = await getSpecialPackages(locale);

    return <SpecialPackagesClient initialPackages={packages} />;
}
