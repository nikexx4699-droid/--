import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Search, 
  X, 
  BookOpen, 
  Compass, 
  GraduationCap, 
  FileText, 
  Newspaper, 
  History, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAMS, SUBJECTS, MOCK_TESTS, PREVIOUS_YEAR_PAPERS } from '../data/mockData';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    closeSearch, 
    navigateTo, 
    questions, 
    studyMaterials, 
    currentAffairs 
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Handle ESC and keyboard shortcut '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !isSearchOpen) {
        // Only if not already typing in an input
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const qClean = query.trim().toLowerCase();

  // Search results
  const matchingExams = qClean 
    ? EXAMS.filter(e => e.name.toLowerCase().includes(qClean) || e.fullName.toLowerCase().includes(qClean))
    : [];

  const matchingSubjects = qClean
    ? SUBJECTS.filter(s => s.name.toLowerCase().includes(qClean) || s.description.toLowerCase().includes(qClean))
    : [];

  const matchingTopics: { topicName: string; subjectName: string; examId: any }[] = [];
  if (qClean) {
    SUBJECTS.forEach(s => {
      s.topics.forEach(t => {
        if (t.name.toLowerCase().includes(qClean) || (t.subtopics && t.subtopics.some(sub => sub.toLowerCase().includes(qClean)))) {
          matchingTopics.push({ topicName: t.name, subjectName: s.name, examId: s.examId });
        }
      });
    });
  }

  const matchingMockTests = qClean
    ? MOCK_TESTS.filter(m => m.title.toLowerCase().includes(qClean) || m.examId.toLowerCase().includes(qClean))
    : [];

  const matchingPapers = qClean
    ? PREVIOUS_YEAR_PAPERS.filter(p => p.title.toLowerCase().includes(qClean) || p.subject.toLowerCase().includes(qClean))
    : [];

  const matchingStudy = qClean
    ? studyMaterials.filter(sm => sm.title.toLowerCase().includes(qClean) || sm.topic.toLowerCase().includes(qClean) || sm.category.toLowerCase().includes(qClean))
    : [];

  const matchingNews = qClean
    ? currentAffairs.filter(ca => ca.title.toLowerCase().includes(qClean) || ca.category.toLowerCase().includes(qClean))
    : [];

  const totalResults = 
    matchingExams.length + 
    matchingSubjects.length + 
    matchingTopics.length + 
    matchingMockTests.length + 
    matchingPapers.length + 
    matchingStudy.length + 
    matchingNews.length;

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          key="search-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 sm:pt-20"
          onClick={closeSearch}
        >
          <motion.div 
            key="search-modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50/70">
              <Search className="w-5 h-5 text-indigo-600 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search exams, subjects, topics, PYQs, study notes..."
                className="w-full bg-transparent text-slate-900 text-sm sm:text-base font-medium placeholder-slate-400 focus:outline-none"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={closeSearch}
                className="px-2 py-1 text-xs font-semibold text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-100 transition"
              >
                Esc
              </button>
            </div>

            {/* Search Body */}
            <div className="overflow-y-auto p-4 space-y-5 divide-y divide-slate-100">
              {!qClean && (
                <div className="py-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-3">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Search the PrepPilot Knowledge Base</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1">
                    Type any exam name (NDA, CDS, CUET, AFCAT), topic (Trigonometry, Polity, Calculus), or formulas.
                  </p>
                  {/* Quick suggestions */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-md mx-auto">
                    {['NDA Maths', 'CDS GK', 'CUET General Test', 'Indian Polity', 'AFCAT Reasoning', 'Formulas'].map(term => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-medium px-2.5 py-1 rounded-full transition duration-150"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {qClean && totalResults === 0 && (
                <div className="py-12 text-center text-slate-500">
                  <p className="text-sm font-semibold text-slate-800">No exact matches found for "{query}"</p>
                  <p className="text-xs mt-1">Try searching for CUET, NDA, CDS, Maths, Polity, or Formulas.</p>
                </div>
              )}

              {/* Exams */}
              {matchingExams.length > 0 && (
                <div className="pt-2">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Target Exams ({matchingExams.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingExams.map(e => (
                      <div
                        key={e.id}
                        onClick={() => { closeSearch(); navigateTo('exam-detail', { examId: e.id }); }}
                        className="p-2.5 rounded-xl hover:bg-indigo-50/70 border border-transparent hover:border-indigo-100 cursor-pointer flex items-center justify-between transition group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition">
                            {e.name} - {e.fullName}
                          </div>
                          <div className="text-[11px] text-slate-500">{e.mockTestsCount} Mock Tests • {e.questionsCount}+ Questions</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Subjects */}
              {matchingSubjects.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Subjects ({matchingSubjects.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingSubjects.map(s => (
                      <div
                        key={s.id}
                        onClick={() => { closeSearch(); navigateTo('subject-detail', { examId: s.examId, subjectId: s.id }); }}
                        className="p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer flex items-center justify-between transition group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition">
                            {s.name} <span className="text-[10px] text-slate-400 font-normal">({s.examId.toUpperCase()})</span>
                          </div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{s.description}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Topics */}
              {matchingTopics.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Topics ({matchingTopics.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingTopics.slice(0, 6).map((t, idx) => (
                      <div
                        key={idx}
                        onClick={() => { closeSearch(); navigateTo('practice'); }}
                        className="p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200/70 cursor-pointer transition"
                      >
                        <div className="text-xs font-semibold text-slate-900">{t.topicName}</div>
                        <div className="text-[10px] text-slate-500">{t.subjectName}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mock Tests */}
              {matchingMockTests.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-purple-500" />
                    <span>Mock Tests ({matchingMockTests.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingMockTests.map(m => (
                      <div
                        key={m.id}
                        onClick={() => { closeSearch(); navigateTo('test-take', { testId: m.id }); }}
                        className="p-2.5 rounded-xl hover:bg-purple-50/70 border border-transparent hover:border-purple-100 cursor-pointer flex items-center justify-between transition group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700">
                            {m.title}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {m.totalQuestions} Questions • {m.durationMinutes} mins • {m.totalMarks} Marks
                          </div>
                        </div>
                        <span className="text-xs font-bold text-purple-600 bg-white px-2 py-1 rounded shadow-2xs border border-purple-200">
                          Take Test
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Previous Year Papers */}
              {matchingPapers.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-blue-500" />
                    <span>Previous Year Papers ({matchingPapers.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingPapers.map(p => (
                      <div
                        key={p.id}
                        onClick={() => { closeSearch(); navigateTo('previous-papers'); }}
                        className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between transition group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{p.title}</div>
                          <div className="text-[11px] text-slate-500">Year {p.year} • {p.totalQuestions} Qs • {p.subject}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Study Materials */}
              {matchingStudy.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    <span>Study Material & Formulas ({matchingStudy.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingStudy.map(s => (
                      <div
                        key={s.id}
                        onClick={() => { closeSearch(); navigateTo('study-material'); }}
                        className="p-2.5 rounded-xl hover:bg-amber-50/50 cursor-pointer flex items-center justify-between transition group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{s.title}</div>
                          <div className="text-[11px] text-slate-500">{s.category} • {s.topic}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Current Affairs */}
              {matchingNews.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Current Affairs ({matchingNews.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchingNews.map(n => (
                      <div
                        key={n.id}
                        onClick={() => { closeSearch(); navigateTo('current-affairs'); }}
                        className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between transition group"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{n.title}</div>
                          <div className="text-[11px] text-slate-500">{n.category} • {n.date}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Quick navigation: Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Esc</kbd> to close</span>
              <span>PrepPilot Smart Search</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
