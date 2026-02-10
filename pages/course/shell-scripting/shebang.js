import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiTerminal,
  FiCode,
  FiPlay,
  FiAlertCircle,
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

/* ---------------- SHEBANG EXAMPLES ---------------- */

const shebangSnippets = [
  {
    id: "basic-shebang",
    title: "Basic Shebang Example",
    description:
      "A simple shell script using bash as the interpreter.",
    content: `#!/bin/bash
echo "Hello from Bash script"`,
  },
  {
    id: "env-shebang",
    title: "Using /usr/bin/env",
    description:
      "This makes the script portable across systems where bash path may differ.",
    content: `#!/usr/bin/env bash
echo "Running with env bash"`,
  },
  {
    id: "execute-script",
    title: "Make Script Executable and Run",
    description:
      "Give execute permission and run the script directly.",
    content: `chmod +x hello.sh
./hello.sh`,
  },
  {
    id: "run-without-shebang",
    title: "Running Without Shebang",
    description:
      "If a script has no shebang, you must specify the interpreter manually.",
    content: `bash hello.sh`,
  },
];

export default function ShebangPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "shebang") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Shebang in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn what shebang (#!) is, how it works, and how to use it correctly in shell scripting with practical examples."
          }
        />
      </Head>

      <ShellLayout activeSlug="shebang">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 3
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Shebang (#!) in Shell Scripting"}
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
                title={lesson.title || "Shebang in Shell Scripting"}
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
          {/* WHAT IS SHEBANG */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is Shebang?
            </h2>
            <p>
              The <strong>shebang</strong> is the first line of a script that
              tells the operating system which interpreter should be used to
              execute the file.
            </p>
            <p>
              It always starts with <code>#!</code> followed by the absolute
              path of the interpreter.
            </p>
          </section>

          {/* WHY SHEBANG */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Why Shebang is Important
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiTerminal className="text-lg" />}
                title="Interpreter Selection"
                text="It tells the OS which program should execute the script."
              />
              <FeatureCard
                icon={<FiPlay className="text-lg" />}
                title="Direct Execution"
                text="Allows running scripts like normal commands using ./script.sh."
              />
              <FeatureCard
                icon={<FiCode className="text-lg" />}
                title="Portability"
                text="Helps scripts run consistently across different systems."
              />
            </div>
          </section>

          {/* COMMON SHEBANGS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Common Shebang Examples
            </h2>
            <ul className="list-disc pl-5 dark:text-slate-300">
              <li><code>#!/bin/bash</code> – Bash shell</li>
              <li><code>#!/usr/bin/env bash</code> – Portable bash</li>
              <li><code>#!/bin/sh</code> – POSIX shell</li>
              <li><code>#!/usr/bin/python3</code> – Python script</li>
            </ul>
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Hands-on Examples
            </h2>

            {shebangSnippets.map((item, index) => (
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
                  contextLabel="shebang"
                  maxHeight="14rem"
                />
              </div>
            ))}
          </section>

          {/* COMMON MISTAKES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Common Mistakes
            </h2>
            <BulletCard
              heading="Avoid These Errors"
              points={[
                "Adding spaces before #! in the first line.",
                "Using wrong interpreter path.",
                "Forgetting to make the script executable.",
                "Using Windows line endings (CRLF).",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice Task – Shebang Mastery
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-green-50">
              <li>Create a script with <code>#!/bin/bash</code>.</li>
              <li>Print your username and current date.</li>
              <li>Make the script executable and run it.</li>
              <li>Try running it with and without <code>./</code>.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-600">
              Next lesson: Variables in Shell Scripting
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
