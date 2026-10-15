import type { BodyPart, QuizQuestion, QuizResult, QuizMode } from '../types/index.ts';

export const STATIC_QUIZ_BANK: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'multiple-choice',
    question: 'Organ berotot seukuran kepalan tangan yang berfungsi memompa darah beroksigen ke seluruh tubuh adalah...',
    options: ['Paru-paru', 'Jantung', 'Lambung', 'Hati'],
    correctIndex: 1,
    explanation: 'Jantung (Cor) terletak di rongga dada sebelah kiri dan bertugas memompa darah ke seluruh tubuh tanpa henti.'
  },
  {
    id: 'q2',
    type: 'multiple-choice',
    question: 'Di dalam paru-paru, tempat terjadinya pertukaran gas oksigen (O2) dan karbon dioksida (CO2) disebut...',
    options: ['Bronkus', 'Alveolus', 'Trakea', 'Laring'],
    correctIndex: 1,
    explanation: 'Alveolus adalah kantung-kantung udara mikro di ujung bronkiolus yang dikelilingi kapiler darah untuk pertukaran gas.'
  },
  {
    id: 'q3',
    type: 'multiple-choice',
    question: 'Manakah organ yang memproduksi cairan empedu untuk membantu pencernaan lemak dan menetralkan racun?',
    options: ['Hati (Hepar)', 'Ginjal (Ren)', 'Lambung', 'Usus Halus'],
    correctIndex: 0,
    explanation: 'Hati adalah kelenjar terbesar yang memproduksi empedu dan berfungsi sebagai organ penawar racun (detoksifikasi).'
  },
  {
    id: 'q4',
    type: 'multiple-choice',
    question: 'Organ ekskresi yang bertugas menyaring zat sisa metabolisme dari darah dan mengeluarkannya berupa urin adalah...',
    options: ['Usus Besar', 'Ginjal', 'Hati', 'Limpa'],
    correctIndex: 1,
    explanation: 'Sepasang ginjal menyaring sekitar 200 liter darah setiap hari dan membuang sisa metabolisme melalui urin.'
  },
  {
    id: 'q5',
    type: 'multiple-choice',
    question: 'Bagian mata yang berfungsi menangkap bayangan benda sebelum diteruskan ke saraf optik otak adalah...',
    options: ['Kornea', 'Pupil', 'Retina', 'Lensa'],
    correctIndex: 2,
    explanation: 'Retina adalah lapisan peka cahaya di bagian belakang mata yang memuat sel batang dan sel kerucut penerima bayangan.'
  },
  {
    id: 'q6',
    type: 'multiple-choice',
    question: 'Berapakah jumlah ruas tulang leher (vertebra servikal) pada manusia?',
    options: ['5 ruas', '7 ruas', '10 ruas', '12 ruas'],
    correctIndex: 1,
    explanation: 'Manusia (dan sebagian besar mamalia) memiliki 7 ruas tulang leher yang menopang tengkorak kepala.'
  },
  {
    id: 'q7',
    type: 'multiple-choice',
    question: 'Asam klorida (HCl) di dalam lambung manusia berfungsi untuk...',
    options: [
      'Menyerap sari makanan',
      'Membunuh kuman penyakit dan mengaktifkan pepsinogen',
      'Mengentalkan air liur',
      'Memproduksi sel darah merah'
    ],
    correctIndex: 1,
    explanation: 'Asam klorida (HCl) menciptakan suasana asam di lambung yang mematikan bakteri pada makanan serta mengaktifkan enzim pepsin.'
  },
  {
    id: 'q8',
    type: 'multiple-choice',
    question: 'Tendon terkuat dan terbesar di tubuh manusia yang menghubungkan otot betis dengan tulang tumit dinamakan...',
    options: ['Tendon Bisep', 'Tendon Patela', 'Tendon Achilles', 'Tendon Karotis'],
    correctIndex: 2,
    explanation: 'Tendon Achilles menghubungkan otot betis ke tumit dan mampu menahan beban beberapa kali lipat berat badan saat melompat atau berlari.'
  },
  {
    id: 'q9',
    type: 'multiple-choice',
    question: 'Sendi yang berada di siku dan lutut yang memungkinkan gerakan melipat ke satu arah termasuk jenis sendi...',
    options: ['Sendi Peluru', 'Sendi Putar', 'Sendi Engsel', 'Sendi Geser'],
    correctIndex: 2,
    explanation: 'Sendi engsel memungkinkan gerakan satu arah seperti membuka dan menutup engsel pintu rumah.'
  },
  {
    id: 'q10',
    type: 'multiple-choice',
    question: 'Kumpulan tulang yang melindungi otak dari benturan keras fisik adalah...',
    options: ['Tulang Rusuk', 'Tulang Tengkorak (Cranium)', 'Tulang Panggul', 'Tulang Belakang'],
    correctIndex: 1,
    explanation: 'Tulang tengkorak (cranium) membentuk rongga kokoh untuk membungkus dan melindungi organ lunak otak.'
  }
];

export const LOCATE_ORGAN_QUESTIONS: { partId: string; organName: string; hint: string }[] = [
  { partId: 'otak', organName: 'Otak', hint: 'Pusat pengendali memori dan pikiran di dalam kepala.' },
  { partId: 'jantung', organName: 'Jantung', hint: 'Pemompa darah di rongga dada sebelah kiri.' },
  { partId: 'paru-paru', organName: 'Paru-paru', hint: 'Organ bernapas untuk pertukaran oksigen di dada.' },
  { partId: 'lambung', organName: 'Lambung', hint: 'Kantung pencernaan berbentuk huruf J di perut kiri atas.' },
  { partId: 'hati', organName: 'Hati', hint: 'Kelenjar penawar racun dan penghasil empedu di perut kanan atas.' },
  { partId: 'ginjal', organName: 'Ginjal', hint: 'Penyaring darah yang terletak di kanan-kiri pinggang.' },
  { partId: 'lutut', organName: 'Lutut', hint: 'Sendi penahan beban dan peredam benturan pada kaki.' }
];

/**
 * Generate randomized questions based on selected mode
 */
export function generateQuizQuestions(mode: QuizMode, allParts: BodyPart[] = []): QuizQuestion[] {
  if (mode === 'locate') {
    // Generate organ locator challenge questions
    const shuffledLocates = [...LOCATE_ORGAN_QUESTIONS].sort(() => 0.5 - Math.random()).slice(0, 5);
    return shuffledLocates.map((item, idx) => {
      // Find 3 other organ names for distractors
      const otherParts = allParts.filter(p => p.id !== item.partId).map(p => p.name);
      const shuffledOthers = [...otherParts].sort(() => 0.5 - Math.random()).slice(0, 3);
      const options = [item.organName, ...shuffledOthers].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(item.organName);

      return {
        id: `locate_${idx + 1}`,
        type: 'locate',
        targetPartId: item.partId,
        question: `Di manakah letak organ "${item.organName}" pada tubuh manusia?`,
        contextHint: item.hint,
        options: options,
        correctIndex: correctIndex >= 0 ? correctIndex : 0,
        explanation: `${item.organName} terletak pada area ${item.hint}`
      };
    });
  }

  const count = mode === 'quick' ? 5 : 7;
  const shuffled = [...STATIC_QUIZ_BANK].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Calculate grade, score percentage, stars, and motivational message
 */
export function calculateScoreResult(
  correctCount: number,
  totalCount: number,
  userAnswersRecord: {
    questionId: string;
    questionText: string;
    selectedOption: string;
    correctOption: string;
    isCorrect: boolean;
    explanation: string;
  }[] = []
): QuizResult {
  const safeTotal = Math.max(1, totalCount);
  const safeCorrect = Math.max(0, Math.min(safeTotal, correctCount));
  const wrongCount = safeTotal - safeCorrect;
  const scorePercentage = Math.round((safeCorrect / safeTotal) * 100);

  let stars = 1;
  let badgeTitle = 'Pemula Anatomi';
  let badgeDescription = 'Awal yang baik! Ayo terus belajar dan coba lagi.';
  let evaluationMessage = 'Tetap semangat! Mempelajari organ tubuh butuh latihan berulang. Baca lagi materi dan coba kuis sekali lagi!';

  if (scorePercentage === 100) {
    stars = 3;
    badgeTitle = 'Ahli Anatomi Cilik';
    badgeDescription = 'Sempurna! Kamu memahami seluruh materi dengan sangat baik!';
    evaluationMessage = 'Luar biasa! Kamu berhasil menjawab seluruh pertanyaan dengan tepat tanpa cela. Kamu hebat!';
  } else if (scorePercentage >= 80) {
    stars = 3;
    badgeTitle = 'Penjelajah Tubuh Hebat';
    badgeDescription = 'Hebat sekali! Pemahamanmu sangat matang!';
    evaluationMessage = 'Kerja bagus! Hampir sempurna. Sedikit lagi kamu akan menguasai seluruh materi tubuh manusia!';
  } else if (scorePercentage >= 60) {
    stars = 2;
    badgeTitle = 'Pencari Tahu Biologi';
    badgeDescription = 'Bagus! Kamu sudah memahami konsep dasarnya!';
    evaluationMessage = 'Bagus! Kamu sudah memahami banyak fungsi organ tubuh. Tingkatkan terus belajarmu!';
  }

  return {
    totalQuestions: safeTotal,
    correctAnswers: safeCorrect,
    wrongAnswers: wrongCount,
    scorePercentage,
    badgeTitle,
    badgeDescription,
    evaluationMessage,
    stars,
    userAnswers: userAnswersRecord
  };
}

/**
 * Filter body parts by search query, category, and system
 */
export function filterBodyParts(
  parts: BodyPart[],
  query: string = '',
  categoryFilter: 'all' | 'outer' | 'inner' = 'all',
  systemFilter: string = 'Semua Bagian'
): BodyPart[] {
  const q = query.trim().toLowerCase();

  return parts.filter(part => {
    // Category match
    if (categoryFilter !== 'all' && part.category !== categoryFilter) {
      return false;
    }

    // System match
    if (systemFilter !== 'Semua Bagian' && part.system !== systemFilter) {
      return false;
    }

    // Query match
    if (q) {
      const matchName = part.name.toLowerCase().includes(q);
      const matchLatin = part.latinName.toLowerCase().includes(q);
      const matchDesc = part.shortDesc.toLowerCase().includes(q);
      const matchRegion = part.regionLabel.toLowerCase().includes(q);
      if (!matchName && !matchLatin && !matchDesc && !matchRegion) {
        return false;
      }
    }

    return true;
  });
}
