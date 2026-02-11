import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const courses = [
  { slug: "solaris", name: "Solaris" },
  { slug: "linux", name: "Linux" },
  { slug: "shell-scripting", name: "Shell Scripting" },
  { slug: "ansible", name: "Ansible" },
];

export default function CoursesIndex() {
  return (
    <>
   <Navbar/>
    <main className="min-h-screen bg-slate-200 dark:bg-slate-950 text-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">All Courses</h1>
        <p className="mt-2 text-sm bg-gradient-to-r font-bold from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
          Choose a course to start learning.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {courses.map((c) => (
            <Link
              key={c.slug}
              href={`/course/${c.slug}`}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 text-sm hover:border-sky-500 hover:text-sky-200"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </main>
<Footer/>
     </>
  );
}
