'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface CtaButtonProps {
    href?: string;
    onClick?: () => void;
    children: ReactNode;
    variant?: 'primary' | 'outline';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

export default function CtaButton({
    href,
    onClick,
    children,
    variant = 'primary',
    className = '',
    type = 'button'
}: CtaButtonProps) {
    const baseStyles = "px-8 py-3 rounded-lg text-base font-medium transition-all duration-300 font-cabinet shadow-lg hover:shadow-xl transform hover:-translate-y-0.5";

    const variants = {
        primary: "bg-primary-700 hover:bg-primary-600 text-white shadow-primary/20",
        outline: "hover:bg-white/10 border border-white text-white backdrop-blur-sm shadow-none hover:shadow-white/10"
    };

    const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedStyles}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={combinedStyles}>
            {children}
        </button>
    );
}
