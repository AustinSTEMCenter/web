"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageIntro } from "@/components/notebook";

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <PageIntro note="field notes — nothing here" title="404 | Page not found." />
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Link href="/" className="btn btn-blue">
          Return home →
        </Link>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-link cursor-pointer"
        >
          take me back
        </button>
      </div>
    </>
  );
}
