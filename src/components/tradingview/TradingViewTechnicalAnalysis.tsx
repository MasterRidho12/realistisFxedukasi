'use client';

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewTechnicalAnalysisProps {
  symbol: string;
  height?: number | string;
}

function TradingViewTechnicalAnalysisComponent({ symbol, height = 440 }: TradingViewTechnicalAnalysisProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    currentContainer.innerHTML = '';

    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = '100%';
    widgetDiv.style.width = '100%';
    currentContainer.appendChild(widgetDiv);

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: '1h',
      width: '100%',
      isTransparent: false,
      height: '100%',
      symbol: symbol,
      showIntervalTabs: true,
      displayMode: 'single',
      locale: 'id',
      colorTheme: 'light',
    });

    currentContainer.appendChild(script);

    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [symbol]);

  return (
    <div
      ref={containerRef}
      className="tradingview-widget-container w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-white"
      style={{ height }}
    />
  );
}

export const TradingViewTechnicalAnalysis = memo(TradingViewTechnicalAnalysisComponent);
