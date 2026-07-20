import { Issue, issueTopPick } from "@/lib/issues";
import { total } from "@/lib/data";

/** 今日首选推荐块：移动端收紧内边距 */
export default function Recommendation({ issue }: { issue: Issue }) {
  const pick = issueTopPick(issue);
  if (!pick) return null;

  return (
    <section className='shell pb-8 sm:pb-10'>
      <div className='border-2 border-flag bg-amberDim/40 p-4 sm:p-6'>
        <p className='font-mono text-[10px] uppercase tracking-widest text-flag'>如果今天只做一个</p>
        <h3 className='mt-2 font-display text-xl font-bold leading-snug sm:text-2xl'>{pick.o.title}</h3>
        <p className='mt-2 text-sm leading-relaxed text-ink2 sm:text-[13px]'>{pick.o.gap}</p>
        <p className='mt-3 font-mono text-[11px] text-ink2'>
          分数 {total(pick.o.score)}/25 · {pick.o.buildDays} 天可上线 · 今日排名第一
        </p>
      </div>
    </section>
  );
}
