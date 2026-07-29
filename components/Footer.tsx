const SOURCES = [
  "r/macapps",
  "r/mac",
  "r/apple",
  "r/ios",
  "r/swift",
  "r/productivity",
  "r/ObsidianMD",
  "r/Notion",
  "r/GMail",
  "r/selfhosted",
  "r/SideProject",
  "r/Entrepreneur",
  "r/SaaS",
  "r/SmallBusiness",
  "r/IndieDev",
  "r/AppIdeas",
];

/** 页脚：数据来源 + RSS 订阅入口 */
export default function Footer() {
  return (
    <footer className='border-t-2 border-ink py-8 sm:py-10'>
      <div className='shell'>
        <div className='flex flex-wrap items-baseline justify-between gap-3'>
          <p className='font-mono text-[10px] uppercase tracking-widest text-ink2'>数据来源</p>
          <div className='flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-ink2'>
            <a href='/about' className='underline-offset-2 hover:text-ink hover:underline'>
              关于
            </a>
            <span className='text-rule' aria-hidden>
              /
            </span>
            <a href='/feed.xml' className='underline-offset-2 hover:text-ink hover:underline'>
              RSS 订阅
            </a>
          </div>
        </div>
        <div className='mt-2 flex flex-wrap gap-1.5'>
          {SOURCES.map((s) => (
            <span key={s} className='rounded-sm bg-paper2 px-1.5 py-0.5 font-mono text-[11px] text-ink2'>
              {s}
            </span>
          ))}
        </div>
        <p className='mt-5 max-w-xl text-xs leading-relaxed text-ink2 sm:mt-6 sm:text-[12px]'>
          自动忽略娱乐、政治、Meme、晒图和「求安利」类无机会帖； 只保留能用软件解决、且现有主流产品未覆盖的抱怨。
          机会库会持续去重合并，同一痛点跨社区反复出现时置信度自动提高。
        </p>
      </div>
    </footer>
  );
}
