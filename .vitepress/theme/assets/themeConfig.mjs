// 主题配置
export const themeConfig = {
  // 站点信息
  siteMeta: {
    title: "Curve",
    description: "Hello World",
    logo: "/images/logo/logo.webp",
    site: "https://blog.imsyy.top",
    lang: "zh-CN",
    author: {
      name: "Admin",
      cover: "/images/logo/logo.webp",
      email: "114514@gmail.com",
      link: "https://www.imsyy.top",
    },
  },
  icp: "萌ICP备114514号",
  since: "2020-07-28",
  postSize: 8,

  inject: {
    header: [
      ["link", { rel: "icon", href: "/images/logo/logo.webp" }],
      [
        "link",
        {
          rel: "alternate",
          type: "application/rss+xml",
          title: "RSS",
          href: "https://blog.imsyy.top/rss.xml",
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
      text: "文库",
      items: [
        { text: "文章列表", link: "/portal/archives", icon: "article" },
        { text: "全部分类", link: "/portal/categories", icon: "folder" },
        { text: "全部标签", link: "/portal/tags", icon: "hashtag" },
      ],
    },
    {
      text: "专栏",
      items: [
        { text: "技术分享", link: "/portal/categories/技术分享", icon: "technical" },
        { text: "我的项目", link: "/portal/project", icon: "code" },
        { text: "效率工具", link: "/portal/tools", icon: "tools" },
      ],
    },
    {
      text: "友链",
      items: [
        { text: "友链鱼塘", link: "/portal/friends", icon: "fish" },
        { text: "友情链接", link: "/portal/link", icon: "people" },
      ],
    },
    {
      text: "我的",
      items: [
        { text: "畅所欲言", link: "/portal/message", icon: "chat" },
        { text: "致谢名单", link: "/portal/thanks", icon: "reward" },
        { text: "关于本站", link: "/portal/about", icon: "contacts" },
      ],
    },
  ],

  navMore: [
    {
      name: "博客",
      list: [
        {
          icon: "/images/logo/logo.webp",
          name: "主站",
          url: "/",
        },
      ],
    },
  ],

  cover: {
    twoColumns: false,
    showCover: {
      enable: true,
      coverLayout: "both",
      defaultCover: [
        "https://example.com/1.avif",
        "https://example.com/2.avif",
        "https://example.com/3.avif",
      ],
    },
  },

  footer: {
    social: [
      {
        icon: "email",
        link: "mailto:one@imsyy.top",
      },
      {
        icon: "github",
        link: "https://www.github.com/imsyy/",
      },
    ],
    sitemap: [
      {
        text: "博客",
        items: [
          { text: "近期文章", link: "/" },
          { text: "全部分类", link: "/portal/categories" },
          { text: "全部标签", link: "/portal/tags" },
          { text: "文章归档", link: "/portal/archives", newTab: true },
        ],
      },
      {
        text: "页面",
        items: [
          { text: "关于本站", link: "/portal/about" },
          { text: "隐私政策", link: "/portal/privacy" },
          { text: "版权协议", link: "/portal/cc" },
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
      js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/twikoo/1.6.39/twikoo.all.min.js",
      envId: "",
      region: "ap-shanghai",
      lang: "zh-CN",
    },
  },

  aside: {
    hello: {
      enable: true,
      text: "这里有关于<strong>开发</strong>相关的问题和看法，也会有一些<strong>奇技淫巧</strong>的分享，其中大部分内容会侧重于<strong>前端开发</strong>。希望你可以在这里找到对你有用的知识和教程。",
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
        date: "2025-01-29",
      },
    },
    siteData: {
      enable: true,
    },
  },

  friends: {
    circleOfFriends: "",
    dynamicLink: {
      server: "",
      app_token: "",
      table_id: "",
    },
  },

  music: {
    enable: false,
    url: "https://api-meting.example.com",
    id: 9379831714,
    server: "netease",
    type: "playlist",
  },

  search: {
    enable: false,
    appId: "",
    apiKey: "",
  },

  rewardData: {
    enable: true,
    wechat: "https://pic.efefee.cn/uploads/2024/04/07/66121049d1e80.webp",
    alipay: "https://pic.efefee.cn/uploads/2024/04/07/661206631d3b5.webp",
  },

  fancybox: {
    enable: true,
    js: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.umd.min.js",
    css: "https://mirrors.sustech.edu.cn/cdnjs/ajax/libs/fancyapps-ui/5.0.36/fancybox/fancybox.min.css",
  },

  jumpRedirect: {
    enable: true,
    exclude: [
      "cf-friends-link",
      "upyun",
      "icp",
      "author",
      "rss",
      "cc",
      "power",
      "social-link",
      "link-text",
      "travellings",
      "post-link",
      "report",
      "more-link",
      "skills-item",
      "right-menu-link",
      "link-card",
    ],
  },

  tongji: {
    "51la": "",
  },
};
