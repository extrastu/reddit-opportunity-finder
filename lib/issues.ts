import { Opportunity, opportunities, entryOn, statusOn, total, totalMentions, firstSeen } from "./data";

export const ISSUE_DATES = [
  "2026-07-15",
  "2026-07-16",
  "2026-07-17",
  "2026-07-18",
  "2026-07-19",
  "2026-07-20",
  "2026-07-21",
  "2026-07-22",
  "2026-07-23",
  "2026-07-24",
  "2026-07-25",
  "2026-07-26",
  "2026-07-27",
  "2026-07-28",
  "2026-07-29",
  "2026-07-30",
  "2026-07-31",
] as const;

export type IssueEntry = {
  o: Opportunity;
  status: "new" | "spike";
  delta: number;
  note?: string;
};

export type Issue = {
  date: string;
  no: number;
  entries: IssueEntry[]; // NEW / SPIKE only — dedup'd, sorted by score desc
  silentCount: number; // previously-seen, no significant change, suppressed from full report
  silentMentions: number;
  trackedSoFar: number; // unique opportunities discovered up to and including this date
};

export function getIssue(date: string): Issue {
  const idx = ISSUE_DATES.indexOf(date as (typeof ISSUE_DATES)[number]);
  const entries: IssueEntry[] = [];
  let silentCount = 0;
  let silentMentions = 0;
  let trackedSoFar = 0;

  for (const o of opportunities) {
    const firstDate = firstSeen(o);
    if (firstDate <= date) trackedSoFar++;

    const status = statusOn(o, date);
    if (status === "new" || status === "spike") {
      const entry = entryOn(o, date)!;
      entries.push({ o, status, delta: entry.delta, note: entry.note });
    } else if (status === "silent") {
      const entry = entryOn(o, date)!;
      silentCount++;
      silentMentions += entry.delta;
    }
  }

  entries.sort((a, b) => total(b.o.score) - total(a.o.score));

  return {
    date,
    no: idx + 1,
    entries,
    silentCount,
    silentMentions,
    trackedSoFar,
  };
}

export function listIssues(): Issue[] {
  return ISSUE_DATES.map(getIssue);
}

export function issueTopPick(issue: Issue): IssueEntry | undefined {
  return issue.entries[0];
}

export const libraryStats = () => ({
  totalOpportunities: opportunities.length,
  highConfidence: opportunities.filter((o) => total(o.score) >= 22).length,
  totalMentionsAll: opportunities.reduce((s, o) => s + totalMentions(o), 0),
});
