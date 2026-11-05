'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'green' | 'white';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  subtitleText?: string;
  className?: string;
  href?: string;
}

export default function Logo({
  variant = 'green',
  size = 'md',
  showSubtitle = true,
  subtitleText = 'EDUKASI SOP ANTI-MC',
  className = '',
  href = '/',
}: LogoProps) {
  const isWhite = variant === 'white';

  const iconSizeClasses = {
    sm: 'w-7 h-7 rounded-lg text-xs',
    md: 'w-9 h-9 rounded-xl text-sm',
    lg: 'w-11 h-11 rounded-2xl text-base',
  }[size];

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
  }[size];

  const logoContent = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Dynamic Candlestick & Upward Arrow Emblem */}
      <div
        className={`relative ${iconSizeClasses} flex items-center justify-center shrink-0 shadow-xs transition-transform hover:scale-105 ${
          isWhite
            ? 'bg-white/15 border border-white/30 text-white backdrop-blur-xs'
            : 'bg-gradient-to-br from-[#00A651] to-[#005A36] border border-[#00A651]/40 text-white shadow-md shadow-[#00A651]/20'
        }`}
      >
        {/* SVG Candle & Up-Trend Arrow */}
        <svg
          className="w-5/6 h-5/6"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Candle 1 */}
          <line
            x1="10"
            y1="12"
            x2="10"
            y2="22"
            stroke={isWhite ? '#FFFFFF' : '#FFFFFF'}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <rect
            x="8.5"
            y="14"
            width="3"
            height="5"
            rx="0.8"
            fill={isWhite ? '#FFFFFF' : '#FFFFFF'}
          />

          {/* Candle 2 */}
          <line
            x1="16"
            y1="8"
            x2="16"
            y2="24"
            stroke={isWhite ? '#FFFFFF' : '#FFFFFF'}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <rect
            x="14.5"
            y="11"
            width="3"
            height="8"
            rx="0.8"
            fill={isWhite ? '#FFFFFF' : '#FFFFFF'}
          />

          {/* Upward Profit Line */}
          <path
            d="M 12 20 L 17 14 L 21 17 L 26 9"
            stroke={isWhite ? '#4ADE80' : '#FFFFFF'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polyline
            points="22,9 26,9 26,13"
            stroke={isWhite ? '#4ADE80' : '#FFFFFF'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <div className={`font-black tracking-wider flex items-center ${textSizeClasses}`}>
          <span className={isWhite ? 'text-white' : 'text-[#005A36]'}>
            REALISTIS
          </span>
          <span className={isWhite ? 'text-[#4ADE80] ml-1' : 'text-[#00A651] ml-1'}>
            FX
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1 mt-0.5">
            <span
              className={`text-[9px] font-black tracking-widest uppercase px-1 py-0.2 rounded ${
                isWhite
                  ? 'bg-white/20 text-white'
                  : 'bg-[#E6F7EF] text-[#005A36]'
              }`}
            >
              EDUKASI
            </span>
            <span
              className={`text-[8px] font-bold tracking-tight ${
                isWhite ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              SOP ANTI-MC
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}
