import Nav from "@/components/Nav";
import Trends from "@/components/Trends";
import Footer from "@/components/Footer";
import ScoreMeter from "@/components/ScoreMeter";
import { opportunities, total, firstSeen, lastSeen, totalMentions } from "@/lib/data";

export default function LibraryPage() {
  const sorted = [...opportunities].sort((a, b) => total(b.score) - total(a.score));

  return (
    <main>
      <Nav />
      <header className='border-b-2 border-ink pb-6 pt-10 '>
        <div className='mx-auto max-w-3xl px-10'>
          <div className='font-mono text-[11px] uppercase tracking-widest text-ink2'>持久机会库 · 已自动去重</div>
          <h1 className='mt-3 font-display text-4xl font-bold sm:text-5xl'>机会库</h1>
          <p className='mt-3 max-w-xl text-[13px] leading-relaxed text-ink2'>
            每个机会只有一条记录，跨社区、跨天数的重复提及会被合并成同一 ID，
            按「首次出现」「最近提及」「累计提及次数」持续追踪，而不是每天重复生成新报告。
          </p>
        </div>
      </header>

      <div className='mx-auto max-w-3xl px-10'>
        {sorted.map((o) => (
          <div key={o.id} className='border-b border-rule py-8 first:pt-8'>
            <div className='flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-widest text-ink2'>
              <span>{o.id}</span>
              <span className='text-rule'>·</span>
              {o.subreddits.map((s) => (
                <span key={s} className='rounded-sm bg-paper2 px-1.5 py-0.5'>
                  {s}
                </span>
              ))}
            </div>
            <h2 className='mt-1.5 font-display text-xl font-bold'>{o.title}</h2>
            <div className='mt-3 grid gap-4 sm:grid-cols-[1fr_auto]'>
              <div className='space-y-1 font-mono text-[11px] text-ink2'>
                <div>首次出现　{firstSeen(o)}</div>
                <div>最近提及　{lastSeen(o)}</div>
                <div>
                  累计提及　{totalMentions(o)} 次（{o.log.length} 次被记录变化）
                </div>
              </div>
              <div className='sm:w-[220px]'>
                <ScoreMeter score={o.score} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Trends items={opportunities} />
      <Footer />
    </main>
  );
}
