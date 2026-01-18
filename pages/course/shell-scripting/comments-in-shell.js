import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiMessageSquare,
  FiEdit3,
  FiFileText,
  FiAlertCircle,
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

/* ---------------- COMMENT EXAMPLES ---------------- */

const commentExamples = [
  {
    id: "single-line",
    title: "Single Line Comment",
    description:
      "Use # to add a comment on a single line. The shell ignores everything after #.",
    content: `# This is a single-line comment
echo "Hello World"`,
  },
  {
    id: "inline-comment",
    title: "Inline Comment",
    description:
      "Comments can also appear after a command on the same line.",
    content: `echo "Hello World"  # This prints a message`,
  },
  {
    id: "multi-line",
    title: "Multi-line Comment (Using : << )",
    description:
      "Shell does not have real multi-line comments, but this is a common workaround.",
    content: `: << 'COMMENT'
This is a multi-line comment.
Nothing inside this block will be executed.
You can write multiple lines here.
COMMENT`,
  },
  {
    id: "comment-block",
    title: "Commenting Multiple Lines Using #",
    description:
      "Each line must start with # for a block-style comment.",
    content: `# This is line one
# This is line two
# This is line three`,
  },
];

export default function CommentsInShellPage() {
  const lesson =
    shellLessons.find((l) => l.slug === "comments-in-shell") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Comments in Shell Scripting"} | Shell Scripting | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to use comments in shell scripting, including single-line and multi-line comments with practical examples."
          }
        />
      </Head>

      <ShellLayout activeSlug="comments-in-shell">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Shell Scripting · Lesson 5
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#22c55e] md:text-3xl">
            {lesson.title || "Comments in Shell Scripting"}
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
                title={lesson.title || "Comments in Shell Scripting"}
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
          {/* WHAT IS COMMENT */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              What is a Comment?
            </h2>
            <p>
              A comment is a line of text that is ignored by the shell. It is
              used to explain code, add notes, or temporarily disable commands.
            </p>
            <p>
              Comments improve readability and make scripts easier to maintain.
            </p>
          </section>

          {/* WHY USE COMMENTS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Why Use Comments?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiMessageSquare className="text-lg" />}
                title="Clarity"
                text="Helps others (and yourself) understand what the script does."
              />
              <FeatureCard
                icon={<FiEdit3 className="text-lg" />}
                title="Maintenance"
                text="Makes it easier to modify scripts later."
              />
              <FeatureCard
                icon={<FiFileText className="text-lg" />}
                title="Debugging"
                text="You can disable lines temporarily during testing."
              />
            </div>
          </section>

          {/* COMMENT TYPES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Types of Comments
            </h2>
            <p>
              Shell scripting mainly supports single-line comments. Multi-line
              comments are simulated using special techniques.
            </p>
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Comment Examples
            </h2>

            {commentExamples.map((item, index) => (
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
                  contextLabel="comments"
                  maxHeight="14rem"
                />
              </div>
            ))}
          </section>

          {/* COMMON MISTAKES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#22c55e]">
              Common Mistakes
            </h2>
            <BulletCard
              heading="Avoid These Mistakes"
              points={[
                "Forgetting # before comments.",
                "Adding spaces before # in shebang line.",
                "Assuming multi-line comments work like other languages.",
                "Leaving debug comments in production scripts.",
              ]}
            />
          </section>

          {/* PRACTICE */}
          <section className="space-y-3 rounded-2xl border border-green-500/40 bg-green-500/10 p-4 shadow-lg shadow-green-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-green-200">
              Practice Task – Comments
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-green-50">
              <li>Create a script with a header comment explaining its purpose.</li>
              <li>Add inline comments explaining each command.</li>
              <li>Try using a multi-line comment block.</li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-green-200">
              Next lesson: Variables in Shell Scripting
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
