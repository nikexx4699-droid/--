import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, XCircle, Bookmark, BookmarkCheck, HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Question } from '../types';
import { useApp } from '../context/AppContext';

interface QuestionCardProps {
  question: Question;
  index?: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, index }) => {
  const { bookmarkedQuestionIds, toggleBookmarkQuestion } = useApp();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const isBookmarked = bookmarkedQuestionIds.includes(question.id);

  const handleSelect = (idx: number) => {
    if (!isSubmitted) {
      setSelectedOption(idx);
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowExplanation(false);
  };

  const isCorrect = selectedOption === question.correctAnswerIndex;

  const getOptionClasses = (idx: number) => {
    const base = "w-full text-left p-3.5 rounded-xl border text-sm font-medium transition flex items-start gap-3 ";
    
    if (!isSubmitted) {
      if (selectedOption === idx) {
        return base + "border-indigo-600 bg-indigo-50/70 text-indigo-950 font-semibold shadow-2xs";
      }
      return base + "border-slate-200 bg-white hover:bg-slate-50 text-slate-800";
    }

    // After submission:
    if (idx === question.correctAnswerIndex) {
      return base + "border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold";
    }
    if (selectedOption === idx && !isCorrect) {
      return base + "border-rose-500 bg-rose-50/80 text-rose-950";
    }
    return base + "border-slate-200/60 bg-slate-50/50 text-slate-500";
  };

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div 
      id={`practice-q-${question.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 transition hover:shadow-xs"
    >
      {/* Header tags */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {index !== undefined && (
            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              Q{index + 1}
            </span>
          )}
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
            {question.examId.toUpperCase()}
          </span>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
            question.difficulty === 'Easy' 
              ? 'bg-emerald-50 text-emerald-700' 
              : question.difficulty === 'Medium'
              ? 'bg-amber-50 text-amber-700'
              : 'bg-rose-50 text-rose-700'
          }`}>
            {question.difficulty}
          </span>
          {question.previousYearYear && (
            <span className="text-[10px] font-medium bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100">
              PYQ {question.previousYearYear}
            </span>
          )}
        </div>

        <button
          onClick={() => toggleBookmarkQuestion(question.id)}
          className={`p-1.5 rounded-lg border transition ${
            isBookmarked 
              ? 'bg-amber-50 border-amber-200 text-amber-600' 
              : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
          }`}
          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
        >
          {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>

      {/* Question Text */}
      <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed mb-4">
        {question.questionText}
      </p>

      {/* Options List */}
      <div className="space-y-2.5 mb-5">
        {question.options.map((opt, idx) => (
          <motion.button
            key={idx}
            whileHover={!isSubmitted ? { scale: 1.005 } : {}}
            whileTap={!isSubmitted ? { scale: 0.995 } : {}}
            onClick={() => handleSelect(idx)}
            disabled={isSubmitted}
            className={getOptionClasses(idx)}
          >
            <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 transition ${
              isSubmitted && idx === question.correctAnswerIndex
                ? 'bg-emerald-600 text-white'
                : isSubmitted && selectedOption === idx && !isCorrect
                ? 'bg-rose-600 text-white'
                : selectedOption === idx
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}>
              {optionLabels[idx]}
            </span>
            <span className="leading-snug">{opt}</span>
          </motion.button>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition shadow-xs ${
              selectedOption !== null
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Correct Answer (+ marks)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                <XCircle className="w-4 h-4 text-rose-600" />
                Incorrect Answer
              </span>
            )}
            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {isSubmitted && (
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span>{showExplanation ? 'Hide Explanation' : 'View Full Solution'}</span>
            {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Explanation Drawer */}
      <AnimatePresence>
        {isSubmitted && showExplanation && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed text-slate-700">
              <div className="font-bold text-slate-900 mb-1 flex items-center gap-1 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                <span>Detailed Explanation & Logic:</span>
              </div>
              <p className="whitespace-pre-line text-slate-700 mt-1">{question.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
