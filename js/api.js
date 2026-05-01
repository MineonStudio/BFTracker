const BASE = 'https://api.gametools.network';

// 各游戏支持的平台
export const PLATFORM_LABELS = {
  steam:      'Steam',
  ea:         'EA App',
  epic:       'Epic',
  xbox:       'Xbox（通用）',
  xboxone:    'Xbox One',
  xboxseries: 'Xbox Series',
  psn:        'PlayStation（通用）',
  ps4:        'PS4',
  ps5:        'PS5',
};


// 三大平台分类
export const PLATFORM_CATEGORIES = ['Xbox', 'PlayStation', 'PC'];

// 三大平台 → 细分平台的映射
export const CATEGORY_PLATFORMS = {
  'PC': ['steam', 'ea', 'epic'],
  'Xbox': ['xbox', 'xboxone', 'xboxseries'],
  'PlayStation': ['psn', 'ps4', 'ps5'],
};

// 各游戏在三大分类下支持的细分平台
export const GAME_CATEGORY_PLATFORMS = {
  bf6:    { 'PC': ['steam', 'ea', 'epic'], 'Xbox': ['xbox', 'xboxone', 'xboxseries'], 'PlayStation': ['psn', 'ps4', 'ps5'] },
  bf2042: { 'PC': ['steam', 'ea', 'epic'], 'Xbox': ['xbox', 'xboxone', 'xboxseries'], 'PlayStation': ['psn', 'ps4', 'ps5'] },
  bfv:    { 'PC': ['steam', 'ea', 'epic'], 'Xbox': ['xboxone'],                      'PlayStation': ['ps4'] },
  bf1:    { 'PC': ['steam', 'ea', 'epic'], 'Xbox': ['xboxone'],                      'PlayStation': ['ps4'] },
  bf4:    { 'PC': ['steam', 'ea', 'epic'],                                             'PlayStation': ['ps4'] },
  bf3:    { 'PC': ['steam', 'ea', 'epic'],                                             'PlayStation': ['ps4'] },
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

// stats 接口不认 "steam" 平台，需映射成 "pc"（数据存在 pc/ea 下）
const STATS_PLATFORM = {
  steam: 'pc',
  epic: 'pc',
};
export function mapStatsPlatform(platform) {
  return STATS_PLATFORM[platform] || platform;
}

// 查询玩家战绩
export async function getStats(game, name, platform, personaId) {
  const sp = mapStatsPlatform(platform);
  let url = `${BASE}/${game}/stats/?name=${encodeURIComponent(name)}&platform=${sp}&format_values=false`;
  if (personaId) url += `&personaid=${personaId}`;
  return request(url);
}


// BF6 赛季分离数据
export async function getStatsSeparated(game, name, platform, personaId) {
  const sp = mapStatsPlatform(platform);
  let url = `${BASE}/${game}/separatedstats/?name=${encodeURIComponent(name)}&platform=${sp}`;
  if (personaId) url += `&personaid=${personaId}`;
  return request(url);
}



// 搜索玩家（获取 playerid）
export async function searchPlayer(game, name, platform) {
  return request(`${BASE}/${game}/player/?name=${encodeURIComponent(name)}&platform=${platform}`);
}


// BF2042 玩家名片信息
export async function getInventory(game, name, platform) {
  try {
    const res = await fetch(`${BASE}/${game}/inventory/?name=${encodeURIComponent(name)}&platform=${platform}`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

