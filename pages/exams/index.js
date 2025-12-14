import React from "react";
import Link from "next/link";

const exams = [
  { slug: "ex200-rhcsa", name: "Red Hat RHCSA (EX200)" },
  { slug: "oci-foundations", name: "Oracle Cloud Infrastructure Foundations" },
  // add more here
];

export default function ExamsIndex() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold">Exams</h1>
        <p className="mt-2 text-sm text-slate-400">
          Exam guides, strategies and resources.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {exams.map((e) => (
            <Link
              key={e.slug}
              href={`/exams/${e.slug}`}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm hover:border-sky-500 hover:text-sky-200"
            >
              {e.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
