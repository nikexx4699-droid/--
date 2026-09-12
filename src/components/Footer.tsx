import React from 'react';
import { Compass, Shield, Award, Sparkles, Heart, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAMS } from '../data/mockData';
import { ExamId } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  const handleExamClick = (examId: ExamId) => {
    navigateTo('exam-detail', { examId });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-sm">
      {/* Top Value Banner */}
      <div className="border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8 bg-slate-950/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">100% Exam-Accurate Patterns</h4>
              <p className="text-xs text-slate-400 mt-0.5">Designed by top-rankers and defence exam veterans</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Real CBT Simulator</h4>
              <p className="text-xs text-slate-400 mt-0.5">Exact negative marking, timer & review palettes</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Actionable Analytics</h4>
              <p className="text-xs text-slate-400 mt-0.5">Pinpoint weak topics & time spent per question</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-['Outfit']">
                Prep<span className="text-indigo-400">Pilot</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              PrepPilot is a dedicated exam preparation ecosystem engineered for aspirants targeting CUET, CDS, NDA, AFCAT, and General Studies. Prepare smart with high-fidelity mock tests, granular analytics, and curations.
            </p>
            <div className="text-xs text-slate-400 space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>support@preppilot.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>+91 1800 240 6800 (Mon - Sat, 9 AM - 7 PM)</span>
              </div>
            </div>
          </div>

          {/* Target Exams */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-3.5">
              Target Exams
            </h5>
            <ul className="space-y-2 text-xs">
              {EXAMS.map(exam => (
                <li key={exam.id}>
                  <button
                    onClick={() => handleExamClick(exam.id)}
                    className="hover:text-indigo-400 transition text-left flex items-center gap-1 group"
                  >
                    <span>{exam.name}</span>
                    <span className="text-[10px] text-slate-500 group-hover:text-indigo-400">({exam.fullName.split(' ')[0]})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Learning Links */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-3.5">
              Study Hub
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('test-series')} className="hover:text-indigo-400 transition">
                  All Mock Test Series
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('practice')} className="hover:text-indigo-400 transition">
                  Topic-wise Practice Bank
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('previous-papers')} className="hover:text-indigo-400 transition">
                  Previous Year Papers (PYQs)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('study-material')} className="hover:text-indigo-400 transition">
                  Formulas & Short Tricks
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('current-affairs')} className="hover:text-indigo-400 transition">
                  Daily & Monthly Current Affairs
                </button>
              </li>
            </ul>
          </div>

          {/* Student Portal */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-3.5">
              Student Space
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('user-dashboard')} className="hover:text-indigo-400 transition">
                  Performance Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('practice')} className="hover:text-indigo-400 transition">
                  Bookmarked Questions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-indigo-400 transition flex items-center gap-1 text-slate-400 hover:text-white">
                  <span>Admin Management</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li className="pt-2 text-slate-400">
                <span className="text-[11px] block text-slate-400">Tagline:</span>
                <span className="text-white font-medium italic text-xs">"Prepare Smart. Perform Better."</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800/80 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2025-2026 PrepPilot Education Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Honor Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
