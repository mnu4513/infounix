// pages/course/solaris/vi-editor.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiEdit3,
  FiFileText,
  FiSearch,
  FiAlertTriangle,
  FiArrowRight,
} from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/solarisLessons";
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

/* ---------- Terminal snippets: focused vi flows ---------- */

const viSnippets = [
  {
    id: "open-quit",
    title: "Open a file and quit without saving",
    description:
      "Use vi filename to open a file. If you made a mistake, you can exit without saving using :q! from command mode.",
    content: `[root@solaris ~]# vi notes.txt

# (inside vi)
# Press ESC to ensure you are in command mode, then type:

:q!
# and press ENTER

[root@solaris ~]# 
# Back to shell, file unchanged.`,
  },
  {
    id: "insert-save",
    title: "Enter insert mode, type text and save",
    description:
      "The most basic workflow: open a file, enter insert mode with i, type, then save and quit with :wq.",
    content: `[root@solaris ~]# vi motd

# (inside vi, command mode)
# Press:    i
# You are now in INSERT mode, type your text:

Welcome to the Solaris training lab.
Please do not change system settings without permission.

# Press ESC to return to command mode
# Then type:

:wq
# and press ENTER to write and quit.

[root@solaris ~]# cat motd
Welcome to the Solaris training lab.
Please do not change system settings without permission.`,
  },
  {
    id: "navigation-search",
    title: "Move around and search inside a file",
    description:
      "Learn how to move between lines and search for specific strings using /pattern.",
    content: `[root@solaris ~]# vi /etc/ssh/sshd_config

# (inside vi, command mode)

G         # jump to last line
gg        # jump to first line
10G       # jump directly to line 10

/PermitRootLogin
           # search forward for the text 'PermitRootLogin'
n          # go to next match
N          # go to previous match

# After reviewing, you can quit with:
:q`,
  },
  {
    id: "edit-config-safely",
    title: "Edit a config file safely using a backup",
    description:
      "Always make a backup before editing important system files. Then use vi to make a small, controlled change.",
    content: `[root@solaris ~]# cd /etc
[root@solaris /etc]# cp sshd_config sshd_config.bak

[root@solaris /etc]# vi sshd_config

# (inside vi, command mode)
# Search for PermitRootLogin line:
/PermitRootLogin

# Change the line from:
# PermitRootLogin yes
# to:
# PermitRootLogin no

# Steps:
#   - Place cursor on 'yes'
#   - Press: cw
#   - Type:  no
#   - Press: ESC

:wq      # save and exit

[root@solaris /etc]# diff sshd_config.bak sshd_config
< PermitRootLogin yes
> PermitRootLogin no`,
  },
  {
    id: "undo-copy-paste",
    title: "Undo, copy and paste lines",
    description:
      "Use u to undo, yy to yank (copy) a line and p to paste it below the cursor.",
    content: `[root@solaris ~]# vi todo.txt

# (inside vi, command mode)

dd       # delete the current line
u        # undo the last change (line comes back)

yy       # yank (copy) current line
p        # paste it below

3yy      # yank 3 lines
p        # paste those 3 lines below

# When finished:
:wq`,
  },
];

export default function ViEditorPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "vi-editor") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "VI Editor"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to use the vi editor on Solaris: modes, navigation, searching, saving, and safe edits of configuration files."
          }
        />
      </Head>

      <SolarisLayout activeSlug="vi-editor">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 7
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#ff5b5b] md:text-3xl">
            {lesson.title || "VI Editor in Solaris"}
          </h1>
          {lesson.short && (
            <p className="mt-1 max-w-2xl text-sm text-slate-300">
              {lesson.short}
            </p>
          )}
          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
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
                title={lesson.title || "VI Editor in Solaris"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center text-xs text-slate-400">
              Add the YouTube embed URL for this lesson in{" "}
              <code className="mx-1 rounded bg-slate-900 px-1">
                components/solaris/solarisLessons.js
              </code>
              .
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
          {/* Overview */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Why vi is still important
            </h2>
            <p>
              On almost every Unix and Solaris system,{" "}
              <span className="font-semibold">vi is guaranteed to be present</span>.
              Even if you prefer other editors, knowing vi is essential when you
              connect to new servers or minimal installations.
            </p>
            <p>
              This lesson focuses on the{" "}
              <span className="font-semibold">
                20% of vi commands you use 80% of the time
              </span>{" "}
              as a system administrator: opening files, moving around, making
              small edits and saving safely.
            </p>
          </section>

          {/* Concept cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Key vi concepts to remember
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiEdit3 className="text-lg" />}
                title="Modes"
                text="vi mainly uses command mode and insert mode. Command mode is for navigation and operations; insert mode is for typing text."
              />
              <FeatureCard
                icon={<FiFileText className="text-lg" />}
                title="Buffers & files"
                text="When you open a file in vi, you edit a buffer in memory. The file is only changed on disk when you write it with :w or :wq."
              />
              <FeatureCard
                icon={<FiSearch className="text-lg" />}
                title="Search & change"
                text="Powerful search (/) and change commands (c, d, y) make it quick to edit configs without a mouse."
              />
            </div>
          </section>

          {/* Terminals per workflow */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Essential vi workflows in practice
            </h2>
            <p>
              Try each of the following flows in your Solaris lab. Don&apos;t
              worry about memorising everything at once—repeat them a few times
              and they will become natural.
            </p>

            {viSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — vi"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* Cheat sheet / summary */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Small vi cheat sheet for administrators
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Modes and saving"
                points={[
                  "ESC → go to command mode",
                  "i → insert before cursor (insert mode)",
                  "a → append after cursor",
                  "o → open new line below and insert",
                  ":w → write (save) file",
                  ":q → quit (fails if there are unsaved changes)",
                  ":wq → write and quit",
                  ":q! → quit and discard changes",
                ]}
              />
              <BulletCard
                heading="Navigation, edit and search"
                points={[
                  "h / j / k / l → move left / down / up / right",
                  "gg / G → go to first / last line",
                  "0 / $ → go to start / end of line",
                  "yy / p → yank (copy) current line and paste",
                  "dd → delete current line",
                  "u → undo last change",
                  "/pattern → search forward",
                  "n / N → next / previous match",
                ]}
              />
            </div>
          </section>

          {/* Safety box */}
          <section className="space-y-3 rounded-2xl border border-amber-500/60 bg-amber-500/10 p-4 shadow-lg shadow-amber-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-200">
              <FiAlertTriangle className="text-base" />
              Safety tips when editing system files
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-amber-50">
              <li>
                Always take a quick backup of important files before editing,
                for example:{" "}
                <code>cp sshd_config sshd_config.bak</code>.
              </li>
              <li>
                Make small, focused changes and use <code>diff</code> to confirm
                exactly what changed.
              </li>
              <li>
                If you are not sure about your edits, use <code>:q!</code> to
                exit without saving and start again.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-amber-200">
              Once you are comfortable with vi, editing ZFS, SMF and network
              configuration files becomes much easier.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
