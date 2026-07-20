export default function Masthead() {
  return (
    <header className="border-b-2 border-ink px-6 pb-6 pt-10 sm:px-10">
      <div className="mx-auto max-w-3xl">
        <div className="font-mono text-[11px] uppercase tracking-widest text-ink2">
          日报归档 · 每天一份
        </div>
        <h1 className="mt-3 font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl">
          线报
        </h1>
        <p className="mt-2 font-display text-lg italic text-ink2">
          从 Reddit 抱怨帖里，每天筛出值得独立开发者动手的产品机会
        </p>
        <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-ink2">
          每天扫描 r/macapps、r/SaaS、r/ObsidianMD 等 17 个社区的新帖与热评，
          抽取「抱怨 · 手动重复劳动 · 求推荐替代品」这类信号，按频率、紧迫度、
          付费意愿、竞争与实现难度打分。同一痛点会自动去重合并进持久机会库——
          只有新出现、或热度显著上升的机会才会再次出现在日报里。
        </p>
      </div>
    </header>
  );
}
