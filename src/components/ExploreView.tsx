import React, { useState } from 'react';
import { BodyPart, CategoryType } from '../types';
import { AnatomyFigure } from './AnatomyFigure';
import { PartDetailModal } from './PartDetailModal';
import { sound } from '../utils/audio';
import { Search, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

interface ExploreViewProps {
  allParts: BodyPart[];
  learnedIds: Set<string>;
  onToggleLearned: (partId: string) => void;
  onNavigateToQuiz: () => void;
  onNavigateToMateri: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  allParts,
  learnedIds,
  onToggleLearned,
  onNavigateToQuiz,
  onNavigateToMateri,
}) => {
  const [categoryMode, setCategoryMode] = useState<CategoryType>('outer');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);

  const handleCategorySwitch = (cat: CategoryType) => {
    sound.playSelect();
    setCategoryMode(cat);
    setSelectedPart(null);
  };

  const handleSelectPart = (part: BodyPart) => {
    setSelectedPart(part);
  };

  // Filter parts for the chip carousel & list
  const currentCategoryParts = allParts.filter((p) => p.category === categoryMode);

  const filteredParts = currentCategoryParts.filter((part) => {
    if (selectedRegion !== 'all' && part.region !== selectedRegion) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        part.name.toLowerCase().includes(q) ||
        part.latinName.toLowerCase().includes(q) ||
        part.shortDesc.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      {/* Top Banner / Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Laboratorium Anatomi Interaktif SMP</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Jelajahi Tubuh Manusia
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
            Ketuk bagian tubuh atau organ di bawah ini untuk mempelajari fungsi, letak, fakta menarik, serta cara menjaga kesehatannya.
          </p>
        </div>

        {/* View Mode Switcher Pill */}
        <div className="inline-flex p-1 bg-slate-200/80 rounded-2xl border border-slate-300/80 shadow-inner self-start md:self-auto">
          <button
            onClick={() => handleCategorySwitch('outer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              categoryMode === 'outer'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Tubuh Luar ({allParts.filter((p) => p.category === 'outer').length})</span>
          </button>
          <button
            onClick={() => handleCategorySwitch('inner')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              categoryMode === 'inner'
                ? 'bg-white text-sky-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Organ Dalam ({allParts.filter((p) => p.category === 'inner').length})</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Body Vector + Interactive List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Anatomy Model (5 cols on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <AnatomyFigure
            parts={allParts}
            selectedPart={selectedPart}
            onSelectPart={handleSelectPart}
            categoryMode={categoryMode}
          />
        </div>

        {/* Right Column: Search, Filter, Quick Chips & List (7 cols on desktop) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Search bar & Region Filters */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Cari nama bagian tubuh atau organ (misal: ${categoryMode === 'outer' ? 'Mata, Jari, Dada' : 'Jantung, Paru-paru, Ginjal'})...`}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 p-1"
                >
                  Batal
                </button>
              )}
            </div>

            {/* Region Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {[
                { id: 'all', label: 'Semua Area' },
                { id: 'head', label: 'Kepala & Leher' },
                { id: 'chest', label: 'Dada' },
                { id: 'abdomen', label: 'Perut & Pinggang' },
                { id: 'limbs_upper', label: 'Lengan & Tangan' },
                { id: 'limbs_lower', label: 'Paha & Kaki' },
              ].map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedRegion(r.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedRegion === r.id
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* List of Organ / Body Part Cards */}
          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredParts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 p-6">
                <p className="text-slate-500 text-sm font-medium">
                  Tidak ditemukan bagian tubuh dengan kata kunci "{searchQuery}".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedRegion('all');
                  }}
                  className="mt-3 px-4 py-1.5 bg-sky-100 text-sky-700 rounded-xl text-xs font-bold hover:bg-sky-200 transition-colors"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : (
              filteredParts.map((part) => {
                const isLearned = learnedIds.has(part.id);
                const isSelected = selectedPart?.id === part.id;

                return (
                  <div
                    key={part.id}
                    onClick={() => {
                      sound.playClick();
                      handleSelectPart(part);
                    }}
                    className={`group p-4 bg-white rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-sky-500 ring-2 ring-sky-200 bg-sky-50/40 shadow-sm'
                        : 'border-slate-200 hover:border-sky-300 hover:shadow-xs'
                    }`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Lihat detail ${part.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectPart(part);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Color indicator dot */}
                      <div
                        className="w-3.5 h-3.5 rounded-full mt-1 shrink-0 ring-4 ring-slate-100"
                        style={{ backgroundColor: part.color }}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-heading font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                            {part.name}
                          </h2>
                          <span className="text-xs text-slate-400 italic">
                            ({part.latinName})
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                          {part.shortDesc}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                            {part.regionLabel}
                          </span>
                          <span className="text-[11px] text-sky-600 font-medium">
                            {part.system}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      {isLearned ? (
                        <span
                          className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl"
                          title="Sudah kamu pelajari"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="hidden sm:inline">Paham</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold text-slate-400 group-hover:text-sky-600 transition-colors">
                          Lihat Detail →
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Action Footer */}
          <div className="mt-2 p-4 rounded-3xl bg-linear-to-r from-sky-500 to-teal-500 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div>
              <h3 className="font-heading font-bold text-base">Sudah siap menguji ingatanmu?</h3>
              <p className="text-xs text-sky-100">
                Latih pemahamanmu dengan kuis interaktif atau baca ensiklopedia lengkap di menu Materi.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateToMateri();
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl transition-all cursor-pointer backdrop-blur-xs"
              >
                Buka Materi
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  onNavigateToQuiz();
                }}
                className="flex-1 sm:flex-none px-4 py-2 bg-white text-sky-700 hover:bg-sky-50 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              >
                Mulai Kuis →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Part Detail Modal / Drawer */}
      <PartDetailModal
        part={selectedPart}
        onClose={() => setSelectedPart(null)}
        isLearned={selectedPart ? learnedIds.has(selectedPart.id) : false}
        onToggleLearned={onToggleLearned}
        allParts={allParts}
        onSelectPart={handleSelectPart}
      />
    </div>
  );
};
