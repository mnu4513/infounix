import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiPlayCircle, FiBookOpen } from "react-icons/fi";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  },
});

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-200 text-gray-600 dark:text-red-100 pb-16 pt-10 dark:bg-slate-950">


      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6 lg:px-8">
        {/* Left */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{}}
          className="space-y-6"
        >
    <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
      What you&apos;ll learn on{" "}
      <span className="text-sky-400">InfoUnix</span>
    </h2>
    <p className="mt-2 text-xs text-slate-800 dark:text-white sm:text-sm">
      Start from basics, move to production-grade troubleshooting.
    </p>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg backdrop-blur">
          <p className="text-xs font-semibold text-sky-300">
            Linux & Shell
          </p>
          <p className="mt-2 text-[11px] text-slate-300">
            Everyday admin commands, shell scripts for backups, monitoring
            and automation.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg backdrop-blur">
          <p className="text-xs font-semibold text-fuchsia-300">
            Solaris & Enterprise Unix
          </p>
          <p className="mt-2 text-[11px] text-slate-300">
            Zones, LDOMs, SMF, performance basics and real troubleshooting
            cases.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg backdrop-blur">
          <p className="text-xs font-semibold text-emerald-300">
            DevOps Path
          </p>
          <p className="mt-2 text-[11px] text-slate-300">
            Containers, automation basics and the bridge from admin work
            into DevOps/cloud roles.
          </p>
        </div>
        </motion.div>

        {/* Right – floating terminal card */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex items-center justify-center "
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full max-w-md rounded-3xl p-5  shadow-2xl shadow-slate-950/80 backdrop-blur"
          >
       <img
          src="/images/business.svg"
          alt="bussiness image"
          className="h-full w-full object-cover"
          priority
        />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-64 w-64 rounded-full  border border-sky-500/40 bg-sky-500/10 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
