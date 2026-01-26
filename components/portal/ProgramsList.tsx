'use client';

import { Program } from "@/lib/types";
import { type Locale } from "@/i18n";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteProgramAction } from "@/app/actions/programs";
import { useRouter } from "next/navigation";

interface ProgramsListProps {
    programs: Program[];
    locale: Locale;
}

export default function ProgramsList({ programs, locale }: ProgramsListProps) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const router = useRouter();

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this program?")) return;

        setIsDeleting(id);
        const result = await deleteProgramAction(id);

        if (result.success) {
            router.refresh();
        } else {
            alert("Failed to delete program");
        }
        setIsDeleting(null);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold font-cabinet text-gray-900">Programs</h1>
                <Link
                    href={`/${locale}/portal-manage/programs/new`}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    Add New Program
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program) => (
                    <div key={program.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="relative h-48 bg-gray-100">
                            {program.main_image ? (
                                <Image
                                    src={program.main_image}
                                    alt={typeof program.title === 'string' ? program.title : program.title[locale] || 'Program'}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                                {typeof program.title === 'string' ? program.title : program.title[locale]}
                            </h3>
                            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                {typeof program.description === 'string' ? program.description : program.description[locale]}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <Link
                                    href={`/${locale}/portal-manage/programs/${program.id}`}
                                    className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(program.id)}
                                    disabled={isDeleting === program.id}
                                    className="flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    {isDeleting === program.id ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {programs.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        No programs found. Create your first one!
                    </div>
                )}
            </div>
        </div>
    );
}
