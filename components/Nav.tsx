import Link from "next/link";

export default function Nav() {
  return (
    <div className="border-b border-rule px-6 py-2.5 sm:px-10">
      <div className="mx-auto flex max-w-3xl items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-ink2">
        <Link href="/" className="hover:text-ink">
          日报归档
        </Link>
        <span className="text-rule">/</span>
        <Link href="/library" className="hover:text-ink">
          机会库
        </Link>
      </div>
    </div>
  );
}
