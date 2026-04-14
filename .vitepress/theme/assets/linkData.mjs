// 链接数据
const linkData = [
  // 推荐数据
  {
    type: "rec",
    typeName: "推荐",
    typeDesc: "一些觉得不错的网站，欢迎访问",
    typeList: [
      {
        name: "百度",
        avatar: "https://www.baidu.com/favicon.ico",
        desc: "中文搜索引擎与综合信息服务平台",
        url: "https://www.baidu.com/",
      },
      {
        name: "GitHub",
        avatar: "https://cdn.simpleicons.org/github/ffffff",
        avatarBg: "#181717",
        desc: "代码托管与协作平台",
        url: "https://github.com/",
      },
      {
        name: "CSDN",
        avatar: "https://www.csdn.net/favicon.ico",
        desc: "中文开发者社区",
        url: "https://www.csdn.net/",
      },
       {
        name: "淘宝",
        avatar: "https://www.taobao.com/favicon.ico",
        desc: "综合电商购物平台",
        url: "https://www.taobao.com/",
      },
      {
        name: "gitee",
        avatar: "https://gitee.com/favicon.ico",
        desc: "国内代码托管与协作开发平台",
        url: "https://gitee.com/",
      },
            {
        name: "中国知网",
        avatar: "https://www.cnki.net//favicon.ico",
        desc: "学术论文与期刊文献检索平台",
        url: "https://www.cnki.net/",
      },
            {
        name: "DeeSeek",
        avatar: "https://www.deepseek.com//favicon.ico",
        desc: "AI 大模型与智能问答服务平台",
        url: "https://www.deepseek.com/",
      },
            {
        name: "知乎",
        avatar: "https://www.zhihu.com//favicon.ico",
        desc: "中文问答与知识内容社区",
        url: "https://www.zhihu.com/",
      },
            {
        name: "嘉立创客户中心",
        avatar: "https://member.jlc.com//favicon.ico",
        desc: "嘉立创订单、打板与生产服务入口",
        url: "https://member.jlc.com/",
      },
      {
        name: "OpenAI",
        avatar: "https://chatgpt.com//favicon.ico",
        desc: "AI 模型与 ChatGPT 服务平台",
        url: "https://chatgpt.com/",
      },
      {
        name: "立创商城",
        avatar: "https://www.szlcsc.com///favicon.ico",
        desc: "电子元器件采购与供应链服务平台",
        url: "https://www.szlcsc.com/",
      },
      {
        name: "哈基米 (GemAI)",
        avatar: "https://api.gemai.cc/console/favicon.ico",
        desc: "大模型接口网关",
        url: "https://api.gemai.cc/console",
      },
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },      
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },      
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },      
    ],
  },
  // 
  {
    type: "tools",
    typeName: "工具",
    typeDesc: "一些觉得不错的工具，欢迎访问",
    typeList: [
      {
        name: "百度翻译",
        avatar: "https://fanyi.baidu.com/mtpe-individual/transText?aldtype=16047#/auto/zh/favicon.ico",
        desc: "在线翻译与多语种文本互译工具",
        url: "https://fanyi.baidu.com/mtpe-individual/transText?aldtype=16047#/auto/zh",
      },
      {
        name: "Markdown编辑器",
        avatar: "https://www.bejson.com/md//favicon.ico",
        desc: "在线Markdown编辑器",
        url: "https://www.bejson.com/md/",
      },
      {
        name: "迅雷磁力",
        avatar: "https://xunleis.cc/favorites/cilisousuo/favicon.ico",
        desc: "磁力搜索网站",
        url: "https://xunleis.cc/favorites/cilisousuo",
      },
      {
        name: "draw.io",
        avatar: "https://app.diagrams.net//favicon.ico",
        desc: "免费的在线图表编辑器工具",
        url: "https://app.diagrams.net/",
      },      
      {
        name: "PhotoScissors",
        avatar: "https://photoscissors.com//favicon.ico",
        desc: "移除图片背景",
        url: "https://photoscissors.com/",
      },      
      {
        name: "dazidazi",
        avatar: "https://dazidazi.com//favicon.ico",
        desc: "在线打字练习",
        url: "https://dazidazi.com/",
      },
      {
        name: "FreeLaTeX",
        avatar: "https://freelatex.top//favicon.ico",
        desc: "图片公式识别转 LaTeX",
        url: "https://freelatex.top/",
      },      
      {
        name: "Mathcheap",
        avatar: "https://mathcheap.xyz//favicon.ico",
        desc: "图片公式识别",
        url: "https://mathcheap.xyz/",
      },
      {
        name: "mylocationmap",
        avatar: "https://mylocationmap.com/zh-Hans/gps-coordinates-converter//favicon.ico",
        desc: "GPS坐标转换器",
        url: "https://mylocationmap.com/zh-Hans/gps-coordinates-converter/",
      },      
      {
        name: "FreeCompress",
        avatar: "https://freecompress.com/zh-cn/favicon.ico",
        desc: "文件压缩",
        url: "https://freecompress.com/zh-cn",
      },
      {
        name: "Abtool",
        avatar: "https://www.abtool.cn//favicon.ico",
        desc: "综合工具网站",
        url: "https://www.abtool.cn/",
      }, 
      {
        name: "docsmall",
        avatar: "https://docsmall.com//favicon.ico",
        desc: "在线图片与 PDF 处理工具",
        url: "https://docsmall.com/",
      }, 
      {
        name: "cdkm",
        avatar: "https://cdkm.com/cn/?src=www.jspoo.com/favicon.ico",
        desc: "在线文件转换器",
        url: "https://cdkm.com/cn/?src=www.jspoo.com",
      }, 
      {
        name: "convertio",
        avatar: "https://convertio.co/zh/?dt_dapp=1/favicon.ico",
        desc: "文件转换器",
        url: "https://convertio.co/zh/?dt_dapp=1",
      },            
      {
        name: "REphotos",
        avatar: "https://remove.photos//favicon.ico",
        desc: "移除图片背景",
        url: "https://remove.photos/",
      },  
      {
        name: "ilovepdf",
        avatar: "https://www.ilovepdf.com//favicon.ico",
        desc: "PDF处理工具",
        url: "https://www.ilovepdf.com/",
      },   
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },  
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },  
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },   
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },  
    ],
  },
  //资源
  {
    type: "resource",
    typeName: "资源",
    typeDesc: "一些觉得不错的资源，欢迎访问",
    typeList: [
      {
        name: "聚合图床",
        avatar: "https://www.superbed.cn/favicon.ico",
        desc: "图片上传和外链服务",
        url: "https://www.superbed.cn",
      },
      {
        name: "Emoji",
        avatar: "https://getemoji.com/#objects/favicon.ico",
        desc: "Unicode 符号",
        url: "https://getemoji.com/#objects",
      },
      {
        name: "毒蛇电影",
        avatar: "https://www.duse2.com//favicon.ico",
        desc: "在线电影观看平台",
        url: "https://www.duse2.com/",
      },
      {
        name: "Flaticon",
        avatar: "https://www.flaticon.com/authors/favicon.ico",
        desc: "icons图标素材库",
        url: "https://www.flaticon.com/",
      },
      {
        name: "影视森林",
        avatar: "https://www.tvtv1.cc/#iwoci.com/favicon.ico",
        desc: "观影第一站",
        url: "https://www.tvtv1.cc/#iwoci.com",
      },
      {
        name: "豆瓣",
        avatar: "https://movie.douban.com//favicon.ico",
        desc: "豆瓣电影",
        url: "https://movie.douban.com/",
      },      
      {
        name: "prompt123",
        avatar: "https://www.prompt123.cn//favicon.ico",
        desc: "免费AI提示词大全",
        url: "https://www.prompt123.cn/",
      },
      {
        name: "SaDuck",
        avatar: "https://www.saduck.top//favicon.ico",
        desc: "公考知识库",
        url: "https://www.saduck.top/",
      },      
      {
        name: "Getiot",
        avatar: "https://getiot.tech//favicon.ico",
        desc: "人人都懂物联网",
        url: "https://getiot.tech/",
      },  
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },  
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },  
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },  
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },  
      // {
      //   name: "XXX",
      //   avatar: " /favicon.ico",
      //   desc: "XXX",
      //   url: " ",
      // },  



      
    ],
  },
];

export default linkData;
