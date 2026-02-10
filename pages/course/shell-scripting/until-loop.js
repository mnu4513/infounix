import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiRepeat,
  FiClock,
  FiRotateCcw,
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

/* ---------------- UNTIL LOOP EXAMPLES ---------------- */

const untilLoopExamples = [
  {
    id: "basic-until",
    title: "Basic Until Loop",
    description: "The loop runs until the condition becomes true.",
    content: `count=1

until [ $count -gt 5 ]
do
  echo "Count: $count"
  count=$((count + 1))
done`,
  },
  {
    id: "user-input",
    title: "Until Loop with User Input",
    description: "Loop runs until the user types 'exit'.",
    content: `input=""

until [ "$input" = "exit" ]
do
  read -p "Type 'exit' to quit: " input
done`,
  },
  {
    id: "check-file",
    title: "Until File Exists",
    description: "Script waits until a file becomes available.",
    content: `until [ -f /tmp/data.txt ]
do
  echo "Waiting for file..."
  sleep 2
done

echo "File found!"`,
  },
  {
    id: "service-check",
    title: "Service Check Example",
    description: "Wait until a service starts running.",
    content: `until systemctl is-active --quiet sshd
do
  echo "Waiting for SSH service..."
  sleep 3
done

echo "SSH service is running"`,
  },
];

export default function UntilLoopPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "until-loop") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Until Loop in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how the until loop works in shell scripting with examples, syntax, and real-world use cases."
          }
        />
      </Head>

      <ShellLayout activeSlug="until-loop">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 12
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#22c55e] md:text-3xl">
            {lesson.title || "Until Loop in Shell Scripting"}
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
                title={lesson.title || "Until Loop in Shell Scripting"}
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
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              What is an Until Loop?
            </h2>
            <p>
              An <strong>until loop</strong> runs a block of code repeatedly
              until a given condition becomes <strong>true</strong>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Why Use an Until Loop?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiRotateCcw className="text-lg" />}
                title="Reverse Logic"
                text="Useful when condition should become true to stop."
              />
              <FeatureCard
                icon={<FiClock className="text-lg" />}
                title="Polling Tasks"
                text="Wait for a process, file, or service to appear."
              />
              <FeatureCard
                icon={<FiRepeat className="text-lg" />}
                title="Automation"
                text="Automate wait-based operations."
              />
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Until Loop Syntax
            </h2>
            <TerminalOutput
              content={`until [ condition ]
do
  commands
done`}
              title="until syntax"
              contextLabel="syntax"
              maxHeight="10rem"
            />
          </section>

          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Until Loop Examples
            </h2>

            {untilLoopExamples.map((item, index) => (
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
                  contextLabel="until-loop"
                  maxHeight="14rem"
                />
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Best Practices
            </h2>
            <BulletCard
              heading="Recommended Practices"
              points={[
                "Avoid infinite loops by updating condition properly.",
                "Use sleep to reduce CPU usage.",
                "Use clear exit conditions.",
                "Log or echo progress for clarity.",
              ]}
            />
          </section>

          {/* FIXED PART 👇 */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-green-200">
              Practice Task – Until Loop
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-green-50">
              <li>Write a script that waits until a file exists.</li>
              <li>Repeat a task until user enters &quot;stop&quot;.</li>
              <li>Use until loop with numeric condition.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-200">
              Next lesson: Case Statement
              <FiArrowRight className="text-xs" />
            </p>
          </section>

        </motion.div>
      </ShellLayout>
    </>
  );
}
