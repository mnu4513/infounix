import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiRepeat,
  FiClock,
  FiRefreshCcw,
  FiArrowRight,
} from "react-icons/fi";

import ShellLayout from "../../../components/shell/ShellLayout";
import { shellLessons } from "../../../components/shell/shellLessons";
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

/* ---------------- WHILE LOOP EXAMPLES ---------------- */

const whileLoopExamples = [
  {
    id: "basic-while",
    title: "Basic While Loop",
    description: "Runs while the condition remains true.",
    content: `count=1

while [ $count -le 5 ]
do
  echo "Count: $count"
  count=$((count + 1))
done`,
  },
  {
    id: "while-user-input",
    title: "While Loop with User Input",
    description: "Loop continues until user enters 'exit'.",
    content: `while true
do
  read -p "Enter command (type exit to quit): " cmd
  if [ "$cmd" = "exit" ]; then
    break
  fi
  echo "You typed: $cmd"
done`,
  },
  {
    id: "read-file",
    title: "Read File Using While Loop",
    description: "Reading a file line by line using while loop.",
    content: `while read line
do
  echo "Line: $line"
done < file.txt`,
  },
  {
    id: "infinite-loop",
    title: "Infinite While Loop",
    description: "A loop that runs forever until manually stopped.",
    content: `while true
do
  echo "Running..."
  sleep 2
done`,
  },
];

export default function WhileLoopPage() {
  const lesson =
    shellLessons.find((l) => l.slug === "while-loop") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "While Loop in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how while loops work in shell scripting with practical examples and best practices."
          }
        />
      </Head>

      <ShellLayout activeSlug="while-loop">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 11
          </p>

          <h1 className="mt-1 text-2xl font-semibold text-[#22c55e] md:text-3xl">
            {lesson.title || "While Loop in Shell Scripting"}
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
                title={lesson.title || "While Loop in Shell Scripting"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center text-xs text-slate-400">
              Add YouTube embed URL in{" "}
              <code className="mx-1 rounded bg-slate-900 px-1">
                components/shell/shellLessons.js
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
          {/* WHAT IS WHILE LOOP */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              What is a While Loop?
            </h2>

            <p>
              A <strong>while loop</strong> executes a block of code repeatedly
              as long as the given condition evaluates to true.
            </p>

            <p>
              It is commonly used when the number of iterations is not known in
              advance.
            </p>
          </section>

          {/* WHY WHILE LOOP */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Why Use a While Loop?
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiRepeat className="text-lg" />}
                title="Dynamic Conditions"
                text="Run until a condition becomes false."
              />

              <FeatureCard
                icon={<FiClock className="text-lg" />}
                title="Wait & Monitor"
                text="Useful for monitoring logs, processes, or input."
              />

              <FeatureCard
                icon={<FiRefreshCcw className="text-lg" />}
                title="Control Flow"
                text="Allows continuous execution with condition checks."
              />
            </div>
          </section>

          {/* SYNTAX */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              While Loop Syntax
            </h2>

            <TerminalOutput
              content={`while [ condition ]
do
  commands
done`}
              title="while syntax"
              contextLabel="syntax"
              maxHeight="10rem"
            />
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#22c55e]">
              While Loop Examples
            </h2>

            {whileLoopExamples.map((item, index) => (
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
                  contextLabel="while-loop"
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
              heading="Loop Best Practices"
              points={[
                "Always update the loop condition to avoid infinite loops.",
                "Use sleep to prevent high CPU usage.",
                "Validate user input before looping.",
                "Break loops intentionally using break.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-green-200">
              Practice Task – While Loop
            </h2>

            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-green-50">
              <li>Create a loop that prints numbers from 1 to 10.</li>
              <li>Create a loop that waits until user types &quot;exit&quot;.</li>
              <li>Create a loop that reads a file line by line.</li>
            </ul>

            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-200">
              Next lesson: Until Loop
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
