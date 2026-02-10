// pages/course/solaris/basic-commands.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiFolder,
  FiFileText,
  FiHelpCircle,
  FiInfo,
  FiArrowRight,
} from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/SolarisLessons";
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

// Terminal demo content
const basicCommandsSnippet = `[root@solaris ~]# uname -a
SunOS sol11 5.11 11.4.0.15.0 i86pc i386 i86pc

[root@solaris ~]# pwd
/root

[root@solaris ~]# ls
Desktop  Documents  scripts  backup.sh

[root@solaris ~]# cd /var/log
[root@solaris /var/log]# ls -l
total 12
-rw-r--r--   1 root     root       10240 Jan 10 10:22 messages
-rw-r--r--   1 root     root        2048 Jan 10 10:10 secure

[root@solaris /var/log]# cat /etc/release
                             Oracle Solaris 11.4
        Assembled xx Month 20xx

[root@solaris /var/log]# df -h
Filesystem             Size   Used  Available Capacity  Mounted on
rpool/ROOT/solaris      40G    10G        30G    25%    /

[root@solaris /var/log]# ps -ef | head
    UID   PID  PPID   C    STIME TTY         TIME CMD
    root     0     0  0    Jan 10 ?           0:03 sched
    root     1     0  0    Jan 10 ?           0:05 /sbin/init
`;

export default function BasicCommandsPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "basic-commands") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Basic Commands"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to use essential Solaris commands like uname, pwd, ls, cd, cat, df and ps in a safe and practical way."
          }
        />
      </Head>

      <SolarisLayout activeSlug="basic-commands">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 3
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Basic Commands in Solaris"}
          </h1>
          {lesson.short && (
            <p className="mt-1 max-w-2xl text-sm dark:text-slate-300">
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
                title={lesson.title || "Basic Commands in Solaris"}
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
          className="space-y-8 text-sm leading-relaxed dark:text-slate-200"
        >
          {/* Overview */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Why start with basic commands?
            </h2>
            <p>
              Before touching services, networking or ZFS, you should be
              completely comfortable with{" "}
              <span className="font-semibold">moving around the system</span>{" "}
              and running simple read-only commands. Yeh sab commands aap har
              Solaris session mein use karoge.
            </p>
            <p>
              Is lesson mein hum mainly{" "}
              <span className="text-sky-300">
                safe, non-destructive commands
              </span>{" "}
              cover karenge jo sirf information dikhate hain—kuch todte nahi
              🙂.
            </p>
          </section>

          {/* A nice terminal demo */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Basic command flow in a Solaris session
            </h2>
            <p>
              Yeh ek typical flow hai jab aap nayi Solaris machine par login
              hote ho: system info check, current path dekhna, files list karna,
              logs directory visit karna, etc.
            </p>

            <TerminalOutput
              content={basicCommandsSnippet}
              title="terminal — bash"
              contextLabel="solaris-lab"
            />
          </section>

          {/* Command categories */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Command categories you should know
            </h2>
            <p>
              Instead of ratta-marofying random commands, yaad rakho ki har
              command ek category mein fit hota hai. Neeche 4 main categories
              hain.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<FiInfo className="text-lg" />}
                title="System information"
                text="uname, date, whoami — commands to check OS version, current date/time and which user you are logged in as."
              />
              <FeatureCard
                icon={<FiFolder className="text-lg" />}
                title="Navigation & listing"
                text="pwd, ls, cd — move between directories and list files in different formats (ls -l, ls -a, etc.)."
              />
              <FeatureCard
                icon={<FiFileText className="text-lg" />}
                title="Viewing file content"
                text="cat, more, less, tail — see configuration and log files without editing them."
              />
              <FeatureCard
                icon={<FiHelpCircle className="text-lg" />}
                title="Getting help"
                text="man, --help — in-built documentation so you can discover options yourself on any Solaris box."
              />
            </div>
          </section>

          {/* Detailed breakdown */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Important commands in this lesson
            </h2>

            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="System & session info"
                points={[
                  "uname -a   → complete OS + kernel info",
                  "uname -r   → only OS release version",
                  "whoami     → which user is logged in",
                  "date       → current date & time on server",
                ]}
              />
              <BulletCard
                heading="Navigation"
                points={[
                  "pwd        → print current directory",
                  "ls         → list files (ls -l, ls -lh, ls -a)",
                  "cd /path   → change directory",
                  "cd ..      → go one level up",
                ]}
              />
              <BulletCard
                heading="Viewing files safely"
                points={[
                  "cat /etc/release  → Solaris version",
                  "more /var/log/messages",
                  "less /var/log/messages (better for big files)",
                  "tail -f /var/log/messages → live log tailing",
                ]}
              />
              <BulletCard
                heading="Processes & disk usage"
                points={[
                  "df -h      → disk usage in human readable format",
                  "du -sh *   → size of folders in current directory",
                  "ps -ef     → full process listing",
                  "ps -ef | head   → just check top rows quickly",
                ]}
              />
            </div>
          </section>

          {/* Practice section */}
          <section className="space-y-3 rounded-2xl border border-sky-600/50 bg-sky-500/10 p-4 shadow-lg shadow-sky-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice task – do this on your VMware lab
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-sky-50">
              <li>
                Login to your Solaris VM and run all commands shown in the
                terminal demo above.
              </li>
              <li>
                Note down the output of <code>uname -a</code>,{" "}
                <code>df -h</code> and <code>ps -ef | head</code> to understand
                your system profile.
              </li>
              <li>
                Try using <code>man</code> for at least 3 commands (e.g.{" "}
                <code>man ls</code>, <code>man df</code>, <code>man ps</code>).
              </li>
              <li>
                Don&apos;t worry about remembering everything – focus on getting
                comfortable typing and reading the outputs.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-sky-600">
              Next up, we move to user and group management where these basic
              commands will keep helping you.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
