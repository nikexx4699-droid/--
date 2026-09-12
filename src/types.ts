export type ExamId = 'cuet' | 'cds' | 'nda' | 'afcat' | 'general-studies';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

export type StudyCategory = 
  | 'Notes'
  | 'Concepts'
  | 'Formulas'
  | 'Short Tricks'
  | 'Revision Notes'
  | 'Important Questions';

export type CurrentAffairCategory =
  | 'Today'
  | 'Weekly'
  | 'Monthly'
  | 'National'
  | 'International'
  | 'Defence'
  | 'Economy'
  | 'Science & Technology'
  | 'Sports'
  | 'Awards & Honours';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  targetExam?: ExamId;
  avatar?: string;
  createdAt: string;
}

export interface Topic {
  id: string;
  name: string;
  questionCount: number;
  subtopics?: string[];
  description?: string;
  importance?: 'High' | 'Medium' | 'Low';
}

export interface Subject {
  id: string;
  name: string;
  examId: ExamId;
  description: string;
  iconName: string;
  totalQuestions: number;
  totalTests: number;
  topics: Topic[];
}

export interface Exam {
  id: ExamId;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  badge: string;
  color: string;
  subjectsCount: number;
  mockTestsCount: number;
  questionsCount: number;
  eligibility: string;
  examFrequency: string;
  negativeMarking: string;
  subjects: string[]; // subject IDs or names
  notifications: {
    id: string;
    title: string;
    date: string;
    isNew?: boolean;
    linkText?: string;
  }[];
}

export interface Question {
  id: string;
  examId: ExamId;
  subjectId: string;
  topicId?: string;
  topicName?: string;
  questionText: string;
  options: [string, string, string, string] | string[];
  correctAnswerIndex: number; // 0, 1, 2, 3
  explanation: string;
  difficulty: DifficultyLevel;
  questionType?: 'Multiple Choice' | 'Assertion-Reason' | 'Numerical';
  previousYearYear?: number;
}

export interface MockTest {
  id: string;
  title: string;
  examId: ExamId;
  subjectId?: string; // Optional if full-length
  totalQuestions: number;
  durationMinutes: number;
  totalMarks: number;
  positiveMarksPerQuestion: number;
  negativeMarksPerQuestion: number;
  difficulty: DifficultyLevel;
  isPreviousYear?: boolean;
  year?: number;
  attemptsCount: number;
  questions: Question[];
}

export interface QuestionState {
  selectedOption: number | null; // index 0-3 or null
  isMarkedForReview: boolean;
  visited: boolean;
  timeSpentSeconds: number;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  examId: ExamId;
  startedAt: string;
  completedAt: string;
  totalQuestions: number;
  attemptedQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattemptedQuestions: number;
  totalMarksScored: number;
  maxMarks: number;
  accuracyPercentage: number;
  timeTakenSeconds: number;
  questionResponses: {
    questionId: string;
    selectedOption: number | null;
    isCorrect: boolean;
    correctAnswerIndex: number;
    timeSpentSeconds: number;
  }[];
}

export interface PreviousYearPaper {
  id: string;
  title: string;
  examId: ExamId;
  year: number;
  subject: string;
  totalQuestions: number;
  durationMinutes: number;
  marks: number;
  mockTestId?: string;
  fileSize?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  examId: ExamId;
  subjectId?: string;
  topic: string;
  category: StudyCategory;
  readTime: string;
  content: string;
  keyPoints?: string[];
  formulaList?: { title: string; formula: string; note?: string }[];
  tags?: string[];
  lastUpdated?: string;
}

export interface CurrentAffairArticle {
  id: string;
  title: string;
  date: string;
  category: CurrentAffairCategory;
  shortDescription: string;
  content?: string;
  examRelevance: ExamId[];
  keyTakeaways: string[];
  readTime: string;
}

export type CurrentAffairsArticle = CurrentAffairArticle;

export type ActiveView = 
  | 'home'
  | 'exams'
  | 'exam-detail'
  | 'subject-detail'
  | 'test-series'
  | 'test-take'
  | 'test-result'
  | 'practice'
  | 'study-material'
  | 'current-affairs'
  | 'previous-papers'
  | 'user-dashboard'
  | 'admin';

export interface UserStats {
  testsAttempted: number;
  questionsSolved: number;
  averageScore: number;
  accuracy: number;
  studyTimeHours: number;
}
