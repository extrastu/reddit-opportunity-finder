export default function Masthead() {
  return (
    <header className="border-b-2 border-ink px-6 pb-6 pt-10 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-widest text-ink2">
          <span>Vol. 09 · Issue 041</span>
          <span>2026 年 7 月 19 日</span>
        </div>
        <h1 className="mt-3 font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl">
          线报
        </h1>
        <p className="mt-2 font-display text-lg italic text-ink2">
          从 Reddit 抱怨帖里，筛出值得独立开发者动手的产品机会
        </p>
        <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ink2">
          每周扫描 r/macapps、r/SaaS、r/ObsidianMD 等 17 个社区的新帖与热评，
          抽取「抱怨 · 手动重复劳动 · 求推荐替代品」这类信号，
          按频率、紧迫度、付费意愿、竞争与实现难度打分，只留分数 ≥18 的机会。
        </p>
      </div>
    </header>
  );
}
