import React from 'react';
import { Volume2, VolumeX, Compass, BookOpen, HelpCircle, Info, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';
import { sound } from '../utils/audio';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  learnedCount: number;
  totalPartsCount: number;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  learnedCount,
  totalPartsCount,
  isMuted,
  onToggleMute,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: 'Beranda', icon: Sparkles },
    { id: 'explore', label: 'Jelajah Tubuh', icon: Compass },
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'quiz', label: 'Kuis & Game', icon: HelpCircle },
    { id: 'about', label: 'Tentang', icon: Info },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    sound.playClick();
    onTabChange(tab);
  };

  const progressPercent = Math.round((learnedCount / Math.max(1, totalPartsCount)) * 100);

  return (
    <>
      {/* Top Header (Visible on all screens) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1 transition-transform active:scale-95"
            aria-label="Kembali ke Beranda Human Body Explorer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 via-sky-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
                  Human Body Explorer
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-sky-100 text-sky-700 hidden sm:inline-block">
                  SMP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none mt-1 hidden sm:block">
                Eksplorasi Anatomi & Game Kuis Interaktif
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Navigasi Utama">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-sm shadow-sky-500/30'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar: Progress Badge & Sound Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Learned Progress Indicator */}
            <button
              onClick={() => handleNavClick('materi')}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-sky-50 hover:bg-sky-100/80 border border-sky-200/60 rounded-xl text-xs font-semibold text-sky-800 transition-colors cursor-pointer"
              title="Kemajuan belajar materi anatomi"
              aria-label={`Kemajuan belajar: ${learnedCount} dari ${totalPartsCount} organ`}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold">{learnedCount}/{totalPartsCount}</span>
              <span className="hidden sm:inline font-medium text-sky-600">Terpelajari</span>
              <span className="text-[10px] bg-sky-200 text-sky-800 px-1.5 py-0.2 rounded-md font-bold">
                {progressPercent}%
              </span>
            </button>

            {/* Audio Mute/Unmute Toggle */}
            <button
              onClick={onToggleMute}
              className={`p-2 rounded-xl border transition-all cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500 ${
                isMuted
                  ? 'bg-slate-100 border-slate-300 text-slate-400 hover:text-slate-600'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 shadow-xs'
              }`}
              title={isMuted ? 'Suara dimatikan (Klik untuk nyalakan)' : 'Suara aktif (Klik untuk matikan)'}
              aria-label={isMuted ? 'Nyalakan efek suara' : 'Matikan efek suara'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Fixed for comfortable thumb reach) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-lg flex items-center justify-around"
        aria-label="Navigasi Seluler"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all cursor-pointer min-w-[56px] ${
                isActive
                  ? 'text-sky-600 font-bold scale-105'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  isActive ? 'bg-sky-100 text-sky-600' : 'bg-transparent text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
