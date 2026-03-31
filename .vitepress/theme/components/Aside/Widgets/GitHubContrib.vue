<!-- 侧边栏 - GitHub 贡献图（本周/本月） -->
<template>
  <div class="github-contrib s-card">
    <div class="title">
      <i class="iconfont icon-github"></i>
      <span class="title-name">GitHub 贡献</span>
    </div>

    <div v-if="resolvedUsername" class="toolbar">
      <button class="mode-btn" :class="{ active: mode === 'week' }" @click="mode = 'week'">本周</button>
      <button class="mode-btn" :class="{ active: mode === 'month' }" @click="mode = 'month'">本月</button>
      
    </div>

    <div v-if="resolvedUsername && !loadError" class="heatmap-wrap">
      <div class="heatmap" :class="modeClass">
        <div
          v-for="day in displayDays"
          :key="day.date"
          class="cell"
          :class="`level-${getLevel(day.count)}`"
          :title="`${day.date}：${day.count} 次`"
        ></div>
      </div>

      <div class="axis" :class="modeClass">
        <span v-for="(label, index) in axisLabels" :key="`axis-${index}`">{{ label }}</span>
      </div>


      <div class="meta">{{ periodLabel }}共 {{ totalInPeriod }} 次贡献</div>
    </div>

    <div v-else-if="resolvedUsername && loadError" class="chart-tip">
      获取贡献数据失败，点击查看
      <a :href="`https://github.com/${resolvedUsername}`" target="_blank" rel="noopener noreferrer">GitHub 主页</a>。
    </div>

    <div v-else class="chart-tip">未配置 GitHub 用户名，请在 aside.githubContrib.username 或 github.owner 中设置。</div>
  </div>
</template>

<script setup>
const { theme } = useData();

const mode = ref("month");
const loadError = ref(false);
const countsByDay = ref({});

const resolvedUsername = computed(() => {
  return theme.value?.aside?.githubContrib?.username || theme.value?.github?.owner || "";
});

const defaultMode = computed(() => {
  const configured = theme.value?.aside?.githubContrib?.defaultMode;
  return configured === "week" || configured === "month" ? configured : "month";
});

const periodDays = computed(() => (mode.value === "week" ? 7 : 30));
const periodLabel = computed(() => (mode.value === "week" ? "本周" : "本月"));
const modeClass = computed(() => (mode.value === "week" ? "week" : "month"));

const displayDays = computed(() => {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = periodDays.value - 1; i >= 0; i -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = formatDate(d);
    days.push({ date: key, count: countsByDay.value[key] || 0 });
  }
  return days;
});

const axisLabels = computed(() => {
  if (!displayDays.value.length) return [];
  if (mode.value === "week") {
    return displayDays.value.map((d) => d.date.slice(5));
  }
  const first = displayDays.value[0]?.date?.slice(5);
  const middle = displayDays.value[Math.floor(displayDays.value.length / 2)]?.date?.slice(5);
  const last = displayDays.value[displayDays.value.length - 1]?.date?.slice(5);
  return [first, middle, last].filter(Boolean);
});

const maxCount = computed(() => {
  let max = 0;
  for (const d of displayDays.value) {
    if (d.count > max) max = d.count;
  }
  return max;
});

const totalInPeriod = computed(() => {
  let total = 0;
  for (const d of displayDays.value) {
    total += d.count;
  }
  return total;
});

function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getLevel(count) {
  if (count <= 0) return 0;
  const max = maxCount.value || 1;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

async function fetchEvents() {
  if (!resolvedUsername.value) return;

  try {
    loadError.value = false;
    const map = {};
    // 三页已足够覆盖本周/本月统计，避免过多请求
    for (let page = 1; page <= 3; page += 1) {
      const resp = await fetch(
        `https://api.github.com/users/${resolvedUsername.value}/events/public?per_page=100&page=${page}`,
      );
      if (!resp.ok) {
        throw new Error(`GitHub API ${resp.status}`);
      }

      const events = await resp.json();
      if (!Array.isArray(events) || events.length === 0) {
        break;
      }

      for (const event of events) {
        if (!event?.created_at) continue;
        const dateKey = event.created_at.slice(0, 10);
        map[dateKey] = (map[dateKey] || 0) + 1;
      }
    }
    countsByDay.value = map;
  } catch (error) {
    loadError.value = true;
    console.warn("Fetch GitHub events failed:", error);
  }
}

watch(resolvedUsername, () => {
  fetchEvents();
}, { immediate: true });

watch(defaultMode, (value) => {
  mode.value = value;
}, { immediate: true });
</script>

<style lang="scss" scoped>
.github-contrib {
  .toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }

  .mode-btn {
    border: none;
    padding: 4px 10px;
    border-radius: 8px;
    cursor: pointer;
    background: var(--main-card-second-background);
    color: var(--main-font-second-color);
    font-size: 12px;
    transition: all 0.2s ease;
  }

  .mode-btn.active {
    background: var(--main-color);
    color: #222;
    font-weight: 600;
  }

  .profile-link {
    margin-left: auto;
    font-size: 12px;
    opacity: 0.8;
  }

  .heatmap-wrap {
    overflow-x: auto;
  }

  .heatmap {
    display: grid;
    gap: 4px;
  }

  .heatmap.week {
    grid-template-columns: repeat(7, 1fr);
  }

  .heatmap.month {
    grid-template-columns: repeat(10, 1fr);
  }

  .axis {
    margin-top: 6px;
    font-size: 11px;
    opacity: 0.6;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .legend {
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    opacity: 0.8;
  }

  .legend-text {
    margin: 0 2px;
  }

  .legend-cell {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.08);
  }

  .cell {
    aspect-ratio: 1 / 1;
    border-radius: 3px;
    background: var(--main-card-border);
  }

  .cell.level-1,
  .legend-cell.level-1 {
    background: color-mix(in srgb, var(--main-color) 35%, transparent);
  }

  .cell.level-2,
  .legend-cell.level-2 {
    background: color-mix(in srgb, var(--main-color) 55%, transparent);
  }

  .cell.level-3,
  .legend-cell.level-3 {
    background: color-mix(in srgb, var(--main-color) 75%, transparent);
  }

  .cell.level-4,
  .legend-cell.level-4 {
    background: color-mix(in srgb, var(--main-color) 95%, transparent);
  }

  .meta {
    margin-top: 8px;
    font-size: 12px;
    opacity: 0.75;
  }

  .chart-tip {
    opacity: 0.7;
    font-size: 13px;
    line-height: 1.6;
  }
}
</style>