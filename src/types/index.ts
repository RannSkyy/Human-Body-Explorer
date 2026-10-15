export type CategoryType = 'outer' | 'inner';

export type BodySystemType =
  | 'Sistem Koordinasi (Saraf & Indra)'
  | 'Sistem Sirkulasi (Peredaran Darah)'
  | 'Sistem Pernapasan (Respirasi)'
  | 'Sistem Pencernaan (Digesti)'
  | 'Sistem Ekskresi (Pengeluaran)'
  | 'Sistem Gerak (Rangka & Otot)'
  | 'Bagian Luar & Pelindung Tubuh';

export interface BodyPart {
  id: string;
  name: string;
  latinName: string;
  category: CategoryType;
  system: BodySystemType;
  region: 'head' | 'chest' | 'abdomen' | 'limbs_upper' | 'limbs_lower' | 'back';
  regionLabel: string;
  shortDesc: string;
  fullExplanation: string;
  healthTips: string[];
  funFact: string;
  marker: {
    x: number; // percentage (0-100) from left
    y: number; // percentage (0-100) from top
  };
  color: string;
  iconName: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'locate' | 'true-false';
  targetPartId?: string;
  question: string;
  contextHint?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  scorePercentage: number;
  badgeTitle: string;
  badgeDescription: string;
  evaluationMessage: string;
  stars: number;
  userAnswers: {
    questionId: string;
    questionText: string;
    selectedOption: string;
    correctOption: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export type ActiveTab = 'home' | 'explore' | 'materi' | 'quiz' | 'about';
export type QuizMode = 'quick' | 'standard' | 'locate';
