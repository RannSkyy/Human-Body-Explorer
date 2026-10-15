import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { BODY_PARTS_DATA } from './data/bodyPartsData';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { MateriView } from './components/MateriView';
import { QuizView } from './components/QuizView';
import { AboutView } from './components/AboutView';
import { sound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isMuted, setIsMuted] = useState<boolean>(() => sound.getMuted());
  const [learnedIds, setLearnedIds] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('hbe_learned_parts');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            return new Set(parsed);
          }
        }
      } catch {}
    }
    // Seed default items as learned for immediate lively state
    return new Set(['otak', 'jantung', 'mata']);
  });

  // Handle URL query parameters (e.g. ?autostart=1 or ?tab=explore)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') {
        setActiveTab('explore');
      } else {
        const tabParam = params.get('tab') as ActiveTab;
        if (tabParam && ['home', 'explore', 'materi', 'quiz', 'about'].includes(tabParam)) {
          setActiveTab(tabParam);
        }
      }
    }
  }, []);

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLearned = (partId: string) => {
    setLearnedIds((prev) => {
      const next = new Set(prev);
      if (next.has(partId)) {
        next.delete(partId);
      } else {
        next.add(partId);
      }
      try {
        localStorage.setItem('hbe_learned_parts', JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const handleToggleMute = () => {
    const updated = sound.toggleMute();
    setIsMuted(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-200 selection:text-sky-900">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        learnedCount={learnedIds.size}
        totalPartsCount={BODY_PARTS_DATA.length}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleTabChange}
            learnedCount={learnedIds.size}
            totalParts={BODY_PARTS_DATA.length}
            allParts={BODY_PARTS_DATA}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreView
            allParts={BODY_PARTS_DATA}
            learnedIds={learnedIds}
            onToggleLearned={handleToggleLearned}
            onNavigateToQuiz={() => handleTabChange('quiz')}
            onNavigateToMateri={() => handleTabChange('materi')}
          />
        )}

        {activeTab === 'materi' && (
          <MateriView
            allParts={BODY_PARTS_DATA}
            learnedIds={learnedIds}
            onToggleLearned={handleToggleLearned}
            onNavigateToQuiz={() => handleTabChange('quiz')}
            onNavigateToExplore={() => handleTabChange('explore')}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            allParts={BODY_PARTS_DATA}
            onNavigateToMateri={() => handleTabChange('materi')}
            onNavigateToExplore={() => handleTabChange('explore')}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onNavigateToExplore={() => handleTabChange('explore')}
            onNavigateToQuiz={() => handleTabChange('quiz')}
          />
        )}
      </main>

      {/* Desktop Minimal Footer */}
      <footer className="hidden md:block py-6 border-t border-slate-200/80 bg-white text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-medium">
            Human Body Explorer — Media Pembelajaran Biologi SMP Kelas VII–IX
          </p>
          <p className="text-slate-400">
            Dibuat untuk pembelajaran interaktif mandiri & peraga kelas
          </p>
        </div>
      </footer>
    </div>
  );
}
