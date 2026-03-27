export const themeConfig = {
  siteMeta: {
    title: "我的博客",
    description: "记录技术、生活与思考",
    logo: "/images/logo/logo.webp",
    site: "https://lwb18077512408-sketch.github.io/vitepress_blog",
    lang: "zh-CN",
    author: {
      name: "博主",
      cover: "/images/logo/logo.webp",
      email: "your-email@example.com",
      link: "https://your-domain.com",
    },
  },

  icp: "",
  since: "2026-01-01",
  postSize: 8,

  nav: [
    {
      text: "文章",
      items: [
        { text: "归档", link: "/pages/archives", icon: "article" },
        { text: "分类", link: "/pages/categories", icon: "folder" },
        { text: "标签", link: "/pages/tags", icon: "hashtag" },
      ],
    },
    {
      text: "页面",
      items: [
        { text: "关于", link: "/pages/about", icon: "contacts" },
        { text: "项目", link: "/pages/project", icon: "code" },
        { text: "友链", link: "/pages/link", icon: "people" },
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
    social: [
      {
        icon: "email",
        link: "mailto:your-email@example.com",
      },
      {
        icon: "github",
        link: "https://github.com/yourname",
      },
    ],
    sitemap: [
      {
        text: "博客",
        items: [
          { text: "最新文章", link: "/" },
          { text: "文章归档", link: "/pages/archives" },
          { text: "全部分类", link: "/pages/categories" },
          { text: "全部标签", link: "/pages/tags" },
        ],
      },
      {
        text: "页面",
        items: [
          { text: "关于", link: "/pages/about" },
          { text: "项目", link: "/pages/project" },
          { text: "友链", link: "/pages/link" },
          { text: "隐私政策", link: "/pages/privacy" },
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
