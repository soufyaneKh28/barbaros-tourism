import { notFound } from 'next/navigation'
import { getSectionMeta, getSiteContentRow } from '@/lib/services/site-content'
import SiteContentEditClient from '@/components/portal/SiteContentEditClient'

export const dynamic = 'force-dynamic'

export default async function WebsiteContentEditPage({
    params,
}: {
    params: Promise<{ locale: string; group: string; key: string }>
}) {
    const { key } = await params
    const meta = getSectionMeta(key)

    if (!meta) {
        notFound()
    }

    const row = await getSiteContentRow(key)

    return <SiteContentEditClient meta={meta} row={row} />
}
