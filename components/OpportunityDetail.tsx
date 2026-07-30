import Link from "next/link";
import { Opportunity, firstSeen, lastSeen, totalMentions, total } from "@/lib/data";
import ScoreMeter from "./ScoreMeter";

const RECOMMENDATION_LABEL: Record<NonNullable<Opportunity["recommendation"]>, string> = {
  Develop: "建议开发",
  "Validate First": "先验证",
  Skip: "暂缓",
};

/** 机会详情正文：完整字段，便于 SEO 与深度阅读 */
export default function OpportunityDetail({ o }: { o: Opportunity }) {
  return (
    <article className='shell pb-12 pt-2'>
      <nav className='font-mono text-[10px] uppercase tracking-widest text-ink2'>
        <Link href='/library' className='hover:text-ink'>
          机会库
        </Link>
        <span className='mx-2 text-rule'>/</span>
        <span>{o.id}</span>
      </nav>

      <div className='mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[10px] uppercase tracking-widest text-ink2 sm:gap-x-3'>
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
        <span className='text-rule'>·</span>
        <span>分数 {total(o.score)}/25</span>
      </div>

      <h1 className='mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl'>{o.title}</h1>

      <blockquote className='mt-5 border-l-2 border-ink pl-3 font-display text-sm italic leading-relaxed text-ink2 sm:pl-4 sm:text-[15px]'>
        "{o.quote}"
        <span className='mt-1 block font-mono text-[11px] not-italic tracking-wide text-ink2/70'>
          — {o.quoteAuthor}
        </span>
      </blockquote>

      <div className='mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-5'>
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

      <div className='mt-6 border border-rule bg-paper2/60 p-3.5 sm:p-4'>
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

      <p className='mt-5 text-sm text-ink2 sm:text-[12.5px]'>
        <span className='font-mono text-[10px] uppercase tracking-widest text-amber'>为什么是现在　</span>
        {o.whyNow}
      </p>

      {o.existingSolutions && o.existingSolutions.length > 0 && (
        <div className='mt-6'>
          <p className='font-mono text-[10px] uppercase tracking-widest text-ink2'>现有方案</p>
          <ul className='mt-2 flex flex-wrap gap-1.5'>
            {o.existingSolutions.map((s) => (
              <li key={s} className='rounded-sm bg-paper2 px-1.5 py-0.5 font-mono text-[11px] text-ink2'>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {o.willingnessToPaySignals && o.willingnessToPaySignals.length > 0 && (
        <div className='mt-5'>
          <p className='font-mono text-[10px] uppercase tracking-widest text-ink2'>付费意愿信号</p>
          <ul className='mt-2 list-disc space-y-1 pl-5 text-sm text-ink2 sm:text-[13px]'>
            {o.willingnessToPaySignals.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {o.recommendation && (
        <div className='mt-6 border border-rule p-3.5 sm:p-4'>
          <p className='font-mono text-[10px] uppercase tracking-widest text-ink2'>
            评估结论　
            <span className='text-ink'>{RECOMMENDATION_LABEL[o.recommendation]}</span>
          </p>
          {o.recommendationReason && (
            <p className='mt-2 text-sm leading-relaxed text-ink2 sm:text-[13px]'>{o.recommendationReason}</p>
          )}
          {o.mvpDifficulty && (
            <p className='mt-2 text-sm leading-relaxed text-ink2 sm:text-[13px]'>
              <span className='font-mono text-[10px] uppercase tracking-widest text-ink2'>难度　</span>
              {o.mvpDifficulty}
            </p>
          )}
          {o.maintenanceCost && (
            <p className='mt-2 text-sm leading-relaxed text-ink2 sm:text-[13px]'>
              <span className='font-mono text-[10px] uppercase tracking-widest text-ink2'>维护　</span>
              {o.maintenanceCost}
            </p>
          )}
        </div>
      )}

      {o.acquisitionChannels && o.acquisitionChannels.length > 0 && (
        <div className='mt-5'>
          <p className='font-mono text-[10px] uppercase tracking-widest text-ink2'>获客渠道</p>
          <ul className='mt-2 flex flex-wrap gap-1.5'>
            {o.acquisitionChannels.map((c) => (
              <li key={c} className='rounded-sm border border-rule px-1.5 py-0.5 font-mono text-[11px] text-ink2'>
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className='mt-8 border-t border-rule pt-4 font-mono text-[10px] text-ink2/70'>
        <p>
          首次出现 {firstSeen(o)} · 最近提及 {lastSeen(o)} · ID {o.id}
        </p>
        {o.log.length > 1 && (
          <ul className='mt-3 space-y-1.5'>
            {o.log.map((entry) => (
              <li key={`${entry.date}-${entry.delta}`}>
                <Link href={`/issues/${entry.date}`} className='hover:text-ink hover:underline'>
                  {entry.date}
                </Link>
                {" · "}+{entry.delta}
                {entry.note ? ` · ${entry.note}` : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
