import Link from "next/link";

export default function Nav() {
  return (
    <div className='border-b border-rule py-2.5 '>
      <div className='mx-auto flex max-w-3xl px-10 items-center gap-4 font-mono text-[11px] uppercase tracking-widest text-ink2'>
        <Link href='/' className='hover:text-ink'>
          日报归档
        </Link>
        <span className='text-rule'>/</span>
        <Link href='/library' className='hover:text-ink'>
          机会库
        </Link>
      </div>
    </div>
  );
}
