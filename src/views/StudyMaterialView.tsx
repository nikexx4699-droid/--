import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Clock, 
  Check, 
  Copy, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAMS } from '../data/mockData';
import { StudyMaterial } from '../types';

export const StudyMaterialView: React.FC = () => {
  const { studyMaterials } = useApp();
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['Formulas', 'Short Tricks', 'Important Concepts', 'Revision Summaries'];

  const filteredMaterials = useMemo(() => {
    return studyMaterials.filter(item => {
      if (selectedExam !== 'all' && item.examId !== selectedExam) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mTitle = item.title.toLowerCase().includes(q);
        const mTopic = item.topic.toLowerCase().includes(q);
        const mContent = item.content.toLowerCase().includes(q);
        if (!mTitle && !mTopic && !mContent) return false;
      }
      return true;
    });
  }, [studyMaterials, selectedExam, selectedCategory, searchQuery]);

  const handleCopyNotes = (item: StudyMaterial) => {
    const text = `${item.title}\n\n${item.content}\n\nKey Takeaways:\n${(item.keyPoints || []).map(p => `• ${p}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>High-Yield Revision Vault</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Study Material & Formulas
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          High-yield formula cheat sheets, shortcut mental math tricks, and structured revision capsules for fast retention.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Exam Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Filter by Exam</label>
            <select
              value={selectedExam}
              onChange={e => setSelectedExam(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Examinations</option>
              {EXAMS.map(exam => (
                <option key={exam.id} value={exam.id}>{exam.name}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Material Category</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Material Types</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Search Concept or Formula</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Trigonometry, Fundamental Rights..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Content
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Material Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMaterials.map(item => (
          <div
            key={item.id}
            id={`study-item-${item.id}`}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition p-6 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                  {item.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{item.readTime}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>

              <div className="text-xs text-indigo-600 font-semibold mt-1">
                {item.topic} • <span className="uppercase text-slate-500 font-normal">{item.examId}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-3">
                {item.content}
              </p>

              {item.keyPoints && item.keyPoints.length > 0 && (
                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                    High-Yield Memory Points:
                  </div>
                  {item.keyPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="text-slate-700 flex items-start gap-2">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">PrepPilot Verified Notes</span>
              <button
                onClick={() => handleCopyNotes(item)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-lg border border-slate-200 transition flex items-center gap-1.5"
              >
                {copiedId === item.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Notes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
