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
    <section className="relative overflow-hidden bg-slate-950 pb-16 pt-10 text-slate-50">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 -top-32 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-sky-500/30 blur-3xl" />
        <div className="absolute -bottom-36 left-16 h-72 w-72 rounded-full bg-emerald-500/25 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6 lg:px-8">
        {/* Left */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{}}
          className="space-y-6"
        >
          <motion.span
            variants={fadeUp(0)}
            className="inline-flex items-center gap-2 rounded-full border border-sky-500/50 bg-slate-900/70 px-3 py-1 text-[11px] text-sky-200 shadow shadow-sky-500/30 backdrop-blur"
          >
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Hands-on guides from a real Unix admin
          </motion.span>

          <motion.h1
            variants={fadeUp(0.1)}
            className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          >
            Master{" "}
            <span className="bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Linux, Solaris & DevOps
            </span>{" "}
            with real production examples.
          </motion.h1>

          <motion.p
            variants={fadeUp(0.2)}
            className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base"
          >
            infounix.com gives you practical tutorials, shell scripts, and
            troubleshooting notes that match what you actually do on servers:
            services, logs, performance, automation and more.
          </motion.p>

          <motion.div
            variants={fadeUp(0.3)}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="#blog"
              className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-xl shadow-sky-500/40 transition hover:-translate-y-0.5 hover:bg-sky-400"
            >
              <FiBookOpen className="text-lg" />
              Explore Tutorials
            </Link>
            <Link
              href="#courses"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-100 shadow shadow-slate-950/70 backdrop-blur hover:-translate-y-0.5 hover:border-sky-400 hover:text-sky-200"
            >
              <FiPlayCircle className="text-lg" />
              Watch Shell Scripting Series
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp(0.4)}
            className="flex flex-wrap gap-6 text-xs text-slate-400"
          >
            <div>
              <p className="font-semibold text-slate-100">For Beginners</p>
              <p>Simple explanations with live commands & outputs.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-100">For Admins</p>
              <p>Real incidents, service failures & fixes.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right – floating terminal card */}
        <motion.div
          initial={{ opacity: 0, x: 60, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-[320px] w-full max-w-md rounded-3xl border border-slate-700/80 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/80 backdrop-blur"
          >
            <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-red-500" />
                <span className="flex h-2 w-2 rounded-full bg-yellow-400" />
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                <p className="text-[11px] text-slate-400">terminal — bash</p>
              </div>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px]">
                infounix@prod
              </span>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <p className="text-slate-400">
                [root@node1 ~]#{" "}
                <span className="text-emerald-400">
                  systemctl status httpd
                </span>
              </p>
              <p className="text-slate-500">
                ● httpd.service - The Apache HTTP Server
              </p>
              <p className="text-emerald-400">Active: active (running)</p>
              <p className="text-slate-400">
                [root@node1 ~]#{" "}
                <span className="text-sky-400">bash backup.sh</span>
              </p>
              <p className="text-emerald-400">
                ✔ Config backup created at /var/backup/configs
              </p>
              <p className="pt-2 text-slate-400">
                [root@node1 ~]#{" "}
                <span className="text-fuchsia-400">
                  echo "Welcome to InfoUnix"
                </span>
              </p>
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-64 w-64 rounded-full border border-sky-500/40 bg-sky-500/10 blur-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
