import React, { useEffect } from 'react';
import { BodyPart } from '../types';
import { sound } from '../utils/audio';
import {
  X,
  Volume2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface PartDetailModalProps {
  part: BodyPart | null;
  onClose: () => void;
  isLearned: boolean;
  onToggleLearned: (partId: string) => void;
  allParts: BodyPart[];
  onSelectPart: (part: BodyPart) => void;
}

export const PartDetailModal: React.FC<PartDetailModalProps> = ({
  part,
  onClose,
  isLearned,
  onToggleLearned,
  allParts,
  onSelectPart,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!part) return null;

  // Find previous and next parts in the current category
  const filteredSameCategory = allParts.filter((p) => p.category === part.category);
  const currentIndex = filteredSameCategory.findIndex((p) => p.id === part.id);
  const prevPart = currentIndex > 0 ? filteredSameCategory[currentIndex - 1] : null;
  const nextPart = currentIndex < filteredSameCategory.length - 1 ? filteredSameCategory[currentIndex + 1] : null;

  const handleSpeak = () => {
    sound.speakText(`${part.name}. Nama ilmiah: ${part.latinName}. Fungsi utama: ${part.shortDesc}`);
  };

  const handleLearnedClick = () => {
    if (!isLearned) {
      sound.playCorrect();
    } else {
      sound.playClick();
    }
    onToggleLearned(part.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-part-title"
    >
      <div
        className="w-full sm:max-w-xl max-h-[88vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200/80 animate-in slide-in-from-bottom-6 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="relative px-6 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-r from-sky-50 via-white to-teal-50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-xs"
                  style={{ backgroundColor: part.color }}
                >
                  {part.category === 'inner' ? 'Organ Dalam' : 'Bagian Luar'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  {part.regionLabel}
                </span>
              </div>
              <h2 id="modal-part-title" className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
                {part.name}
              </h2>
              <p className="text-sm font-medium text-sky-700 italic">
                Nama Ilmiah: {part.latinName}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-full bg-white text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer shadow-xs focus:outline-hidden focus-visible:ring-2 focus-visible:ring-sky-500"
              aria-label="Tutup panel penjelasan organ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Bar under Title: Audio Pronounce & Learned toggle */}
          <div className="flex items-center gap-2.5 mt-3">
            <button
              onClick={handleSpeak}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-sky-300 text-sky-700 hover:text-sky-900 text-xs font-bold shadow-2xs hover:bg-sky-50 transition-all cursor-pointer"
              title="Dengarkan pembacaan teks organ"
            >
              <Volume2 className="w-4 h-4 text-sky-600 animate-pulse" />
              <span>Dengarkan Suara</span>
            </button>

            <button
              onClick={handleLearnedClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isLearned
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${isLearned ? 'text-emerald-600' : 'text-slate-400'}`}
              />
              <span>{isLearned ? 'Sudah Dipelajari' : 'Tandai Sudah Dipelajari'}</span>
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700">
          {/* Sistem Organ Banner */}
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-sky-900 text-xs font-semibold">
            <BookOpen className="w-4 h-4 text-sky-600 shrink-0" />
            <span>Bagian dari: <strong className="font-bold text-sky-800">{part.system}</strong></span>
          </div>

          {/* Fungsi Utama */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Fungsi Utama
            </h3>
            <p className="text-base font-semibold text-slate-900 leading-snug p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70">
              {part.shortDesc}
            </p>
          </section>

          {/* Penjelasan Lengkap Biologi SMP */}
          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Penjelasan Biologi SMP
            </h3>
            <p className="text-sm leading-relaxed text-slate-700 font-normal">
              {part.fullExplanation}
            </p>
          </section>

          {/* Fakta Menarik */}
          <section className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Tahukah Kamu? (Fakta Seru)</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
              {part.funFact}
            </p>
          </section>

          {/* Tips Menjaga Kesehatan */}
          <section className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Tips Menjaga Kesehatan</span>
            </div>
            <ul className="space-y-1.5">
              {part.healthTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-emerald-950 font-medium">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer with Prev / Next Organ Navigation */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between gap-3">
          {prevPart ? (
            <button
              onClick={() => {
                sound.playClick();
                onSelectPart(prevPart);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-700 p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Sebelumnya:</span> {prevPart.name}
            </button>
          ) : (
            <div />
          )}

          {nextPart && (
            <button
              onClick={() => {
                sound.playClick();
                onSelectPart(nextPart);
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-sky-700 p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all cursor-pointer ml-auto"
            >
              <span className="hidden sm:inline">Selanjutnya:</span> {nextPart.name}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
