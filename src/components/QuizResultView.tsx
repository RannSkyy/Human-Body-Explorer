import React, { useEffect } from 'react';
import { QuizResult, QuizMode } from '../types';
import { sound } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';
import {
  Trophy,
  RotateCcw,
  BookOpen,
  Compass,
  CheckCircle2,
  XCircle,
  Star,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface QuizResultViewProps {
  result: QuizResult;
  mode: QuizMode;
  onRestart: () => void;
  onNavigateToMateri: () => void;
  onNavigateToExplore: () => void;
}

export const QuizResultView: React.FC<QuizResultViewProps> = ({
  result,
  mode,
  onRestart,
  onNavigateToMateri,
  onNavigateToExplore,
}) => {
  const [showReview, setShowReview] = React.useState(false);

  useEffect(() => {
    sound.playVictory();
    if (result.scorePercentage >= 60) {
      fireConfetti();
    }
  }, [result.scorePercentage]);

  const modeTitle =
    mode === 'quick'
      ? 'Kuis Singkat (5 Soal)'
      : mode === 'standard'
      ? 'Kuis Standar (7 Soal)'
      : 'Tantangan Tebak Letak Organ';

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Top Celebration Header */}
        <div className="p-8 text-center bg-gradient-to-b from-sky-50 via-indigo-50/50 to-white border-b border-slate-100">
          {/* Trophy Icon */}
          <div className="inline-flex p-4 rounded-3xl bg-amber-100/80 text-amber-600 shadow-md mb-4 ring-8 ring-amber-50 animate-bounce">
            <Trophy className="w-12 h-12" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
            Hasil Akhir: {modeTitle}
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
            {result.badgeTitle}
          </h2>

          <p className="text-slate-600 text-sm mt-1.5 max-w-md mx-auto">
            {result.badgeDescription}
          </p>

          {/* Star Rating */}
          <div className="flex items-center justify-center gap-2 mt-4" aria-label={`Nilai: ${result.stars} dari 3 bintang`}>
            {[1, 2, 3].map((starIdx) => (
              <Star
                key={starIdx}
                className={`w-8 h-8 transition-all ${
                  starIdx <= result.stars
                    ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-sm'
                    : 'text-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Score Stats Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-3 gap-3 text-center">
            {/* Score Percentage */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Nilai Akhir
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-sky-600 mt-0.5">
                {result.scorePercentage}
                <span className="text-sm font-semibold text-slate-400">%</span>
              </div>
            </div>

            {/* Total Benar */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Benar
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-emerald-700 mt-0.5">
                {result.correctAnswers}
                <span className="text-xs font-semibold text-emerald-600"> / {result.totalQuestions}</span>
              </div>
            </div>

            {/* Total Salah */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 flex items-center justify-center gap-1">
                <XCircle className="w-3.5 h-3.5" /> Salah
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-black text-rose-700 mt-0.5">
                {result.wrongAnswers}
                <span className="text-xs font-semibold text-rose-600"> / {result.totalQuestions}</span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-sky-900 leading-relaxed font-medium">
              {result.evaluationMessage}
            </p>
          </div>

          {/* Answer Review Accordion Toggle */}
          {result.userAnswers.length > 0 && (
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowReview(!showReview);
                }}
                className="w-full p-4 flex items-center justify-between text-left text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>Lihat Pembahasan Lengkap ({result.userAnswers.length} Soal)</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                    showReview ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showReview && (
                <div className="p-4 bg-slate-50/80 border-t border-slate-200 space-y-4">
                  {result.userAnswers.map((ans, idx) => (
                    <div
                      key={ans.questionId}
                      className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs sm:text-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-slate-900">
                          {idx + 1}. {ans.questionText}
                        </span>
                        {ans.isCorrect ? (
                          <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold text-[11px] shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md font-bold text-[11px] shrink-0">
                            <XCircle className="w-3.5 h-3.5" /> Salah
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-xs">
                        <p className="text-slate-600">
                          Jawabanmu:{' '}
                          <span className={ans.isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold line-through'}>
                            {ans.selectedOption}
                          </span>
                        </p>
                        {!ans.isCorrect && (
                          <p className="text-emerald-700 font-bold">
                            Kunci Jawaban: {ans.correctOption}
                          </p>
                        )}
                      </div>

                      <div className="p-2.5 rounded-lg bg-sky-50 text-sky-900 text-xs">
                        💡 <strong>Pembahasan:</strong> {ans.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                onRestart();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateToMateri();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-500" />
              <span>Baca Materi</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateToExplore();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-slate-500" />
              <span>Jelajah</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
