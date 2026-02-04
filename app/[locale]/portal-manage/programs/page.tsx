import { getAllPrograms } from '@/lib/services/programs'
import ProgramsList from '@/components/portal/ProgramsList'
import { getLocalized } from '@/lib/utils'

export const dynamic = 'force-dynamic';

export default async function ProgramsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    let programs: any[] = []
    try {
        const rawPrograms = await getAllPrograms()
        // Transform multi-language fields to strings for display
        programs = rawPrograms.map(program => ({
            ...program,
            title: getLocalized(program.title, locale),
            description: getLocalized(program.description, locale),
        }))
    } catch (e) {
        console.error('Failed to fetch programs', e)
    }

    return <ProgramsList programs={programs} locale={locale as any} />
}
