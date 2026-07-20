import { Opportunity, total } from "@/lib/data";

/** 首页统计条：移动端 2×2，标签允许换行 */
export default function StatsBar({ items }: { items: Opportunity[] }) {
  const high = items.filter((o) => total(o.score) >= 22).length;
  const avg = (items.reduce((sum, o) => sum + total(o.score), 0) / items.length).toFixed(1);
  const growing = items.filter((o) => o.trend === "Growing").length;

  const stats: [string, string | number][] = [
    ["扫描到的机会", items.length],
    ["高置信度 (≥22)", high],
    ["平均分", avg],
    ["上升趋势", growing],
  ];

  return (
    <div className='shell'>
      <dl className='grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4'>
        {stats.map(([label, value]) => (
          <div key={label} className='bg-paper px-3 py-3.5 sm:px-4 sm:py-4'>
            <dt className='font-mono text-[10px] uppercase leading-tight tracking-widest text-ink2'>{label}</dt>
            <dd className='mt-1 font-display text-xl font-bold sm:text-2xl'>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
