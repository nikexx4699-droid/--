import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, FileCheck } from 'lucide-react';
import { Exam } from '../types';
import { SUBJECTS } from '../data/mockData';

interface ExamCardProps {
  exam: Exam;
  onExplore: (examId: Exam['id']) => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({ exam, onExplore }) => {
  const examSubjects = SUBJECTS.filter(s => s.examId === exam.id);

  return (
    <div 
      id={`exam-card-${exam.id}`}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden group"
    >
      {/* Top Banner & Badge */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
            {exam.badge}
          </span>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {exam.mockTestsCount} Mock Tests
          </span>
        </div>

        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition tracking-tight">
          {exam.name}
        </h3>
        <p className="text-xs font-medium text-slate-500 mb-2">{exam.fullName}</p>
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {exam.description}
        </p>

        {/* Subjects preview */}
        <div className="border-t border-slate-100 pt-3">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-slate-400" />
            <span>Subjects Covered ({examSubjects.length})</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {examSubjects.slice(0, 4).map(sub => (
              <span 
                key={sub.id}
                className="text-[11px] bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium px-2 py-0.5 rounded transition"
              >
                {sub.name}
              </span>
            ))}
            {examSubjects.length > 4 && (
              <span className="text-[11px] bg-slate-100 text-slate-500 font-medium px-2 py-0.5 rounded">
                +{examSubjects.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer / CTA */}
      <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-slate-600">
          <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{exam.questionsCount.toLocaleString()}+ Questions</span>
        </div>
        <button
          id={`explore-exam-btn-${exam.id}`}
          onClick={() => onExplore(exam.id)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-3 py-1.5 rounded-lg transition group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 shadow-2xs"
        >
          <span>Explore Exam</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
};
