import React from 'react';
import { sound } from '../utils/audio';
import {
  GraduationCap,
  Heart,
  Users,
  Compass,
  CheckCircle2,
  Sparkles,
  Smartphone,
  BookOpen,
} from 'lucide-react';

interface AboutViewProps {
  onNavigateToExplore: () => void;
  onNavigateToQuiz: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({
  onNavigateToExplore,
  onNavigateToQuiz,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-12 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Tentang Media Pembelajaran</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-slate-900 tracking-tight">
          Human Body Explorer
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Media pembelajaran interaktif berbasis web dan game edukasi untuk membantu siswa SMP memahami anatomi serta fungsi tubuh manusia secara menyenangkan.
        </p>
      </div>

      {/* 3 Pillars / Mission Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
            <Smartphone className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-slate-900 text-base">Ramah HP & Tablet</h2>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Didesain khusus dengan pendekatan mobile-first. Tombol besar, teks nyaman dibaca, dan navigasi ramah sentuhan jari.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-slate-900 text-base">Kurikulum IPA SMP</h2>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Materi disesuaikan dengan Capaian Pembelajaran IPA Biologi SMP tentang sistem organ, struktur tubuh, serta kesehatan remaja.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="font-heading font-bold text-slate-900 text-base">Gamifikasi & Audio</h2>
          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
            Dilengkapi efek suara lembut, chime benar/salah, pelafalan audio teks, serta sistem kuis 5 dan 7 soal dengan bintang capaian.
          </p>
        </div>
      </div>

      {/* Target Pengguna Section */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2.5 text-slate-900 font-heading font-bold text-xl">
          <Users className="w-5 h-5 text-sky-600" />
          <h2>Sasaran Pengguna</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
              Pengguna Utama
            </span>
            <h3 className="font-bold text-slate-900 mt-1">Siswa SMP Kelas VII, VIII, dan IX</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Membutuhkan media visual yang interaktif agar tidak merasa jenuh hanya membaca dari buku teks cetak tebal.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Pengguna Pendukung
            </span>
            <h3 className="font-bold text-slate-900 mt-1">Guru IPA & Orang Tua</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Dapat dijadikan alat peraga di proyektor kelas, materi tugas laboratorium digital, atau bimbingan belajar mandiri di rumah.
            </p>
          </div>
        </div>
      </div>

      {/* Panduan Pemanfaatan */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="font-heading font-bold text-slate-900 text-xl">
          Panduan Pemanfaatan Pembelajaran
        </h2>
        <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Langkah 1 (Eksplorasi Bebas):</strong> Buka menu <em>Jelajah Tubuh</em>. Ketuk organ tubuh dan dengarkan suaranya untuk mengetahui letak dan fungsi dasarnya.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Langkah 2 (Pendalaman Materi):</strong> Masuk ke menu <em>Materi</em> untuk membaca sistem organ, nama ilmiah (Latin), fakta menarik, dan tips menjaga kesehatan organ.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              <strong>Langkah 3 (Evaluasi & Kuis):</strong> Uji pemahamanmu dengan <em>Kuis Singkat (5 Soal)</em> atau <em>Kuis Standar (7 Soal)</em>. Periksa pembahasan di akhir untuk memperbaiki kesalahan.
            </span>
          </li>
        </ul>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-6 rounded-3xl bg-linear-to-r from-sky-600 to-indigo-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h2 className="text-lg font-heading font-bold">Siap Menjadi Ahli Anatomi?</h2>
          <p className="text-xs text-sky-100 mt-0.5">
            Ayo mulai petualangan eksplorasi tubuh manusia sekarang juga!
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToExplore();
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-white text-sky-800 hover:bg-sky-50 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            Mulai Eksplorasi
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onNavigateToQuiz();
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Mulai Kuis
          </button>
        </div>
      </div>
    </div>
  );
};
