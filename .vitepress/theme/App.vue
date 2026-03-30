<template>
  <!-- 鑳屾櫙鍥剧墖 -->
  <Background />
  <!-- 鍔犺浇鎻愮ず -->
  <Loading />
  <!-- 涓帶鍙?-->
  <Control />
  <!-- 瀵艰埅鏍?-->
  <Nav />
  <!-- 涓诲唴瀹?-->
  <main :class="['mian-layout', { loading: loadingStatus, 'is-post': isPostPage }]">
    <!-- 404 -->
    <NotFound v-if="page.isNotFound" />
    <!-- 棣栭〉 -->
    <Home v-if="frontmatter.layout === 'home'" showHeader />
    <!-- 椤甸潰 -->
    <template v-else>
      <!-- 鏂囩珷椤甸潰 -->
      <Post v-if="isPostPage" />
      <!-- 鏅€氶〉闈?-->
      <Page v-else-if="!page.isNotFound" />
    </template>
  </main>
  <!-- 椤佃剼 -->
  <FooterLink v-show="!loadingStatus" :showBar="isPostPage && !page.isNotFound" />
  <Footer v-show="!loadingStatus" />
  <!-- 鎮诞鑿滃崟 -->
  <Teleport to="body">
    <!-- 宸︿晶鑿滃崟 -->
    <div :class="['left-menu', { hidden: footerIsShow }]">
      <!-- 鍏ㄥ眬璁剧疆 -->
      <Settings />
      <!-- 鍏ㄥ眬鎾斁鍣?-->
      <Player />
    </div>
  </Teleport>
  <!-- 鍙抽敭鑿滃崟 -->
  <RightMenu ref="rightMenuRef" />
  <!-- 鍏ㄥ眬娑堟伅 -->
  <Message />
</template>

<script setup>
import { storeToRefs } from "pinia";
import { mainStore } from "@/store";
import { calculateScroll, specialDayGray } from "@/utils/helper";

const route = useRoute();
const store = mainStore();
const { frontmatter, page, theme } = useData();
const { loadingStatus, footerIsShow, themeValue, themeType, backgroundType, fontFamily, fontSize } =
  storeToRefs(store);

// 鍙抽敭鑿滃崟
const rightMenuRef = ref(null);

const isPostPage = computed(() => {
  const routePath = decodeURIComponent(route.path);
  return routePath.includes("/articles/");
});

const openRightMenu = (e) => {
  rightMenuRef.value?.openRightMenu(e);
};

const copyTip = () => {
  const copiedText = window.getSelection().toString();
  // 妫€鏌ユ枃鏈唴瀹规槸鍚︿笉涓虹┖
  if (copiedText.trim().length > 0 && typeof $message !== "undefined") {
    $message.success("澶嶅埗鎴愬姛锛屽湪杞浇鏃惰鏍囨敞鏈枃鍦板潃");
  }
};

// 鏇存敼姝ｇ‘涓婚绫诲埆
const changeSiteThemeType = () => {
  // 涓婚 class
  const themeClasses = {
    dark: "dark",
    light: "light",
    auto: "auto",
  };
  // 蹇呰鏁版嵁
  const htmlElement = document.documentElement;
  console.log("当前模式：", themeType.value);
  // 娓呴櫎鎵€鏈?class
  Object.values(themeClasses).forEach((themeClass) => {
    htmlElement.classList.remove(themeClass);
  });
  // 娣诲姞鏂扮殑 class
  if (themeType.value === "auto") {
    // 鏍规嵁褰撳墠鎿嶄綔绯荤粺棰滆壊鏂规鏇存敼鏄庢殫涓婚
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const autoThemeClass = systemPrefersDark ? themeClasses.dark : themeClasses.light;
    htmlElement.classList.add(autoThemeClass);
    themeValue.value = autoThemeClass;
  } else if (themeClasses[themeType.value]) {
    htmlElement.classList.add(themeClasses[themeType.value]);
    themeValue.value = themeClasses[themeType.value];
  }
  if (backgroundType.value === "image") {
    htmlElement.classList.add("image");
  } else {
    htmlElement.classList.remove("image");
  }
};

// 鍒囨崲绯荤粺瀛椾綋鏍峰紡
const changeSiteFont = () => {
  try {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove("lxgw", "hmos");
    htmlElement.classList.add(fontFamily.value);
    htmlElement.style.fontSize = fontSize.value + "px";
  } catch (error) {
    console.error("鍒囨崲绯荤粺瀛椾綋鏍峰紡澶辫触", error);
  }
};

// 鐩戝惉璁剧疆鍙樺寲
watch(
  () => [themeType.value, backgroundType.value],
  () => changeSiteThemeType(),
);
watch(
  () => fontFamily.value,
  () => changeSiteFont(),
);

onMounted(() => {
  console.log(frontmatter.value, page.value, theme.value);
  // 鍏ㄧ珯缃伆
  specialDayGray();
  // 鏇存敼涓婚绫诲埆
  changeSiteThemeType();
  // 鍒囨崲绯荤粺瀛椾綋鏍峰紡
  changeSiteFont();
  // 婊氬姩鐩戝惉
  window.addEventListener("scroll", calculateScroll);
  // 鍙抽敭鐩戝惉
  window.addEventListener("contextmenu", openRightMenu);
  // 澶嶅埗鐩戝惉
  window.addEventListener("copy", copyTip);
  // 鐩戝惉绯荤粺棰滆壊
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", changeSiteThemeType);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", calculateScroll);
  window.removeEventListener("contextmenu", openRightMenu);
});
</script>

<style lang="scss" scoped>
.mian-layout {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  // 鎵嬪姩瀹炵幇鍔犺浇鍔ㄧ敾
  animation: show 0.5s forwards;
  animation-duration: 0.5s;
  display: block;
  &.loading {
    display: none;
  }
  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    &.is-post {
      padding: 0;
    }
  }
}
.left-menu {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 1002;
  transition:
    opacity 0.3s,
    transform 0.3s;
  &.hidden {
    opacity: 0;
    transform: translateY(100px);
  }
}
</style>
