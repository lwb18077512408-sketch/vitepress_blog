# 搜索配置维护说明

这份文档记录当前工程的 Algolia 搜索接入方式、Crawler 配置、前端读取方式和后续维护注意事项。

当前搜索方案分为两部分：

1. 前端搜索 UI
2. Algolia Crawler 索引

这两部分必须同时正常，搜索结果才会显示正确。

## 当前架构

当前博客搜索结构如下：

1. 前端站点：VitePress 主题
2. 搜索服务：Algolia
3. 内容抓取：Algolia Crawler
4. 文章索引：`bbg_blog_articles`
5. 页面索引：`bbg_blog_pages`

其中：

1. `bbg_blog_articles` 用于文章搜索
2. `bbg_blog_pages` 用于普通页面搜索
3. 当前前端搜索默认指向文章索引

## 关键文件

以下文件和搜索逻辑直接相关：

1. `themeConfig.mjs`
用途：前端搜索配置入口，包含 `appId`、`apiKey` 和搜索开关。

2. `.vitepress/theme/components/Search.vue`
用途：搜索弹窗与结果展示组件。
当前默认搜索索引为 `bbg_blog_articles`。

3. `.vitepress/config.mjs`
用途：构建配置。当前会为每个页面注入 `algolia-title` 和 `algolia-description`，方便 crawler 提取更干净的标题和摘要。

4. [PV_SETUP.md](./PV_SETUP.md)
用途：同目录下的维护文档，可作为写法参考。

## 前端配置

当前前端搜索配置位于 `themeConfig.mjs`。

当前关键配置如下：

```js
search: {
  enable: true,
  appId: "84ANOE5FFI",
  apiKey: "387ba2b33a333ae462445289f4a071a6",
}
```

字段说明：

1. `enable`
是否开启搜索按钮与搜索弹窗

2. `appId`
Algolia Application ID

3. `apiKey`
Algolia Search-only API Key

### 当前前端搜索索引

当前搜索组件默认查询：

```js
index-name="bbg_blog_articles"
```

这意味着：

1. 搜索框优先查文章索引
2. 如果文章索引没有数据，前端会显示“搜索结果为空”
3. 如果要同时搜页面，需要额外改前端逻辑或切换索引

## 页面头部注入

为了让 crawler 更容易识别标题和摘要，当前页面会注入以下 meta：

1. `algolia-site-verification`
2. `algolia-title`
3. `algolia-description`

相关逻辑在 `.vitepress/config.mjs` 中。

### 作用说明

1. `algolia-site-verification`
用于域名验证

2. `algolia-title`
用于提供更干净的文章标题

3. `algolia-description`
用于提供更短的摘要，避免抓到整段正文或代码块

## Crawler 配置

当前 crawler 的目标是把站点内容分成两类索引：

1. 文章页 -> `bbg_blog_articles`
2. 普通页面 -> `bbg_blog_pages`

### 建议的文章页规则

文章页建议只匹配：

```js
pathsToMatch: [
  "https://www.bbgs.xyz/articles/**",
  "https://bbgs.xyz/articles/**",
]
```

并且优先读取文章专用 meta：

```js
const title =
  $('meta[name="algolia-title"]').attr("content") ||
  $('meta[property="og:title"]').attr("content") ||
  $("title").text().trim();

const description =
  $('meta[name="algolia-description"]').attr("content") ||
  $('meta[name="description"]').attr("content") ||
  $(".post-article").text().replace(/\s+/g, " ").trim();
```

### 建议的页面页规则

普通页面建议只匹配：

```js
pathsToMatch: [
  "https://www.bbgs.xyz/",
  "https://bbgs.xyz/",
  "https://www.bbgs.xyz/portal/**",
  "https://bbgs.xyz/portal/**",
  "https://www.bbgs.xyz/pagination/**",
  "https://bbgs.xyz/pagination/**",
]
```

### 调度建议

如果博客会日更，crawler 调度建议改为每天一次：

```js
schedule: "every 1 day"
```

如果要固定时间，也可以写成：

```js
schedule: "every 1 day at 3:00 am"
```

注意：Algolia 的调度时间按 UTC 计算。

## 维护流程

当你更新文章或页面后，建议按下面顺序检查：

1. 先确认站点已经重新构建并部署
2. 再检查 crawler 是否已重新抓取
3. 最后确认前端搜索组件是否还指向正确索引

### 常见问题

#### 1. 搜索结果显示为空

可能原因：

1. crawler 没有抓到新内容
2. 前端查询的 index 和 crawler 输出的 index 不一致
3. Algolia API key 或 appId 配错

#### 2. 标题不正确

可能原因：

1. crawler 还在读取正文作为标题
2. 页面没有注入 `algolia-title`
3. crawler 配置没有优先读取 meta

#### 3. 摘要里出现整段代码

可能原因：

1. crawler 读取了页面正文全文
2. 前端没有做摘要截断
3. 文章 frontmatter 的 description 太长或是代码块内容

## 重新部署提醒

如果你改了以下任意文件，记得重新构建并部署站点：

1. `themeConfig.mjs`
2. `.vitepress/config.mjs`
3. `.vitepress/theme/components/Search.vue`

原因：

1. `themeConfig.mjs` 决定是否开启搜索和使用哪个 Algolia 账号
2. `config.mjs` 决定页面头部输出什么 meta
3. `Search.vue` 决定前端怎么展示搜索结果

## 当前已知状态

1. 搜索功能已开启
2. crawler 已能抓到文章页
3. 文章索引当前使用 `bbg_blog_articles`
4. 前端搜索结果已经改为短摘要展示

如果你后续要改搜索行为，优先检查这份文档里的四个关键文件。
