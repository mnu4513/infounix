// pages/course/solaris/system-monitoring.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiCpu,
  FiHardDrive,
  FiBarChart2,
  FiFileText,
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

/* ---------- Terminal snippets: group commands logically ---------- */

const monitoringSnippets = [
  {
    id: "load-overview",
    title: "Overall system load: uptime, top, prstat -a",
    description:
      "First get a quick feel of system load and active processes using uptime, top and prstat.",
    content: `[root@solaris ~]# uptime
 11:15am  up 10 day(s),  3:42,  4 users,  load average: 0.24, 0.18, 0.15

[root@solaris ~]# top
last pid:  1234;  load averages:  0.24,  0.18,  0.15    up 10+03:42:10  11:15:32
  PID USERNAME LWP PRI NICE  SIZE   RES STATE    TIME    CPU COMMAND
  891 oracle     1  59    0  120M   40M sleep   0:02   1.0% bash
  950 root      35  59    0  150M   60M sleep   0:05   0.5% java
  123 root       1  59    0   60M   20M sleep   0:02   0.2% sshd
  ...

[root@solaris ~]# prstat -a 1 3
   PID USERNAME  SIZE   RSS STATE  PRI NICE      TIME  CPU PROCESS/NLWP       
   891 oracle   120M   40M sleep   59    0   0:00:02 1.0% bash/1
   950 root     150M   60M sleep   59    0   0:00:05 0.5% java/35
   123 root      60M   20M sleep   59    0   0:00:02 0.2% sshd/1
   ...

Total: 45 processes, 125 lwps, load averages: 0.24, 0.18, 0.15`,
  },
  {
    id: "memory-view",
    title: "Memory usage: prstat sorted by RSS and ::memstat",
    description:
      "Use prstat -a -s rss to see which processes consume most memory, and ::memstat in mdb -k for a kernel-level view.",
    content: `[root@solaris ~]# prstat -a -s rss 1 3
   PID USERNAME  SIZE   RSS STATE  PRI NICE      TIME  CPU PROCESS/NLWP       
   950 root     800M  600M sleep   59    0   0:00:30 2.0% java/35
  1200 oracle   500M  300M sleep   59    0   0:00:20 1.5% oracle/50
   891 oracle   120M   40M sleep   59    0   0:00:02 0.5% bash/1
   ...

Total: 45 processes, 125 lwps, load averages: 0.30, 0.22, 0.18

[root@solaris ~]# echo ::memstat | mdb -k
Page Summary                Pages                MB  %Tot
------------                -----               ---- ----
Kernel                     150000               1171  35%
ZFS File Data              100000                781  23%
Anon                       120000                937  28%
Exec and libs               20000                156   5%
Page cache                  15000                117   4%
Free (unallocated)          15000                117   4%

Total                      420000               3280 100%`,
  },
  {
    id: "cpu-by-user",
    title: "CPU usage by user: prstat -a -u user and prstat -t",
    description:
      "Filter prstat output for a specific user, or aggregate usage per user with prstat -t.",
    content: `[root@solaris ~]# prstat -a -u oracle 1 3
   PID USERNAME  SIZE   RSS STATE  PRI NICE      TIME  CPU PROCESS/NLWP       
  1200 oracle   500M  300M sleep   59    0   0:00:20 2.0% oracle/50
   891 oracle   120M   40M sleep   59    0   0:00:02 0.5% bash/1
   ...

Total: 10 processes, 60 lwps, load averages: 0.40, 0.30, 0.20

[root@solaris ~]# prstat -t 1 3
   USERNAME   SIZE   RSS STATE  PRI NICE      TIME  CPU PROCESS/NLWP       
   oracle    700M  340M sleep   59    0   0:00:25 2.5%
   root      600M  300M sleep   59    0   0:00:20 1.5%
   webuser   200M  100M sleep   59    0   0:00:05 0.5%

Total: 45 processes, 125 lwps, load averages: 0.45, 0.35, 0.25`,
  },
  {
    id: "disk-io",
    title: "Disk I/O: iostat -en and iostat -xnte",
    description:
      "Use iostat to see device errors, throughput and extended statistics for disks and controllers.",
    content: `[root@solaris ~]# iostat -en
            --- errors ---   --- transport ---   --- device ---
cmdk0           0    0    0   100.00%   0.00%   0.00%   0.00%
cmdk1           0    0    0   100.00%   0.00%   0.00%   0.00%

[root@solaris ~]# iostat -xnte 1 3
                    extended device statistics             
device    r/s  w/s   kr/s   kw/s wait actv  svc_t  %w  %b
cmdk0     5.0  2.0  40.00  20.00 0.0  0.1   10.0   0  10
cmdk1     1.0  4.0  10.00  30.00 0.0  0.1   15.0   0  12
...`,
  },
  {
    id: "filesystem-usage",
    title: "Filesystem usage: du and df",
    description:
      "Check filesystem and directory usage to find where space is being used.",
    content: `[root@solaris ~]# df -h
Filesystem             Size   Used  Available Capacity  Mounted on
rpool/ROOT/solaris      40G    10G        30G    25%    /
rpool/export/home       60G    25G        35G    42%    /export/home
rpool/data              80G    55G        25G    69%    /data

[root@solaris ~]# cd /data
[root@solaris /data]# du -sh
55G     .

[root@solaris /data]# du -sh *
 10G   oracle
 20G   backups
  5G   logs
 20G   appdata`,
  },
  {
    id: "logs",
    title: "System logs: quick checks for issues",
    description:
      "Use tail and grep to scan important logs when you notice high load or errors.",
    content: `[root@solaris ~]# tail -50 /var/adm/messages
Jan 11 11:10:02 sol11 sshd[1234]: [ID 800047 auth.info] Accepted publickey for oracle from 192.168.1.10 port 53218 ssh2
Jan 11 11:11:45 sol11 nfs: [ID 702911 kern.warning] WARNING: NFS server not responding
Jan 11 11:11:50 sol11 nfs: [ID 702911 kern.notice] NOTICE: NFS server ok

[root@solaris ~]# grep -i "error" /var/adm/messages | tail -10
Jan 11 10:55:21 sol11 someapp[987]: [ID 702911 user.error] Failed to connect to database

[root@solaris ~]# tail -f /var/adm/messages
# Follow the log live while reproducing an issue...`,
  },
];

export default function SystemMonitoringPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "system-monitoring") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "System Monitoring"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Monitor CPU, memory, disk I/O, filesystem usage and logs on Solaris using prstat, iostat, du, df, uptime and related tools."
          }
        />
      </Head>

      <SolarisLayout activeSlug="system-monitoring">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 12
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "System Monitoring in Solaris"}
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
                title={lesson.title || "System Monitoring in Solaris"}
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
              Why system monitoring matters
            </h2>
            <p>
              System monitoring is about answering a few key questions quickly:
              <span className="font-semibold">
                {" "}
                Is the system healthy? What is slow? Which component is the
                bottleneck?
              </span>{" "}
              As a Solaris admin, you will use a combination of CPU, memory,
              disk and log tools to build this picture.
            </p>
            <p>
              In this lesson we focus on tools you listed:{" "}
              <code>top</code>, <code>prstat</code>, <code>iostat</code>,{" "}
              <code>df</code>, <code>du</code>, <code>uptime</code> and system
              logs.
            </p>
          </section>

          {/* Concept cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Key monitoring dimensions
            </h2>
            <div className="grid gap-4 md:grid-cols-4">
              <FeatureCard
                icon={<FiActivity className="text-lg" />}
                title="Load"
                text="uptime and top give you a quick summary of load averages, logged-in users and overall system stress."
              />
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="CPU & memory"
                text="prstat shows per-process and per-user CPU/memory usage and lets you sort or filter quickly."
              />
              <FeatureCard
                icon={<FiHardDrive className="text-lg" />}
                title="Disk & I/O"
                text="iostat tells you if disks and controllers are saturated or error-prone, which often explains slow I/O."
              />
              <FeatureCard
                icon={<FiFileText className="text-lg" />}
                title="Space & logs"
                text="df, du and logs show you where space is used and what errors the system is reporting."
              />
            </div>
          </section>

          {/* Step-by-step terminals */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-step monitoring commands
            </h2>
            <p>
              Walk through these flows in your lab. Open two terminals: one to
              run monitoring commands, another to start/stop test workloads and
              see their impact.
            </p>

            {monitoringSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs dark:text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — monitoring"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* Patterns / best practices */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Typical monitoring patterns
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="When users say “system is slow”"
                points={[
                  "Check uptime to see load averages and how long the system has been up.",
                  "Use prstat -a to see which processes are consuming CPU.",
                  "Check memory pressure with prstat -a -s rss and ::memstat.",
                  "Run iostat -xnte to see if disks are saturated or busy.",
                  "Review recent errors in /var/adm/messages.",
                ]}
              />
              <BulletCard
                heading="When disk space is filling up"
                points={[
                  "Use df -h to find which filesystem is close to 100% usage.",
                  "cd into that filesystem and run du -sh and du -sh * to see which directories are heavy.",
                  "Look for large log or backup directories and discuss cleanup or rotation with application owners.",
                  "Consider ZFS snapshots, compression or moving rarely-used data to a different pool.",
                ]}
              />
            </div>
          </section>

          {/* Practice box */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice task – build a quick health-check routine
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-emerald-50">
              <li>
                Create your own 5–10 command sequence (using uptime, prstat,
                iostat, df, du and logs) that you will always run when
                investigating a performance issue.
              </li>
              <li>
                Run a stress script (CPU or disk heavy) in the background and
                observe how the metrics change in real time.
              </li>
              <li>
                Note down what “normal” looks like for your lab VM so you can
                quickly recognise unusual patterns later on bigger systems.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-emerald-600">
              In future lessons on ZFS and patching, these monitoring tools will
              help you verify the impact of your changes.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
