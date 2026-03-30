<!-- 鏂囩珷椤甸潰 -->
<template>
  <div v-if="postMetaData" class="post">
    <div class="post-meta">
      <div class="meta">
        <div class="categories">
          <a
            v-for="(item, index) in postMetaData.categories"
            :key="index"
            :href="`/portal/categories/${item}`"
            class="cat-item"
          >
            <i class="iconfont icon-folder" />
            <span class="name">{{ item }}</span>
          </a>
        </div>
        <div class="tags">
          <a
            v-for="(item, index) in postMetaData.tags"
            :key="index"
            :href="`/portal/tags/${item}`"
            class="tag-item"
          >
            <i class="iconfont icon-hashtag" />
            <span class="name">{{ item }}</span>
          </a>
        </div>
      </div>
      <h1 class="title">
        {{ postMetaData.title || "未命名文章" }}
      </h1>
      <div class="other-meta">
        <span class="meta date">
          <i class="iconfont icon-date" />
          {{ formatTimestamp(postMetaData.date) }}
        </span>
        <span class="update meta">
          <i class="iconfont icon-time" />
          {{ formatTimestamp(page?.lastUpdated || postMetaData.lastModified) }}
        </span>
        <!-- 鐑害 -->
        <span class="hot meta">
          <i class="iconfont icon-fire" />
          <span id="twikoo_visitors" class="artalk-pv-count">0</span>
        </span>
        <!-- 璇勮鏁?-->
        <span class="chat meta hover" @click="commentRef?.scrollToComments">
          <i class="iconfont icon-chat" />
          <span id="twikoo_comments" class="artalk-comment-count">0</span>
        </span>
      </div>
    </div>
    <div class="post-content">
      <article class="post-article s-card">
        <!-- 杩囨湡鎻愰啋 -->
        <div class="expired s-card" v-if="postMetaData?.expired >= 180">
          鏈枃鍙戣〃浜?<strong>{{ postMetaData?.expired }}</strong> 澶╁墠锛屽叾涓殑淇℃伅鍙兘宸茬粡浜嬭繃澧冭縼
        </div>
        <!-- AI 鎽樿 -->
        <ArticleGPT />
        <!-- 鏂囩珷鍐呭 -->
        <Content id="page-content" class="markdown-main-style" />
        <!-- 鍙傝€冭祫鏂?-->
        <References />
        <!-- 鐗堟潈 -->
        <Copyright v-if="frontmatter.copyright !== false" :postData="postMetaData" />
        <!-- 鍏朵粬淇℃伅 -->
        <div class="other-meta">
          <div class="all-tags">
            <a
              v-for="(item, index) in postMetaData.tags"
              :key="index"
              :href="`/portal/tags/${item}`"
              class="tag-item"
            >
              <i class="iconfont icon-hashtag" />
              <span class="name">{{ item }}</span>
            </a>
          </div>
          <a
            href="https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre"
            class="report"
            target="_blank"
          >
            <i class="iconfont icon-report" />
            反馈与投诉
          </a>
        </div>
        <RewardBtn />
        <!-- 涓嬩竴绡?-->
        <NextPost />
        <!-- 鐩稿叧鏂囩珷 -->
        <RelatedPost />
        <!-- 璇勮 -->
        <Comments ref="commentRef" />
      </article>
      <Aside showToc />
    </div>
  </div>
</template>

<script setup>
import { formatTimestamp } from "@/utils/helper";
import { generateId } from "@/utils/commonTools";
import initFancybox from "@/utils/initFancybox";

const { page, theme, frontmatter } = useData();

// 璇勮鍏冪礌
const commentRef = ref(null);

// 鑾峰彇瀵瑰簲鏂囩珷鏁版嵁
const postMetaData = computed(() => {
  const postId = generateId(page.value.relativePath);
  return theme.value.postData.find((item) => item.id === postId);
});

onMounted(() => {
  initFancybox(theme.value);
});
</script>

<style lang="scss" scoped>
@use "../style/post.scss";

.post {
  width: 100%;
  display: flex;
  flex-direction: column;
  animation: fade-up 0.6s 0.1s backwards;
  .post-meta {
    padding: 2rem 0 3rem 18px;
    width: 100%;
    .meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      .categories {
        margin-right: 12px;
        .cat-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          background-color: var(--main-mask-Inverse-background);
          opacity: 0.8;
          .iconfont {
            margin-right: 6px;
          }
          &:hover {
            color: var(--main-color);
            background-color: var(--main-color-bg);
            .iconfont {
              color: var(--main-color);
            }
          }
        }
      }
      .tags {
        display: flex;
        flex-direction: row;
        align-items: center;
        .tag-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          opacity: 0.8;
          .iconfont {
            margin-right: 4px;
            opacity: 0.6;
            font-weight: normal;
          }
          &:hover {
            color: var(--main-color);
            background-color: var(--main-color-bg);
            .iconfont {
              color: var(--main-color);
            }
          }
        }
      }
    }
    .title {
      font-size: 2.2rem;
      line-height: 1.2;
      color: var(--main-font-color);
      margin: 1.4rem 0;
    }
    .other-meta {
      display: flex;
      flex-direction: row;
      align-items: center;
      .meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 12px;
        font-size: 14px;
        border-radius: 8px;
        opacity: 0.8;
        .iconfont {
          margin-right: 6px;
          transition: color 0.3s;
        }
        &.date {
          padding-left: 0;
        }
        &.hot {
          .iconfont {
            font-size: 18px;
          }
        }
        &.hover {
          transition:
            color 0.3s,
            background-color 0.3s;
          cursor: pointer;
          &:hover {
            color: var(--main-color);
            background-color: var(--main-color-bg);
            .iconfont {
              color: var(--main-color);
            }
          }
        }
      }
    }
  }
  .post-content {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    animation: fade-up 0.6s 0.3s backwards;
    .post-article {
      width: calc(100% - 300px);
      padding: 1rem 2.2rem 2.2rem 2.2rem;
      user-select: text;
      cursor: auto;
      &:hover {
        border-color: var(--main-card-border);
      }
      .expired {
        margin: 1.2rem 0 2rem 0;
        padding: 0.8rem 1.2rem;
        border-left: 6px solid var(--main-warning-color);
        border-radius: 6px 16px 16px 6px;
        user-select: none;
        strong {
          color: var(--main-warning-color);
        }
      }
      .other-meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0;
        opacity: 0.8;
        .all-tags {
          display: flex;
          flex-direction: row;
          align-items: center;
          .tag-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 6px 12px;
            font-size: 14px;
            font-weight: bold;
            border-radius: 8px;
            background-color: var(--main-card-border);
            margin-right: 12px;
            .iconfont {
              margin-right: 4px;
              opacity: 0.6;
              font-weight: normal;
            }
            &:hover {
              color: var(--main-color);
              background-color: var(--main-color-bg);
              .iconfont {
                color: var(--main-color);
              }
            }
          }
        }
        .report {
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 6px 12px;
          font-size: 14px;
          font-weight: bold;
          border-radius: 8px;
          background-color: var(--main-card-border);
          .iconfont {
            margin-right: 6px;
          }
          &:hover {
            color: #efefef;
            background-color: var(--main-error-color);
            .iconfont {
              color: #efefef;
            }
          }
        }
      }
    }
    .main-aside {
      width: 300px;
      padding-left: 0;
      padding-right: 1rem;
    }
    @media (max-width: 1200px) {
      .post-article {
        width: 100%;
      }
      .main-aside {
        display: none;
      }
    }
  }
  @media (max-width: 768px) {
    .post-meta {
      padding: 4rem 1.5rem;
      .meta {
        justify-content: center;
        .categories {
          margin-right: 0;
        }
        .tags {
          display: none;
        }
      }
      .title {
        font-size: 1.6rem;
        text-align: center;
        line-height: 40px;
      }
      .other-meta {
        justify-content: center;
      }
    }
    .post-content {
      .post-article {
        border: none;
        padding: 20px 30px;
        .other-meta {
          margin: 1rem 0 2rem 0;
          flex-direction: column;
          .all-tags {
            flex-wrap: wrap;
            .tag-item {
              margin-top: 12px;
            }
          }
          .report {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>
