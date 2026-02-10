import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiGitBranch,
  FiCheckCircle,
  FiAlertTriangle,
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

/* ---------------- CONDITIONAL EXAMPLES ---------------- */

const conditionalExamples = [
  {
    id: "if-basic",
    title: "Basic if Statement",
    description:
      "Executes a block of code only if the condition is true.",
    content: `age=18

if [ $age -ge 18 ]; then
  echo "You are eligible to vote"
fi`,
  },
  {
    id: "if-else",
    title: "if-else Statement",
    description:
      "Executes one block if condition is true, otherwise another.",
    content: `age=15

if [ $age -ge 18 ]; then
  echo "You can vote"
else
  echo "You are not eligible to vote"
fi`,
  },
  {
    id: "elif",
    title: "if-elif-else Statement",
    description:
      "Used when checking multiple conditions.",
    content: `marks=75

if [ $marks -ge 90 ]; then
  echo "Grade A"
elif [ $marks -ge 60 ]; then
  echo "Grade B"
else
  echo "Grade C"
fi`,
  },
  {
    id: "string-compare",
    title: "String Comparison Example",
    description:
      "Compare strings using = or != operators.",
    content: `name="admin"

if [ "$name" = "admin" ]; then
  echo "Welcome Admin"
else
  echo "Access Denied"
fi`,
  },
];

export default function ConditionalStatementsPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "conditional-statements") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Conditional Statements in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn conditional statements in shell scripting including if, elif, else with real examples."
          }
        />
      </Head>

      <ShellLayout activeSlug="conditional-statements">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 8
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#22c55e] md:text-3xl">
            {lesson.title || "Conditional Statements"}
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
                title={lesson.title || "Conditional Statements"}
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
          {/* WHAT IS CONDITIONAL */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              What is a Conditional Statement?
            </h2>
            <p>
              Conditional statements allow a script to make decisions based on
              conditions. The script executes different blocks of code depending
              on whether a condition is true or false.
            </p>
          </section>

          {/* WHY CONDITIONAL */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Why Use Conditional Statements?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiGitBranch className="text-lg" />}
                title="Decision Making"
                text="Control the flow of execution based on conditions."
              />
              <FeatureCard
                icon={<FiCheckCircle className="text-lg" />}
                title="Automation"
                text="Scripts can respond differently based on inputs."
              />
              <FeatureCard
                icon={<FiAlertTriangle className="text-lg" />}
                title="Error Handling"
                text="Handle success and failure cases properly."
              />
            </div>
          </section>

          {/* SYNTAX */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Syntax of if, elif, else
            </h2>
            <TerminalOutput
              content={`if [ condition ]; then
  commands
elif [ another_condition ]; then
  commands
else
  commands
fi`}
              title="syntax"
              contextLabel="syntax"
              maxHeight="12rem"
            />
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Examples
            </h2>

            {conditionalExamples.map((item, index) => (
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
                  contextLabel="if-else"
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
              heading="Follow These Rules"
              points={[
                "Always leave space after [ and before ].",
                "Use double quotes around variables.",
                "Indent code for readability.",
                "Use elif instead of multiple if statements.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-green-200">
              Practice Task – Conditional Logic
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-green-50">
              <li>Ask user for age and check eligibility.</li>
              <li>Check if a number is positive or negative.</li>
              <li>Check username and allow access.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-200">
              Next lesson: Loops (for, while, until)
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
