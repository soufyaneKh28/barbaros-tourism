import { notFound } from 'next/navigation'
import { getGroupMeta, getSiteContentRows } from '@/lib/services/site-content'
import WebsiteContentGroupOverview from '@/components/portal/WebsiteContentGroupOverview'

export const dynamic = 'force-dynamic'

export default async function WebsiteContentGroupPage({
    params,
}: {
    params: Promise<{ locale: string; group: string }>
}) {
    const { group: groupSlug } = await params
    const group = getGroupMeta(groupSlug)

    if (!group) {
        notFound()
    }

    const rows = await getSiteContentRows()

    return <WebsiteContentGroupOverview group={group} rows={rows} />
}
