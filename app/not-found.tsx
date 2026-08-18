"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="prose-note mt-6 text-center">
      <h2>404 | Page Not Found</h2>
      <p>This page doesn't exist</p>
      <Link href="/">Return Home</Link> <a onClick={() => router.back()}>Take me back</a>
    </div>
  );
}
