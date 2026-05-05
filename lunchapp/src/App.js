import React, { useState, useCallback } from 'react';
import { useHistory, generateRecommendations } from './hooks/useRecommendations';
import PreferenceBar from './components/PreferenceBar';
import RecommendationCard from './components/RecommendationCard';
import HistoryPanel from './components/HistoryPanel';
import Toast from './components/Toast';
import './App.css';

const TODAY = new Date().toLocaleDateString('en-MY', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
});

export default function App() {
  const { history, addEntry, clearHistory } = useHistory();
  const [prefs, setPrefs] = useState({ halal: 'all', cuisine: 'All', budget: 'all', mall: 'all' });
  const [recs, setRecs] = useState([]);
  const [picked, setPicked] = useState(null);
  const [toast, setToast] = useState(null);
  const [generated, setGenerated] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleGenerate = useCallback(() => {
    const results = generateRecommendations(prefs, history);
    if (!results.length) {
      showToast("No restaurants match your filters. Try broadening them.");
      return;
    }
    setRecs(results);
    setPicked(null);
    setGenerated(true);
  }, [prefs, history]);

  const handlePick = (restaurant) => {
    addEntry(restaurant);
    setPicked(restaurant.id);
    showToast(`Logged: ${restaurant.name} — see you tomorrow! 🎉`);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-left">
            <div className="logo-mark">🍜</div>
            <div>
              <h1 className="app-title">Lunch<span className="accent">Pick</span></h1>
              <p className="app-sub">Mid Valley & Gardens Mall · KL</p>
            </div>
          </div>
          <div className="header-date">{TODAY}</div>
        </div>
      </header>

      <main className="app-main">
        <div className="main-grid">
          <div className="left-col">
            <section className="card pref-card">
              <h2 className="section-label">Preferences</h2>
              <PreferenceBar prefs={prefs} onChange={setPrefs} />
              <button className="btn-generate" onClick={handleGenerate}>
                Suggest today's lunch
                <span className="btn-arrow">→</span>
              </button>
            </section>

            {generated && (
              <section className="recs-section">
                <div className="recs-header">
                  <h2 className="section-label">Today's picks</h2>
                  {recs.length > 0 && (
                    <span className="recs-count">{recs.length} options</span>
                  )}
                </div>
                {recs.length === 0 ? (
                  <div className="empty-recs card">
                    <p>No restaurants match your current filters.</p>
                    <p className="muted">Try loosening the dietary or cuisine filters.</p>
                  </div>
                ) : (
                  <div className="cards-list">
                    {recs.map((r, i) => (
                      <RecommendationCard
                        key={r.id}
                        restaurant={r}
                        rank={i + 1}
                        history={history}
                        isPicked={picked === r.id}
                        onPick={handlePick}
                      />
                    ))}
                  </div>
                )}
              </section>
            )}

            {!generated && (
              <div className="hero-empty">
                <div className="hero-icon">🍱</div>
                <h2>What's for lunch today?</h2>
                <p>Set your preferences above and hit <strong>Suggest</strong> to get personalised picks from 30+ restaurants across Mid Valley and The Gardens Mall.</p>
              </div>
            )}
          </div>

          <aside className="right-col">
            <HistoryPanel history={history} onClear={clearHistory} />
          </aside>
        </div>
      </main>

      {toast && <Toast message={toast} />}
    </div>
  );
}
