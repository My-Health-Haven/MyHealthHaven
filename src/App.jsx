import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
const Layout = React.lazy(() => import('./layout/Layout'));
const Home = React.lazy(() => import('./pages/Home'));
const Navigators = React.lazy(() => import('./pages/Navigators'));
const MedicalTravel = React.lazy(() => import('./pages/MedicalTravel'));
const Procedures = React.lazy(() => import('./pages/Procedures'));
const ProcedureDetailStub = React.lazy(() => import('./pages/ProcedureDetailStub'));
const Library = React.lazy(() => import('./pages/Library'));
const LibraryDetailStub = React.lazy(() => import('./pages/LibraryDetailStub'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const Estimate = React.lazy(() => import('./pages/Estimate'));
const Contact = React.lazy(() => import('./pages/Contact'));
import { UserJourneyProvider } from './context/UserJourneyContext';

function App() {
  return (
    <UserJourneyProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <React.Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="navigators" element={<Navigators />} />
              <Route path="medical-travel" element={<MedicalTravel />} />
              <Route path="procedures" element={<Procedures />} />
              <Route path="procedures/:slug" element={<ProcedureDetailStub />} />
              <Route path="library" element={<Library />} />
              <Route path="library/:slug" element={<LibraryDetailStub />} />
              <Route path="estimate" element={<Estimate />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </React.Suspense>
      </Router>
    </UserJourneyProvider>
  );
}

export default App;
