import React from "react";
import Link from "next/link";
import {
  FiTerminal,
  FiMenu,
  FiX,
} from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  // MOBILE MENU STATE
  const [mobileOpen, setMobileOpen] = React.useState(false);

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

            {/* MOBILE HAMBURGER */}
            <button
              className="md:hidden text-slate-300"
              onClick={() => setMobileOpen(true)}
            >
              <FiMenu className="text-xl" />
            </button>

            {/* DESKTOP NAV (SIMPLE LINKS) */}
            <nav className="hidden items-center gap-5 text-xs text-slate-300 md:flex">

              <Link
                href="/course"
                className="hover:text-sky-300 transition"
              >
                Courses
              </Link>

              <Link
                href="/exams"
                className="hover:text-sky-300 transition"
              >
                Exams
              </Link>

              <Link href="/sops">SOPs</Link>

              <Link href="#features">Features</Link>

              <Link href="#about">About Us</Link>

              <Link href="#contact">Contact Us</Link>
            </nav>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
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

              <Link
                href="/course"
                onClick={() => setMobileOpen(false)}
                className="block p-2"
              >
                Courses
              </Link>

              <Link
                href="/exams"
                onClick={() => setMobileOpen(false)}
                className="block p-2"
              >
                Exams
              </Link>

              <Link
                href="/sops"
                onClick={() => setMobileOpen(false)}
                className="block p-2"
              >
                SOPs
              </Link>

              <Link
                href="#about"
                onClick={() => setMobileOpen(false)}
                className="block p-2"
              >
                About Us
              </Link>

              <Link
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="block p-2"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
