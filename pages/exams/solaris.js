import React from "react";
import { useRouter } from "next/router";

export default function ExamPage() {
  const { query } = useRouter();
  const { examSlug } = query;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs text-slate-400">Exams / {examSlug}</p>
        <h1 className="mt-2 text-2xl font-semibold capitalize">
          {examSlug?.replace(/-/g, " ")}
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          Here you can describe the syllabus, exam pattern, preparation tips,
          and link to your related tutorials/videos.
        </p>
      </div>
    </main>
  );
}
