export const themeConfig = {
  siteMeta: {
    title: "BBG的主页",
    description: "记录技术、生活与思考",
    logo: "/images/logo/BBG_logo.png",// 改变这里就会改变加载图标
    site: "https://www.bbgs.xyz",
    lang: "zh-CN",
    author: {
      name: "BBG",
      cover: "/images/logo/BBG_logo.png",
      email: "your-email@example.com",
      link: "https://www.bbgs.xyz",
    },
  },

  icp: "",
  since: "2026-03-28",
  postSize: 8,

  // inject 配置 - 迁移到根层以支持自定义覆盖
  inject: {
    // 头部注入
    // https://vitepress.dev/zh/reference/site-config#head
    header: [
      // favicon - 使用个人 logo
      ["link", { rel: "icon", href: "/images/logo/BBG_logo.png" }],
      // RSS
      [
        "link",
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS",
          href: "https://www.bbgs.xyz/rss.xml",
        },
      ],
      // iconfont
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
          { text: "XXX", link: "/pages/archives" },
          { text: "XXX", link: "/pages/categories" },
          { text: "XXX", link: "/pages/tags" },
        ],
      },
      {
        text: "页面",
        items: [
          { text: "XXX", link: "/pages/about" },
          { text: "XXX", link: "/pages/project" },
          { text: "XXX", link: "/pages/link" },
          { text: "XXX", link: "/pages/privacy" },
        ],
      },
    ],
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

  rewardData: {
    enable: false,
    wechat: "",
    alipay: "",
  },
};
