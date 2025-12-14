// pages/course/shell-scripting/variables-and-quoting.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiSliders,
  FiType,
  FiShield,
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

export default function VariablesAndQuotingPage() {
  const lesson =
    shellLessons.find((l) => l.slug === "variables-and-quoting") || {};

  return (
    <>
      <Head>
        <title>
          {(lesson.title || "Variables, Environment & Quoting") +
            " | Shell Scripting Course | InfoUnix"}
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to use shell variables, environment variables, and correct quoting (single, double, unquoted) with real-world safe patterns."
          }
        />
      </Head>

      <ShellLayout activeSlug="variables-and-quoting">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Shell Scripting · Lesson 4
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            Variables, Environment & Quoting
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            This is one of the most important lessons. If you understand
            variables and quoting properly, 80% of common shell bugs disappear.
            We’ll cover local vs environment variables, special parameters, and
            how quoting changes the behaviour of commands.
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
                title={lesson.title || "Variables, Environment & Quoting"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your variables lesson video URL in{" "}
              <code>shellLessons.js</code> (slug:{" "}
              <code>variables-and-quoting</code>).
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
                icon={<FiSliders className="text-lg" />}
                title="Variables"
                text="Store values such as strings, paths, numbers and reuse them in commands and scripts."
              />
              <FeatureCard
                icon={<FiShield className="text-lg" />}
                title="Environment"
                text="Make variables available to child processes (export). Used for PATH, LANG, etc."
              />
              <FeatureCard
                icon={<FiType className="text-lg" />}
                title="Quoting"
                text="Control how the shell interprets spaces, wildcards and variable expansions."
              />
            </div>

            <BulletCard
              heading="After this lesson you should know"
              points={[
                "How to create and use shell variables safely.",
                "Difference between normal variables and environment variables.",
                "When to use unquoted, single-quoted and double-quoted strings.",
              ]}
            />
          </section>

          {/* BASIC VARIABLES */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Shell variables – basics
            </h2>

            <p>
              A variable is just a name with a value. In shell, you assign using{" "}
              <code>NAME=value</code> (no spaces around <code>=</code>) and use
              it with <code>$NAME</code>.
            </p>

            <TerminalOutput
              title="Creating and using variables"
              contextLabel="shell-vars"
              maxHeight="20rem"
              content={`# Correct assignments (no spaces around =)
NAME="John"
AGE=30
CITY=Bangalore
SHELL_NAME=bash

echo "User  : $NAME"
echo "Age   : $AGE"
echo "City  : $CITY"
echo "Shell : $SHELL_NAME"

# Wrong - will NOT work:
# NAME = "John"   # spaces are not allowed`}
            />

            <BulletCard
              heading="Variable naming rules (good practice)"
              points={[
                "Use letters, numbers and underscore; start with a letter or underscore.",
                "By convention, all-uppercase for environment variables (PATH, HOME), mixed/lowercase for local script variables.",
                "Avoid naming variables with common command names (ls, test, echo).",
              ]}
            />
          </section>

          {/* LOCAL vs ENVIRONMENT VARIABLES */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Local vs environment variables
            </h2>

            <p>
              When you assign <code>VAR=value</code> in a shell, by default it
              is only known to that shell. To pass it to child processes (like
              scripts or commands you run), you need to <strong>export</strong>{" "}
              it.
            </p>

            <TerminalOutput
              title="Local vs environment variable"
              contextLabel="shell-vars"
              maxHeight="24rem"
              content={`# In your shell
MYVAR="hello"

# See it
echo "$MYVAR"

# But a new shell may not see it:
bash -c 'echo "Child sees: $MYVAR"'
# Output: Child sees:

# Now export it
export MYVAR

# Try again
bash -c 'echo "Child sees: $MYVAR"'
# Output: Child sees: hello`}
            />

            <BulletCard
              heading="When to export"
              points={[
                "Export only variables that child programs really need (e.g. PATH, LANG, APP_ENV).",
                "Keep script-internal working variables as normal (non-exported) variables.",
                "Too many exported variables can clutter the environment and cause confusion.",
              ]}
            />
          </section>

          {/* SPECIAL PARAMETERS (BRIEF) */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Special shell parameters (brief overview)
            </h2>

            <p>
              Shell provides some special variables (we&apos;ll use them more in
              arguments & functions lessons):
            </p>

            <ul className="list-disc pl-5 text-xs text-slate-200 space-y-1">
              <li>
                <code>$0</code> – name of the script.
              </li>
              <li>
                <code>$1, $2, ...</code> – first, second, ... command line
                arguments.
              </li>
              <li>
                <code>$#</code> – number of arguments.
              </li>
              <li>
                <code>$@</code> – all arguments as a list (each quoted
                separately when used as &quot;$@&quot;).
              </li>
              <li>
                <code>$?</code> – exit status of last command.
              </li>
            </ul>

            <TerminalOutput
              title="Simple demonstration of $0, $1, $#, $@"
              contextLabel="shell-vars"
              maxHeight="22rem"
              content={`#!/bin/bash
# save as show_args.sh

echo "Script name : $0"
echo "Arg count   : $#"
echo "First arg   : $1"
echo "All args    : $@"

# Usage:
#   chmod +x show_args.sh
#   ./show_args.sh one two three

# Example output:
# Script name : ./show_args.sh
# Arg count   : 3
# First arg   : one
# All args    : one two three`}
            />
          </section>

          {/* QUOTING BASICS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Quoting basics – unquoted, single, double
            </h2>

            <p>
              Quoting controls how the shell treats spaces, wildcards and
              variables.
            </p>

            <BulletCard
              heading="Three main styles"
              points={[
                'Unquoted: shell expands variables, *, ?, and splits on spaces.',
                "Single quotes 'text' – everything is literal, no variable/command expansion.",
                'Double quotes "text" – variables & command substitutions are expanded, but spaces and most special characters are preserved.',
              ]}
            />

            <TerminalOutput
              title="Unquoted vs single vs double quotes"
              contextLabel="shell-quote"
              maxHeight="26rem"
              content={`NAME="Unix Admin"

echo Hello $NAME
# Hello Unix Admin   (words split on spaces)

echo "Hello $NAME"
# Hello Unix Admin   (same here, but whole string treated as one argument)

echo 'Hello $NAME'
# Hello $NAME        (no variable expansion in single quotes)

# Wildcard example (assume *.log files exist)
echo *.log
# might print: app.log sys.log ...

echo "*.log"
# prints: *.log  (wildcard is not expanded)`}
            />

            <p className="text-xs text-slate-400">
              Rule of thumb: in scripts, you almost always want to put variables
              in <strong>double quotes</strong>, e.g. <code>"$VAR"</code>.
            </p>
          </section>

          {/* REAL-WORLD EXAMPLE: SPACES IN PATHS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Real-world example: paths with spaces (and how quoting saves you)
            </h2>

            <p>
              Imagine a directory named <code>/backup/May Reports</code>. Without
              quotes, the shell sees it as two separate words.
            </p>

            <TerminalOutput
              title="Incorrect vs correct handling of spaces"
              contextLabel="shell-quote"
              maxHeight="22rem"
              content={`BACKUP_DIR="/backup/May Reports"

# Wrong - will fail
cd $BACKUP_DIR
# Shell interprets as: cd /backup/May Reports

# Correct - always quote variables
cd "$BACKUP_DIR"

# Another safe example
cp "$BACKUP_DIR/report1.txt" /tmp/`}
            />

            <p className="text-xs text-slate-400">
              In production, missing quotes around paths is a very common cause
              of mysterious script failures.
            </p>
          </section>

          {/* COMMAND SUBSTITUTION AND QUOTING */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Command substitution with proper quoting
            </h2>

            <p>
              Command substitution means: run a command and use its output in a
              variable or another command. Preferred syntax is{" "}
              <code>$(command)</code>.
            </p>

            <TerminalOutput
              title="Command substitution"
              contextLabel="shell-quote"
              maxHeight="20rem"
              content={`NOW=$(date)
HOSTNAME=$(hostname)
KERNEL=$(uname -r)

echo "Time   : $NOW"
echo "Host   : $HOSTNAME"
echo "Kernel : $KERNEL"

# Old style (backticks) - works but harder to read and nest:
# NOW=\`date\``}
            />

            <p className="text-xs text-slate-400">
              Always wrap expansions in quotes if the output may contain spaces:
              <code>"$NOW"</code>, <code>"$KERNEL"</code>, etc.
            </p>
          </section>

          {/* SAFE PATTERN: ALWAYS QUOTE VARIABLES */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Safe pattern: always quote variables in scripts
            </h2>

            <p>
              A classic safe habit: whenever you use a variable, write it as{" "}
              <code>"$VAR"</code> unless you really want word-splitting/globbing
              to happen.
            </p>

            <TerminalOutput
              title="Safe vs unsafe variable usage"
              contextLabel="shell-quote"
              maxHeight="26rem"
              content={`FILE="/tmp/some file.txt"

# Unsafe - may break if FILE has spaces or wildcards
rm $FILE

# Safe
rm "$FILE"

# Unsafe: word splitting if NAME has spaces
NAME="Unix Admin"
echo Hello $NAME

# Safe: whole thing as one argument to echo
echo "Hello $NAME"

# Unsafe: for loops over ls output (don't do this)
# for f in $(ls *.log); do ...

# Safer: use glob directly
for f in *.log; do
  echo "Found log file: $f"
done`}
            />
          </section>

          {/* SMALL EXAMPLE SCRIPT USING VARIABLES & QUOTING */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Practical example: simple backup script with variables & quoting
            </h2>

            <TerminalOutput
  title="backup_home.sh"
  contextLabel="shell-quote"
  maxHeight="30rem"
  content={`#!/bin/bash
# backup_home.sh - simple tar backup of a user's home directory

USER_NAME="john"
SRC_DIR="/home/$USER_NAME"
BACKUP_ROOT="/var/backups"
DATE_STR=$(date +%F)
BACKUP_FILE="$BACKUP_ROOT/\${USER_NAME}_home_\${DATE_STR}.tar.gz"

echo "Source directory : $SRC_DIR"
echo "Backup directory : $BACKUP_ROOT"
echo "Backup file      : $BACKUP_FILE"
echo

# Ensure backup root exists
if [ ! -d "$BACKUP_ROOT" ]; then
  echo "Creating backup directory: $BACKUP_ROOT"
  mkdir -p "$BACKUP_ROOT" || {
    echo "ERROR: Failed to create $BACKUP_ROOT"
    exit 1
  }
fi

echo "Starting backup..."
tar czf "$BACKUP_FILE" "$SRC_DIR"

if [ $? -eq 0 ]; then
  echo "Backup completed successfully."
else
  echo "ERROR: backup failed!"
fi`}
/>


            <p className="text-xs text-slate-400">
              This script uses variables for source, destination and filename,
              uses quoting everywhere, and checks for directory existence and
              tar exit status. We&apos;ll improve this later with logging and
              argument handling.
            </p>
          </section>

          {/* QUOTING WARNINGS */}
          <section className="space-y-3 rounded-2xl border border-yellow-500/60 bg-yellow-500/10 p-4 shadow-lg shadow-yellow-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-yellow-100">
              <FiAlertTriangle className="text-base" />
              Common mistakes with variables & quoting
            </h2>
            <ul className="list-disc pl-5 text-[13px] text-yellow-50 space-y-1">
              <li>Using NAME = value (with spaces) instead of NAME=value.</li>
              <li>Forgetting to quote variables: rm $FILE, cd $DIR, etc.</li>
              <li>Mixing single and double quotes incorrectly, causing variables not to expand.</li>
              <li>Relying on the current directory instead of using full paths with variables.</li>
            </ul>
          </section>

          {/* SUMMARY / NEXT */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
              <FiCode className="text-base" />
              Summary & what&apos;s next
            </h2>
            <ul className="list-disc pl-5 text-[13px] text-emerald-50 space-y-1">
              <li>Create and use shell variables with correct syntax.</li>
              <li>Understand when to export variables and when not to.</li>
              <li>Use the right quoting style (almost always double quotes for variables).</li>
              <li>Write small scripts that handle paths and strings safely.</li>
            </ul>
            <p className="mt-1 text-[12px] text-emerald-200">
              Next, we&apos;ll work on{" "}
              <strong>reading input & command-line arguments</strong> so your
              scripts can take parameters and interact with users.
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
