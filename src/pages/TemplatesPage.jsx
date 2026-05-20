import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PremiumModal from '../components/PremiumModal.jsx';
import { usePremium } from '../context/PremiumContext.jsx';
import { useCV } from '../hooks/useCV.js';
import { trackTemplateSelect } from '../utils/analytics.js';

const TEMPLATES = [
  { id: 'classic',     free: true,  color: '#374151' },
  { id: 'modern',      free: true,  color: '#3B82F6' },
  { id: 'minimal',     free: true,  color: '#6B7280' },
  { id: 'simple',      free: true,  color: '#9CA3AF' },
  { id: 'business',    free: true,  color: '#1D4ED8' },
  { id: 'fresh',       free: true,  color: '#059669' },
  { id: 'graduate',    free: true,  color: '#6D28D9' },
  { id: 'professional',free: true,  color: '#1E40AF' },
  { id: 'tech',        free: true,  color: '#0F172A' },
  { id: 'elegant',     free: true,  color: '#1E3A5F' },
  { id: 'creative',    free: false, color: '#7C3AED' },
  { id: 'dark',        free: false, color: '#111827' },
  { id: 'bold',        free: false, color: '#DC2626' },
  { id: 'academic',    free: false, color: '#7C2D12' },
  { id: 'colorful',    free: false, color: '#EC4899' },
  { id: 'executive',   free: false, color: '#374151' },
  { id: 'artist',      free: false, color: '#DB2777' },
  { id: 'medical',     free: false, color: '#0E7490' },
  { id: 'legal',       free: false, color: '#1C1917' },
  { id: 'marketing',   free: false, color: '#D97706' },
  { id: 'timeline',    free: false, color: '#0D9488' },
  { id: 'neon',        free: false, color: '#A855F7' },
  { id: 'compact',     free: false, color: '#1E293B' },
  { id: 'pastel',      free: false, color: '#EC4899' },
  { id: 'nordic',      free: false, color: '#111827' },
  { id: 'retro',       free: false, color: '#92400E' },
  { id: 'swiss',       free: false, color: '#DC2626' },
  { id: 'stripe',      free: false, color: '#2563EB' },
  { id: 'infographic', free: false, color: '#0891B2' },
  { id: 'corporate',   free: false, color: '#1E3A5F' },
];

const FILTERS = [
  { key: 'all', labelKey: 'filter_all' },
  { key: 'free', labelKey: 'free_badge' },
  { key: 'premium', labelKey: 'premium_badge' },
];

export default function TemplatesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cvData, updateCustomization } = useCV();
  const { isPremium, openPremiumModal } = usePremium();
  const [filter, setFilter] = useState('all');
  const [hovered, setHovered] = useState(null);

  const filtered = TEMPLATES.filter((template) => {
    if (filter === 'free') return template.free;
    if (filter === 'premium') return !template.free;
    return true;
  });

  const handleSelect = (template) => {
    if (!template.free && !isPremium) {
      openPremiumModal();
      return;
    }
    updateCustomization({ template: template.id });
    trackTemplateSelect(template.id);
    navigate('/preview');
  };

  const isSelected = (id) => cvData.customization.template === id;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <PremiumModal />
      <div className="mb-10 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">{t('templates.title')}</h1>
        <p className="text-lg text-gray-600">{t('templates.subtitle')}</p>
      </div>

      <div className="mb-8 flex justify-center gap-2">
        {FILTERS.map((item) => (
          <button
            key={item.key}
            onClick={() => setFilter(item.key)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${filter === item.key ? 'bg-blue-600 text-white shadow-md' : 'border border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:text-blue-600'}`}
            type="button"
          >
            {t(`templates.${item.labelKey}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {filtered.map((template) => (
          <div
            key={template.id}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 bg-white transition-all hover:-translate-y-1 hover:shadow-xl ${isSelected(template.id) ? 'border-blue-500 shadow-lg shadow-blue-100' : 'border-gray-200 hover:border-gray-300'}`}
            onMouseEnter={() => setHovered(template.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleSelect(template)}
          >
            <div className="relative aspect-[3/4] overflow-hidden" style={{ backgroundColor: `${template.color}15` }}>
              <div className="absolute inset-2 overflow-hidden rounded-lg bg-white shadow-sm">
                <div className="flex h-1/3 items-center justify-center" style={{ backgroundColor: template.color }}>
                  <div className="text-center text-white">
                    <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/30 text-xs font-bold">JD</div>
                    <div className="text-xs font-bold opacity-90">John Doe</div>
                    <div className="text-xs opacity-70">Developer</div>
                  </div>
                </div>
                <div className="space-y-1 p-1.5">
                  {[80, 65, 90, 55].map((width, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <div className="h-1 flex-1 rounded bg-gray-200" />
                      <div className="h-1 rounded" style={{ width: `${width * 0.4}px`, backgroundColor: `${template.color}99` }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute left-2 top-2">
                {template.free ? <span className="badge-free text-xs">{t('templates.free_badge')}</span> : <span className="badge-premium text-xs">{t('templates.premium_badge')}</span>}
              </div>

              {!template.free && !isPremium && hovered === template.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="rounded-xl bg-white px-3 py-2 text-center shadow-lg">
                    <div className="text-xs font-bold text-gray-700">{t('templates.premium_badge')}</div>
                  </div>
                </div>
              )}

              {isSelected(template.id) && (
                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                  <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            <div className="p-3">
              <div className="mb-0.5 flex items-center gap-1.5">
                <span className="text-sm font-semibold text-gray-800">{t(`templates.${template.id}`)}</span>
              </div>
              <p className="text-xs text-gray-500">{t(`templates.desc_${template.id}`)}</p>
              <button className={`mt-2 w-full rounded-lg py-1.5 text-xs font-semibold transition-all ${isSelected(template.id) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`} type="button">
                {isSelected(template.id) ? t('templates.selected') : t('templates.select')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
