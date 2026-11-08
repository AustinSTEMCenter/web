import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NoteCard, Stamp } from "@/components/notebook";
import { formatDate, getPost, getPublishedPosts } from "@/lib/data/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className="pt-12">
      <p className="mb-2.5 flex flex-wrap items-center gap-x-3 gap-y-2 font-hand text-[18px] text-brand-blue">
        field notes · {formatDate(post.date)} · {post.author}
        {post.kind === "event" && (
          <Stamp className="-rotate-2 text-[10px]">event recap</Stamp>
        )}
      </p>
      <h1 className="max-w-[26ch] text-[clamp(28px,4vw,42px)] leading-[1.15] font-bold tracking-[-0.01em] text-balance">
        {post.title}
      </h1>

      {post.cover && (
        <figure className="photo mt-8 max-w-[620px] -rotate-[0.5deg]">
          <Image
            src={post.cover}
            alt=""
            width={1240}
            height={775}
            sizes="(min-width: 768px) 620px, 92vw"
            className="w-full object-cover"
            priority
          />
        </figure>
      )}

      <NoteCard className="mt-10 max-w-[760px]">
        <div
          className="prose-note"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </NoteCard>

      <p className="mt-14 border-t border-ink/25 pt-6">
        <Link
          href="/blog"
          className="text-link"
        >
          ← all field notes
        </Link>
      </p>
    </article>
  );
}
