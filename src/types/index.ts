export type UserTier = 'FREE' | 'PRO';

export interface UserState {
  id: string;
  name: string;
  email: string;
  password?: string;
  whatsapp: string;
  accountType: 'STANDARD' | 'CENT';
  avatar?: string;
  tier: UserTier;
  role: 'USER' | 'ADMIN';
  isAuthenticated: boolean;
  telegramLinked: boolean;
  telegramChatId?: string;
  dailyCalculatorCount: number;
  disciplineScore: number;
  winRate: number;
  totalTrades: number;
  strictModeEnabled: boolean;
  isChecklistPassed: boolean;
  hasAcademyAccess?: boolean;
  subscriptionStatus?: 'NONE' | 'PENDING' | 'ACTIVE';
  proExpiryDate?: string;
}

export interface SubscriptionRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  planName: string;
  amount: number;
  paymentMethod: string;
  proofScreenshot?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  notes?: string;
}

export interface NavItem {
  name: string;
  href: string;
  iconName: string;
  badge?: string;
  badgeColor?: 'green' | 'blue' | 'amber';
  proOnly?: boolean;
}

export interface MarketPrice {
  symbol: string;
  price: number;
  change24h: number;
  bid: number;
  ask: number;
  spread: number;
  high24h: number;
  low24h: number;
  updatedAt: string;
  isLive: boolean;
}

export type JournalExitStatus = 'HIT_SL' | 'HIT_TP' | 'REALTIME_CLOSE' | 'MANUAL_CLOSE' | 'RUNNING';

export interface JournalRecord {
  id: string;
  date: string;
  pair: string;
  direction: 'BUY' | 'SELL';
  lot: number;
  entryPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  exitPrice: number;
  exitStatus?: JournalExitStatus;
  pnl: number;
  pips: number;
  accountType: 'STANDARD' | 'CENT';
  emotion: 'CALM_CONFIDENT' | 'ANXIOUS_GREEDY' | 'FOMO' | 'REVENGE_TRADING' | 'DISCIPLINED';
  adheredToPlan: boolean;
  notes: string;
}

export interface InvestorAccount {
  platform: 'MT4' | 'MT5';
  brokerServer: string;
  accountNumber: string;
  accountName: string;
  accountType?: 'STANDARD' | 'CENT';
  balance: number;
  equity: number;
  deposit: number;
  currency: string;
  connectedAt: string;
  lastSyncAt: string;
  status: 'CONNECTED' | 'SYNCING' | 'DISCONNECTED';
  dataSource?: 'INVESTOR_SYNC' | 'STATEMENT_UPLOAD' | 'EA_SYNC';
}

export interface InvestorTrade {
  ticket: number;
  openTime: string;
  closeTime: string;
  pair: string;
  type: 'BUY' | 'SELL';
  lot: number;
  openPrice: number;
  closePrice: number;
  stopLoss?: number;
  takeProfit?: number;
  pnl: number;
  pips: number;
  sopCompliant: boolean;
  notes?: string;
}

export interface TrackRecordPerformance {
  grade: 'A' | 'B' | 'C';
  score: number;
  verdict: string;
  verdictSub: string;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  profitFactor: number;
  totalProfit: number;
  totalLoss: number;
  netPnL: number;
  maxDrawdown: number;
  avgWin: number;
  avgLoss: number;
  riskRewardRatio: number;
  slDisciplineRate: number;
  summary: string;
  diagnostics: {
    title: string;
    status: 'BAGUS' | 'CUKUP' | 'PERLU_PERBAIKAN';
    message: string;
  }[];
  recommendations: string[];
}


