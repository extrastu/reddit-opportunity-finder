import Link from "next/link";
import { Issue, issueTopPick } from "@/lib/issues";
import { total } from "@/lib/data";

/** 将 YYYY-MM-DD 格式化为「M 月 D 日」 */
function fmt(date: string) {
  const [, m, d] = date.split("-");
  return `${Number(m)} 月 ${Number(d)} 日`;
}

/** 往期日报列表：移动端元信息自然换行 */
export default function IssueList({ issues }: { issues: Issue[] }) {
  const ordered = [...issues].reverse(); // 最新在前
  return (
    <div className='shell'>
      <h2 className='border-b border-rule pb-3 pt-6 font-mono text-[11px] uppercase tracking-widest text-ink2 sm:pt-8'>
        往期日报
      </h2>
      <ul>
        {ordered.map((issue) => {
          const pick = issueTopPick(issue);
          return (
            <li key={issue.date} className='border-b border-rule py-4 sm:py-5'>
              <Link href={`/issues/${issue.date}`} className='group block'>
                <div className='flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-ink2 sm:gap-x-3'>
                  <span>Issue No.{issue.no.toString().padStart(2, "0")}</span>
                  <span className='text-rule'>·</span>
                  <span>{fmt(issue.date)}</span>
                  <span className='text-rule'>·</span>
                  <span className='text-signal'>{issue.entries.length} 条新信号</span>
                  {issue.silentCount > 0 && (
                    <>
                      <span className='text-rule'>·</span>
                      <span>{issue.silentCount} 条持续追踪中</span>
                    </>
                  )}
                </div>
                <h3 className='mt-1.5 font-display text-lg font-bold leading-snug group-hover:underline sm:text-xl'>
                  {pick ? `头条：${pick.o.title}` : "今日没有新的高分机会"}
                </h3>
                {pick && (
                  <p className='mt-1 text-sm text-ink2 sm:text-[13px]'>
                    分数 {total(pick.o.score)}/25 · {pick.status === "new" ? "首次发现" : "热度骤增"}
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
