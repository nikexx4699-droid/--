import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  HelpCircle, 
  Search, 
  CheckCircle2, 
  Bookmark, 
  RotateCcw,
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAMS, SUBJECTS } from '../data/mockData';
import { QuestionCard } from '../components/QuestionCard';
import { ExamId } from '../types';

export const PracticeQuestionsView: React.FC = () => {
  const { questions, bookmarkedQuestionIds } = useApp();

  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [onlyPYQ, setOnlyPYQ] = useState<boolean>(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Available subjects based on exam
  const availableSubjects = useMemo(() => {
    if (selectedExam === 'all') return SUBJECTS;
    return SUBJECTS.filter(s => s.examId === selectedExam);
  }, [selectedExam]);

  // Filter logic
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // Exam filter
      if (selectedExam !== 'all' && q.examId !== selectedExam) return false;
      // Subject filter
      if (selectedSubject !== 'all' && q.subjectId !== selectedSubject) return false;
      // Difficulty
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      // PYQ only
      if (onlyPYQ && !q.previousYearYear) return false;
      // Bookmarked only
      if (onlyBookmarked && !bookmarkedQuestionIds.includes(q.id)) return false;
      // Search term
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesText = q.questionText.toLowerCase().includes(query);
        const matchesExplanation = q.explanation.toLowerCase().includes(query);
        const matchesTopic = q.topicName?.toLowerCase().includes(query);
        if (!matchesText && !matchesExplanation && !matchesTopic) return false;
      }

      return true;
    });
  }, [questions, selectedExam, selectedSubject, selectedDifficulty, onlyPYQ, onlyBookmarked, searchQuery, bookmarkedQuestionIds]);

  const handleResetFilters = () => {
    setSelectedExam('all');
    setSelectedSubject('all');
    setSelectedDifficulty('all');
    setOnlyPYQ(false);
    setOnlyBookmarked(false);
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
          <span>Interactive Question Bank</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Practice Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Solve curated multiple-choice questions with instant scoring, step-by-step logic, and detailed explanations.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>Filter Bank</span>
          </div>

          <button
            onClick={handleResetFilters}
            className="text-xs font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Exam dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Target Exam</label>
            <select
              value={selectedExam}
              onChange={e => {
                setSelectedExam(e.target.value);
                setSelectedSubject('all');
              }}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Target Exams</option>
              {EXAMS.map(exam => (
                <option key={exam.id} value={exam.id}>{exam.name} ({exam.badge})</option>
              ))}
            </select>
          </div>

          {/* Subject dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Subjects</option>
              {availableSubjects.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name} ({sub.examId.toUpperCase()})</option>
              ))}
            </select>
          </div>

          {/* Difficulty dropdown */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Search text */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Keyword Search</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search topic or formula..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Toggle Pills */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 flex-wrap">
          <button
            onClick={() => setOnlyPYQ(!onlyPYQ)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
              onlyPYQ
                ? 'bg-purple-600 text-white border-purple-600 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            Previous Year Questions (PYQs) Only
          </button>

          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border flex items-center gap-1.5 ${
              onlyBookmarked
                ? 'bg-amber-500 text-white border-amber-500 shadow-2xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Bookmarked Only ({bookmarkedQuestionIds.length})</span>
          </button>

          <span className="text-xs text-slate-400 ml-auto font-medium">
            Showing <strong>{filteredQuestions.length}</strong> questions
          </span>
        </div>
      </div>

      {/* Question Cards Feed */}
      <div className="space-y-5">
        {filteredQuestions.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-sm font-bold text-slate-800">No questions match your filter criteria.</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting the difficulty or exam filter to see more items.</p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          filteredQuestions.map((question, idx) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={idx}
            />
          ))
        )}
      </div>
    </div>
  );
};
