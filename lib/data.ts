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

export const total = (s: Score) => s.frequency + s.urgency + s.pay + (6 - s.competition) + (6 - s.complexity);

export const firstSeen = (o: Opportunity) => o.log[0].date;
export const lastSeen = (o: Opportunity) => o.log[o.log.length - 1].date;
export const totalMentions = (o: Opportunity) => o.log.reduce((sum, e) => sum + e.delta, 0);
export const entryOn = (o: Opportunity, date: string) => o.log.find((e) => e.date === date);

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
    id: "op-044",
    title: "高沉迷 App 打开前「意图减速器」",
    subreddits: ["r/adhdwomen"],
    quote: "What I really need is a speed bump.",
    quoteAuthor: "u/SecretPitch9851",
    problem:
      "用户会在没有明确意识的情况下打开 TikTok、X 等高沉迷 App，系统 Screen Time 容易绕过，而完全封锁又会带来过强限制感，最终导致用户关闭工具。",
    workaround:
      "使用 Screen Time、强制 App Blocker，或把目标 App 移出主屏幕，但仍会本能搜索并打开，且现有方案要么太容易跳过，要么过于严格。",
    users: "ADHD 用户、学生、远程工作者以及希望减少无意识刷手机行为的 iPhone 用户",
    solution: "iOS 本地优先工具，在用户打开选定 App 前插入短暂停顿，要求选择打开意图或等待数秒，再决定继续或返回。",
    score: {
      frequency: 4,
      urgency: 4,
      pay: 3,
      competition: 5,
      complexity: 3,
    },
    gap: "One Sec、Opal 和 ScreenZen 已覆盖类似行为干预，剩余空间是无账户、一次性买断、只专注打开前停顿的极简本地体验；系统限制使真正无缝拦截存在风险。",
    mvp: [
      "选择需要干预的 App",
      "打开前显示 5 至 15 秒暂停页面",
      "记录本次打开意图和最终选择",
      "展示主动返回与继续打开次数",
      "提供 Shortcuts 自动化配置引导",
    ],
    buildDays: 12,
    revenue: "一次性 $4.99–7.99",
    platforms: ["iOS", "Shortcuts", "Local First", "Focus"],
    trend: "Growing",
    whyNow: "用户对完全封锁式数字健康工具产生抵触，近期需求更偏向轻量行为干预而非强制限制。",
    log: [
      {
        date: "2026-07-21",
        delta: 1,
        note: "用户明确要求在点击 App 图标后立即加入 speed bump，以打断无意识打开行为；来源：https://www.reddit.com/r/adhdwomen/comments/1twavzs/",
      },
    ],
  },
  {
    id: "op-045",
    title: "多平台内容「分享即归档」本地收件箱",
    subreddits: ["r/ProductivityApps"],
    quote: "The problem is everything ends up scattered across different platforms and folders.",
    quoteAuthor: "u/Ok-Construction-4358",
    problem:
      "用户从 LinkedIn、Facebook、网页、Google 搜索、PDF、图片和截图中保存资料后，内容散落在不同平台和文件夹，无法统一添加标签、笔记并进行全文搜索。",
    workaround:
      "同时使用 Notion、Obsidian、Evernote、OneNote、Raindrop 或 Readwise，再手动复制内容、下载附件和整理标签。",
    users: "研究人员、市场分析人员、产品经理、独立开发者和重度信息收集用户",
    solution:
      "iOS 与 macOS 本地资料收件箱，通过系统分享扩展统一接收网页、文本、图片和 PDF，生成离线快照并建立本地全文索引。",
    score: {
      frequency: 5,
      urgency: 3,
      pay: 3,
      competition: 5,
      complexity: 3,
    },
    gap: "现有工具通常偏网页书签或完整知识库，移动端分享流程、附件统一搜索、动态内容快照和无账户本地存储仍难同时满足。",
    mvp: [
      "iOS 与 macOS Share Extension",
      "保存网页、文字、图片和 PDF",
      "标签与来源分类",
      "本地全文搜索",
      "保存原文件和离线快照",
    ],
    buildDays: 14,
    revenue: "一次性 $14.99，后续可选 iCloud Pro",
    platforms: ["iOS", "macOS", "Share Extension", "Local First"],
    trend: "Growing",
    whyNow: "社交平台和动态网页成为主要资料来源，但传统书签工具仍以静态 URL 为中心，跨格式收集需求持续增加。",
    log: [
      {
        date: "2026-07-21",
        delta: 1,
        note: "用户列出 LinkedIn、Facebook、网页、PDF、截图等多个来源，并明确希望统一标签、笔记与搜索；来源：https://www.reddit.com/r/ProductivityApps/comments/1u9fvgi/",
      },
    ],
  },
  {
    id: "op-046",
    title: "跨电商平台「真实利润」比较器",
    subreddits: ["r/Businessowners"],
    quote:
      "enter the product cost, sale price, shipping, ad spend, and other basics once, then see estimated fees, net profit, margin, and break-even price across each platform.",
    quoteAuthor: "u/Harmlessbody302",
    problem:
      "跨平台卖家需要分别查询不同平台的手续费、支付费、广告费和运费，同一商品必须重复输入数据，难以快速判断在哪个平台销售利润最高。",
    workaround:
      "分别打开 Etsy、eBay、Amazon、Mercari、Poshmark、Shopify 和 Facebook Marketplace 的费用计算器，或维护复杂电子表格。",
    users: "跨平台二手卖家、手工艺卖家、小型独立电商和套利卖家",
    solution:
      "移动端优先的商品利润比较器，一次输入成本、售价、运费和广告费，并排展示多个平台的净利润、利润率和盈亏平衡价。",
    score: {
      frequency: 4,
      urgency: 4,
      pay: 4,
      competition: 3,
      complexity: 2,
    },
    gap: "单个平台费用计算器很多，但缺少易用的跨平台并排比较、商品预设和移动端快速测算；主要壁垒是持续维护平台费率。",
    mvp: [
      "支持 Etsy、eBay、Amazon 和 Shopify",
      "输入成本、售价、运费和广告费",
      "比较净利润、利润率和盈亏平衡价",
      "保存商品预设",
      "导出 CSV",
    ],
    buildDays: 10,
    revenue: "基础计算免费，Pro $19.99/年",
    platforms: ["iOS", "Web", "Calculator", "Local First"],
    trend: "Growing",
    whyNow: "越来越多个人卖家同时经营多个平台，而平台费用结构不断复杂化，人工比较的成本持续上升。",
    log: [
      {
        date: "2026-07-21",
        delta: 1,
        note: "卖家明确描述一次输入商品数据并比较多个平台费用、净利润与盈亏平衡价的需求；来源：https://www.reddit.com/r/Businessowners/comments/1u8gvdl/",
      },
    ],
  },
  {
    id: "op-047",
    title: "固定报价项目「实际时薪亏损雷达」",
    subreddits: ["r/LawFirm"],
    quote: "a 'simple' matter ends up taking 20 hours of back-and-forth",
    quoteAuthor: "u/Mustafa_Mercan",
    problem: "固定报价项目通常不被认真记录时间，项目经过大量沟通和返工后，团队无法及时发现实际时薪和利润已经大幅下降。",
    workaround: "使用 Excel、Trello 或大型行业管理软件，但表格依赖人工维护，专业系统又过于昂贵和臃肿。",
    users: "小型律所、设计工作室、软件外包团队以及采用固定报价的自由职业者",
    solution: "macOS 菜单栏本地工具，将项目固定报价与累计工作时间结合，实时显示实际时薪，并在项目利润跌破目标时提醒。",
    score: {
      frequency: 4,
      urgency: 5,
      pay: 5,
      competition: 3,
      complexity: 2,
    },
    gap: "Timing、Toggl 和 Harvest 以时间记录为中心，行业系统以案件管理为中心，缺少只关注固定报价项目是否正在亏损的轻量本地产品。",
    mvp: [
      "创建项目并记录固定报价",
      "菜单栏开始和切换当前项目",
      "手动或自动累计工作时间",
      "显示实际时薪与利润预警",
      "导出项目 CSV 周报",
    ],
    buildDays: 10,
    revenue: "一次性 $19.99–29.99",
    platforms: ["macOS", "Menu Bar", "Local First", "Freelance"],
    trend: "Growing",
    whyNow: "固定报价在专业服务和自由职业中普遍存在，但成本上涨和沟通频次增加，使项目利润泄漏更容易发生。",
    log: [
      {
        date: "2026-07-21",
        delta: 1,
        note: "小型律所明确描述固定报价案件缺少时间记录，Excel 与 Trello 又无法持续维护的问题；来源：https://www.reddit.com/r/LawFirm/comments/1r6kgm1/",
      },
    ],
  },
  {
    id: "op-048",
    title: "搬家纸箱「二维码内容清单」",
    subreddits: ["r/army"],
    quote:
      "Being able to scan each box and know exactly what's in it when your HHG finally shows up 6 weeks later would be huge.",
    quoteAuthor: "u/Ok-Preference-1806",
    problem:
      "搬家物品被装入大量纸箱后，用户只能依赖箱号、手写标签或记忆；经过数周运输后，很难知道每个纸箱内有哪些物品以及应优先拆哪个箱子。",
    workaround: "在纸箱上手写房间和内容，使用电子表格维护箱号，或拍摄大量无法与具体纸箱稳定关联的照片。",
    users: "跨城市搬家家庭、军人家庭、留学生和短期仓储用户",
    solution: "iPhone 搬家清单 App，为每个纸箱生成二维码，拍摄箱内物品并添加房间和关键词，扫码即可查看内容。",
    score: {
      frequency: 3,
      urgency: 4,
      pay: 3,
      competition: 3,
      complexity: 2,
    },
    gap: "通用库存管理 App 过重，搬家公司标签只解决运输编号；家庭用户需要的是无需账户、快速拍照、打印标签和扫码找箱的短期工具。",
    mvp: [
      "创建搬家项目",
      "创建纸箱并拍摄箱内内容",
      "生成可打印二维码标签",
      "扫码查看纸箱内容",
      "按房间、关键词和优先级筛选",
    ],
    buildDays: 9,
    revenue: "单次搬家包 $4.99，或一次性 $9.99",
    platforms: ["iOS", "QR Code", "Camera", "Local First"],
    trend: "Stable",
    whyNow: "搬家流程仍大量依赖纸质标签，而手机扫码、照片识别和便携标签打印已经让低成本数字化变得可行。",
    log: [
      {
        date: "2026-07-21",
        delta: 1,
        note: "军人搬家讨论中明确提出扫描纸箱并查看箱内物品，以替代难辨认的搬家公司手写标签；来源：https://www.reddit.com/r/army/comments/1twavzs/",
      },
    ],
  },
  {
    id: "op-043",
    title: "AI 编程会话「意图漂移」提交前审计",
    subreddits: ["r/SideProject"],
    quote: "The AI is great at the thing I ask it to do and terrible at remembering why we're doing it.",
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
    problem: "一次性批量清理能把未读归零，但新营销邮件仍持续回流；用户只能靠每日巡检维护，出差或中断后又会重新堆积。",
    workaround: "搜索 unsubscribe、按发件人批删、全部标为已读，每天花十分钟清扫并手工维护大量 Gmail 过滤器。",
    users: "长期订阅品牌邮件、曾清理后复发的 Gmail 重度用户与多邮箱知识工作者",
    solution: "本地优先扩展，建立正常邮件预算，只读邮件头统计每日流量，识别新增或突增发件人并生成过滤与退订建议。",
    score: { frequency: 5, urgency: 3, pay: 3, competition: 4, complexity: 2 },
    gap: "Clean Email、SaneBox 及本地清理扩展已覆盖批删、退订和自动分流；窄缺口是围绕正常邮件基线持续检测新增或异常增长来源，专门预防清理后回潮。",
    mvp: ["按发件人和域名建立每日邮件基线", "新增与异常增长发件人预警", "一键生成 Gmail 过滤与退订建议"],
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
    quote:
      "why can't macOS just remember which monitor each app goes on, every single reboot I have to redrag everything",
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
