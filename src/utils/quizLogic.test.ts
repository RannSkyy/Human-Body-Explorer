import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateScoreResult, filterBodyParts, generateQuizQuestions, STATIC_QUIZ_BANK } from './quizLogic.ts';
import type { BodyPart } from '../types/index.ts';

const mockParts: BodyPart[] = [
  {
    id: 'otak',
    name: 'Otak',
    latinName: 'Cerebrum',
    category: 'inner',
    system: 'Sistem Koordinasi (Saraf & Indra)',
    region: 'head',
    regionLabel: 'Kepala',
    shortDesc: 'Pusat pengendali pikiran',
    fullExplanation: 'Otak mengatur semua aktivitas',
    healthTips: ['Tidur 8 jam'],
    funFact: 'Mengonsumsi 20% energi',
    marker: { x: 50, y: 7 },
    color: '#ec4899',
    iconName: 'Brain'
  },
  {
    id: 'jantung',
    name: 'Jantung',
    latinName: 'Cor',
    category: 'inner',
    system: 'Sistem Sirkulasi (Peredaran Darah)',
    region: 'chest',
    regionLabel: 'Dada',
    shortDesc: 'Memompa darah',
    fullExplanation: 'Organ pompa darah',
    healthTips: ['Olahraga'],
    funFact: '100.000 detak sehari',
    marker: { x: 53, y: 26 },
    color: '#ef4444',
    iconName: 'Heart'
  },
  {
    id: 'mata',
    name: 'Mata',
    latinName: 'Oculus',
    category: 'outer',
    system: 'Sistem Koordinasi (Saraf & Indra)',
    region: 'head',
    regionLabel: 'Kepala',
    shortDesc: 'Indra penglihatan',
    fullExplanation: 'Melihat benda',
    healthTips: ['Aturan 20-20-20'],
    funFact: '10 juta warna',
    marker: { x: 47, y: 8 },
    color: '#0ea5e9',
    iconName: 'Eye'
  }
];

test('calculateScoreResult correctly calculates 100% score and 3 stars', () => {
  const result = calculateScoreResult(5, 5);
  assert.equal(result.scorePercentage, 100);
  assert.equal(result.stars, 3);
  assert.equal(result.correctAnswers, 5);
  assert.equal(result.wrongAnswers, 0);
  assert.equal(result.badgeTitle, 'Ahli Anatomi Cilik');
});

test('calculateScoreResult correctly calculates 60% score and 2 stars', () => {
  const result = calculateScoreResult(3, 5);
  assert.equal(result.scorePercentage, 60);
  assert.equal(result.stars, 2);
  assert.equal(result.correctAnswers, 3);
  assert.equal(result.wrongAnswers, 2);
});

test('calculateScoreResult handles zero answers gracefully', () => {
  const result = calculateScoreResult(0, 5);
  assert.equal(result.scorePercentage, 0);
  assert.equal(result.stars, 1);
  assert.equal(result.correctAnswers, 0);
  assert.equal(result.wrongAnswers, 5);
});

test('generateQuizQuestions yields correct count for quick mode (5 questions)', () => {
  const questions = generateQuizQuestions('quick', mockParts);
  assert.equal(questions.length, 5);
});

test('generateQuizQuestions yields correct count for standard mode (7 questions)', () => {
  const questions = generateQuizQuestions('standard', mockParts);
  assert.equal(questions.length, 7);
});

test('filterBodyParts filters by query string', () => {
  const filtered = filterBodyParts(mockParts, 'Jantung');
  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].name, 'Jantung');
});

test('filterBodyParts filters by category', () => {
  const innerOnly = filterBodyParts(mockParts, '', 'inner');
  assert.equal(innerOnly.length, 2);

  const outerOnly = filterBodyParts(mockParts, '', 'outer');
  assert.equal(outerOnly.length, 1);
  assert.equal(outerOnly[0].name, 'Mata');
});

test('filterBodyParts filters by system', () => {
  const sirkulasi = filterBodyParts(mockParts, '', 'all', 'Sistem Sirkulasi (Peredaran Darah)');
  assert.equal(sirkulasi.length, 1);
  assert.equal(sirkulasi[0].name, 'Jantung');
});
