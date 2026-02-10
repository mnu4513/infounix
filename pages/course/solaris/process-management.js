// pages/course/solaris/process-management.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiCpu,
  FiTarget,
  FiZap,
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

/* ---------- Terminal snippets: one focused flow per box ---------- */

const processSnippets = [
  {
    id: "ps-ef",
    title: "List all processes with ps -ef",
    description:
      "ps -ef shows a snapshot of all running processes with their PIDs, parents, and commands.",
    content: `[root@solaris ~]# ps -ef | head
    UID   PID  PPID   C    STIME TTY         TIME CMD
    root     0     0  0   Jan 10 ?           0:03 sched
    root     1     0  0   Jan 10 ?           0:05 /sbin/init
    root     2     0  0   Jan 10 ?           0:00 pageout
    root     3     0  0   Jan 10 ?           0:00 fsflush
    root   123     1  0   Jan 10 ?           0:02 /usr/lib/ssh/sshd
    root   256     1  0   Jan 10 ?           0:01 /usr/sbin/svc.startd
    root   890   123  0   Jan 11 ?           0:00 sshd: oracle@pts/1
  oracle   891   890  0   Jan 11 pts/1       0:00 -bash
    root  1200     1  0   Jan 11 ?           0:00 /usr/sbin/cron

[root@solaris ~]# ps -ef | grep sshd
    root   123     1  0   Jan 10 ?           0:02 /usr/lib/ssh/sshd
  oracle   890   123  0   Jan 11 ?           0:00 sshd: oracle@pts/1
  root   1340  1200  0   Jan 11 pts/2       0:00 grep sshd`,
  },
  {
    id: "prstat",
    title: "Monitor resource usage with prstat",
    description:
      "prstat is like top on Solaris. It shows CPU and memory usage for processes in real time.",
    content: `[root@solaris ~]# prstat 1 5
   PID USERNAME  SIZE   RSS STATE  PRI NICE      TIME  CPU PROCESS/NLWP       
   891 oracle   120M   40M sleep   59    0   0:00:02 1.0% bash/1
   950 root     150M   60M sleep   59    0   0:00:05 0.5% java/35
   123 root      60M   20M sleep   59    0   0:00:02 0.2% sshd/1
     1 root      30M   10M sleep   59    0   0:00:05 0.1% init/1
   ...

Total: 45 processes, 125 lwps, load averages: 0.24, 0.20, 0.14`,
  },
  {
    id: "pgrep-pkill",
    title: "Find and signal processes using pgrep and pkill",
    description:
      "Use pgrep to find PIDs by name and pkill to send signals. This is safer than grepping ps output manually.",
    content: `[root@solaris ~]# pgrep -fl sshd
123 /usr/lib/ssh/sshd
890 sshd: oracle@pts/1

[root@solaris ~]# pkill -HUP sshd
# Sends SIGHUP to all sshd processes (reload configuration).

[root@solaris ~]# pgrep -fl appserver
1024 /usr/local/bin/appserver --config /etc/appserver.conf`,
  },
  {
    id: "kill-example",
    title: "Terminate a hung process with kill",
    description:
      "Always try a gentle signal (TERM) before using KILL. Confirm the PID carefully.",
    content: `[root@solaris ~]# pgrep -fl appserver
1024 /usr/local/bin/appserver --config /etc/appserver.conf

[root@solaris ~]# kill 1024
# Wait a few seconds and check again:
[root@solaris ~]# ps -p 1024 -o pid,comm
  PID COMMAND
 1024 appserver

[root@solaris ~]# kill -9 1024
[root@solaris ~]# ps -p 1024 -o pid,comm
  PID COMMAND
# (no output, process is gone)`,
  },
  {
    id: "nice-renice",
    title: "Adjust process priority with nice and renice",
    description:
      "nice and renice change process scheduling priority. Higher nice value means lower priority (more friendly to others).",
    content: `[root@solaris ~]# nice -n 10 /usr/local/bin/report-job &
[1] 1500

[root@solaris ~]# ps -o pid,ni,comm -p 1500
  PID  NI COMMAND
 1500  10 report-job

[root@solaris ~]# renice -n 5 -p 1500
1500: old priority 10, new priority 5

[root@solaris ~]# ps -o pid,ni,comm -p 1500
  PID  NI COMMAND
 1500   5 report-job`,
  },
];

export default function ProcessManagementPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "process-management") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Process Management"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to list, monitor and control processes on Solaris using ps, prstat, pgrep, pkill, kill and renice."
          }
        />
      </Head>

      <SolarisLayout activeSlug="process-management">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 10
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Process Management in Solaris"}
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
                title={lesson.title || "Process Management in Solaris"}
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
              Why process management is important
            </h2>
            <p>
              Processes are the running programs on your Solaris system. As an
              administrator, you must be able to{" "}
              <span className="font-semibold">
                see what is running, identify heavy processes and clean up hung
                ones
              </span>{" "}
              without destabilising the server.
            </p>
            <p>
              In this lesson, we focus on core process tools that you will use
              almost daily: <code>ps</code>, <code>prstat</code>,{" "}
              <code>pgrep</code>, <code>pkill</code>, <code>kill</code> and{" "}
              <code>renice</code>.
            </p>
          </section>

          {/* Concept cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Key concepts in process management
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiActivity className="text-lg" />}
                title="Processes & PIDs"
                text="Every running program is a process with a unique Process ID (PID). Parent/child relationships help you understand who started what."
              />
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="Load & resource usage"
                text="Tools like prstat show you which processes are consuming CPU and memory so you can quickly spot bottlenecks."
              />
              <FeatureCard
                icon={<FiTarget className="text-lg" />}
                title="Signals & control"
                text="Commands like kill, pkill and nice let you send signals to processes to stop, reload or change their priorities."
              />
            </div>
          </section>

          {/* Step-by-step terminals */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-step process commands
            </h2>
            <p>
              Run each of these command sequences in your Solaris lab VM.
              Observe how the output changes when you start or stop applications
              in another terminal.
            </p>

            {processSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs dark:text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — processes"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* Best practices */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Good practices for managing processes
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Observation before action"
                points={[
                  "Use ps and prstat to understand the situation before killing anything.",
                  "Check parent PIDs; killing a parent can also affect many child processes.",
                  "If a process misbehaves repeatedly, investigate logs and configuration instead of just killing it every time.",
                ]}
              />
              <BulletCard
                heading="Safe use of signals"
                points={[
                  "Prefer a normal TERM signal first (kill PID) and only use KILL (kill -9 PID) as a last resort.",
                  "Avoid using pkill with very generic patterns that might match more processes than expected.",
                  "On systems with SMF-managed services, consider using svcadm to restart services instead of killing daemons directly.",
                ]}
              />
            </div>
          </section>

          {/* Practice box */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice task – observe and control processes
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-emerald-50">
              <li>
                Open a few terminals and start simple commands (ping, sleep,
                loops) and watch them using <code>ps -ef</code> and{" "}
                <code>prstat</code>.
              </li>
              <li>
                Use <code>pgrep</code> and <code>pkill</code> to find and stop
                your test processes by name.
              </li>
              <li>
                Start a test script with <code>nice</code> and change its
                priority using <code>renice</code>, then observe the effect in{" "}
                <code>prstat</code>.
              </li>
              <li>
                Note down a small checklist you will follow before killing a
                process on a real production system.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-emerald-600">
              In the next lessons on service management and monitoring, you will
              see how process-level information combines with SMF and system
              logs for full troubleshooting.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
