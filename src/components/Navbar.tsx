import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  Compass, 
  Search, 
  ChevronDown, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ShieldAlert, 
  Bookmark, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAMS } from '../data/mockData';
import { ExamId, ActiveView } from '../types';

export const Navbar: React.FC = () => {
  const { 
    user, 
    currentView, 
    selectedExamId, 
    navigateTo, 
    openSearch, 
    openAuth, 
    logout 
  } = useApp();

  const [examsDropdownOpen, setExamsDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExamsDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { label: string; view: ActiveView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'Test Series', view: 'test-series' },
    { label: 'Practice', view: 'practice' },
    { label: 'Study Material', view: 'study-material' },
    { label: 'Current Affairs', view: 'current-affairs' },
    { label: 'Previous Papers', view: 'previous-papers' }
  ];

  const handleExamSelect = (examId: ExamId) => {
    setExamsDropdownOpen(false);
    setMobileMenuOpen(false);
    navigateTo('exam-detail', { examId });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200/80 shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300">
              LIVE
            </span>
            <span className="hidden sm:inline">NDA & CDS 2025 All-India Grand Mock Test Series is now live.</span>
            <span className="sm:hidden">2025 Grand Mock Tests live!</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo('admin')}
              className="text-slate-400 hover:text-white transition flex items-center gap-1 text-[11px]"
            >
              <ShieldAlert className="w-3 h-3" />
              <span>Admin Console</span>
            </button>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">Target: <strong>{EXAMS.find(e => e.id === selectedExamId)?.name}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button 
              id="navbar-brand-logo"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition duration-200">
                <Compass className="w-5 h-5 text-white stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-slate-900 font-['Outfit']">
                    Prep<span className="text-indigo-600">Pilot</span>
                  </span>
                  <span className="bg-indigo-50 text-indigo-700 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-indigo-100">
                    PRO
                  </span>
                </div>
                <p className="text-[10.5px] font-medium text-slate-500 tracking-wide -mt-0.5">
                  Prepare Smart. Perform Better.
                </p>
              </div>
            </button>

            {/* Exams Dropdown (Desktop) */}
            <div className="relative hidden md:block" ref={dropdownRef}>
              <button 
                id="navbar-exams-dropdown-btn"
                onClick={() => setExamsDropdownOpen(!examsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                  examsDropdownOpen || currentView === 'exams' || currentView === 'exam-detail'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-indigo-600" />
                <span>Exams</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${examsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {examsDropdownOpen && (
                  <motion.div 
                    key="exams-dropdown"
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200/90 py-2 z-50 origin-top-left"
                  >
                    <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <span>Select Target Exam</span>
                      <button 
                        onClick={() => { setExamsDropdownOpen(false); navigateTo('exams'); }}
                        className="text-indigo-600 hover:underline text-[11px]"
                      >
                        View All
                      </button>
                    </div>
                    <div className="py-1">
                      {EXAMS.map((exam) => (
                        <button
                          key={exam.id}
                          id={`nav-exam-item-${exam.id}`}
                          onClick={() => handleExamSelect(exam.id)}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-start gap-3 transition group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition">
                            {exam.name.slice(0, 3)}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition flex items-center gap-1.5">
                              {exam.name}
                              <span className="text-[10px] text-slate-400 font-normal">({exam.mockTestsCount} Tests)</span>
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">{exam.fullName}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  id={`nav-link-${link.view}`}
                  onClick={() => navigateTo(link.view)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    isActive 
                      ? 'text-indigo-600 bg-indigo-50/80 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Section: Search & Auth */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Trigger */}
            <button
              id="navbar-search-btn"
              onClick={openSearch}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200/60 transition w-36 sm:w-52"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">Search exams, topics...</span>
              <kbd className="hidden sm:inline-block ml-auto px-1.5 py-0.5 text-[10px] bg-white border border-slate-300 rounded text-slate-500 font-mono shadow-2xs">
                /
              </kbd>
            </button>

            {/* Auth status */}
            {user ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  id="navbar-user-avatar-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2.5 rounded-lg hover:bg-slate-100 border border-transparent hover:border-slate-200 transition text-left"
                >
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-slate-900 leading-tight">{user.name}</div>
                    <div className="text-[10px] text-slate-500 capitalize">{user.targetExam || 'Aspirant'}</div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    {user.name.charAt(0)}
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div 
                      key="user-dropdown"
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 origin-top-right"
                    >
                      <div className="px-3.5 py-2 border-b border-slate-100">
                        <div className="text-xs font-semibold text-slate-900">{user.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                      </div>
                      <button
                        onClick={() => { setUserDropdownOpen(false); navigateTo('user-dashboard'); }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                        <span>My Learning Dashboard</span>
                      </button>
                      <button
                        onClick={() => { setUserDropdownOpen(false); navigateTo('practice'); }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <Bookmark className="w-4 h-4 text-amber-500" />
                        <span>Saved Practice Questions</span>
                      </button>
                      <button
                        onClick={() => { setUserDropdownOpen(false); navigateTo('admin'); }}
                        className="w-full text-left px-3.5 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <ShieldAlert className="w-4 h-4 text-slate-500" />
                        <span>Admin Management</span>
                      </button>
                      <div className="border-t border-slate-100 my-1"></div>
                      <button
                        onClick={() => { setUserDropdownOpen(false); logout(); }}
                        className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="navbar-login-btn"
                  onClick={() => openAuth('login')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
                >
                  Log In
                </button>
                <button
                  id="navbar-register-btn"
                  onClick={() => openAuth('register')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition"
                >
                  Register
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              id="navbar-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            key="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 overflow-hidden"
          >
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
              Target Exams
            </div>
            <div className="grid grid-cols-2 gap-2">
              {EXAMS.map(exam => (
                <button
                  key={exam.id}
                  onClick={() => handleExamSelect(exam.id)}
                  className="p-2 text-left rounded-lg bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 transition"
                >
                  <div className="text-xs font-bold text-slate-900">{exam.name}</div>
                  <div className="text-[10px] text-slate-500 truncate">{exam.fullName}</div>
                </button>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-2 space-y-1">
              {navLinks.map(link => (
                <button
                  key={link.view}
                  onClick={() => { setMobileMenuOpen(false); navigateTo(link.view); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    currentView === link.view 
                      ? 'text-indigo-600 bg-indigo-50 font-semibold' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-3">
              {user ? (
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{user.name}</div>
                      <div className="text-[10px] text-slate-500">{user.email}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setMobileMenuOpen(false); navigateTo('user-dashboard'); }}
                    className="text-xs font-semibold text-indigo-600 px-2.5 py-1 bg-white rounded border border-indigo-100"
                  >
                    Dashboard
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => { setMobileMenuOpen(false); openAuth('login'); }}
                    className="w-full py-2 text-center text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => { setMobileMenuOpen(false); openAuth('register'); }}
                    className="w-full py-2 text-center text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    Register Free
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
