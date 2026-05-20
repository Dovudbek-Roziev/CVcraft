import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { CVProvider } from './context/CVContext.jsx';
import { PremiumProvider } from './context/PremiumContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import AuthModal from './components/AuthModal.jsx';
import PremiumModal from './components/PremiumModal.jsx';
import LandingPage from './pages/LandingPage.jsx';
import CVBuilder from './pages/CVBuilder.jsx';
import TemplatesPage from './pages/TemplatesPage.jsx';
import CustomizePage from './pages/CustomizePage.jsx';
import PreviewPage from './pages/PreviewPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import SupportPage from './pages/SupportPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { trackPageView } from './utils/analytics.js';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageTracker() {
  const { pathname } = useLocation();
  useEffect(() => { trackPageView(pathname); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <PremiumProvider>
        <CVProvider>
          <ScrollToTop />
          <PageTracker />
          <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/builder" element={<CVBuilder />} />
                <Route path="/templates" element={<TemplatesPage />} />
                <Route path="/customize" element={<CustomizePage />} />
                <Route path="/preview" element={<PreviewPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={<LandingPage />} />
              </Routes>
            </main>
            <Footer />
            {/* Global modals */}
            <AuthModal />
            <PremiumModal />
          </div>
        </CVProvider>
      </PremiumProvider>
    </AuthProvider>
  );
}
