import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './layout/Layout';
import Home from './pages/Home';
const Navigators = React.lazy(() => import('./pages/Navigators'));
const MedicalTravel = React.lazy(() => import('./pages/MedicalTravel'));
const Procedures = React.lazy(() => import('./pages/Procedures'));
const ComingSoon = React.lazy(() => import('./pages/ComingSoon'));
const About = React.lazy(() => import('./pages/About'));
const Library = React.lazy(() => import('./pages/Library'));
const ArticleDetail = React.lazy(() => import('./pages/ArticleDetail'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Estimate = React.lazy(() => import('./pages/Estimate'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Schedule = React.lazy(() => import('./pages/Schedule'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfUse = React.lazy(() => import('./pages/TermsOfUse'));
import { LanguageProvider } from './context/LanguageContext';
import ScrollToHashElement from './components/ScrollToHashElement';
import AppLoadingScreen from './components/AppLoadingScreen';

const isCrawlerUserAgent = () => {
  if (typeof navigator === 'undefined') return false;
  return /(bot|crawler|spider|slurp|bingpreview|facebookexternalhit|linkedinbot|twitterbot|whatsapp|telegrambot|discordbot|slackbot)/i.test(
    navigator.userAgent
  );
};

function App() {
  const showLoader = React.useMemo(() => !isCrawlerUserAgent(), []);

  React.useEffect(() => {
    localStorage.removeItem('userJourney');
  }, []);

  return (
    <ErrorBoundary>
      <LanguageProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToHashElement />
          <React.Suspense fallback={showLoader ? <AppLoadingScreen /> : null}>
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
                <Route path="contact" element={<Contact />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="privacy" element={<PrivacyPolicy />} />
                <Route path="terms" element={<TermsOfUse />} />
                <Route path="about" element={<About />} />
                <Route path="employers" element={<ComingSoon />} />
                <Route path="providers" element={<ComingSoon />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </React.Suspense>
        </Router>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
