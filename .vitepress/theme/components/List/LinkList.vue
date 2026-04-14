<template>
  <Transition name="fade" mode="out-in">
    <div v-if="listData?.length" class="link-list">
      <div v-for="(type, index) in listData" :key="index" class="link-type-list">
        <div class="title">
          <h2 class="name">
            <span class="name-text">{{ type?.typeName || "未知分组" }}</span>
            <span v-if="showCount" class="name-count">（{{ type?.typeList?.length || 0 }}）</span>
          </h2>
          <span class="tip">{{ type?.typeDesc || "分组暂无简介" }}</span>
        </div>
        <div class="all-link" v-if="type?.typeList">
          <a
            v-for="(link, index) in type.typeList"
            :class="[
              'link-card',
              's-card',
              {
                loss: type?.type === 'loss',
                'cf-friends-link': type?.type !== 'loss' && useFriendsLink,
              },
            ]"
            :key="index"
            :href="type?.type !== 'loss' ? link.url : null"
            target="_blank"
          >
            <div class="cover">
              <LazyLoader :useFriendsLink="getAvatarSrc(link)">
                <img
                  v-avatar-guard
                  :src="getAvatarSrc(link)"
                  :class="['cover-img', { 'cf-friends-avatar': useFriendsLink }]"
                  :style="getAvatarStyle(link)"
                  :alt="link?.name || 'cover'"
                  @load="onAvatarLoad"
                  @error="(e) => onAvatarError(e, link)"
                />
              </LazyLoader>
            </div>
            <div class="data">
              <span :class="['name', { 'cf-friends-name': useFriendsLink }]">{{ link.name }}</span>
              <span class="desc">{{ link.desc }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div v-else class="no-data">暂无友链数据</div>
  </Transition>
</template>

<script setup>
const DEFAULT_LINK_AVATAR = "/images/logo/browser.png";
const AVATAR_HARD_FALLBACK_MS = 5000;
const avatarGuardTimers = new WeakMap();

const clearAvatarGuardTimer = (img) => {
  const timer = avatarGuardTimers.get(img);
  if (timer) {
    clearTimeout(timer);
    avatarGuardTimers.delete(img);
  }
};

const startAvatarGuardTimer = (img) => {
  if (!img) return;
  clearAvatarGuardTimer(img);
  const timer = setTimeout(() => {
    if (img.classList.contains("loaded")) return;
    img.dataset.avatarCandidateIndex = "0";
    img.setAttribute("src", DEFAULT_LINK_AVATAR);
    img.classList.add("loaded");
    clearAvatarGuardTimer(img);
  }, AVATAR_HARD_FALLBACK_MS);
  avatarGuardTimers.set(img, timer);
};

const vAvatarGuard = {
  mounted(el) {
    startAvatarGuardTimer(el);
  },
  unmounted(el) {
    clearAvatarGuardTimer(el);
  },
};

const normalizeUrl = (value) => {
  return typeof value === "string" ? value.trim() : "";
};

const getHostname = (url) => {
  try {
    const normalized = normalizeUrl(url);
    return normalized ? new URL(normalized).hostname : "";
  } catch {
    return "";
  }
};

const getOriginFavicon = (url) => {
  try {
    const normalized = normalizeUrl(url);
    return normalized ? `${new URL(normalized).origin}/favicon.ico` : "";
  } catch {
    return "";
  }
};

const buildAvatarCandidates = (link = {}) => {
  const hostname = getHostname(link?.url);
  const candidates = [
    normalizeUrl(link?.avatar),
    normalizeUrl(link?.ico),
    getOriginFavicon(link?.url),
    hostname ? `https://icons.duckduckgo.com/ip3/${hostname}.ico` : "",
    hostname ? `https://www.google.com/s2/favicons?domain=${hostname}&sz=128` : "",
    DEFAULT_LINK_AVATAR,
  ].filter(Boolean);

  return [...new Set(candidates)];
};

const getAvatarSrc = (link) => {
  const candidates = buildAvatarCandidates(link);
  return candidates[0] || DEFAULT_LINK_AVATAR;
};

const getAvatarStyle = (link = {}) => {
  const avatarBg = normalizeUrl(link?.avatarBg);
  return {
    backgroundColor: avatarBg || "var(--main-card-background)",
  };
};

const onAvatarLoad = (e) => {
  clearAvatarGuardTimer(e.target);
  e.target.dataset.avatarCandidateIndex = "0";
  e.target.classList.add("loaded");
};

const onAvatarError = (e, link) => {
  const img = e?.target;
  if (!img) return;

  const candidates = buildAvatarCandidates(link);
  const currentIndex = Number(img.dataset.avatarCandidateIndex || 0);
  const nextIndex = currentIndex + 1;
  const nextSrc = candidates[nextIndex] || "";

  if (nextSrc) {
    img.dataset.avatarCandidateIndex = String(nextIndex);
    img.setAttribute("src", nextSrc);
    startAvatarGuardTimer(img);
    return;
  }

  // 避免所有图标源都失败时头像一直透明不可见
  clearAvatarGuardTimer(img);
  img.dataset.avatarCandidateIndex = String(Math.max(candidates.length - 1, 0));
  img.setAttribute("src", DEFAULT_LINK_AVATAR);
  img.classList.add("loaded");
};

const props = defineProps({
  // 列表数据
  listData: {
    type: [Array, String],
    default: () => [],
  },
  // 显示数量
  showCount: {
    type: Boolean,
    default: true,
  },
  // 友链朋友圈
  useFriendsLink: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.link-list {
  .link-type-list {
    margin-top: 2rem;
    .title {
      margin-left: 6px;
      margin-bottom: 1.6rem;
      .name {
        border-bottom: none;
        margin-bottom: 4px;
        .name-count {
          color: var(--main-font-second-color);
        }
      }
      .tip {
        color: var(--main-font-second-color);
      }
    }
    .all-link {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(5, 1fr);
      .link-card {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 90px;
        width: 100%;
        padding: 12px;
        &.loss {
          pointer-events: none;
        }
        .cover {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          min-width: 60px;
          margin-right: 20px;
          border-radius: 50%;
          overflow: hidden;
          background: linear-gradient(
            90deg,
            var(--main-card-border) 25%,
            var(--main-card-background) 37%,
            var(--main-card-border) 63%
          );
          background-size: 400% 100%;
          animation: skeleton-loading 1.4s ease infinite;
          transition: all 0.6s;
          .cover-img {
            width: 100%;
            height: 100%;
            background-color: var(--main-card-background);
            opacity: 0;
            filter: blur(10px);
            transition:
              filter 0.3s,
              opacity 0.3s;
            &.loaded {
              opacity: 1;
              filter: blur(0);
            }
          }
        }
        .data {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .name {
            font-weight: bold;
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            line-clamp: 1;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            white-space: nowrap;
          }
          .desc {
            font-size: 15px;
            margin-top: 4px;
            line-height: 1.2;
            color: var(--main-font-second-color);
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            line-clamp: 2;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            transition:
              color 0.3s,
              opacity 0.3s;
          }
        }
        &:hover {
          color: var(--main-card-background);
          background-color: var(--main-color);
          border-color: var(--main-color);
          box-shadow: 0 0 16px 6px var(--main-color-bg);
          .cover {
            margin-right: 6px;
            min-width: 0;
            opacity: 0;
            width: 0;
            height: 0;
          }
          .data {
            .desc {
              opacity: 0.7;
              color: var(--main-card-background);
            }
          }
        }
      }
      @media (max-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
      }
      @media (max-width: 992px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (max-width: 576px) {
        grid-template-columns: 1fr;
      }
    }
  }
}
.no-data {
  text-align: center;
  margin-top: 40px;
  font-size: 1.4rem;
  font-weight: bold;
}
</style>
