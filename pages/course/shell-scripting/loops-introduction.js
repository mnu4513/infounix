import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiRepeat,
  FiRefreshCw,
  FiLayers,
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

/* ---------------- LOOP OVERVIEW EXAMPLES ---------------- */

const loopExamples = [
  {
    id: "simple-loop",
    title: "Basic Loop Concept",
    description:
      "A loop repeats a block of code until a condition is met.",
    content: `for i in 1 2 3
do
  echo "Number: $i"
done`,
  },
  {
    id: "while-loop-preview",
    title: "While Loop Concept",
    description:
      "A while loop keeps running as long as the condition is true.",
    content: `count=1
while [ $count -le 3 ]
do
  echo "Count is $count"
  count=$((count + 1))
done`,
  },
  {
    id: "until-loop-preview",
    title: "Until Loop Concept",
    description:
      "An until loop runs until the condition becomes true.",
    content: `count=1
until [ $count -gt 3 ]
do
  echo "Count: $count"
  count=$((count + 1))
done`,
  },
];

export default function LoopsIntroPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "loops") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Loops in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn what loops are in shell scripting, why they are used, and understand different types of loops with examples."
          }
        />
      </Head>

      <ShellLayout activeSlug="loops">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 9
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Loops in Shell Scripting"}
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
                title={lesson.title || "Loops in Shell Scripting"}
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
          {/* WHAT IS LOOP */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is a Loop?
            </h2>
            <p>
              A loop allows a block of code to run repeatedly until a certain
              condition is met. It helps automate repetitive tasks and reduce
              code duplication.
            </p>
          </section>

          {/* WHY USE LOOPS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Why Use Loops?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiRepeat className="text-lg" />}
                title="Automation"
                text="Perform repetitive tasks automatically."
              />
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="Efficiency"
                text="Reduce code duplication and simplify logic."
              />
              <FeatureCard
                icon={<FiRefreshCw className="text-lg" />}
                title="Dynamic Execution"
                text="Work with changing values and conditions."
              />
            </div>
          </section>

          {/* TYPES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Types of Loops in Shell
            </h2>
            <ul className="list-disc pl-5 dark:text-slate-300">
              <li><strong>for loop</strong> – Iterates over a list or range</li>
              <li><strong>while loop</strong> – Runs while condition is true</li>
              <li><strong>until loop</strong> – Runs until condition becomes true</li>
            </ul>
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Basic Loop Examples
            </h2>

            {loopExamples.map((item, index) => (
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
                  contextLabel="loops"
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
              heading="Loop Guidelines"
              points={[
                "Avoid infinite loops unless intentionally required.",
                "Use meaningful variable names.",
                "Keep loop logic simple and readable.",
                "Add comments for complex loops.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice Task – Loop Basics
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-green-50">
              <li>Print numbers from 1 to 5 using a loop.</li>
              <li>Create a loop to display your name 3 times.</li>
              <li>Modify the loop to stop at a condition.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-600">
              Next lesson: <strong>For Loop (Detailed)</strong>
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
