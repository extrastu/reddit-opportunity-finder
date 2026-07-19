export type Score = {
  frequency: number;
  urgency: number;
  pay: number;
  competition: number;
  complexity: number;
};

export type Opportunity = {
  id: string;
  no: number;
  title: string;
  subreddits: string[];
  mentions: number;
  firstSeen: string;
  quote: string;
  quoteAuthor: string;
  problem: string;
  workaround: string;
  users: string;
  solution: string;
  score: Score;
  gap: string;
  mvp: string[];
  buildDays: number;
  revenue: string;
  platforms: string[];
  trend: "Growing" | "Stable" | "Declining";
  whyNow: string;
};

export const total = (s: Score) =>
  s.frequency + s.urgency + s.pay + (6 - s.competition) + (6 - s.complexity);

export const opportunities: Opportunity[] = [
  {
    id: "op-041",
    no: 1,
    title: "菜单栏级「屏幕时间」按 App 分类自动打标签",
    subreddits: ["r/macapps", "r/productivity"],
    mentions: 34,
    firstSeen: "2026-06-02",
    quote: "why can't Screen Time just tell me which Xcode project I was actually in",
    quoteAuthor: "u/throwaway_devtools",
    problem:
      "系统自带屏幕时间只统计到 App 级别，编程/设计类用户想知道时间花在哪个项目、哪个窗口，而不是笼统的「Xcode 4h」。",
    workaround: "手动 Toggl 计时，或导出 Screen Time 数据库自己写脚本解析。",
    users: "自由职业者、独立开发者、按小时计费的设计师",
    solution: "本地菜单栏 App，读取窗口标题 + 前台 App，本地聚合成项目级时间报表，CSV 导出计费单。",
    score: { frequency: 5, urgency: 3, pay: 4, competition: 2, complexity: 2 },
    gap: "Rize/Timing 做了但订阅贵且云端上传；纯本地、一次性付费的窗口级统计几乎没有。",
    mvp: ["前台窗口打标签", "项目级时间聚合", "一键导出计费 CSV"],
    buildDays: 10,
    revenue: "一次性 $19.99，Pro 订阅加多设备同步",
    platforms: ["macOS", "Menu Bar", "Local First"],
    trend: "Growing",
    whyNow: "远程办公按小时计费的自由职业者持续增长，Screen Time 一直没做窗口级细分。",
  },
  {
    id: "op-039",
    no: 2,
    title: "Obsidian 每日笔记的「随手拍」附件自动归位",
    subreddits: ["r/ObsidianMD"],
    mentions: 27,
    firstSeen: "2026-06-11",
    quote: "I hate that every screenshot I paste just dumps into one giant attachments folder",
    quoteAuthor: "u/vault_hoarder",
    problem: "Obsidian 粘贴图片默认全塞进一个 attachments 文件夹，几百篇笔记后完全找不回哪张图属于哪篇。",
    workaround: "手动改 vault 设置按日期建文件夹，或装社区插件但配置繁琐。",
    users: "重度 Obsidian 日记/知识库用户",
    solution: "iOS+macOS 双端小工具：截图/拍照后自动按「日期+当前笔记」写入 vault 子目录并回填 Markdown 链接。",
    score: { frequency: 4, urgency: 3, pay: 3, competition: 3, complexity: 2 },
    gap: "现有插件只做纯文件命名规则，没有跨设备「随手拍即归档」的移动端体验。",
    mvp: ["iOS 分享扩展直存 vault", "按日期/笔记自动建子目录", "Markdown 链接自动回填"],
    buildDays: 12,
    revenue: "一次性 $9.99",
    platforms: ["iOS", "macOS", "Widget", "Local First"],
    trend: "Stable",
    whyNow: "Obsidian 用户基数稳定增长，iCloud vault 同步已成熟，移动端摄影工作流仍是空白。",
  },
  {
    id: "op-037",
    no: 3,
    title: "Apple Music 播放列表「去重 + 找出被删单曲」",
    subreddits: ["r/AppleMusic", "r/mac"],
    mentions: 19,
    firstSeen: "2026-05-28",
    quote: "does anyone know a way to find which songs got pulled from my playlists after a label dispute",
    quoteAuthor: "u/vinyl_to_digital",
    problem: "版权下架、专辑改版会让播放列表悄悄消失歌曲，用户毫无察觉，长期收藏的歌单逐渐「烂尾」。",
    workaround: "定期手动逐首核对，或干脆放弃维护大歌单。",
    users: "十年以上的 Apple Music 重度用户、歌单策展人",
    solution: "MusicKit 授权后定期快照歌单，diff 出被移除/替换的曲目并推送通知，一键找替代版本。",
    score: { frequency: 3, urgency: 3, pay: 3, competition: 1, complexity: 2 },
    gap: "Spotify 生态有类似工具，Apple Music 这块完全是空白，MusicKit 官方 API 支持良好。",
    mvp: ["歌单快照 + 每周 diff", "下架通知", "同名替代曲目建议"],
    buildDays: 9,
    revenue: "订阅 $2.99/月（多歌单监控）",
    platforms: ["macOS", "iOS", "Apple Music", "Widget"],
    trend: "Growing",
    whyNow: "近半年版权下架讨论帖明显增多，MusicKit v2 新增了历史元数据接口。",
  },
  {
    id: "op-035",
    no: 4,
    title: "Gmail 菜单栏「等待回复」雷达",
    subreddits: ["r/GMail", "r/productivity", "r/Entrepreneur"],
    mentions: 41,
    firstSeen: "2026-05-15",
    quote: "I have to manually scroll through sent mail every Monday just to see who ghosted me",
    quoteAuthor: "u/freelance_pm",
    problem: "自由职业者/小团队负责人需要追踪「发出去但没人回」的邮件，Gmail 没有原生的等待跟进视图。",
    workaround: "star 邮件手动记、用 Boomerang 但功能过重且贵。",
    users: "独立顾问、小型 Agency、销售",
    solution: "轻量菜单栏 App，OAuth 只读 Gmail，本地判定「已发送 X 天无回复」，列表+到期提醒，不做群发不碰营销。",
    score: { frequency: 4, urgency: 4, pay: 4, competition: 3, complexity: 2 },
    gap: "Boomerang/Mixmax 是重型销售工具订阅制；纯粹「等待回复雷达」这个单一场景的轻量本地工具没人做。",
    mvp: ["只读扫描已发送邮件", "N 天无回复列表", "菜单栏徽标提醒"],
    buildDays: 11,
    revenue: "订阅 $4.99/月",
    platforms: ["macOS", "Menu Bar", "Widget"],
    trend: "Growing",
    whyNow: "r/GMail 和 r/Entrepreneur 里「跟进邮件」类抱怨帖近两月连续出现，Gmail API 只读权限审核已简化。",
  },
  {
    id: "op-033",
    no: 5,
    title: "Notion 数据库「本地只读镜像」防丢失",
    subreddits: ["r/Notion", "r/SmallBusiness"],
    mentions: 22,
    firstSeen: "2026-06-08",
    quote: "there should be a way to just have a local backup that isn't a giant markdown export mess",
    quoteAuthor: "u/agency_ops",
    problem: "小团队用 Notion 存核心业务数据，担心账号被封/误删/断网无法访问，官方导出是一坨 Markdown+CSV 很难用。",
    workaround: "定期手动导出压缩包存起来，几乎没人真的做。",
    users: "用 Notion 做业务系统的小微团队主理人",
    solution: "菜单栏后台任务，定时拉取指定数据库，本地 SQLite 镜像 + 只读原生界面查看，断网也能查。",
    score: { frequency: 3, urgency: 4, pay: 4, competition: 3, complexity: 3 },
    gap: "第三方备份工具多面向开发者要配置 API key 和脚本，非技术团队主理人缺一个「装上就自动跑」的选项。",
    mvp: ["定时拉取数据库快照", "本地 SQLite 只读镜像", "断网可查看+搜索"],
    buildDays: 13,
    revenue: "订阅 $6.99/月（按数据库数量分级）",
    platforms: ["macOS", "Local First", "Automation"],
    trend: "Stable",
    whyNow: "Notion 近期几次区域性故障上了 r/SmallBusiness 热帖，用户对「单点依赖」的焦虑在上升。",
  },
  {
    id: "op-030",
    no: 6,
    title: "Xcode 构建失败「一句话摘要」通知",
    subreddits: ["r/swift", "r/iOSProgramming"],
    mentions: 30,
    firstSeen: "2026-05-20",
    quote: "I'm looking for something that just tells me WHY the build failed without me scrolling the log",
    quoteAuthor: "u/swiftui_grind",
    problem: "Xcode 构建失败日志冗长，尤其是 SwiftUI 类型推断错误堆栈很长，独立开发者切到别的窗口后经常忘了错误在哪。",
    workaround: "手动翻日志，或者盯着 Xcode 等编译完。",
    users: "SwiftUI/iOS 独立开发者",
    solution: "菜单栏后台监听 Xcode 构建结果，失败时用本地小模型抽取关键报错行 + 涉及文件，弹通知点开直达。",
    score: { frequency: 4, urgency: 3, pay: 3, competition: 2, complexity: 3 },
    gap: "现有构建通知工具（如 xcbeautify 集成）只做美化输出，不做「一句话摘要+跳转」。",
    mvp: ["监听构建结果", "关键报错行抽取", "点击通知跳转出错文件"],
    buildDays: 10,
    revenue: "一次性 $14.99",
    platforms: ["macOS", "Menu Bar", "AI Agent"],
    trend: "Stable",
    whyNow: "SwiftUI 报错信息以「难读」著称的讨论长期存在，本地小模型摘要成本已经足够低。",
  },
  {
    id: "op-028",
    no: 7,
    title: "多显示器「Launchpad 记忆」— 应用固定屏位",
    subreddits: ["r/mac", "r/macapps"],
    mentions: 25,
    firstSeen: "2026-06-14",
    quote: "why can't macOS just remember which monitor each app goes on, every single reboot I have to redrag everything",
    quoteAuthor: "u/dual_monitor_pain",
    problem: "外接显示器断连重连、重启后窗口位置全部重置，多屏用户每天要重新拖拽排布。",
    workaround: "用 Rectangle/Magnet 手动重新摆一遍，或忍受混乱。",
    users: "多显示器办公的开发者、设计师",
    solution: "轻量后台服务，监听显示器拓扑变化，按 App 记忆屏位+窗口尺寸并自动恢复。",
    score: { frequency: 5, urgency: 3, pay: 3, competition: 3, complexity: 2 },
    gap: "Rectangle 类工具做手动摆放规则，没有「拓扑变化自动恢复历史布局」这个自动化层。",
    mvp: ["监听显示器拓扑事件", "App-屏位-尺寸记忆", "重连自动恢复"],
    buildDays: 9,
    revenue: "一次性 $12.99",
    platforms: ["macOS", "Automation", "Local First"],
    trend: "Growing",
    whyNow: "居家办公多屏配置持续普及，此类抱怨帖每月都在 r/mac 复现。",
  },
  {
    id: "op-025",
    no: 8,
    title: "SaaS 独立开发者的「MRR 流失预警」小组件",
    subreddits: ["r/SaaS", "r/IndieDev"],
    mentions: 18,
    firstSeen: "2026-06-05",
    quote: "I have to do this every day: open Stripe dashboard just to see if anyone cancelled",
    quoteAuthor: "u/bootstrapped_founder",
    problem: "独立开发者每天手动打开 Stripe 后台确认有没有掉单，缺一个桌面级即时可见的流失信号。",
    workaround: "每天登录 Stripe Dashboard 或设 Zapier 邮件提醒，噪音大。",
    users: "Bootstrap SaaS 独立开发者",
    solution: "只读 Stripe API 接入，桌面 Widget 显示 MRR 曲线+今日取消数，异常波动本地推送。",
    score: { frequency: 5, urgency: 4, pay: 4, competition: 3, complexity: 2 },
    gap: "Baremetrics 等是完整分析平台订阅贵；只做「今日流失一眼看」的极简 Widget 是空白。",
    mvp: ["Stripe 只读接入", "桌面 Widget 显示 MRR/取消", "异常波动通知"],
    buildDays: 8,
    revenue: "订阅 $5/月",
    platforms: ["macOS", "Widget", "Menu Bar"],
    trend: "Growing",
    whyNow: "r/SaaS 和 r/IndieDev 近期「今天又掉了一单」类吐槽帖持续走高。",
  },
  {
    id: "op-021",
    no: 9,
    title: "个人 Self-host 服务「一张卡片」健康面板",
    subreddits: ["r/selfhosted"],
    mentions: 21,
    firstSeen: "2026-05-30",
    quote: "this is annoying, I have five different tabs open just to check if my services are still alive",
    quoteAuthor: "u/homelab_tinkerer",
    problem: "自建 NAS/Docker 服务一多，用户要开好几个浏览器标签逐个确认在线状态，缺一个原生轻量总览。",
    workaround: "用 Uptime Kuma 网页版，但仍要开浏览器，不是原生桌面体验。",
    users: "Homelab/Self-host 爱好者",
    solution: "macOS 菜单栏应用，轮询自建服务健康检查端点，图标变色+today widget 一览全部服务状态。",
    score: { frequency: 4, urgency: 2, pay: 2, competition: 3, complexity: 2 },
    gap: "Uptime Kuma 本身是自托管网页服务；缺一个『原生菜单栏客户端』薄壳。",
    mvp: ["健康检查轮询", "菜单栏图标变色告警", "Today Widget 服务列表"],
    buildDays: 7,
    revenue: "一次性 $7.99",
    platforms: ["macOS", "Menu Bar", "Widget", "Local First"],
    trend: "Stable",
    whyNow: "r/selfhosted 订阅数持续增长，付费意愿偏低但维护成本也低，适合作为长尾补充产品。",
  },
];

export const recommendation = {
  pick: opportunities[3], // Gmail follow-up radar
  reason:
    "分数最高、竞品是重型订阅工具留出的空隙最大，且完全落在只读 API + 菜单栏本地判定的舒适区，两周能收敛到可上架版本。",
};
