import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  HelpCircle, 
  Award, 
  Clock, 
  ChevronRight, 
  Bell, 
  TrendingUp, 
  Shield, 
  BookOpen,
  Zap,
  Target
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAMS, MOCK_TESTS, STUDY_MATERIALS, CURRENT_AFFAIRS } from '../data/mockData';
import { ExamCard } from '../components/ExamCard';
import { MockTestCard } from '../components/MockTestCard';

export const HomeView: React.FC = () => {
  const { navigateTo, openAuth, user } = useApp();

  const handleExploreExam = (examId: any) => {
    navigateTo('exam-detail', { examId });
  };

  const handleStartTest = (testId: string) => {
    navigateTo('test-take', { testId });
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 border-b border-slate-200/80 pt-12 pb-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Tag / Micro-Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100/70 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Next-Gen CBT Exam Simulator for 2025-2026 Aspirants</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-['Outfit'] leading-tight sm:leading-none">
              Prepare for Your Dream Exam with <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">PrepPilot</span>
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
              Practice smarter with mock tests, previous year questions, study material and performance analysis.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                id="hero-start-practicing-btn"
                onClick={() => navigateTo('practice')}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-lg transition duration-150 flex items-center justify-center gap-2"
              >
                <span>Start Practicing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-explore-exams-btn"
                onClick={() => navigateTo('exams')}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-bold text-slate-700 hover:text-indigo-600 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-2xs hover:border-indigo-300 transition duration-150 flex items-center justify-center gap-2"
              >
                <span>Explore Exams</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <div className="text-xl sm:text-2xl font-black text-indigo-700 font-['Outfit']">5+</div>
                <div className="text-xs text-slate-500 font-medium">Target Exam Portals</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <div className="text-xl sm:text-2xl font-black text-indigo-700 font-['Outfit']">180+</div>
                <div className="text-xs text-slate-500 font-medium">CBT Mock Test Papers</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <div className="text-xl sm:text-2xl font-black text-indigo-700 font-['Outfit']">25,000+</div>
                <div className="text-xs text-slate-500 font-medium">Question Practice Bank</div>
              </div>
              <div className="p-3 bg-white/70 rounded-xl border border-slate-200/60">
                <div className="text-xl sm:text-2xl font-black text-indigo-700 font-['Outfit']">100% Free</div>
                <div className="text-xs text-slate-500 font-medium">Open Student Access</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Live Exam Notifications Ticker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl border border-amber-200/80 shadow-xs p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-700 shrink-0">
              <Bell className="w-4 h-4 animate-bounce" />
            </span>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">Exam Alerts:</span>
            <span className="text-xs text-slate-700 line-clamp-1">
              CUET UG 2025 Exam City Slips Released • NDA & NA (I) Cutoff marks published by UPSC.
            </span>
          </div>
          <button
            onClick={() => navigateTo('exams')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 whitespace-nowrap flex items-center gap-1"
          >
            <span>View All Notifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Popular Exams Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              Comprehensive Preparation Portals
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
              Popular Exams
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select your goal to access curated subjects, live mock tests, previous year papers, and syllabus notes.
            </p>
          </div>
          <button
            onClick={() => navigateTo('exams')}
            className="mt-4 md:mt-0 text-xs font-bold text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1.5"
          >
            <span>Browse All 5 Exam Hubs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 5 Exam Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXAMS.map(exam => (
            <ExamCard
              key={exam.id}
              exam={exam}
              onExplore={handleExploreExam}
            />
          ))}
        </div>
      </section>

      {/* Featured Mock Test Series Spotlight */}
      <section className="bg-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Simulate The Real Examination
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] mt-1">
                Featured Live Mock Tests
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Timed tests with real CBT navigation, question palette, negative marking, and instant result analytics.
              </p>
            </div>
            <button
              onClick={() => navigateTo('test-series')}
              className="mt-4 md:mt-0 text-xs font-bold text-indigo-300 hover:text-white inline-flex items-center gap-1.5"
            >
              <span>Explore All Test Series</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_TESTS.slice(0, 3).map(test => (
              <MockTestCard
                key={test.id}
                test={test}
                onStart={handleStartTest}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Study Material & Current Affairs Quick Teasers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Quick Study Material */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-100">
                  Formulas & Short Tricks
                </span>
                <button 
                  onClick={() => navigateTo('study-material')}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  View All Notes
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">
                High-Yield Revision & Formula Notes
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Condense hours of textbook reading into high-impact memory formulas, shortcuts, and key points.
              </p>

              <div className="space-y-3">
                {STUDY_MATERIALS.slice(0, 3).map(sm => (
                  <div
                    key={sm.id}
                    onClick={() => navigateTo('study-material')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-200/70 hover:border-amber-200 cursor-pointer transition flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">{sm.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{sm.topic} • {sm.category}</div>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded shrink-0">
                      {sm.readTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigateTo('study-material')}
              className="mt-5 w-full py-2 text-center text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition"
            >
              Browse Full Study Repository
            </button>
          </div>

          {/* Today's Current Affairs */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 bg-cyan-50 px-2.5 py-0.5 rounded border border-cyan-100">
                  Daily Briefing
                </span>
                <button 
                  onClick={() => navigateTo('current-affairs')}
                  className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                >
                  View All News
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-2">
                Exam-Targeted Current Affairs
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                National, Defence, Science & Tech developments curated specifically for competitive syllabus needs.
              </p>

              <div className="space-y-3">
                {CURRENT_AFFAIRS.slice(0, 3).map(ca => (
                  <div
                    key={ca.id}
                    onClick={() => navigateTo('current-affairs')}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-cyan-50/50 border border-slate-200/70 hover:border-cyan-200 cursor-pointer transition flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">{ca.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{ca.category} • {ca.date}</div>
                    </div>
                    <span className="text-[10px] font-semibold text-cyan-700 bg-cyan-100/70 px-2 py-0.5 rounded shrink-0">
                      {ca.readTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigateTo('current-affairs')}
              className="mt-5 w-full py-2 text-center text-xs font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition"
            >
              Read Daily & Monthly Compendiums
            </button>
          </div>

        </div>
      </section>

      {/* Why PrepPilot Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">The PrepPilot Advantage</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mt-1">
            Engineered for Maximum Score Boost
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Combining authentic exam patterns with data-driven practice diagnostics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Authentic CBT Timer & Palette</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Experience the exact test environment: answered, unanswered, and review flags with exact negative markings.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Granular Weakness Diagnosis</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Identify low-accuracy subjects and high-time-spent questions to target your revision hours productively.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Topic-Level Granularity</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every subject is divided into structured modules and subtopics so you can drill down exactly where you need.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-blue-900 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl sm:text-4xl font-extrabold font-['Outfit'] tracking-tight">
              Ready to Accelerate Your Prep?
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 max-w-lg mx-auto leading-relaxed">
              Join thousands of aspirants preparing for CUET, CDS, NDA, AFCAT and General Studies. Free practice tests and instant score evaluation.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => navigateTo('test-series')}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-indigo-900 bg-white hover:bg-indigo-50 rounded-xl shadow transition"
              >
                Take a Free Mock Test
              </button>
              <button
                onClick={() => navigateTo('practice')}
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-indigo-600/60 hover:bg-indigo-600 border border-indigo-400/50 rounded-xl transition"
              >
                Solve Practice Questions
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
