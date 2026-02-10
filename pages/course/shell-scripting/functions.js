import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiCode,
  FiRepeat,
  FiSettings,
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

/* ---------------- FUNCTION EXAMPLES ---------------- */

const functionExamples = [
  {
    id: "basic-function",
    title: "Basic Function Definition",
    description:
      "A simple function that prints a message.",
    content: `greet() {
  echo "Hello from function"
}

greet`,
  },
  {
    id: "function-arguments",
    title: "Function with Arguments",
    description:
      "Functions can accept parameters using $1, $2, etc.",
    content: `greet() {
  echo "Hello $1"
}

greet "Jay"`,
  },
  {
    id: "return-value",
    title: "Return Value from Function",
    description:
      "Functions can return a status using return.",
    content: `check_number() {
  if [ $1 -gt 10 ]; then
    return 0
  else
    return 1
  fi
}

check_number 15
echo "Return status: $?"`,
  },
  {
    id: "local-variable",
    title: "Local vs Global Variables",
    description:
      "Local variables exist only inside the function.",
    content: `myfunc() {
  local msg="Inside function"
  echo $msg
}

myfunc
echo $msg`,
  },
];

export default function FunctionsPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "functions") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Functions in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn shell scripting functions with syntax, examples, arguments, return values, and best practices."
          }
        />
      </Head>

      <ShellLayout activeSlug="functions">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 14
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Functions in Shell Scripting"}
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
                title={lesson.title || "Functions in Shell Scripting"}
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
          {/* WHAT IS FUNCTION */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is a Function?
            </h2>
            <p>
              A function is a reusable block of code designed to perform a
              specific task. Functions help reduce repetition and improve
              readability.
            </p>
          </section>

          {/* WHY FUNCTIONS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Why Use Functions?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiRepeat className="text-lg" />}
                title="Reusability"
                text="Write once, use many times."
              />
              <FeatureCard
                icon={<FiSettings className="text-lg" />}
                title="Maintainability"
                text="Easier to update and debug code."
              />
              <FeatureCard
                icon={<FiCode className="text-lg" />}
                title="Clean Code"
                text="Improves readability and structure."
              />
            </div>
          </section>

          {/* FUNCTION TYPES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Types of Functions
            </h2>
            <ul className="list-disc pl-5 dark:text-slate-300">
              <li>Simple functions (no arguments)</li>
              <li>Functions with arguments</li>
              <li>Functions with return status</li>
              <li>Functions using local variables</li>
            </ul>
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Function Examples
            </h2>

            {functionExamples.map((item, index) => (
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
                  contextLabel="functions"
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
              heading="Function Best Practices"
              points={[
                "Use meaningful function names.",
                "Keep functions small and focused.",
                "Use local variables to avoid conflicts.",
                "Return status codes for success/failure.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice Task – Functions
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-green-50">
              <li>Create a function to add two numbers.</li>
              <li>Create a function to check if a number is even or odd.</li>
              <li>Create a function to print system info.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-600">
              Next lesson: Script Arguments ($1, $2, $@)
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
