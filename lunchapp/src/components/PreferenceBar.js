import React from 'react';
import { CUISINES } from '../data/restaurants';

export default function PreferenceBar({ prefs, onChange }) {
  const set = (key, val) => onChange(prev => ({ ...prev, [key]: val }));

  return (
    <div className="pref-grid">
      <div className="pref-group">
        <label className="pref-label">Dietary</label>
        <select className="pref-select" value={prefs.halal} onChange={e => set('halal', e.target.value)}>
          <option value="all">No restriction</option>
          <option value="halal">Halal only</option>
        </select>
      </div>

      <div className="pref-group">
        <label className="pref-label">Cuisine</label>
        <select className="pref-select" value={prefs.cuisine} onChange={e => set('cuisine', e.target.value)}>
          {CUISINES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="pref-group">
        <label className="pref-label">Budget</label>
        <select className="pref-select" value={prefs.budget} onChange={e => set('budget', e.target.value)}>
          <option value="all">Any budget</option>
          <option value="1">Budget (under RM15)</option>
          <option value="2">Mid-range (RM15–40)</option>
          <option value="3">Premium (RM40+)</option>
        </select>
      </div>

      <div className="pref-group">
        <label className="pref-label">Mall</label>
        <select className="pref-select" value={prefs.mall} onChange={e => set('mall', e.target.value)}>
          <option value="all">Both malls</option>
          <option value="MVM">Mid Valley Megamall</option>
          <option value="Gardens">The Gardens Mall</option>
        </select>
      </div>
    </div>
  );
}
