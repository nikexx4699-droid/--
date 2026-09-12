import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Compass, Mail, Lock, User, Phone, Check, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExamId } from '../types';
import { EXAMS } from '../data/mockData';

export const AuthModal: React.FC = () => {
  const { authModalOpen, authModalTab, closeAuth, login, register } = useApp();
  
  const [tab, setTab] = useState<'login' | 'register'>(authModalTab);
  
  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('arjun.verma@preppilot.edu');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regExam, setRegExam] = useState<ExamId>('nda');

  // Error/success state
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setErrorMsg('Please provide a valid email or phone number.');
      return;
    }
    setErrorMsg('');
    login(loginIdentifier, loginPassword, rememberMe);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      setErrorMsg('Please enter your name and email address.');
      return;
    }
    setErrorMsg('');
    register(regName, regEmail, regPhone, regExam);
  };

  const fillDemoAccount = (examId: ExamId, name: string, email: string) => {
    setLoginIdentifier(email);
    setLoginPassword('prep@pilot2025');
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          key="auth-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={closeAuth}
        >
          <motion.div 
            key="auth-modal-panel"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-base font-bold text-slate-900 font-['Outfit']">
                    Prep<span className="text-indigo-600">Pilot</span> Account
                  </span>
                </div>
              </div>
              <button 
                onClick={closeAuth}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab switcher */}
            <div className="flex border-b border-slate-200 bg-slate-50/70 p-1">
              <button
                id="tab-btn-login"
                onClick={() => { setTab('login'); setErrorMsg(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  tab === 'login' 
                    ? 'bg-white text-indigo-700 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Student Log In
              </button>
              <button
                id="tab-btn-register"
                onClick={() => { setTab('register'); setErrorMsg(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                  tab === 'register' 
                    ? 'bg-white text-indigo-700 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Create Free Account
              </button>
            </div>

            {/* Form Container */}
            <div className="p-6">
              {errorMsg && (
                <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
                  {errorMsg}
                </div>
              )}

              <AnimatePresence mode="wait">
                {tab === 'login' ? (
                  <motion.form
                    key="login-form"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.18 }}
                    onSubmit={handleLoginSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email or Mobile Number
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="login-email-input"
                          type="text"
                          required
                          value={loginIdentifier}
                          onChange={e => setLoginIdentifier(e.target.value)}
                          placeholder="name@example.com or 9876543210"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">Password</label>
                        <button
                          type="button"
                          onClick={() => alert('Password reset link sent to your registered email.')}
                          className="text-[11px] font-semibold text-indigo-600 hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          id="login-password-input"
                          type="password"
                          required
                          value={loginPassword}
                          onChange={e => setLoginPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={e => setRememberMe(e.target.checked)}
                          className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                        />
                        <span>Remember me on this device</span>
                      </label>
                    </div>

                    <button
                      id="btn-login-submit"
                      type="submit"
                      className="w-full py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition"
                    >
                      Log In to Dashboard
                    </button>

                    {/* Demo quick fillers */}
                    <div className="pt-3 border-t border-slate-100">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Quick Demo Sign-In
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <button
                          type="button"
                          onClick={() => fillDemoAccount('nda', 'Arjun Verma', 'arjun.nda@preppilot.edu')}
                          className="p-2 text-left rounded bg-slate-50 hover:bg-indigo-50 border border-slate-200 transition"
                        >
                          <span className="font-bold block text-slate-900">NDA Cadet</span>
                          <span className="text-slate-500 truncate block">arjun.nda@preppilot.edu</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => fillDemoAccount('cds', 'Pooja Nair', 'pooja.cds@preppilot.edu')}
                          className="p-2 text-left rounded bg-slate-50 hover:bg-indigo-50 border border-slate-200 transition"
                        >
                          <span className="font-bold block text-slate-900">CDS Officer</span>
                          <span className="text-slate-500 truncate block">pooja.cds@preppilot.edu</span>
                        </button>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  <motion.form
                    key="register-form"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.18 }}
                    onSubmit={handleRegisterSubmit}
                    className="space-y-3.5"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          id="register-name-input"
                          type="text"
                          required
                          value={regName}
                          onChange={e => setRegName(e.target.value)}
                          placeholder="Candidate full name"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          id="register-email-input"
                          type="email"
                          required
                          value={regEmail}
                          onChange={e => setRegEmail(e.target.value)}
                          placeholder="student@example.com"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            id="register-phone-input"
                            type="tel"
                            value={regPhone}
                            onChange={e => setRegPhone(e.target.value)}
                            placeholder="9876543210"
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Target Exam</label>
                        <select
                          value={regExam}
                          onChange={e => setRegExam(e.target.value as ExamId)}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white font-medium outline-none transition"
                        >
                          {EXAMS.map(exam => (
                            <option key={exam.id} value={exam.id}>{exam.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Create Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          id="register-password-input"
                          type="password"
                          required
                          value={regPassword}
                          onChange={e => setRegPassword(e.target.value)}
                          placeholder="Minimum 8 characters"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        id="btn-register-submit"
                        type="submit"
                        className="w-full py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm hover:shadow transition"
                      >
                        Create Student Account
                      </button>
                    </div>

                    <p className="text-[11px] text-center text-slate-500">
                      By registering, you agree to the PrepPilot Academic Code of Conduct and Terms.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
