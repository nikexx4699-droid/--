import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Clock, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Send,
  Compass,
  X,
  Menu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_TESTS, SAMPLE_QUESTIONS } from '../data/mockData';
import { QuestionState, TestAttempt } from '../types';

export const MockTestInterfaceView: React.FC = () => {
  const { activeTestId, navigateTo, saveTestAttempt } = useApp();

  const currentTest = useMemo(() => {
    return MOCK_TESTS.find(t => t.id === activeTestId) || MOCK_TESTS[0];
  }, [activeTestId]);

  const questions = currentTest.questions && currentTest.questions.length > 0 
    ? currentTest.questions 
    : SAMPLE_QUESTIONS.slice(0, 10);

  // States for all questions
  const [questionStates, setQuestionStates] = useState<Record<number, QuestionState>>(() => {
    const initial: Record<number, QuestionState> = {};
    questions.forEach((_, idx) => {
      initial[idx] = {
        selectedOption: null,
        isMarkedForReview: false,
        visited: idx === 0,
        timeSpentSeconds: 0
      };
    });
    return initial;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(currentTest.durationMinutes * 60);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isPaletteDrawerOpen, setIsPaletteDrawerOpen] = useState(false);
  const [startTime] = useState<number>(Date.now());

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitFinalTest();
          return 0;
        }
        return prev - 1;
      });

      // Increment time spent on current question
      setQuestionStates(prev => ({
        ...prev,
        [currentIndex]: {
          ...prev[currentIndex],
          timeSpentSeconds: (prev[currentIndex]?.timeSpentSeconds || 0) + 1
        }
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleSelectOption = (optIndex: number) => {
    setQuestionStates(prev => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        selectedOption: optIndex,
        visited: true
      }
    }));
  };

  const handleClearResponse = () => {
    setQuestionStates(prev => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        selectedOption: null
      }
    }));
  };

  const handleToggleMarkForReview = () => {
    setQuestionStates(prev => ({
      ...prev,
      [currentIndex]: {
        ...prev[currentIndex],
        isMarkedForReview: !prev[currentIndex].isMarkedForReview
      }
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setQuestionStates(prev => ({
        ...prev,
        [nextIdx]: { ...prev[nextIdx], visited: true }
      }));
      setCurrentIndex(nextIdx);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleJumpToQuestion = (idx: number) => {
    setQuestionStates(prev => ({
      ...prev,
      [idx]: { ...prev[idx], visited: true }
    }));
    setCurrentIndex(idx);
    setIsPaletteDrawerOpen(false);
  };

  // Palette Status calculations
  const stats = useMemo(() => {
    let answered = 0;
    let marked = 0;
    let answeredAndMarked = 0;
    let notAnswered = 0;
    let notVisited = 0;

    questions.forEach((_, idx) => {
      const qState = questionStates[idx];
      if (!qState) return;

      const hasAnswer = qState.selectedOption !== null;
      const isMarked = qState.isMarkedForReview;
      const isVis = qState.visited;

      if (hasAnswer && isMarked) {
        answeredAndMarked++;
      } else if (hasAnswer) {
        answered++;
      } else if (isMarked) {
        marked++;
      } else if (isVis) {
        notAnswered++;
      } else {
        notVisited++;
      }
    });

    return { answered, marked, answeredAndMarked, notAnswered, notVisited };
  }, [questionStates, questions]);

  const handleSubmitFinalTest = () => {
    const totalQ = questions.length;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;
    let score = 0;

    const questionResponses = questions.map((q, idx) => {
      const state = questionStates[idx];
      const selected = state?.selectedOption ?? null;
      const isCorrect = selected === q.correctAnswerIndex;

      if (selected === null) {
        unattempted++;
      } else if (isCorrect) {
        correct++;
        score += currentTest.positiveMarksPerQuestion;
      } else {
        incorrect++;
        score -= currentTest.negativeMarksPerQuestion;
      }

      return {
        questionId: q.id,
        selectedOption: selected,
        isCorrect,
        correctAnswerIndex: q.correctAnswerIndex,
        timeSpentSeconds: state?.timeSpentSeconds || 0
      };
    });

    const attemptedCount = correct + incorrect;
    const accuracy = attemptedCount > 0 ? Math.round((correct / attemptedCount) * 100) : 0;
    const totalTimeSpent = (currentTest.durationMinutes * 60) - timeLeftSeconds;

    const attemptRecord: TestAttempt = {
      id: `attempt_${Date.now()}`,
      testId: currentTest.id,
      testTitle: currentTest.title,
      examId: currentTest.examId,
      startedAt: new Date(startTime).toISOString(),
      completedAt: new Date().toISOString(),
      totalQuestions: totalQ,
      attemptedQuestions: attemptedCount,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      unattemptedQuestions: unattempted,
      totalMarksScored: Math.max(0, Number(score.toFixed(2))),
      maxMarks: currentTest.totalMarks,
      accuracyPercentage: accuracy,
      timeTakenSeconds: totalTimeSpent,
      questionResponses
    };

    saveTestAttempt(attemptRecord);
  };

  const currentQ = questions[currentIndex];
  const currentState = questionStates[currentIndex] || {
    selectedOption: null,
    isMarkedForReview: false,
    visited: true,
    timeSpentSeconds: 0
  };

  const getButtonPaletteClass = (idx: number) => {
    const qState = questionStates[idx];
    if (!qState) return 'bg-slate-100 text-slate-700';

    const isCurrent = idx === currentIndex;
    const hasAnswer = qState.selectedOption !== null;
    const isMarked = qState.isMarkedForReview;

    let base = 'w-9 h-9 text-xs font-bold rounded-lg flex items-center justify-center transition border ';

    if (isCurrent) {
      base += 'ring-2 ring-indigo-600 ring-offset-1 ';
    }

    if (hasAnswer && isMarked) {
      return base + 'bg-purple-600 text-white border-purple-700 relative';
    }
    if (isMarked) {
      return base + 'bg-purple-100 text-purple-800 border-purple-300';
    }
    if (hasAnswer) {
      return base + 'bg-emerald-600 text-white border-emerald-700';
    }
    if (qState.visited) {
      return base + 'bg-rose-50 text-rose-700 border-rose-200';
    }
    return base + 'bg-slate-100 text-slate-600 border-slate-200';
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* CBT Examination Top Bar */}
      <header className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bold text-white line-clamp-1">
              {currentTest.title}
            </div>
            <div className="text-[11px] text-slate-400">
              Exam: {currentTest.examId.toUpperCase()} • {questions.length} Questions • {currentTest.totalMarks} Marks
            </div>
          </div>
        </div>

        {/* Timer & Submit */}
        <div className="flex items-center gap-3">
          {/* Live Timer badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white">
            <Clock className={`w-4 h-4 ${timeLeftSeconds < 300 ? 'text-rose-400 animate-pulse' : 'text-amber-400'}`} />
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block -mb-1">Time Left</span>
              <span className={`text-sm font-mono font-bold ${timeLeftSeconds < 300 ? 'text-rose-400' : 'text-white'}`}>
                {formatTimer(timeLeftSeconds)}
              </span>
            </div>
          </div>

          <button
            id="cbt-submit-test-btn"
            onClick={() => setIsSubmitModalOpen(true)}
            className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Submit Test</span>
            <span className="sm:hidden">Submit</span>
          </button>

          {/* Mobile Palette Drawer Toggle */}
          <button
            onClick={() => setIsPaletteDrawerOpen(!isPaletteDrawerOpen)}
            className="lg:hidden p-2 bg-slate-800 text-slate-200 rounded-lg"
            title="Question Palette"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Examination Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Active Question Workspace (3 cols) */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          
          {/* Question Sub-header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded bg-indigo-600 text-white">
                Question {currentIndex + 1}
              </span>
              <span className="text-xs text-slate-400">of {questions.length}</span>
            </div>

            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                +{currentTest.positiveMarksPerQuestion} Marks
              </span>
              <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                -{currentTest.negativeMarksPerQuestion} Marks
              </span>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-5 sm:p-8 space-y-6 flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="space-y-6"
              >
                <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed font-sans">
                  {currentQ.questionText}
                </div>

                {/* Options list */}
                <div className="space-y-3">
                  {currentQ.options.map((optionText, optIdx) => {
                    const isSelected = currentState.selectedOption === optIdx;
                    const optLetter = ['A', 'B', 'C', 'D'][optIdx];

                    return (
                      <motion.button
                        key={optIdx}
                        whileHover={{ scale: 1.004 }}
                        whileTap={{ scale: 0.996 }}
                        id={`cbt-option-${optIdx}`}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition flex items-start gap-3.5 ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-semibold shadow-xs ring-1 ring-indigo-500'
                            : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition ${
                          isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {optLetter}
                        </span>
                        <span className="leading-snug pt-0.5">{optionText}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom CBT Navigation Controls */}
          <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                id="cbt-mark-review-btn"
                onClick={handleToggleMarkForReview}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg border transition flex items-center gap-1.5 ${
                  currentState.isMarkedForReview
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{currentState.isMarkedForReview ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>

              <button
                id="cbt-clear-response-btn"
                onClick={handleClearResponse}
                disabled={currentState.selectedOption === null}
                className="px-3.5 py-2 text-xs font-bold rounded-lg border border-slate-300 text-slate-600 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Response</span>
              </button>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                id="cbt-prev-btn"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 transition flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIndex < questions.length - 1 ? (
                <button
                  id="cbt-next-btn"
                  onClick={handleNext}
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition flex items-center gap-1"
                >
                  <span>Save & Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="px-5 py-2 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition flex items-center gap-1"
                >
                  <span>Review & Submit</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette (Desktop) & Drawer (Mobile) */}
        <div className={`
          fixed lg:static inset-y-0 right-0 z-40 w-80 lg:w-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between
          transition-transform duration-200 ease-in-out
          ${isPaletteDrawerOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Question Palette
              </h4>
              <button
                onClick={() => setIsPaletteDrawerOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {stats.answered}
                </span>
                <span className="text-slate-600">Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-rose-100 text-rose-700 text-[9px] font-bold flex items-center justify-center border border-rose-300">
                  {stats.notAnswered}
                </span>
                <span className="text-slate-600">Not Answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-purple-100 text-purple-800 text-[9px] font-bold flex items-center justify-center border border-purple-300">
                  {stats.marked}
                </span>
                <span className="text-slate-600">Marked</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-purple-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {stats.answeredAndMarked}
                </span>
                <span className="text-slate-600">Ans & Marked</span>
              </div>
            </div>

            {/* Palette Grid */}
            <div className="max-h-72 lg:max-h-96 overflow-y-auto pr-1">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    id={`palette-btn-${idx}`}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={getButtonPaletteClass(idx)}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Submit button at bottom of palette */}
          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="w-full py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Test Paper</span>
            </button>
          </div>
        </div>

      </div>

      {/* Submit Confirmation Modal */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <motion.div
            key="submit-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setIsSubmitModalOpen(false)}
          >
            <motion.div
              key="submit-modal-panel"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 font-['Outfit']">
                    Confirm Test Submission
                  </h4>
                  <p className="text-xs text-slate-500">
                    Please review your question attempt summary before final scoring.
                  </p>
                </div>
              </div>

              {/* Summary Statistics */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 mb-5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Total Questions:</span>
                  <span className="font-bold text-slate-900">{questions.length}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Answered:</span>
                  <span className="font-bold">{stats.answered + stats.answeredAndMarked}</span>
                </div>
                <div className="flex justify-between text-rose-700 font-medium">
                  <span>Unattempted / Not Answered:</span>
                  <span className="font-bold">{questions.length - (stats.answered + stats.answeredAndMarked)}</span>
                </div>
                <div className="flex justify-between text-purple-700 font-medium">
                  <span>Marked for Review:</span>
                  <span className="font-bold">{stats.marked + stats.answeredAndMarked}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 border border-slate-300 rounded-xl transition"
                >
                  Resume Test
                </button>
                <button
                  id="btn-confirm-submit-test"
                  onClick={handleSubmitFinalTest}
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow transition"
                >
                  Yes, Submit Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
