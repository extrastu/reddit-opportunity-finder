import { Score, total } from "@/lib/data";

/** 分数印章 + 分项条：窄屏防溢出 */
export default function ScoreMeter({ score }: { score: Score }) {
  const t = total(score);
  const tier = t >= 22 ? "high" : "worth";
  const tierColor = tier === "high" ? "bg-flag" : "bg-amber";
  const rows: [string, number, boolean][] = [
    ["频率", score.frequency, false],
    ["紧迫", score.urgency, false],
    ["付费意愿", score.pay, false],
    ["竞争度", score.competition, true],
    ["实现难度", score.complexity, true],
  ];

  return (
    <div className='flex min-w-0 items-start gap-3 sm:gap-4'>
      <div
        className={`stamp shrink-0 border-2 ${
          tier === "high" ? "border-flag text-flag" : "border-amber text-amber"
        } rounded-sm px-2 py-1 text-center leading-none`}
      >
        <div className='font-mono text-[10px] tracking-widest'>SCORE</div>
        <div className='font-display text-2xl font-bold'>{t}</div>
        <div className='font-mono text-[9px] tracking-widest'>/25</div>
      </div>
      <div className='min-w-0 flex-1 space-y-1.5 pt-0.5'>
        {rows.map(([label, v, inverted]) => (
          <div key={label} className='flex items-center gap-1.5 text-[11px] sm:gap-2'>
            <span className='w-12 shrink-0 font-mono text-ink2 sm:w-14'>{label}</span>
            <span className='flex gap-[3px]'>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-sm ${i < v ? (inverted ? "bg-ink2" : tierColor) : "bg-rule"}`}
                />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
