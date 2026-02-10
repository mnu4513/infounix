import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiTerminal,
  FiFileText,
  FiPlay,
  FiLock,
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

/* ---------------- SCRIPT EXAMPLES ---------------- */

const scriptExamples = [
  {
    id: "create-script",
    title: "Create Your First Script File",
    description:
      "Create a new file using a text editor. Here we use nano.",
    content: `nano hello.sh`,
  },
  {
    id: "script-content",
    title: "Write Your First Script",
    description:
      "Add a shebang and a simple echo command.",
    content: `#!/bin/bash
echo "Hello World from my first script"`,
  },
  {
    id: "check-permission",
    title: "Check File Permissions",
    description:
      "By default, a new file does not have execute permission.",
    content: `ls -l hello.sh
-rw-r--r-- 1 user user 45 hello.sh`,
  },
  {
    id: "chmod",
    title: "Give Execute Permission",
    description:
      "Make the script executable using chmod.",
    content: `chmod u+x hello.sh

ls -l hello.sh
-rwxr--r-- 1 user user 45 hello.sh`,
  },
  {
    id: "execute-script",
    title: "Execute the Script",
    description:
      "Run the script using ./ when it has execute permission.",
    content: `./hello.sh`,
  },
  {
    id: "run-with-shell",
    title: "Run Script Using Shell Command",
    description:
      "You can also execute a script without execute permission.",
    content: `bash hello.sh
sh hello.sh`,
  },
];

export default function FirstScriptPage() {
  const lesson =
    ShellLessons.find((l) => l.slug === "first-script") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "First Shell Script"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to create your first shell script, understand execution permissions, and run scripts using different methods."
          }
        />
      </Head>

      <ShellLayout activeSlug="first-script">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 4
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Your First Shell Script"}
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
                title={lesson.title || "First Shell Script"}
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
          {/* WHAT IS A SCRIPT */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What Is a Shell Script?
            </h2>
            <p>
              A shell script is a text file containing a sequence of Linux
              commands. These commands are executed line by line by the shell.
            </p>
            <p>
              Scripts help automate tasks, reduce manual work, and ensure
              consistency across systems.
            </p>
          </section>

          {/* WHY EXECUTION PERMISSION */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Why Execution Permission Matters
            </h2>
            <p>
              Linux treats scripts like normal files. To execute a script
              directly, it must have execute permission.
            </p>
            <p>
              Without execute permission, the system will block execution for
              security reasons.
            </p>
          </section>

          {/* FEATURES */}
          <section className="space-y-3">
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiFileText className="text-lg" />}
                title="Script File"
                text="A plain text file containing shell commands."
              />
              <FeatureCard
                icon={<FiLock className="text-lg" />}
                title="Execution Permission"
                text="Required to run a script directly using ./script.sh."
              />
              <FeatureCard
                icon={<FiPlay className="text-lg" />}
                title="Execution Methods"
                text="Run using ./script.sh, bash script.sh, or sh script.sh."
              />
            </div>
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-Step: Create & Run Script
            </h2>

            {scriptExamples.map((item, index) => (
              <div key={item.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {item.title}
                </h3>
                <p className="text-xs dark:text-slate-300">{item.description}</p>
                <TerminalOutput
                  content={item.content}
                  title="terminal — bash"
                  contextLabel="first-script"
                  maxHeight="14rem"
                />
              </div>
            ))}
          </section>

          {/* COMMON MISTAKES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Common Mistakes Beginners Make
            </h2>
            <BulletCard
              heading="Avoid These Issues"
              points={[
                "Forgetting to add execute permission.",
                "Typing ./script.sh without execute permission.",
                "Using Windows line endings (CRLF).",
                "Missing or incorrect shebang line.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice Task – Your First Script
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-green-50">
              <li>Create a script named <code>hello.sh</code>.</li>
              <li>Add a shebang and print your name.</li>
              <li>Give execute permission.</li>
              <li>Run it using <code>./hello.sh</code>.</li>
              <li>Try running with <code>bash hello.sh</code>.</li>
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
