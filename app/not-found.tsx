'use client';

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { PageIntro } from "@/components/notebook";

export default function NotFound() {
    const router = useRouter();
  return (
    <div className="prose-note mt-6">
      <PageIntro note="Field Note - Nothing is here" title="404 | Page not found." />
      <br />
      <Link href="/">Return Home</Link> <Link href="" onClick={() => router.back()}>Take me back</Link> 
    </div>
  )
}