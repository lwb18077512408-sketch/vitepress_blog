# 站点统计维护说明

这份文档记录当前工程的 PV 和 UV 实现方式、相关配置、部署要点和后续维护注意事项。

当前统计方案分为两部分：

1. PV，总访问量
2. UV，累计独立访客

这两项统计都不会因为普通的前端重新部署而归零，因为它们都不保存在静态页面构建产物中。

## 当前架构

当前博客部署结构如下：

1. 前端站点：GitHub Pages
2. 域名和 CDN：Cloudflare
3. 统计中继 API：Vercel
4. PV 存储：GitHub Issue 标题
5. UV 存储：Upstash Redis

其中：

1. PV 负责统计总访问次数
2. UV 负责统计累计独立访客数

## 关键文件

以下文件和统计逻辑直接相关：

1. [themeConfig.mjs](themeConfig.mjs)
用途：前端统计配置入口，包含 GitHub 仓库信息和 Vercel 中继 API 地址。

2. [api/pv-dispatch.js](api/pv-dispatch.js)
用途：Vercel Serverless API。负责：
一是把前端 PV 请求转发为 GitHub `repository_dispatch`
二是根据 `visitor_id` 进行 UV 去重和累计

3. [.vitepress/theme/components/Aside/Widgets/SiteData.vue](.vitepress/theme/components/Aside/Widgets/SiteData.vue)
用途：侧边栏“站点数据”组件。负责：
一是读取 PV
二是生成或复用浏览器本地 `visitor_id`
三是调用 Vercel API 获取最新 UV 结果

4. [.github/workflows/update-pv.yml](.github/workflows/update-pv.yml)
用途：GitHub Actions 工作流。负责把指定 Issue 标题中的 `PV: N` 更新为 `PV: N+1`。

5. [vercel.json](vercel.json)
用途：Vercel 路由配置。这里必须排除 `/api` 路径，否则统计 API 会被错误重写到首页。

## PV 实现原理

PV 的实现方式是“每次访问上报一次，然后服务端累加一次”。

完整链路如下：

1. 用户打开博客页面
2. 前端组件 [SiteData.vue](.vitepress/theme/components/Aside/Widgets/SiteData.vue) 挂载
3. 组件调用 `dispatchProxy`，也就是当前配置的 Vercel API
4. Vercel API 收到请求后，读取服务端环境变量中的 GitHub PAT
5. Vercel API 向 GitHub 发起 `repository_dispatch`
6. GitHub Actions 工作流 [.github/workflows/update-pv.yml](.github/workflows/update-pv.yml) 被触发
7. 工作流读取指定 Issue 的标题，比如 `PV: 123`
8. 工作流把它更新成 `PV: 124`
9. 前端下次读取 Issue 标题时，就能显示最新 PV

### PV 数据存储位置

PV 不是保存在前端，也不是保存在 Vercel。

PV 实际保存在：

1. GitHub 仓库某个 Issue 的标题中

当前约定格式为：

`PV: 123`

### PV 为什么不会因部署归零

因为 PV 存在 GitHub Issue 标题里，而不是构建产物里。

只要你没有手动改掉那个 Issue 标题，以下行为都不会让 PV 归零：

1. GitHub Pages 重新部署
2. Vercel 重新部署
3. Cloudflare 刷新缓存
4. 前端代码更新

## UV 实现原理

UV 的实现方式是“基于浏览器 visitor_id 去重后累计”。

完整链路如下：

1. 用户打开博客页面
2. 前端组件 [SiteData.vue](.vitepress/theme/components/Aside/Widgets/SiteData.vue) 检查本地 `localStorage` 中是否已有 `visitor_id`
3. 如果没有，则生成一个新的 `visitor_id`
4. 前端把这个 `visitor_id` 一起发给 Vercel API
5. Vercel API 收到请求后，到 Upstash Redis 查询该 `visitor_id` 是否已经见过
6. 如果没有见过：
把 `visitor_id` 加入 Redis 去重集合
把累计 UV 总数加 1
7. 如果已经见过：
不再增加 UV
8. Vercel API 把最新 UV 总数返回给前端
9. 前端更新侧边栏中的“独立访客”数字

### UV 数据存储位置

UV 不是保存在前端页面里，也不是保存在 GitHub Issue 里。

UV 实际保存在 Upstash Redis 中，主要包含两类数据：

1. 已见访客集合
默认 key 结构：
`bbgs:visitors:seen`

2. 累计 UV 总数
默认 key 结构：
`bbgs:stats:uv:total`

### UV 为什么不会因部署归零

因为 UV 存在 Upstash Redis 中，而不是构建产物里。

只要你没有删除 Redis 数据、没有更换 key 前缀、也没有重置 Upstash 实例，以下行为都不会让 UV 归零：

1. GitHub Pages 重新部署
2. Vercel 重新部署
3. Cloudflare 配置调整
4. 前端样式或主题更新

## 统计口径说明

### PV 口径

当前 PV 是按“页面组件挂载一次就上报一次”来累计的。

这意味着：

1. 同一个用户连续刷新多次，PV 会继续增加
2. 同一个用户隔天回来访问，PV 也会继续增加

这符合常见的 PV 定义。

### UV 口径

当前 UV 是“累计独立浏览器访客”，不是“累计登录用户数”。

它的实际含义是：

1. 同一个浏览器、同一个本地存储、同一个 `visitor_id`，只会被算一次
2. 用户换浏览器、换设备、清空本地存储、无痕模式访问，可能会被视为新访客

这对个人博客来说是合理且常见的 UV 口径。

## 前端配置

当前前端统计相关配置位于 [themeConfig.mjs](themeConfig.mjs)。

当前关键配置如下：

```js
github: {
  owner: "lwb18077512408-sketch",
  repo: "vitepress_blog",
  pageViewsIssueId: 1,
  dispatchProxy: "https://vitepress-blog-xi.vercel.app/api/pv-dispatch",
  clientToken: "",
}
```

字段说明：

1. `owner`
GitHub 仓库所有者

2. `repo`
GitHub 仓库名

3. `pageViewsIssueId`
保存 PV 标题的 Issue 编号

4. `dispatchProxy`
当前统计中继 API 地址
因为博客前端跑在 GitHub Pages，不在 Vercel 同域，所以这里必须使用完整 URL，而不是相对路径

5. `clientToken`
仅用于本地测试时的直连 GitHub API 方案，生产环境保持空字符串

## Vercel 环境变量

当前 Vercel 项目至少需要以下环境变量：

### PV 必需变量

1. `GITHUB_PAT`
GitHub Personal Access Token，用于从服务端触发 `repository_dispatch`

2. `PV_OWNER`
当前值：`lwb18077512408-sketch`

3. `PV_REPO`
当前值：`vitepress_blog`

4. `PV_ISSUE_NUMBER`
当前值：`1`

5. `ALLOWED_ORIGIN`
当前值：`https://www.bbgs.xyz`
用于限制允许调用该 API 的前端域名

### UV 必需变量

1. `UPSTASH_REDIS_REST_URL`
Upstash Redis 的 REST URL

2. `UPSTASH_REDIS_REST_TOKEN`
Upstash Redis 的 REST Token

### UV 可选变量

1. `UV_KEY_PREFIX`
默认值：`bbgs`
用于 Redis key 前缀隔离

## Upstash Redis 当前使用方式

当前 UV 方案通过 Upstash REST API 直接请求 Redis，不依赖额外 SDK。

这样做的好处是：

1. 适合 Vercel Serverless 场景
2. 不需要单独引入 Redis 客户端依赖
3. 后续迁移到其他支持 fetch 的环境也更容易

当前服务端主要 Redis 操作如下：

1. `SADD`
把 `visitor_id` 写入去重集合

2. `INCR`
当且仅当新访客首次进入时，累计 UV 总数加 1

3. `GET`
当访客已经存在时，直接读取当前累计 UV 总数

## 当前部署关系

当前部署关系建议保持如下：

1. 博客站点：GitHub Pages
2. CDN / 域名代理：Cloudflare
3. 中继 API：Vercel
4. UV 去重存储：Upstash Redis

这个结构下：

1. 静态站继续保持简单
2. 敏感 token 不暴露到前端
3. PV 和 UV 都能持久化
4. 部署互相独立，维护成本低

## 验证方法

### 验证 PV

1. 打开博客首页
2. 刷新一次
3. 打开 GitHub Actions，确认 [.github/workflows/update-pv.yml](.github/workflows/update-pv.yml) 被触发
4. 检查对应 Issue 标题是否从 `PV: N` 更新到 `PV: N+1`

### 验证 UV

1. 用当前浏览器正常访问博客，刷新一次
预期：UV 可能增加 1

2. 在同一个浏览器再次刷新
预期：UV 不再增加

3. 用无痕窗口或另一个浏览器访问博客
预期：UV 增加 1

## 常见问题

### 1. 打开 `/api/pv-dispatch` 显示首页

原因：
通常是 [vercel.json](vercel.json) 的 rewrite 把 `/api` 也改写到首页了。

当前正确做法是：

1. 保留首页 rewrite
2. 明确排除 `/api` 路径

### 2. PV 增加，但 UV 不变

优先检查：

1. Vercel 是否已配置 `UPSTASH_REDIS_REST_URL`
2. Vercel 是否已配置 `UPSTASH_REDIS_REST_TOKEN`
3. Vercel 是否重新部署过

### 3. UV 每次刷新都在加

优先检查：

1. 浏览器里 `localStorage` 的 `visitor_id` 是否每次都被重新生成
2. Vercel API 是否正确把 `visitor_id` 发到了服务端
3. Redis `SADD` 是否成功执行

### 4. 部署后统计数值看起来丢了

优先检查：

1. PV Issue 标题是否还在
2. Upstash Redis 数据是否还在
3. Vercel 环境变量是否丢失
4. `UV_KEY_PREFIX` 是否被改动

## 后续维护建议

1. 不要把 `GITHUB_PAT` 写进前端配置文件
2. 不要把 `UPSTASH_REDIS_REST_TOKEN` 泄露到公开页面或仓库里
3. 如果更换 Vercel 项目域名，记得同步更新 [themeConfig.mjs](themeConfig.mjs) 中的 `dispatchProxy`
4. 如果更换 GitHub 仓库或 Issue 编号，记得同步更新：
   - [themeConfig.mjs](themeConfig.mjs)
   - Vercel 环境变量中的 `PV_OWNER`、`PV_REPO`、`PV_ISSUE_NUMBER`
5. 如果重建 Upstash 数据库，旧 UV 不会自动迁移，需要你手动保留或接受重置

## 维护结论

当前工程的统计方案可以简单概括为：

1. PV 存 GitHub Issue
2. UV 存 Upstash Redis
3. 前端通过 Vercel API 统一上报
4. GitHub Pages 只负责展示，不保存统计状态

因此，日后维护时只要你记住一句话就够了：

“页面负责触发，Vercel 负责中继，GitHub 负责 PV，Redis 负责 UV。”
