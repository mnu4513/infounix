import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiDatabase,
  FiEdit,
  FiRepeat,
  FiLayers,
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

/* ---------------- VARIABLE EXAMPLES ---------------- */

const variableExamples = [
  {
    id: "define-variable",
    title: "Defining a Variable",
    description:
      "Variables are created by assigning a value without spaces around '='.",
    content: `name="Linux"
echo $name`,
  },
  {
    id: "numeric-variable",
    title: "Numeric Variable Example",
    description:
      "Variables can store numbers and be used in calculations.",
    content: `num=10
echo $num`,
  },
  {
    id: "overwrite-variable",
    title: "Overwriting a Variable",
    description:
      "Variables can be reassigned with new values.",
    content: `course="Shell"
echo $course

course="Linux"
echo $course`,
  },
  {
    id: "readonly-variable",
    title: "Read-only (Constant) Variable",
    description:
      "Use readonly to make a variable constant.",
    content: `readonly PI=3.14
echo $PI

PI=3.1415   # This will cause an error`,
  },
  {
    id: "env-variable",
    title: "Environment Variable",
    description:
      "Environment variables are available to child processes.",
    content: `export CITY="Delhi"
echo $CITY`,
  },
];

export default function VariablesPage() {
  const lesson =
    shellLessons.find((l) => l.slug === "variables") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Variables in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn variables in shell scripting including declaration, usage, environment variables, constants, and best practices."
          }
        />
      </Head>

      <ShellLayout activeSlug="variables">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 6
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#22c55e] md:text-3xl">
            {lesson.title || "Variables in Shell Scripting"}
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
                title={lesson.title || "Variables in Shell Scripting"}
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
          {/* WHAT ARE VARIABLES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              What Are Variables?
            </h2>
            <p>
              Variables are used to store data that can be reused throughout a
              script. A variable can hold text, numbers, or command output.
            </p>
            <p>
              In shell scripting, variables are created dynamically and do not
              require explicit data types.
            </p>
          </section>

          {/* WHY VARIABLES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Why Use Variables?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiDatabase className="text-lg" />}
                title="Store Data"
                text="Store values that can be reused throughout the script."
              />
              <FeatureCard
                icon={<FiRepeat className="text-lg" />}
                title="Avoid Repetition"
                text="Change value once and reuse it everywhere."
              />
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="Dynamic Behavior"
                text="Scripts behave dynamically based on variable values."
              />
            </div>
          </section>

          {/* TYPES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Types of Variables
            </h2>
            <ul className="list-disc pl-5 text-slate-300">
              <li>Local Variables</li>
              <li>Environment Variables</li>
              <li>Read-only (Constant) Variables</li>
            </ul>
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Variable Examples
            </h2>

            {variableExamples.map((item, index) => (
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
                  contextLabel="variables"
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
              heading="Good Practices"
              points={[
                "Use meaningful variable names.",
                "Avoid spaces around '='.",
                "Use uppercase for constants.",
                "Quote variables to prevent word splitting.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-green-200">
              Practice Task – Variables
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-green-50">
              <li>Create a variable named <code>name</code> and print it.</li>
              <li>Create a variable <code>age</code> and update its value.</li>
              <li>Create a constant variable using <code>readonly</code>.</li>
              <li>Export a variable and verify it using <code>env</code>.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-200">
              Next lesson: User Input (read command)
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
