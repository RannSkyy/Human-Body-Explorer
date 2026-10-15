import React, { useState } from 'react';
import { BodyPart, CategoryType } from '../types';
import { sound } from '../utils/audio';
import { ZoomIn, RotateCcw } from 'lucide-react';

interface AnatomyFigureProps {
  parts: BodyPart[];
  selectedPart: BodyPart | null;
  onSelectPart: (part: BodyPart) => void;
  categoryMode: CategoryType;
  highlightedPartId?: string | null;
}

export const AnatomyFigure: React.FC<AnatomyFigureProps> = ({
  parts,
  selectedPart,
  onSelectPart,
  categoryMode,
  highlightedPartId,
}) => {
  const [zoomRegion, setZoomRegion] = useState<'all' | 'head' | 'torso' | 'legs'>('all');
  const [hoveredPart, setHoveredPart] = useState<BodyPart | null>(null);

  // SVG viewBox settings based on zoom
  const viewBoxMap = {
    all: '0 0 300 620',
    head: '70 0 160 160',
    torso: '50 100 200 240',
    legs: '60 300 180 320',
  };

  const handleMarkerClick = (part: BodyPart, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    onSelectPart(part);
  };

  const isPartVisible = (part: BodyPart) => {
    return part.category === categoryMode;
  };

  const activeParts = parts.filter(isPartVisible);

  return (
    <div className="relative w-full flex flex-col items-center select-none bg-radial from-sky-50/60 to-slate-100/80 rounded-3xl border border-sky-100 p-2 sm:p-4 shadow-sm overflow-hidden">
      {/* Zoom / Focus Toolbar */}
      <div className="w-full flex items-center justify-between gap-2 mb-2 px-2 z-10">
        <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 px-2 flex items-center gap-1">
            <ZoomIn className="w-3.5 h-3.5 text-sky-500" />
            <span className="hidden sm:inline">Fokus Area:</span>
          </span>
          <button
            onClick={() => {
              sound.playClick();
              setZoomRegion('all');
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              zoomRegion === 'all'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setZoomRegion('head');
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              zoomRegion === 'head'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Kepala
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setZoomRegion('torso');
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              zoomRegion === 'torso'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Batang Tubuh
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setZoomRegion('legs');
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              zoomRegion === 'legs'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Kaki
          </button>
        </div>

        {zoomRegion !== 'all' && (
          <button
            onClick={() => {
              sound.playClick();
              setZoomRegion('all');
            }}
            className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 bg-white/80 px-2 py-1 rounded-xl border border-slate-200 cursor-pointer"
            title="Reset ke tampilan penuh"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[300/620] flex items-center justify-center transition-all duration-500 ease-out">
        <svg
          viewBox={viewBoxMap[zoomRegion]}
          className="w-full h-full filter drop-shadow-md transition-all duration-500 ease-in-out cursor-default"
          style={{ maxHeight: '72vh' }}
        >
          <defs>
            {/* Body Outer Silhouette Gradient */}
            <linearGradient id="bodySkin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#7dd3fc" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.85" />
            </linearGradient>

            {/* Inner Organ Silhouette (Translucent) */}
            <linearGradient id="bodyInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.5" />
            </linearGradient>

            {/* Organ Gradients */}
            <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#db2777" />
            </radialGradient>
            <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#dc2626" />
            </radialGradient>
            <linearGradient id="lungGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="stomachGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="liverGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id="kidneyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="intestineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="boneColor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>

          {/* ================= BASE HUMAN BODY SILHOUETTE ================= */}
          <g
            className="transition-colors duration-300"
            fill={categoryMode === 'outer' ? 'url(#bodySkin)' : 'url(#bodyInner)'}
            stroke="#0284c7"
            strokeWidth={categoryMode === 'outer' ? "2.5" : "1.8"}
            strokeLinejoin="round"
          >
            {/* Head & Neck */}
            <path d="M 150 15 C 130 15, 120 35, 120 55 C 120 80, 135 95, 142 102 L 142 118 L 158 118 L 158 102 C 165 95, 180 80, 180 55 C 180 35, 170 15, 150 15 Z" />

            {/* Torso & Shoulders */}
            <path d="M 142 118 C 125 120, 105 130, 95 145 C 80 168, 70 215, 65 260 C 62 280, 68 290, 75 290 C 82 290, 85 270, 90 235 L 94 210 L 98 300 C 100 325, 115 340, 125 350 L 148 350 L 152 350 L 175 350 C 185 340, 200 325, 202 300 L 206 210 L 210 235 C 215 270, 218 290, 225 290 C 232 290, 238 280, 235 260 C 230 215, 220 168, 205 145 C 195 130, 175 120, 158 118 Z" />

            {/* Left Arm & Hand */}
            <path d="M 95 145 C 85 160, 72 200, 68 245 C 65 275, 58 315, 52 340 C 50 350, 42 360, 48 368 C 54 374, 60 365, 64 350 C 72 320, 78 280, 82 250 C 86 215, 92 180, 96 160 Z" />

            {/* Right Arm & Hand */}
            <path d="M 205 145 C 215 160, 228 200, 232 245 C 235 275, 242 315, 248 340 C 250 350, 258 360, 252 368 C 246 374, 240 365, 236 350 C 228 320, 222 280, 218 250 C 214 215, 208 180, 204 160 Z" />

            {/* Left Leg & Foot */}
            <path d="M 125 350 C 120 375, 118 415, 118 450 C 118 475, 115 515, 112 555 C 110 575, 105 595, 95 605 C 90 610, 100 615, 112 615 C 122 615, 126 605, 126 585 C 128 550, 134 500, 136 450 C 138 410, 142 375, 148 350 Z" />

            {/* Right Leg & Foot */}
            <path d="M 175 350 C 180 375, 182 415, 182 450 C 182 475, 185 515, 188 555 C 190 575, 195 595, 205 605 C 210 610, 200 615, 188 615 C 178 615, 174 605, 174 585 C 172 550, 166 500, 164 450 C 162 410, 158 375, 152 350 Z" />
          </g>

          {/* ================= ANATOMICAL OUTLINES FOR OUTER MODE ================= */}
          {categoryMode === 'outer' && (
            <g stroke="#0369a1" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6">
              {/* Eyes */}
              <ellipse cx="140" cy="52" rx="4" ry="2.5" fill="#0369a1" />
              <ellipse cx="160" cy="52" rx="4" ry="2.5" fill="#0369a1" />
              {/* Nose */}
              <path d="M 150 56 L 148 65 L 152 65" />
              {/* Mouth */}
              <path d="M 143 76 Q 150 82 157 76" strokeWidth="2" />
              {/* Ears */}
              <path d="M 121 50 Q 116 57 121 66" />
              <path d="M 179 50 Q 184 57 179 66" />
              {/* Collarbone / Clavicle */}
              <path d="M 115 132 Q 135 137 148 135" />
              <path d="M 185 132 Q 165 137 152 135" />
              {/* Chest lines */}
              <path d="M 118 170 Q 134 180 148 175" />
              <path d="M 182 170 Q 166 180 152 175" />
              {/* Navel / Pusar */}
              <circle cx="150" cy="250" r="2.5" fill="#0369a1" />
              {/* Knee caps */}
              <ellipse cx="127" cy="450" rx="9" ry="7" strokeDasharray="3 2" />
              <ellipse cx="173" cy="450" rx="9" ry="7" strokeDasharray="3 2" />
            </g>
          )}

          {/* ================= DETAILED INTERNAL ORGANS FOR INNER MODE ================= */}
          {categoryMode === 'inner' && (
            <g className="transition-all duration-300">
              {/* Ribcage / Tulang Rangka silhouette subtle hint */}
              <g stroke="#94a3b8" strokeWidth="2.5" fill="none" opacity="0.4" strokeLinecap="round">
                {/* Spine */}
                <line x1="150" y1="120" x2="150" y2="340" strokeWidth="4" />
                {/* Rib pairs */}
                <path d="M 150 145 C 130 145, 110 155, 108 175" />
                <path d="M 150 145 C 170 145, 190 155, 192 175" />
                <path d="M 150 165 C 125 165, 108 180, 106 200" />
                <path d="M 150 165 C 175 165, 192 180, 194 200" />
                <path d="M 150 185 C 122 185, 108 200, 108 220" />
                <path d="M 150 185 C 178 185, 192 200, 192 220" />
                {/* Pelvis bones */}
                <path d="M 125 320 Q 140 345 150 345 Q 160 345 175 320" strokeWidth="3" />
                {/* Femur bones */}
                <line x1="133" y1="355" x2="127" y2="445" strokeWidth="4" />
                <line x1="167" y1="355" x2="173" y2="445" strokeWidth="4" />
              </g>

              {/* 1. BRAIN (Otak) */}
              <g
                id="organ-otak"
                className="cursor-pointer group"
                onClick={(e) => {
                  const organ = parts.find((p) => p.id === 'otak');
                  if (organ) handleMarkerClick(organ, e);
                }}
              >
                <path
                  d="M 132 45 C 128 32, 142 22, 150 22 C 158 22, 172 32, 168 45 C 173 55, 165 72, 150 72 C 135 72, 127 55, 132 45 Z"
                  fill="url(#brainGlow)"
                  stroke="#be185d"
                  strokeWidth="2"
                  className="filter drop-shadow-sm group-hover:brightness-110 transition-transform"
                />
                {/* Brain convolutions */}
                <path
                  d="M 138 38 Q 144 32 150 38 Q 156 32 162 38 M 136 50 Q 145 44 150 50 Q 155 44 164 50 M 140 60 Q 150 56 160 60"
                  stroke="#fda4af"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>

              {/* Trachea / Tenggorokan */}
              <path d="M 150 102 L 150 145" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />

              {/* 2. LUNGS (Paru-paru) */}
              <g
                id="organ-paru"
                className="cursor-pointer group"
                onClick={(e) => {
                  const organ = parts.find((p) => p.id === 'paru-paru');
                  if (organ) handleMarkerClick(organ, e);
                }}
              >
                {/* Left lung */}
                <path
                  d="M 144 148 C 134 146, 114 156, 112 185 C 110 208, 124 228, 142 222 C 145 200, 144 165, 144 148 Z"
                  fill="url(#lungGlow)"
                  stroke="#0284c7"
                  strokeWidth="2"
                  opacity="0.9"
                  className="group-hover:brightness-110"
                />
                {/* Right lung */}
                <path
                  d="M 156 148 C 166 146, 186 156, 188 185 C 190 208, 176 228, 158 222 C 155 200, 156 165, 156 148 Z"
                  fill="url(#lungGlow)"
                  stroke="#0284c7"
                  strokeWidth="2"
                  opacity="0.9"
                  className="group-hover:brightness-110"
                />
              </g>

              {/* 3. HEART (Jantung) with beating animation */}
              <g
                id="organ-jantung"
                className="cursor-pointer group animate-soft-pulse origin-[160px_175px]"
                onClick={(e) => {
                  const organ = parts.find((p) => p.id === 'jantung');
                  if (organ) handleMarkerClick(organ, e);
                }}
              >
                <path
                  d="M 152 165 C 150 156, 160 150, 167 156 C 174 150, 184 156, 182 165 C 180 178, 167 188, 167 188 C 167 188, 154 178, 152 165 Z"
                  fill="url(#heartGlow)"
                  stroke="#b91c1c"
                  strokeWidth="2"
                  className="filter drop-shadow-md group-hover:scale-105"
                />
                {/* Aorta */}
                <path d="M 164 152 C 164 142, 170 142, 170 148" stroke="#ef4444" strokeWidth="3" fill="none" />
              </g>

              {/* 4. LIVER (Hati) */}
              <g
                id="organ-hati"
                className="cursor-pointer group"
                onClick={(e) => {
                  const organ = parts.find((p) => p.id === 'hati');
                  if (organ) handleMarkerClick(organ, e);
                }}
              >
                <path
                  d="M 120 220 C 132 214, 154 218, 156 230 C 154 246, 126 248, 118 238 C 114 230, 116 222, 120 220 Z"
                  fill="url(#liverGlow)"
                  stroke="#78350f"
                  strokeWidth="2"
                  className="group-hover:brightness-110"
                />
              </g>

              {/* 5. STOMACH (Lambung) */}
              <g
                id="organ-lambung"
                className="cursor-pointer group"
                onClick={(e) => {
                  const organ = parts.find((p) => p.id === 'lambung');
                  if (organ) handleMarkerClick(organ, e);
                }}
              >
                <path
                  d="M 152 226 C 164 224, 174 232, 172 248 C 170 260, 150 262, 144 250 C 144 240, 148 230, 152 226 Z"
                  fill="url(#stomachGlow)"
                  stroke="#b45309"
                  strokeWidth="2"
                  className="group-hover:brightness-110"
                />
              </g>

              {/* 6. KIDNEYS (Ginjal) */}
              <g
                id="organ-ginjal"
                className="cursor-pointer group"
                onClick={(e) => {
                  const organ = parts.find((p) => p.id === 'ginjal');
                  if (organ) handleMarkerClick(organ, e);
                }}
              >
                {/* Left Kidney */}
                <ellipse
                  cx="135"
                  cy="252"
                  rx="6"
                  ry="9"
                  fill="url(#kidneyGlow)"
                  stroke="#6d28d9"
                  strokeWidth="1.5"
                  transform="rotate(-15 135 252)"
                />
                {/* Right Kidney */}
                <ellipse
                  cx="165"
                  cy="256"
                  rx="6"
                  ry="9"
                  fill="url(#kidneyGlow)"
                  stroke="#6d28d9"
                  strokeWidth="1.5"
                  transform="rotate(15 165 256)"
                />
              </g>

              {/* 7. INTESTINES (Usus Halus & Besar) */}
              <g
                id="organ-usus"
                className="cursor-pointer group"
                onClick={(e) => {
                  const organ = parts.find((p) => p.id === 'usus');
                  if (organ) handleMarkerClick(organ, e);
                }}
              >
                {/* Large intestine outer loop */}
                <path
                  d="M 132 265 L 132 295 L 168 295 L 168 265"
                  stroke="#10b981"
                  strokeWidth="9"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Small intestine inner coils */}
                <path
                  d="M 140 272 Q 150 268 160 272 Q 150 278 140 282 Q 150 288 160 284"
                  stroke="#34d399"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            </g>
          )}

          {/* ================= INTERACTIVE HOTSPOT MARKERS ================= */}
          {activeParts.map((part) => {
            const isSelected = selectedPart?.id === part.id;
            const isHighlighted = highlightedPartId === part.id;
            const isHovered = hoveredPart?.id === part.id;

            // Map percentage (x: 0-100, y: 0-100) to SVG coordinates (0-300, 0-620)
            const cx = (part.marker.x / 100) * 300;
            const cy = (part.marker.y / 100) * 620;

            return (
              <g
                key={part.id}
                className="cursor-pointer transition-all duration-200"
                onClick={(e) => handleMarkerClick(part, e)}
                onMouseEnter={() => setHoveredPart(part)}
                onMouseLeave={() => setHoveredPart(null)}
                tabIndex={0}
                role="button"
                aria-label={`Pilih ${part.name}: ${part.shortDesc}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    sound.playClick();
                    onSelectPart(part);
                  }
                }}
              >
                {/* Pulsing indicator ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected || isHighlighted ? '14' : '10'}
                  fill={part.color}
                  opacity={isSelected || isHighlighted ? '0.35' : '0.15'}
                  className={isSelected || isHighlighted ? 'animate-ping' : ''}
                />

                {/* Outer Ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected || isHighlighted ? '10' : '7'}
                  fill="#ffffff"
                  stroke={part.color}
                  strokeWidth={isSelected || isHighlighted ? '3.5' : '2'}
                  className="filter drop-shadow-md transition-all duration-200"
                />

                {/* Inner Dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected || isHighlighted ? '5' : '3.5'}
                  fill={part.color}
                  className="transition-all duration-200"
                />

                {/* Floating Name Label on Hover or Selection */}
                {(isHovered || isSelected || isHighlighted) && (
                  <g className="pointer-events-none transition-all">
                    <rect
                      x={cx > 150 ? cx - 110 : cx + 12}
                      y={cy - 14}
                      width="100"
                      height="26"
                      rx="8"
                      fill="#0f172a"
                      opacity="0.9"
                    />
                    <text
                      x={cx > 150 ? cx - 60 : cx + 62}
                      y={cy + 3}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="system-ui"
                    >
                      {part.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Helper guide caption below figure */}
      <div className="w-full text-center mt-2 z-10">
        <p className="text-xs text-slate-500 font-medium">
          💡 <span className="font-semibold text-slate-700">Ketuk titik organ</span> pada tubuh untuk membaca fungsi & tips kesehatannya.
        </p>
      </div>
    </div>
  );
};
