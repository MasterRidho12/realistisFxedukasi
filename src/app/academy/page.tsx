'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  GraduationCap,
  Sparkles,
  Lock,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Compass,
  Film,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Clock,
  TrendingUp,
  Search,
  ShieldCheck,
  Check,
  Info,
  Tv,
  Anchor,
  Layers,
  Award,
  Zap,
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import {
  ACADEMY_SAGAS,
  ALL_SEASONS,
  TOTAL_EPISODES_COUNT,
  AcademySeason,
  AcademyEpisode,
  AcademySaga,
} from '@/data/academyCurriculum';

export default function AcademyPage() {
  const { user, isPaymentModalOpen, openPaymentModal } = useUser();
  const searchParams = useSearchParams();

  // Pro access logic: user with PRO or explicitly granted access
  const isPro = user.tier === 'PRO';
  const hasAcademyAccess = isPro || Boolean(user.hasAcademyAccess);

  // Completed episodes stored in localStorage
  const [completedEpisodes, setCompletedEpisodes] = useState<string[]>([]);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('realistisfx_completed_episodes');
      if (saved) {
        setCompletedEpisodes(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveCompletedEpisodes = (newList: string[]) => {
    setCompletedEpisodes(newList);
    try {
      localStorage.setItem('realistisfx_completed_episodes', JSON.stringify(newList));
    } catch {
      // ignore
    }
  };

  // Selected Saga filter (null = all sagas)
  const [selectedSagaId, setSelectedSagaId] = useState<number | null>(null);

  // Search keyword filter
  const [searchQuery, setSearchQuery] = useState('');

  // Active Season
  const [activeSeason, setActiveSeason] = useState<AcademySeason>(() => {
    const sParam = searchParams?.get('season');
    if (sParam) {
      const found = ALL_SEASONS.find((s) => s.seasonNumber === parseInt(sParam, 10));
      if (found) return found;
    }
    return ALL_SEASONS[0];
  });

  // Active Episode inside the Active Season
  const [activeEpisode, setActiveEpisode] = useState<AcademyEpisode>(() => {
    const epParam = searchParams?.get('episode');
    if (epParam) {
      for (const s of ALL_SEASONS) {
        const found = s.episodes.find((e) => e.id === epParam);
        if (found) return found;
      }
    }
    return ALL_SEASONS[0].episodes[0];
  });

  // Handle URL param changes
  useEffect(() => {
    const sParam = searchParams?.get('season');
    const epParam = searchParams?.get('episode');

    if (sParam) {
      const sNum = parseInt(sParam, 10);
      const foundSeason = ALL_SEASONS.find((s) => s.seasonNumber === sNum);
      if (foundSeason) {
        setActiveSeason(foundSeason);
        if (epParam) {
          const foundEp = foundSeason.episodes.find((e) => e.id === epParam);
          if (foundEp) setActiveEpisode(foundEp);
        } else {
          setActiveEpisode(foundSeason.episodes[0]);
        }
      }
    }
  }, [searchParams]);

  // Video Player States (Simulated VT Dummy)
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTab, setActiveTab] = useState<'story' | 'takeaways' | 'playlist' | 'checklist'>('story');
  const [showDummyInfo, setShowDummyInfo] = useState(false);
  const [checklistAnswers, setChecklistAnswers] = useState<Record<string, boolean>>({});

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Active episode locked status
  const isEpisodeLocked = !activeEpisode.isFree && !hasAcademyAccess;

  // Reset video playback on episode switch
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTimeSec(0);
    if (playTimerRef.current) clearInterval(playTimerRef.current);
  }, [activeEpisode.id]);

  // Handle timer tick when playing
  useEffect(() => {
    if (isPlaying && !isEpisodeLocked) {
      playTimerRef.current = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= activeEpisode.durationSec) {
            setIsPlaying(false);
            return activeEpisode.durationSec;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, playbackSpeed, activeEpisode.durationSec, isEpisodeLocked]);

  const handleTogglePlay = () => {
    if (isEpisodeLocked) {
      openPaymentModal('EDUKASI');
      return;
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSkip = (deltaSec: number) => {
    if (isEpisodeLocked) return;
    setCurrentTimeSec((prev) => {
      const next = prev + deltaSec;
      return Math.max(0, Math.min(next, activeEpisode.durationSec));
    });
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEpisodeLocked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentTimeSec(Math.round(pct * activeEpisode.durationSec));
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressVideoPct = Math.min(
    100,
    Math.round((currentTimeSec / (activeEpisode.durationSec || 1)) * 100)
  );

  // Toggle episode completed mark
  const isCurrentEpisodeDone = completedEpisodes.includes(activeEpisode.id);
  const handleToggleEpisodeDone = () => {
    if (isCurrentEpisodeDone) {
      saveCompletedEpisodes(completedEpisodes.filter((id) => id !== activeEpisode.id));
    } else {
      saveCompletedEpisodes([...completedEpisodes, activeEpisode.id]);
    }
  };

  // Next episode logic
  const handleNextEpisode = () => {
    const currentIdx = activeSeason.episodes.findIndex((e) => e.id === activeEpisode.id);
    if (currentIdx < activeSeason.episodes.length - 1) {
      // Next in same season
      setActiveEpisode(activeSeason.episodes[currentIdx + 1]);
    } else {
      // Next season
      const currentSeasonIdx = ALL_SEASONS.findIndex((s) => s.seasonNumber === activeSeason.seasonNumber);
      if (currentSeasonIdx < ALL_SEASONS.length - 1) {
        const nextSeason = ALL_SEASONS[currentSeasonIdx + 1];
        setActiveSeason(nextSeason);
        setActiveEpisode(nextSeason.episodes[0]);
      }
    }
  };

  // Previous episode logic
  const handlePrevEpisode = () => {
    const currentIdx = activeSeason.episodes.findIndex((e) => e.id === activeEpisode.id);
    if (currentIdx > 0) {
      setActiveEpisode(activeSeason.episodes[currentIdx - 1]);
    } else {
      const currentSeasonIdx = ALL_SEASONS.findIndex((s) => s.seasonNumber === activeSeason.seasonNumber);
      if (currentSeasonIdx > 0) {
        const prevSeason = ALL_SEASONS[currentSeasonIdx - 1];
        setActiveSeason(prevSeason);
        setActiveEpisode(prevSeason.episodes[prevSeason.episodes.length - 1]);
      }
    }
  };

  // Select a season
  const handleSelectSeason = (season: AcademySeason) => {
    setActiveSeason(season);
    setActiveEpisode(season.episodes[0]);
  };

  // Select an episode
  const handleSelectEpisode = (ep: AcademyEpisode) => {
    if (!ep.isFree && !hasAcademyAccess) {
      setActiveEpisode(ep);
      // open prompt
      return;
    }
    setActiveEpisode(ep);
  };

  // Filtered seasons based on Saga filter and Search
  const visibleSeasons = useMemo(() => {
    return ALL_SEASONS.filter((s) => {
      // Saga filter
      if (selectedSagaId !== null && s.sagaId !== selectedSagaId) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSeason =
          s.title.toLowerCase().includes(q) ||
          s.arcName.toLowerCase().includes(q) ||
          s.tagline.toLowerCase().includes(q);
        const matchEpisode = s.episodes.some(
          (ep) =>
            ep.title.toLowerCase().includes(q) ||
            ep.storyTitle.toLowerCase().includes(q) ||
            ep.educationalTakeaway.toLowerCase().includes(q)
        );
        return matchSeason || matchEpisode;
      }
      return true;
    });
  }, [selectedSagaId, searchQuery]);

  // Total Progress Count & Percentage
  const completedCount = completedEpisodes.length;
  const overallProgressPct = Math.round((completedCount / TOTAL_EPISODES_COUNT) * 100);

  // Active season progress
  const seasonCompletedCount = activeSeason.episodes.filter((e) =>
    completedEpisodes.includes(e.id)
  ).length;
  const seasonProgressPct = Math.round(
    (seasonCompletedCount / activeSeason.episodes.length) * 100
  );

  return (
    <div className="space-y-6 sm:space-y-7 pb-16">
      {/* ======================================================== */}
      {/* 1. TOP HERO HEADER (THE ONE PIECE JOURNEY OF TRADING)     */}
      {/* ======================================================== */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-[#00381d] text-white p-5 sm:p-7 border border-emerald-950/60 shadow-xl relative overflow-hidden">
        {/* Glow and Maritime Trading Accents */}
        <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-[#00A651]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-60 h-60 rounded-full bg-emerald-700/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00A651]/20 border border-[#00A651]/40 text-[#4ade80] text-[11px] font-black uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                Serial Petualangan Edukasi Forex
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold border border-white/10">
                5 Saga • 20 Season • {TOTAL_EPISODES_COUNT} Episode
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                Season 1 &amp; 2 Gratis
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
              Ekspedisi Trader Realistis: Dari Pemula Menuju Trader Mandiri
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Pembelajaran trading forex tidak lagi membosankan dan kaku. Dikemas seperti serial petualangan
              berlayar yang membuka mindset, mengarungi ombak volatilitas, melatih perisai Money Management
              1%, hingga merakit sistem trading mandiri profesional.
            </p>
          </div>

          {/* Progress Tracker & Quick CTA */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3.5 shrink-0 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-xs">
            <div className="w-full sm:w-56 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> Progres Petualangan
                </span>
                <span className="text-[#4ade80] font-mono">{completedCount}/{TOTAL_EPISODES_COUNT}</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-[#00A651] to-[#4ade80] rounded-full transition-all duration-500"
                  style={{ width: `${overallProgressPct}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 text-right">
                {overallProgressPct}% Kurikulum Dikuasai
              </div>
            </div>

            {!hasAcademyAccess ? (
              <button
                onClick={() => openPaymentModal('EDUKASI')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A651] to-[#008F45] hover:brightness-110 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#00A651]/30 cursor-pointer active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Buka Akses Season 3-20 (Rp 250k/bln)</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Akses Penuh Seluruh Season Terbuka</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. SAGA SELECTOR & QUICK TOPIC SEARCH                    */}
      {/* ======================================================== */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-[#00A651] border border-emerald-200">
              <Layers className="w-4 h-4" />
            </span>
            <span className="text-xs font-black uppercase text-slate-700 tracking-wider">
              Pilih Saga Petualangan (5 Arc Besar)
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari materi: Candlestick, NFP, Lot, Emas..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#00A651] focus:ring-1 focus:ring-[#00A651]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Saga Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {/* Option All */}
          <button
            onClick={() => setSelectedSagaId(null)}
            className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              selectedSagaId === null
                ? 'border-[#00A651] bg-emerald-50/70 text-[#00A651] font-black shadow-xs ring-1 ring-[#00A651]/20'
                : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <div className="text-[10px] font-mono text-slate-400 uppercase">SEMUA SAGA</div>
            <div className="text-xs font-extrabold truncate mt-1">20 Season Lengkap</div>
            <div className="text-[10px] text-slate-500 mt-1">{TOTAL_EPISODES_COUNT} Episode</div>
          </button>

          {ACADEMY_SAGAS.map((saga) => {
            const isSelected = selectedSagaId === saga.id;
            return (
              <button
                key={saga.id}
                onClick={() => setSelectedSagaId(saga.id)}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#00A651] bg-emerald-50/70 text-[#00A651] font-black shadow-xs ring-1 ring-[#00A651]/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    SAGA {saga.sagaNumber}
                  </span>
                  {saga.id === 1 ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-[#00A651]">
                      S1-2 Gratis
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-50 text-amber-700">
                      Pro
                    </span>
                  )}
                </div>
                <div className="text-xs font-extrabold truncate mt-1">{saga.seasonRange}</div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {saga.animeTheme.split(':')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. SEASON HORIZONTAL CAROUSEL SELECTOR                   */}
      {/* ======================================================== */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-bold text-slate-700">
            Daftar Season ({visibleSeasons.length} Season Ditemukan):
          </span>
          <span className="text-[11px] text-slate-400">
            Klik season untuk membuka daftar episode &amp; pemutar video
          </span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
          {visibleSeasons.map((season) => {
            const isSelected = activeSeason.seasonNumber === season.seasonNumber;
            const isSeasonLocked = !season.isFree && !hasAcademyAccess;
            const completedCount = season.episodes.filter((e) =>
              completedEpisodes.includes(e.id)
            ).length;
            const isAllDone = completedCount === season.episodes.length && completedCount > 0;

            return (
              <button
                key={season.seasonNumber}
                onClick={() => handleSelectSeason(season)}
                className={`min-w-[190px] sm:min-w-[210px] max-w-[220px] p-3 rounded-2xl border text-left transition-all shrink-0 cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'border-[#00A651] bg-gradient-to-b from-emerald-50 to-white shadow-md ring-2 ring-[#00A651]/30'
                    : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs'
                }`}
              >
                {/* Active Indicator Top Bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#00A651]" />
                )}

                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded ${
                      isSelected
                        ? 'bg-[#00A651] text-white'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    SEASON {season.seasonNumber}
                  </span>

                  {isAllDone ? (
                    <span className="text-[9px] text-[#00A651] font-black flex items-center gap-0.5 bg-emerald-100 px-1.5 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3 text-[#00A651]" /> Selesai
                    </span>
                  ) : season.isFree ? (
                    <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-[#00A651]">
                      GRATIS
                    </span>
                  ) : isSeasonLocked ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> 250K/bln
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-[#00A651]">
                      TERBUKA
                    </span>
                  )}
                </div>

                <div className="font-extrabold text-xs text-slate-900 truncate">
                  {season.rawTitle}
                </div>
                <div className="text-[10px] text-slate-500 font-semibold truncate mt-0.5">
                  {season.arcName}
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{season.episodes.length} Video</span>
                  <span>{season.totalDuration}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MAIN LEARNING ENVIRONMENT: PLAYLIST + DUMMY VT PLAYER */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ======================================================== */}
        {/* LEFT COLUMN: SEASON PLAYLIST & EPISODES (4 Cols)        */}
        {/* ======================================================== */}
        <div className="lg:col-span-4 space-y-3">
          {/* Active Season Card Summary */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#00A651] px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                {activeSeason.arcName}
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                {seasonCompletedCount}/{activeSeason.episodes.length} Selesai
              </span>
            </div>

            <h2 className="text-sm font-black text-slate-900 leading-tight">
              {activeSeason.title}
            </h2>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              {activeSeason.description}
            </p>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00A651] rounded-full transition-all duration-300"
                style={{ width: `${seasonProgressPct}%` }}
              />
            </div>
          </div>

          {/* Episode List */}
          <div className="space-y-1.5 max-h-[620px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
            <div className="px-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Daftar Episode ({activeSeason.episodes.length})
            </div>

            {activeSeason.episodes.map((ep, idx) => {
              const isSelected = activeEpisode.id === ep.id;
              const isDone = completedEpisodes.includes(ep.id);
              const isLocked = !ep.isFree && !hasAcademyAccess;

              return (
                <div
                  key={ep.id}
                  onClick={() => handleSelectEpisode(ep)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-2.5 relative ${
                    isSelected
                      ? 'border-[#00A651] bg-emerald-50/70 shadow-xs ring-1 ring-[#00A651]/30'
                      : isLocked
                      ? 'border-slate-200 bg-slate-50/80 hover:border-amber-300'
                      : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-2xs'
                  }`}
                >
                  {/* Left State Icon */}
                  <div className="shrink-0 mt-0.5">
                    {isDone ? (
                      <span className="w-6 h-6 rounded-lg bg-emerald-100 text-[#00A651] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : isLocked ? (
                      <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5" />
                      </span>
                    ) : isSelected ? (
                      <span className="w-6 h-6 rounded-lg bg-[#00A651] text-white flex items-center justify-center animate-pulse">
                        <Play className="w-3 h-3 fill-white ml-0.5" />
                      </span>
                    ) : (
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-500 font-mono text-[11px] font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                    )}
                  </div>

                  {/* Episode Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono text-slate-400">
                        EP {ep.episodeNumber} • {ep.duration}
                      </span>
                      {ep.isFree ? (
                        <span className="text-[9px] font-bold text-[#00A651]">Gratis</span>
                      ) : isLocked ? (
                        <span className="text-[9px] font-bold text-amber-700 flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" /> Pro
                        </span>
                      ) : null}
                    </div>

                    <h3
                      className={`text-xs font-bold leading-snug truncate mt-0.5 ${
                        isSelected ? 'text-[#00A651] font-black' : 'text-slate-800'
                      }`}
                    >
                      {ep.title}
                    </h3>

                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {ep.storyTitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: VT DUMMY PLAYER & LESSON STORYLINE (8 Cols)*/}
        {/* ======================================================== */}
        <div className="lg:col-span-8 space-y-4">
          {/* VIDEO PLAYER FRAME CONTAINER */}
          <div
            ref={videoContainerRef}
            className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative select-none"
          >
            {/* 16:9 Aspect Ratio Canvas */}
            <div className="relative aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden">
              {/* Dynamic Animated Chart Canvas / Wave Background */}
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="w-full h-full grid grid-cols-8 grid-rows-5 divide-x divide-y divide-slate-800/50" />
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 450">
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00A651" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#00A651" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* EMA Moving Wave */}
                  <path
                    d="M 0,310 Q 180,140 380,260 T 800,160"
                    fill="none"
                    stroke="#00A651"
                    strokeWidth="3"
                    strokeDasharray={isPlaying ? 'none' : '5 5'}
                    className={isPlaying ? 'animate-pulse' : ''}
                  />
                  {/* Candlestick Group */}
                  <g opacity="0.85">
                    <rect x="70" y="240" width="12" height="40" fill="#00A651" rx="1" />
                    <line x1="76" y1="225" x2="76" y2="295" stroke="#00A651" strokeWidth="1.5" />

                    <rect x="130" y="200" width="12" height="60" fill="#00A651" rx="1" />
                    <line x1="136" y1="185" x2="136" y2="275" stroke="#00A651" strokeWidth="1.5" />

                    <rect x="200" y="220" width="12" height="50" fill="#ef4444" rx="1" />
                    <line x1="206" y1="205" x2="206" y2="285" stroke="#ef4444" strokeWidth="1.5" />

                    <rect x="290" y="170" width="12" height="70" fill="#00A651" rx="1" />
                    <line x1="296" y1="150" x2="296" y2="255" stroke="#00A651" strokeWidth="1.5" />

                    <rect x="380" y="230" width="12" height="45" fill="#ef4444" rx="1" />
                    <line x1="386" y1="215" x2="386" y2="290" stroke="#ef4444" strokeWidth="1.5" />

                    <rect x="470" y="150" width="12" height="85" fill="#00A651" rx="1" />
                    <line x1="476" y1="135" x2="476" y2="250" stroke="#00A651" strokeWidth="1.5" />

                    <rect x="570" y="120" width="12" height="65" fill="#00A651" rx="1" />
                    <line x1="576" y1="100" x2="576" y2="200" stroke="#00A651" strokeWidth="1.5" />

                    <rect x="670" y="90" width="12" height="75" fill="#00A651" rx="1" />
                    <line x1="676" y1="75" x2="676" y2="180" stroke="#00A651" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>

              {/* Watermark & Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] text-white/80 font-mono z-20 pointer-events-none">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#00A651] animate-ping" />
                  <span className="font-extrabold text-white tracking-wider">REALISTIS FX LMS</span>
                  <span className="text-white/40">|</span>
                  <span className="text-[#4ade80]">S{activeSeason.seasonNumber} • EP{activeEpisode.episodeNumber}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative pointer-events-auto">
                    <button
                      onClick={() => setShowDummyInfo(!showDummyInfo)}
                      className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 flex items-center gap-1 cursor-pointer hover:bg-amber-500/30 transition-colors"
                      title="Status Simulasi Video"
                    >
                      <Info className="w-3 h-3" />
                      <span>VT DUMMY</span>
                    </button>
                    {showDummyInfo && (
                      <div className="absolute right-0 top-8 w-64 p-3 rounded-xl bg-slate-900 border border-slate-700 text-[11px] text-slate-300 shadow-xl z-30 font-sans">
                        <strong className="text-amber-400 block mb-1">Simulasi Player VT Dummy:</strong>
                        Video resmi RealistisFx sedang dalam tahap pasca-produksi studio. Player interaktif ini telah mensimulasikan durasi penuh, materi terarah, dan alur kurikulum agar Anda dapat langsung belajar.
                      </div>
                    )}
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-slate-300 font-mono hidden sm:inline-block">
                    TRADER: {user.name ? user.name.slice(0, 10).toUpperCase() : 'MEMBER'}
                  </span>
                  <span className="px-1.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                    1080p HD
                  </span>
                </div>
              </div>

              {/* OVERLAY: IF EPISODE IS LOCKED */}
              {isEpisodeLocked ? (
                <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 space-y-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/10 animate-bounce">
                    <Lock className="w-7 h-7" />
                  </div>

                  <div className="max-w-md space-y-1.5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                      ★ MATERI EKSKLUSIF PAKET EDUKASI
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white pt-1">
                      {activeEpisode.title}
                    </h3>
                    <div className="text-xs text-amber-300 font-semibold italic">
                      &quot;{activeEpisode.storyTitle}&quot;
                    </div>

                    <div className="flex items-center justify-center gap-2 text-xs pt-1">
                      <span className="text-slate-400">Harga Normal:</span>
                      <span className="line-through text-slate-400 font-bold decoration-rose-500 decoration-2">
                        Rp 800.000
                      </span>
                      <span className="text-emerald-400 font-black bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                        Promo Rp 250.000 / Bulan
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      Buka seluruh akses kurikulum lengkap Season 3 sampai Season 20, SOP Money Management
                      1%, Fixed Stop Loss 30 Pips, dan Kalkulator Lot tanpa batas.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                    <button
                      onClick={() => openPaymentModal('EDUKASI')}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A651] to-[#008F45] hover:brightness-110 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-[#00A651]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Aktivasi Paket Edukasi (Rp 250.000 / Bln)</span>
                    </button>
                    <span className="text-[11px] text-emerald-400 font-semibold">
                      ✓ Diskon 69% (Hemat Rp 550.000)
                    </span>
                  </div>
                </div>
              ) : (
                /* PLAY SCREEN IF UNLOCKED */
                <div
                  onClick={handleTogglePlay}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group z-20"
                >
                  {/* Center Play/Pause Floating Button */}
                  <div
                    className={`w-16 h-16 rounded-full bg-[#00A651]/90 hover:bg-[#00A651] text-white flex items-center justify-center shadow-2xl transition-all duration-200 transform ${
                      isPlaying
                        ? 'opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100'
                        : 'opacity-100 scale-100 hover:scale-110'
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="w-7 h-7 fill-white" />
                    ) : (
                      <Play className="w-7 h-7 fill-white ml-1" />
                    )}
                  </div>

                  {/* Playing Indicator */}
                  {isPlaying && (
                    <div className="absolute bottom-16 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 text-white text-xs">
                      <span className="w-2 h-2 rounded-full bg-[#00A651] animate-ping" />
                      <span className="font-semibold text-[11px]">Memutar Simulasi VT Edukasi RealistisFx</span>
                    </div>
                  )}
                </div>
              )}

              {/* BOTTOM CONTROL BAR */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent z-30 space-y-2">
                {/* Scrubbable Seek Bar */}
                <div
                  onClick={handleSeek}
                  className="relative w-full h-1.5 hover:h-2.5 bg-white/20 rounded-full cursor-pointer transition-all overflow-hidden group/bar"
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#00A651] to-[#4ade80] rounded-full transition-all duration-150 relative"
                    style={{ width: `${progressVideoPct}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Control Buttons & Timestamps */}
                <div className="flex items-center justify-between text-white text-xs">
                  {/* Left: Play/Pause, Rewind, Forward, Time */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleTogglePlay}
                      className="p-1 hover:text-[#00A651] transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current" />
                      )}
                    </button>

                    <button
                      onClick={() => handleSkip(-10)}
                      className="p-1 hover:text-[#00A651] transition-colors cursor-pointer hidden sm:block"
                      title="Mundur 10 Detik"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleSkip(10)}
                      className="p-1 hover:text-[#00A651] transition-colors cursor-pointer hidden sm:block"
                      title="Maju 10 Detik"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>

                    <div className="font-mono text-[11px] text-slate-300">
                      <span className="text-white font-bold">{formatTime(currentTimeSec)}</span>
                      <span className="text-slate-500 mx-1">/</span>
                      <span>{activeEpisode.duration}</span>
                    </div>
                  </div>

                  {/* Right: Speed Multiplier, Audio, Fullscreen */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[11px] font-mono">
                      {[1, 1.25, 1.5, 2].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-1 rounded transition-colors cursor-pointer ${
                            playbackSpeed === spd
                              ? 'text-[#4ade80] font-bold underline'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1 text-slate-300 hover:text-white transition-colors cursor-pointer hidden sm:block"
                      title="Layar Penuh"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Sub-bar */}
            <div className="px-4 py-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A651]" />
                <span className="text-slate-400 font-medium">Sedang Memutar:</span>
                <span className="text-white font-bold">{activeEpisode.title}</span>
              </div>
              <span className="text-amber-400 text-[11px] italic">
                &quot;{activeEpisode.storyTitle}&quot;
              </span>
            </div>
          </div>

          {/* EPISODE DETAILS, STORYLINE & NOTES */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
            {/* Header: Title & Action Controls */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-50 text-[#00A651] border border-emerald-200">
                    SEASON {activeSeason.seasonNumber}
                  </span>
                  <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {activeEpisode.duration} Menit
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  {activeEpisode.title}
                </h2>
                <div className="text-xs font-bold text-[#00A651]">
                  Bab Cerita: {activeEpisode.storyTitle}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleToggleEpisodeDone}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isCurrentEpisodeDone
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${isCurrentEpisodeDone ? 'text-[#00A651]' : 'text-slate-400'}`}
                  />
                  <span>{isCurrentEpisodeDone ? 'Telah Selesai ✓' : 'Tandai Selesai'}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevEpisode}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                    title="Episode Sebelumnya"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextEpisode}
                    className="px-3 py-2 rounded-xl bg-[#00A651] hover:bg-[#008F45] text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                    title="Episode Berikutnya"
                  >
                    <span>Lanjut</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* TAB BUTTONS */}
            <div className="flex border-b border-slate-200 gap-4 text-xs font-bold overflow-x-auto">
              <button
                onClick={() => setActiveTab('story')}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'story'
                    ? 'border-[#00A651] text-[#00A651]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Jalan Cerita Petualangan</span>
              </button>

              <button
                onClick={() => setActiveTab('takeaways')}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'takeaways'
                    ? 'border-[#00A651] text-[#00A651]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Poin Inti Edukasi ({activeEpisode.keyPoints.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('checklist')}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'checklist'
                    ? 'border-[#00A651] text-[#00A651]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Checklist Pemahaman</span>
              </button>

              <button
                onClick={() => setActiveTab('playlist')}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 shrink-0 ${
                  activeTab === 'playlist'
                    ? 'border-[#00A651] text-[#00A651]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Playlist Season ({activeSeason.episodes.length})</span>
              </button>
            </div>

            {/* TAB 1: STORYLINE (ONE PIECE STYLE) */}
            {activeTab === 'story' && (
              <div className="space-y-4 pt-1 animate-in fade-in">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50/60 via-teal-50/30 to-white border border-emerald-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00A651]">
                    <Anchor className="w-4 h-4" />
                    <span>Sinopsis Petualangan Bab Ini</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {activeEpisode.synopsis}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Pesan Penting untuk Calon Trader Mandiri:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    &quot;{activeEpisode.educationalTakeaway}&quot;
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: TAKEAWAYS & KEY POINTS */}
            {activeTab === 'takeaways' && (
              <div className="space-y-3 pt-1 animate-in fade-in">
                <div className="text-xs font-bold text-slate-900">
                  Fondasi &amp; SOP Baku yang Wajib Diterapkan:
                </div>
                <div className="space-y-2">
                  {activeEpisode.keyPoints.map((point, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/80 flex items-start gap-2.5 transition-colors"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#00A651]/10 text-[#00A651] font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {pIdx + 1}
                      </span>
                      <span className="text-xs text-slate-700 leading-relaxed font-medium">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: CHECKLIST PEMAHAMAN */}
            {activeTab === 'checklist' && (
              <div className="space-y-3 pt-1 animate-in fade-in">
                <div className="text-xs font-bold text-slate-900">
                  Uji Pemahaman Episode Ini Sebelum Melangkah:
                </div>
                <div className="space-y-2">
                  {[
                    `Saya memahami esensi konsep "${activeEpisode.title}" tanpa tebak-tebakan.`,
                    'Saya paham mengapa over-lot dan melanggar batas risiko merusak mental trading.',
                    'Saya berkomitmen menerapkan SOP perlindungan modal di setiap keputusan transaksi.'
                  ].map((checkText, cIdx) => {
                    const checkKey = `${activeEpisode.id}_check_${cIdx}`;
                    const isChecked = Boolean(checklistAnswers[checkKey]);

                    return (
                      <label
                        key={cIdx}
                        className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() =>
                            setChecklistAnswers((prev) => ({
                              ...prev,
                              [checkKey]: !prev[checkKey],
                            }))
                          }
                          className="w-4 h-4 rounded text-[#00A651] focus:ring-[#00A651]"
                        />
                        <span className="text-xs leading-relaxed">{checkText}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: PLAYLIST */}
            {activeTab === 'playlist' && (
              <div className="space-y-2 pt-1 animate-in fade-in">
                <div className="text-xs font-bold text-slate-900 mb-2">
                  Navigasi Seluruh Episode {activeSeason.title}:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeSeason.episodes.map((ep, pIdx) => {
                    const isCur = ep.id === activeEpisode.id;
                    const isD = completedEpisodes.includes(ep.id);

                    return (
                      <button
                        key={ep.id}
                        onClick={() => handleSelectEpisode(ep)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                          isCur
                            ? 'bg-emerald-50 border-[#00A651] text-[#00A651] font-bold'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] font-mono text-slate-400">#{pIdx + 1}</span>
                          <span className="text-xs truncate">{ep.title.replace(/Episode \d+ — /, '')}</span>
                        </div>
                        {isD && <Check className="w-3.5 h-3.5 text-[#00A651] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
