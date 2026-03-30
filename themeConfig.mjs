export const themeConfig = {
  siteMeta: {
    title: "BBG的主页",
    description: "记录技术、生活与思考",
    logo: "/images/logo/wait_logo.png",// 改变这里就会改变加载图标
    site: "https://www.bbgs.xyz",
    lang: "zh-CN",
    author: {
      name: "BBG",
      cover: "/images/logo/top_logo.svg",
      email: "your-email@example.com",
      link: "https://www.bbgs.xyz",
    },
  },

  icp: "",
  since: "2026-03-28",
  postSize: 8,

  inject: {
    header: [
      // favicon - 使用个人网页logo
      ["link", { rel: "icon", href: "/images/logo/BBG_logo.png" }],
      [
        "link",
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS",
          href: "https://www.bbgs.xyz/rss.xml",
        },
      ],
      [
        "link",
        {
          crossorigin: "anonymous",
          rel: "stylesheet",
          href: "https://cdn2.codesign.qq.com/icons/g5ZpEgx3z4VO6j2/latest/iconfont.css",
        },
      ],
    ],
  },

  nav: [
    {
      text: "文章",
      items: [
        { text: "A1", link: "/pages/archives", icon: "article" },
        { text: "A2", link: "/pages/categories", icon: "folder" },
        { text: "A3", link: "/pages/tags", icon: "hashtag" },
      ],
    },
    {
      text: "页面",
      items: [
        { text: "B1", link: "/pages/about", icon: "contacts" },
        { text: "B2", link: "/pages/project", icon: "code" },
        { text: "B3", link: "/pages/link", icon: "people" },
      ],
    },
  ],

  navMore: [
    {
      name: "站点",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "首页",
          url: "/",
        },
      ],
    },
  ],

  footer: {
    social: [],
    sitemap: [
      {
        text: "博客",
        items: [
          { text: "XXX", link: "/" },
        ],
      },
      {
        text: "页面",
        items: [
          { text: "XXX", link: "/pages/about" },
        ],
      },
    ],
  },
  cover: {
    // 是否开启双栏布局
    twoColumns: false,
    // 是否开启封面显示
    showCover: {
      // 是否开启封面显示 文章不设置cover封面会显示异常，可以设置下方默认封面
      enable: false,
      // 封面布局方式: left | right | both
      coverLayout: 'left',
      // 默认封面(随机展示)
      defaultCover: [
        'https://example.com/1.avif',
        'https://example.com/2.avif',
        'https://example.com/3.avif'
      ]
    }
  },
  // 侧边栏
  aside: {
    // 站点简介
    hello: {
      enable: true,
      text: "你好啊，欢迎来到我的博客！",
    },
    // 目录
    toc: {
      enable: true,
    },
    // 标签
    tags: {
      enable: true,
    },
    // 倒计时
    countDown: {
      enable: true,
      // 倒计时日期
      data: {
        name: "春节",
        date: "2027-02-07",
      },
    },
    // 站点数据
    siteData: {
      enable: true,
    },
  },
  comment: {
    enable: false,
    type: "artalk",
    artalk: {
      site: "",
      server: "",
    },
    twikoo: {
      js: "",
      envId: "",
      region: "ap-shanghai",
      lang: "zh-CN",
    },
  },

  music: {
    enable: false,
    url: "",
    id: 0,
    server: "netease",
    type: "playlist",
  },

  search: {
    enable: false,
    appId: "",
    apiKey: "",
  },

  github: {
    owner: "lwb18077512408-sketch", // 请改为你的 GitHub 用户名
    repo: "bbgs.xyz",               // 请改为你当前博客仓库名
    pageViewsIssueId: 1               // 你创建的 Issue 编号（如 #1）
  },

  rewardData: {
    enable: false,
    wechat: "",
    alipay: "",
  },
};
