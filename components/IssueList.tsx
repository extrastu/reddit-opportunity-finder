import Link from "next/link";
import { Issue, issueTopPick } from "@/lib/issues";
import { total } from "@/lib/data";

function fmt(date: string) {
  const [, m, d] = date.split("-");
  return `${Number(m)} 月 ${Number(d)} 日`;
}

export default function IssueList({ issues }: { issues: Issue[] }) {
  const ordered = [...issues].reverse(); // latest first
  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-10">
      <h2 className="border-b border-rule pb-3 pt-8 font-mono text-[11px] uppercase tracking-widest text-ink2">
        往期日报
      </h2>
      <ul>
        {ordered.map((issue) => {
          const pick = issueTopPick(issue);
          return (
            <li key={issue.date} className="border-b border-rule py-5">
              <Link href={`/issues/${issue.date}`} className="group block">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-ink2">
                  <span>Issue No.{issue.no.toString().padStart(2, "0")}</span>
                  <span className="text-rule">·</span>
                  <span>{fmt(issue.date)}</span>
                  <span className="text-rule">·</span>
                  <span className="text-signal">{issue.entries.length} 条新信号</span>
                  {issue.silentCount > 0 && (
                    <>
                      <span className="text-rule">·</span>
                      <span>{issue.silentCount} 条持续追踪中</span>
                    </>
                  )}
                </div>
                <h3 className="mt-1.5 font-display text-xl font-bold leading-snug group-hover:underline">
                  {pick
                    ? `头条：${pick.o.title}`
                    : "今日没有新的高分机会"}
                </h3>
                {pick && (
                  <p className="mt-1 text-[13px] text-ink2">
                    分数 {total(pick.o.score)}/25 ·{" "}
                    {pick.status === "new" ? "首次发现" : "热度骤增"}
                  </p>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
