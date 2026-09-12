import React, { useMemo } from 'react';
import { 
  User, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  AlertTriangle, 
  BookOpen, 
  PlayCircle, 
  RotateCcw, 
  ChevronRight, 
  Bookmark,
  Compass,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAMS, SUBJECTS, MOCK_TESTS } from '../data/mockData';

export const UserDashboardView: React.FC = () => {
  const { user, attempts, navigateTo, questions, bookmarkedQuestionIds } = useApp();

  const targetExam = EXAMS.find(e => e.id === user.targetExam) || EXAMS[0];

  // Stats calculation
  const totalAttempts = attempts.length;
  
  const averageAccuracy = useMemo(() => {
    if (totalAttempts === 0) return 0;
    const sum = attempts.reduce((acc, a) => acc + a.accuracyPercentage, 0);
    return Math.round(sum / totalAttempts);
  }, [attempts, totalAttempts]);

  const averageScorePct = useMemo(() => {
    if (totalAttempts === 0) return 0;
    const sum = attempts.reduce((acc, a) => acc + (a.totalMarksScored / a.maxMarks) * 100, 0);
    return Math.round(sum / totalAttempts);
  }, [attempts, totalAttempts]);

  const totalQuestionsAttempted = useMemo(() => {
    return attempts.reduce((acc, a) => acc + a.attemptedQuestions, 0);
  }, [attempts]);

  // Subject accuracy diagnostics simulation based on attempts & target exam
  const subjectDiagnostics = useMemo(() => {
    const examSubjects = SUBJECTS.filter(s => s.examId === user.targetExam);
    return examSubjects.map((s, idx) => {
      // Deterministic sample accuracy for demonstration
      const accuracies = [58, 82, 74, 61, 88];
      const acc = accuracies[idx % accuracies.length];
      const isWeak = acc < 65;
      return {
        subject: s,
        accuracy: acc,
        isWeak,
        questionsSolved: 40 + idx * 15
      };
    });
  }, [user.targetExam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Student Welcome Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-sm">
            {user.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-['Outfit']">
                Welcome back, {user.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                Active Student
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Email: {user.email} • Target Exam: <strong className="text-indigo-600 uppercase font-bold">{targetExam.name} ({targetExam.badge})</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('exam-detail', { examId: user.targetExam })}
            className="px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <span>Go to {targetExam.name} Hub</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Tests Taken</span>
            <Award className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-['Outfit'] mt-2">
            {totalAttempts}
          </div>
          <div className="text-xs text-slate-500 mt-1">Full & sectional CBT tests</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Average Accuracy</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 font-['Outfit'] mt-2">
            {averageAccuracy}%
          </div>
          <div className="text-xs text-slate-500 mt-1">Accuracy across all attempts</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Average Score</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-['Outfit'] mt-2">
            {averageScorePct}%
          </div>
          <div className="text-xs text-slate-500 mt-1">Percentile trajectory: High</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Saved Questions</span>
            <Bookmark className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-indigo-600 font-['Outfit'] mt-2">
            {bookmarkedQuestionIds.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Bookmarked for revision</div>
        </div>
      </div>

      {/* Weak Areas Identification & Recommendations */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Subject Accuracy & Weakness Diagnosis
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            PrepPilot algorithms analyze your error frequency to pinpoint topics requiring urgent revision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {subjectDiagnostics.map(({ subject, accuracy, isWeak, questionsSolved }) => (
            <div
              key={subject.id}
              className={`p-5 rounded-2xl border transition ${
                isWeak 
                  ? 'bg-rose-50/40 border-rose-200' 
                  : 'bg-slate-50/50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-sm text-slate-900">{subject.name}</div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  isWeak ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {accuracy}% Accuracy
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2.5">
                <div
                  className={`h-full rounded-full ${isWeak ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${accuracy}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">{questionsSolved} practice questions solved</span>
                {isWeak ? (
                  <span className="text-rose-600 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Needs Improvement
                  </span>
                ) : (
                  <span className="text-emerald-600 font-medium">Strong Proficiency</span>
                )}
              </div>

              {isWeak && (
                <div className="mt-3 pt-3 border-t border-rose-100 flex items-center justify-between">
                  <span className="text-[11px] text-rose-700">Recommended: Revise formulas & practice 20 MCQs</span>
                  <button
                    onClick={() => navigateTo('subject-detail', { examId: subject.examId, subjectId: subject.id })}
                    className="text-[11px] font-bold text-indigo-600 hover:underline"
                  >
                    Drill Topic
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Test History */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
              Recent Mock Test Attempts ({attempts.length})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Review answer choices, score breakdowns, and re-attempt past test papers.
            </p>
          </div>
          <button
            onClick={() => navigateTo('test-series')}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            <span>Take More Tests</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {attempts.length === 0 ? (
          <div className="p-10 text-center text-slate-500 text-xs">
            You haven't attempted any mock tests yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-100 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-5">Mock Test</th>
                  <th className="py-3 px-4">Date Completed</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4">Correct / Total</th>
                  <th className="py-3 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {attempts.map(attempt => (
                  <tr key={attempt.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      <div>{attempt.testTitle}</div>
                      <div className="text-[10px] text-slate-400 font-normal uppercase">{attempt.examId}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(attempt.completedAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-indigo-600">
                      {attempt.totalMarksScored} / {attempt.maxMarks}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">
                      {attempt.accuracyPercentage}%
                    </td>
                    <td className="py-3.5 px-4">
                      {attempt.correctAnswers} / {attempt.totalQuestions}
                    </td>
                    <td className="py-3.5 px-5 text-right space-x-2">
                      <button
                        onClick={() => navigateTo('test-take', { testId: attempt.testId })}
                        className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-100 rounded transition"
                      >
                        Retake
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
