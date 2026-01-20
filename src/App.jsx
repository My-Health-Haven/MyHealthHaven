import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
const Layout = React.lazy(() => import('./layout/Layout'));
const Home = React.lazy(() => import('./pages/Home'));
const Navigators = React.lazy(() => import('./pages/Navigators'));
const MedicalTravel = React.lazy(() => import('./pages/MedicalTravel'));
const Procedures = React.lazy(() => import('./pages/Procedures'));
const ComingSoon = React.lazy(() => import('./pages/ComingSoon'));
const Library = React.lazy(() => import('./pages/Library'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Estimate = React.lazy(() => import('./pages/Estimate'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Schedule = React.lazy(() => import('./pages/Schedule'));
import { UserJourneyProvider } from './context/UserJourneyContext';
import { LanguageProvider } from './context/LanguageContext';
import LanguageModal from './components/LanguageModal';
import ScrollToHashElement from './components/ScrollToHashElement';

function App() {
  return (
    <LanguageProvider>
      <UserJourneyProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToHashElement />
          <LanguageModal />
          <React.Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="navigators" element={<Navigators />} />
                <Route path="medical-travel" element={<MedicalTravel />} />
                <Route path="procedures" element={<Procedures />} />
                <Route path="procedures/:slug" element={<ComingSoon />} />
                <Route path="library" element={<Library />} />
                <Route path="library/:slug" element={<ComingSoon />} />
                <Route path="estimate" element={<Estimate />} />
                <Route path="estimate" element={<Estimate />} />
                <Route path="contact" element={<Contact />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="privacy" element={<ComingSoon />} />
                <Route path="terms" element={<ComingSoon />} />
                <Route path="about" element={<ComingSoon />} />
                <Route path="employers" element={<ComingSoon />} />
                <Route path="providers" element={<ComingSoon />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </React.Suspense>
        </Router>
      </UserJourneyProvider>
    </LanguageProvider>
  );
}

export default App;
