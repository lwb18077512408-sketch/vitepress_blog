<template>
  <div class="about">
    <h1 class="title">关于本站</h1>
    <div class="about-content" style="grid-template-columns: 1fr">
      <!-- 介绍 -->
      <div class="about-item hello">
        <span class="text1">你好，很高兴认识你👋</span>
        <span class="text2 title2">我是 BBG</span>
        <span class="text3">是一名独立开发者，喜欢折腾产品、代码和有趣的想法，这里记录我的学习、思考与创作。</span>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 2fr 3fr">
      <!-- 技能 -->
      <div class="about-item skills">
        <span class="tip">技能</span>
        <span class="title2">开启创造力</span>
        <div class="skills-list">
          <a
            v-for="(item, index) in skillsData"
            :key="index"
            :style="{ '--color': item.color }"
            :href="item.link"
            class="skills-item"
            target="_blank"
          >
            <div class="skills-logo">
                <img v-if="item.img" :src="item.img" alt="" class="skills-logo-img" />
              <i v-else-if="item.icon && iconfontAllowed.has(item.icon)" :class="`iconfont icon-${item.icon}`"></i>
              <span v-else class="skills-abbr">{{ (item.abbr || item.name || "?").charAt(0).toUpperCase() }}</span>
            </div>
            <span class="skills-name">{{ item.name }}</span>
          </a>
        </div>
      </div>
      <!-- 生涯 -->
      <div class="about-item career">
        <span class="tip">生涯</span>
        <span class="title2">
          <i>無限進步</i>
        </span>
        <div class="list">
          <span class="list-item" style="--color: #357ef5"> </span>
          <span class="list-item" style="--color: #eb372a"> </span>
        </div>
        <img
          class="career-img"
          src="/images/logo/wait_logo.png"
          alt="career"
        />
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 2.5fr 2.5fr">
      <!-- 性格 -->
      <div class="about-item character" style="--color: #4298b4">
        <span class="tip">性格</span>
        <span class="title2">提倡者型人格</span>
        <span class="title2" style="color: var(--color)">INFJ</span>
        <span class="more">
          在
          <a href="https://www.16personalities.com/ch/" target="_blank">16personalities</a>
          了解更多关于
          <a href="https://www.16personalities.com/ch/istj-%E4%BA%BA%E6%A0%BC" target="_blank">
            提倡者
          </a>
        </span>
        <img                                                    
          src="https://pic1.imgdb.cn/item/69cf9463df10edaed90ef6b5.png"
          alt="male"
          class="male"
        />
      </div>
      <!-- 座右铭 -->
      <div class="about-item"> 
        <span class="tip">座右铭</span>
        <span class="title1" style="margin-top: 20px">种一颗树最好的时间是在十年前，</span>
        <span class="title2">其次，是现在。</span>
      </div>
    </div>
    <div class="about-content" style="grid-template-columns: 1fr">
      <!-- 信息 -->
      <div class="about-item child">
        <div
          class="about-item map image"
          style="background-image: url(https://pic1.imgdb.cn/item/69cf9463df10edaed90ef6b7.jpg)"
        >
          <span class="position">我现在住在 <strong>中国，广西桂林市</strong></span>
        </div>
        <div class="about-item info">
          <div class="info-item">
            <span class="info-name">生于</span>
            <span class="info-num" style="--color: #43a6c6">2001年</span>
          </div>
          <div class="info-item">
            <span class="info-name">现在职业</span>
            <span class="info-num" style="--color: #dfac46">在读硕士</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 心路历程 -->
    <div class="about-content" style="display: flex">
      <div class="about-item">
        <span class="tip"> </span>
        <span class="title2">广告位招租！</span>
        <p class="text">
          →
        </p>
        <p class="text">
          →
        </p>
        <p class="text">
          →
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { theme } = useData();

// 当前 iconfont 链接里已验证可用的技能图标
const iconfontAllowed = new Set(["vue", "python", "git", "photoshop"]);

// 技能数据
const skillsData = [
  {
    name: "Vue",
    color: "#41b883",
    icon: "vue",
    link: "https://cn.vuejs.org/",
  },
  {
    name: "Python",
    color: "#3776AB",
    icon: "python",
    link: "https://www.python.org/",
  },
  {
    name: "Git",
    color: "#F05032",
    icon: "git",
    link: "https://git-scm.com/",
  },
  // 新增技能
  {
    name: "Linux",
    color: "#FCC624",
    icon: "linux",
    abbr: "L",
    link: "https://www.kernel.org/",
  },
  {
    name: "STM32",
    color: "#5B8DEF",
    abbr: "S",
    link: "https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html",
  },
  {
    name: "PCB",
    color: "#FF6B6B",
    abbr: "P",
    link: "https://en.wikipedia.org/wiki/Printed_circuit_board",
  },
  {
    name: "3D建模",
    color: "#8E44AD",
    abbr: "3D",
    link: "https://www.blender.org/",
  },
  {
    name: "嵌入式",
    color: "#2ECC71",
    abbr: "嵌",
    link: "https://en.wikipedia.org/wiki/Embedded_system",
  },
  {
    name: "电源硬件",
    color: "#D35400",
    abbr: "电源",
    link: "https://en.wikipedia.org/wiki/Power_supply",
  },
];
</script>

<style lang="scss" scoped>
.about {
  .title {
    font-size: 2.4rem;
    text-align: center;
    border: none;
  }
  .about-content {
    display: grid;
    grid-template-columns: auto auto;
    gap: 20px;
    margin-bottom: 20px;
    .about-item {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 1.2rem 2rem;
      border-radius: 12px;
      background-color: var(--main-card-background);
      border: 1px solid var(--main-card-border);
      box-shadow: 0 8px 12px -4px var(--main-border-shadow);
      overflow: hidden;
      .tip {
        font-size: 14px;
        opacity: 0.8;
        margin-bottom: 12px;
      }
      .title1 {
        font-size: 36px;
        font-weight: bold;
        opacity: 0.6;
      }
      .title2 {
        font-size: 36px;
        font-weight: bold;
        margin-right: 4rem;
      }
      .text {
        font-size: 18px;
        margin: 0.6rem 0;
      }
      &.child {
        background-color: transparent;
        border: none;
        box-shadow: none;
        padding: 0;
        gap: 20px;
        .about-item {
          height: 100%;
        }
      }
      &.hello {
        justify-content: center;
        padding: 2rem;
        color: #fff;
        background-image: linear-gradient(120deg, #5b27ff 0%, #00d4ff 100%);
        background-size: 200% 200%;
        animation: gradientFlow 6s ease infinite;
        .title2 {
          line-height: 2;
        }
      }
      &.character {
        min-height: 220px;
        cursor: pointer;
        .more {
          margin-top: auto;
          font-size: 14px;
          color: var(--main-color-gray);
          a {
            color: var(--main-color-gray);
            &:hover {
              color: var(--color);
            }
          }
        }
        .male {
          position: absolute;
          top: 50px;
          right: 50px;
          height: 70%;
          width: auto;
          transition: transform 0.5s;
          transform-origin: top center;
          @media (max-width: 768px) {
            height: 80%;
          }
        }
        &:hover {
          .male {
            transform: scale(1.2);
          }
        }
      }
      &.skills {
        .skills-list {
          margin-top: 12px;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .skills-item {
            display: flex;
            align-items: center;
            margin-right: 10px;
            margin-top: 10px;
            padding: 8px 12px 8px 8px;
            border-radius: 40px;
            background-color: var(--main-site-background);
            border: 1px solid var(--main-card-border);
            box-shadow: 0 8px 12px -4px var(--main-border-shadow);
            transition: background-color 0.3s;
            cursor: pointer;
            .skills-logo {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 32px;
              height: 32px;
              margin-right: 8px;
              border-radius: 50%;
              background-color: var(--color);
              .iconfont {
                color: #fff;
              }
              .skills-logo-img {
                width: 18px;
                height: 18px;
                display: block;
                object-fit: contain;
              }
              .skills-abbr {
                font-weight: 700;
                color: #fff;
                font-size: 0.9rem;
              }
            }
            .skills-name {
              font-weight: bold;
              transition: color 0.3s;
            }
            &:hover {
              background-color: var(--main-card-background);
            }
          }
        }
      }
      &.career {
        .title2 {
          letter-spacing: 0.2rem;
          font-size: 40px;
        }
        .list {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          .list-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 12px;
            color: var(--main-font-second-color);
            &::before {
              content: "";
              display: block;
              width: 16px;
              height: 16px;
              background-color: var(--color);
              border-radius: 50%;
              margin-right: 8px;
            }
          }
        }
        .career-img {
          position: absolute;
          bottom: 5%;
          left: 5%;
          width: 10%;
          @media (max-width: 768px) {
            position: static;
          }
        }
      }
      &.game {
        min-height: 300px;
        @media (max-width: 768px) {
          min-height: 240px;
        }
      }
      &.like {
        min-height: 400px;
        @media (max-width: 768px) {
          min-height: 300px;
        }
      }
      &.image {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        .image-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          z-index: 2;
          color: #fff;
          .image-desc {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            margin-top: auto;
            &.opacity {
              font-size: 14px;
              color: #eee;
              opacity: 0.8;
              a {
                color: #eee;
                &:hover {
                  color: var(--main-color);
                }
              }
            }
          }
        }
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: inset 0 -70px 204px 10px var(--color);
          z-index: 0;
        }
      }
      &.map {
        min-height: 170px;
        background-size: 100%;
        transition: background 1.5s ease-in-out;
        cursor: pointer;
        @media (max-width: 768px) {
          background-size: cover;
          pointer-events: none;
        }
        .position {
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          padding: 20px 30px;
          color: #fff;                                //地址背景
          background-image: linear-gradient(120deg, rgba(228, 163, 89, 0.7) 10%, rgba(192, 230, 25, 0.7) 100%);
          background-size: 200% 200%;
          animation: gradientFlow 6s ease infinite;
          font-size: 20px;
          transition: bottom 1s;
        }
        &:hover {
          background-size: 120%;
          background-position-x: 0;
          background-position-y: 36%;
          .position {
            bottom: -80px;
          }
        }
      }
      &.info {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        .info-item {
          display: flex;
          flex-direction: column;
          margin-right: 32px;
          .info-name {
            font-size: 14px;
            margin-bottom: 8px;
            color: var(--main-font-second-color);
          }
          .info-num {
            font-size: 34px;
            font-weight: bold;
            color: var(--color);
          }
        }
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
