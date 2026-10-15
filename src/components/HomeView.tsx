import React from 'react';
import { BodyPart, ActiveTab } from '../types';
import { sound } from '../utils/audio';
import {
  Compass,
  BookOpen,
  HelpCircle,
  Sparkles,
  Heart,
  Volume2,
  CheckCircle2,
  ShieldCheck,
  Brain,
  Wind,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: ActiveTab) => void;
  learnedCount: number;
  totalParts: number;
  allParts: BodyPart[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  learnedCount,
  totalParts,
  allParts,
}) => {
  const innerCount = allParts.filter((p) => p.category === 'inner').length;
  const outerCount = allParts.filter((p) => p.category === 'outer').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 pb-24 md:pb-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl bg-linear-to-br from-sky-600 via-sky-500 to-indigo-600 text-white overflow-hidden p-6 sm:p-10 lg:p-14 shadow-xl">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-64 h-64 rounded-full bg-teal-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-4 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Media Pembelajaran Biologi SMP Kelas VII–IX</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-tight">
            Human Body <span className="text-amber-300">Explorer</span>
          </h1>

          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-sky-100 font-normal leading-relaxed max-w-2xl">
            Kenali bagian tubuh manusia dari kepala sampai kaki, pahami cara kerja organ vital, dengarkan pelafalan audio, dan buktikan pemahamanmu lewat game kuis seru!
          </p>

          {/* Quick Action CTA Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('explore');
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-sky-700 hover:bg-sky-50 font-heading font-extrabold text-sm sm:text-base shadow-lg shadow-sky-900/20 transition-all active:scale-95 cursor-pointer"
            >
              <Compass className="w-5 h-5 text-sky-600" />
              <span>Mulai Jelajah Tubuh</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('materi');
              }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-heading font-bold text-sm sm:text-base transition-all active:scale-95 cursor-pointer"
            >
              <BookOpen className="w-5 h-5 text-sky-100" />
              <span>Ringkasan Materi</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('quiz');
              }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-heading font-extrabold text-sm sm:text-base shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <HelpCircle className="w-5 h-5" />
              <span>Mulai Kuis</span>
            </button>
          </div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
              Tubuh Luar
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {outerCount} bagian tubuh dari panca indra, anggota gerak, hingga sendi.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-3">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
              {innerCount} Organ Dalam
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Jantung, otak, paru-paru, lambung, hati, ginjal, usus, dan rangka.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
              Kuis Interaktif
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Mode 5 soal, 7 soal, & tantangan spasial tebak letak organ.
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
              Audio & Suara
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Efek suara klik, chime benar/salah, serta pelafalan nama organ.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Visual Teaser & Organ Carousel */}
      <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-slate-900">
              Organ Penting Yang Wajib Diketahui Siswa SMP
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Klik organ berikut untuk langsung melihat penjelasan dan tips kesehatannya.
            </p>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('explore');
            }}
            className="text-xs font-bold text-sky-600 hover:text-sky-800 self-start sm:self-auto cursor-pointer"
          >
            Lihat Model Tubuh Penuh →
          </button>
        </div>

        {/* 4 Key Vital Organs Showcase */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'otak',
              name: 'Otak',
              latin: 'Cerebrum',
              desc: 'Pusat kendali ingatan, pikiran, dan gerakan sadar.',
              icon: Brain,
              color: 'bg-pink-50 text-pink-600 border-pink-200',
            },
            {
              id: 'jantung',
              name: 'Jantung',
              latin: 'Cor',
              desc: 'Memompa darah kaya oksigen ke seluruh tubuh.',
              icon: Heart,
              color: 'bg-red-50 text-red-600 border-red-200',
            },
            {
              id: 'paru-paru',
              name: 'Paru-paru',
              latin: 'Pulmo',
              desc: 'Tempat pertukaran oksigen dan karbon dioksida.',
              icon: Wind,
              color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
            },
            {
              id: 'lambung',
              name: 'Lambung',
              latin: 'Ventriculus',
              desc: 'Mencerna makanan kimiawi dengan asam HCl dan pepsin.',
              icon: ShieldCheck,
              color: 'bg-amber-50 text-amber-600 border-amber-200',
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  onNavigate('explore');
                }}
                className="p-5 rounded-2xl border border-slate-200 hover:border-sky-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-sky-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 italic mb-1.5">({item.latin})</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <span className="text-[11px] font-bold text-sky-600 mt-4 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Pelajari di Jelajah →
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress & Study Motivation Banner */}
      <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
            Status Belajarmu
          </span>
          <h2 className="text-xl sm:text-2xl font-heading font-bold">
            {learnedCount} dari {totalParts} Bagian Tubuh Telah Ditandai
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            Tandai setiap organ yang telah kamu pahami di halaman Materi untuk melengkapi pengetahuan biologimu.
          </p>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onNavigate('materi');
          }}
          className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all cursor-pointer shadow-lg shadow-teal-500/20 shrink-0"
        >
          Lihat Progres Lengkap
        </button>
      </div>
    </div>
  );
};
