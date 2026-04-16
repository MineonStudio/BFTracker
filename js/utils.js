// 格式化秒数为易读字符串（始终以小时为单位）
export function formatSeconds(seconds) {
  if (!seconds) return '0小时';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}小时 ${m}分`;
  return `${m}分钟`;
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

// 时间戳转日期字符串
export function formatDate(ts) {
  const d = new Date(ts);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// KD 颜色分级
export function kdColor(kd) {
  const v = parseFloat(kd);
  if (v >= 3)   return '#22c55e';  // 绿
  if (v >= 2)   return '#86efac';  // 浅绿
  if (v >= 1)   return '#facc15';  // 黄
  if (v >= 0.5) return '#fb923c';  // 橙
  return '#f87171';                // 红
}

// 胜率颜色分级
export function winColor(pct) {
  const v = parseFloat(pct);
  if (v >= 60) return '#22c55e';
  if (v >= 50) return '#86efac';
  if (v >= 40) return '#facc15';
  return '#fb923c';
}

// 从 URL 参数获取查询参数
export function getUrlParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    game: p.get('game') || 'bf6',
    name: p.get('name') || '',
  };
}

// 构建跳转 URL
export function buildPlayerUrl(game, name) {
  return `player.html?game=${encodeURIComponent(game)}&name=${encodeURIComponent(name)}`;
}
