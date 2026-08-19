import { getSiteContentRows } from '@/lib/services/site-content'
import WebsiteContentOverview from '@/components/portal/WebsiteContentOverview'

export const dynamic = 'force-dynamic'

export default async function WebsiteContentPage() {
    const rows = await getSiteContentRows()

    return <WebsiteContentOverview rows={rows} />
}
