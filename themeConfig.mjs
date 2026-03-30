export const themeConfig = {
  siteMeta: {
    title: "BBG的主页",
    description: "记录技术、生活与思考",
    logo: "/images/logo/wait_logo.png",
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
        { text: "A1", link: "/portal/archives", icon: "article" },
        { text: "A2", link: "/portal/categories", icon: "folder" },
        { text: "A3", link: "/portal/tags", icon: "hashtag" },
      ],
    },
    {
      text: "页面",
      items: [
        { text: "B1", link: "/portal/about", icon: "contacts" },
        { text: "B2", link: "/portal/project", icon: "code" },
        { text: "B3", link: "/portal/link", icon: "people" },
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
        items: [{ text: "XXX", link: "/" }],
      },
      {
        text: "页面",
        items: [{ text: "XXX", link: "/portal/about" }],
      },
    ],
  },

  cover: {
    twoColumns: false,
    showCover: {
      enable: false,
      coverLayout: "left",
      defaultCover: [
        "https://example.com/1.avif",
        "https://example.com/2.avif",
        "https://example.com/3.avif",
      ],
    },
  },

  aside: {
    hello: {
      enable: true,
      text: "你好啊，欢迎来到我的博客！",
      image: "/images/logo/BBG.jpg",
    },
    toc: {
      enable: true,
    },
    tags: {
      enable: true,
    },
    countDown: {
      enable: true,
      data: {
        name: "春节",
        date: "2027-02-07",
      },
    },
    siteData: {
      enable: true,
    },
    githubContrib: {
      enable: true,
      username: "lwb18077512408-sketch",
      defaultMode: "month",
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
    owner: "lwb18077512408-sketch",
    repo: "bbgs.xyz",
    pageViewsIssueId: 1,
  },

  rewardData: {
    enable: false,
    wechat: "",
    alipay: "",
  },
};
