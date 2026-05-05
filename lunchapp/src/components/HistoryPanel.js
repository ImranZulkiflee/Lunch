import React from 'react';

const CUISINE_EMOJI = {
  Malay: '🍛', Chinese: '🥢', Japanese: '🍣', Korean: '🥩',
  Western: '🍔', Indian: '🫓', Thai: '🍜', Italian: '🍝',
  Fusion: '✨', Cafe: '☕'
};

function getDaysAgo(dateStr) {
  const days = Math.floor((Date.now() - new Date(dateStr)) / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
}

function getCuisineStats(history) {
  const counts = {};
  history.forEach(h => { counts[h.cuisine] = (counts[h.cuisine] || 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 4);
}

export default function HistoryPanel({ history, onClear }) {
  const stats = getCuisineStats(history);

  return (
    <div className="history-panel">
      <div className="history-header">
        <h2 className="section-label">History</h2>
        {history.length > 0 && (
          <button className="btn-clear" onClick={onClear}>Clear all</button>
        )}
      </div>

      {history.length > 0 && (
        <div className="stats-row">
          {stats.map(([cuisine, count]) => (
            <div key={cuisine} className="stat-chip">
              <span className="stat-emoji">{CUISINE_EMOJI[cuisine] || '🍽️'}</span>
              <span className="stat-label">{cuisine}</span>
              <span className="stat-count">{count}x</span>
            </div>
          ))}
        </div>
      )}

      {history.length === 0 ? (
        <div className="history-empty">
          <div className="history-empty-icon">📋</div>
          <p>No history yet</p>
          <p className="muted">Pick a restaurant to start tracking your team's lunch choices.</p>
        </div>
      ) : (
        <div className="history-list">
          {history.slice(0, 14).map((h, i) => (
            <div key={i} className="history-item">
              <span className="history-emoji">{CUISINE_EMOJI[h.cuisine] || '🍽️'}</span>
              <div className="history-info">
                <span className="history-name">{h.name}</span>
                <span className="history-meta">{h.cuisine} · {h.mall}</span>
              </div>
              <span className="history-date">{getDaysAgo(h.date)}</span>
            </div>
          ))}
          {history.length > 14 && (
            <p className="history-more">+{history.length - 14} older entries</p>
          )}
        </div>
      )}
    </div>
  );
}
