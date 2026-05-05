import React from 'react';
import { getReason } from '../hooks/useRecommendations';
import { PRICE_LABELS } from '../data/restaurants';

const CUISINE_EMOJI = {
  Malay: '🍛', Chinese: '🥢', Japanese: '🍣', Korean: '🥩',
  Western: '🍔', Indian: '🫓', Thai: '🍜', Italian: '🍝',
  Fusion: '✨', Cafe: '☕'
};

export default function RecommendationCard({ restaurant: r, rank, history, isPicked, onPick }) {
  const reason = getReason(r, history);
  const wasRecentlyVisited = history.some(h => h.id === r.id);

  return (
    <div className={`rec-card ${isPicked ? 'rec-card--picked' : ''}`}>
      <div className="rec-rank">{rank}</div>
      <div className="rec-body">
        <div className="rec-top">
          <span className="rec-emoji">{CUISINE_EMOJI[r.cuisine] || '🍽️'}</span>
          <div className="rec-name-block">
            <h3 className="rec-name">{r.name}</h3>
            <p className="rec-meta">{r.cuisine} · {r.mall} · {r.floor}</p>
          </div>
        </div>

        <div className="rec-badges">
          <span className={`badge badge--${r.halal ? 'halal' : 'nonhalal'}`}>
            {r.halal ? '✓ Halal' : 'Non-halal'}
          </span>
          <span className={`badge badge--price${r.price}`}>
            {PRICE_LABELS[r.price]} · {r.priceLabel}
          </span>
          {wasRecentlyVisited && (
            <span className="badge badge--visited">Visited before</span>
          )}
        </div>

        <p className="rec-desc">{r.desc}</p>
        <div className="rec-reason">💡 {reason}</div>
      </div>

      <div className="rec-action">
        {isPicked ? (
          <div className="picked-badge">✓ Picked!</div>
        ) : (
          <button className="btn-pick" onClick={() => onPick(r)}>
            We're going here
          </button>
        )}
      </div>
    </div>
  );
}
