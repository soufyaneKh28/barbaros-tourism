import { getSpecialPackageById } from '@/lib/services/specialPackages';
import EditSpecialPackageClient from './EditSpecialPackageClient';
import { notFound } from 'next/navigation';

export default async function EditSpecialPackagePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const resolvedParams = await params;
    const packageData = await getSpecialPackageById(resolvedParams.id);

    if (!packageData) {
        notFound();
    }

    return <EditSpecialPackageClient packageData={packageData} packageId={resolvedParams.id} />;
}
