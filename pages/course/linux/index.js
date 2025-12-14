import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const courseLessons = {
  solaris: [
    { slug: "vi-editor", title: "VI Editor in Solaris" },
    { slug: "ilom-snapshot", title: "ILOM Snapshot in Solaris" },
    { slug: "nfs", title: "NFS (Network File System) in Solaris" },
  ],
  linux: [],
  "shell-scripting": [],
  ansible: [],
};

export default function CoursePage() {
  const { query } = useRouter();
  const { courseSlug } = query;

  const lessons = courseLessons[courseSlug] || [];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold capitalize">
          {courseSlug} course
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Select a lesson to start learning.
        </p>

        <div className="mt-6 space-y-3">
          {lessons.length === 0 && (
            <p className="text-sm text-slate-400">
              Lessons coming soon. (You can wire this to real data later.)
            </p>
          )}

          {lessons.map((l) => (
            <Link
              key={l.slug}
              href={`/course/${courseSlug}/${l.slug}`}
              className="block rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-sm hover:border-sky-500 hover:text-sky-200"
            >
              {l.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
