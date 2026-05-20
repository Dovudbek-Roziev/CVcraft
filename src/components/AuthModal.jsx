import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext.jsx';
import { usePremium } from '../context/PremiumContext.jsx';

export default function AuthModal() {
  const { t } = useTranslation();
  const { login, register } = useAuth();
  const { showAuthModal, closeAuthModal, openPremiumModal } = usePremium();

  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!showAuthModal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.email, form.password, form.name);
      }
      closeAuthModal();
      setTimeout(() => openPremiumModal(), 100);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(m => m === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeAuthModal} />

      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl animate-fade-in-up">
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-center text-white">
          <div className="mb-2 text-3xl">👤</div>
          <h2 className="text-xl font-bold">
            {mode === 'login' ? t('auth.login_title') : t('auth.register_title')}
          </h2>
          <p className="mt-1 text-sm text-white/80">{t('auth.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="label">{t('auth.name_label')}</label>
              <input
                className="input-field"
                type="text"
                placeholder={t('auth.name_placeholder')}
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>
          )}

          <div>
            <label className="label">{t('auth.email_label')}</label>
            <input
              className="input-field"
              type="email"
              placeholder={t('auth.email_placeholder')}
              required
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            />
          </div>

          <div>
            <label className="label">{t('auth.password_label')}</label>
            <input
              className="input-field"
              type="password"
              placeholder={t('auth.password_placeholder')}
              required
              minLength={6}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            {loading
              ? t('auth.loading')
              : mode === 'login'
              ? t('auth.login_btn')
              : t('auth.register_btn')}
          </button>

          <button
            type="button"
            onClick={switchMode}
            className="w-full text-center text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            {mode === 'login' ? t('auth.switch_to_register') : t('auth.switch_to_login')}
          </button>
        </form>
      </div>
    </div>
  );
}
