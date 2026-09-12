import React from 'react';
import { Clock, HelpCircle, Award, PlayCircle, Users, ArrowRight } from 'lucide-react';
import { MockTest } from '../types';

interface MockTestCardProps {
  test: MockTest;
  onStart: (testId: string) => void;
}

export const MockTestCard: React.FC<MockTestCardProps> = ({ test, onStart }) => {
  const getDifficultyColor = (diff: MockTest['difficulty']) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Hard':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div 
      id={`mock-test-card-${test.id}`}
      className="bg-white rounded-xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-indigo-300 transition duration-150 p-5 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getDifficultyColor(test.difficulty)}`}>
            {test.difficulty}
          </span>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <Users className="w-3 h-3 text-slate-400" />
            <span>{test.attemptsCount.toLocaleString()} Attempts</span>
          </span>
        </div>

        <h4 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
          {test.title}
        </h4>

        {/* Test specs */}
        <div className="grid grid-cols-3 gap-2 my-4 py-2.5 bg-slate-50/80 rounded-lg border border-slate-100 text-center">
          <div>
            <div className="text-slate-400 text-[10px] font-semibold uppercase">Questions</div>
            <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
              <HelpCircle className="w-3 h-3 text-indigo-500" />
              <span>{test.totalQuestions} Qs</span>
            </div>
          </div>
          <div className="border-x border-slate-200/60">
            <div className="text-slate-400 text-[10px] font-semibold uppercase">Duration</div>
            <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
              <Clock className="w-3 h-3 text-amber-500" />
              <span>{test.durationMinutes} mins</span>
            </div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px] font-semibold uppercase">Marks</div>
            <div className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
              <Award className="w-3 h-3 text-emerald-500" />
              <span>{test.totalMarks} M</span>
            </div>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center justify-between px-1">
          <span>Correct: <strong className="text-emerald-600">+{test.positiveMarksPerQuestion}</strong></span>
          <span>Wrong: <strong className="text-rose-500">-{test.negativeMarksPerQuestion}</strong></span>
          <span className="uppercase text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
            {test.examId}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium">Free Live Test</span>
        <button
          id={`btn-start-test-${test.id}`}
          onClick={() => onStart(test.id)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition"
        >
          <PlayCircle className="w-4 h-4" />
          <span>Start Test</span>
        </button>
      </div>
    </div>
  );
};
