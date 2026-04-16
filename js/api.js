const BASE = 'https://api.gametools.network';

// 各游戏支持的平台
export const GAME_PLATFORMS = {
  bf6:    ['xbox', 'pc', 'xboxone', 'xboxseries', 'psn', 'ps4', 'ps5'],
  bf2042: ['xbox', 'pc', 'xboxone', 'xboxseries', 'psn', 'ps4', 'ps5'],
  bfv:    ['xboxone', 'pc', 'ps4'],
  bf1:    ['xboxone', 'pc', 'ps4'],
  bf4:    ['pc', 'ps4'],
  bf3:    ['pc', 'ps4'],
};

export const PLATFORM_LABELS = {
  pc:         'PC',
  xbox:       'Xbox（通用）',
  xboxone:    'Xbox One',
  xboxseries: 'Xbox Series',
  psn:        'PlayStation（通用）',
  ps4:        'PS4',
  ps5:        'PS5',
};

export const GAME_LABELS = {
  bf6:    'Battlefield 6',
  bf2042: 'Battlefield 2042',
  bfv:    'Battlefield V',
  bf1:    'Battlefield 1',
  bf4:    'Battlefield 4',
  bf3:    'Battlefield 3',
};

async function request(url, timeout = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, { signal: controller.signal });
    const data = await res.json();
    if (!res.ok) {
      const msg = data?.errors?.[0]?.message || data?.errors?.[0] || data?.message || data?.detail?.[0]?.msg || '请求失败';
      throw new Error(msg);
    }
    if (data?.hasResults === false) {
      throw new Error('NO_STATS');
    }
    return data;
  } catch (err) {
    if (err.name === 'AbortError') throw new Error('TIMEOUT');
    if (err.message === 'Failed to fetch') throw new Error('NETWORK');
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// 查询玩家战绩
export async function getStats(game, name, platform) {
  return request(`${BASE}/${game}/stats/?name=${encodeURIComponent(name)}&platform=${platform}&format_values=false`);
}

// 查询玩家档案
export async function getProfile(game, name, platform) {
  return request(`${BASE}/${game}/profile/?name=${encodeURIComponent(name)}&platform=${platform}`);
}

// 批量查询（多人对比，传 playerid 数组）
export async function getMultiple(game, playerids) {
  const res = await fetch(`${BASE}/${game}/multiple/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ playerids }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || '批量查询失败');
  return data;
}

// BF6 全局在线人数
export async function getBF6Status() {
  return request(`${BASE}/bf6/status/`);
}

// 搜索玩家（获取 playerid）
export async function searchPlayer(game, name, platform) {
  return request(`${BASE}/${game}/player/?name=${encodeURIComponent(name)}&platform=${platform}`);
}
