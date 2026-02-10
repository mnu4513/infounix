// pages/course/shell-scripting/introduction-to-shell-scripting.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiTerminal, FiZap, FiFileText } from "react-icons/fi";

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
    transition: { delay, duration: 0.4, ease: "easeOut" },
  },
});

export default function IntroductionToShellScriptingPage() {
  const lesson =
    ShellLessons.find(
      (l) => l.slug === "introduction-to-shell-scripting"
    ) || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Introduction to Shell Scripting"} | Shell Scripting
          Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Understand what a shell is, what shell scripting means, why we use it in real environments, and how to run your very first script safely."
          }
        />
      </Head>

      <ShellLayout activeSlug="introduction-to-shell-scripting">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Shell Scripting · Lesson 1
          </p>

          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            Introduction to Shell Scripting
          </h1>

          <p className="mt-2 max-w-3xl text-sm dark:text-slate-300">
            Shell scripting is one of the most powerful tools for Unix/Linux
            admins and DevOps engineers. In this lesson, we’ll see what a shell
            is, what a shell script actually does, why you should use it, and
            how to run your very first script safely.
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
                title={lesson.title || "Introduction to Shell Scripting"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your shell scripting intro video URL in{" "}
              <code>ShellLessons.js</code>.
            </div>
          )}
        </motion.div>

        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed dark:text-slate-200"
        >
          {/* WHAT & WHY */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is a shell? What is a shell script?
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiTerminal className="text-lg" />}
                title="Shell"
                text="A program that takes your commands and asks the OS to execute them. Examples: bash, sh, ksh, zsh."
              />
              <FeatureCard
                icon={<FiFileText className="text-lg" />}
                title="Shell script"
                text="A plain text file containing a list of shell commands, executed in sequence by the shell."
              />
              <FeatureCard
                icon={<FiZap className="text-lg" />}
                title="Automation"
                text="Instead of typing commands again and again, you automate them with logic, loops, conditions and functions."
              />
            </div>

            <p>
              In simple terms: when you type commands at the terminal, you are
              already scripting manually. A shell script is just you saving
              those commands into a file, adding logic, and running them again
              and again in a repeatable way.
            </p>

            <BulletCard
              heading="Why shell scripting is important in real life"
              points={[
                "Daily admin tasks: backups, log cleanup, user management.",
                "Monitoring and alerts: check disk usage, services, processes.",
                "Automation glue: connect different tools/commands into one workflow.",
                "Repeatable tasks: same script can run on many servers with small changes.",
              ]}
            />
          </section>

          {/* HOW SHELL EXECUTES COMMANDS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              How does the shell execute commands?
            </h2>
            <p>
              When you type a command like <code>ls /var/log</code>, the shell:
            </p>

            <ol className="list-decimal space-y-1 pl-5 text-xs dark:text-slate-200">
              <li>Reads your input line.</li>
              <li>Splits it into command (<code>ls</code>) and arguments.</li>
              <li>Searches for the command in your <code>PATH</code>.</li>
              <li>Starts the program and passes arguments to it.</li>
              <li>
                Waits for it to finish and receives an{" "}
                <strong>exit status</strong> (0 = success, non-zero = some
                error).
              </li>
            </ol>

            <TerminalOutput
              title="Example: shell resolving and running a command"
              contextLabel="shell-intro"
              maxHeight="14rem"
              content={`# Print current shell
echo $SHELL

# Show where 'ls' comes from
which ls

# A simple command
ls /var/log

# Check last command exit status
echo $?   # 0 means success`}
            />

            <p className="text-xs dark:text-slate-400">
              In scripts, you will use the exit status <code>$?</code> a lot to
              decide if previous command succeeded or failed.
            </p>
          </section>

          {/* FIRST SCRIPT */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Writing your first shell script (safely)
            </h2>

            <p>
              A shell script is just a text file. We usually start with a{" "}
              <strong>shebang</strong> line that tells which shell should
              execute the file.
            </p>

            <TerminalOutput
              title="first_script.sh"
              contextLabel="shell-intro"
              maxHeight="22rem"
              content={`#!/bin/bash
# My first shell script

echo "Hello from shell script!"
echo "Today is: $(date)"
echo "You are logged in as: $USER"
echo "Your current directory is: $(pwd)"`}
            />

            <p className="text-xs dark:text-slate-400">
              Explanation:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-xs dark:text-slate-200">
              <li>
                <code>#!/bin/bash</code> – shebang; tells the OS to use{" "}
                <code>/bin/bash</code> to run this file.
              </li>
              <li>
                Lines starting with <code>#</code> (except shebang) are comments
                and ignored by the shell.
              </li>
              <li>
                <code>$(date)</code> and <code>$(pwd)</code> are{" "}
                <strong>command substitutions</strong>: run the command and
                insert its output there.
              </li>
            </ul>

            <h3 className="mt-2 text-sm font-semibold dark:text-slate-100">
              Making the script executable and running it
            </h3>

            <TerminalOutput
              title="Running the first script"
              contextLabel="shell-intro"
              maxHeight="18rem"
              content={`# 1. Create the file
nano first_script.sh        # or vi / vim / any editor
# (paste script content and save)

# 2. Make it executable
chmod +x first_script.sh

# 3. Run it explicitly with ./ (from current directory)
./first_script.sh

# Or call with bash without +x
bash first_script.sh`}
            />

            <p className="text-xs dark:text-slate-400">
              Real-life practice: always start with harmless scripts like echo,
              date, pwd, whoami. Never start learning by writing scripts that
              delete or move files.
            </p>
          </section>

          {/* WHERE TO STORE SCRIPTS / PERMISSIONS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Where to keep scripts & basic permissions
            </h2>

            <BulletCard
              heading="Good habits from day one"
              points={[
                "Create a dedicated directory for your personal scripts, like ~/scripts or ~/bin.",
                "Always use meaningful file names: backup_home.sh, user_cleanup.sh, etc.",
                "Use executable permissions carefully (chmod +x) – not every file needs 777.",
              ]}
            />

            <TerminalOutput
              title="Organising your scripts"
              contextLabel="shell-intro"
              maxHeight="18rem"
              content={`# Create a directory for your scripts
mkdir -p ~/scripts

# Move your script there
mv first_script.sh ~/scripts/

# Optional: add ~/scripts to PATH in ~/.bash_profile or ~/.profile
echo 'export PATH="$HOME/scripts:$PATH"' >> ~/.bash_profile

# Reload profile (or logout/login)
source ~/.bash_profile

# Now you can run script from anywhere
first_script.sh`}
            />

            <p className="text-xs dark:text-slate-400">
              Real-life example:{" "}
              <span className="dark:text-slate-200">
                “In admin environments, we keep custom scripts under a common
                path like <code>/opt/scripts</code> or{" "}
                <code>/usr/local/sbin</code> with version control. For personal
                practice, <code>~/scripts</code> or <code>~/bin</code> is
                perfect.”
              </span>
            </p>
          </section>

          {/* REAL USE CASE EXAMPLES */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practical use cases even for beginners
            </h2>

            <p>
              Let’s look at a small but real script you might write as a junior
              admin: checking disk usage and warning when it crosses a limit.
            </p>

    <TerminalOutput
  title="Simple disk usage check script"
  contextLabel="shell-intro"
  maxHeight="24rem"
  content={`#!/bin/bash
# check_disk.sh - warn if any filesystem crosses 80% usage

THRESHOLD=80

echo "Checking disk usage... (threshold: \${THRESHOLD}%)"
echo

# Use df -hP to get a consistent format (POSIX)
df -hP | awk 'NR>1 {print $5 " " $6}' | while read use mount; do
  # Strip the % sign
  PERCENT=\${use%%%}

  if [ "\$PERCENT" -ge "\$THRESHOLD" ]; then
    echo "WARNING: Filesystem \$mount is at \${PERCENT}% usage"
  else
    echo "OK     : Filesystem \$mount is at \${PERCENT}% usage"
  fi
done`}
/>


            <ul className="list-disc space-y-1 pl-5 text-xs dark:text-slate-200">
              <li>
                This is already useful in real environments, and you wrote it
                with only basic shell features.
              </li>
              <li>
                Later in the course, we’ll upgrade this script: add logging,
                email alerts, and schedule it via <code>cron</code>.
              </li>
            </ul>
          </section>

          {/* NEXT STEPS */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What you should be comfortable with after this lesson
            </h2>
            <ul className="list-disc pl-5 text-[13px] dark:text-emerald-50 space-y-1">
              <li>Explain what a shell and a shell script are.</li>
              <li>
                Create, save and run a simple script using{" "}
                <code>chmod +x</code> and <code>./script.sh</code>.
              </li>
              <li>
                Understand shebang (<code>#!/bin/bash</code>) and comments.
              </li>
              <li>Know where to keep your scripts and how to add to PATH.</li>
            </ul>
            <p className="mt-1 text-[12px] text-emerald-600">
              In the next lessons, we’ll dive into variables, quoting, user
              input, conditions and loops so you can build powerful real-world
              automation.
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
