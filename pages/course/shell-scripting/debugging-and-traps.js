import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiTool,
  FiZap,
  FiArrowRight,
} from "react-icons/fi";

import ShellLayout from "../../../components/shell/ShellLayout";
import { ShellLessons } from "../../../components/shell/ShellLessons";
import FeatureCard from "../../../components/solaris/FeatureCard";
import BulletCard from "../../../components/solaris/BulletCard";
import TerminalOutput from "../../../components/TerminalOutput";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

/* ---------------- DEBUGGING EXAMPLES ---------------- */

const debugExamples = [
  {
    id: "set-x",
    title: "Debug Mode with set -x",
    description:
      "Prints each command before executing it.",
    content: `#!/bin/bash
set -x

name="Linux"
echo "Hello $name"`,
  },
  {
    id: "set-e",
    title: "Exit on Error (set -e)",
    description:
      "Stops script execution when a command fails.",
    content: `#!/bin/bash
set -e

mkdir testdir
cd testdir2   # This will fail
echo "This line will not run"`,
  },
  {
    id: "set-u",
    title: "Unset Variable Check (set -u)",
    description:
      "Treats unset variables as errors.",
    content: `#!/bin/bash
set -u

echo $UNDEFINED_VAR`,
  },
  {
    id: "trap-signal",
    title: "Trap Signals",
    description:
      "Execute commands when script exits or receives signals.",
    content: `#!/bin/bash

trap "echo 'Script interrupted'; exit" SIGINT

while true
do
  echo "Running..."
  sleep 2
done`,
  },
];

export default function DebuggingPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "debugging") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Debugging & Traps in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn debugging techniques in shell scripting including set -x, set -e, set -u and trap."
          }
        />
      </Head>

      <ShellLayout activeSlug="debugging">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 18
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Debugging & Traps in Shell Scripting"}
          </h1>
          {lesson.short && (
            <p className="mt-1 max-w-2xl text-sm dark:text-slate-300">
              {lesson.short}
            </p>
          )}
          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#22c55e] via-slate-700 to-transparent" />
        </motion.header>

        {/* VIDEO */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="mb-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-lg shadow-slate-950/80"
        >
          {lesson.videoUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title || "Debugging & Traps in Shell Scripting"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center text-xs text-slate-400">
              Add YouTube embed URL in{" "}
              <code className="mx-1 rounded bg-slate-900 px-1">
                components/shell/ShellLessons.js
              </code>
            </div>
          )}
        </motion.div>

        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.15)}
          className="space-y-8 text-sm leading-relaxed dark:text-slate-200"
        >
          {/* WHAT IS DEBUGGING */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is Debugging?
            </h2>
            <p>
              Debugging is the process of finding and fixing errors in a script.
              Shell provides built-in tools to help trace execution and handle failures.
            </p>
          </section>

          {/* WHY DEBUGGING */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Why Debugging is Important?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiAlertTriangle className="text-lg" />}
                title="Error Detection"
                text="Detect errors early during execution."
              />
              <FeatureCard
                icon={<FiTool className="text-lg" />}
                title="Stability"
                text="Prevent scripts from crashing silently."
              />
              <FeatureCard
                icon={<FiZap className="text-lg" />}
                title="Reliability"
                text="Improve script reliability and safety."
              />
            </div>
          </section>

          {/* DEBUGGING TOOLS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Debugging Tools in Shell
            </h2>
            <ul className="list-disc pl-5 dark:text-slate-300">
              <li><code>set -x</code> – Print commands before execution</li>
              <li><code>set -e</code> – Exit on error</li>
              <li><code>set -u</code> – Treat unset variables as errors</li>
              <li><code>trap</code> – Catch signals and cleanup</li>
            </ul>
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Debugging Examples
            </h2>

            {debugExamples.map((item, index) => (
              <div key={item.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {item.title}
                </h3>
                <p className="text-xs dark:text-slate-300">
                  {item.description}
                </p>
                <TerminalOutput
                  content={item.content}
                  title="terminal — bash"
                  contextLabel="debug"
                  maxHeight="14rem"
                />
              </div>
            ))}
          </section>

          {/* BEST PRACTICES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Best Practices
            </h2>
            <BulletCard
              heading="Debugging Tips"
              points={[
                "Use set -e in production scripts.",
                "Use trap to clean up temporary files.",
                "Test scripts with invalid inputs.",
                "Remove debug output before production.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice Task – Debugging
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-green-50">
              <li>Create a script that exits on error.</li>
              <li>Use trap to catch Ctrl+C.</li>
              <li>Enable debug mode and observe output.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-600">
              Next lesson: Logging & Redirection
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
