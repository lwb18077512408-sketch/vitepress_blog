<!-- 侧边栏 - 站点数据 -->
<template>
  <div class="site-data s-card">
    <div class="title">
      <i class="iconfont icon-chart"></i>
      <span class="title-name">站点数据</span>
    </div>
    <div class="all-data">
      <div class="data-item">
        <span class="name">
          <i class="iconfont icon-article"></i>
          文章总数
        </span>
        <span class="num">{{ theme.postData?.length || 0 }} 篇</span>
      </div>
      <div class="data-item">
        <span class="name">
          <i class="iconfont icon-date"></i>
          建站天数
        </span>
        <span class="num">{{ daysFromNow(theme.since) }} 天</span>
      </div>
      <div class="data-item">
        <span class="name">
          <i class="iconfont icon-visibility"></i>
          总访问量
        </span>
        <span class="num">{{ pageViews }} 次</span>
      </div>
      <div class="data-item">
        <span class="name">
          <i class="iconfont icon-account"></i>
          独立访客
        </span>
        <span class="num">{{ visitors }} 人</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { daysFromNow } from "@/utils/helper";

const { theme } = useData();
const pageViews = ref(0);
const visitors = ref(0);

function createVisitorId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `uv_${crypto.randomUUID()}`;
  }

  return `uv_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}

function getOrCreateVisitorId() {
  const storageKey = 'visitor_id';
  let visitorId = localStorage.getItem(storageKey);

  if (!visitorId) {
    visitorId = createVisitorId();
    localStorage.setItem(storageKey, visitorId);
  }

  return visitorId;
}

// 获取访问统计数据
async function fetchGitHubStats() {
  try {
    // 从 GitHub Issue 获取页面浏览量
    if (theme.value.github?.owner && theme.value.github?.repo && theme.value.github?.pageViewsIssueId) {
      const owner = theme.value.github.owner;
      const repo = theme.value.github.repo;
      const issueId = theme.value.github.pageViewsIssueId;
      
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issueId}`
      );
      
      if (response.ok) {
        const issue = await response.json();
        // 从 Issue 标题中获取访问数 (格式: "PV: 123")
        const match = issue.title.match(/PV:\s*(\d+)/i);
        if (match) {
          pageViews.value = parseInt(match[1]);
        } else {
          // 如果没有，使用 comments 数作为访问数
          pageViews.value = issue.comments;
        }
      }
    } else {
      // 如果未配置，显示本地存储的访问数
      const localPV = localStorage.getItem('local_pv');
      pageViews.value = localPV ? parseInt(localPV) : 0;
      pageViews.value++;
      localStorage.setItem('local_pv', pageViews.value);
    }
  } catch (error) {
    console.warn('Failed to fetch GitHub stats:', error);
    // 降级方案：使用本地存储
    const localPV = localStorage.getItem('local_pv');
    pageViews.value = localPV ? parseInt(localPV) : 0;
    pageViews.value++;
    localStorage.setItem('local_pv', pageViews.value);
  }
}

async function triggerPvUpdateDispatch() {
  if (!theme.value.github?.owner || !theme.value.github?.repo || !theme.value.github?.pageViewsIssueId) {
    return;
  }

  try {
    const visitorId = getOrCreateVisitorId();
    const payload = {
      event_type: 'update-pv',
      visitor_id: visitorId,
      client_payload: {
        owner: theme.value.github.owner,
        repo: theme.value.github.repo,
        issue_number: theme.value.github.pageViewsIssueId,
        increment: 1,
      },
    };

    const proxyUrl = theme.value.github?.dispatchProxy?.trim();
    const useGitHubApi = !proxyUrl;
    const endpoint = useGitHubApi
      ? `https://api.github.com/repos/${theme.value.github.owner}/${theme.value.github.repo}/dispatches`
      : proxyUrl;

    const response = await fetch(
      endpoint,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github+json',
          'Content-Type': 'application/json',
          ...(useGitHubApi ? { 'X-GitHub-Api-Version': '2022-11-28' } : {}),
          // 仅在直连 GitHub API 且你手动配置了 token 时使用。
          ...(useGitHubApi && theme.value.github.clientToken
            ? { Authorization: `Bearer ${theme.value.github.clientToken}` }
            : {}),
        },
        body: JSON.stringify(payload),
      },
    );

    const result = await response.json().catch(() => null);

    if (result?.uv?.enabled && Number.isFinite(result.uv.total)) {
      visitors.value = result.uv.total;
    } else {
      visitors.value = 1;
    }

    if (!response.ok) {
      console.warn('Dispatch event failed:', response.status, result, 'endpoint:', endpoint);
    }
  } catch (dispatchError) {
    visitors.value = 1;
    console.warn('Dispatch request error:', dispatchError);
  }
}

onMounted(() => {
  fetchGitHubStats();
  triggerPvUpdateDispatch();
});
</script>

<style lang="scss" scoped>
.site-data {
  .all-data {
    .data-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.2rem;
      .name {
        display: flex;
        flex-direction: row;
        align-items: center;
        .iconfont {
          margin-right: 8px;
          opacity: 0.6;
          font-size: 18px;
        }
      }
      .num {
        opacity: 0.8;
        font-size: 15px;
      }
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
}
</style>
