import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '../utils/analytics.js';
import AdBanner from '../components/AdBanner.jsx';

function StatCard({ target, suffix, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = target / (2000 / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { setCount(target); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 16);
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="text-center" ref={ref}>
      <div className="text-3xl md:text-4xl font-bold text-blue-600">{count.toLocaleString()}{suffix}</div>
      <div className="text-gray-600 text-sm mt-1">{label}</div>
    </div>
  );
}

const PREVIEW_TEMPLATES = [
  { key: 'classic', color: "from-gray-700 to-gray-900", accent: "#3B82F6" },
  { key: 'modern', color: "from-blue-500 to-blue-700", accent: "#10B981" },
  { key: 'creative', color: "from-purple-500 to-pink-600", accent: "#F59E0B" },
  { key: 'dark', color: "from-gray-900 to-black", accent: "#60A5FA" },
];

export default function LandingPage() {
  const { t } = useTranslation();
  const [activeTemplate, setActiveTemplate] = useState(0);
  const testimonials = t('landing.testimonials_list', { returnObjects: true });

  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16 pb-24 px-4 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                {t('landing.hero_badge')}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                {t('landing.hero_title').split(t('landing.hero_accent')).map((part, i) =>
                  i === 0 ? <span key={i}>{part}<span className="text-blue-600">{t('landing.hero_accent')}</span></span> : <span key={i}>{part}</span>
                )}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {t('landing.hero_subtitle')}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/builder"
                  onClick={() => trackEvent('CTA', 'click', 'hero-start')}
                  className="btn-primary text-base px-8 py-3.5 inline-flex items-center gap-2"
                >
                  {t('landing.hero_btn')}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link to="/templates" className="btn-secondary text-base px-8 py-3.5">
                  {t('landing.hero_btn_secondary')}
                </Link>
              </div>
            </div>

            {/* Right: CV preview mockup */}
            <div className="relative animate-fade-in hidden lg:block">
              <div className="relative bg-white rounded-2xl shadow-2xl p-1 border border-gray-100 w-full max-w-md mx-auto">
                {/* Template tabs */}
                <div className="flex gap-1 mb-1 p-1 bg-gray-50 rounded-xl">
                  {PREVIEW_TEMPLATES.map((tpl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTemplate(i)}
                      className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                        activeTemplate === i ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {t(`templates.${tpl.key}`)}
                    </button>
                  ))}
                </div>
                {/* Mock CV */}
                <div className={`rounded-xl overflow-hidden bg-gradient-to-b ${PREVIEW_TEMPLATES[activeTemplate].color} p-4 text-white min-h-64`}>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">JD</div>
                    <div>
                      <div className="font-bold text-lg">John Doe</div>
                      <div className="text-white/80 text-sm">Frontend Developer</div>
                      <div className="text-white/60 text-xs mt-0.5">john@example.com · Tashkent</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {['JavaScript', 'React.js', 'TypeScript'].map((skill, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-white/80 text-xs w-20">{skill}</span>
                        <div className="flex-1 bg-white/20 rounded-full h-1.5">
                          <div className="bg-white rounded-full h-1.5" style={{ width: `${90 - i * 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-2 border border-gray-100 animate-float">
                <div className="text-xs font-bold text-green-600">{t('landing.pdf_ready')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white py-14 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard target={30} suffix="+" label={t('landing.stats_templates')} />
            <StatCard target={3} suffix="" label={t('landing.stats_languages')} />
            <StatCard target={10} suffix="+" label={t('landing.stats_free_templates')} />
            <StatCard target={100} suffix="%" label={t('landing.stats_free')} />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('landing.features_title')}</h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto">{t('landing.features_subtitle')}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: t('landing.feature1_title'), desc: t('landing.feature1_desc'), color: 'bg-yellow-50 text-yellow-600' },
              { icon: '🎨', title: t('landing.feature2_title'), desc: t('landing.feature2_desc'), color: 'bg-purple-50 text-purple-600' },
              { icon: '🌍', title: t('landing.feature3_title'), desc: t('landing.feature3_desc'), color: 'bg-green-50 text-green-600' },
              { icon: '📄', title: t('landing.feature4_title'), desc: t('landing.feature4_desc'), color: 'bg-blue-50 text-blue-600' },
            ].map(({ icon, title, desc, color }, i) => (
              <div key={i} className="card hover:shadow-md transition-shadow animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-2xl mb-4`}>{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES PREVIEW */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('landing.templates_title')}</h2>
            <p className="text-gray-600">{t('landing.templates_subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { key: 'classic', bg: 'bg-gray-50', accent: 'border-l-4 border-blue-500', free: true },
              { key: 'modern', bg: 'bg-blue-50', accent: 'border-t-4 border-blue-500', free: true },
              { key: 'minimal', bg: 'bg-white', accent: 'border border-gray-200', free: true },
              { key: 'creative', bg: 'bg-gradient-to-br from-purple-50 to-pink-50', accent: 'border-l-4 border-purple-500', free: false },
            ].map(({ key, bg, accent, free }, i) => (
              <Link
                key={i}
                to="/templates"
                className={`group relative rounded-2xl overflow-hidden ${bg} ${accent} p-4 min-h-48 flex flex-col hover:shadow-lg transition-all`}
              >
                {!free && (
                  <span className="absolute top-2 right-2 badge-premium text-xs">PRO</span>
                )}
                {free && (
                  <span className="absolute top-2 right-2 badge-free text-xs">{t('landing.free_badge')}</span>
                )}
                <div className="flex-1">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg mb-2 opacity-70" />
                  <div className="h-2 bg-gray-300 rounded w-3/4 mb-1.5" />
                  <div className="h-1.5 bg-gray-200 rounded w-1/2 mb-3" />
                  {[85, 70, 60].map((w, j) => (
                    <div key={j} className="flex items-center gap-2 mb-1.5">
                      <div className="h-1.5 bg-gray-300 rounded flex-1" />
                      <div className="h-1.5 bg-blue-400 rounded" style={{ width: `${w * 0.4}px` }} />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-semibold text-gray-600 mt-2">{t(`templates.${key}`)}</div>
                <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-5 transition-all flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white rounded-xl px-4 py-2 text-sm font-semibold text-blue-600 shadow-lg transition-all transform translate-y-2 group-hover:translate-y-0">
                    {t('landing.see_template')} →
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link to="/templates" className="btn-outline">
              {t('landing.view_all')}
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{t('landing.testimonials_title')}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map(({ name, city, text, avatar, rating }, i) => (
              <div key={i} className="card hover:shadow-md transition-shadow">
                <div className="flex mb-1">{'⭐'.repeat(rating)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{name}</div>
                    <div className="text-gray-500 text-xs">{city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE VS PREMIUM COMPARISON */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{t('landing.free_vs_premium')}</h2>
            <p className="text-gray-600">{t('landing.choose_plan')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="card border-2 border-gray-200">
              <div className="badge-free text-sm mb-4 inline-flex">{t('pricing.free')}</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$0</div>
              <p className="text-gray-500 text-sm mb-5">{t('landing.forever_free')}</p>
              <ul className="space-y-3">
                {t('pricing.free_features', { returnObjects: true }).map((f, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {i < 3 ? '✓' : '~'}
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/builder" className="btn-secondary w-full mt-6 text-center block">{t('landing.start_btn')}</Link>
            </div>
            {/* Premium */}
            <div className="card border-2 border-yellow-400 relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">{t('landing.popular_badge')}</div>
              <div className="badge-premium text-sm mb-4 inline-flex">⭐ Premium</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$3<span className="text-base font-normal text-gray-500">{t('landing.per_month')}</span></div>
              <p className="text-gray-500 text-sm mb-5">{t('landing.all_features')}</p>
              <ul className="space-y-3">
                {t('pricing.premium_features', { returnObjects: true }).slice(0, 6).map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/pricing" className="btn-primary w-full mt-6 text-center block bg-gradient-to-r from-yellow-400 to-orange-400 border-0 hover:from-yellow-500 hover:to-orange-500">
                {t('landing.get_premium_link')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reklama banner */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <AdBanner size="banner" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.cta_title')}</h2>
          <p className="text-blue-100 text-lg mb-8">{t('landing.cta_subtitle')}</p>
          <Link
            to="/builder"
            onClick={() => trackEvent('CTA', 'click', 'footer-cta')}
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-4 px-10 rounded-2xl hover:bg-blue-50 transition-all shadow-xl hover:shadow-2xl text-lg"
          >
            {t('landing.cta_btn')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
