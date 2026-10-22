'use client';

import React, { useEffect, useRef } from 'react';

interface TradingViewMiniChartProps {
  symbol?: string; // 'XAUUSD' | 'EURUSD' | 'GBPUSD' | 'USDJPY'
  height?: number;
  className?: string;
}

const SYMBOL_MAP: Record<string, string> = {
  XAUUSD: 'FX_IDC:XAUUSD',
  EURUSD: 'FX:EURUSD',
  GBPUSD: 'FX:GBPUSD',
  USDJPY: 'FX:USDJPY',
};

export default function TradingViewMiniChart({
  symbol = 'XAUUSD',
  height = 200,
  className = '',
}: TradingViewMiniChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tvSymbol = SYMBOL_MAP[symbol] || `FX:${symbol}`;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    container.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: tvSymbol,
      width: '100%',
      height: height,
      locale: 'id',
      dateRange: '1D',
      colorTheme: 'light',
      isTransparent: true,
      autosize: false,
      largeChartUrl: '',
      chartOnly: false,
      noTimeScale: false,
    });

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [tvSymbol, height]);

  return (
    <div className={`tradingview-widget-container rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs ${className}`} ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}
