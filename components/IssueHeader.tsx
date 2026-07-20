import Link from "next/link";
import { Issue, ISSUE_DATES } from "@/lib/issues";

function fmt(date: string) {
  const [y, m, d] = date.split("-");
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
}

export default function IssueHeader({ issue }: { issue: Issue }) {
  const idx = ISSUE_DATES.indexOf(issue.date as (typeof ISSUE_DATES)[number]);
  const prev = idx > 0 ? ISSUE_DATES[idx - 1] : null;
  const next = idx < ISSUE_DATES.length - 1 ? ISSUE_DATES[idx + 1] : null;

  return (
    <header className='border-b-2 border-ink pb-6 pt-10 '>
      <div className='mx-auto max-w-3xl px-10'>
        <div className='flex items-baseline justify-between font-mono text-[11px] uppercase tracking-widest text-ink2'>
          <span>Issue No.{issue.no.toString().padStart(2, "0")}</span>
          <span>{fmt(issue.date)}</span>
        </div>
        <h1 className='mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl'>
          {issue.entries.length > 0 ? `今日发现 ${issue.entries.length} 个信号` : "今日无新信号"}
        </h1>
        <p className='mt-3 max-w-xl text-[13px] leading-relaxed text-ink2'>
          机会库累计追踪 {issue.trackedSoFar} 个机会，其中 {issue.entries.filter((e) => e.status === "new").length}{" "}
          个今天首次出现，
          {issue.entries.filter((e) => e.status === "spike").length} 个热度骤增。 另有 {issue.silentCount}{" "}
          个机会今天继续被提及（+{issue.silentMentions} 次）， 但无显著变化，已自动去重、不再重复展开。
        </p>
        <div className='mt-5 flex justify-between font-mono text-[11px] uppercase tracking-widest'>
          {prev ? (
            <Link href={`/issues/${prev}`} className='text-ink2 hover:text-ink'>
              ← 上一期
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/issues/${next}`} className='text-ink2 hover:text-ink'>
              下一期 →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </header>
  );
}
