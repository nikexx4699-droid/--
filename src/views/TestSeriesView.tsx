import React, { useState, useMemo } from 'react';
import { 
  Award, 
  Filter, 
  Search, 
  Clock, 
  PlayCircle, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_TESTS, EXAMS } from '../data/mockData';
import { MockTestCard } from '../components/MockTestCard';

export const TestSeriesView: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredTests = useMemo(() => {
    return MOCK_TESTS.filter(t => {
      if (selectedExam !== 'all' && t.examId !== selectedExam) return false;
      if (selectedDifficulty !== 'all' && t.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedExam, selectedDifficulty]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
          <Award className="w-3.5 h-3.5 text-indigo-600" />
          <span>Real Examination Simulation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Online Mock Test Series
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Full-length and sectional test papers equipped with authentic countdown timers, question palettes, and instant percentile analytics.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Exam Filter */}
          <div className="w-full sm:w-60">
            <select
              value={selectedExam}
              onChange={e => setSelectedExam(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Examinations</option>
              {EXAMS.map(exam => (
                <option key={exam.id} value={exam.id}>{exam.name} ({exam.badge})</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="w-full sm:w-44">
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
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing <strong>{filteredTests.length}</strong> live CBT test papers
        </span>
      </div>

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map(test => (
          <MockTestCard
            key={test.id}
            test={test}
            onStart={(testId) => navigateTo('test-take', { testId })}
          />
        ))}
      </div>
    </div>
  );
};
