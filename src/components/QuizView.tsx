import React, { useState } from 'react';
import { BodyPart, QuizMode, QuizQuestion, QuizResult } from '../types';
import { generateQuizQuestions, calculateScoreResult } from '../utils/quizLogic';
import { QuizResultView } from './QuizResultView';
import { sound } from '../utils/audio';
import {
  HelpCircle,
  Zap,
  Award,
  Compass,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
} from 'lucide-react';

interface QuizViewProps {
  allParts: BodyPart[];
  onNavigateToMateri: () => void;
  onNavigateToExplore: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  allParts,
  onNavigateToMateri,
  onNavigateToExplore,
}) => {
  const [selectedMode, setSelectedMode] = useState<QuizMode | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userAnswersRecord, setUserAnswersRecord] = useState<{
    questionId: string;
    questionText: string;
    selectedOption: string;
    correctOption: string;
    isCorrect: boolean;
    explanation: string;
  }[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Start a new quiz session
  const handleStartQuiz = (mode: QuizMode) => {
    sound.playSelect();
    const newQuestions = generateQuizQuestions(mode, allParts);
    setSelectedMode(mode);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
    setUserAnswersRecord([]);
    setQuizResult(null);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;

    setSelectedOptionIndex(idx);
    setIsAnswerSubmitted(true);

    const currentQ = questions[currentIndex];
    const isCorrect = idx === currentQ.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }

    // Record answer
    setUserAnswersRecord((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        questionText: currentQ.question,
        selectedOption: currentQ.options[idx],
        correctOption: currentQ.options[currentQ.correctIndex],
        isCorrect,
        explanation: currentQ.explanation,
      },
    ]);
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      // Finish Quiz
      const correctCount = userAnswersRecord.filter((a) => a.isCorrect).length;
      const finalResult = calculateScoreResult(correctCount, questions.length, userAnswersRecord);
      setQuizResult(finalResult);
    }
  };

  // If quiz is finished, render result
  if (quizResult && selectedMode) {
    return (
      <QuizResultView
        result={quizResult}
        mode={selectedMode}
        onRestart={() => handleStartQuiz(selectedMode)}
        onNavigateToMateri={onNavigateToMateri}
        onNavigateToExplore={onNavigateToExplore}
      />
    );
  }

  // If in active quiz session
  if (selectedMode && questions.length > 0) {
    const currentQ = questions[currentIndex];
    const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
    const isLastQuestion = currentIndex === questions.length - 1;

    return (
      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 md:pb-12 animate-in fade-in duration-200">
        {/* Top Progress & Mode Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs mb-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span className="flex items-center gap-1.5 text-sky-700 bg-sky-50 px-2.5 py-1 rounded-xl">
              <Zap className="w-3.5 h-3.5" />
              Soal {currentIndex + 1} dari {questions.length}
            </span>
            <span className="text-slate-400">
              {selectedMode === 'quick' ? 'Kuis Singkat' : selectedMode === 'standard' ? 'Kuis Standar' : 'Tebak Organ'}
            </span>
            <button
              onClick={() => {
                sound.playClick();
                setSelectedMode(null);
              }}
              className="text-slate-400 hover:text-slate-700 text-xs font-medium cursor-pointer"
            >
              Keluar
            </button>
          </div>

          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Question Text */}
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-bold mb-2">
              Pertanyaan {currentIndex + 1}
            </span>
            <h2 className="text-lg sm:text-xl font-heading font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
            {currentQ.contextHint && (
              <p className="text-xs text-sky-700 font-medium bg-sky-50 p-2.5 rounded-xl border border-sky-100 mt-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                <span>Petunjuk: {currentQ.contextHint}</span>
              </p>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-sky-50/60 hover:border-sky-300';

              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold ring-2 ring-emerald-200';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through ring-2 ring-rose-200';
                } else {
                  btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Explanation Feedback */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <div className="text-xs text-sky-950 leading-relaxed">
                  <strong className="font-bold text-sky-900">Pembahasan: </strong>
                  {currentQ.explanation}
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswerSubmitted && (
            <button
              onClick={handleNextQuestion}
              className="w-full py-3.5 px-6 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer animate-in fade-in"
            >
              <span>{isLastQuestion ? 'Lihat Skor Akhir' : 'Lanjut ke Soal Berikutnya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // Quiz Mode Selection Screen
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-12">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Latihan & Evaluasi Biologi SMP</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
          Pilih Mode Kuis
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Pilih jenis kuis yang sesuai dengan waktu belajarmu. Soal dirancang ramah dan mudah dipahami siswa SMP!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Mode 1: Kuis Singkat */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-sky-300 hover:shadow-md transition-all group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">
              Kilat & Santai
            </span>
            <h2 className="text-xl font-heading font-bold text-slate-900 mt-1">
              Kuis Singkat
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              5 soal pilihan ganda cepat. Cocok untuk pemanasan atau menguji ingatan dalam waktu 2–3 menit.
            </p>
          </div>
          <div className="pt-6">
            <button
              onClick={() => handleStartQuiz('quick')}
              className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              Mulai 5 Soal →
            </button>
          </div>
        </div>

        {/* Mode 2: Kuis Standar */}
        <div className="bg-white rounded-3xl border-2 border-indigo-500/80 p-6 flex flex-col justify-between shadow-md relative overflow-hidden group">
          <div className="absolute top-3 right-3 px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-extrabold rounded-full uppercase">
            Disarankan
          </div>
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
              Pemahaman Lengkap
            </span>
            <h2 className="text-xl font-heading font-bold text-slate-900 mt-1">
              Kuis Standar
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              7 soal mencakup bagian tubuh luar, organ dalam utama, serta tips menjaga kesehatan.
            </p>
          </div>
          <div className="pt-6">
            <button
              onClick={() => handleStartQuiz('standard')}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-colors cursor-pointer"
            >
              Mulai 7 Soal →
            </button>
          </div>
        </div>

        {/* Mode 3: Tebak Letak Organ */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:border-emerald-300 hover:shadow-md transition-all group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
              Eksplorasi Spasial
            </span>
            <h2 className="text-xl font-heading font-bold text-slate-900 mt-1">
              Tebak Letak Organ
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Latih daya ingat posisi organ tubuh manusia berdasarkan petunjuk dan lokasinya di anatomi tubuh.
            </p>
          </div>
          <div className="pt-6">
            <button
              onClick={() => handleStartQuiz('locate')}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              Mulai Tebak Organ →
            </button>
          </div>
        </div>
      </div>

      {/* Materi Preparation Advice */}
      <div className="mt-8 p-6 bg-slate-100 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="font-heading font-bold text-slate-800 text-sm sm:text-base">
            Belum yakin dengan materinya?
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kamu bisa membaca ringkasan materi organ dan melihat model tubuh 2D terlebih dahulu.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToExplore();
            }}
            className="px-4 py-2 bg-white text-slate-700 hover:bg-slate-50 text-xs font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            Jelajah Tubuh
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToMateri();
            }}
            className="px-4 py-2 bg-white text-sky-700 hover:bg-sky-50 text-xs font-bold rounded-xl border border-sky-200 transition-colors cursor-pointer"
          >
            Baca Materi
          </button>
        </div>
      </div>
    </div>
  );
};
