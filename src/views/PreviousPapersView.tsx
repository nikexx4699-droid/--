import React, { useState, useMemo } from 'react';
import { 
  History, 
  FileText, 
  Filter, 
  Download, 
  PlayCircle, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PREVIOUS_YEAR_PAPERS, EXAMS } from '../data/mockData';

export const PreviousPapersView: React.FC = () => {
  const { navigateTo } = useApp();
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const filteredPapers = useMemo(() => {
    return PREVIOUS_YEAR_PAPERS.filter(p => {
      if (selectedExam !== 'all' && p.examId !== selectedExam) return false;
      if (selectedYear !== 'all' && p.year.toString() !== selectedYear) return false;
      return true;
    });
  }, [selectedExam, selectedYear]);

  const years = ['2024', '2023', '2022', '2021', '2020'];

  const handleStartPYQTest = (mockTestId?: string) => {
    if (mockTestId) {
      navigateTo('test-take', { testId: mockTestId });
    } else {
      navigateTo('test-series');
    }
  };

  const handleDownloadSim = (title: string) => {
    alert(`Downloading official question paper and verified answer key for: "${title}".`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
          <History className="w-3.5 h-3.5 text-blue-600" />
          <span>Official Archive Bank</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Previous Year Papers (PYQs)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Solve original UPSC, NTA, and IAF question papers in the real computer-based test environment with instant evaluations.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Exam Filter */}
          <div className="w-full sm:w-56">
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

          {/* Year Filter */}
          <div className="w-full sm:w-40">
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Years</option>
              {years.map(yr => (
                <option key={yr} value={yr}>Year {yr}</option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
          Showing <strong>{filteredPapers.length}</strong> official archive papers
        </span>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPapers.map(paper => (
          <div
            key={paper.id}
            id={`pyq-card-${paper.id}`}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-indigo-300 transition p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {paper.examId.toUpperCase()}
                </span>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{paper.year}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                {paper.title}
              </h3>

              <p className="text-xs text-slate-500 mt-1">
                Subject: <strong className="text-slate-700">{paper.subject}</strong>
              </p>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 my-4 py-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Questions</div>
                  <div className="font-bold text-slate-800 mt-0.5">{paper.totalQuestions} Qs</div>
                </div>
                <div className="border-x border-slate-200/70">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Duration</div>
                  <div className="font-bold text-slate-800 mt-0.5">{paper.durationMinutes}m</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Marks</div>
                  <div className="font-bold text-slate-800 mt-0.5">{paper.marks} M</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => handleDownloadSim(paper.title)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition flex items-center gap-1.5"
                title="Download Question Paper PDF"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PDF</span>
              </button>

              <button
                id={`btn-pyq-start-${paper.id}`}
                onClick={() => handleStartPYQTest(paper.mockTestId)}
                className="flex-1 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs hover:shadow transition flex items-center justify-center gap-1.5"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Start Test</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
