import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiLogIn,
  FiLogOut,
  FiFileText,
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

/* ---------------- I/O REDIRECTION EXAMPLES ---------------- */

const ioExamples = [
  {
    id: "stdout",
    title: "Standard Output Redirection ( > )",
    description:
      "Redirect command output to a file (overwrite).",
    content: `echo "Hello World" > output.txt
cat output.txt`,
  },
  {
    id: "append",
    title: "Append Output ( >> )",
    description:
      "Append output to an existing file.",
    content: `echo "Line 1" > file.txt
echo "Line 2" >> file.txt
cat file.txt`,
  },
  {
    id: "stderr",
    title: "Standard Error Redirection (2>)",
    description:
      "Redirect error messages to a file.",
    content: `ls /wrongpath 2> error.log`,
  },
  {
    id: "stdout-stderr",
    title: "Redirect Both Output and Error",
    description:
      "Redirect both stdout and stderr.",
    content: `command > all.log 2>&1`,
  },
  {
    id: "pipe",
    title: "Using Pipe ( | )",
    description:
      "Send output of one command as input to another.",
    content: `ls -l | grep ".txt"`,
  },
];

export default function IORedirectionPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "io-redirection") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "I/O Redirection in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn input-output redirection in shell scripting including >, >>, 2>, pipes and logging."
          }
        />
      </Head>

      <ShellLayout activeSlug="io-redirection">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 19
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "I/O Redirection in Shell Scripting"}
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
                title={lesson.title || "I/O Redirection in Shell Scripting"}
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
          {/* WHAT IS IO */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is I/O Redirection?
            </h2>
            <p>
              I/O redirection allows you to control where input comes from and
              where output goes. By default, commands read from keyboard and
              write to terminal.
            </p>
          </section>

          {/* TYPES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Types of Redirection
            </h2>
            <ul className="list-disc pl-5 dark:text-slate-300">
              <li><strong>Standard Input (stdin)</strong> – 0</li>
              <li><strong>Standard Output (stdout)</strong> – 1</li>
              <li><strong>Standard Error (stderr)</strong> – 2</li>
            </ul>
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Redirection Examples
            </h2>

            {ioExamples.map((item, index) => (
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
                  contextLabel="io"
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
              heading="I/O Best Practices"
              points={[
                "Always redirect errors to logs.",
                "Use >> instead of > to avoid data loss.",
                "Use pipes to chain commands efficiently.",
                "Keep logs organized and readable.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice Task – I/O Redirection
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-green-50">
              <li>Redirect command output to a file.</li>
              <li>Redirect error messages to a log file.</li>
              <li>Use pipe to filter output.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-600">
              Next lesson: File Permissions & Ownership
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
