export interface ForexFactoryRawItem {
  title: string;
  country: string;
  date: string;
  impact: string;
  forecast?: string;
  previous?: string;
  actual?: string;
}

export interface ActualResultData {
  actual: string;
  hasReleased: boolean;
  status: 'BETTER' | 'WORSE' | 'NEUTRAL' | 'PENDING';
  statusLabel: string;
  statusColor: 'green' | 'red' | 'gray';
  impactVerdict: string;
}

export interface SpikeAnalysis {
  hasSpikeRisk: boolean;
  spikeProbability: 'SANGAT TINGGI (Whipsaw Ekstrem)' | 'TINGGI' | 'SEDANG' | 'RENDAH';
  spikePatternExpected: string;
  spikeWarningText: string;
  recommendedAction: string;
  hasSpikeOccurred?: boolean;
  spikeBehaviorResult?: string;
  spikeMaxWickPips?: string;
  trendFollowPips?: string;
}

export interface ExecutionResult {
  isExecuted: boolean;
  executedAction:
    | 'BUY STOP'
    | 'SELL STOP'
    | 'BUY LIMIT'
    | 'SELL LIMIT'
    | 'INSTANT BUY'
    | 'INSTANT SELL'
    | 'NONE';
  executedPair: string;
  entryFilledPrice: string;
  stopLossPrice: string;
  takeProfit1Price: string;
  takeProfit2Price: string;
  outcomeStatus: 'HIT_TP2' | 'HIT_TP1' | 'HIT_SL' | 'CANCELED_OCO' | 'PENDING';
  outcomeBadge: string;
  outcomeColor: 'green' | 'red' | 'gray';
  pipGain: string;
  usdGainApprox: string;
  canceledSetupText: string;
  executionTimeText: string;
  tradeDuration: string;
  executionNotes: string;
}

export interface TechnicalLevelInfo {
  symbol: string;
  pairLabel: string;
  liveSpot: number;
  spotFormatted: string;
  high: number;
  low: number;
  pivot: number;
  s1: number;
  r1: number;
  pipUnit: string;
}

export interface TwoWaySignal {
  primaryPair: string;
  winRate: number; // e.g. 95 (%)
  averagePipMove: string; // e.g. '180 - 450 Pips'
  reliabilityScore: number; // e.g. 4.9 (out of 5)
  historicalSample: string;
  buySetup: {
    title: string;
    triggerCondition: string;
    actionType: 'BUY STOP' | 'BUY LIMIT' | 'INSTANT BUY';
    entryArea: string;
    stopLoss: string;
    takeProfit1: string;
    takeProfit2: string;
    riskReward: string;
    rationale: string;
  };
  sellSetup: {
    title: string;
    triggerCondition: string;
    actionType: 'SELL STOP' | 'SELL LIMIT' | 'INSTANT SELL';
    entryArea: string;
    stopLoss: string;
    takeProfit1: string;
    takeProfit2: string;
    riskReward: string;
    rationale: string;
  };
  activeTrigger: 'BUY' | 'SELL' | 'NEUTRAL' | 'WAITING';
  triggerBadgeText: string;
  triggerExplanation: string;
}

export interface EnrichedNewsItem {
  id: string;
  currency: string;
  title: string;
  impact: 'High' | 'Medium' | 'Low' | 'Holiday';
  impactColor: 'red' | 'orange' | 'yellow' | 'gray';
  timeUTC: string;
  dateISO: string; // YYYY-MM-DD
  timeWIB: string;
  timeFormatted: string;
  dateFormatted: string;
  dayName: string;
  isUpcoming: boolean;
  timeRemainingText: string;
  forecast: string;
  previous: string;
  actualData: ActualResultData;
  spikeAnalysis: SpikeAnalysis;
  executionResult: ExecutionResult;
  technicalLevels: TechnicalLevelInfo;
  signal: TwoWaySignal;
  primaryAffectedPair: string;
  affectedPairs: string[];
  impactExplanation: string;
  sourceType: 'LIVE_FOREX_FACTORY' | 'UPCOMING_SCHEDULED_ROADMAP' | 'FOREX_FACTORY_RESEARCH';
}

export interface LiveMarketQuote {
  symbol: string;
  name: string;
  price: number;
  open: number;
  high: number;
  low: number;
  change24h: number;
  pivot: number;
  s1: number;
  r1: number;
  digits: number;
  pipMultiplier: number;
}

// Fallback baseline quotes if network is unreachable
export const DEFAULT_MARKET_QUOTES: Record<string, LiveMarketQuote> = {
  XAUUSD: {
    symbol: 'XAUUSD',
    name: 'Gold Spot / US Dollar',
    price: 3881.0,
    open: 3879.28,
    high: 3923.09,
    low: 3867.67,
    change24h: 0.15,
    pivot: 3991.16,
    s1: 3754.8,
    r1: 4112.01,
    digits: 2,
    pipMultiplier: 10,
  },
  EURUSD: {
    symbol: 'EURUSD',
    name: 'Euro / US Dollar',
    price: 1.1022,
    open: 1.1054,
    high: 1.1073,
    low: 1.102,
    change24h: -0.05,
    pivot: 1.1199,
    s1: 1.1062,
    r1: 1.1295,
    digits: 4,
    pipMultiplier: 10000,
  },
  GBPUSD: {
    symbol: 'GBPUSD',
    name: 'British Pound / US Dollar',
    price: 1.3211,
    open: 1.3234,
    high: 1.3251,
    low: 1.3205,
    change24h: 0.03,
    pivot: 1.3319,
    s1: 1.3205,
    r1: 1.3501,
    digits: 4,
    pipMultiplier: 10000,
  },
  USDJPY: {
    symbol: 'USDJPY',
    name: 'US Dollar / Japanese Yen',
    price: 159.71,
    open: 159.83,
    high: 160.19,
    low: 159.52,
    change24h: -0.03,
    pivot: 157.53,
    s1: 156.11,
    r1: 158.99,
    digits: 2,
    pipMultiplier: 100,
  },
  AUDUSD: {
    symbol: 'AUDUSD',
    name: 'Australian Dollar / US Dollar',
    price: 0.6775,
    open: 0.6812,
    high: 0.6815,
    low: 0.6769,
    change24h: -0.12,
    pivot: 0.6998,
    s1: 0.6927,
    r1: 0.7101,
    digits: 4,
    pipMultiplier: 10000,
  },
  USDCAD: {
    symbol: 'USDCAD',
    name: 'US Dollar / Canadian Dollar',
    price: 1.427,
    open: 1.4255,
    high: 1.4274,
    low: 1.4228,
    change24h: 0.1,
    pivot: 1.407,
    s1: 1.3841,
    r1: 1.4199,
    digits: 4,
    pipMultiplier: 10000,
  },
  USDCHF: {
    symbol: 'USDCHF',
    name: 'US Dollar / Swiss Franc',
    price: 0.8391,
    open: 0.836,
    high: 0.8397,
    low: 0.8342,
    change24h: 0.12,
    pivot: 0.8279,
    s1: 0.8162,
    r1: 0.8366,
    digits: 4,
    pipMultiplier: 10000,
  },
  NZDUSD: {
    symbol: 'NZDUSD',
    name: 'New Zealand Dollar / US Dollar',
    price: 0.5522,
    open: 0.554,
    high: 0.5552,
    low: 0.5521,
    change24h: -0.2,
    pivot: 0.5634,
    s1: 0.5558,
    r1: 0.5703,
    digits: 4,
    pipMultiplier: 10000,
  },
};
