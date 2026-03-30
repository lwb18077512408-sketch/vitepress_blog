<!-- 鍒嗛〉 -->
<template>
  <div v-if="total > 0" class="pagination">
    <div
      v-if="currentPage > 1"
      class="page-item prev"
      @click="
        jumpPage(
          currentPage === 2 ? `${routePath}` : `${routePath}/pagination/${currentPage - 1}`,
          currentPage === 2 ? 1 : currentPage - 1,
        )
      "
    >
      <i class="iconfont icon-page-right" />
      <span class="page-text">涓婇〉</span>
    </div>
    <div class="page-number">
      <div
        v-for="(item, index) in pageNumber"
        :key="index"
        :class="[item === '...' ? 'point' : 'page-item', { choose: item === currentPage }]"
        @click="jumpPage(item === 1 ? `${routePath}` : `${routePath}/pagination/${item}`, item)"
      >
        <span class="page-num">{{ item }}</span>
      </div>
      <!-- 蹇€熻烦杞?-->
      <div :class="['fast-jump', { focus: inputFocus }]" title="快速跳转">
        <input
          v-model.number="jumpInput"
          :min="1"
          :max="totalPages"
          @focus="inputFocus = true"
          @blur="fastJump"
          @input="validateInput"
          @keydown.enter="fastJump"
        />
        <i :class="['iconfont icon-arrow-right', { click: jumpInput }]" @click.stop="fastJump" />
      </div>
    </div>
    <div
      v-if="currentPage * limit < total"
      class="page-item next"
      @click="jumpPage(`${routePath}/pagination/${currentPage + 1}`, currentPage + 1)"
    >
      <span class="page-text">涓嬮〉</span>
      <i class="iconfont icon-page-right" />
    </div>
  </div>
</template>

<script setup>
const router = useRouter();

// 鍒嗛〉鏁版嵁
const props = defineProps({
  // 鎬绘暟
  total: {
    type: Number,
    default: 0,
  },
  // 褰撳墠椤垫暟
  page: {
    type: Number,
    default: 1,
  },
  // 姣忛〉鏄剧ず鏁伴噺
  limit: {
    type: Number,
    default: 8,
  },
  // 璺宠浆鐩綍
  routePath: {
    type: String,
    default: "",
  },
  // 浣跨敤鍙傛暟
  useParams: {
    type: Boolean,
    default: false,
  },
});

const jumpInput = ref(null);
const inputFocus = ref(false);

// 椤垫暟鏁版嵁
const currentPage = ref(props.page);
const totalPages = computed(() => Math.ceil(props.total / props.limit));

const pageNumber = computed(() => {
  let pages = [];
  const current = currentPage.value;
  const total = totalPages.value;
  const wingSize = 2; // 褰撳墠椤靛墠鍚庤鏄剧ず鐨勯〉鐮佹暟
  let startPage = Math.max(current - wingSize, 2);
  let endPage = Math.min(current + wingSize, total - 1);
  // 总是显示第一页
  pages.push(1);
  // 褰?startPage > 2 鏃讹紝鍓嶉潰闇€瑕佹樉绀虹渷鐣ュ彿
  if (startPage > 2) {
    pages.push("...");
  } else {
    // 濡傛灉 startPage 鏄?2锛屼笉闇€瑕佺渷鐣ュ彿锛岀洿鎺ユ樉绀虹浜岄〉
    startPage = 2;
  }
  // 显示中间范围的页码
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  // 褰?endPage < totalPages-1 鏃讹紝鍚庨潰闇€瑕佹樉绀虹渷鐣ュ彿
  if (endPage < total - 1) {
    pages.push("...");
  } else {
    // 如果 endPage 是 totalPages-1，不需要省略号，直接显示倒数第二页
    if (endPage === total - 1) endPage = total - 1;
  }
  // 总是显示最后一页，除非只有一页
  if (total > 1) pages.push(total);
  return pages;
});

const validateInput = () => {
  const numericValue = Number(jumpInput.value);
  if (!Number.isInteger(numericValue) || numericValue < 1) {
    jumpInput.value = null;
  } else if (numericValue > totalPages.value) {
    jumpInput.value = totalPages.value;
  } else {
    jumpInput.value = numericValue;
  }
};

// 璺宠浆椤甸潰
const jumpPage = (url, page) => {
  // 浣跨敤鍙傛暟璺宠浆
  if (props.useParams) {
    if (page === 1) {
      router.go(`${props.routePath}`);
    } else {
      router.go(`${props.routePath}?page=${page}`);
    }
  }
  // 姝ｅ父璺宠浆
  else {
    router.go(url);
  }
};

const fastJump = () => {
  inputFocus.value = false;
  if (!jumpInput.value) return false;
  jumpPage(
    jumpInput.value === 1 ? `${props.routePath}` : `${props.routePath}/pagination/${jumpInput.value}`,
    jumpInput.value,
  );
};

const checkCurrentPage = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get("page");
  if (page && props.useParams) {
    currentPage.value = Number(page);
  }
};

onMounted(() => {
  checkCurrentPage();
});
</script>

<style lang="scss" scoped>
.pagination {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  height: 40px;
  animation: fade-up 0.6s 0.4s backwards;
  .page-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--main-card-background);
    border: 1px solid var(--main-card-border);
    box-shadow: 0 8px 16px -4px var(--main-border-shadow);
    transition:
      border-color 0.3s,
      box-shadow 0.3s;
    cursor: pointer;
    &.prev,
    &.next {
      position: absolute;
      width: 80px;
      left: 0;
      .iconfont {
        transform: rotate(180deg);
        transition:
          color 0.3s,
          transform 0.3s;
      }
      .page-text {
        opacity: 0;
        margin-left: 4px;
        margin-right: -36px;
        transition:
          opacity 0.3s,
          margin 0.3s;
      }
    }
    &.next {
      left: auto;
      right: 0;
      .iconfont {
        transform: rotate(0);
      }
      .page-text {
        margin-right: 4px;
        margin-left: -36px;
      }
    }
    &:hover {
      border-color: var(--main-color);
      box-shadow: 0 8px 16px -4px var(--main-color-bg);
      .iconfont {
        color: var(--main-color);
      }
      &.prev,
      &.next {
        color: var(--main-color);
        .page-text {
          opacity: 1;
          margin-right: 0;
        }
      }
      &.next {
        .page-text {
          margin-right: 4px;
          margin-left: 0;
        }
      }
    }
  }
  .page-number {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .page-item {
      margin: 0 6px;
      &.choose {
        color: var(--main-card-background);
        border-color: var(--main-color);
        background-color: var(--main-color);
        box-shadow: 0 8px 16px -4px var(--main-color-bg);
      }
    }
    .point {
      margin: 0 4px;
      transform: translateY(-8px);
      font-size: 22px;
    }
    .fast-jump {
      position: relative;
      margin: 0 6px;
      input {
        border: none;
        outline: none;
        background: none;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        padding: 0 8px;
        font-size: 16px;
        color: var(--main-font-color);
        background-color: var(--main-card-background);
        border: 1px solid var(--main-card-border);
        box-shadow: 0 8px 16px -4px var(--main-border-shadow);
        transition: all 0.3s;
      }
      .iconfont {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 5px;
        right: 5px;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        background-color: var(--main-card-background);
        transition:
          color 0.3s,
          opacity 0.3s,
          background-color 0.3s;
        cursor: pointer;
        &:hover {
          color: var(--main-card-background);
          background-color: var(--main-color);
        }
      }
      &.focus,
      &:hover {
        input {
          width: 100px;
          border-color: var(--main-color);
          box-shadow: 0 8px 16px -4px var(--main-color-bg);
        }
        .iconfont {
          opacity: 0.2;
          pointer-events: none;
          &.click {
            opacity: 1;
            pointer-events: all;
          }
        }
      }
    }
  }
  @media (max-width: 768px) {
    .page-number {
      display: none;
    }
    .page-item {
      &:first-child {
        margin-right: 10px;
      }
      &:last-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
