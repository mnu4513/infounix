import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
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

/* ---------------- EXIT STATUS EXAMPLES ---------------- */

const exitStatusExamples = [
  {
    id: "basic-exit",
    title: "Basic Exit Status",
    description:
      "Every command returns an exit status after execution.",
    content: `ls /home
echo $?`,
  },
  {
    id: "success-failure",
    title: "Success vs Failure",
    description:
      "0 means success, non-zero means failure.",
    content: `ls /home
echo "Exit status: $?"

ls /notexist
echo "Exit status: $?"`,
  },
  {
    id: "if-exit-status",
    title: "Using Exit Status in Condition",
    description:
      "Use $? to check if a command succeeded.",
    content: `mkdir testdir

if [ $? -eq 0 ]; then
  echo "Directory created successfully"
else
  echo "Failed to create directory"
fi`,
  },
  {
    id: "custom-exit",
    title: "Custom Exit Codes",
    description:
      "Use exit to define your own exit status.",
    content: `if [ -f "/etc/passwd" ]; then
  echo "File exists"
  exit 0
else
  echo "File not found"
  exit 1
fi`,
  },
];

export default function ExitStatusPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "exit-status") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Exit Status in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn exit status in shell scripting including $? , exit codes, and error handling techniques."
          }
        />
      </Head>

      <ShellLayout activeSlug="exit-status">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 17
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#22c55e] md:text-3xl">
            {lesson.title || "Exit Status in Shell Scripting"}
          </h1>
          {lesson.short && (
            <p className="mt-1 max-w-2xl text-sm text-slate-300">
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
                title={lesson.title || "Exit Status in Shell Scripting"}
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
          className="space-y-8 text-sm leading-relaxed text-slate-200"
        >
          {/* WHAT IS EXIT STATUS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              What is Exit Status?
            </h2>
            <p>
              Every command executed in Linux returns an <strong>exit status</strong>.
              It is a numeric value that tells whether a command succeeded or failed.
            </p>
            <p>
              By convention:
              <ul className="list-disc pl-6 mt-2">
                <li><strong>0</strong> → Success</li>
                <li><strong>Non-zero</strong> → Failure</li>
              </ul>
            </p>
          </section>

          {/* WHY EXIT STATUS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Why Exit Status Matters
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiCheckCircle className="text-lg" />}
                title="Error Detection"
                text="Detect if a command ran successfully."
              />
              <FeatureCard
                icon={<FiAlertTriangle className="text-lg" />}
                title="Flow Control"
                text="Control script execution based on success or failure."
              />
              <FeatureCard
                icon={<FiXCircle className="text-lg" />}
                title="Debugging"
                text="Helps identify which command failed."
              />
            </div>
          </section>

          {/* HOW TO CHECK EXIT STATUS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              How to Check Exit Status
            </h2>
            <TerminalOutput
              content={`command
echo $?`}
              title="check exit status"
              contextLabel="exit-status"
              maxHeight="10rem"
            />
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Exit Status Examples
            </h2>

            {exitStatusExamples.map((item, index) => (
              <div key={item.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {item.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {item.description}
                </p>
                <TerminalOutput
                  content={item.content}
                  title="terminal — bash"
                  contextLabel="exit-status"
                  maxHeight="14rem"
                />
              </div>
            ))}
          </section>

          {/* BEST PRACTICES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Best Practices
            </h2>
            <BulletCard
              heading="Recommended Practices"
              points={[
                "Always check exit status for critical commands.",
                "Use meaningful exit codes (0–255).",
                "Avoid ignoring failures silently.",
                "Use exit in scripts to stop execution when needed.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-green-200">
              Practice Task – Exit Status
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-green-50">
              <li>Write a script that checks if a file exists.</li>
              <li>Exit with status 0 if found, 1 otherwise.</li>
              <li>Print meaningful messages.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-200">
              Next lesson: Debugging & Traps
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
