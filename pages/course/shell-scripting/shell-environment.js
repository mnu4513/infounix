// pages/course/shell-scripting/shell-environment-and-editors.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiUser, FiSettings, FiTerminal, FiEdit3, FiFileText } from "react-icons/fi";

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

export default function ShellEnvironmentAndEditorsPage() {
  const lesson =
    shellLessons.find((l) => l.slug === "shell-environment-and-editors") || {};

  return (
    <>
      <Head>
        <title>
          {(lesson.title || "Shell Environment & Editors") +
            " | Shell Scripting Course | InfoUnix"}
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Understand login vs non-login and interactive vs non-interactive shells, environment variables like PATH and HOME, and editors used to write shell scripts."
          }
        />
      </Head>

      <ShellLayout activeSlug="shell-environment-and-editors">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Shell Scripting · Lesson 2
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            Shell Environment & Editors
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Before writing serious scripts, you need to understand the shell
            environment: which shell you are using, how login vs non-login
            shells behave, which files configure your environment, and which
            editors you can use to write scripts comfortably.
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
                title={lesson.title || "Shell Environment & Editors"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your environment lesson video URL in{" "}
              <code>shellLessons.js</code> (slug:{" "}
              <code>shell-environment-and-editors</code>).
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
          {/* WHAT IS ENVIRONMENT */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              What is a shell environment?
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiUser className="text-lg" />}
                title="User context"
                text="User name, home directory, default shell and permissions – who you are on the system."
              />
              <FeatureCard
                icon={<FiSettings className="text-lg" />}
                title="Environment variables"
                text="Values like PATH, HOME, LANG, EDITOR that control how programs behave."
              />
              <FeatureCard
                icon={<FiTerminal className="text-lg" />}
                title="Shell session"
                text="A running shell process with its own variables, functions, aliases and prompt."
              />
            </div>

            <p>
              When you log in to a server and open a terminal, you are not
              starting from zero: there is already a full environment prepared
              for you. As a shell scripter, you must know what that environment
              contains and how to adjust it safely.
            </p>

            <TerminalOutput
              title="Inspecting your current shell and environment"
              contextLabel="shell-env"
              maxHeight="16rem"
              content={`# Which shell am I using?
echo $SHELL

# What is the current shell process name?
echo $0

# Show user name and home directory
echo "User : $USER"
echo "Home : $HOME"

# Show the PATH (where commands are searched)
echo "PATH : $PATH"

# Print all environment variables
printenv | less   # or: env`}
            />
          </section>

          {/* LOGIN vs NON-LOGIN / INTERACTIVE vs NON-INTERACTIVE */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Login vs non-login · Interactive vs non-interactive shells
            </h2>

            <BulletCard
              heading="Login shell"
              points={[
                "Started when you log in via console, SSH, or display manager.",
                "Reads system and user startup files (e.g. /etc/profile, ~/.profile, ~/.bash_profile).",
                "Good place to set PATH, aliases, environment variables.",
              ]}
            />

            <BulletCard
              heading="Non-login shell"
              points={[
                "Started from inside another shell (e.g. running `bash` again).",
                "Often reads ~/.bashrc instead of ~/.bash_profile.",
                "Used for subshells, terminals started from inside GUIs, etc.",
              ]}
            />

            <BulletCard
              heading="Interactive vs non-interactive"
              points={[
                "Interactive shell: connected to a terminal, shows a prompt, waits for commands.",
                "Non-interactive shell: runs a script and exits, no prompt.",
                "Most scripts run under non-interactive shell, so environment must not depend on manual input.",
              ]}
            />

            <p className="text-xs text-slate-400">
              Interview-style line:{" "}
              <span className="text-slate-200">
                “Login shells read login startup files; interactive shells
                display a prompt and wait for commands; non-interactive shells
                just execute scripts. A shell can be both login+interactive, or
                non-login+interactive, etc.”
              </span>
            </p>
          </section>

          {/* STARTUP FILES */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Important startup files (.profile, .bash_profile, .bashrc)
            </h2>

            <p>
              Exact files depend on OS and shell, but in many Linux setups using{" "}
              <code>bash</code>:
            </p>

            <ul className="list-disc space-y-1 pl-5 text-xs text-slate-200">
              <li>
                <code>/etc/profile</code> – system-wide defaults for login
                shells.
              </li>
              <li>
                <code>~/.profile</code> or <code>~/.bash_profile</code> – user
                login shell settings.
              </li>
              <li>
                <code>~/.bashrc</code> – executed for interactive non-login bash
                shells (e.g. new terminal tabs).
              </li>
            </ul>

            <TerminalOutput
              title="Example: a simple ~/.bash_profile"
              contextLabel="shell-env"
              maxHeight="22rem"
              content={`# ~/.bash_profile - user login shell configuration

# Source global definitions
if [ -f /etc/profile ]; then
  . /etc/profile
fi

# Source user's bashrc if exists
if [ -f "$HOME/.bashrc" ]; then
  . "$HOME/.bashrc"
fi

# Set PATH (prepend user's bin/scripts)
export PATH="$HOME/bin:$HOME/scripts:$PATH"

# Set default editor
export EDITOR=vim

# Custom prompt (simple example)
PS1="\\u@\\h:\\w$ "`}
            />

            <p className="text-xs text-slate-400">
              Common pattern: keep environment variables in{" "}
              <code>~/.profile</code> / <code>~/.bash_profile</code>, and keep
              interactive-only settings (aliases, fancy prompt) in{" "}
              <code>~/.bashrc</code>.
            </p>
          </section>

          {/* ENV VARS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Key environment variables for shell scripters
            </h2>

            <BulletCard
              heading="Variables you will see everywhere"
              points={[
                "PATH – list of directories searched for commands.",
                "HOME – your home directory.",
                "SHELL – your default login shell.",
                "USER / LOGNAME – your login name.",
                "PWD – current working directory.",
                "EDITOR / VISUAL – preferred text editor.",
                "LANG / LC_* – locale and language settings.",
              ]}
            />

            <TerminalOutput
              title="Viewing and changing environment variables"
              contextLabel="shell-env"
              maxHeight="20rem"
              content={`# View some important variables
echo "SHELL : $SHELL"
echo "HOME  : $HOME"
echo "USER  : $USER"
echo "PATH  : $PATH"

# Temporarily modify PATH for current session
export PATH="/opt/mytools/bin:$PATH"

# Confirm a command is found
which mytool

# To make it persistent, add the export line into ~/.bash_profile or ~/.profile.`}
            />
          </section>

          {/* EDITORS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Choosing an editor for shell scripting
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiEdit3 className="text-lg" />}
                title="vi / vim"
                text="Available almost everywhere on Unix systems. Essential for real server work over SSH."
              />
              <FeatureCard
                icon={<FiTerminal className="text-lg" />}
                title="nano"
                text="Beginner-friendly terminal editor; good if available on the server."
              />
              <FeatureCard
                icon={<FiFileText className="text-lg" />}
                title="GUI/IDE editors"
                text="VS Code, Sublime, etc. Great locally; then copy scripts to servers via scp or git."
              />
            </div>

            <TerminalOutput
              title="Creating a script with different editors"
              contextLabel="shell-env"
              maxHeight="16rem"
              content={`# Using vi / vim
vi myscript.sh

# Using nano
nano myscript.sh

# Inside the editor, for example:
#   #!/bin/bash
#   echo "Hello from myscript.sh"`}
            />

            <p className="text-xs text-slate-400">
              For production work, being comfortable with <code>vi</code> or{" "}
              <code>vim</code> is almost mandatory, because many hardened
              servers only have SSH + vi.
            </p>
          </section>

          {/* PRACTICAL EXAMPLE – CUSTOM PATH & PROMPT */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Practical example: custom PATH & prompt for admins
            </h2>

            <p>
              Let’s configure a directory for your scripts and a more useful
              prompt that clearly shows user, host and path.
            </p>

            <TerminalOutput
              title="Customising PATH and prompt in ~/.bashrc"
              contextLabel="shell-env"
              maxHeight="24rem"
              content={`# In ~/.bashrc (example)

# Add ~/scripts to PATH if it exists and is not already there
if [ -d "$HOME/scripts" ]; then
  case ":$PATH:" in
    *":$HOME/scripts:"*) ;;  # already there
    *) export PATH="$HOME/scripts:$PATH" ;;
  esac
fi

# Colourful prompt showing user@host:cwd$
PS1="\\[\\e[1;32m\\]\\u@\\h\\[\\e[0m\\]:\\[\\e[1;34m\\]\\w\\[\\e[0m\\]$ "`}
            />

            <p className="text-xs text-slate-400">
              Real-life benefit:{" "}
              <span className="text-slate-200">
                “With a clear prompt and a dedicated scripts directory in PATH,
                you immediately see which server you’re on and can run your
                helper scripts from anywhere.”
              </span>
            </p>
          </section>

          {/* SUMMARY */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="text-sm font-semibold text-emerald-200">
              After this lesson you should be able to:
            </h2>
            <ul className="list-disc pl-5 text-[13px] text-emerald-50 space-y-1">
              <li>Explain login vs non-login and interactive vs non-interactive shells.</li>
              <li>Identify which startup files configure your shell.</li>
              <li>View and modify important environment variables like PATH and HOME.</li>
              <li>Create and edit scripts using vi/vim or nano.</li>
            </ul>
            <p className="mt-1 text-[12px] text-emerald-200">
              Next lesson: we’ll move to{" "}
              <strong>basic shell commands & running scripts</strong>, then
              dive into variables, quoting, and user input – the real building
              blocks of automation.
            </p>
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
