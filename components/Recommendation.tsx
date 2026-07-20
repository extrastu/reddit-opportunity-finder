import { Issue, issueTopPick } from "@/lib/issues";
import { total } from "@/lib/data";

export default function Recommendation({ issue }: { issue: Issue }) {
  const pick = issueTopPick(issue);
  if (!pick) return null;

  return (
    <section className='mx-auto max-w-3xl py-10 px-10'>
      <div className='border-2 border-flag bg-amberDim/40 p-6'>
        <p className='font-mono text-[10px] uppercase tracking-widest text-flag'>如果今天只做一个</p>
        <h3 className='mt-2 font-display text-2xl font-bold'>{pick.o.title}</h3>
        <p className='mt-2 text-[13px] leading-relaxed text-ink2'>{pick.o.gap}</p>
        <p className='mt-3 font-mono text-[11px] text-ink2'>
          分数 {total(pick.o.score)}/25 · {pick.o.buildDays} 天可上线 · 今日排名第一
        </p>
      </div>
    </section>
  );
}
