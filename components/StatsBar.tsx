import { Opportunity, total } from "@/lib/data";

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
    <div className='mx-auto max-w-3xl '>
      <dl className='grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-4'>
        {stats.map(([label, value]) => (
          <div key={label} className='bg-paper px-4 py-4'>
            <dt className='font-mono text-[10px] uppercase tracking-widest text-ink2'>{label}</dt>
            <dd className='mt-1 font-display text-2xl font-bold'>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
