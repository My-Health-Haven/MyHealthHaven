import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToHashElement from './components/ScrollToHashElement';
import ScrollToTop from './components/ScrollToTop';
import { LanguageProvider } from './context/LanguageContext';
import { prefetchProceduresData } from './hooks/useProcedures';
import Layout from './layout/Layout';
import About from './pages/About';
import ArticleDetail from './pages/ArticleDetail';
import ComingSoon from './pages/ComingSoon';
import Estimate from './pages/Estimate';
import ForEmployers from './pages/ForEmployers';
import ForProviders from './pages/ForProviders';
import Home from './pages/Home';
import Library from './pages/Library';
import MedicalTravel from './pages/MedicalTravel';
import Navigators from './pages/Navigators';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Procedures from './pages/Procedures';
import Schedule from './pages/Schedule';
import TermsOfUse from './pages/TermsOfUse';

function AppShell() {
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem('userJourney');
  }, []);

  React.useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const warmProceduresPage = () => {
      void prefetchProceduresData().catch(() => {});
    };

    if ('requestIdleCallback' in window) {
      const idleCallbackId = window.requestIdleCallback(warmProceduresPage, { timeout: 2000 });

      return () => {
        window.cancelIdleCallback(idleCallbackId);
      };
    }

    const timeoutId = window.setTimeout(warmProceduresPage, 1200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ScrollToTop />
        <ScrollToHashElement />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="navigators" element={<Navigators />} />
            <Route path="medical-travel" element={<MedicalTravel />} />
            <Route path="procedures" element={<Procedures />} />
            <Route path="procedures/:slug" element={<ComingSoon />} />
            <Route path="library" element={<Library />} />
            <Route path="library/:slug" element={<ArticleDetail />} />
            <Route path="estimate" element={<Estimate />} />
            <Route path="contact" element={<Navigate to="/estimate" replace />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfUse />} />
            <Route path="about" element={<About />} />
            <Route path="employers" element={<ForEmployers />} />
            <Route path="providers" element={<ForProviders />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default AppShell;
