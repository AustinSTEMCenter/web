import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Bolt } from "@/components/doodles";
import { NoteCard, PageIntro, Stamp } from "@/components/notebook";
import { formatDate, getPublishedPosts } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Field Notes — Blog",
  description:
    "Event recaps, practical insights, and behind-the-scenes stories from ASC's work with students, educators, and industry leaders.",
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <>
      <PageIntro
        note="field notes — the notebook itself"
        title={
          <>
            Words and <span className="hl-teal">actions.</span>
          </>
        }
        doodle={<Bolt className="h-14 rotate-12 text-gold/80" />}
      >
        <p className="text-[17px] text-ink-soft">
          Recaps of the events we host, practical insights, bold ideas, and
          behind-the-scenes stories from ASC&rsquo;s work with students,
          educators, and industry leaders.
        </p>
      </PageIntro>

      <div className="mt-12 space-y-12">
        {posts.map((post, i) => (
          <article
            key={post.slug}
            className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-x-10 gap-y-5 max-md:grid-cols-1"
          >
            {post.cover && (
              <Link
                href={`/blog/${post.slug}`}
                className={`photo block max-w-[360px] ${i % 2 ? "rotate-[0.8deg]" : "-rotate-[0.7deg]"}`}
              >
                <Image
                  src={post.cover}
                  alt=""
                  width={720}
                  height={450}
                  className="aspect-[8/5] w-full object-cover"
                />
              </Link>
            )}
            <NoteCard flat className={post.cover ? "" : "md:col-span-2"}>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-hand text-[17px] text-brand-blue">
                {formatDate(post.date)} · {post.author}
                {post.kind === "event" && (
                  <Stamp className="-rotate-2 text-[10px]">event recap</Stamp>
                )}
              </p>
              <h2 className="mt-1.5 text-[22px] leading-snug font-bold">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
                {post.excerpt}
              </p>
              <p className="mt-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-link"
                >
                  read the full note →
                </Link>
              </p>
            </NoteCard>
          </article>
        ))}
      </div>
    </>
  );
}
