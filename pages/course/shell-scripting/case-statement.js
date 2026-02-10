import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiLayers,
  FiList,
  FiCheckCircle,
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

/* ---------------- CASE STATEMENT EXAMPLES ---------------- */

const caseExamples = [
  {
    id: "basic-case",
    title: "Basic Case Statement",
    description:
      "Simple case statement to match a single value.",
    content: `read -p "Enter a number (1-3): " num

case $num in
  1)
    echo "You selected One"
    ;;
  2)
    echo "You selected Two"
    ;;
  3)
    echo "You selected Three"
    ;;
  *)
    echo "Invalid option"
    ;;
esac`,
  },
  {
    id: "menu-case",
    title: "Menu Driven Program",
    description:
      "A real-world example using case for menu selection.",
    content: `echo "1. Start"
echo "2. Stop"
echo "3. Restart"

read -p "Choose an option: " choice

case $choice in
  1)
    echo "Service Started"
    ;;
  2)
    echo "Service Stopped"
    ;;
  3)
    echo "Service Restarted"
    ;;
  *)
    echo "Invalid Option"
    ;;
esac`,
  },
  {
    id: "pattern-case",
    title: "Pattern Matching in Case",
    description:
      "Case statement can match patterns.",
    content: `read -p "Enter a character: " ch

case $ch in
  [a-z])
    echo "Lowercase letter"
    ;;
  [A-Z])
    echo "Uppercase letter"
    ;;
  [0-9])
    echo "Digit"
    ;;
  *)
    echo "Special character"
    ;;
esac`,
  },
];

export default function CaseStatementPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "case-statement") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Case Statement in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn case statement in shell scripting with syntax, examples, and real-world use cases."
          }
        />
      </Head>

      <ShellLayout activeSlug="case-statement">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 13
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#22c55e] md:text-3xl">
            {lesson.title || "Case Statement in Shell Scripting"}
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
                title={lesson.title || "Case Statement in Shell Scripting"}
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
          {/* WHAT IS CASE */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              What is a Case Statement?
            </h2>
            <p>
              A <strong>case statement</strong> allows you to execute different
              blocks of code based on the value of a variable.
            </p>
            <p>
              It is often used as an alternative to long if-elif-else chains.
            </p>
          </section>

          {/* WHY CASE */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Why Use Case Statement?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiList className="text-lg" />}
                title="Readable"
                text="Cleaner and easier to read than multiple if-else conditions."
              />
              <FeatureCard
                icon={<FiCheckCircle className="text-lg" />}
                title="Efficient"
                text="Simplifies decision-making logic."
              />
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="Pattern Matching"
                text="Supports pattern-based matching."
              />
            </div>
          </section>

          {/* SYNTAX */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Case Statement Syntax
            </h2>
            <TerminalOutput
              content={`case $variable in
  pattern1)
    commands
    ;;
  pattern2)
    commands
    ;;
  *)
    default commands
    ;;
esac`}
              title="case syntax"
              contextLabel="syntax"
              maxHeight="12rem"
            />
          </section>

          {/* EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Case Statement Examples
            </h2>

            {caseExamples.map((item, index) => (
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
                  contextLabel="case"
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
              heading="Recommended Usage"
              points={[
                "Always include a default (*) case.",
                "Use clear and readable patterns.",
                "Avoid overly complex case blocks.",
                "Use case for menus and user choices.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-green-200">
              Practice Task – Case Statement
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-green-50">
              <li>Create a menu-driven calculator.</li>
              <li>Build a menu to start/stop a service.</li>
              <li>Use case to check file types.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-200">
              Next lesson: Functions in Shell Scripting
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
