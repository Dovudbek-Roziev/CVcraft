import React, { useEffect, useRef } from 'react';
import { usePremium } from '../context/PremiumContext.jsx';
import { Link } from 'react-router-dom';

// AdSense publisher ID ni shu yerga qo'ying (ca-pub-XXXXXXXXXXXXXXXX)
const ADSENSE_CLIENT = import.meta.env.VITE_ADSENSE_CLIENT || '';

/**
 * size: 'banner' (728x90) | 'rectangle' (300x250) | 'mobile' (320x50)
 * slot: AdSense ad unit ID
 * fallback: true bo'lsa — AdSense tayyor bo'lmaguncha o'z reklamangiz ko'rinadi
 */
export default function AdBanner({ size = 'rectangle', slot = '', fallback = true, className = '' }) {
  const { isPremium } = usePremium();
  const adRef = useRef(null);
  const pushed = useRef(false);

  // Premium foydalanuvchiga reklama ko'rsatilmaydi
  if (isPremium) return null;

  const dimensions = {
    banner:    { width: '100%', height: '90px',  label: '728×90 Leaderboard' },
    rectangle: { width: '300px', height: '250px', label: '300×250 Rectangle' },
    mobile:    { width: '100%', height: '50px',   label: '320×50 Mobile Banner' },
    wide:      { width: '100%', height: '90px',   label: '970×90 Billboard' },
  };

  const dim = dimensions[size] || dimensions.rectangle;

  // AdSense mavjud va slot berilgan bo'lsa
  if (ADSENSE_CLIENT && slot) {
    return (
      <div className={`flex justify-center overflow-hidden ${className}`}>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: dim.width, height: dim.height }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format={size === 'mobile' ? 'auto' : 'fixed'}
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Fallback: AdSense hali yo'q bo'lsa o'zingizning reklama/promo ko'rsating
  if (!fallback) return null;

  return <FallbackAd size={size} dim={dim} className={className} />;
}

// AdSense tayyor bo'lmaguncha ko'rinadigan o'z promosi
function FallbackAd({ size, dim, className }) {
  const isSmall = size === 'mobile' || size === 'banner';

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 ${className}`}
      style={{ width: dim.width, minHeight: dim.height, maxWidth: '100%' }}
    >
      {isSmall ? (
        <Link
          to="/pricing"
          className="flex items-center gap-3 px-4 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <span>⭐</span>
          <span>CVcraft Premium — Reklamasiz ishlang! Oyiga $3</span>
          <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs text-white">Premium olish →</span>
        </Link>
      ) : (
        <div className="flex flex-col items-center gap-3 p-6 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">⭐</div>
          <div>
            <p className="font-semibold text-gray-800">CVcraft Premium</p>
            <p className="text-sm text-gray-500">Reklamasiz, watermaksiz, 30 ta shablon</p>
          </div>
          <Link
            to="/pricing"
            className="rounded-xl bg-gradient-to-r from-indigo-500 to-blue-600 px-5 py-2 text-sm font-bold text-white shadow-md transition-all hover:shadow-lg"
          >
            Oyiga $3 — Premium olish
          </Link>
          <p className="text-xs text-gray-400">Reklama · CVcraft</p>
        </div>
      )}
    </div>
  );
}

// AdSense script ni bir marta yuklash uchun hook
export function useAdSense() {
  useEffect(() => {
    if (!ADSENSE_CLIENT) return;
    if (document.querySelector('script[data-adsense]')) return;

    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-adsense', 'true');
    document.head.appendChild(script);

    script.onload = () => {
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
    };
  }, []);
}
