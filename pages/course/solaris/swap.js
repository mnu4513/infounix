// pages/course/solaris/swap.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiHardDrive,
  FiActivity,
  FiAlertTriangle,
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

/* ---------- Terminal snippets for swap management ---------- */

const swapSnippets = [
  {
    id: "top-overview",
    title: "Check memory and swap with top",
    description:
      "top (or prstat) gives a quick view of RAM, swap and process usage.",
    content: `[root@solaris ~]# top
last pid:  3210;  load averages:  0.25,  0.20,  0.15    up 10+04:20:10  10:12:34
98 processes: 95 sleeping, 2 running, 1 zombie
CPU states:  2.0% user,  3.0% kernel, 95.0% idle
Memory: 8192M real, 2048M free, 4096M swap in use, 8192M swap free`,
  },
  {
    id: "swap-l-s",
    title: "swap -l and swap -s – what do they show?",
    description:
      "swap -l shows swap devices; swap -s shows virtual memory summary (allocated, reserved, available).",
    content: `[root@solaris ~]# swap -l
swapfile                  dev    swaplo   blocks     free
/dev/zvol/dsk/rpool/swap  256,1      16  4194288  4194288

[root@solaris ~]# swap -s
total: 1024M allocated + 512M reserved = 1536M used, 6656M available

# Meaning:
#  allocated = actually used swap
#  reserved  = promised to processes but not yet used
#  available = free virtual memory (RAM + swap still available)`,
  },
  {
    id: "zfs-volsize",
    title: "Check existing ZFS swap volume size",
    description:
      "In Solaris 11, default swap is often a ZFS volume in rpool. volsize is the logical volume size.",
    content: `[root@solaris ~]# zfs list rpool/swap
NAME        USED  AVAIL  REFER  MOUNTPOINT
rpool/swap  2.00G  30G   2.00G  -   # (ZFS volume, not a filesystem)

[root@solaris ~]# zfs get volsize rpool/swap
NAME        PROPERTY  VALUE  SOURCE
rpool/swap  volsize   2G     local`,
  },
  {
    id: "create-zfs-swap-volume",
    title: "Create new ZFS volume for swap (step-by-step)",
    description:
      "Create a ZFS volume (block device) that we can later add as swap with swap -a.",
    content: `# Create a 4G ZFS volume
[root@solaris ~]# zfs create -V 4G rpool/swap2

[root@solaris ~]# zfs list rpool/swap2
NAME         USED  AVAIL  REFER  MOUNTPOINT
rpool/swap2  4.00G  30G   16K    -

# Confirm volsize
[root@solaris ~]# zfs get volsize rpool/swap2
NAME         PROPERTY  VALUE  SOURCE
rpool/swap2  volsize   4G     local`,
  },
  {
    id: "add-swap",
    title: "Enable the new swap device (swap -a)",
    description:
      "Use the ZFS volume device path from /dev/zvol/dsk. swap -a makes it active immediately.",
    content: `[root@solaris ~]# ls -l /dev/zvol/dsk/rpool/swap2
lrwxrwxrwx   1 root root  50 Jan 11 10:30 /dev/zvol/dsk/rpool/swap2 -> ../../devices/.../rpool%2Fswap2

[root@solaris ~]# swap -a /dev/zvol/dsk/rpool/swap2

[root@solaris ~]# swap -l
swapfile                       dev    swaplo   blocks     free
/dev/zvol/dsk/rpool/swap       256,1      16  4194288  4194288
/dev/zvol/dsk/rpool/swap2      256,3      16  8388576  8388576`,
  },
  {
    id: "remove-swap",
    title: "Remove swap device (swap -d) and keep ZFS volume",
    description:
      "swap -d removes it from active swap. ZFS volume still exists and can be reused or destroyed later.",
    content: `[root@solaris ~]# swap -d /dev/zvol/dsk/rpool/swap2

[root@solaris ~]# swap -l
swapfile                       dev    swaplo   blocks     free
/dev/zvol/dsk/rpool/swap       256,1      16  4194288  4194288

# If you no longer need the swap volume:
[root@solaris ~]# zfs destroy rpool/swap2`,
  },
];

/* ---------- Page component ---------- */

export default function SwapPage() {
  const lesson = solarisLessons.find((l) => l.slug === "swap") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Swap Management in Solaris"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Detailed overview of swap and physical memory in Solaris, with ZFS-based swap management examples."
          }
        />
      </Head>

      <SolarisLayout activeSlug="swap">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 21
          </p>
          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            {lesson.title || "Swap Management in Solaris"}
          </h1>
          <p className="mt-1 max-w-3xl text-sm dark:text-slate-300">
            Swap is part of Solaris virtual memory. Understanding the difference
            between physical RAM and swap, and knowing how to create and manage
            ZFS-based swap devices, is critical for real-world administration.
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
                title={lesson.title || "Swap Management in Solaris"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your video URL in <code>solarisLessons.js</code> for this lesson.
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
          {/* THEORY: swap vs physical memory */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is swap? How is it different from physical memory?
            </h2>
            <p>
              Solaris uses <span className="font-semibold">virtual memory</span>,
              which combines <span className="font-semibold">physical RAM</span>{" "}
              and <span className="font-semibold">swap space</span>. Swap is disk
              space used to store memory pages when RAM is not enough.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="Physical RAM"
                text="Fast semiconductor memory. Directly used by running processes. Limited but very fast."
              />
              <FeatureCard
                icon={<FiHardDrive className="text-lg" />}
                title="Swap Space"
                text="Disk-based extension of memory. Much slower than RAM but allows more processes to run than physical RAM alone."
              />
            </div>
            <p>
              When RAM pressure increases, Solaris can move less-used pages to
              swap (paging out). When needed again, pages are read back into RAM
              (paging in). Excessive swap I/O (thrashing) usually means the
              system needs more RAM or fewer workloads.
            </p>
          </section>

          {/* THEORY: swap in Solaris & ZFS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Swap implementation in Solaris (ZFS volumes)
            </h2>
            <p>
              On modern Solaris systems, swap is often provided by{" "}
              <span className="font-semibold">ZFS volumes</span> (zvols) inside
              the root pool <code>rpool</code>, exposed as block devices under{" "}
              <code>/dev/zvol/dsk</code>.
            </p>
            <p>
              This gives flexibility: you can create, resize or remove swap
              volumes using <code>zfs</code> commands, and then activate or
              deactivate them dynamically using <code>swap</code> commands.
            </p>
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Swap commands and ZFS integration – step by step
            </h2>
            <p>
              Use these flows in your lab Solaris system. Be careful on
              production systems, especially if memory is already tight.
            </p>

            {swapSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs dark:text-slate-300">{snippet.description}</p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — swap"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* SUMMARY / CHEAT SHEET */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Command cheat sheet – swap & ZFS
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Monitoring swap"
                points={[
                  "top → quick view of memory + swap usage",
                  "swap -l → list swap devices and sizes",
                  "swap -s → virtual memory summary (allocated/reserved/available)",
                ]}
              />
              <BulletCard
                heading="Managing ZFS-based swap"
                points={[
                  "zfs get volsize rpool/swap → see default swap volume size",
                  "zfs create -V 4G rpool/swap2 → create 4G swap volume",
                  "swap -a /dev/zvol/dsk/rpool/swap2 → activate new swap",
                  "swap -d /dev/zvol/dsk/rpool/swap2 → deactivate swap",
                  "zfs destroy rpool/swap2 → remove swap volume (after swap -d)",
                ]}
              />
            </div>
          </section>

          {/* SAFETY BOX */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <FiAlertTriangle className="text-base" />
              Important safety notes for swap changes
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-red-200">
              <li>
                Never remove all swap from a busy system – it may cause
                performance collapse or even panics under heavy load.
              </li>
              <li>
                Always check <code>swap -s</code> and <code>top</code> before
                disabling a swap device.
              </li>
              <li>
                For permanent swap entries across reboots, you typically add the
                swap volume to <code>/etc/vfstab</code> (do this only when you
                fully understand your environment policies).
              </li>
              <li>
                Avoid placing critical application data on the same disks that
                are heavily used for swap, to reduce I/O contention.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-red-600">
              In the next topics, this understanding will help when tuning
              performance, planning memory, and troubleshooting slow systems.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
