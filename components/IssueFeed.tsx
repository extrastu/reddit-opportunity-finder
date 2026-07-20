import { IssueEntry } from "@/lib/issues";
import OpportunityCard from "./OpportunityCard";

export default function IssueFeed({ entries }: { entries: IssueEntry[] }) {
  return (
    <div className='mx-auto max-w-3xl'>
      {entries.length === 0 ? (
        <p className='py-12 text-center text-sm text-ink2'>今天没有新出现或热度骤增的机会，已全部去重合并进机会库。</p>
      ) : (
        entries.map((e) => <OpportunityCard key={e.o.id} entry={e} />)
      )}
    </div>
  );
}
