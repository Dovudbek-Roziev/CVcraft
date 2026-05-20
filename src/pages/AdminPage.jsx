import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AdminPage() {
  const { user, apiFetch } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [days, setDays] = useState(30);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Admin emas bo'lsa redirect
  useEffect(() => {
    if (user && user.role !== 'admin') navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === 'admin') fetchPremiumUsers();
  }, [user]);

  const fetchPremiumUsers = async () => {
    setLoadingUsers(true);
    try {
      const data = await apiFetch('/api/premium/users');
      setPremiumUsers(data);
    } catch {
      // ignore
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleActivate = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const data = await apiFetch('/api/premium/activate', {
        method: 'POST',
        body: JSON.stringify({ email, days: Number(days) }),
      });
      setResult({ type: 'success', msg: data.message, expiry: data.premiumExpiry });
      setEmail('');
      fetchPremiumUsers();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (targetEmail) => {
    if (!confirm(`${targetEmail} ning premiumini o'chirmoqchimisiz?`)) return;
    try {
      await apiFetch('/api/premium/deactivate', {
        method: 'POST',
        body: JSON.stringify({ email: targetEmail }),
      });
      fetchPremiumUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
        <p className="text-sm text-gray-500 mt-1">Premium boshqaruvi</p>
      </div>

      {/* Activate form */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-4">⭐ Premium faollashtirish</h2>
        <form onSubmit={handleActivate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Foydalanuvchi email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Necha kun</label>
            <div className="flex gap-2">
              {[7, 30, 60, 90].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${days === d ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'}`}
                >
                  {d} kun
                </button>
              ))}
              <input
                type="number"
                min={1}
                max={365}
                value={days}
                onChange={e => setDays(Number(e.target.value))}
                className="input-field w-24 text-center"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
          )}
          {result && (
            <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
              ✓ {result.msg} — {new Date(result.expiry).toLocaleDateString('uz-UZ')} gacha
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-semibold text-white text-sm disabled:opacity-60 transition-all"
            style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)' }}
          >
            {loading ? 'Faollashtirilmoqda...' : `⭐ ${days} kunga Premium berish`}
          </button>
        </form>
      </div>

      {/* Premium users list */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-800">Premiumli foydalanuvchilar</h2>
          <button
            onClick={fetchPremiumUsers}
            className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors"
            type="button"
          >
            Yangilash
          </button>
        </div>

        {loadingUsers ? (
          <div className="py-8 text-center text-sm text-gray-400">Yuklanmoqda...</div>
        ) : premiumUsers.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-400">Hozircha premiumli foydalanuvchi yo'q</div>
        ) : (
          <div className="space-y-2">
            {premiumUsers.map(u => {
              const expiry = new Date(u.premiumExpiry);
              const daysLeft = Math.ceil((expiry - new Date()) / (1000 * 60 * 60 * 24));
              const expired = daysLeft <= 0;
              return (
                <div
                  key={u._id}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 ${expired ? 'bg-red-50' : 'bg-green-50'}`}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">{u.email}</p>
                    <p className={`text-xs mt-0.5 ${expired ? 'text-red-500' : 'text-green-600'}`}>
                      {expired
                        ? 'Muddati tugagan'
                        : `${daysLeft} kun qoldi — ${expiry.toLocaleDateString('uz-UZ')} gacha`}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeactivate(u.email)}
                    className="text-xs text-red-400 hover:text-red-600 transition-colors px-3 py-1 rounded-lg hover:bg-red-100"
                    type="button"
                  >
                    O'chirish
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
