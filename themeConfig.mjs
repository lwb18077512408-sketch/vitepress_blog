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
        ["meta", { name: "algolia-site-verification", content: "3DBCE59EDB6A4A61" }],
    ],
  },

  nav: [
    {
      text: "快捷链接",
      link: "/portal/link",
    //   text: "文章",
    //   items: [
    //     { text: "A1", link: "/portal/archives", icon: "article" },
    //     { text: "A2", link: "/portal/categories", icon: "folder" },
    //     { text: "A3", link: "/portal/tags", icon: "hashtag" },
    //   ],
    // },
    // {
    //   text: "页面",
    //   items: [
    //     { text: "B1", link: "/portal/about", icon: "contacts" },
    //     { text: "B2", link: "/portal/project", icon: "code" },
    //     { text: "B3", link: "/portal/link", icon: "people" },
    //   ],
    },
    {
      text: "关于本站",
      link: "/portal/about",
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
      // {
      //   text: "博客",
      //   items: [{ text: "XXX", link: "/" }],
      // },
      // {
      //   text: "页面",
      //   items: [{ text: "XXX", link: "/portal/about" }],
      // },
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

  // 背景策略
  // forceDefaultOnLoad: true  每次加载强制使用默认背景（忽略旧缓存）
  // forceDefaultOnLoad: false 使用用户上次保存的背景偏好
  background: {
    defaultType: "image",
    defaultUrl: "https://pic1.imgdb.cn/item/69cd170d5a6f8fe2e6c94b7f.jpg",
    forceDefaultOnLoad: false,
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
    enable: true,
    appId: "84ANOE5FFI",
    apiKey: "387ba2b33a333ae462445289f4a071a6",
  },

  github: {
    owner: "lwb18077512408-sketch",
    repo: "vitepress_blog",
    pageViewsIssueId: 1,
    // Recommended on Vercel: deploy api/pv-dispatch.js in the same project and use /api/pv-dispatch.
    // Example: https://your-domain.com/api/pv-dispatch
    dispatchProxy: "https://vitepress-blog-xi.vercel.app/api/pv-dispatch",
    // Optional: local temporary testing only. Never commit a real token.
    clientToken: "",
  },

  rewardData: {
    enable: false,
    wechat: "",
    alipay: "",
  },
};
