import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  ExamId, 
  ActiveView, 
  TestAttempt, 
  Question, 
  StudyMaterial, 
  CurrentAffairArticle,
  UserStats
} from '../types';
import { 
  EXAMS, 
  SUBJECTS, 
  SAMPLE_QUESTIONS, 
  MOCK_TESTS, 
  PREVIOUS_YEAR_PAPERS, 
  STUDY_MATERIALS, 
  CURRENT_AFFAIRS 
} from '../data/mockData';

interface AppContextType {
  user: User | null;
  userStats: UserStats;
  currentView: ActiveView;
  selectedExamId: ExamId;
  selectedSubjectId: string | null;
  activeTestId: string | null;
  lastTestAttempt: TestAttempt | null;
  attempts: TestAttempt[];
  questions: Question[];
  studyMaterials: StudyMaterial[];
  currentAffairs: CurrentAffairArticle[];
  bookmarkedQuestionIds: string[];
  isSearchOpen: boolean;
  authModalOpen: boolean;
  authModalTab: 'login' | 'register';
  
  // Navigation
  navigateTo: (view: ActiveView, params?: { examId?: ExamId; subjectId?: string; testId?: string }) => void;
  openSearch: () => void;
  closeSearch: () => void;
  openAuth: (tab?: 'login' | 'register') => void;
  closeAuth: () => void;
  
  // Actions
  login: (email: string, password?: string, remember?: boolean) => boolean;
  register: (name: string, email: string, phone: string, targetExam?: ExamId) => boolean;
  logout: () => void;
  saveTestAttempt: (attempt: TestAttempt) => void;
  toggleBookmarkQuestion: (questionId: string) => void;
  addQuestion: (question: Omit<Question, 'id'>) => void;
  addStudyMaterial: (item: Omit<StudyMaterial, 'id' | 'lastUpdated'>) => void;
  addCurrentAffair: (article: Omit<CurrentAffairArticle, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'preppilot_user';
const STORAGE_KEY_ATTEMPTS = 'preppilot_attempts';
const STORAGE_KEY_QUESTIONS = 'preppilot_custom_questions';
const STORAGE_KEY_BOOKMARKS = 'preppilot_bookmarks';
const STORAGE_KEY_STUDY = 'preppilot_custom_study';
const STORAGE_KEY_NEWS = 'preppilot_custom_news';

const DEFAULT_USER: User = {
  id: 'usr_pilot_01',
  name: 'Arjun Verma',
  email: 'arjun.verma@preppilot.edu',
  phone: '+91 98765 43210',
  targetExam: 'nda',
  createdAt: '2025-01-15'
};

const DEFAULT_ATTEMPTS: TestAttempt[] = [
  {
    id: 'att_demo_1',
    testId: 'mock-nda-maths-speed',
    testTitle: 'NDA Mathematics High-Yield Speed Test',
    examId: 'nda',
    startedAt: '2025-05-10T14:20:00Z',
    completedAt: '2025-05-10T14:29:40Z',
    totalQuestions: 6,
    attemptedQuestions: 5,
    correctAnswers: 4,
    incorrectAnswers: 1,
    unattemptedQuestions: 1,
    totalMarksScored: 9.17,
    maxMarks: 15,
    accuracyPercentage: 80,
    timeTakenSeconds: 580,
    questionResponses: [
      { questionId: 'q1', selectedOption: 0, isCorrect: true, correctAnswerIndex: 0, timeSpentSeconds: 95 },
      { questionId: 'q2', selectedOption: 1, isCorrect: true, correctAnswerIndex: 1, timeSpentSeconds: 60 },
      { questionId: 'q3', selectedOption: 0, isCorrect: true, correctAnswerIndex: 0, timeSpentSeconds: 110 },
      { questionId: 'q23', selectedOption: 1, isCorrect: false, correctAnswerIndex: 0, timeSpentSeconds: 120 },
      { questionId: 'q9', selectedOption: 0, isCorrect: true, correctAnswerIndex: 0, timeSpentSeconds: 85 },
      { questionId: 'q12', selectedOption: null, isCorrect: false, correctAnswerIndex: 1, timeSpentSeconds: 110 }
    ]
  },
  {
    id: 'att_demo_2',
    testId: 'mock-cds-gk-full',
    testTitle: 'CDS (I) 2025 General Knowledge Booster Test',
    examId: 'cds',
    startedAt: '2025-05-08T11:00:00Z',
    completedAt: '2025-05-08T11:13:30Z',
    totalQuestions: 10,
    attemptedQuestions: 9,
    correctAnswers: 7,
    incorrectAnswers: 2,
    unattemptedQuestions: 1,
    totalMarksScored: 6.34,
    maxMarks: 10,
    accuracyPercentage: 77.8,
    timeTakenSeconds: 810,
    questionResponses: []
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // User state
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return DEFAULT_USER;
  });

  // Navigation state
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedExamId, setSelectedExamId] = useState<ExamId>('nda');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>('nda-maths');
  const [activeTestId, setActiveTestId] = useState<string | null>(null);
  const [lastTestAttempt, setLastTestAttempt] = useState<TestAttempt | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');

  // Attempts
  const [attempts, setAttempts] = useState<TestAttempt[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ATTEMPTS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return DEFAULT_ATTEMPTS;
  });

  // Custom added questions
  const [customQuestions, setCustomQuestions] = useState<Question[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  });

  // Bookmarks
  const [bookmarkedQuestionIds, setBookmarkedQuestionIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_BOOKMARKS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return ['q1', 'q7', 'q18'];
  });

  // Custom Study Materials
  const [customStudyMaterials, setCustomStudyMaterials] = useState<StudyMaterial[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_STUDY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  });

  // Custom Current Affairs
  const [customCurrentAffairs, setCustomCurrentAffairs] = useState<CurrentAffairArticle[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_NEWS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return [];
  });

  // Persist user
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  // Persist attempts
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ATTEMPTS, JSON.stringify(attempts));
  }, [attempts]);

  // Persist custom questions
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_QUESTIONS, JSON.stringify(customQuestions));
  }, [customQuestions]);

  // Persist bookmarks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarkedQuestionIds));
  }, [bookmarkedQuestionIds]);

  // Combine questions
  const questions: Question[] = [...SAMPLE_QUESTIONS, ...customQuestions];
  const studyMaterials: StudyMaterial[] = [...STUDY_MATERIALS, ...customStudyMaterials];
  const currentAffairs: CurrentAffairArticle[] = [...CURRENT_AFFAIRS, ...customCurrentAffairs];

  // Calculate user stats
  const userStats: UserStats = React.useMemo(() => {
    const totalAttempted = attempts.length;
    let totalQuestionsSolved = 0;
    let totalScoreSum = 0;
    let totalAccuracySum = 0;
    let totalTimeSec = 0;

    attempts.forEach(att => {
      totalQuestionsSolved += att.attemptedQuestions;
      totalScoreSum += (att.totalMarksScored / att.maxMarks) * 100;
      totalAccuracySum += att.accuracyPercentage;
      totalTimeSec += att.timeTakenSeconds;
    });

    const averageScore = totalAttempted > 0 ? Math.round(totalScoreSum / totalAttempted) : 0;
    const accuracy = totalAttempted > 0 ? Math.round(totalAccuracySum / totalAttempted) : 0;
    const studyTimeHours = Number((totalTimeSec / 3600 + 12.5).toFixed(1)); // Base hours + test time

    return {
      testsAttempted: totalAttempted,
      questionsSolved: totalQuestionsSolved + 142, // baseline practice
      averageScore,
      accuracy: accuracy > 0 ? accuracy : 78,
      studyTimeHours
    };
  }, [attempts]);

  // Navigation helper
  const navigateTo = (view: ActiveView, params?: { examId?: ExamId; subjectId?: string; testId?: string }) => {
    if (params?.examId) {
      setSelectedExamId(params.examId);
    }
    if (params?.subjectId !== undefined) {
      setSelectedSubjectId(params.subjectId);
    }
    if (params?.testId !== undefined) {
      setActiveTestId(params.testId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openAuth = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };
  const closeAuth = () => setAuthModalOpen(false);

  const login = (email: string, _password?: string, _remember: boolean = true): boolean => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Candidate',
      email,
      targetExam: selectedExamId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    setAuthModalOpen(false);
    return true;
  };

  const register = (name: string, email: string, phone: string, targetExam?: ExamId): boolean => {
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone,
      targetExam: targetExam || 'nda',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    setAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const saveTestAttempt = (attempt: TestAttempt) => {
    setAttempts(prev => [attempt, ...prev]);
    setLastTestAttempt(attempt);
    setCurrentView('test-result');
  };

  const toggleBookmarkQuestion = (questionId: string) => {
    setBookmarkedQuestionIds(prev => 
      prev.includes(questionId) ? prev.filter(id => id !== questionId) : [...prev, questionId]
    );
  };

  const addQuestion = (newQ: Omit<Question, 'id'>) => {
    const created: Question = {
      ...newQ,
      id: `q_custom_${Date.now()}`
    };
    setCustomQuestions(prev => [created, ...prev]);
  };

  const addStudyMaterial = (item: Omit<StudyMaterial, 'id' | 'lastUpdated'>) => {
    const created: StudyMaterial = {
      ...item,
      id: `sm_custom_${Date.now()}`,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    setCustomStudyMaterials(prev => [created, ...prev]);
  };

  const addCurrentAffair = (article: Omit<CurrentAffairArticle, 'id'>) => {
    const created: CurrentAffairArticle = {
      ...article,
      id: `ca_custom_${Date.now()}`
    };
    setCustomCurrentAffairs(prev => [created, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      user,
      userStats,
      currentView,
      selectedExamId,
      selectedSubjectId,
      activeTestId,
      lastTestAttempt,
      attempts,
      questions,
      studyMaterials,
      currentAffairs,
      bookmarkedQuestionIds,
      isSearchOpen,
      authModalOpen,
      authModalTab,
      navigateTo,
      openSearch,
      closeSearch,
      openAuth,
      closeAuth,
      login,
      register,
      logout,
      saveTestAttempt,
      toggleBookmarkQuestion,
      addQuestion,
      addStudyMaterial,
      addCurrentAffair
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
