import { useEffect, useState } from 'react';
import agrobankLogo from '../assets/agrobank-logo.svg';

const ACCENT = '#00973A';
const CREDS_KEY = 'agro-admin-creds';

function StatCard({ label, value }) {
  return (
    <div className="skeuo-card rounded-2xl p-6 border border-white/5 text-center">
      <div className="font-agro-expanded text-3xl md:text-4xl font-bold mb-2" style={{ color: ACCENT }}>
        {value.toLocaleString('ru-RU')}
      </div>
      <div className="text-sm text-white/55">{label}</div>
    </div>
  );
}

export default function Admin() {
  const [creds, setCreds] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(CREDS_KEY)) || null;
    } catch {
      return null;
    }
  });
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const fetchStats = async (c) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(c),
      });
      if (res.status === 401) {
        sessionStorage.removeItem(CREDS_KEY);
        setCreds(null);
        setStats(null);
        setError("Login yoki parol noto'g'ri");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Server xatosi (${res.status}). Statistika faqat Vercel deploymentda ishlaydi.`);
        return;
      }
      const data = await res.json();
      setStats(data);
      setCreds(c);
      sessionStorage.setItem(CREDS_KEY, JSON.stringify(c));
    } catch {
      setError("Serverga ulanib bo'lmadi. Statistika faqat Vercel deploymentda ishlaydi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (creds) fetchStats(creds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    sessionStorage.removeItem(CREDS_KEY);
    setCreds(null);
    setStats(null);
    setUser('');
    setPassword('');
  };

  // ---------- Login screen ----------
  if (!stats) {
    return (
      <div className="min-h-screen bg-[#030303] text-white flex items-center justify-center px-6">
        <div className="skeuo-card rounded-3xl border border-white/10 p-10 w-full max-w-sm">
          <img src={agrobankLogo} alt="Agrobank" className="h-8 w-auto mx-auto mb-6 opacity-90" />
          <h1 className="text-xl font-bold text-center mb-1">Admin panel</h1>
          <p className="text-sm text-white/50 text-center mb-8">Sayt statistikasi uchun kirish</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchStats({ user, password });
            }}
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Login"
              autoComplete="username"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00973A] transition-colors"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Parol"
              autoComplete="current-password"
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00973A] transition-colors"
            />
            {error && <div className="text-sm text-red-400">{error}</div>}
            <button
              type="submit"
              disabled={loading || !user || !password}
              className="btn-pill-filled rounded-xl py-3 text-sm font-semibold tracking-wide disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Tekshirilmoqda…' : 'Kirish'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ---------- Dashboard ----------
  const maxViews = Math.max(1, ...stats.daily.map((d) => d.views));

  return (
    <div className="min-h-screen bg-[#030303] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img src={agrobankLogo} alt="Agrobank" className="h-8 w-auto opacity-90" />
            <div>
              <h1 className="text-xl font-bold leading-tight">Sayt statistikasi</h1>
              <p className="text-xs text-white/45">Agrobank Careers · admin panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => fetchStats(creds)}
              disabled={loading}
              className="px-4 py-2 rounded-full border text-sm transition-colors cursor-pointer disabled:opacity-50"
              style={{ borderColor: ACCENT, color: ACCENT }}
            >
              {loading ? 'Yangilanmoqda…' : 'Yangilash'}
            </button>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 rounded-full border border-white/15 text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              Chiqish
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <StatCard label="Jami ko'rishlar" value={stats.totalViews} />
          <StatCard label="Jami unikal tashrifchilar" value={stats.totalUnique} />
          <StatCard label="Bugungi ko'rishlar" value={stats.today?.views ?? 0} />
          <StatCard label="Bugungi unikal tashrifchilar" value={stats.today?.unique ?? 0} />
        </div>

        {/* Daily chart */}
        <div className="skeuo-card rounded-3xl border border-white/5 p-8 mb-12">
          <h2 className="text-base font-semibold mb-6 text-white/80">Oxirgi 14 kun — ko'rishlar</h2>
          <div className="flex items-end gap-2 h-44">
            {stats.daily.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                <div className="text-[0.65rem] text-white/60">{d.views || ''}</div>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${Math.max(2, (d.views / maxViews) * 100)}%`,
                    backgroundColor: d.views ? ACCENT : 'rgba(255,255,255,0.08)',
                  }}
                  title={`${d.date}: ${d.views} ko'rish, ${d.unique} unikal`}
                ></div>
                <div className="text-[0.6rem] text-white/40 rotate-0 truncate w-full text-center">
                  {d.date.slice(5)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top pages */}
        <div className="skeuo-card rounded-3xl border border-white/5 p-8">
          <h2 className="text-base font-semibold mb-6 text-white/80">Sahifalar bo'yicha</h2>
          {stats.pages.length === 0 ? (
            <p className="text-sm text-white/45">Hozircha ma'lumot yo'q.</p>
          ) : (
            <table className="w-full text-sm">
              <tbody>
                {stats.pages.map((p) => (
                  <tr key={p.path} className="border-b border-white/5 last:border-0">
                    <td className="py-3 text-white/75">{p.path}</td>
                    <td className="py-3 text-right font-semibold" style={{ color: ACCENT }}>
                      {p.views.toLocaleString('ru-RU')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
