import { Opportunity, total } from "@/lib/data";

export default function Trends({ items }: { items: Opportunity[] }) {
  const topGrowing = [...items]
    .filter((o) => o.trend === "Growing")
    .sort((a, b) => total(b.score) - total(a.score))[0];
  const mostUnderserved = [...items].sort(
    (a, b) => a.score.competition - b.score.competition
  )[0];
  const subCounts = items
    .flatMap((o) => o.subreddits)
    .reduce<Record<string, number>>((acc, s) => {
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});
  const topSubs = Object.entries(subCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <section className="mx-auto max-w-3xl border-t-2 border-ink px-6 py-10 sm:px-10">
      <h3 className="font-mono text-[11px] uppercase tracking-widest text-ink2">趋势</h3>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[13px] text-ink2">高频出现的社区</p>
          <ul className="mt-2 space-y-1.5">
            {topSubs.map(([s, c]) => (
              <li key={s} className="flex items-center gap-2 text-[13px]">
                <span className="w-28 shrink-0 font-mono">{s}</span>
                <span className="h-1.5 flex-1 bg-rule">
                  <span
                    className="block h-full bg-signal"
                    style={{ width: `${(c / topSubs[0][1]) * 100}%` }}
                  />
                </span>
                <span className="w-6 text-right font-mono text-ink2">{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 text-[13px]">
          <p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-signal">
              增长最快
            </span>
            <br />
            {topGrowing?.title}
          </p>
          <p>
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber">
              竞争最空白
            </span>
            <br />
            {mostUnderserved?.title}
          </p>
        </div>
      </div>
    </section>
  );
}
