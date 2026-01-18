import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiTerminal,
  FiLayers,
  FiCpu,
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

/* ---------------- TERMINAL EXAMPLES ---------------- */

const shellBasicsSnippets = [
  {
    id: "open-shell",
    title: "Open a Shell Session",
    description:
      "Open your terminal and start interacting with the system.",
    content: `$ whoami
jay

$ pwd
/home/jay`,
  },
  {
    id: "navigation",
    title: "Basic Navigation Commands",
    description:
      "Use basic commands to move around the filesystem.",
    content: `$ ls
Documents  Downloads  Scripts

$ cd Documents

$ pwd
/home/jay/Documents`,
  },
  {
    id: "check-shell",
    title: "Check Current Shell",
    description:
      "Find out which shell you are currently using.",
    content: `$ echo $SHELL
/bin/bash`,
  },
];

export default function LinuxShellPage() {
  const lesson =
    shellLessons.find((l) => l.slug === "basic-linux-shell") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Linux Shell Basics"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn the fundamentals of the Linux shell, how it works, and how to use basic shell commands."
          }
        />
      </Head>

      <ShellLayout activeSlug="basic-linux-shell">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 2
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#22c55e] md:text-3xl">
            {lesson.title || "Linux Shell Basics"}
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
                title={lesson.title || "Linux Shell Basics"}
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
          {/* WHAT IS SHELL */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              What is a Linux Shell?
            </h2>
            <p>
              A shell is a command-line interface that allows users to interact
              with the Linux operating system. It acts as a bridge between the
              user and the kernel.
            </p>
            <p>
              When you type a command, the shell interprets it and requests the
              kernel to perform the required action such as running a program,
              managing files, or controlling processes.
            </p>
          </section>

          {/* CORE CONCEPTS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Core Concepts of Shell
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiTerminal className="text-lg" />}
                title="Command Interpreter"
                text="The shell reads commands entered by the user and executes them through the operating system."
              />
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="User & Kernel Bridge"
                text="It connects users with the Linux kernel without requiring direct system access."
              />
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="Automation Ready"
                text="Shells allow automation using scripts to perform repetitive tasks efficiently."
              />
            </div>
          </section>

          {/* COMMANDS */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Basic Shell Commands
            </h2>

            {shellBasicsSnippets.map((item, index) => (
              <div key={item.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {item.title}
                </h3>
                <p className="text-xs text-slate-300">{item.description}</p>
                <TerminalOutput
                  content={item.content}
                  title="terminal — bash"
                  contextLabel="shell-basic"
                  maxHeight="14rem"
                />
              </div>
            ))}
          </section>

          {/* TIPS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Helpful Tips for Beginners
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Learning Tips"
                points={[
                  "Practice commands daily to build muscle memory.",
                  "Use the 'man' command to read manuals.",
                  "Avoid running unknown commands as root.",
                ]}
              />
              <BulletCard
                heading="Efficiency Tips"
                points={[
                  "Use tab completion to save time.",
                  "Use command history with arrow keys.",
                  "Organize scripts in a dedicated folder.",
                ]}
              />
            </div>
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-green-200">
              Practice Task – Explore the Shell
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-green-50">
              <li>Open a terminal and check your current directory.</li>
              <li>List files using <code>ls</code>.</li>
              <li>Navigate into a directory using <code>cd</code>.</li>
              <li>Check your active shell using <code>echo $SHELL</code>.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-200">
              Next lesson: Shell Script Basics & Shebang
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
