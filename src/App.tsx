import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';

// Views
import { HomeView } from './views/HomeView';
import { ExamsView } from './views/ExamsView';
import { ExamDetailView } from './views/ExamDetailView';
import { SubjectDetailView } from './views/SubjectDetailView';
import { PracticeQuestionsView } from './views/PracticeQuestionsView';
import { TestSeriesView } from './views/TestSeriesView';
import { MockTestInterfaceView } from './views/MockTestInterfaceView';
import { TestResultView } from './views/TestResultView';
import { PreviousPapersView } from './views/PreviousPapersView';
import { StudyMaterialView } from './views/StudyMaterialView';
import { CurrentAffairsView } from './views/CurrentAffairsView';
import { UserDashboardView } from './views/UserDashboardView';
import { AdminView } from './views/AdminView';

const MainLayout: React.FC = () => {
  const { currentView } = useApp();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // If in active CBT mock test take mode, provide distraction-free full-screen test environment
  if (currentView === 'test-take') {
    return (
      <div className="min-h-screen bg-slate-100 text-slate-900 antialiased font-sans">
        <MockTestInterfaceView />
        <GlobalSearchModal />
        <AuthModal />
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'exams':
        return <ExamsView />;
      case 'exam-detail':
        return <ExamDetailView />;
      case 'subject-detail':
        return <SubjectDetailView />;
      case 'practice':
        return <PracticeQuestionsView />;
      case 'test-series':
        return <TestSeriesView />;
      case 'test-result':
        return <TestResultView />;
      case 'previous-papers':
        return <PreviousPapersView />;
      case 'study-material':
        return <StudyMaterialView />;
      case 'current-affairs':
        return <CurrentAffairsView />;
      case 'user-dashboard':
        return <UserDashboardView />;
      case 'admin':
        return <AdminView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased font-sans">
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
          >
            {renderCurrentView()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      
      {/* Global Modals */}
      <GlobalSearchModal />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
