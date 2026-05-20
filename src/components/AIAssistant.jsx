import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePremium } from '../context/PremiumContext.jsx';
import { generateBio, improveExperience, suggestSkills } from '../utils/aiHelper.js';
import { trackAIUse } from '../utils/analytics.js';

export default function AIAssistant({ cvData, onBioGenerated, onSkillsGenerated }) {
  const { t } = useTranslation();
  const { isPremium, openPremiumModal } = usePremium();
  const [loading, setLoading] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = async (action) => {
    if (!isPremium) {
      openPremiumModal();
      return;
    }
    setLoading(action);
    trackAIUse(action);
    try {
      if (action === 'bio') {
        const bio = await generateBio(cvData);
        onBioGenerated?.(bio);
      } else if (action === 'skills') {
        const skills = await suggestSkills(cvData);
        onSkillsGenerated?.(skills);
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        {t('ai.title')}
        {!isPremium && <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">PRO</span>}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute left-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-3">
              <h3 className="text-white font-semibold text-sm flex items-center gap-2">
                <span>✨</span> {t('ai.title')}
              </h3>
            </div>
            <div className="p-3 space-y-2">
              <button
                onClick={() => handleAction('bio')}
                disabled={loading === 'bio'}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-50 transition-colors text-sm text-left disabled:opacity-50"
              >
                <span className="text-lg">✍️</span>
                <div>
                  <div className="font-medium text-gray-800">{t('ai.write_bio')}</div>
                  <div className="text-xs text-gray-500">{loading === 'bio' ? t('ai.writing') : t('ai.auto_write')}</div>
                </div>
              </button>

              <button
                onClick={() => handleAction('skills')}
                disabled={loading === 'skills'}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-purple-50 transition-colors text-sm text-left disabled:opacity-50"
              >
                <span className="text-lg">💡</span>
                <div>
                  <div className="font-medium text-gray-800">{t('ai.suggest_skills')}</div>
                  <div className="text-xs text-gray-500">{loading === 'skills' ? t('ai.writing') : t('ai.job_suggest')}</div>
                </div>
              </button>

              {!isPremium && (
                <div className="mt-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <p className="text-xs text-purple-700 font-medium">{t('ai.premium_only')}</p>
                  <button
                    onClick={() => { openPremiumModal(); setIsOpen(false); }}
                    className="mt-1.5 text-xs text-purple-600 font-semibold underline"
                  >
                    {t('ai.upgrade')} →
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
