'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useState } from 'react';

export default function WhatsAppButton() {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);

    // WhatsApp number - you can update this with the actual number
    const whatsappNumber = '+905555555555'; // Replace with actual number
    const message = encodeURIComponent((t as any).whatsapp?.defaultMessage || 'Hello! I would like to know more about your services.');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

    const consultationText = (t as any).whatsapp?.consultation || 'Free consultation via WhatsApp';

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Contact us on WhatsApp"
        >
            <div className={`whatsapp-tooltip ${isHovered ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-4'}`}>
                {consultationText}
            </div>

            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={isHovered ? 'whatsapp-icon-hover' : ''}
            >
                <path
                    d="M16 2.66667C8.64 2.66667 2.66666 8.64 2.66666 16C2.66666 18.3547 3.28199 20.5627 4.35866 22.4767L2.71866 28.454L8.85199 26.814C10.7067 27.8387 12.808 28.3813 15.0093 28.3813H15.0147C22.3693 28.3813 28.3427 22.408 28.3427 15.0533C28.3413 11.7453 27.0533 8.63467 24.7133 6.29334C22.3733 3.95334 19.264 2.66667 16 2.66667ZM16 26.136C13.6267 26.136 12.2987 25.4987 11.4587 24.9707L8.29333 25.8053L9.13866 22.712C8.36933 21.488 7.50266 19.4693 7.50266 16.0373C7.50266 11.352 11.3147 7.54001 16.0053 7.54001C18.276 7.54134 20.4107 8.42534 22.016 10.0307C23.6213 11.636 24.5053 13.7707 24.5053 16.0427C24.5053 20.728 20.6933 26.136 16 26.136ZM20.6693 19.1867C20.4133 19.0587 19.1573 18.4387 18.9227 18.3533C18.688 18.268 18.5173 18.2253 18.3467 18.4813C18.176 18.7373 17.6853 19.3133 17.536 19.484C17.3867 19.6547 17.2373 19.676 16.9813 19.548C16.7253 19.42 15.9013 19.1507 14.9253 18.28C14.156 17.5933 13.6373 16.7453 13.488 16.4893C13.3387 16.2333 13.472 16.096 13.6 15.9693C13.7147 15.8547 13.856 15.6707 14.0053 15.4987C14.1547 15.328 14.2187 15.2 14.3253 14.9867C14.432 14.7733 14.368 14.5813 14.2827 14.4107C14.1973 14.24 13.5147 12.5533 13.2373 11.8707C12.96 11.2093 12.6827 11.2947 12.4907 11.2947C12.32 11.2947 12.128 11.2947 11.9147 11.2947C11.7013 11.2947 11.36 11.38 11.0827 11.6787C10.8053 11.9773 10.016 12.724 10.016 14.24C10.016 15.756 11.1253 17.228 11.2747 17.4413C11.424 17.6547 13.408 20.728 16.4373 22.0373C19.0387 23.1613 19.0387 22.82 19.508 22.7773C19.9773 22.7347 21.0227 22.1587 21.236 21.5613C21.4493 20.964 21.4493 20.452 21.3853 20.3453C21.3213 20.2387 21.1507 20.1867 20.8947 20.0587"
                    fill="white"
                />
            </svg>
            <style jsx>{`
        .whatsapp-float {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 60px;
          height: 60px;
          background-color: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
          z-index: 1000;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .whatsapp-float:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 20px rgba(37, 211, 102, 0.5);
        }

        .whatsapp-tooltip {
          position: absolute;
          right: 70px;
          background-color: white;
          color: #333;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        /* Tooltip arrow */
        .whatsapp-tooltip::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -6px;
          transform: translateY(-50%);
          border-width: 6px 0 6px 6px;
          border-style: solid;
          border-color: transparent transparent transparent white;
        }

        .whatsapp-icon-hover {
          animation: shake 0.5s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }

        @media (max-width: 768px) {
          .whatsapp-float {
            bottom: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
          }
          
          /* Hide tooltip on mobile to avoid overlap */
          .whatsapp-tooltip {
            display: none;
          }
        }
      `}</style>
        </a>
    );
}
