import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { usePremium } from '../context/PremiumContext.jsx';
import { useCV } from '../hooks/useCV.js';
import { TEMPLATES } from '../templates/index.js';
import { trackPDFDownload } from '../utils/analytics.js';
import { generatePDF } from '../utils/pdfGenerator.js';
import AdBanner from '../components/AdBanner.jsx';

export default function PreviewPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cvData } = useCV();
  const { isPremium, openPremiumModal } = usePremium();
  const [viewMode, setViewMode] = useState('desktop');
  const [downloading, setDownloading] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const cvRef = useRef(null);

  const templateId = cvData.customization.template || 'classic';
  const TemplateComponent = TEMPLATES[templateId] || TEMPLATES.classic;

  const handleDownload = async () => {
    setDownloading(true);
    trackPDFDownload(templateId);
    try {
      await generatePDF('cv-preview-content', `CV_${cvData.personal.firstName || 'CV'}.pdf`, templateId);
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: t('preview.share_title'), text: t('preview.share_text'), url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  return (
    <div
      className="min-h-screen no-print-bg"
      style={{
        background: 'linear-gradient(135deg, #dde8ff 0%, #eef2ff 35%, #f0ebff 70%, #e8f5fe 100%)',
        backgroundImage: `
          linear-gradient(135deg, #dde8ff 0%, #eef2ff 35%, #f0ebff 70%, #e8f5fe 100%),
          radial-gradient(circle at 20% 20%, rgba(99,102,241,0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 50%)
        `,
      }}
    >
      {/* ── Toolbar ── */}
      <div
        className="sticky top-16 z-30 no-print"
        style={{
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(99,102,241,0.12)',
          boxShadow: '0 2px 24px rgba(99,102,241,0.07)',
        }}
      >
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3">

          {/* Back */}
          <button
            onClick={() => navigate('/customize')}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-indigo-50 hover:text-indigo-600"
            type="button"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('preview.back_edit')}
          </button>

          {/* Template pill */}
          <div className="hidden items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 sm:flex">
            <div className="h-2 w-2 rounded-full bg-indigo-400" />
            <span className="text-xs font-semibold capitalize text-indigo-500">{templateId}</span>
          </div>

          {/* View toggle */}
          <div className="mx-auto flex rounded-xl bg-gray-100 p-1">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${viewMode === 'desktop' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
              type="button"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {t('preview.desktop_btn')}
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${viewMode === 'mobile' ? 'bg-white text-gray-900 shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
              type="button"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              {t('preview.mobile_btn')}
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
              type="button"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              {t('preview.share_btn')}
            </button>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 4px 20px rgba(99,102,241,0.35)' }}
              type="button"
            >
              {downloading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {t('preview.downloading')}
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {t('preview.download_btn')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mx-auto max-w-6xl px-4 py-10 no-print">

        {/* Premium banner */}
        {!isPremium && (
          <div
            className="mb-8 flex items-center justify-between rounded-2xl px-5 py-3.5"
            style={{
              background: 'linear-gradient(135deg, rgba(251,191,36,0.1), rgba(249,115,22,0.1))',
              border: '1px solid rgba(251,191,36,0.3)',
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">⭐</span>
              <span className="text-sm font-medium text-amber-700">{t('preview.watermark_note')}</span>
            </div>
            <button
              onClick={openPremiumModal}
              className="rounded-xl px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}
              type="button"
            >
              {t('preview.premium_cta')}
            </button>
          </div>
        )}

        {/* Browser-frame dots */}
        <div className="mb-3 flex items-center gap-2 px-2">
          <div className="h-3 w-3 rounded-full bg-red-300" />
          <div className="h-3 w-3 rounded-full bg-yellow-300" />
          <div className="h-3 w-3 rounded-full bg-green-300" />
          <div className="mx-3 h-6 flex-1 rounded-full border border-gray-200 bg-white/70 text-center text-xs leading-6 text-gray-400 shadow-sm">
            cvcraft.uz / preview
          </div>
        </div>

        {/* CV wrapper */}
        <div className={`mx-auto transition-all duration-500 ${viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'}`}>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: '16px',
              boxShadow: '0 32px 64px rgba(99,102,241,0.15), 0 8px 24px rgba(0,0,0,0.08), 0 0 0 1px rgba(99,102,241,0.1)',
            }}
          >
            {!isPremium && <div className="watermark">CVcraft.uz</div>}
            <div id="cv-preview-content" ref={cvRef}>
              <TemplateComponent data={cvData} />
            </div>
          </div>

          {/* Reklama — faqat bepul foydalanuvchilar */}
          <AdBanner size="banner" className="mt-6" />

          {/* Bottom hint */}
          <div className="mt-5 flex items-center justify-center gap-2">
            <svg className="h-3.5 w-3.5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs text-indigo-400">{t('preview.pdf_ready') || 'PDF yuklab olishga tayyor'}</span>
          </div>
        </div>
      </div>

      {/* Print-only */}
      <div className="print-only">
        <TemplateComponent data={cvData} />
      </div>

      {/* Share toast */}
      {shareToast && (
        <div
          className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-gray-800 shadow-2xl"
          style={{ animation: 'fadeInUp 0.3s ease' }}
        >
          ✓ {t('preview.share_copied')}
        </div>
      )}
    </div>
  );
}
