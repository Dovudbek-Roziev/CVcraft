import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import { usePremium } from '../context/PremiumContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const { isPremium, daysLeft, openPremiumModal } = usePremium();
  const { user, logout, loading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/builder', label: t('nav.builder') },
    { path: '/templates', label: t('nav.templates') },
    { path: '/pricing', label: t('nav.pricing') },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-white border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-blue-200 transition-shadow">
              <span className="text-white font-bold text-sm">CV</span>
            </div>
            <span className="font-bold text-xl text-gray-800">CV<span className="text-blue-600">craft</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive(path) ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />

            {/* Premium badge */}
            {isPremium && (
              <span className="hidden sm:inline badge-premium text-xs" title={`${daysLeft} ${t('header.days_left')}`}>
                ⭐ Premium
              </span>
            )}

            {!loading && (
              user ? (
                /* User menu */
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(o => !o)}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-blue-300 hover:text-blue-600"
                    type="button"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                      {(user.name || user.email)?.[0]?.toUpperCase()}
                    </div>
                    <span className="hidden sm:block max-w-[100px] truncate">{user.name || user.email}</span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-10 z-50 w-52 rounded-2xl border border-gray-100 bg-white py-2 shadow-xl">
                      <div className="border-b border-gray-100 px-4 pb-2">
                        <p className="text-xs text-gray-400">{t('header.account')}</p>
                        <p className="truncate text-sm font-semibold text-gray-800">{user.email}</p>
                        {isPremium && (
                          <p className="text-xs text-yellow-600 mt-0.5">⭐ Premium • {daysLeft} {t('header.days_left')}</p>
                        )}
                      </div>

                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="block w-full px-4 py-2 text-left text-sm font-medium text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          ⚙️ Admin panel
                        </Link>
                      )}

                      {!isPremium && (
                        <button
                          onClick={() => { setUserMenuOpen(false); openPremiumModal(); }}
                          className="w-full px-4 py-2 text-left text-sm font-medium text-yellow-600 hover:bg-yellow-50 transition-colors"
                          type="button"
                        >
                          {t('header.get_premium')}
                        </button>
                      )}

                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                        type="button"
                      >
                        {t('header.logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Login button */
                <button
                  onClick={openPremiumModal}
                  className="hidden sm:inline btn-secondary py-2 px-4 text-sm"
                  type="button"
                >
                  {t('header.login')}
                </button>
              )
            )}

            <Link to="/builder" className="btn-primary py-2 px-4 text-sm">
              {t('nav.builder')}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-0.5 bg-gray-600 transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-gray-600 transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-gray-600 transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 animate-fade-in">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium mb-1 transition-colors ${isActive(path) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {label}
              </Link>
            ))}
            {user ? (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg">
                {t('header.logout')}
              </button>
            ) : (
              <button onClick={() => { openPremiumModal(); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
                {t('header.login_register')}
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
