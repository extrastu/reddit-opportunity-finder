import { firstSeen, lastSeen, totalMentions } from "@/lib/data";
import { IssueEntry } from "@/lib/issues";
import ScoreMeter from "./ScoreMeter";

export default function OpportunityCard({ entry }: { entry: IssueEntry }) {
  const { o, status, delta, note } = entry;

  return (
    <article className="border-b border-rule py-9 first:pt-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-ink2">
        <span
          className={`rounded-sm px-1.5 py-0.5 font-bold text-paper ${
            status === "new" ? "bg-signal" : "bg-flag"
          }`}
        >
          {status === "new" ? "NEW" : "SPIKE +" + delta}
        </span>
        {o.subreddits.map((s) => (
          <span key={s} className="rounded-sm bg-paper2 px-1.5 py-0.5">
            {s}
          </span>
        ))}
        <span className="text-rule">·</span>
        <span>累计 {totalMentions(o)} 次提及</span>
        <span className="text-rule">·</span>
        <span
          className={
            o.trend === "Growing"
              ? "text-signal"
              : o.trend === "Declining"
              ? "text-flag"
              : "text-ink2"
          }
        >
          {o.trend === "Growing" ? "↗ 上升" : o.trend === "Declining" ? "↘ 下降" : "→ 平稳"}
        </span>
      </div>

      <h2 className="mt-2 font-display text-2xl font-bold leading-snug">{o.title}</h2>

      {note && (
        <p className="mt-1 text-[12px] text-flag">触发原因：{note}</p>
      )}

      <blockquote className="mt-3 border-l-2 border-ink pl-4 font-display text-[15px] italic leading-relaxed text-ink2">
        "{o.quote}"
        <span className="mt-1 block font-mono text-[11px] not-italic tracking-wide text-ink2/70">
          — {o.quoteAuthor}
        </span>
      </blockquote>

      <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="space-y-3 text-[13.5px] leading-relaxed">
          <p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink2">问题　</span>
            {o.problem}
          </p>
          <p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink2">现有变通　</span>
            {o.workaround}
          </p>
          <p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink2">缺口　</span>
            {o.gap}
          </p>
        </div>
        <div className="sm:w-[220px]">
          <ScoreMeter score={o.score} />
        </div>
      </div>

      <div className="mt-5 border border-rule bg-paper2/60 p-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-signal">
          MVP · {o.buildDays} 天可上线
        </div>
        <p className="mt-1 text-[13px] text-ink2">{o.solution}</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {o.mvp.map((f) => (
            <li
              key={f}
              className="rounded-sm border border-signal/40 bg-signalDim px-2 py-1 text-[12px] text-signal"
            >
              {f}
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink2">
          <span>目标用户：{o.users}</span>
          <span>·</span>
          <span>变现：{o.revenue}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {o.platforms.map((p) => (
            <span key={p} className="rounded-sm bg-ink px-1.5 py-0.5 font-mono text-[10px] text-paper">
              {p}
            </span>
          ))}
        </div>
      </div>

      <p className="mt-4 text-[12.5px] text-ink2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-amber">为什么是现在　</span>
        {o.whyNow}
      </p>

      <p className="mt-2 font-mono text-[10px] text-ink2/70">
        首次出现 {firstSeen(o)} · 最近提及 {lastSeen(o)}
      </p>
    </article>
  );
}
