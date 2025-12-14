// pages/course/solaris/crontab-at.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiClock,
  FiRepeat,
  FiCalendar,
  FiAlertTriangle,
  FiUser,
  FiShield,
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

/* ---------- Terminal snippets ---------- */

const cronAtSnippets = [
  {
    id: "cron-vs-at-overview",
    title: "Difference between cron and at",
    description:
      "Use cron for recurring jobs, at for one-time jobs at a specific time.",
    content: `# Cron = recurring
# Example: Run a script every day at 02:30
[root@solaris ~]# crontab -e
30 2 * * * /usr/local/bin/backup.sh

# At = one-time
# Example: Run a script tomorrow at 06:00 once
[root@solaris ~]# at 06:00 tomorrow
/usr/local/bin/backup.sh
<Ctrl+D>
job 1 at Tue Jan 21 06:00:00 2025`,
  },
  {
    id: "cron-format",
    title: "Crontab format and placeholders",
    description:
      "Each line has 5 time fields + command. Order: minute, hour, day-of-month, month, day-of-week, then command.",
    content: `# * * * * * command
# | | | | |
# | | | | +-- day of week (0-6, 0 or 7 = Sunday)
# | | | +---- month (1-12)
# | | +------ day of month (1-31)
# | +-------- hour (0-23)
# +---------- minute (0-59)

# Examples:
# 1) Every minute
* * * * * /usr/local/bin/test.sh

# 2) Every day at 01:15
15 1 * * * /usr/local/bin/cleanup.sh

# 3) Every Monday at 03:30
30 3 * * 1 /usr/local/bin/report.sh

# 4) Every weekday at 09:00
0 9 * * 1-5 /usr/local/bin/daily.sh

# 5) Every 5 minutes
*/5 * * * * /usr/local/bin/check.sh`,
  },
  {
    id: "cron-self-list-edit",
    title: "List and edit your own crontab",
    description:
      "Each user has their own crontab file stored in /var/spool/cron/crontabs.",
    content: `# Show current user's cron
[john@solaris ~]$ crontab -l

# Edit current user's cron (uses default editor)
[john@solaris ~]$ crontab -e

# Remove current user's crontab
[john@solaris ~]$ crontab -r`,
  },
  {
    id: "cron-other-user",
    title: "View/edit other user’s cron as root",
    description:
      "Root (or privileged) can manage crontab for other users with -u.",
    content: `# As root:
[root@solaris ~]# crontab -l -u oracle

[root@solaris ~]# crontab -e -u oracle

# On disk, user crons are under:
[root@solaris ~]# ls /var/spool/cron/crontabs
root  oracle  www  john`,
  },
  {
    id: "cron-allow-deny",
    title: "Cron allow/deny configuration",
    description:
      "Use cron.allow / cron.deny to control which users can use cron.",
    content: `# Files (Solaris):
# /etc/cron.d/cron.allow
# /etc/cron.d/cron.deny

# Rules:
# - If cron.allow exists: only users listed in it may use cron.
# - If cron.allow does NOT exist but cron.deny exists:
#     Users listed in cron.deny are denied; others allowed.
# - If neither file exists: usually only root can use cron (implementation dependent).

# Example:
[root@solaris ~]# cat /etc/cron.d/cron.allow
root
oracle
john

[root@solaris ~]# cat /etc/cron.d/cron.deny
guest
test`,
  },
  {
    id: "at-allow-deny",
    title: "at allow/deny configuration",
    description:
      "at uses similar allow/deny files, but for one-time jobs.",
    content: `# Files:
# /etc/cron.d/at.allow
# /etc/cron.d/at.deny

# Same rule pattern as cron:
# - at.allow exists → only users listed can use at.
# - at.allow absent, at.deny exists → users listed are denied, others allowed.
# - None → typically only root.

[root@solaris ~]# cat /etc/cron.d/at.allow
root
oracle

[root@solaris ~]# cat /etc/cron.d/at.deny
guest`,
  },
  {
    id: "at-usage",
    title: "Using at for one-time jobs",
    description:
      "at accepts natural time expressions like now + 10 minutes, 08:00, midnight, tomorrow etc.",
    content: `# Schedule a job for tonight at 23:15
[root@solaris ~]# at 23:15
/usr/local/bin/nightly_backup.sh
<Ctrl+D>
job 2 at Mon Jan 20 23:15:00 2025

# Schedule a job 10 minutes from now
[root@solaris ~]# at now + 10 minutes
echo "Test mail" | mailx -s "Test" admin@example.com
<Ctrl+D>
job 3 at Mon Jan 20 10:25:00 2025`,
  },
  {
    id: "atq-atrm",
    title: "List and remove at jobs",
    description: "Use atq to list jobs and atrm to remove them.",
    content: `[root@solaris ~]# atq
2   Mon Jan 20 23:15:00 2025   a root
3   Mon Jan 20 10:25:00 2025   a root

# Remove job 3
[root@solaris ~]# atrm 3

[root@solaris ~]# atq
2   Mon Jan 20 23:15:00 2025   a root`,
  },
];

export default function CrontabAtPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "crontab-at") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Crontab & at in Solaris"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Detailed explanation of cron and at in Solaris, including usage, format, examples, and security controls."
          }
        />
      </Head>

      <SolarisLayout activeSlug="crontab-at">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 25
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            {lesson.title || "Crontab & at in Solaris"}
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-300">
            cron is used for recurring scheduled jobs; at is used for one-time
            jobs at a specific time. In this lesson, you&apos;ll learn when to
            use which, how to write crontab entries, and how to control which
            users are allowed to schedule jobs.
          </p>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
        </motion.header>

        {/* VIDEO */}
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
                title={lesson.title || "Crontab & at in Solaris"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your crontab/at tutorial video URL in{" "}
              <code>solarisLessons.js</code>.
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
          {/* WHAT / WHY / WHERE TO USE */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              What are cron and at? When to use them?
            </h2>
            <p>
              In Solaris, <span className="font-semibold">cron</span> and{" "}
              <span className="font-semibold">at</span> are classic scheduling
              tools:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<FiRepeat className="text-lg" />}
                title="cron – recurring scheduler"
                text="Runs commands at specified times repeatedly (daily, weekly, monthly, every 5 minutes, etc.)."
              />
              <FeatureCard
                icon={<FiCalendar className="text-lg" />}
                title="at – one-time scheduler"
                text="Runs a command once at a particular date/time (e.g. tonight 23:00, tomorrow 06:00)."
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Where to use cron"
                points={[
                  "Daily/weekly backups",
                  "Log rotation scripts",
                  "Monitoring checks every N minutes",
                  "Maintenance tasks at fixed schedule",
                ]}
              />
              <BulletCard
                heading="Where to use at"
                points={[
                  "One-time maintenance job (e.g. patch cleanup tonight)",
                  "Run once after a change window",
                  "Schedule a restart later without staying logged in",
                ]}
              />
            </div>
          </section>

          {/* When NOT to use */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              When NOT to use cron/at
            </h2>
            <BulletCard
              heading="Avoid cron/at when"
              points={[
                "Job requires complex dependency handling → better use orchestration tools (e.g. Ansible, Jenkins).",
                "Job is very long-running and already supervised by SMF/systemd.",
                "Job needs high-availability clustering decisions.",
                "You need centralized scheduling across many servers (better use enterprise scheduler).",
              ]}
            />
          </section>

          {/* DIFF BETWEEN CRON & AT */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Difference between cron and at (Solaris)
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="cron"
                points={[
                  "Recurring jobs.",
                  "Defined in per-user crontab files.",
                  "Format driven by 5 time fields.",
                  "Managed via crontab -e/-l/-r.",
                ]}
              />
              <BulletCard
                heading="at"
                points={[
                  "Single-shot jobs.",
                  "Stored in at job queue.",
                  "Time specified in free-form format (06:00, now + 10 minutes).",
                  "Managed via at / atq / atrm.",
                ]}
              />
            </div>
          </section>

          {/* TERMINAL SNIPPETS */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Cron format, examples, allow/deny, and at usage
            </h2>

            {cronAtSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-400">{snippet.description}</p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — cron/at"
                  contextLabel="solaris-lab"
                  maxHeight="20rem"
                />
              </div>
            ))}
          </section>

          {/* SECURITY / ALLOW-DENY SUMMARY */}
          <section className="space-y-3 rounded-2xl border border-amber-500/60 bg-amber-500/10 p-4 shadow-lg shadow-amber-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-200">
              <FiShield className="text-base" />
              Security: who is allowed to use cron and at?
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-amber-50">
              <li>
                Use <code>/etc/cron.d/cron.allow</code> and{" "}
                <code>/etc/cron.d/cron.deny</code> to control cron use.
              </li>
              <li>
                Use <code>/etc/cron.d/at.allow</code> and{" "}
                <code>/etc/cron.d/at.deny</code> to control at use.
              </li>
              <li>
                For security, allow only real application/service accounts to
                schedule jobs, not generic or guest users.
              </li>
              <li>
                Review crontabs regularly for unknown or suspicious entries.
              </li>
            </ul>
          </section>

          {/* SMALL REMINDER BLOCK */}
          <section className="space-y-3 rounded-2xl border border-red-500/50 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <FiAlertTriangle className="text-base" />
              Important reminders
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-red-200">
              <li>
                Always use absolute paths in cron and at (e.g.{" "}
                <code>/usr/bin/find</code> instead of <code>find</code>).
              </li>
              <li>
                Set required environment (PATH, HOME, SHELL) in scripts, not
                just rely on login shell.
              </li>
              <li>
                Log output to files using <code>&gt;&gt; logfile 2&gt;&1</code>{" "}
                so you can debug failures later.
              </li>
              <li>
                For critical jobs, notify via mail or monitoring when they fail.
              </li>
            </ul>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
