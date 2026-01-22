'use client'

import { useState } from 'react'
import { Clock, Calendar } from 'lucide-react'

interface TimeInputProps {
    name: string
    label: string
    defaultValue?: string
    defaultIcon?: 'hour' | 'calendar'
    required?: boolean
    placeholder?: string
}

export default function TimeInput({
    name,
    label,
    defaultValue = '',
    defaultIcon = 'calendar',
    required = false,
    placeholder = 'e.g. Daily, 2 hours, 3 days'
}: TimeInputProps) {
    const [selectedIcon, setSelectedIcon] = useState<'hour' | 'calendar'>(defaultIcon)
    const [timeText, setTimeText] = useState(defaultValue)

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div className="flex gap-2">
                {/* Text Input */}
                <div className="flex-1 relative">
                    <input
                        type="text"
                        name={name}
                        value={timeText}
                        onChange={(e) => setTimeText(e.target.value)}
                        required={required}
                        placeholder={placeholder}
                        className="block w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    {/* Selected Icon Display */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {selectedIcon === 'hour' ? (
                            <Clock className="w-5 h-5" />
                        ) : (
                            <Calendar className="w-5 h-5" />
                        )}
                    </div>
                </div>

                {/* Icon Toggle Buttons */}
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => setSelectedIcon('hour')}
                        className={`p-2 rounded-md transition-all ${selectedIcon === 'hour'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        title="Hour/Duration"
                    >
                        <Clock className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedIcon('calendar')}
                        className={`p-2 rounded-md transition-all ${selectedIcon === 'calendar'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        title="Calendar/Date"
                    >
                        <Calendar className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Hidden input for icon selection */}
            <input type="hidden" name={`${name}Icon`} value={selectedIcon} />
        </div>
    )
}
