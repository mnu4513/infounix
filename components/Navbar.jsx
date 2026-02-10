import React from "react";
import Link from "next/link";
import {
  FiTerminal,
  FiChevronDown,
  FiCpu,
  FiServer,
  FiCode,
  FiCloud,
  FiMenu,
  FiX,
} from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const courses = [
  {
    icon: <FiCpu className="text-lg" />,
    title: "Solaris",
    description: "Oracle Solaris 11 System Administrator Course",
    link: "/course/solaris",
  },
  {
    icon: <FiServer className="text-lg" />,
    title: "Linux",
    description: "Linux administration from basics to production.",
    link: "/course/linux",
  },
  {
    icon: <FiCode className="text-lg" />,
    title: "Shell Scripting",
    description: "Automation, backups, monitoring & real-world scripts.",
    link: "/course/shell-scripting",
  },
  {
    icon: <FiCloud className="text-lg" />,
    title: "Ansible",
    description: "Automate your infra with simple playbooks.",
    link: "/ansible",
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

  // MOBILE MENU STATE
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const showCourses =
    openMenu === "courses" || (openMenu === "courses-hover" && hoveringPanel);
  const showExams =
    openMenu === "exams" || (openMenu === "exams-hover" && hoveringPanel);

  return (
    <>
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

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3 md:gap-5">

            {/* 🔥 HAMBURGER FOR MOBILE */}
            <button
              className="md:hidden text-slate-300"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu className="text-xl" />
            </button>

            {/* DESKTOP NAV */}
            <nav className="hidden items-center gap-5 text-xs text-slate-300 md:flex">
              
              {/* COURSES DROPDOWN */}
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
                    setOpenMenu((prev) =>
                      prev === "courses" ? null : "courses"
                    )
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

                <AnimatePresence>
                  {showCourses && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 4 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-0 mt-2 w-[360px] rounded-3xl border border-slate-800 bg-slate-950/95 p-4"
                      onMouseEnter={() => setHoveringPanel(true)}
                      onMouseLeave={() => {
                        setHoveringPanel(false);
                        setOpenMenu(null);
                      }}
                    >
                      {courses.map((course) => (
                        <Link
                          key={course.title}
                          href={course.link}
                          className="flex items-start gap-3 rounded-2xl px-3 py-2 hover:bg-slate-900"
                        >
                          {course.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* EXAMS DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setOpenMenu("exams-hover")}
                onMouseLeave={() => {
                  if (!hoveringPanel) setOpenMenu(null);
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenMenu((prev) =>
                      prev === "exams" ? null : "exams"
                    )
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
              </div>

              <Link href="/sops">SOPs</Link>
              <Link href="#features">Features</Link>
              <Link href="#about">About Us</Link>
              <Link href="#contact">Contact Us</Link>
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 📱 MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed inset-0 z-50 bg-slate-950 md:hidden"
          >
            <div className="flex justify-between p-4 border-b border-slate-800">
              <span className="text-slate-200">Menu</span>

              <button onClick={() => setMobileOpen(false)}>
                <FiX className="text-xl text-slate-300" />
              </button>
            </div>

            <div className="p-4 space-y-2 text-slate-200">

              <p className="text-xs text-slate-400">Courses</p>
              {courses.map((c) => (
                <Link
                  key={c.title}
                  href={c.link}
                  onClick={() => setMobileOpen(false)}
                  className="block p-2"
                >
                  {c.title}
                </Link>
              ))}

              <p className="text-xs text-slate-400 mt-4">Exams</p>
              {exams.map((e) => (
                <span key={e.title} className="block p-2">
                  {e.title}
                </span>
              ))}

              <Link href="/sops" className="block p-2">
                SOPs
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
