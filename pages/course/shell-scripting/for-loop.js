import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiRepeat,
  FiList,
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

/* ---------------- FOR LOOP EXAMPLES ---------------- */

const forLoopExamples = [
  {
    id: "basic-for",
    title: "Basic For Loop",
    description:
      "Loop through a list of values and execute a command for each value.",
    content: `for i in 1 2 3 4 5
do
  echo "Number: $i"
done`,
  },
  {
    id: "range-loop",
    title: "Using Range with Brace Expansion",
    description:
      "Generate a numeric sequence using brace expansion.",
    content: `for i in {1..5}
do
  echo "Count: $i"
done`,
  },
  {
    id: "command-output",
    title: "Loop Through Command Output",
    description:
      "Iterate over output of another command.",
    content: `for file in $(ls)
do
  echo "File: $file"
done`,
  },
  {
    id: "c-style",
    title: "C-Style For Loop",
    description:
      "C-style loop syntax similar to programming languages.",
    content: `for (( i=1; i<=5; i++ ))
do
  echo "Value: $i"
done`,
  },
];

export default function ForLoopPage() {
  const lesson =
    shellLessons.find((l) => l.slug === "for-loop") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "For Loop in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn for loop in shell scripting with syntax, examples, and real-world use cases."
          }
        />
      </Head>

      <ShellLayout activeSlug="for-loop">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 10
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#22c55e] md:text-3xl">
            {lesson.title || "For Loop in Shell Scripting"}
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
                title={lesson.title || "For Loop in Shell Scripting"}
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
          {/* WHAT IS FOR LOOP */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              What is a For Loop?
            </h2>
            <p>
              A <strong>for loop</strong> allows you to repeat a block of code
              multiple times by iterating over a list, range, or sequence.
            </p>
            <p>
              It is commonly used when the number of iterations is known in
              advance.
            </p>
          </section>

          {/* WHY USE FOR LOOP */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Why Use a For Loop?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiRepeat className="text-lg" />}
                title="Repetition"
                text="Repeat commands multiple times without rewriting code."
              />
              <FeatureCard
                icon={<FiList className="text-lg" />}
                title="List Processing"
                text="Process files, numbers, or words easily."
              />
              <FeatureCard
                icon={<FiRefreshCcw className="text-lg" />}
                title="Automation"
                text="Automate repetitive system tasks efficiently."
              />
            </div>
          </section>

          {/* SYNTAX */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              For Loop Syntax
            </h2>
            <TerminalOutput
              content={`for variable in list
do
  commands
done`}
              title="for loop syntax"
              contextLabel="syntax"
              maxHeight="10rem"
            />
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#22c55e]">
              For Loop Examples
            </h2>

            {forLoopExamples.map((item, index) => (
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
                  contextLabel="for-loop"
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
              heading="Tips for Writing Clean Loops"
              points={[
                "Avoid complex logic inside loops.",
                "Use meaningful variable names.",
                "Prefer C-style loops for numeric ranges.",
                "Test loops with small data first.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-green-200">
              Practice Task – For Loop
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-green-50">
              <li>Print numbers from 1 to 10.</li>
              <li>List all files in a directory.</li>
              <li>Print even numbers between 1 and 20.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-200">
              Next lesson: While Loop
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
