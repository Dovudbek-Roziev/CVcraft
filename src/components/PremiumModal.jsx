import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePremium } from '../context/PremiumContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { trackPremiumClick } from '../utils/analytics.js';

const ADMIN_TELEGRAM = 'https://t.me/dovud_IT';

export default function PremiumModal() {
  const { t } = useTranslation();
  const { showPremiumModal, closePremiumModal } = usePremium();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!showPremiumModal) return null;

  const features = t('premium_modal.features', { returnObjects: true });

  const handleGoToPricing = () => {
    trackPremiumClick('modal');
    closePremiumModal();
    navigate('/pricing');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closePremiumModal} />

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 p-6 text-center text-white">
          <div className="mb-2 text-4xl">⭐</div>
          <h2 className="text-2xl font-bold">Premium</h2>
          <p className="text-white/90 text-sm mt-1">{t('premium_modal.subtitle')}</p>
        </div>

        <div className="p-6">
          <div className="text-center mb-5">
            <span className="text-4xl font-bold text-gray-900">$3</span>
            <span className="text-gray-500 text-sm"> {t('premium_modal.per_month')}</span>
            <p className="text-xs text-gray-400 mt-1">{t('premium_modal.duration_note')}</p>
          </div>

          {/* Features */}
          <ul className="space-y-2 mb-6">
            {(Array.isArray(features) ? features : []).map(f => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                {f}
              </li>
            ))}
          </ul>

          {/* Payment instructions */}
          <div className="mb-5 rounded-2xl bg-blue-50 border border-blue-100 p-4">
            <p className="text-xs font-semibold text-blue-700 mb-2">📋 {t('premium_modal.payment_title')}</p>
            <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
              <li>{t('premium_modal.step1')}</li>
              <li>{t('premium_modal.step2')}</li>
              <li>{t('premium_modal.step3')}</li>
              {user && (
                <li>{t('premium_modal.step4_prefix')} <span className="font-mono font-semibold">{user.email}</span></li>
              )}
            </ol>
          </div>

          <a
            href={ADMIN_TELEGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] text-sm mb-2"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
            </svg>
            {t('premium_modal.telegram_btn')}
          </a>

          <button onClick={handleGoToPricing} className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-1">
            {t('premium_modal.see_details')}
          </button>

          <button onClick={closePremiumModal} className="w-full mt-1 py-2 text-gray-400 text-sm hover:text-gray-600 transition-colors">
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
