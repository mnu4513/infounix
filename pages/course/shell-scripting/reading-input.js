// pages/course/shell-scripting/reading-input.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiUser,
  FiKeyboard,
  FiCommand,
  FiAlertTriangle,
  FiCode,
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
    transition: { delay, duration: 0.4, ease: "easeOut" },
  },
});

export default function ReadingInputAndArgumentsPage() {
  // Match the slug defined in shellLessons.js so sidebar highlight works
  const lesson =
    shellLessons.find(
      (l) => l.slug === "reading-input"
    ) || {};

  return (
    <>
      <Head>
        <title>
          {(lesson.title || "Reading User Input & Command Line Arguments") +
            " | Shell Scripting Course | InfoUnix"}
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to read user input with read, use command line arguments like $1, $#, $@, and write flexible scripts that work both interactively and non-interactively."
          }
        />
      </Head>

      <ShellLayout activeSlug="reading-input">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Shell Scripting · Lesson 5
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            Reading User Input & Command Line Arguments
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Real scripts rarely work with hard-coded values. You either ask the
            user for input, or accept parameters on the command line. In this
            lesson, we&apos;ll learn the <code>read</code> command and special
            argument variables like <code>$1</code>, <code>$#</code> and{" "}
            <code>$@</code> – the core of flexible shell scripts.
          </p>

          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
        </motion.header>

        {/* VIDEO (optional) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.05)}
          className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-slate-950/80"
        >
          {lesson.videoUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={lesson.videoUrl}
                title={
                  lesson.title ||
                  "Reading User Input & Command Line Arguments"
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your input/arguments lesson video URL in{" "}
              <code>shellLessons.js</code> (slug:{" "}
              <code>reading-input</code>).
            </div>
          )}
        </motion.div>

        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed text-slate-200"
        >
          {/* CORE IDEAS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Core ideas of this lesson
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiKeyboard className="text-lg" />}
                title="Interactive input"
                text="Use read to ask the user questions in the terminal (name, path, confirmation, etc.)."
              />
              <FeatureCard
                icon={<FiCommand className="text-lg" />}
                title="Command line arguments"
                text="Use $1, $2, ..., $# and $@ to accept parameters when running scripts from CLI."
              />
              <FeatureCard
                icon={<FiUser className="text-lg" />}
                title="Flexible scripts"
                text="Combine both: use arguments if provided, else ask the user – works for automation and manual runs."
              />
            </div>

            <BulletCard
              heading="What you will be able to do"
              points={[
                "Write scripts that ask the user for input (names, paths, choices).",
                "Write scripts that accept arguments like ./script.sh source dest.",
                "Validate arguments and show helpful usage messages.",
              ]}
            />
          </section>

          {/* read BASICS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Reading user input with <code>read</code>
            </h2>

            <p>
              The <code>read</code> builtin reads a line from standard input
              (keyboard by default) and stores it into one or more variables.
            </p>

            <TerminalOutput
              title="Basic read usage"
              contextLabel="shell-read"
              maxHeight="18rem"
              content={`#!/bin/bash
# ask_name.sh

echo -n "Enter your name: "
read NAME

echo "Hello, $NAME! Welcome to shell scripting."`}
            />

            <p className="text-xs text-slate-400">
              Optionally, you can use <code>read -p</code> to print the prompt
              directly, which is common in bash:
            </p>

            <TerminalOutput
              title="Using read -p for inline prompt (bash)"
              contextLabel="shell-read"
              maxHeight="12rem"
              content={`#!/bin/bash

read -p "Enter your city: " CITY
echo "You are from: $CITY"`}
            />
          </section>

          {/* read OPTIONS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Useful read options: multiple variables, silent input, raw mode
            </h2>

            <BulletCard
              heading="Common read options"
              points={[
                "-p PROMPT – print prompt text (bash).",
                "-s – silent mode (don&apos;t echo input, good for passwords).",
                "-r – raw mode (do not treat backslashes specially).",
                "Multiple variable names – split input into several variables.",
              ]}
            />

            <TerminalOutput
              title="Examples of read flags"
              contextLabel="shell-read"
              maxHeight="26rem"
              content={`#!/bin/bash

# 1) Multiple values in one line
read -p "Enter first and last name: " FIRST LAST
echo "First: $FIRST, Last: $LAST"

# 2) Silent input (password)
read -s -p "Enter a secret value: " SECRET
echo
echo "You entered something secret (not printing it)."

# 3) Use -r when reading paths or text that may contain backslashes
read -r -p "Enter a file path: " FILEPATH
echo "Path is: $FILEPATH"`}
            />
          </section>

          {/* ARGUMENTS BASICS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Command line arguments: $0, $1, $#, $@
            </h2>

            <p>
              When you run a script with extra words, they are passed as{" "}
              <strong>arguments</strong>. For example:{" "}
              <code>./myscript.sh arg1 arg2 arg3</code>
            </p>

            <ul className="list-disc pl-5 text-xs text-slate-200 space-y-1">
              <li>
                <code>$0</code> – the script name.
              </li>
              <li>
                <code>$1, $2, ...</code> – first, second, ... argument.
              </li>
              <li>
                <code>$#</code> – number of arguments.
              </li>
              <li>
                <code>$@</code> – all arguments as separate words (when quoted,
                &quot;$@&quot; keeps them separated).
              </li>
              <li>
                <code>$*</code> – all arguments as one word (rarely used;{" "}
                <code>"$@"</code> is safer).
              </li>
            </ul>

            <TerminalOutput
              title="Simple args demo script"
              contextLabel="shell-args"
              maxHeight="24rem"
              content={`#!/bin/bash
# show_args.sh

echo "Script name : $0"
echo "Arg count   : $#"
echo "First arg   : $1"
echo "All args    : $@"

# Example usage:
#   chmod +x show_args.sh
#   ./show_args.sh one two three

# Example output:
# Script name : ./show_args.sh
# Arg count   : 3
# First arg   : one
# All args    : one two three`}
            />
          </section>

          {/* VALIDATING ARGUMENTS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Validating arguments and printing usage
            </h2>

            <p>
              Good scripts don&apos;t just fail silently when arguments are
              missing; they show a clear usage message.
            </p>

            <TerminalOutput
              title="Example: require two arguments (source and destination)"
              contextLabel="shell-args"
              maxHeight="30rem"
              content={`#!/bin/bash
# copy_file.sh - copy a file from source to destination

usage() {
  echo "Usage: $0 <source_file> <destination_file>"
  exit 1
}

# Expect exactly 2 arguments
if [ "$#" -ne 2 ]; then
  echo "ERROR: wrong number of arguments."
  usage
fi

SRC="$1"
DEST="$2"

echo "Source      : $SRC"
echo "Destination : $DEST"

# Check that source exists
if [ ! -f "$SRC" ]; then
  echo "ERROR: source file does not exist: $SRC"
  exit 2
fi

cp "$SRC" "$DEST"

if [ $? -eq 0 ]; then
  echo "File copied successfully."
else
  echo "ERROR: copy failed!"
fi`}
            />

            <p className="text-xs text-slate-400">
              This pattern (check <code>$#</code>, print usage, validate files)
              is extremely common in production scripts.
            </p>
          </section>

          {/* "$@" IN LOOPS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Looping over all arguments with &quot;$@&quot;
            </h2>

            <p>
              When you want to process each argument in the same way, use{" "}
              <code>"$@"</code> in a loop:
            </p>

            <TerminalOutput
              title="Example: print each argument on its own line"
              contextLabel="shell-args"
              maxHeight="18rem"
              content={`#!/bin/bash
# list_args.sh

echo "You passed $# arguments."

for arg in "$@"; do
  echo "Argument: $arg"
done

# Usage:
#   ./list_args.sh one "two words" three`}
            />

            <p className="text-xs text-slate-400">
              Using <code>"$@"</code> (with quotes) ensures that each original
              argument (including those with spaces) is preserved correctly.
            </p>
          </section>

          {/* COMBINING ARGS + READ */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Combining arguments and interactive input
            </h2>

            <p>
              A nice pattern: if an argument is provided, use it; otherwise,
              fall back to asking the user interactively.
            </p>

            <TerminalOutput
              title="Example: script that uses arg if present, else read"
              contextLabel="shell-args"
              maxHeight="26rem"
              content={`#!/bin/bash
# greet.sh - use argument or ask user

if [ -n "$1" ]; then
  NAME="$1"
else
  read -p "Enter your name: " NAME
fi

echo "Hello, $NAME!"`}
            />

            <p className="text-xs text-slate-400">
              This way the script works both in automation (where you pass name
              as an argument) and in manual mode (where user types interactively
              when prompted).
            </p>
          </section>

          {/* PRACTICAL DISK SCRIPT (FIXED ${} ESCAPING) */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Practical example: disk usage script with optional threshold
            </h2>

            <p>
              Let&apos;s upgrade the disk usage script from earlier to accept an
              optional threshold as argument, or ask the user if not provided.
            </p>

            <TerminalOutput
              title="check_disk2.sh"
              contextLabel="shell-args"
              maxHeight="30rem"
              content={`#!/bin/bash
# check_disk2.sh - warn if filesystems cross a threshold

DEFAULT_THRESHOLD=80

if [ -n "$1" ]; then
  THRESHOLD="$1"
else
  read -p "Enter threshold percentage (default $DEFAULT_THRESHOLD): " THRESHOLD
  # If user just presses Enter, use default
  if [ -z "$THRESHOLD" ]; then
    THRESHOLD="$DEFAULT_THRESHOLD"
  fi
fi

echo "Using threshold: $THRESHOLD%"
echo

# Use df -hP to get a consistent format (POSIX)
df -hP | awk 'NR>1 {print $5 " " $6}' | while read use mount; do
  # Strip the % sign
  PERCENT=\${use%%%}

  if [ "$PERCENT" -ge "$THRESHOLD" ]; then
    echo "WARNING: Filesystem $mount is at \${PERCENT}% usage"
  else
    echo "OK     : Filesystem $mount is at \${PERCENT}% usage"
  fi
done`}
            />

            <p className="text-xs text-slate-400">
              Now the script can be used non-interactively (e.g. from cron with{" "}
              <code>check_disk2.sh 85</code>) or interactively (it will ask if
              you don&apos;t give a threshold).
            </p>
          </section>

          {/* SAFETY BOX */}
          <section className="space-y-3 rounded-2xl border border-yellow-500/60 bg-yellow-500/10 p-4 shadow-lg shadow-yellow-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-yellow-100">
              <FiAlertTriangle className="text-base" />
              Safety notes when using user input or arguments
            </h2>
            <ul className="list-disc pl-5 text-[13px] text-yellow-50 space-y-1">
              <li>
                Never blindly use user input in destructive commands like rm,
                mv, or dd.
              </li>
              <li>
                Always quote variables: <code>rm "$FILE"</code> not{" "}
                <code>rm $FILE</code>.
              </li>
              <li>
                Check that files/directories exist before operating on them.
              </li>
              <li>
                Validate numeric input (e.g. threshold, sizes) before using in
                comparisons.
              </li>
            </ul>
          </section>

          {/* SUMMARY / NEXT */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
              <FiCode className="text-base" />
              Summary & next steps
            </h2>
            <ul className="list-disc pl-5 text-[13px] text-emerald-50 space-y-1">
              <li>
                Use <code>read</code> (with options) to get interactive input
                from users.
              </li>
              <li>
                Use <code>$1</code>, <code>$#</code>, <code>$@</code> to work
                with command line arguments.
              </li>
              <li>
                Write scripts that validate input and print clear usage
                messages.
              </li>
              <li>
                Combine arguments + read to support both automation and
                interactive use.
              </li>
            </ul>
            <p className="mt-1 text-[12px] text-emerald-200">
              Next we&apos;ll move to{" "}
              <strong>arithmetic & expressions</strong> – doing calculations in
              shell scripts using <code>$(( ))</code>, <code>expr</code> and{" "}
              <code>bc</code>.
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
