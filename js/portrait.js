import * as echarts from 'echarts';
import { formatNum, formatDecimal } from './utils.js';
import { getModeName } from './constants.js';

// 分析玩家数据，生成画像标签
export function analyzePortrait(stats, allData) {
  const tags = [];
  const kd = parseFloat(stats.killDeath) || 0;
  const kpm = parseFloat(stats.killsPerMinute) || 0;
  const accuracy = parseFloat(stats.accuracy) || 0;
  const headshots = parseFloat(stats.headshots) || 0;
  const kills = stats.kills || 0;
  const revives = allData?.revives ?? stats.revives ?? 0;
  const heals = allData?.heals ?? stats.heals ?? 0;
  const resupplies = allData?.resupplies ?? stats.resupplies ?? 0;
  const vehiclesKills = (allData?.vehicles || []).reduce((s, v) => s + (v.kills || 0), 0);
  const meleeKills = (allData?.melee || []).reduce((s, m) => s + (m.kills || 0), 0);
  const assists = stats.killAssists || 0;
  const vehicleKillRatio = kills > 0 ? vehiclesKills / kills : 0;
  const assistRatio = kills > 0 ? assists / kills : 0;
  const nadeKills = stats.dividedKills?.grenades || 0;

  // KD 标签
  if (kd >= 3)      tags.push({ label: '战神',   color: '#22c55e', icon: '⚔️' });
  else if (kd >= 2) tags.push({ label: '精英',   color: '#86efac', icon: '🎯' });
  else if (kd >= 1) tags.push({ label: '老兵',   color: '#facc15', icon: '🪖' });

  // 射速标签
  if (kpm >= 1.5)   tags.push({ label: '冲锋狂魔', color: '#ff4655', icon: '⚡' });
  else if (kpm >= 1) tags.push({ label: '活跃',    color: '#fb923c', icon: '💨' });

  // 精准标签
  if (accuracy >= 25 && headshots >= 20) tags.push({ label: '神枪手', color: '#a78bfa', icon: '🎯' });
  else if (accuracy >= 20) tags.push({ label: '精准射手', color: '#a78bfa', icon: '🎯' });

  // 团队标签
  if (revives >= 100 || heals >= 100) tags.push({ label: '团队之盾', color: '#60a5fa', icon: '🛡️' });
  if (resupplies >= 500) tags.push({ label: '后勤大师', color: '#60a5fa', icon: '📦' });

  // 载具标签
  if (vehicleKillRatio >= 0.3) tags.push({ label: '载具达人', color: '#34d399', icon: '🚁' });
  if (meleeKills >= 30) tags.push({ label: '近战狂人', color: '#f472b6', icon: '🔪' });
  if (nadeKills >= 30) tags.push({ label: '爆破专家', color: '#f97316', icon: '💣' });

  // 六维数据（归一化到 0-100）
  const maxKd = 5;
  const maxKpm = 3;
  const dims = {
    kill:     Math.min(kd / maxKd, 1) * 100,
    survival: Math.min((kd + stats.deaths > 0 ? (kills / (kills + stats.deaths)) * 2 : 0.5), 1) * 100,
    support:  Math.min((revives + heals + resupplies) / 1000, 1) * 100,
    vehicle:  Math.min(vehicleKillRatio * 3, 1) * 100,
    objective:Math.min((parseFloat(stats.winPercent) || 50) / 100, 1) * 100,
    accuracy: Math.min(accuracy / 35, 1) * 100,
  };

  return { tags, dims };
}

// 渲染画像面板
export function renderPortrait(container, stats, allData) {
  const { tags, dims } = analyzePortrait(stats, allData);

  // 兵种分布
  const classes = (allData?.classes || []).filter(c => c.kills > 0)
    .sort((a, b) => b.kills - a.kills);
  const totalClassKills = classes.reduce((s, c) => s + c.kills, 0);

  // 标志性武器 Top 3
  const topWeapons = (allData?.weapons || [])
    .filter(w => w.kills > 0)
    .sort((a, b) => b.kills - a.kills)
    .slice(0, 3);

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 左：雷达图 -->
      <div class="lg:col-span-2 bg-card rounded-xl p-5">
        <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">六维能力</h2>
        <div id="portraitRadar" class="radar-box" style="height:340px"></div>
      </div>

      <!-- 右：标签 + 风格 -->
      <div class="space-y-6">
        <!-- 标签 -->
        <div class="bg-card rounded-xl p-5">
          <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">玩家标签</h2>
          <div class="flex flex-wrap gap-2">
            ${tags.length ? tags.map(t =>
              `<span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium" style="background:${t.color}22;color:${t.color};border:1px solid ${t.color}44">
                ${t.icon} ${t.label}
              </span>`
            ).join('') : '<span class="text-gray-500 text-xs">数据不足</span>'}
          </div>
        </div>

        <!-- 兵种分布 -->
        <div class="bg-card rounded-xl p-5">
          <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">兵种风格</h2>
          <div class="space-y-3">
            ${classes.map(c => {
              const pct = totalClassKills > 0 ? (c.kills / totalClassKills * 100) : 0;
              const className = {
                'Assault': '突击兵', 'Engineer': '工程师',
                'Support': '支援兵', 'Recon': '侦察兵',
                'Specialist': '特种兵', 'Commander': '指挥官',
              }[c.className] || c.className;
              const colors = {
                'Assault': '#ff4655', 'Engineer': '#fb923c',
                'Support': '#22c55e', 'Recon': '#a78bfa',
                'Specialist': '#60a5fa', 'Commander': '#facc15',
              };
              const color = colors[c.className] || '#6b7280';
              return `
                <div>
                  <div class="flex justify-between text-xs mb-1">
                    <span class="text-gray-300">${className}</span>
                    <span class="text-gray-500">${formatNum(c.kills)} 击杀</span>
                  </div>
                  <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all" style="width:${pct}%;background:${color}"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- 标志性武器 -->
    ${topWeapons.length ? `
    <div class="bg-card rounded-xl p-5 mt-6">
      <h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">标志性武器</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        ${topWeapons.map((w, i) => {
          const medals = ['🥇', '🥈', '🥉'];
          const kd = (w.deaths || 1) > 0 ? (w.kills / (w.deaths || 1)).toFixed(2) : '—';
          return `
            <div class="bg-dark rounded-xl p-4 text-center">
              <p class="text-2xl mb-1">${medals[i]}</p>
              <p class="text-white font-semibold text-sm truncate">${w.weaponName}</p>
              <div class="flex justify-center gap-4 mt-2 text-xs text-gray-400">
                <span>${formatNum(w.kills)} 杀</span>
                <span>KD ${kd}</span>
                <span>${formatDecimal(w.killsPerMinute ?? w.kpm)} KPM</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>` : ''}
  `;

  // 渲染雷达图
  requestAnimationFrame(() => {
    const chart = echarts.init(document.getElementById('portraitRadar'), 'dark');
    chart.setOption({
      backgroundColor: 'transparent',
      radar: {
        indicator: [
          { name: '击杀',   max: 100 },
          { name: '生存',   max: 100 },
          { name: '支援',   max: 100 },
          { name: '载具',   max: 100 },
          { name: '目标',   max: 100 },
          { name: '精准',   max: 100 },
        ],
        axisName: { color: '#d1d5db', fontSize: 12 },
        splitLine: { lineStyle: { color: '#374151' } },
        splitArea: { areaStyle: { color: ['rgba(55,65,81,.1)', 'rgba(55,65,81,.2)'] } },
        center: ['50%', '50%'],
        radius: '65%',
      },
      series: [{
        type: 'radar',
        data: [{
          value: [dims.kill, dims.survival, dims.support, dims.vehicle, dims.objective, dims.accuracy],
          name: '玩家画像',
          lineStyle: { color: '#ff4655', width: 2 },
          areaStyle: { color: 'rgba(255,70,85,.2)' },
          itemStyle: { color: '#ff4655' },
        }],
        symbol: 'circle',
        symbolSize: 6,
      }],
      tooltip: {
        backgroundColor: '#242933', borderColor: '#374151', textStyle: { color: '#f3f4f6' },
        formatter: p => {
          const labels = ['击杀', '生存', '支援', '载具', '目标', '精准'];
          return p.value.map((v, i) =>
            `<span style="color:#ff4655">●</span> ${labels[i]}: <strong>${Math.round(v)}</strong>`
          ).join('<br>');
        },
      },
    });
    window.addEventListener('resize', () => chart.resize());
  });
}
