import Link from "next/link";

/** 顶部导航：移动端加大点击区域 */
export default function Nav() {
  return (
    <div className='border-b border-rule'>
      <nav className='shell flex min-h-11 items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-ink2 sm:gap-4'>
        <Link href='/' className='py-3 hover:text-ink'>
          日报归档
        </Link>
        <span className='text-rule' aria-hidden>
          /
        </span>
        <Link href='/library' className='py-3 hover:text-ink'>
          机会库
        </Link>
        <span className='text-rule' aria-hidden>
          /
        </span>
        <a href='/feed.xml' className='py-3 hover:text-ink'>
          RSS
        </a>
      </nav>
    </div>
  );
}
