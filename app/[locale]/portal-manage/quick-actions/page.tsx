import { getQuickActions, getAllQuickActions } from '@/lib/services/home-quick-actions'
import QuickActionsList from '@/components/portal/QuickActionsList'

export const dynamic = 'force-dynamic';

export default async function QuickActionsPage() {
    // For admin, we want ALL actions, including inactive ones. 
    // Ideally we have a 'getAllQuickActions' but let's check what I created.
    // I created `getAllQuickActions`.
    const actions = await getAllQuickActions()

    return <QuickActionsList actions={actions} />
}
