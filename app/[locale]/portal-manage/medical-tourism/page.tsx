import { getAllMedicalTourismSections } from '@/lib/services/medical-tourism'
import MedicalTourismSectionsList from '@/components/medical/MedicalSectionsList'

export const dynamic = 'force-dynamic';

export default async function MedicalTourismPage() {
    const sections = await getAllMedicalTourismSections('en')

    return <MedicalTourismSectionsList sections={sections} />
}
