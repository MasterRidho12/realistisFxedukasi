'use client';

import React, { useEffect, useRef, memo } from 'react';

interface TradingViewChartProps {
  symbol: string;
  height?: number | string;
}

function TradingViewChartComponent({ symbol, height = 520 }: TradingViewChartProps) {
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
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: '60',
      timezone: 'Asia/Jakarta',
      theme: 'light',
      style: '1',
      locale: 'id',
      enable_publishing: false,
      allow_symbol_change: false,
      calendar: false,
      support_host: 'https://www.tradingview.com',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      studies: ['STD;Pivot%1Points%1Standard'],
      overrides: {
        'mainSeriesProperties.candleStyle.upColor': '#00A651',
        'mainSeriesProperties.candleStyle.downColor': '#EF4444',
        'mainSeriesProperties.candleStyle.borderUpColor': '#00A651',
        'mainSeriesProperties.candleStyle.borderDownColor': '#EF4444',
        'mainSeriesProperties.candleStyle.wickUpColor': '#00A651',
        'mainSeriesProperties.candleStyle.wickDownColor': '#EF4444',
      },
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

export const TradingViewChart = memo(TradingViewChartComponent);
