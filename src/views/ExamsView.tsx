import React from 'react';
import { GraduationCap, ArrowRight, BookOpen, FileCheck, CheckCircle2, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAMS } from '../data/mockData';
import { ExamCard } from '../components/ExamCard';
import { ExamId } from '../types';

export const ExamsView: React.FC = () => {
  const { navigateTo } = useApp();

  const handleExplore = (examId: ExamId) => {
    navigateTo('exam-detail', { examId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold">
          <GraduationCap className="w-4 h-4 text-indigo-600" />
          <span>Target Competitive Examinations</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-['Outfit']">
          Choose Your Target Exam
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Each exam features a dedicated dashboard complete with structured subjects, mock tests, previous year papers, and focused study material.
        </p>
      </div>

      {/* 5 Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXAMS.map(exam => (
          <ExamCard
            key={exam.id}
            exam={exam}
            onExplore={handleExplore}
          />
        ))}
      </div>

      {/* Comparison & Details Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">
              Exam Structure & Eligibility Summary
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Quick overview of exam patterns, negative marking, and cycles.</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/50 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Exam</th>
                <th className="py-3 px-4">Conducted By</th>
                <th className="py-3 px-4">Eligibility</th>
                <th className="py-3 px-4">Negative Marking</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {EXAMS.map(exam => (
                <tr key={exam.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-[10px]">
                        {exam.name.slice(0, 3)}
                      </div>
                      <span>{exam.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{exam.badge}</td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs">{exam.eligibility}</td>
                  <td className="py-3.5 px-4 text-rose-600">{exam.negativeMarking}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleExplore(exam.id)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded transition"
                    >
                      Open Portal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
