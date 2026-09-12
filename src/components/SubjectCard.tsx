import React from 'react';
import { ArrowRight, BookOpen, Layers, CheckCircle } from 'lucide-react';
import { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  onClick: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  return (
    <div
      id={`subject-card-${subject.id}`}
      onClick={onClick}
      className="bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm group-hover:bg-indigo-600 group-hover:text-white transition">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            {subject.topics.length} Topics
          </span>
        </div>

        <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition">
          {subject.name}
        </h4>
        <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
          {subject.description}
        </p>

        {/* Topics preview */}
        {subject.topics.length > 0 && (
          <div className="mt-3.5 pt-3 border-t border-slate-100">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Layers className="w-3 h-3 text-slate-400" />
              <span>Core Modules</span>
            </div>
            <ul className="space-y-1">
              {subject.topics.slice(0, 3).map(topic => (
                <li key={topic.id} className="text-xs text-slate-600 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                  <span className="truncate">{topic.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">
          {subject.totalQuestions.toLocaleString()}+ Questions
        </span>
        <span className="text-indigo-600 font-semibold flex items-center gap-1 group-hover:underline">
          <span>Explore Subject</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </div>
  );
};
