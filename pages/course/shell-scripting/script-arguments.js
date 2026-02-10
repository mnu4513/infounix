import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiTerminal,
  FiHash,
  FiList,
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

/* ---------------- SCRIPT ARGUMENT EXAMPLES ---------------- */

const scriptArgExamples = [
  {
    id: "basic-args",
    title: "Basic Script Arguments",
    description:
      "Pass arguments while running the script from terminal.",
    content: `#!/bin/bash
echo "First argument: $1"
echo "Second argument: $2"

# Run:
# ./script.sh hello world`,
  },
  {
    id: "arg-count",
    title: "Counting Arguments",
    description:
      "Use $# to get total number of arguments.",
    content: `#!/bin/bash
echo "Total arguments: $#"` ,
  },
  {
    id: "all-args",
    title: "Access All Arguments",
    description:
      "Use $@ or $* to access all arguments.",
    content: `#!/bin/bash
echo "All arguments: $@"
echo "All arguments as single string: $*"`,
  },
  {
    id: "loop-args",
    title: "Loop Through Arguments",
    description:
      "Iterate through all arguments using a loop.",
    content: `#!/bin/bash

for arg in "$@"
do
  echo "Argument: $arg"
done`,
  },
  {
    id: "shift-args",
    title: "Using shift Command",
    description:
      "Shift removes the first argument and shifts others.",
    content: `#!/bin/bash

while [ $# -gt 0 ]
do
  echo "Argument: $1"
  shift
done`,
  },
];

export default function ScriptArgumentsPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "script-arguments") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Script Arguments in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to use script arguments in shell scripting using $1, $2, $@, $*, and shift."
          }
        />
      </Head>

      <ShellLayout activeSlug="script-arguments">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 16
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Script Arguments in Shell Scripting"}
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
                title={lesson.title || "Script Arguments in Shell Scripting"}
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
          {/* WHAT ARE SCRIPT ARGUMENTS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What Are Script Arguments?
            </h2>
            <p>
              Script arguments are values passed to a shell script when it is
              executed. They allow scripts to behave dynamically based on user
              input.
            </p>
          </section>

          {/* WHY SCRIPT ARGUMENTS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Why Use Script Arguments?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiTerminal className="text-lg" />}
                title="Dynamic Execution"
                text="Run same script with different inputs."
              />
              <FeatureCard
                icon={<FiList className="text-lg" />}
                title="Automation"
                text="Useful in automation and batch scripts."
              />
              <FeatureCard
                icon={<FiHash className="text-lg" />}
                title="Parameter Handling"
                text="Easily manage multiple input values."
              />
            </div>
          </section>

          {/* POSITIONAL PARAMETERS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Positional Parameters
            </h2>
            <ul className="list-disc pl-5 dark:text-slate-300">
              <li><code>$0</code> – Script name</li>
              <li><code>$1</code> – First argument</li>
              <li><code>$2</code> – Second argument</li>
              <li><code>$#</code> – Number of arguments</li>
              <li><code>$@</code> – All arguments individually</li>
              <li><code>$*</code> – All arguments as a single string</li>
            </ul>
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Script Argument Examples
            </h2>

            {scriptArgExamples.map((item, index) => (
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
                  contextLabel="script-args"
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
              heading="Recommended Practices"
              points={[
                "Always validate number of arguments.",
                "Use meaningful variable names.",
                "Quote arguments to avoid word splitting.",
                "Use shift for processing arguments dynamically.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice Task – Script Arguments
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-green-50">
              <li>Create a script that accepts two numbers and prints their sum.</li>
              <li>Create a script that prints all arguments one by one.</li>
              <li>Validate minimum two arguments are passed.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-600">
              Next lesson: Exit Status & Error Handling
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
