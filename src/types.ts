export enum UserLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
}

export enum ElectionStep {
  ELIGIBILITY = 'ELIGIBILITY',
  REGISTRATION = 'REGISTRATION',
  NOMINATION = 'NOMINATION',
  CAMPAIGN = 'CAMPAIGN',
  VOTING = 'VOTING',
  COUNTING = 'COUNTING',
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface UserProgress {
  level: UserLevel | null;
  currentStep: ElectionStep;
  completedSteps: ElectionStep[];
  country: string;
  age: number | null;
  isFirstTime: boolean | null;
  language: string;
}

export interface Lesson {
  fact: string;
  actionPrompt: string;
}

export type SupportedLanguage = 'EN' | 'ES' | 'FR' | 'DE' | 'IT' | 'PT' | 'JA' | 'RU';

export interface UIResources {
  welcome: {
    title: string;
    subtitle: string;
    familiarity: string;
    beginner: string;
    beginnerDesc: string;
    intermediate: string;
    intermediateDesc: string;
    advanced: string;
    advancedDesc: string;
  };
  onboarding: {
    profile: string;
    title: string;
    country: string;
    age: string;
    isFirstTime: string;
    yes: string;
    no: string;
    start: string;
    back: string;
  };
  main: {
    journeyProgress: string;
    stepsJourney: string;
    microLesson: string;
    startQuiz: string;
    closeQuiz: string;
    nextAction: string;
    readyToVote: string;
    whatToKnow: string;
    quickQuestion: string;
    continue: string;
    back: string;
    nextQuestion: string;
    finishQuiz: string;
    questionCount: string;
    quizCorrect: string;
    quizIncorrect: string;
    quote: string;
    aiAssistant: string;
    aiSubtitle: string;
    aiDesc: string;
    openChat: string;
    simulateJourney: string;
    thinking: string;
    typeQuestion: string;
    chatPlaceholder: string;
    langNotice: string;
    errorSim: string;
    errorDown: string;
    errorNoAnswer: string;
    errorConnect: string;
  };
}

export interface StepContent {
  title: string;
  description: string;
  beginnerInfo: string;
  intermediateInfo: string;
  advancedInfo: string;
  nextSteps: string[];
  lesson: Lesson;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
