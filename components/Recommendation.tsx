import { opportunities, recommendation, total } from "@/lib/data";

export default function Recommendation() {
  const { pick, reason } = recommendation;
  return (
    <section className="mx-auto max-w-3xl px-6 pb-10 sm:px-10">
      <div className="border-2 border-flag bg-amberDim/40 p-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-flag">
          如果这周只做一个
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold">{pick.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-ink2">{reason}</p>
        <p className="mt-3 font-mono text-[11px] text-ink2">
          分数 {total(pick.score)}/25 · {pick.buildDays} 天可上线 · 共 {opportunities.length} 个机会中排名第一
        </p>
      </div>
    </section>
  );
}
