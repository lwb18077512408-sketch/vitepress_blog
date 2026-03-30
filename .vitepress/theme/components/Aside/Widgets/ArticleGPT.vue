<!-- AI 鎽樿锛堝亣锛?-->
<template>
  <div v-if="frontmatter.articleGPT" class="article-gpt s-card">
    <div class="title">
      <span class="name" @click="router.go('/articles/2024/0218')">
        <i class="iconfont icon-robot"></i>
        鏂囩珷鎽樿
        <i class="iconfont icon-up"></i>
      </span>
      <span :class="['logo', { loading }]" @click="showOther"> FakeGPT </span>
    </div>
    <div class="content s-card">
      <span class="text">{{ abstractData === "" ? "鍔犺浇涓?.." : abstractData }}</span>
      <span v-if="loading" class="point">|</span>
    </div>
    <div class="meta">
      <span class="tip">姝ゅ唴瀹规牴鎹枃绔犵敓鎴愶紝骞剁粡杩囦汉宸ュ鏍革紝浠呯敤浜庢枃绔犲唴瀹圭殑瑙ｉ噴涓庢€荤粨</span>
      <a
        href="https://eqnxweimkr5.feishu.cn/share/base/form/shrcnCXCPmxCKKJYI3RKUfefJre"
        class="report"
        target="_blank"
      >
        鎶曡瘔
      </a>
    </div>
  </div>
</template>

<script setup>
const { frontmatter } = useData();
const router = useRouter();

// 鎽樿鏁版嵁
const loading = ref(true);
const waitTimeOut = ref(null);
const abstractData = ref("");
const showIndex = ref(0);
const showType = ref(false);

// 杈撳嚭鎽樿
const typeWriter = (text = null) => {
  try {
    const data = text || frontmatter.value.articleGPT;
    if (!data) return false;
    if (showIndex.value < data.length) {
      abstractData.value += data.charAt(showIndex.value++);
      // 鐢熸垚瀛楃寤惰繜
      const delay = Math.random() * (150 - 30) + 30;
      setTimeout(() => {
        typeWriter(text);
      }, delay);
    } else {
      loading.value = false;
    }
  } catch (error) {
    loading.value = false;
    abstractData.value = "摘要生成失败";
    $message.error("摘要生成失败，请重试");
    console.error("摘要生成失败:", error);
  }
};

const initAbstract = () => {
  waitTimeOut.value = setTimeout(
    () => {
      typeWriter();
    },
    Math.random() * (3800 - 2500) + 2500,
  );
};

// 杈撳嚭鎽樿浠嬬粛
const showOther = () => {
  if (loading.value) return false;
  const text =
    "我是 FakeGPT，一个用于展示文章摘要效果的本地组件。当前页面内容由站点作者编写，我只负责以打字机形式展示。";
  showIndex.value = 0;
  loading.value = true;
  abstractData.value = "";
  if (!showType.value) {
    showType.value = true;
    typeWriter(text);
  } else {
    typeWriter();
    showType.value = false;
  }
};

onMounted(() => {
  if (frontmatter.value.articleGPT) initAbstract();
});

onBeforeUnmount(() => {
  clearTimeout(waitTimeOut.value);
});
</script>

<style lang="scss" scoped>
.article-gpt {
  margin-top: 1.2rem;
  background-color: var(--main-card-second-background);
  user-select: none;
  cursor: auto;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.8rem;
    padding: 0 8px;
    .name {
      display: flex;
      align-items: center;
      color: var(--main-color);
      font-weight: bold;
      cursor: pointer;
      .icon-robot {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        font-weight: normal;
        width: 26px;
        height: 26px;
        color: var(--main-card-background);
        background-color: var(--main-color);
        border-radius: 50%;
        margin-right: 8px;
      }
      .icon-up {
        font-weight: normal;
        font-size: 12px;
        margin-left: 6px;
        opacity: 0.6;
        color: var(--main-color);
        transform: rotate(90deg);
      }
    }
    .logo {
      padding: 4px 10px;
      font-size: 12px;
      color: var(--main-card-background);
      background-color: var(--main-color);
      border-radius: 25px;
      font-weight: bold;
      cursor: pointer;
      &.loading {
        animation: loading 1s infinite;
        cursor: not-allowed;
      }
    }
  }
  .content {
    cursor: auto;
    .point {
      color: var(--main-color);
      font-weight: bold;
      margin-left: 4px;
      animation: loading 0.8s infinite;
    }
  }
  .meta {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 0 8px;
    font-size: 12px;

    .tip {
      opacity: 0.6;
    }
    .report {
      white-space: nowrap;
      margin-left: 12px;
      opacity: 0.8;
    }
  }
}
</style>
