/** 首页刊头：窄屏缩小字号与边距 */
export default function Masthead() {
  return (
    <header className='border-b-2 border-ink pb-5 pt-8 sm:pb-6 sm:pt-10'>
      <div className='shell'>
        <div className='font-mono text-[11px] uppercase tracking-widest text-ink2'>日报归档 · 每天一份</div>
        <h1 className='mt-2 font-display text-[2.25rem] font-bold leading-[1.05] tracking-tight sm:mt-3 sm:text-[2.75rem] md:text-6xl'>
          线报
        </h1>
        <p className='mt-2 font-display text-base italic leading-snug text-ink2 sm:text-lg'>
          从 Reddit 抱怨帖里，每天筛出值得独立开发者动手的产品机会
        </p>
        <p className='mt-3 max-w-xl text-sm leading-relaxed text-ink2 sm:mt-4 sm:text-[13px]'>
          每天扫描 r/macapps、r/SaaS、r/ObsidianMD 等 17 个社区的新帖与热评， 抽取「抱怨 · 手动重复劳动 ·
          求推荐替代品」这类信号，按频率、紧迫度、 付费意愿、竞争与实现难度打分。同一痛点会自动去重合并进持久机会库——
          只有新出现、或热度显著上升的机会才会再次出现在日报里。
        </p>
      </div>
    </header>
  );
}
