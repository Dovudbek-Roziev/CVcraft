import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// TODO: Replace with your real bot token and chat ID
// 1. @BotFather -> /newbot -> token oling
// 2. Botga /start yuboring, so'ng api.telegram.org/bot{TOKEN}/getUpdates dan chat_id oling
const BOT_TOKEN = '8256683133:AAHwBdLIk_2JyxUDTM8x2kviEYhaJvuSTpo';
const CHAT_ID = '6181083568';

async function sendToTelegram(name, email, subject, message) {
  const text =
    `<b>📩 Yangi xabar — CVcraft</b>\n\n` +
    `👤 <b>Ism:</b> ${name}\n` +
    `📧 <b>Email:</b> ${email}\n` +
    `📌 <b>Mavzu:</b> ${subject}\n\n` +
    `💬 <b>Xabar:</b>\n${message}`;

  const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' }),
  });

  if (!res.ok) throw new Error('Telegram API error');
}

export default function SupportPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const subjects = t('support.subjects', { returnObjects: true });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await sendToTelegram(form.name, form.email, form.subject, form.message);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
            <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t('support.title')}</h1>
          <p className="mt-2 text-gray-500">{t('support.subtitle')}</p>
        </div>

        {status === 'success' ? (
          <div className="rounded-2xl bg-green-50 border border-green-200 p-10 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-green-800">{t('support.success')}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 btn-primary"
              type="button"
            >
              {t('support.new_message')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">{t('support.name')}</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('support.name_placeholder')}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">{t('support.email')}</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">{t('support.subject')}</label>
              <select
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">{t('support.subject_placeholder')}</option>
                {Array.isArray(subjects) && subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">{t('support.message')}</label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder={t('support.message_placeholder')}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {t('support.error')}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary w-full py-3 disabled:opacity-60"
            >
              {status === 'sending' ? t('support.sending') : t('support.send')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
