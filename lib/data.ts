export type Score = {
  frequency: number;
  urgency: number;
  pay: number;
  competition: number;
  complexity: number;
};

export type LogEntry = { date: string; delta: number; note?: string };

export type Opportunity = {
  id: string;
  title: string;
  subreddits: string[];
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
  log: LogEntry[]; // chronological, log[0] = first-ever appearance ("NEW")
};

export const SPIKE_THRESHOLD = 8;

export const total = (s: Score) =>
  s.frequency + s.urgency + s.pay + (6 - s.competition) + (6 - s.complexity);

export const firstSeen = (o: Opportunity) => o.log[0].date;
export const lastSeen = (o: Opportunity) => o.log[o.log.length - 1].date;
export const totalMentions = (o: Opportunity) =>
  o.log.reduce((sum, e) => sum + e.delta, 0);
export const entryOn = (o: Opportunity, date: string) =>
  o.log.find((e) => e.date === date);

export type DayStatus = "new" | "spike" | "silent" | "absent";

export const statusOn = (o: Opportunity, date: string): DayStatus => {
  const entry = entryOn(o, date);
  if (!entry) return "absent";
  if (entry.date === o.log[0].date) return "new";
  if (entry.delta >= SPIKE_THRESHOLD) return "spike";
  return "silent";
};

export const opportunities: Opportunity[] = [
  {
    id: "op-043",
    title: "AI 编程会话「意图漂移」提交前审计",
    subreddits: ["r/SideProject"],
    quote:
      "The AI is great at the thing I ask it to do and terrible at remembering why we're doing it.",
    quoteAuthor: "u/Aurascriptworks",
    problem:
      "AI 编程工具在长会话或跨会话中会遗忘项目的 why、既有决策与约束，输出可能逐步偏离原目标；开发者必须反复补上下文并持续人工审查，否则可能把偏航改动带进提交。",
    workaround:
      "维护 notes/CLAUDE.md/AGENTS.md，每次新会话粘贴 preamble；长任务主动拆成短会话，并逐步人工 review git diff。",
    users: "高频使用 Claude Code、Codex、Cursor 的独立开发者与小型 AI-first 团队",
    solution:
      "macOS 本地 companion：开始任务时固定 goal/why/scope，读取本地会话记录与 git diff，在提交前给出偏离目标、越界文件和缺失验证的简短审计。",
    score: { frequency: 3, urgency: 3, pay: 2, competition: 5, complexity: 4 },
    gap: "IntentGuard、RunTrim、Shipmoor 已覆盖意图审计、任务契约和提交前验证，Contextify 已覆盖 macOS 本地会话记忆；剩余空间主要是更轻量的原生菜单栏 UI 与个人 goal/why 可视化，不是明显功能空白。",
    mvp: [
      "固定本次任务的 goal、why 与允许修改范围",
      "读取 Claude Code/Codex 本地会话与 git diff",
      "提交前输出意图偏离、越界文件与验证缺口",
    ],
    buildDays: 14,
    revenue: "一次性 $9.99–19.99；免费 CLI 竞品较多，不建议高价订阅",
    platforms: ["macOS", "Menu Bar", "Local First", "AI Agent"],
    trend: "Growing",
    whyNow:
      "同一讨论串中 4 个独立账号重复描述上下文衰减；同时多款竞品已进入市场，说明问题升温，也说明窗口正在快速拥挤。",
    log: [
      {
        date: "2026-07-20",
        delta: 4,
        note: "4 个独立账号提到跨会话失忆或长会话偏航；来源：https://www.reddit.com/r/SideProject/comments/1v0t9qv/whats_the_biggest_frustration_you_still_have_when/oyhr5tx/",
      },
    ],
  },
  {
    id: "op-042",
    title: "Gmail 收件箱「回潮预警」",
    subreddits: ["r/GMail"],
    quote: "still unsolved: keeping it this way. the pile has rebuilt before.",
    quoteAuthor: "u/WiseIndependent15",
    problem:
      "一次性批量清理能把未读归零，但新营销邮件仍持续回流；用户只能靠每日巡检维护，出差或中断后又会重新堆积。",
    workaround:
      "搜索 unsubscribe、按发件人批删、全部标为已读，每天花十分钟清扫并手工维护大量 Gmail 过滤器。",
    users: "长期订阅品牌邮件、曾清理后复发的 Gmail 重度用户与多邮箱知识工作者",
    solution:
      "本地优先扩展，建立正常邮件预算，只读邮件头统计每日流量，识别新增或突增发件人并生成过滤与退订建议。",
    score: { frequency: 5, urgency: 3, pay: 3, competition: 4, complexity: 2 },
    gap: "Clean Email、SaneBox 及本地清理扩展已覆盖批删、退订和自动分流；窄缺口是围绕正常邮件基线持续检测新增或异常增长来源，专门预防清理后回潮。",
    mvp: [
      "按发件人和域名建立每日邮件基线",
      "新增与异常增长发件人预警",
      "一键生成 Gmail 过滤与退订建议",
    ],
    buildDays: 9,
    revenue: "一次性 $12.99，免费试扫一个月数据",
    platforms: ["Chrome Extension", "macOS", "Local First", "Automation"],
    trend: "Stable",
    whyNow:
      "一次性清理工具已经成熟，但真实复盘显示长期维持仍靠每日手工巡检；评论首次把它具体化为可量化的 email budget。",
    log: [
      {
        date: "2026-07-20",
        delta: 1,
        note: "清理复盘显示收件箱反复回潮，评论提出按正常邮件基线识别泄漏来源；来源：https://www.reddit.com/r/GMail/comments/1v0jr0b/",
      },
    ],
  },
  {
    id: "op-041",
    title: "菜单栏级「屏幕时间」按 App 分类自动打标签",
    subreddits: ["r/macapps", "r/productivity"],
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
    log: [
      { date: "2026-07-15", delta: 30 },
      { date: "2026-07-16", delta: 9, note: "同类贴在 r/macapps 被顶到热门" },
      { date: "2026-07-18", delta: 2 },
      { date: "2026-07-19", delta: 1 },
    ],
  },
  {
    id: "op-039",
    title: "Obsidian 每日笔记的「随手拍」附件自动归位",
    subreddits: ["r/ObsidianMD"],
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
    trend: "Growing",
    whyNow: "Obsidian 用户基数稳定增长，iCloud vault 同步已成熟，移动端摄影工作流仍是空白。",
    log: [
      { date: "2026-07-15", delta: 27 },
      { date: "2026-07-16", delta: 2 },
      { date: "2026-07-19", delta: 10, note: "同款吐槽帖被搬到 r/Notion 交叉讨论，热度外溢" },
    ],
  },
  {
    id: "op-035",
    title: "Gmail 菜单栏「等待回复」雷达",
    subreddits: ["r/GMail", "r/productivity", "r/Entrepreneur"],
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
    log: [
      { date: "2026-07-15", delta: 24 },
      { date: "2026-07-16", delta: 1 },
      { date: "2026-07-18", delta: 11, note: "有人发帖吐槽 Boomerang 涨价，评论区大量共鸣" },
      { date: "2026-07-19", delta: 5 },
    ],
  },
  {
    id: "op-037",
    title: "Apple Music 播放列表「去重 + 找出被删单曲」",
    subreddits: ["r/AppleMusic", "r/mac"],
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
    log: [
      { date: "2026-07-16", delta: 19 },
      { date: "2026-07-17", delta: 1 },
    ],
  },
  {
    id: "op-033",
    title: "Notion 数据库「本地只读镜像」防丢失",
    subreddits: ["r/Notion", "r/SmallBusiness"],
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
    log: [
      { date: "2026-07-17", delta: 22 },
      { date: "2026-07-18", delta: 2 },
    ],
  },
  {
    id: "op-030",
    title: "Xcode 构建失败「一句话摘要」通知",
    subreddits: ["r/swift", "r/iOSProgramming"],
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
    log: [
      { date: "2026-07-17", delta: 18 },
      { date: "2026-07-19", delta: 1 },
    ],
  },
  {
    id: "op-028",
    title: "多显示器「Launchpad 记忆」— 应用固定屏位",
    subreddits: ["r/mac", "r/macapps"],
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
    log: [
      { date: "2026-07-18", delta: 21 },
      { date: "2026-07-19", delta: 2 },
    ],
  },
  {
    id: "op-025",
    title: "SaaS 独立开发者的「MRR 流失预警」小组件",
    subreddits: ["r/SaaS", "r/IndieDev"],
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
    log: [{ date: "2026-07-19", delta: 18 }],
  },
  {
    id: "op-021",
    title: "个人 Self-host 服务「一张卡片」健康面板",
    subreddits: ["r/selfhosted"],
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
    log: [{ date: "2026-07-19", delta: 16 }],
  },
];
