import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiUser,
  FiMessageSquare,
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

/* ---------------- INPUT EXAMPLES ---------------- */

const inputExamples = [
  {
    id: "basic-read",
    title: "Basic User Input",
    description:
      "Use the read command to take input from the user.",
    content: `echo "Enter your name:"
read name
echo "Hello $name"`,
  },
  {
    id: "read-p",
    title: "Using read with -p option",
    description:
      "The -p option displays a prompt message on the same line.",
    content: `read -p "Enter your age: " age
echo "Your age is $age"`,
  },
  {
    id: "multiple-input",
    title: "Reading Multiple Inputs",
    description:
      "You can read multiple values in a single command.",
    content: `read -p "Enter first name and last name: " fname lname
echo "First Name: $fname"
echo "Last Name: $lname"`,
  },
  {
    id: "silent-input",
    title: "Silent Input (Password)",
    description:
      "Use -s to hide input (useful for passwords).",
    content: `read -s -p "Enter password: " pass
echo
echo "Password stored successfully"`,
  },
];

export default function UserInputPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "user-input") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "User Input in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to take user input in shell scripting using the read command with examples."
          }
        />
      </Head>

      <ShellLayout activeSlug="user-input">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 7
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "User Input in Shell Scripting"}
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
                title={lesson.title || "User Input in Shell Scripting"}
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
          {/* WHAT IS USER INPUT */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is User Input?
            </h2>
            <p>
              User input allows a script to accept values from the user during
              execution. This makes scripts interactive and dynamic.
            </p>
            <p>
              In shell scripting, input is usually taken using the <code>read</code> command.
            </p>
          </section>

          {/* WHY USE INPUT */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Why Use User Input?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiUser className="text-lg" />}
                title="Interactive Scripts"
                text="Allows users to provide values dynamically."
              />
              <FeatureCard
                icon={<FiEdit className="text-lg" />}
                title="Reusable Scripts"
                text="One script can handle many scenarios using inputs."
              />
              <FeatureCard
                icon={<FiMessageSquare className="text-lg" />}
                title="Better UX"
                text="Makes scripts user-friendly and interactive."
              />
            </div>
          </section>

          {/* INPUT EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Input Examples
            </h2>

            {inputExamples.map((item, index) => (
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
                  contextLabel="user-input"
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
              heading="Follow These Tips"
              points={[
                "Always validate user input when possible.",
                "Use -p to display clear prompts.",
                "Use -s for sensitive input like passwords.",
                "Avoid exposing sensitive data on screen.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice Task – User Input
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-green-50">
              <li>Ask user for their name and age.</li>
              <li>Print a greeting using the input.</li>
              <li>Ask for password using silent input.</li>
              <li>Display a success message.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-600">
              Next lesson: Conditional Statements (if / else)
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
