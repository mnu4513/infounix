import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiMenu, FiX, FiPlayCircle } from "react-icons/fi";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { AnsibleLessons } from "./AnsibleLessons";

const AnsibleLayout = ({ children, activeSlug }) => {
  const router = useRouter();

  const currentSlugFromRoute = router.query.lessonSlug || null;

  let pathSlug = null;
  if (typeof router.asPath === "string") {
    if (router.asPath.startsWith("/course/ansible/")) {
      pathSlug = router.asPath.replace("/course/ansible/", "").split("?")[0];
      if (pathSlug === "") pathSlug = null;
    }
  }

  const currentSlug = activeSlug || currentSlugFromRoute || pathSlug;
  const isOverviewRoute =
    router.pathname === "/course/ansible" || (!currentSlug && pathSlug === null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleCloseSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-200 dark:bg-slate-950 text-slate-950 dark:text-slate-50 antialiased">
      <Navbar />

      <div className="relative mx-auto flex max-w-6xl gap-4 px-4 pb-10 pt-5 md:px-6 lg:px-8">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={handleCloseSidebar}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 h-screen transform bg-slate-200 dark:bg-slate-950/95 p-3 shadow-xl shadow-slate-950/90 ring-1 ring-slate-800 overflow-y-auto transition-transform
          md:static md:z-0 md:h-auto md:overflow-visible md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        >
          <div className="mb-3 flex items-center justify-between md:mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                Shell Script Course
              </p>
              <p className="text-[11px] text-slate-400">
                {AnsibleLessons?.length} topics
              </p>
            </div>
            <button
              onClick={handleCloseSidebar}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-slate-300 md:hidden"
              aria-label="Close sidebar"
            >
              <FiX />
            </button>
          </div>

          <nav className="space-y-1 text-xs pb-4">
            {AnsibleLessons?.map((lesson) => {
              const href = lesson.slug
                ? `/course/ansible/${lesson.slug}`
                : "/course/ansible";

              const isActive = lesson.slug
                ? currentSlug === lesson.slug
                : isOverviewRoute;

              return (
                <Link
                  key={lesson.id}
                  href={href}
                  onClick={handleCloseSidebar}
                  className={`flex w-full items-center gap-2 rounded-2xl px-2.5 py-2 text-left transition
                  ${
                    isActive
                      ? "bg-sky-200 from-sky-400 via-fuchsia-400 to-emerald-400 ring-1 ring-sky-500 dark:bg-slate-500"
                      : "bg-sky-100 from-sky-400 via-fuchsia-400 to-emerald-400 ring-1 ring-sky-500 dark:bg-slate-800 "
                  }`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-[13px]">
                    <FiPlayCircle
                      className={isActive ? "text-sky-300" : "text-slate-400"}
                    />
                  </span>
                  <span className="text-[11px] leading-snug">
                    {lesson.title}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <section className="ml-0 flex-1 md:ml-2">
          {/* Mobile top bar with hamburger */}
          <div className="mb-4 flex items-center justify-between md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-100"
              aria-label="Open sidebar"
            >
              <FiMenu />
            </button>
            <p className="text-xs text-slate-400">
              Shell Script ·{" "}
              {currentSlug
                ? AnsibleLessons?.find((l) => l.slug === currentSlug)?.title ??
                  "Lesson"
                : "Overview"}
            </p>
          </div>

          {children}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default AnsibleLayout;
