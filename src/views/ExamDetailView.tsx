import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Award, 
  Clock, 
  Bell, 
  Layers, 
  History, 
  TrendingUp, 
  Newspaper, 
  PlayCircle, 
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAMS, SUBJECTS, MOCK_TESTS, PREVIOUS_YEAR_PAPERS, STUDY_MATERIALS, CURRENT_AFFAIRS } from '../data/mockData';
import { SubjectCard } from '../components/SubjectCard';
import { MockTestCard } from '../components/MockTestCard';
import { QuestionCard } from '../components/QuestionCard';

export const ExamDetailView: React.FC = () => {
  const { selectedExamId, navigateTo, questions, attempts } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'mock-tests' | 'pyqs' | 'practice' | 'study' | 'current-affairs' | 'progress'>('overview');

  const exam = EXAMS.find(e => e.id === selectedExamId) || EXAMS[0];
  const examSubjects = SUBJECTS.filter(s => s.examId === exam.id);
  const examMockTests = MOCK_TESTS.filter(m => m.examId === exam.id);
  const examPYQs = PREVIOUS_YEAR_PAPERS.filter(p => p.examId === exam.id);
  const examQuestions = questions.filter(q => q.examId === exam.id);
  const examStudyMaterials = STUDY_MATERIALS.filter(sm => sm.examId === exam.id);
  const relevantCurrentAffairs = CURRENT_AFFAIRS.filter(ca => ca.examRelevance.includes(exam.id));

  // Exam-specific stats
  const examAttempts = attempts.filter(a => a.examId === exam.id);
  const totalAttempted = examAttempts.length;
  const avgScore = totalAttempted > 0 
    ? Math.round(examAttempts.reduce((acc, cur) => acc + (cur.totalMarksScored / cur.maxMarks) * 100, 0) / totalAttempted)
    : 0;

  const handleSubjectClick = (subjectId: string) => {
    navigateTo('subject-detail', { examId: exam.id, subjectId });
  };

  const handleStartMockTest = (testId: string) => {
    navigateTo('test-take', { testId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb & Navigation Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('exams')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Examinations</span>
        </button>
        <span className="text-xs text-slate-400">
          Path: /exams/{exam.id}
        </span>
      </div>

      {/* Exam Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              {exam.badge}
            </span>
            <span className="text-xs text-slate-300">
              Frequency: {exam.examFrequency}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-['Outfit']">
            {exam.name} Exam Preparation Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {exam.fullName} — {exam.description}
          </p>

          {/* Quick Metrics */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-indigo-200">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span><strong>{examSubjects.length}</strong> Subjects</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5 text-indigo-200">
              <Award className="w-4 h-4 text-amber-400" />
              <span><strong>{examMockTests.length}</strong> Mock Tests</span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1.5 text-indigo-200">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span><strong>{examQuestions.length}+</strong> Solved Questions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notifications Ticker for this Exam */}
      {exam.notifications.length > 0 && (
        <div className="bg-amber-50 border border-amber-200/90 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Important {exam.name} Announcements & Alerts
            </span>
          </div>
          <div className="space-y-1.5">
            {exam.notifications.map(n => (
              <div key={n.id} className="text-xs text-slate-800 flex items-start sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {n.isNew && (
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-rose-500 text-white shrink-0">
                      NEW
                    </span>
                  )}
                  <span>{n.title}</span>
                </div>
                <span className="text-[11px] text-slate-500 whitespace-nowrap">{n.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 min-w-max pb-1">
          {[
            { id: 'overview', label: 'Exam Overview' },
            { id: 'subjects', label: `Subjects (${examSubjects.length})` },
            { id: 'mock-tests', label: `Mock Tests (${examMockTests.length})` },
            { id: 'pyqs', label: `Previous Year Papers (${examPYQs.length})` },
            { id: 'practice', label: 'Practice Questions' },
            { id: 'study', label: 'Study Material' },
            { id: 'current-affairs', label: 'Current Affairs' },
            { id: 'progress', label: 'My Progress' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`exam-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}

      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Key Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Marking Scheme</div>
              <div className="text-sm font-bold text-slate-900">{exam.negativeMarking}</div>
              <p className="text-xs text-slate-500 mt-1">Authentic deduction applied in all mock tests</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Eligibility Criteria</div>
              <div className="text-sm font-bold text-slate-900">{exam.eligibility}</div>
              <p className="text-xs text-slate-500 mt-1">Verified official notification norms</p>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Exam Cycle</div>
              <div className="text-sm font-bold text-slate-900">{exam.examFrequency}</div>
              <p className="text-xs text-slate-500 mt-1">Admit cards and dates tracked live</p>
            </div>
          </div>

          {/* Subjects Preview section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                Subjects & Topic Breakdown
              </h3>
              <button 
                onClick={() => setActiveTab('subjects')}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <span>View Full Syllabus</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {examSubjects.map(subject => (
                <SubjectCard
                  key={subject.id}
                  subject={subject}
                  onClick={() => handleSubjectClick(subject.id)}
                />
              ))}
            </div>
          </div>

          {/* Mock tests teaser */}
          {examMockTests.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  Featured Mock Tests for {exam.name}
                </h3>
                <button 
                  onClick={() => setActiveTab('mock-tests')}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  <span>See All Tests</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {examMockTests.map(test => (
                  <MockTestCard
                    key={test.id}
                    test={test}
                    onStart={handleStartMockTest}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. SUBJECTS */}
      {activeTab === 'subjects' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                {exam.name} Subject Categorization
              </h3>
              <p className="text-xs text-slate-500">
                Click any subject below to inspect its topic list, practice questions, and study notes.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {examSubjects.map(subject => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                onClick={() => handleSubjectClick(subject.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. MOCK TESTS */}
      {activeTab === 'mock-tests' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              {exam.name} Mock Test Series
            </h3>
            <p className="text-xs text-slate-500">
              Full-length and sectional computer-based tests with exact timer and negative marking.
            </p>
          </div>

          {examMockTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examMockTests.map(test => (
                <MockTestCard
                  key={test.id}
                  test={test}
                  onStart={handleStartMockTest}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">Mock tests for {exam.name} are being calibrated.</p>
              <button onClick={() => navigateTo('test-series')} className="mt-3 text-xs font-bold text-indigo-600">
                Browse All Mock Series
              </button>
            </div>
          )}
        </div>
      )}

      {/* 4. PREVIOUS YEAR PAPERS */}
      {activeTab === 'pyqs' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              {exam.name} Previous Year Papers (PYQs)
            </h3>
            <p className="text-xs text-slate-500">
              Solve official past papers in the real CBT interface with instant answer keys.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {examPYQs.map(pyq => (
              <div
                key={pyq.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      Year {pyq.year}
                    </span>
                    <span className="text-slate-400 font-medium">{pyq.fileSize}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2">
                    {pyq.title}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Subject: {pyq.subject}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                    <span>{pyq.totalQuestions} Questions</span>
                    <span>•</span>
                    <span>{pyq.durationMinutes} mins</span>
                    <span>•</span>
                    <span>{pyq.marks} Marks</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => {
                      if (pyq.mockTestId) {
                        navigateTo('test-take', { testId: pyq.mockTestId });
                      } else {
                        navigateTo('test-series');
                      }
                    }}
                    className="w-full py-2 text-center text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition flex items-center justify-center gap-1.5"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Start Test CBT</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. PRACTICE QUESTIONS */}
      {activeTab === 'practice' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
                {exam.name} Practice Question Bank
              </h3>
              <p className="text-xs text-slate-500">
                Solve questions with instant feedback, option review, and solutions.
              </p>
            </div>
            <button
              onClick={() => navigateTo('practice')}
              className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition"
            >
              Open Full Practice Filter View
            </button>
          </div>

          <div className="space-y-4">
            {examQuestions.slice(0, 5).map((q, idx) => (
              <QuestionCard key={q.id} question={q} index={idx} />
            ))}
          </div>
        </div>
      )}

      {/* 6. STUDY MATERIAL */}
      {activeTab === 'study' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              {exam.name} Study Material & Formulas
            </h3>
            <p className="text-xs text-slate-500">
              High-yield notes, formula compilations, and memory revision guides.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {examStudyMaterials.map(sm => (
              <div
                key={sm.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {sm.category}
                  </span>
                  <span className="text-slate-400">{sm.readTime}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{sm.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{sm.content}</p>

                {sm.keyPoints && sm.keyPoints.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                    <div className="font-bold text-slate-700 text-[11px] uppercase">Key Formula Points:</div>
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

      {/* 7. CURRENT AFFAIRS */}
      {activeTab === 'current-affairs' && (
        <div className="space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-['Outfit']">
              Current Affairs Relevant to {exam.name}
            </h3>
            <p className="text-xs text-slate-500">
              Handpicked defence, international, scientific, and sports briefings tested in {exam.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {relevantCurrentAffairs.map(ca => (
              <div
                key={ca.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">
                    {ca.category}
                  </span>
                  <span className="text-slate-400">{ca.date}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{ca.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{ca.shortDescription}</p>

                <div className="p-3 bg-slate-50 rounded-xl space-y-1 text-xs">
                  <div className="font-bold text-slate-700 text-[11px] uppercase">Exam Takeaways:</div>
                  {ca.keyTakeaways.map((takeaway, i) => (
                    <div key={i} className="text-slate-700 flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. PROGRESS */}
      {activeTab === 'progress' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
              Your {exam.name} Performance Diagnostics
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Tests Attempted</div>
                <div className="text-xl font-bold text-slate-900 mt-1">{totalAttempted}</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Average Score</div>
                <div className="text-xl font-bold text-indigo-600 mt-1">{avgScore}%</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Syllabus Covered</div>
                <div className="text-xl font-bold text-emerald-600 mt-1">42%</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs text-slate-500 font-medium">Status</div>
                <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded inline-block mt-1">
                  On Track
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('user-dashboard')}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <span>Open Full Student Analytics Dashboard</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
