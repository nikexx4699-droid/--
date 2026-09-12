import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Layers, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  PlayCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SUBJECTS, EXAMS, MOCK_TESTS, PREVIOUS_YEAR_PAPERS, STUDY_MATERIALS } from '../data/mockData';
import { QuestionCard } from '../components/QuestionCard';
import { MockTestCard } from '../components/MockTestCard';

export const SubjectDetailView: React.FC = () => {
  const { selectedExamId, selectedSubjectId, navigateTo, questions } = useApp();
  const [activeTab, setActiveTab] = useState<'topics' | 'practice' | 'mock-tests' | 'pyqs' | 'notes'>('topics');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const exam = EXAMS.find(e => e.id === selectedExamId) || EXAMS[0];
  const subject = SUBJECTS.find(s => s.id === selectedSubjectId) || SUBJECTS.find(s => s.examId === exam.id) || SUBJECTS[0];

  const subjectQuestions = questions.filter(q => q.subjectId === subject.id || (q.examId === subject.examId && !q.subjectId));
  const subjectMockTests = MOCK_TESTS.filter(m => m.subjectId === subject.id || m.examId === subject.examId);
  const subjectPYQs = PREVIOUS_YEAR_PAPERS.filter(p => p.examId === subject.examId);
  const subjectStudyMaterials = STUDY_MATERIALS.filter(sm => sm.subjectId === subject.id || sm.examId === subject.examId);

  const toggleTopicExpand = (topicId: string) => {
    setExpandedTopicId(prev => prev === topicId ? null : topicId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => navigateTo('exam-detail', { examId: exam.id })}
          className="hover:text-indigo-600 font-medium flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to {exam.name} Dashboard</span>
        </button>
        <span>/</span>
        <span className="text-slate-900 font-bold">{subject.name}</span>
      </div>

      {/* Subject Header Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
              {exam.name} Core Syllabus
            </span>
            <span className="text-xs text-slate-400">
              {subject.topics.length} Structured Modules
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            {subject.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {subject.description}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
            <span><strong>{subject.totalQuestions}+</strong> Solved Questions</span>
            <span>•</span>
            <span><strong>{subject.totalTests}</strong> Practice Test Sets</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('practice')}
            className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition"
          >
            Practice Subject Questions
          </button>
          <button
            onClick={() => setActiveTab('mock-tests')}
            className="px-5 py-2.5 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition"
          >
            Take Subject Mock Test
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'topics', label: `Topics & Modules (${subject.topics.length})` },
            { id: 'practice', label: `Practice Questions (${subjectQuestions.length})` },
            { id: 'mock-tests', label: `Subject Tests (${subjectMockTests.length})` },
            { id: 'pyqs', label: `Previous Year Questions (${subjectPYQs.length})` },
            { id: 'notes', label: `Study Notes & Formulas (${subjectStudyMaterials.length})` }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`subject-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENTS */}

      {/* 1. TOPICS (Cards & Expandable Sections) */}
      {activeTab === 'topics' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="text-xs text-slate-500 font-medium">
            Click on any module below to expand subtopics and review importance ratings:
          </div>

          <div className="space-y-3">
            {subject.topics.map((topic, idx) => {
              const isExpanded = expandedTopicId === topic.id || idx === 0;
              return (
                <div
                  key={topic.id}
                  id={`topic-item-${topic.id}`}
                  className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition"
                >
                  <div
                    onClick={() => toggleTopicExpand(topic.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                          <span>{topic.name}</span>
                          {topic.importance === 'High' && (
                            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100">
                              High Yield
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {topic.questionCount} Available Questions
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveTab('practice');
                        }}
                        className="hidden sm:inline-block text-xs font-bold text-indigo-600 hover:underline px-2.5 py-1 bg-indigo-50/70 rounded-md"
                      >
                        Practice Topic
                      </button>
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </div>
                  </div>

                  {/* Expanded Subtopics & Quick Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/50">
                      <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 mt-2">
                        Subtopics & Key Competencies:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {(topic.subtopics || ['Foundational Principles', 'Formula Derivations', 'Previous Year Variations']).map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 flex items-center gap-2 font-medium"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span className="truncate">{sub}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. PRACTICE QUESTIONS */}
      {activeTab === 'practice' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">
              Practice Questions for {subject.name}
            </h3>
            <span className="text-xs text-slate-500">
              Showing {subjectQuestions.length} curated questions
            </span>
          </div>

          <div className="space-y-4">
            {subjectQuestions.map((q, idx) => (
              <QuestionCard key={q.id} question={q} index={idx} />
            ))}
          </div>
        </div>
      )}

      {/* 3. MOCK TESTS */}
      {activeTab === 'mock-tests' && (
        <div className="space-y-6 animate-in fade-in">
          <h3 className="text-base font-bold text-slate-900">
            Available Tests for {subject.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectMockTests.map(test => (
              <MockTestCard
                key={test.id}
                test={test}
                onStart={(testId) => navigateTo('test-take', { testId })}
              />
            ))}
          </div>
        </div>
      )}

      {/* 4. PYQS */}
      {activeTab === 'pyqs' && (
        <div className="space-y-6 animate-in fade-in">
          <h3 className="text-base font-bold text-slate-900">
            Past Exam Papers containing {subject.name}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {subjectPYQs.map(pyq => (
              <div key={pyq.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    Year {pyq.year}
                  </span>
                  <span className="text-slate-400">{pyq.totalQuestions} Questions</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{pyq.title}</h4>
                <p className="text-xs text-slate-500 mb-3">{pyq.subject}</p>
                <button
                  onClick={() => {
                    if (pyq.mockTestId) {
                      navigateTo('test-take', { testId: pyq.mockTestId });
                    } else {
                      navigateTo('test-series');
                    }
                  }}
                  className="w-full py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Start Solving PYQ</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. STUDY NOTES & FORMULAS */}
      {activeTab === 'notes' && (
        <div className="space-y-6 animate-in fade-in">
          <h3 className="text-base font-bold text-slate-900">
            Formula Sheets & Concept Compendiums for {subject.name}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {subjectStudyMaterials.map(sm => (
              <div key={sm.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {sm.category}
                  </span>
                  <span className="text-slate-400">{sm.readTime}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{sm.title}</h4>
                <p className="text-xs text-slate-600">{sm.content}</p>
                {sm.keyPoints && (
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                    {sm.keyPoints.map((pt, i) => (
                      <div key={i} className="text-slate-700 flex items-start gap-1.5">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
