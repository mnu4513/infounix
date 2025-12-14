// pages/course/shell-scripting/basic-shell-commands-and-execution.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiTerminal,
  FiFolder,
  FiPlayCircle,
  FiAlertTriangle,
  FiFile,
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

export default function BasicShellCommandsAndExecutionPage() {
  const lesson =
    shellLessons.find(
      (l) => l.slug === "basic-shell-commands-and-execution"
    ) || {};

  return (
    <>
      <Head>
        <title>
          {(lesson.title || "Basic Commands & Running Scripts") +
            " | Shell Scripting Course | InfoUnix"}
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn basic shell commands, paths, exit codes, and different ways to execute shell scripts safely and correctly."
          }
        />
      </Head>

      <ShellLayout activeSlug="basic-shell-commands-and-execution">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Shell Scripting · Lesson 3
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            Basic Commands & Running Scripts
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Shell scripting is built on top of normal shell commands. In this
            lesson you’ll learn essential file/directory commands, paths, exit
            codes, and all the correct ways to run a shell script in real
            environments.
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
                title={lesson.title || "Basic Commands & Running Scripts"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your lesson video URL in{" "}
              <code>shellLessons.js</code> (slug:{" "}
              <code>basic-shell-commands-and-execution</code>).
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
              Core ideas for this lesson
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiFolder className="text-lg" />}
                title="Navigate the filesystem"
                text="Use pwd, ls, cd, mkdir, rm, cp, mv to move around and manage files/directories."
              />
              <FeatureCard
                icon={<FiFile className="text-lg" />}
                title="Understand paths"
                text="Difference between absolute and relative paths – critical for predictable scripts."
              />
              <FeatureCard
                icon={<FiPlayCircle className="text-lg" />}
                title="Execute scripts correctly"
                text="bash script.sh, ./script.sh, PATH usage, permissions, and exit codes."
              />
            </div>

            <BulletCard
              heading="Goal of this lesson"
              points={[
                "Become comfortable with basic day-to-day commands.",
                "Understand how the shell finds commands (PATH, current directory).",
                "Learn the safe and standard ways to run scripts.",
              ]}
            />
          </section>

          {/* BASIC COMMANDS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Essential file & directory commands
            </h2>

            <p>
              These are the commands you will use in almost every shell script.
              Practice them manually first until they feel natural.
            </p>

            <TerminalOutput
              title="Navigation and listing"
              contextLabel="shell-basic"
              maxHeight="18rem"
              content={`# Show current directory (Print Working Directory)
pwd

# List files (detailed)
ls -l

# List also hidden files (starting with .)
ls -la

# Change directory
cd /var/log

# Go back to home directory
cd           # or: cd ~
`}
            />

            <TerminalOutput
              title="Creating, copying, moving and deleting"
              contextLabel="shell-basic"
              maxHeight="22rem"
              content={`# Create a directory
mkdir projects

# Create nested directories
mkdir -p logs/2025/january

# Copy a file
cp file1.txt file1_backup.txt

# Copy a directory recursively
cp -r dir1 dir1_backup

# Move / rename a file
mv oldname.sh newname.sh

# Remove a file
rm unwanted.log

# Remove a directory (recursively, careful!)
rm -r old_directory

# Very dangerous: rm -rf /   (never do this)`}
            />

            <p className="text-xs text-slate-400">
              In scripts, you should always be extra careful with{" "}
              <code>rm</code> and <code>mv</code>. We’ll later add checks using
              test conditions before deleting anything.
            </p>
          </section>

          {/* ABSOLUTE vs RELATIVE PATHS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Absolute vs relative paths (very important for scripts)
            </h2>

            <BulletCard
              heading="Absolute path"
              points={[
                "Starts from root / and is valid from anywhere.",
                "Example: /var/log/messages, /opt/scripts/backup.sh",
                "More reliable inside scripts, less dependent on where you run from.",
              ]}
            />

            <BulletCard
              heading="Relative path"
              points={[
                "Relative to your current directory.",
                "Example: logs/today.log, ../config/app.conf",
                "Shorter to type, but can break if script is run from a different location.",
              ]}
            />

            <TerminalOutput
              title="Absolute vs relative example"
              contextLabel="shell-basic"
              maxHeight="18rem"
              content={`# Suppose your current directory is /home/john

# Absolute path:
cd /var/log
tail -n 20 /var/log/messages

# Relative path:
cd /home/john/projects
ls logs/today.log       # relative to /home/john/projects

# Go one level up
cd ..
pwd                     # /home/john`}
            />

            <p className="text-xs text-slate-400">
              Good scripting habit: use absolute paths for critical operations
              (backups, log deletion, configs) or compute absolute paths inside
              the script.
            </p>
          </section>

          {/* HOW SHELL FINDS COMMANDS (PATH) */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              How the shell finds commands (PATH & current directory)
            </h2>

            <p>
              When you type <code>ls</code>, the shell does not search the
              whole disk. It only searches directories listed in <code>PATH</code>.
            </p>

            <TerminalOutput
              title="Checking PATH and command location"
              contextLabel="shell-basic"
              maxHeight="18rem"
              content={`# Show PATH
echo "$PATH"

# Where does 'ls' come from?
which ls

# Show first match and all matches
type -a ls`}
            />

            <p>
              For security reasons, the current directory <code>.</code> is{" "}
              <strong>usually not</strong> in PATH. That’s why you run{" "}
              <code>./script.sh</code> instead of just <code>script.sh</code>{" "}
              from the same folder.
            </p>
          </section>

          {/* RUNNING SCRIPTS – ALL METHODS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Different ways to run a shell script
            </h2>

            <p>
              There are a few valid ways to execute a script. You should know
              the difference because they affect which shell is used and how
              PATH is applied.
            </p>

            <TerminalOutput
              title="1) Using the shell explicitly"
              contextLabel="shell-basic"
              maxHeight="16rem"
              content={`# Run using bash, no execute bit required
bash myscript.sh

# Or use sh (POSIX shell, may differ from bash)
sh myscript.sh

# You can also provide full path
bash /home/john/scripts/myscript.sh`}
            />

            <p className="text-xs text-slate-400">
              This method ignores the shebang line and uses whichever shell you
              call (bash, sh, ksh…).
            </p>

            <TerminalOutput
              title="2) Make it executable and use ./script.sh"
              contextLabel="shell-basic"
              maxHeight="20rem"
              content={`# Add execute permission for the user
chmod +x myscript.sh

# List to verify
ls -l myscript.sh
# -rwxr-xr-x 1 john john 1234 Jan  1 12:34 myscript.sh

# Run it from the current directory
./myscript.sh

# Or with full absolute path
/home/john/scripts/myscript.sh`}
            />

            <p className="text-xs text-slate-400">
              In this method, the OS uses the shebang line (
              <code>#!/bin/bash</code>) to decide which interpreter to use.
            </p>

            <TerminalOutput
              title="3) Put script in PATH and run by name"
              contextLabel="shell-basic"
              maxHeight="22rem"
              content={`# Suppose you have ~/scripts in PATH (from previous lesson)
mv myscript.sh ~/scripts/myscript

# Ensure it's executable
chmod +x ~/scripts/myscript

# Now you can run it from anywhere:
myscript

# Shell finds it via PATH
which myscript`}
            />

            <p className="text-xs text-slate-400">
              This feels like a built-in command and is common for your personal
              admin utilities.
            </p>
          </section>

          {/* EXIT CODES & SIMPLE ERROR CHECKING */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Exit status (<code>$?</code>) and basic error handling
            </h2>

            <p>
              Every command returns an exit status: 0 for success, non-zero for
              some kind of failure. In scripts, you use this to decide what to
              do next.
            </p>

            <TerminalOutput
              title="Checking exit status ($?)"
              contextLabel="shell-basic"
              maxHeight="18rem"
              content={`# Successful command
ls /tmp
echo "Exit status: $?"

# Failing command (directory does not exist)
ls /this/does/not/exist
echo "Exit status: $?"`}
            />

            <TerminalOutput
              title="Using exit status in a simple script"
              contextLabel="shell-basic"
              maxHeight="24rem"
              content={`#!/bin/bash
# check_directory.sh - verify directory exists before using it

DIR="/var/log"

echo "Checking directory: $DIR"

if [ -d "$DIR" ]; then
  echo "Directory exists. Listing files:"
  ls -l "$DIR"
  echo "Script completed successfully."
  exit 0    # success
else
  echo "ERROR: Directory $DIR does not exist!"
  exit 1    # non-zero means error
fi`}
            />

            <p className="text-xs text-slate-400">
              Later we’ll expand this pattern with <code>if</code>,{" "}
              <code>case</code> and <code>functions</code> for full error
              handling logic.
            </p>
          </section>

          {/* SAFETY & BEST PRACTICES */}
          <section className="space-y-3 rounded-2xl border border-yellow-500/60 bg-yellow-500/10 p-4 shadow-lg shadow-yellow-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-yellow-100">
              <FiAlertTriangle className="text-base" />
              Safety tips when running scripts
            </h2>
            <ul className="list-disc pl-5 text-[13px] text-yellow-50 space-y-1">
              <li>Never blindly run scripts downloaded from internet on production servers.</li>
              <li>Always read the script once, especially around rm, mv, and destructive operations.</li>
              <li>Test new scripts in a lab or non-prod environment first.</li>
              <li>Use absolute paths in critical operations (backups, deletes).</li>
              <li>Log what your script is doing (later we’ll add logging section).</li>
            </ul>
          </section>

          {/* SUMMARY / NEXT */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="text-sm font-semibold text-emerald-200">
              After this lesson you should be able to:
            </h2>
            <ul className="list-disc pl-5 text-[13px] text-emerald-50 space-y-1">
              <li>Use basic file and directory commands confidently.</li>
              <li>Explain absolute vs relative paths and when to use which.</li>
              <li>Run scripts via <code>bash script.sh</code>, <code>./script.sh</code>, and via PATH.</li>
              <li>Check exit status using <code>$?</code> and use it in simple scripts.</li>
            </ul>
            <p className="mt-1 text-[12px] text-emerald-200">
              Next we’ll move to{" "}
              <strong>variables & quoting</strong> – how to store values, use
              environment variables properly, and avoid common quoting bugs in
              shell scripts.
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
