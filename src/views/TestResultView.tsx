import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  RotateCcw, 
  LayoutDashboard, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  X,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_TESTS, SAMPLE_QUESTIONS } from '../data/mockData';

export const TestResultView: React.FC = () => {
  const { lastTestAttempt, activeTestId, navigateTo, questions } = useApp();
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');

  const test = MOCK_TESTS.find(t => t.id === activeTestId) || MOCK_TESTS[0];
  const attempt = lastTestAttempt;

  if (!attempt) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h2 className="text-xl font-bold text-slate-800">No test results found</h2>
        <p className="text-xs text-slate-500 mt-2">Take a mock test to see your in-depth performance analysis.</p>
        <button
          onClick={() => navigateTo('test-series')}
          className="mt-4 px-4 py-2 text-xs font-bold text-white bg-indigo-600 rounded-lg"
        >
          Explore Test Series
        </button>
      </div>
    );
  }

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins}m ${remainingSec}s`;
  };

  const percentage = Math.round((attempt.totalMarksScored / attempt.maxMarks) * 100);

  // Filter responses for the "Review Answers" section
  const filteredResponses = (attempt.questionResponses || []).filter(resp => {
    if (reviewFilter === 'correct') return resp.isCorrect;
    if (reviewFilter === 'incorrect') return resp.selectedOption !== null && !resp.isCorrect;
    if (reviewFilter === 'unattempted') return resp.selectedOption === null;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Score Banner */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Evaluation Complete • Performance Diagnostics</span>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
            {attempt.testTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Completed on {new Date(attempt.completedAt).toLocaleDateString()} at {new Date(attempt.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Big Score Hero Card */}
        <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50/50 border border-indigo-100 flex items-center justify-around">
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Your Score</div>
            <div className="text-4xl font-black text-indigo-900 font-['Outfit'] mt-1">
              {attempt.totalMarksScored} <span className="text-lg font-semibold text-slate-400">/ {attempt.maxMarks}</span>
            </div>
            <div className="text-xs font-bold text-indigo-700 mt-0.5">
              Score: {percentage}%
            </div>
          </div>

          <div className="h-12 w-px bg-indigo-200"></div>

          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Accuracy</div>
            <div className="text-4xl font-black text-emerald-700 font-['Outfit'] mt-1">
              {attempt.accuracyPercentage}%
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Time: {formatSeconds(attempt.timeTakenSeconds)}
            </div>
          </div>
        </div>

        {/* 4 Diagnostic Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Correct</span>
            </div>
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">
              {attempt.correctAnswers}
            </div>
            <div className="text-[11px] text-slate-500">Marks gained</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-rose-600 text-xs font-bold mb-1">
              <XCircle className="w-4 h-4" />
              <span>Incorrect</span>
            </div>
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">
              {attempt.incorrectAnswers}
            </div>
            <div className="text-[11px] text-rose-600 font-medium">Negative deducted</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Unattempted</span>
            </div>
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">
              {attempt.unattemptedQuestions}
            </div>
            <div className="text-[11px] text-slate-500">Zero penalty</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-amber-600 text-xs font-bold mb-1">
              <Clock className="w-4 h-4" />
              <span>Speed / Pace</span>
            </div>
            <div className="text-2xl font-black text-slate-900 font-['Outfit']">
              {attempt.attemptedQuestions > 0 ? Math.round(attempt.timeTakenSeconds / attempt.attemptedQuestions) : 0}s
            </div>
            <div className="text-[11px] text-slate-500">Avg per question</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigateTo('test-take', { testId: attempt.testId })}
            className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-xs flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake This Mock Test</span>
          </button>
          <button
            onClick={() => navigateTo('user-dashboard')}
            className="px-5 py-2.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>View Full User Dashboard</span>
          </button>
        </div>
      </div>

      {/* Review Answers Section */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-['Outfit']">
              Review Answers & Detailed Solutions
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review every question with your response, correct choice, and in-depth explanations.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {[
              { id: 'all', label: 'All' },
              { id: 'correct', label: `Correct (${attempt.correctAnswers})` },
              { id: 'incorrect', label: `Incorrect (${attempt.incorrectAnswers})` },
              { id: 'unattempted', label: `Skipped (${attempt.unattemptedQuestions})` }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setReviewFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  reviewFilter === f.id
                    ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Questions list in review mode */}
        <div className="space-y-6">
          {filteredResponses.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              No questions match the selected filter.
            </div>
          ) : (
            filteredResponses.map((resp, idx) => {
              const qObj = questions.find(q => q.id === resp.questionId) || SAMPLE_QUESTIONS[0];
              const isCorrect = resp.isCorrect;
              const isUnattempted = resp.selectedOption === null;

              return (
                <div 
                  key={resp.questionId}
                  className="p-5 sm:p-6 rounded-2xl border border-slate-200/90 bg-slate-50/50 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded">
                        Q{idx + 1}
                      </span>
                      {isCorrect ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3" /> Correct
                        </span>
                      ) : isUnattempted ? (
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded">
                          Unattempted
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded flex items-center gap-1">
                          <X className="w-3 h-3" /> Incorrect
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-slate-400">
                      Time spent: {resp.timeSpentSeconds}s
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900 leading-relaxed">
                    {qObj.questionText}
                  </p>

                  {/* 4 options with indicator */}
                  <div className="space-y-2">
                    {qObj.options.map((opt, optIdx) => {
                      const isChosen = resp.selectedOption === optIdx;
                      const isActualCorrect = qObj.correctAnswerIndex === optIdx;

                      let optClasses = "p-3 rounded-xl border text-xs font-medium flex items-center justify-between ";
                      if (isActualCorrect) {
                        optClasses += "bg-emerald-50 border-emerald-400 text-emerald-950 font-bold";
                      } else if (isChosen && !isActualCorrect) {
                        optClasses += "bg-rose-50 border-rose-400 text-rose-950 line-through";
                      } else {
                        optClasses += "bg-white border-slate-200 text-slate-600";
                      }

                      return (
                        <div key={optIdx} className={optClasses}>
                          <div className="flex items-center gap-2.5">
                            <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                              isActualCorrect ? 'bg-emerald-600 text-white' : isChosen ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {['A', 'B', 'C', 'D'][optIdx]}
                            </span>
                            <span>{opt}</span>
                          </div>
                          <div className="text-[10px] font-bold uppercase tracking-wider">
                            {isActualCorrect && <span className="text-emerald-700">Correct Option</span>}
                            {isChosen && !isActualCorrect && <span className="text-rose-600">Your Answer</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Solution & Explanation */}
                  <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs leading-relaxed text-slate-700">
                    <div className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Solution & Concept:</span>
                    </div>
                    <p className="text-slate-700 whitespace-pre-line">{qObj.explanation}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
