import React, { useState, useMemo } from 'react';
import { 
  Newspaper, 
  Search, 
  Calendar, 
  Shield, 
  Globe, 
  Zap, 
  Award, 
  TrendingUp, 
  Sparkles,
  Bookmark,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CURRENT_AFFAIRS } from '../data/mockData';
import { CurrentAffairCategory } from '../types';

export const CurrentAffairsView: React.FC = () => {
  const { currentAffairs } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExam, setSelectedExam] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: CurrentAffairCategory[] = [
    'Defence', 
    'Science & Technology', 
    'National', 
    'International', 
    'Economy', 
    'Sports'
  ];

  const filteredItems = useMemo(() => {
    return currentAffairs.filter(ca => {
      if (selectedCategory !== 'all' && ca.category !== selectedCategory) return false;
      if (selectedExam !== 'all' && !ca.examRelevance.includes(selectedExam as any)) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mTitle = ca.title.toLowerCase().includes(q);
        const mDesc = ca.shortDescription.toLowerCase().includes(q);
        if (!mTitle && !mDesc) return false;
      }
      return true;
    });
  }, [currentAffairs, selectedCategory, selectedExam, searchQuery]);

  const getCategoryIcon = (category: CurrentAffairCategory) => {
    switch (category) {
      case 'Defence':
        return <Shield className="w-3.5 h-3.5 text-blue-600" />;
      case 'Science & Technology':
        return <Zap className="w-3.5 h-3.5 text-amber-600" />;
      case 'National':
        return <Award className="w-3.5 h-3.5 text-emerald-600" />;
      case 'International':
        return <Globe className="w-3.5 h-3.5 text-indigo-600" />;
      case 'Economy':
        return <TrendingUp className="w-3.5 h-3.5 text-rose-600" />;
      case 'Sports':
        return <Award className="w-3.5 h-3.5 text-cyan-600" />;
      default:
        return <Newspaper className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-semibold mb-2">
          <Newspaper className="w-3.5 h-3.5 text-cyan-600" />
          <span>Daily & Monthly Compendium</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
          Competitive Exam Current Affairs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Strictly syllabus-mapped briefings covering Defence exercises, scientific missions, national appointments, and global summits.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search news, missions, missiles..."
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Exam Relevance Filter */}
          <div className="w-full sm:w-56">
            <select
              value={selectedExam}
              onChange={e => setSelectedExam(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="all">All Exam Target Groups</option>
              <option value="nda">NDA Relevant</option>
              <option value="cds">CDS Relevant</option>
              <option value="afcat">AFCAT Relevant</option>
              <option value="cuet">CUET Relevant</option>
              <option value="general-studies">General Studies / Civil Services</option>
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-cyan-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Current Affairs Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            id={`ca-card-${item.id}`}
            className="bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition p-6 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200 flex items-center gap-1">
                  {getCategoryIcon(item.category)}
                  <span>{item.category}</span>
                </span>

                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                {item.shortDescription}
              </p>

              {/* Key Takeaways */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-xs">
                <div className="font-bold text-slate-700 text-[11px] uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-600" />
                  <span>Key Exam Takeaways:</span>
                </div>
                {item.keyTakeaways.map((takeaway, tIdx) => (
                  <div key={tIdx} className="text-slate-700 flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">•</span>
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Relevance Tags & Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1 flex-wrap">
                <span className="text-[10px] text-slate-400 font-semibold mr-1">Tested In:</span>
                {item.examRelevance.map(exam => (
                  <span
                    key={exam}
                    className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-700 border border-indigo-100"
                  >
                    {exam}
                  </span>
                ))}
              </div>

              <span className="text-[11px] text-slate-400 font-medium">
                {item.readTime}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
