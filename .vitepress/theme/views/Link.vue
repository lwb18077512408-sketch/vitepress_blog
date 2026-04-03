<!-- 友情链接 -->
<template>
  <div class="link">
    <!-- 顶图 -->
    <Banner type="page" title="友情链接" desc="一些常用的网站和工具，欢迎访问！" :showTitle="true">
      <!-- <div class="link-group">
        <div v-for="(link, index) in pairedLinks(allLinkData)" :key="index" class="link-group-item">
          <a v-for="(item, i) in link" :key="i" :href="item.url" class="link-logo">
            <LazyLoader>
              <img
                :src="item.avatar"
                :alt="item.name"
                class="link-logo-img"
                @load="(e) => e.target.classList.add('loaded')"
              />
            </LazyLoader>
          </a>
        </div>
      </div> -->
    </Banner>
    <!-- 友链数据 -->
    <LinkList :listData="linkData" :useFriendsLink="true" />
  </div>
</template>

<script setup>
import linkData from "@/assets/linkData.mjs";
</script>

<style lang="scss" scoped>
.link {
  margin-bottom: 4rem;
  .banner-page {
    // min-height: 440px;
    min-height: auto;
    .link-group {
      position: absolute;
      left: 0;
      top: 140px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      overflow: hidden;
      .link-group-item {
        display: flex;
        flex-direction: column;
        .link-logo {
          margin-right: 1.2rem;
          .link-logo-img {
            width: 120px;
            height: 120px;
            min-width: 120px;
            border-radius: 50%;
            overflow: hidden;
          }
          &:nth-of-type(2n) {
            margin-top: 1.2rem;
            transform: translate(-60px);
          }
        }
      }
    }
    @media (max-width: 800px) {
      min-height: auto;
      .link-group {
        display: none;
      }
    }
  }
}
</style>
