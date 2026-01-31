import { getSpecialPackages } from '@/lib/services/specialPackages';
import SpecialPackagesClient from './SpecialPackagesClient';

export default async function SpecialPackagesPage() {
    const packages = await getSpecialPackages('en');

    return <SpecialPackagesClient initialPackages={packages} />;
}
