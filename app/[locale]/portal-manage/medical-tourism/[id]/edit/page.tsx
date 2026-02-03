import { getMedicalTourismSectionById } from '@/lib/services/medical-tourism'
import MedicalSectionForm from '@/components/medical/MedicalSectionForm'

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function EditMedicalTourismSectionPage({ params }: PageProps) {
    const { id } = await params
    const section = await getMedicalTourismSectionById(id)

    if (!section) {
        return <div>Section not found</div>
    }

    return <MedicalSectionForm section={section} />
}
