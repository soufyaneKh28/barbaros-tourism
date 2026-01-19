'use client';

import { useState } from 'react';

interface BookingCardProps {
    price: number;
}

export default function BookingCard({ price }: BookingCardProps) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const totalPrice = price * guests;

    return (
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 sticky top-24">
            <div className="flex items-end gap-2 mb-6">
                <span className="text-3xl font-bold font-cabinet text-gray-900">${price}</span>
                <span className="text-gray-500 font-satoshi mb-1">per person</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Check In</label>
                    <input
                        type="date"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-satoshi focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                    />
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Check Out</label>
                    <input
                        type="date"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm font-satoshi focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Guests</label>
                <div className="relative">
                    <select
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-3 text-sm font-satoshi appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center text-sm font-satoshi text-gray-600 mb-6 font-medium">
                <span>Total</span>
                <span className="text-xl font-bold text-gray-900">${totalPrice}</span>
            </div>

            <button className="w-full bg-primary hover:bg-primary-800 text-white font-bold font-cabinet py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95">
                Book Now
            </button>

            <button className="w-full text-center text-sm font-bold text-gray-500 mt-4 hover:text-primary transition-colors">
                Ask manager a Question
            </button>
        </div>
    );
}
