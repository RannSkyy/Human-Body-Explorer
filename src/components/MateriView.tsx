import React, { useState } from 'react';
import { BodyPart } from '../types';
import { BODY_SYSTEMS_LIST } from '../data/bodyPartsData';
import { PartDetailModal } from './PartDetailModal';
import { sound } from '../utils/audio';
import {
  Search,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface MateriViewProps {
  allParts: BodyPart[];
  learnedIds: Set<string>;
  onToggleLearned: (partId: string) => void;
  onNavigateToQuiz: () => void;
  onNavigateToExplore: () => void;
}

export const MateriView: React.FC<MateriViewProps> = ({
  allParts,
  learnedIds,
  onToggleLearned,
  onNavigateToQuiz,
  onNavigateToExplore,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSystem, setSelectedSystem] = useState<string>('Semua Bagian');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'outer' | 'inner'>('all');
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);

  const filteredParts = allParts.filter((part) => {
    if (categoryFilter !== 'all' && part.category !== categoryFilter) {
      return false;
    }
    if (selectedSystem !== 'Semua Bagian' && part.system !== selectedSystem) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        part.name.toLowerCase().includes(q) ||
        part.latinName.toLowerCase().includes(q) ||
        part.shortDesc.toLowerCase().includes(q) ||
        part.fullExplanation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const learnedCount = learnedIds.size;
  const totalCount = allParts.length;
  const progressPercent = Math.round((learnedCount / totalCount) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 md:pb-12">
      {/* Header Banner */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ensiklopedia Ringkas Biologi SMP</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            Materi Pembelajaran Tubuh
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
            Pelajari fungsi organ secara terstruktur berdasarkan sistem tubuh manusia. Tandai materi yang sudah kamu kuasai!
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center gap-4 min-w-[260px]">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600 font-heading font-bold text-lg">
            {progressPercent}%
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>Progres Belajar</span>
              <span>{learnedCount} / {totalCount} Bagian</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-teal-500 to-sky-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs mb-6 space-y-3">
        {/* Search & Category Pills */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari bagian tubuh, nama ilmiah, atau fungsi organ..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-2xl self-start sm:self-auto shrink-0">
            <button
              onClick={() => {
                sound.playClick();
                setCategoryFilter('all');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({allParts.length})
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setCategoryFilter('outer');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === 'outer'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tubuh Luar
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setCategoryFilter('inner');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === 'inner'
                  ? 'bg-white text-teal-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Organ Dalam
            </button>
          </div>
        </div>

        {/* System Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Sistem:
          </span>
          {BODY_SYSTEMS_LIST.map((sys) => {
            const isSelected = selectedSystem === sys.name;
            return (
              <button
                key={sys.name}
                onClick={() => {
                  sound.playClick();
                  setSelectedSystem(sys.name);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sys.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Materi Cards Grid */}
      {filteredParts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-6">
          <p className="text-slate-500 font-medium text-sm">
            Tidak ada materi yang sesuai dengan pencarian atau filter yang dipilih.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSystem('Semua Bagian');
              setCategoryFilter('all');
            }}
            className="mt-3 px-4 py-2 bg-teal-100 text-teal-800 rounded-xl text-xs font-bold hover:bg-teal-200 transition-colors"
          >
            Hapus Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredParts.map((part) => {
            const isLearned = learnedIds.has(part.id);

            return (
              <div
                key={part.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedPart(part);
                }}
                className={`group bg-white rounded-3xl border p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 cursor-pointer ${
                  isLearned
                    ? 'border-emerald-200/80 shadow-xs hover:border-emerald-300'
                    : 'border-slate-200 shadow-xs hover:border-sky-300 hover:shadow-md'
                }`}
                tabIndex={0}
                role="button"
                aria-label={`Buka materi ${part.name}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPart(part);
                  }
                }}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white"
                      style={{ backgroundColor: part.color }}
                    >
                      {part.category === 'inner' ? 'Organ Dalam' : 'Tubuh Luar'}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        onToggleLearned(part.id);
                      }}
                      className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                        isLearned
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                          : 'bg-slate-50 border-slate-200 text-slate-300 hover:text-emerald-500'
                      }`}
                      title={isLearned ? 'Sudah dipelajari' : 'Klik untuk tandai paham'}
                      aria-label={`Tandai ${part.name} sudah dipelajari`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Organ Titles */}
                  <h2 className="text-xl font-heading font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                    {part.name}
                  </h2>
                  <p className="text-xs font-semibold text-slate-400 italic mb-2">
                    {part.latinName}
                  </p>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {part.shortDesc}
                  </p>

                  {/* Fun fact highlight box */}
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100 mb-4">
                    <div className="flex items-center gap-1.5 text-amber-800 text-[11px] font-bold mb-1">
                      <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                      <span>Fakta Menarik</span>
                    </div>
                    <p className="text-xs text-amber-950 line-clamp-2">
                      {part.funFact}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1 text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3 h-3 text-teal-600" />
                    {part.healthTips.length} Tips Sehat
                  </span>
                  <span className="flex items-center gap-1 text-slate-600 group-hover:text-teal-600 font-bold transition-colors">
                    Pelajari <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Next Step Suggestion */}
      <div className="mt-8 p-6 rounded-3xl bg-linear-to-r from-teal-600 via-sky-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-extrabold">
            Ingin Menguji Daya Ingatmu?
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
            Coba kuis interaktif 5 atau 7 soal untuk mengetahui seberapa banyak materi anatomi yang telah kamu kuasai.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToExplore();
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all cursor-pointer"
          >
            Jelajah Anatomi
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToQuiz();
            }}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-2xl bg-white text-teal-800 hover:bg-teal-50 text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            Masuk Kuis →
          </button>
        </div>
      </div>

      {/* Part Detail Modal */}
      <PartDetailModal
        part={selectedPart}
        onClose={() => setSelectedPart(null)}
        isLearned={selectedPart ? learnedIds.has(selectedPart.id) : false}
        onToggleLearned={onToggleLearned}
        allParts={allParts}
        onSelectPart={(p) => setSelectedPart(p)}
      />
    </div>
  );
};
