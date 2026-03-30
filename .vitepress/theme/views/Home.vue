<!-- 棣栭〉 -->
<template>
  <div class="home">
    <Banner v-if="showHeader" :height="store.bannerType" />
    <div class="home-content">
      <div class="posts-content">
        <!-- 鍒嗙被鎬昏 -->
        <TypeBar :type="showTags ? 'tags' : 'categories'" />
        <!-- 鏂囩珷鍒楄〃 -->
        <PostList :listData="postData" />
        <!-- 鍒嗛〉 -->
        <Pagination
          :total="allListTotal"
          :page="Number(page)"
          :limit="postSize"
          :useParams="showCategories || showTags ? true : false"
          :routePath="
            showCategories
              ? `/portal/categories/${showCategories}`
              : showTags
                ? `/portal/tags/${showTags}`
                : ''
          "
        />
      </div>
      <!-- 渚ц竟鏍?-->
      <Aside />
    </div>
  </div>
</template>

<script setup>
import { mainStore } from "@/store";

const { theme } = useData();
const store = mainStore();
const props = defineProps({
  // 鏄剧ず棣栭〉澶撮儴
  showHeader: {
    type: Boolean,
    default: false,
  },
  // 褰撳墠椤垫暟
  page: {
    type: Number,
    default: 1,
  },
  // 鏄剧ず鍒嗙被
  showCategories: {
    type: [null, String],
    default: null,
  },
  // 鏄剧ず鏍囩
  showTags: {
    type: [null, String],
    default: null,
  },
});

const postSize = theme.value.postSize;

const allListTotal = computed(() => {
  const data = props.showCategories
    ? theme.value.categoriesData[props.showCategories]?.articles
    : props.showTags
      ? theme.value.tagsData[props.showTags]?.articles
      : theme.value.postData;
  // 杩斿洖鏁伴噺
  return data ? data.length : 0;
});

// 鑾峰緱褰撳墠椤垫暟
const getCurrentPage = () => {
  if (props.showCategories || props.showTags) {
    if (typeof window === "undefined") return 0;
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (!page) return 0;
    const currentPage = Number(page);
    return currentPage ? currentPage - 1 : 0;
  }
  return props.page ? props.page - 1 : 0;
};

// 鏍规嵁椤垫暟璁＄畻鍒楄〃鏁版嵁
const postData = computed(() => {
  const page = getCurrentPage();
  console.log("当前页数：", page);
  let data = null;
  // 鍒嗙被鏁版嵁
  if (props.showCategories) {
    data = theme.value.categoriesData[props.showCategories]?.articles;
  }
  // 鏍囩鏁版嵁
  else if (props.showTags) {
    data = theme.value.tagsData[props.showTags]?.articles;
  }
  // 鏂囩珷鏁版嵁
  else {
    data = theme.value.postData;
  }
  // 杩斿洖鍒楄〃
  return data ? data.slice(page * postSize, page * postSize + postSize) : [];
});

// 鎭㈠婊氬姩浣嶇疆
const restoreScrollY = (val) => {
  if (typeof window === "undefined" || val) return false;
  const scrollY = store.lastScrollY;
  nextTick().then(() => {
    console.log("滚动位置：", scrollY);
    // 骞虫粦婊氬姩
    window.scrollTo({
      top: scrollY,
      behavior: "smooth",
    });
    // 娓呴櫎婊氬姩浣嶇疆
    store.lastScrollY = 0;
  });
};

// 鐩戝惉鍔犺浇缁撴潫
watch(
  () => store.loadingStatus,
  (val) => restoreScrollY(val),
);
</script>

<style lang="scss" scoped>
.home {
  .home-content {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    .posts-content {
      width: calc(100% - 300px);
      transition: width 0.3s;
    }
    .main-aside {
      width: 300px;
      padding-left: 0;
      padding-right: 1rem;
    }
    @media (max-width: 1200px) {
      .posts-content {
        width: 100%;
      }
      .main-aside {
        display: none;
      }
    }
  }
}
</style>
