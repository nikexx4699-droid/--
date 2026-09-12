import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PlusCircle, 
  HelpCircle, 
  FileText, 
  BookOpen, 
  Newspaper, 
  Check, 
  Database,
  Layers,
  ArrowRight,
  ListFilter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAMS, SUBJECTS } from '../data/mockData';
import { ExamId, Question, StudyMaterial, CurrentAffairsArticle } from '../types';

export const AdminView: React.FC = () => {
  const { 
    questions, 
    addQuestion, 
    studyMaterials, 
    addStudyMaterial, 
    currentAffairs, 
    addCurrentAffair,
    navigateTo
  } = useApp();

  const [activeTab, setActiveTab] = useState<'questions' | 'study' | 'news' | 'overview'>('overview');
  const [successNotice, setSuccessNotice] = useState<string>('');

  // 1. Question Form State
  const [qExam, setQExam] = useState<ExamId>('nda');
  const [qSubjectId, setQSubjectId] = useState<string>('nda-maths');
  const [qTopic, setQTopic] = useState<string>('Trigonometry');
  const [qDifficulty, setQDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
  const [qText, setQText] = useState<string>('');
  const [qOptA, setQOptA] = useState<string>('');
  const [qOptB, setQOptB] = useState<string>('');
  const [qOptC, setQOptC] = useState<string>('');
  const [qOptD, setQOptD] = useState<string>('');
  const [qCorrectIdx, setQCorrectIdx] = useState<number>(0);
  const [qExplanation, setQExplanation] = useState<string>('');
  const [qPYQYear, setQPYQYear] = useState<string>('2024');

  // 2. Study Material Form State
  const [smExam, setSmExam] = useState<ExamId>('cds');
  const [smTitle, setSmTitle] = useState<string>('');
  const [smCategory, setSmCategory] = useState<'Formulas' | 'Short Tricks' | 'Important Concepts' | 'Revision Summaries'>('Formulas');
  const [smTopic, setSmTopic] = useState<string>('');
  const [smContent, setSmContent] = useState<string>('');
  const [smKeyPoints, setSmKeyPoints] = useState<string>('');
  const [smReadTime, setSmReadTime] = useState<string>('4 mins read');

  // 3. Current Affairs Form State
  const [caTitle, setCaTitle] = useState<string>('');
  const [caCategory, setCaCategory] = useState<'Defence' | 'Science & Technology' | 'National' | 'International' | 'Economy' | 'Sports'>('Defence');
  const [caDesc, setCaDesc] = useState<string>('');
  const [caTakeaways, setCaTakeaways] = useState<string>('');
  const [caExams, setCaExams] = useState<ExamId[]>(['nda', 'cds']);

  const showToast = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(''), 3500);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim() || !qOptA.trim() || !qOptB.trim()) {
      alert('Please enter the question text and at least options A and B.');
      return;
    }

    const newQ: Question = {
      id: `q_admin_${Date.now()}`,
      examId: qExam,
      subjectId: qSubjectId,
      topicName: qTopic,
      difficulty: qDifficulty,
      questionText: qText,
      options: [qOptA, qOptB, qOptC || 'None of the above', qOptD || 'All of the above'],
      correctAnswerIndex: qCorrectIdx,
      explanation: qExplanation || 'Standard mathematical derivation and rule apply.',
      previousYearYear: qPYQYear ? Number(qPYQYear) : undefined
    };

    addQuestion(newQ);
    showToast('Question successfully published to the live Question Bank!');
    setQText('');
    setQOptA('');
    setQOptB('');
    setQOptC('');
    setQOptD('');
    setQExplanation('');
  };

  const handleCreateStudyMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smTitle.trim() || !smContent.trim()) {
      alert('Please provide a title and content.');
      return;
    }

    const points = smKeyPoints.split('\n').filter(p => p.trim().length > 0);

    const newSm: StudyMaterial = {
      id: `sm_admin_${Date.now()}`,
      examId: smExam,
      title: smTitle,
      category: smCategory,
      topic: smTopic || 'General Study',
      content: smContent,
      keyPoints: points.length > 0 ? points : ['Master foundational fundamentals.', 'Review prior question variations.'],
      readTime: smReadTime
    };

    addStudyMaterial(newSm);
    showToast('Study material module successfully added to the vault!');
    setSmTitle('');
    setSmContent('');
    setSmTopic('');
    setSmKeyPoints('');
  };

  const handleCreateCurrentAffair = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caTitle.trim() || !caDesc.trim()) {
      alert('Please fill out the title and description.');
      return;
    }

    const points = caTakeaways.split('\n').filter(p => p.trim().length > 0);

    const newCa: CurrentAffairsArticle = {
      id: `ca_admin_${Date.now()}`,
      title: caTitle,
      category: caCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      shortDescription: caDesc,
      keyTakeaways: points.length > 0 ? points : ['Crucial event for upcoming defence and civil exams.'],
      examRelevance: caExams,
      readTime: '3 min briefing'
    };

    addCurrentAffair(newCa);
    showToast('Current affairs briefing broadcasted to candidate feeds!');
    setCaTitle('');
    setCaDesc('');
    setCaTakeaways('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Faculty & Editorial Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            PrepPilot Content Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Author and publish exam questions, formula notes, mock tests, and daily current affairs instantly to all candidates.
          </p>
        </div>

        <button
          onClick={() => navigateTo('home')}
          className="self-start sm:self-auto px-4 py-2 text-xs font-bold text-slate-700 hover:text-indigo-600 bg-white border border-slate-200 rounded-xl transition"
        >
          View Live Website
        </button>
      </div>

      {/* Success Toast Banner */}
      {successNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 overflow-x-auto pb-1 gap-2">
        {[
          { id: 'overview', label: 'Studio Dashboard & Stats' },
          { id: 'questions', label: 'Add New MCQ Question' },
          { id: 'study', label: 'Publish Study Material' },
          { id: 'news', label: 'Post Current Affairs' }
        ].map(tab => (
          <button
            key={tab.id}
            id={`admin-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: STUDIO OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-400 font-semibold uppercase">Total Questions</div>
              <div className="text-3xl font-black text-slate-900 font-['Outfit'] mt-1">{questions.length}</div>
              <div className="text-xs text-emerald-600 mt-1">Live in practice banks</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-400 font-semibold uppercase">Study Vault Items</div>
              <div className="text-3xl font-black text-slate-900 font-['Outfit'] mt-1">{studyMaterials.length}</div>
              <div className="text-xs text-amber-600 mt-1">Formula sheets & tricks</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-400 font-semibold uppercase">Current Affairs Articles</div>
              <div className="text-3xl font-black text-slate-900 font-['Outfit'] mt-1">{currentAffairs.length}</div>
              <div className="text-xs text-cyan-600 mt-1">Daily updates</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <div className="text-xs text-slate-400 font-semibold uppercase">Active Exams</div>
              <div className="text-3xl font-black text-slate-900 font-['Outfit'] mt-1">5</div>
              <div className="text-xs text-indigo-600 mt-1">CUET, CDS, NDA, AFCAT, GS</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-indigo-950 font-['Outfit']">
                Instant Cloud State Persistence
              </h3>
              <p className="text-xs text-indigo-700 mt-0.5">
                Any question, study material, or current affair created in this panel is immediately available in candidate practice tests and search filters.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('questions')}
              className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
            >
              Add New Question
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: ADD QUESTION */}
      {activeTab === 'questions' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs animate-in fade-in">
          <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-1">
            Author New Multiple Choice Question
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Add questions with 4 distinct options, verified answer keys, and step-by-step reasoning.
          </p>

          <form onSubmit={handleCreateQuestion} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Exam</label>
                <select
                  value={qExam}
                  onChange={e => setQExam(e.target.value as ExamId)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                >
                  {EXAMS.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Chapter</label>
                <input
                  type="text"
                  required
                  value={qTopic}
                  onChange={e => setQTopic(e.target.value)}
                  placeholder="e.g. Trigonometry, Modern History"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Difficulty Level</label>
                <select
                  value={qDifficulty}
                  onChange={e => setQDifficulty(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Question Statement</label>
              <textarea
                required
                rows={3}
                value={qText}
                onChange={e => setQText(e.target.value)}
                placeholder="Type the full exam question statement..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* 4 Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option A</label>
                <input
                  type="text"
                  required
                  value={qOptA}
                  onChange={e => setQOptA(e.target.value)}
                  placeholder="First option"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option B</label>
                <input
                  type="text"
                  required
                  value={qOptB}
                  onChange={e => setQOptB(e.target.value)}
                  placeholder="Second option"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option C</label>
                <input
                  type="text"
                  value={qOptC}
                  onChange={e => setQOptC(e.target.value)}
                  placeholder="Third option"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Option D</label>
                <input
                  type="text"
                  value={qOptD}
                  onChange={e => setQOptD(e.target.value)}
                  placeholder="Fourth option"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Correct Answer Index</label>
                <select
                  value={qCorrectIdx}
                  onChange={e => setQCorrectIdx(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium"
                >
                  <option value={0}>Option A is Correct</option>
                  <option value={1}>Option B is Correct</option>
                  <option value={2}>Option C is Correct</option>
                  <option value={3}>Option D is Correct</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">PYQ Tag Year (Optional)</label>
                <input
                  type="number"
                  value={qPYQYear}
                  onChange={e => setQPYQYear(e.target.value)}
                  placeholder="2024"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Explanation & Steps</label>
              <textarea
                rows={3}
                value={qExplanation}
                onChange={e => setQExplanation(e.target.value)}
                placeholder="Explain the step-by-step logic, formula used, and why other options are incorrect..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              id="btn-admin-submit-question"
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow transition"
            >
              Publish Question to Bank
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: PUBLISH STUDY MATERIAL */}
      {activeTab === 'study' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs animate-in fade-in">
          <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-1">
            Publish Formula Sheet or Study Capsule
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Create high-yield revision notes and formulas for candidate revision.
          </p>

          <form onSubmit={handleCreateStudyMaterial} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Exam</label>
                <select
                  value={smExam}
                  onChange={e => setSmExam(e.target.value as ExamId)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  {EXAMS.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Material Category</label>
                <select
                  value={smCategory}
                  onChange={e => setSmCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Formulas">Formulas</option>
                  <option value="Short Tricks">Short Tricks</option>
                  <option value="Important Concepts">Important Concepts</option>
                  <option value="Revision Summaries">Revision Summaries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Read Time</label>
                <input
                  type="text"
                  value={smReadTime}
                  onChange={e => setSmReadTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Material Title</label>
                <input
                  type="text"
                  required
                  value={smTitle}
                  onChange={e => setSmTitle(e.target.value)}
                  placeholder="e.g. Master Trigonometry Identities for NDA"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Topic / Subject</label>
                <input
                  type="text"
                  value={smTopic}
                  onChange={e => setSmTopic(e.target.value)}
                  placeholder="e.g. Quantitative Aptitude / Mathematics"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Concept Content / Text</label>
              <textarea
                rows={4}
                required
                value={smContent}
                onChange={e => setSmContent(e.target.value)}
                placeholder="Write the full conceptual explanation, shortcut rules, and memory aids..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Key Bullet Points (1 per line)
              </label>
              <textarea
                rows={3}
                value={smKeyPoints}
                onChange={e => setSmKeyPoints(e.target.value)}
                placeholder="Point 1: sin²θ + cos²θ = 1&#10;Point 2: tan(A+B) = (tanA + tanB)/(1 - tanA*tanB)"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>

            <button
              id="btn-admin-submit-study"
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow transition"
            >
              Publish Study Capsule
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: POST CURRENT AFFAIRS */}
      {activeTab === 'news' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs animate-in fade-in">
          <h2 className="text-lg font-bold text-slate-900 font-['Outfit'] mb-1">
            Post Daily Current Affairs Update
          </h2>
          <p className="text-xs text-slate-500 mb-6">
            Broadcast defense, science, and national news to aspirants preparing for competitive examinations.
          </p>

          <form onSubmit={handleCreateCurrentAffair} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">News Headline</label>
                <input
                  type="text"
                  required
                  value={caTitle}
                  onChange={e => setCaTitle(e.target.value)}
                  placeholder="e.g. DRDO successfully tests Hypersonic Missile"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">News Category</label>
                <select
                  value={caCategory}
                  onChange={e => setCaCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="Defence">Defence</option>
                  <option value="Science & Technology">Science & Technology</option>
                  <option value="National">National</option>
                  <option value="International">International</option>
                  <option value="Economy">Economy</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Brief Description</label>
              <textarea
                rows={3}
                required
                value={caDesc}
                onChange={e => setCaDesc(e.target.value)}
                placeholder="2-3 sentences summarizing the event..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Exam Takeaways (1 per line)
              </label>
              <textarea
                rows={3}
                value={caTakeaways}
                onChange={e => setCaTakeaways(e.target.value)}
                placeholder="Takeaway 1: Speed achieved Mach 6+&#10;Takeaway 2: Developed by DRDO & RCI Hyderabad"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
              />
            </div>

            <button
              id="btn-admin-submit-news"
              type="submit"
              className="px-6 py-2.5 text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 rounded-xl shadow transition"
            >
              Broadcast Current Affairs
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
