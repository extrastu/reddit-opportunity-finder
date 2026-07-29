import { AUTHOR_BLOG, SITE_NAME } from "@/lib/site";

/** 关于页正文：项目说明与作者博客入口 */
export default function AboutContent() {
  return (
    <div className='shell space-y-6 pb-12 pt-2 text-sm leading-relaxed text-ink2 sm:text-[13.5px]'>
      <p>
        <span className='font-display text-base italic text-ink sm:text-lg'>{SITE_NAME}</span>{" "}
        是一份面向独立开发者的产品机会日报：每天从 Reddit
        相关社区里筛出「抱怨、重复劳动、求替代方案」这类信号，去重合并后打分，只保留值得动手的机会。
      </p>
      <p>
        同一痛点跨社区反复出现时会自动合并进机会库；只有新出现、或热度显著上升的机会，才会再次出现在日报里。你可以按日阅读，也可以订阅
        RSS，或在机会库里纵览全部追踪记录。
      </p>
      <div className='border-t border-rule pt-6'>
        <p className='font-mono text-[10px] uppercase tracking-widest text-ink2'>作者</p>
        <p className='mt-2'>由 Extrastu 维护。更多随笔与项目记录见个人博客：</p>
        <p className='mt-3'>
          <a
            href={AUTHOR_BLOG}
            target='_blank'
            rel='noopener noreferrer'
            className='font-display text-lg font-bold text-ink underline decoration-rule underline-offset-4 hover:decoration-ink'
          >
            extrastu.xyz
          </a>
        </p>
      </div>
    </div>
  );
}
