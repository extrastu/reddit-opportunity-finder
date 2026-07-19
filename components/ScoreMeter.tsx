import { Score, total } from "@/lib/data";

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
    <div className="flex items-start gap-4">
      <div
        className={`stamp shrink-0 border-2 ${
          tier === "high" ? "border-flag text-flag" : "border-amber text-amber"
        } rounded-sm px-2 py-1 text-center leading-none`}
      >
        <div className="font-mono text-[10px] tracking-widest">SCORE</div>
        <div className="font-display text-2xl font-bold">{t}</div>
        <div className="font-mono text-[9px] tracking-widest">/25</div>
      </div>
      <div className="flex-1 space-y-1.5 pt-0.5">
        {rows.map(([label, v, inverted]) => (
          <div key={label} className="flex items-center gap-2 text-[11px]">
            <span className="w-14 shrink-0 font-mono text-ink2">{label}</span>
            <span className="flex gap-[3px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-sm ${
                    i < v ? (inverted ? "bg-ink2" : tierColor) : "bg-rule"
                  }`}
                />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
