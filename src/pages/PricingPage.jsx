import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePremium } from '../context/PremiumContext.jsx';
import { trackPremiumClick } from '../utils/analytics.js';

export default function PricingPage() {
  const { t } = useTranslation();
  const { isPremium, openPremiumModal } = usePremium();
  const freeFeatures = t('pricing.free_features_table', { returnObjects: true });
  const premiumFeatures = t('pricing.premium_features_table', { returnObjects: true });
  const faqItems = t('pricing.faq_items', { returnObjects: true });
  const comparisonRows = t('pricing.comparison_table', { returnObjects: true });

  const handleGetPremium = () => {
    trackPremiumClick('pricing_page');
    openPremiumModal();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">{t('pricing.title')}</h1>
        <p className="mx-auto max-w-xl text-lg text-gray-600">{t('pricing.subtitle')}</p>
      </div>

      <div className="mx-auto mb-16 grid max-w-3xl gap-6 md:grid-cols-2">
        <PlanCard
          title={t('pricing.free')}
          price="$0"
          period={t('pricing.month')}
          description={t('pricing.for_starters')}
          features={freeFeatures}
          action={<button className="w-full rounded-xl border-2 border-gray-300 py-3 font-semibold text-gray-700 transition-all hover:border-gray-400" type="button">{t('pricing.currently_on')}</button>}
        />

        <PlanCard
          featured
          badge={t('pricing.most_popular_badge')}
          title={t('pricing.premium')}
          price="$3"
          period={t('pricing.month')}
          description={t('pricing.for_pros')}
          features={premiumFeatures}
          action={
            isPremium ? (
              <div className="w-full rounded-xl bg-green-100 py-3 text-center font-semibold text-green-700">{t('pricing.active_badge')}</div>
            ) : (
              <button
                onClick={handleGetPremium}
                className="w-full rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-yellow-500 hover:to-orange-500 hover:shadow-xl"
                type="button"
              >
                {t('pricing.get_premium_cta')}
              </button>
            )
          }
          note={t('pricing.cancel_anytime')}
        />
      </div>

      <div className="mb-16 overflow-x-auto">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">{t('pricing.comparison_title')}</h2>
        <table className="mx-auto w-full max-w-2xl">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left font-medium text-gray-600">{t('pricing.col_feature')}</th>
              <th className="px-4 py-3 text-center font-medium text-gray-600">{t('pricing.free')}</th>
              <th className="px-4 py-3 text-center font-semibold text-yellow-600">{t('pricing.premium')}</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map(([feature, free, premium]) => (
              <tr key={feature} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-700">{feature}</td>
                <td className="px-4 py-3 text-center text-sm text-gray-500">{free}</td>
                <td className="px-4 py-3 text-center text-sm font-medium text-green-600">{premium}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto max-w-2xl">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">{t('pricing.faq_title')}</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="card">
              <h3 className="mb-2 font-semibold text-gray-800">{item.q}</h3>
              <p className="text-sm text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block max-w-lg rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <h2 className="mb-2 text-2xl font-bold">{t('pricing.cta_title')}</h2>
          <p className="mb-4 text-sm opacity-90">{t('pricing.cta_subtitle')}</p>
          {!isPremium && (
            <button onClick={handleGetPremium} className="rounded-xl bg-white px-6 py-2.5 font-bold text-blue-600 transition-all hover:bg-blue-50" type="button">
              {t('pricing.get_premium_cta')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PlanCard({ title, price, period, description, features, action, featured = false, badge = '', note = '' }) {
  return (
    <div className={`card relative border-2 ${featured ? 'border-yellow-400 shadow-xl shadow-yellow-100' : 'border-gray-200'}`}>
      {badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-1 text-sm font-bold text-white shadow-md whitespace-nowrap">{badge}</span>
        </div>
      )}
      <div className="mb-6 mt-2 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="mt-3">
          <span className="text-5xl font-bold text-gray-900">{price}</span>
          <span className="text-sm text-gray-500">{period}</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
      <ul className="mb-8 space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-sm">
            <span className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs ${feature.ok ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-400'}`}>
              {feature.ok ? '+' : '-'}
            </span>
            <span className={feature.ok ? 'text-gray-700' : 'text-gray-400 line-through'}>{feature.label}</span>
          </li>
        ))}
      </ul>
      {action}
      {note && <p className="mt-3 text-center text-xs text-gray-400">{note}</p>}
    </div>
  );
}
