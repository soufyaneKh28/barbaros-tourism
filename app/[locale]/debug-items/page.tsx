import { getAllServices } from '@/lib/services/services'
import { getAllMedicalTourismSections } from '@/lib/services/medical-tourism'

export const dynamic = 'force-dynamic'

export default async function DebugPage() {
    const services = await getAllServices('en')
    const medicalSections = await getAllMedicalTourismSections('en')

    return (
        <div className="p-10 font-mono text-xs">
            <h1 className="text-2xl font-bold mb-5">Debug Items Visibility</h1>

            <div className="grid grid-cols-2 gap-10">
                <div className="border p-4 bg-gray-50">
                    <h2 className="text-xl font-bold mb-4">Services ({services.length})</h2>
                    <pre className="whitespace-pre-wrap">
                        {JSON.stringify(services.map(s => ({
                            id: s.id,
                            name: s.service_name,
                            is_active: s.is_active
                        })), null, 2)}
                    </pre>
                </div>

                <div className="border p-4 bg-gray-50">
                    <h2 className="text-xl font-bold mb-4">Medical Sections ({medicalSections.length})</h2>
                    <pre className="whitespace-pre-wrap">
                        {JSON.stringify(medicalSections.map(s => ({
                            id: s.id,
                            title: s.title,
                            is_active: s.is_active
                        })), null, 2)}
                    </pre>
                </div>
            </div>

            <div className="mt-10 p-4 border bg-yellow-50">
                <h3 className="font-bold">Diagnosis</h3>
                <p>If you see your inactive items here, the issue is in the Admin Dashboard UI.</p>
                <p>If you DO NOT see inactive items here, the issue is coming from the Database (Supabase) not returning them.</p>
            </div>
        </div>
    )
}
