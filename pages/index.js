import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Courses from "../components/Courses";
import BlogPreview from "../components/BlogPreview";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>InfoUnix – Linux, Solaris & DevOps Tutorials</title>
        <meta
          name="description"
          content="infounix.com – Practical Linux, Solaris, shell scripting and DevOps tutorials from a real Unix admin."
        />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-50 antialiased dark:bg-slate-950">
        <Navbar />
        <Hero />
        <section
          id="topics"
          className="bg-slate-950 py-14 text-slate-50"
        >
          {/* If you want a separate Topics component later you can replace this block */}
          <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              What you&apos;ll learn on{" "}
              <span className="text-sky-400">InfoUnix</span>
            </h2>
            <p className="mt-2 text-xs text-slate-400 sm:text-sm">
              Start from basics, move to production-grade troubleshooting.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg shadow-slate-950/80 backdrop-blur">
                <p className="text-xs font-semibold text-sky-300">
                  Linux & Shell
                </p>
                <p className="mt-2 text-[11px] text-slate-300">
                  Everyday admin commands, shell scripts for backups, monitoring
                  and automation.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg shadow-slate-950/80 backdrop-blur">
                <p className="text-xs font-semibold text-fuchsia-300">
                  Solaris & Enterprise Unix
                </p>
                <p className="mt-2 text-[11px] text-slate-300">
                  Zones, LDOMs, SMF, performance basics and real troubleshooting
                  cases.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg shadow-slate-950/80 backdrop-blur">
                <p className="text-xs font-semibold text-emerald-300">
                  DevOps Path
                </p>
                <p className="mt-2 text-[11px] text-slate-300">
                  Containers, automation basics and the bridge from admin work
                  into DevOps/cloud roles.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Courses />
        <BlogPreview />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
