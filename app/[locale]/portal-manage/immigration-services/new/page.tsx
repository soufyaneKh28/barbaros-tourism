import { getImmigrationCategories } from '@/lib/services/immigration'
import ImmigrationServiceForm from '@/components/portal/ImmigrationServiceForm'

export default async function NewImmigrationServicePage() {
    const categories = await getImmigrationCategories('en')

    return <ImmigrationServiceForm categories={categories} />
}
