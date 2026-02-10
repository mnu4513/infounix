import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiHash,
  FiList,
  FiCode,
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

/* ---------------- FUNCTION ARGUMENT EXAMPLES ---------------- */

const functionArgExamples = [
  {
    id: "basic-args",
    title: "Basic Function Arguments",
    description:
      "Arguments passed to a function are accessed using $1, $2, etc.",
    content: `greet() {
  echo "Hello $1"
}

greet John`,
  },
  {
    id: "multiple-args",
    title: "Multiple Arguments",
    description:
      "You can pass multiple arguments to a function.",
    content: `add() {
  sum=$(( $1 + $2 ))
  echo "Sum: $sum"
}

add 10 20`,
  },
  {
    id: "special-params",
    title: "Special Parameters",
    description:
      "Special variables like $#, $@, and $* provide argument info.",
    content: `show_args() {
  echo "Total arguments: $#"
  echo "All arguments: $@"
}

show_args one two three`,
  },
  {
    id: "shift-args",
    title: "Using shift Command",
    description:
      "Shift moves positional parameters to the left.",
    content: `print_args() {
  while [ "$#" -gt 0 ]; do
    echo "Argument: $1"
    shift
  done
}

print_args A B C`,
  },
];

export default function FunctionArgumentsPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "function-arguments") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Function Arguments in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to pass arguments to shell functions using positional parameters, $@, $*, and shift."
          }
        />
      </Head>

      <ShellLayout activeSlug="function-arguments">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 15
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Function Arguments in Shell Scripting"}
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
                title={lesson.title || "Function Arguments in Shell Scripting"}
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
          {/* WHAT ARE FUNCTION ARGUMENTS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What Are Function Arguments?
            </h2>
            <p>
              Function arguments allow you to pass values into a function when
              calling it. These values can then be used inside the function
              using positional parameters.
            </p>
          </section>

          {/* WHY USE ARGUMENTS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Why Use Function Arguments?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiCode className="text-lg" />}
                title="Reusability"
                text="Write one function and reuse it with different values."
              />
              <FeatureCard
                icon={<FiList className="text-lg" />}
                title="Flexibility"
                text="Change behavior without changing code."
              />
              <FeatureCard
                icon={<FiHash className="text-lg" />}
                title="Dynamic Inputs"
                text="Pass runtime values into functions."
              />
            </div>
          </section>

          {/* POSITIONAL PARAMETERS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Positional Parameters
            </h2>
            <ul className="list-disc pl-5 dark:text-slate-300">
              <li><code>$1</code> – First argument</li>
              <li><code>$2</code> – Second argument</li>
              <li><code>$#</code> – Total number of arguments</li>
              <li><code>$@</code> – All arguments (as list)</li>
              <li><code>$*</code> – All arguments as a single string</li>
            </ul>
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Function Argument Examples
            </h2>

            {functionArgExamples.map((item, index) => (
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
                  contextLabel="function-args"
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
              heading="Best Practices"
              points={[
                "Always validate arguments before using them.",
                "Use meaningful function and variable names.",
                "Use shift for processing multiple arguments.",
                "Document expected arguments in comments.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice Task – Function Arguments
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-green-50">
              <li>Create a function that adds two numbers.</li>
              <li>Create a function that prints all arguments.</li>
              <li>Create a function that counts arguments.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-600">
              Next lesson: Script Arguments ($0, $1, $@)
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
