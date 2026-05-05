import { useState, useEffect } from 'react';
import { RESTAURANTS } from '../data/restaurants';

const STORAGE_KEY = 'mv_lunch_history';
const COOLDOWN_DAYS = { hard: 2, medium: 5, soft: 10 };

function getDaysSince(dateStr) {
  return Math.floor((Date.now() - new Date(dateStr)) / 86400000);
}

function scorePenalty(id, history) {
  const recent = history.filter(h => h.id === id);
  if (!recent.length) return 0;
  const days = getDaysSince(recent[0].date);
  if (days < COOLDOWN_DAYS.hard) return 100;
  if (days < COOLDOWN_DAYS.medium) return 60;
  if (days < COOLDOWN_DAYS.soft) return 25;
  return 0;
}

function getCuisineLastUsed(cuisine, history) {
  const match = history.find(h => h.cuisine === cuisine);
  return match ? getDaysSince(match.date) : 999;
}

export function getReason(r, history) {
  const daysSince = getCuisineLastUsed(r.cuisine, history);
  const penalty = scorePenalty(r.id, history);
  const neverVisited = !history.find(h => h.id === r.id);
  if (history.length === 0) return "First pick — start building your history";
  if (neverVisited) return "Never been here — a great first visit";
  if (daysSince > 6) return `No ${r.cuisine} food in over a week`;
  if (daysSince > 3) return `No ${r.cuisine} in ${daysSince} days`;
  if (penalty === 0) return "Back on the rotation after a cooldown";
  if (r.price === 1) return "Budget-friendly option for today";
  if (r.price === 3) return "Treat yourself with a premium lunch";
  return `Good variety for today's rotation`;
}

export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addEntry = (restaurant) => {
    const today = new Date().toISOString().split('T')[0];
    setHistory(prev => [{
      id: restaurant.id,
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      mall: restaurant.mall,
      date: today
    }, ...prev].slice(0, 60));
  };

  const clearHistory = () => setHistory([]);

  return { history, addEntry, clearHistory };
}

export function generateRecommendations(prefs, history) {
  let pool = RESTAURANTS.filter(r => {
    if (prefs.halal === 'halal' && !r.halal) return false;
    if (prefs.cuisine !== 'All' && r.cuisine !== prefs.cuisine) return false;
    if (prefs.budget !== 'all' && r.price !== parseInt(prefs.budget)) return false;
    if (prefs.mall !== 'all' && r.mall !== prefs.mall) return false;
    return true;
  });

  if (!pool.length) return [];

  pool = pool.map(r => ({
    ...r,
    _score: Math.random() * 100 - scorePenalty(r.id, history)
  })).sort((a, b) => b._score - a._score);

  const picks = [];
  const usedCuisines = new Set();

  for (const r of pool) {
    if (picks.length >= 5) break;
    if (usedCuisines.has(r.cuisine) && picks.length < 3) continue;
    picks.push(r);
    usedCuisines.add(r.cuisine);
  }

  for (const r of pool) {
    if (picks.length >= 5) break;
    if (!picks.find(p => p.id === r.id)) picks.push(r);
  }

  return picks;
}
