// 格式化秒数为易读字符串（始终以小时为单位）
export function formatSeconds(seconds) {
  if (!seconds) return '0小时';
  const h = Math.floor(seconds / 3600);
  return `${h}小时`;
}

// 格式化大数字（加千分位）
export function formatNum(n) {
  if (n == null) return '-';
  return Number(n).toLocaleString('zh-CN');
}

// 格式化百分比
export function formatPct(v) {
  if (v == null) return '-';
  const n = parseFloat(v);
  return isNaN(n) ? v : n.toFixed(2) + '%';
}

// 格式化小数
export function formatDecimal(v, digits = 2) {
  if (v == null) return '-';
  return parseFloat(v).toFixed(digits);
}


// KD 颜色分级（红 = 高 = 危险）
export function kdColor(kd) {
  const v = parseFloat(kd);
  if (v >= 2)   return '#60a5fa';  // 红
  if (v >= 1)   return '#facc15';  // 黄
  return '#22c55e';                // 绿
}

// 胜率颜色分级（红 = 高胜率 = 强）
export function winColor(pct) {
  const v = parseFloat(pct);
  if (v >= 60) return '#60a5fa';
  if (v >= 30) return '#facc15';
  return '#22c55e';
}

// 从 URL 参数获取查询参数
export function getUrlParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    game: p.get('game') || 'bf6',
    name: p.get('name') || '',
    platform: p.get('platform') || 'Xbox',
  };
}

// 构建跳转 URL
export function buildPlayerUrl(game, name, platform = 'Xbox') {
  return `player.html?game=${encodeURIComponent(game)}&platform=${encodeURIComponent(platform)}&name=${encodeURIComponent(name)}`;
}

// 防抖函数

