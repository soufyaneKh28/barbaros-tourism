import { getPrograms } from '@/lib/services/programs'
import ProgramsList from '@/components/portal/ProgramsList'

export const dynamic = 'force-dynamic';

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    let programs: any[] = []
    try {
        programs = await getPrograms(locale)
    } catch (e) {
        console.error('Failed to fetch programs', e)
    }

    return <ProgramsList programs={programs} locale={locale as any} />
}
