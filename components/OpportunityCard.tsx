import { firstSeen, lastSeen, totalMentions } from "@/lib/data";
import { IssueEntry } from "@/lib/issues";
import ScoreMeter from "./ScoreMeter";

/** 单条机会卡片：移动端收紧间距、缩小标题与引用 */
export default function OpportunityCard({ entry }: { entry: IssueEntry }) {
  const { o, status, delta, note } = entry;

  return (
    <article className='border-b border-rule px-4 py-7 first:pt-0 sm:px-8 sm:py-9'>
      <div className='flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[10px] uppercase tracking-widest text-ink2 sm:gap-x-3'>
        <span className={`rounded-sm px-1.5 py-0.5 font-bold text-paper ${status === "new" ? "bg-signal" : "bg-flag"}`}>
          {status === "new" ? "NEW" : "SPIKE +" + delta}
        </span>
        {o.subreddits.map((s) => (
          <span key={s} className='rounded-sm bg-paper2 px-1.5 py-0.5'>
            {s}
          </span>
        ))}
        <span className='text-rule'>·</span>
        <span>累计 {totalMentions(o)} 次提及</span>
        <span className='text-rule'>·</span>
        <span className={o.trend === "Growing" ? "text-signal" : o.trend === "Declining" ? "text-flag" : "text-ink2"}>
          {o.trend === "Growing" ? "↗ 上升" : o.trend === "Declining" ? "↘ 下降" : "→ 平稳"}
        </span>
      </div>

      <h2 className='mt-2 font-display text-xl font-bold leading-snug sm:text-2xl'>{o.title}</h2>

      {note && <p className='mt-1 break-words text-xs text-flag sm:text-[12px]'>触发原因：{note}</p>}

      <blockquote className='mt-3 border-l-2 border-ink pl-3 font-display text-sm italic leading-relaxed text-ink2 sm:pl-4 sm:text-[15px]'>
        "{o.quote}"
        <span className='mt-1 block font-mono text-[11px] not-italic tracking-wide text-ink2/70'>
          — {o.quoteAuthor}
        </span>
      </blockquote>

      <div className='mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-5'>
        <div className='space-y-3 text-sm leading-relaxed sm:text-[13.5px]'>
          <p>
            <span className='font-mono text-[10px] uppercase tracking-widest text-ink2'>问题　</span>
            {o.problem}
          </p>
          <p>
            <span className='font-mono text-[10px] uppercase tracking-widest text-ink2'>现有变通　</span>
            {o.workaround}
          </p>
          <p>
            <span className='font-mono text-[10px] uppercase tracking-widest text-ink2'>缺口　</span>
            {o.gap}
          </p>
        </div>
        <div className='min-w-0 sm:w-[220px]'>
          <ScoreMeter score={o.score} />
        </div>
      </div>

      {o.frequencyEvidence && (
        <p className='mt-4 text-sm leading-relaxed text-ink2 sm:text-[12.5px]'>
          <span className='font-mono text-[10px] uppercase tracking-widest text-ink2'>频率依据　</span>
          {o.frequencyEvidence}
        </p>
      )}

      <div className='mt-5 border border-rule bg-paper2/60 p-3.5 sm:p-4'>
        <div className='font-mono text-[10px] uppercase tracking-widest text-signal'>MVP · {o.buildDays} 天可上线</div>
        <p className='mt-1 text-sm text-ink2 sm:text-[13px]'>{o.solution}</p>
        <ul className='mt-2 flex flex-wrap gap-2'>
          {o.mvp.map((f) => (
            <li key={f} className='rounded-sm border border-signal/40 bg-signalDim px-2 py-1 text-xs text-signal sm:text-[12px]'>
              {f}
            </li>
          ))}
        </ul>
        <div className='mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink2 sm:gap-x-4 sm:text-[12px]'>
          <span>目标用户：{o.users}</span>
          <span className='text-rule'>·</span>
          <span>变现：{o.revenue}</span>
        </div>
        <div className='mt-2 flex flex-wrap gap-1.5'>
          {o.platforms.map((p) => (
            <span key={p} className='rounded-sm bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper'>
              {p}
            </span>
          ))}
        </div>
      </div>

      <p className='mt-4 text-sm text-ink2 sm:text-[12.5px]'>
        <span className='font-mono text-[10px] uppercase tracking-widest text-amber'>为什么是现在　</span>
        {o.whyNow}
      </p>

      <p className='mt-2 font-mono text-[10px] text-ink2/70'>
        首次出现 {firstSeen(o)} · 最近提及 {lastSeen(o)}
      </p>
    </article>
  );
}
