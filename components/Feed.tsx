"use client";

import { useMemo, useState } from "react";
import { Opportunity, total } from "@/lib/data";
import OpportunityCard from "./OpportunityCard";

export default function Feed({ items }: { items: Opportunity[] }) {
  const allSubs = useMemo(
    () => Array.from(new Set(items.flatMap((o) => o.subreddits))).sort(),
    [items]
  );
  const [sub, setSub] = useState<string | null>(null);
  const [minScore, setMinScore] = useState(18);

  const filtered = items
    .filter((o) => (sub ? o.subreddits.includes(sub) : true))
    .filter((o) => total(o.score) >= minScore)
    .sort((a, b) => total(b.score) - total(a.score));

  return (
    <div className="mx-auto max-w-3xl px-6 sm:px-10">
      <div className="flex flex-wrap items-center gap-2 border-b border-rule py-5 font-mono text-[11px]">
        <span className="uppercase tracking-widest text-ink2">筛选</span>
        <button
          onClick={() => setSub(null)}
          className={`rounded-sm px-2 py-1 ${
            sub === null ? "bg-ink text-paper" : "bg-paper2 text-ink2 hover:bg-rule"
          }`}
        >
          全部社区
        </button>
        {allSubs.map((s) => (
          <button
            key={s}
            onClick={() => setSub(s)}
            className={`rounded-sm px-2 py-1 ${
              sub === s ? "bg-ink text-paper" : "bg-paper2 text-ink2 hover:bg-rule"
            }`}
          >
            {s}
          </button>
        ))}
        <span className="ml-auto flex items-center gap-2 uppercase tracking-widest text-ink2">
          最低分
          <select
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="rounded-sm border border-rule bg-paper px-1.5 py-1 font-mono text-[11px]"
          >
            <option value={18}>18</option>
            <option value={20}>20</option>
            <option value={22}>22</option>
          </select>
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-ink2">没有符合筛选条件的机会。</p>
      ) : (
        filtered.map((o) => <OpportunityCard key={o.id} o={o} />)
      )}
    </div>
  );
}
