const HISTORY_KEY = (game, platform, name) =>
  `bf_history_${game}_${platform}_${name.toLowerCase()}`;

const RECENT_KEY = 'bf_recent_searches';
const API_CACHE_KEY = (game, platform, name) =>
  `bf_cache_${game}_${platform}_${name.toLowerCase()}`;
const MAX_RECENT = 8;
const MAX_SNAPSHOTS = 30;
const CACHE_TTL = 5 * 60 * 1000; // 5分钟缓存

// 保存 API 数据到缓存
export function saveApiCache(game, platform, name, data) {
  const key = API_CACHE_KEY(game, platform, name);
  const cache = {
    ts: Date.now(),
    data,
  };
  try {
    localStorage.setItem(key, JSON.stringify(cache));
  } catch (e) {
    console.warn('Cache save failed:', e);
  }
}

// 获取 API 缓存数据
export function getApiCache(game, platform, name) {
  const key = API_CACHE_KEY(game, platform, name);
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const { ts, data } = JSON.parse(cached);
    // 检查是否过期
    if (Date.now() - ts > CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

// 保存一次战绩快照
export function saveSnapshot(game, platform, name, stats) {
  const key = HISTORY_KEY(game, platform, name);
  const history = getHistory(game, platform, name);
  const snapshot = {
    ts: Date.now(),
    kd: stats.killDeath,
    infantryKd: stats.infantryKillDeath,
    winRate: parseFloat(stats.winPercent) || (stats.wins / (stats.wins + stats.loses) * 100),
    kpm: stats.killsPerMinute,
    accuracy: parseFloat(stats.accuracy),
    kills: stats.kills,
    deaths: stats.deaths,
    matchesPlayed: stats.matchesPlayed,
    timePlayed: stats.secondsPlayed,
  };
  history.push(snapshot);
  // 最多保留 MAX_SNAPSHOTS 条
  if (history.length > MAX_SNAPSHOTS) history.splice(0, history.length - MAX_SNAPSHOTS);
  localStorage.setItem(key, JSON.stringify(history));
}

// 获取历史快照列表
export function getHistory(game, platform, name) {
  const key = HISTORY_KEY(game, platform, name);
  try {
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

// 保存最近搜索记录
export function saveRecentSearch(game, platform, name) {
  const list = getRecentSearches();
  const item = { game, platform, name, ts: Date.now() };
  // 去重
  const filtered = list.filter(
    r => !(r.game === game && r.platform === platform && r.name.toLowerCase() === name.toLowerCase())
  );
  filtered.unshift(item);
  if (filtered.length > MAX_RECENT) filtered.length = MAX_RECENT;
  localStorage.setItem(RECENT_KEY, JSON.stringify(filtered));
}

// 获取最近搜索记录
export function getRecentSearches() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

// 清空某玩家历史
export function clearHistory(game, platform, name) {
  localStorage.removeItem(HISTORY_KEY(game, platform, name));
}

// 删除单条最近搜索
export function removeRecentSearch(game, name) {
  const list = getRecentSearches().filter(
    r => !(r.game === game && r.name.toLowerCase() === name.toLowerCase())
  );
  localStorage.setItem(RECENT_KEY, JSON.stringify(list));
}

// 清空全部最近搜索
export function clearRecentSearches() {
  localStorage.removeItem(RECENT_KEY);
}
