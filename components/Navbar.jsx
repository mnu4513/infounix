// components/Navbar.jsx
import React from "react";
import Link from "next/link";
import { FiTerminal, FiChevronDown, FiCpu, FiServer, FiCode, FiCloud } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const courses = [
  {
    icon: <FiCpu className="text-lg" />,
    title: "Solaris",
    description: "Oracle Solaris 11 System Administrator Course",
    link: "/course/solaris"
  },
  {
    icon: <FiServer className="text-lg" />,
    title: "Linux",
    description: "Linux administration from basics to production.",
    link: "/course/linux"
  },
  {
    icon: <FiCode className="text-lg" />,
    title: "Shell Scripting",
    description: "Automation, backups, monitoring & real-world scripts.",
    link: "/course/shell-scripting"
  },
  {
    icon: <FiCloud className="text-lg" />,
    title: "Ansible",
    description: "Automate your infra with simple playbooks.",
    link: "ansible"
  },
];

const exams = [
  {
    icon: <FiCpu className="text-lg" />,
    title: "Solaris",
    description: "Oracle Solaris 11 System Administrator Course",
  },
  {
    icon: <FiServer className="text-lg" />,
    title: "Linux",
    description: "Linux administration from basics to production.",
  },
  {
    icon: <FiCode className="text-lg" />,
    title: "Shell Scripting",
    description: "Automation, backups, monitoring & real-world scripts.",
  },
  {
    icon: <FiCloud className="text-lg" />,
    title: "Ansible",
    description: "Automate your infra with simple playbooks.",
  },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = React.useState(null);
  const [hoveringPanel, setHoveringPanel] = React.useState(false);

  const showCourses =
    openMenu === "courses" || (openMenu === "courses-hover" && hoveringPanel);
  const showExams =
    openMenu === "exams" || (openMenu === "exams-hover" && hoveringPanel);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/70 bg-slate-950/80 shadow-sm shadow-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6 lg:px-8">
        {/* LOGO */}
        <Link href="/">
          <div className="flex cursor-pointer items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-slate-700">
              <FiTerminal className="text-lg text-sky-400" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">
                Info<span className="text-sky-400">Unix</span>
              </p>
              <p className="text-[11px] text-slate-400">
                Linux · Solaris · DevOps
              </p>
            </div>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-5">
          <nav className="hidden items-center gap-5 text-xs text-slate-300 md:flex">
            {/* COURSES DROPDOWN TRIGGER */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("courses-hover")}
              onMouseLeave={() => {
                if (!hoveringPanel) setOpenMenu(null);
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenMenu((prev) => (prev === "courses" ? null : "courses"))
                }
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-900/70 hover:text-sky-300"
              >
                Courses
                <FiChevronDown
                  className={`text-[13px] transition-transform ${
                    showCourses ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* DROPDOWN PANEL */}
              <AnimatePresence>
                {showCourses && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 mt-2 w-[360px] rounded-3xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/80 backdrop-blur"
                    onMouseEnter={() => setHoveringPanel(true)}
                    onMouseLeave={() => {
                      setHoveringPanel(false);
                      setOpenMenu(null);
                    }}
                  >
                    {courses.map((course) => (
                      <button
                        key={course.title}
                        type="button"
                        className="flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left text-xs text-slate-200 transition hover:bg-slate-900/90 hover:text-sky-200"
                      >
                        <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900/80 ring-1 ring-slate-700">
                          {course.icon}
                        </span>
                        <span>
                          <a href={course.link} className="hover:text-sky-300">
                          {course.title}
                          </a>
                          <span className="mt-0.5 block text-[11px] text-slate-400">
                            {course.description}
                          </span>
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Exams DROPDOWN TRIGGER */}
            <div
              className="relative"
              onMouseEnter={() => setOpenMenu("courses-hover")}
              onMouseLeave={() => {
                if (!hoveringPanel) setOpenMenu(null);
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenMenu((prev) => (prev === "exmas" ? null : "exams"))
                }
                className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-900/70 hover:text-sky-300"
              >
                Exams
                <FiChevronDown
                  className={`text-[13px] transition-transform ${
                    showExams ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* DROPDOWN PANEL */}
              <AnimatePresence>
                {showExams && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 4, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 mt-2 w-[360px] rounded-3xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl shadow-slate-950/80 backdrop-blur"
                    onMouseEnter={() => setHoveringPanel(true)}
                    onMouseLeave={() => {
                      setHoveringPanel(false);
                      setOpenMenu(null);
                    }}
                  >
                    {exams.map((exam) => (
                      <button
                        key={exam.title}
                        type="button"
                        className="flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left text-xs text-slate-200 transition hover:bg-slate-900/90 hover:text-sky-200"
                      >
                        <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-2xl bg-slate-900/80 ring-1 ring-slate-700">
                          {exam.icon}
                        </span>
                        <span>
                          <span className="block text-[13px] font-semibold">
                            {exam.title}
                          </span>
                          <span className="mt-0.5 block text-[11px] text-slate-400">
                            {exam.description}
                          </span>
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Other simple links – you can also turn them into dropdowns later */}
            <a href="/sops" className="hover:text-sky-300">
              SOPs
            </a>
            <a href="#features" className="hover:text-sky-300">
              Features
            </a>
            <a href="#about" className="hover:text-sky-300">
              About Us
            </a>
            <a href="#contact" className="hover:text-sky-300">
              Contact Us
            </a>
          </nav>

          {/* Theme + Login */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button className="hidden rounded-full border border-slate-600 bg-transparent px-3 py-1.5 text-[11px] text-slate-200 hover:border-sky-400 hover:text-sky-300 md:inline-flex">
              Log in →
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
