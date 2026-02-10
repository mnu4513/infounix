// pages/course/course/solaris/zpool.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";

import {
  FiDatabase,
  FiHardDrive,
  FiActivity,
  FiTool,
  FiAlertTriangle,
  FiCloudLightning,
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

/* -------------------------------------------
   TERMINAL SNIPPETS FOR ZPOOL COMMANDS
-------------------------------------------- */

const zpoolSnippets = [
  {
    id: "zpool-list",
    title: "Check existing zpools (zpool list)",
    description: "Shows size, alloc, free, expandsize, fragmentation, and more.",
    content: `[root@solaris ~]# zpool list
NAME    SIZE  ALLOC   FREE  EXPANDSZ   FRAG    CAP  DEDUP  HEALTH  ALTROOT
rpool    60G   10.3G   49G         -     2%    17%  1.00x  ONLINE  -`,
  },
  {
    id: "zpool-status",
    title: "Check detailed pool status (zpool status)",
    description:
      "Shows pool state, errors, vdevs, read/write/checksum failures and device paths.",
    content: `[root@solaris ~]# zpool status rpool
  pool: rpool
 state: ONLINE
  scan: scrub repaired 0B in 0 days 00:05:20 with 0 errors
config:

        NAME                       STATE     READ WRITE CKSUM
        rpool                      ONLINE       0     0     0
          c3t0d0                   ONLINE       0     0     0`,
  },
  {
    id: "format-disk",
    title: "Discover disks before creating pools (echo | format)",
    description:
      "List available disks in non-interactive mode to avoid format> prompt.",
    content: `[root@solaris ~]# echo | format
AVAILABLE DISK SELECTIONS:
       0. c2t1d0 <100.00GB>
       1. c2t2d0 <100.00GB>`,
  },
  {
    id: "zpool-create-basic",
    title: "Create a basic (single-disk) pool",
    description:
      "Always use the whole disk (slice s2). Single-disk pools have no redundancy.",
    content: `[root@solaris ~]# zpool create mypool c2t1d0
# Or using slice:
[root@solaris ~]# zpool create mypool /dev/dsk/c2t1d0s2

[root@solaris ~]# zpool list
NAME     SIZE  ALLOC   FREE  HEALTH
mypool   100G     0K   100G  ONLINE`,
  },
  {
    id: "zpool-create-mirror",
    title: "Create a mirror pool",
    description: "Mirror protects against 1 disk failure (RAID-1 equivalent).",
    content: `[root@solaris ~]# zpool create mymirror mirror c2t1d0 c2t2d0

[root@solaris ~]# zpool status mymirror
  pool: mymirror
 state: ONLINE
config:

        NAME        STATE     READ WRITE CKSUM
        mymirror    ONLINE       0     0     0
          mirror-0  ONLINE       0     0     0
            c2t1d0  ONLINE       0     0     0
            c2t2d0  ONLINE       0     0     0`,
  },
  {
    id: "zpool-create-raidz",
    title: "Create RAID-Z1 / RAID-Z2 / RAID-Z3 pools",
    description:
      "RAID-Z avoids the write hole and provides better data integrity.",
    content: `# RAID-Z1 (1 disk redundancy)
[root@solaris ~]# zpool create rz1 raidz c2t1d0 c2t2d0 c2t3d0

# RAID-Z2 (2 disk redundancy)
[root@solaris ~]# zpool create rz2 raidz2 c2t1d0 c2t2d0 c2t3d0 c2t4d0

# RAID-Z3 (3 disk redundancy)
[root@solaris ~]# zpool create rz3 raidz3 c2t1d0 c2t2d0 c2t3d0 c2t4d0 c2t5d0`,
  },
  {
    id: "zpool-add",
    title: "Add a new disk/vdev to an existing pool (zpool add)",
    description:
      "Adding disks expands capacity but may reduce redundancy depending on vdev layout.",
    content: `[root@solaris ~]# zpool add mypool c2t3d0

[root@solaris ~]# zpool status mypool
  pool: mypool
 state: ONLINE
config:

        NAME         STATE     READ WRITE CKSUM
        mypool       ONLINE       0     0     0
          c2t1d0     ONLINE       0     0     0
          c2t3d0     ONLINE       0     0     0`,
  },
  {
    id: "zpool-attach",
    title: "Convert single disk pool to mirror using attach",
    description:
      "Attach a second disk to turn a single-disk pool into a mirror.",
    content: `[root@solaris ~]# zpool attach mypool c2t1d0 c2t2d0
#               pool     old-disk  new-disk

[root@solaris ~]# zpool status mypool
  pool: mypool
 state: ONLINE
config:

        NAME          STATE
        mypool        ONLINE
          mirror-0    ONLINE
            c2t1d0    ONLINE
            c2t2d0    ONLINE`,
  },
  {
    id: "zpool-detach",
    title: "Detach a disk from a mirror",
    description:
      "Detaching removes the disk and returns the pool to degraded or single state.",
    content: `[root@solaris ~]# zpool detach mypool c2t2d0`,
  },
  {
    id: "zpool-export",
    title: "Export a pool (prepare for moving it to another system)",
    description:
      "Exporting cleanly unmounts filesystems and removes ZFS metadata from memory.",
    content: `[root@solaris ~]# zpool export mypool`,
  },
  {
    id: "zpool-import",
    title: "Import pools available on the system",
    description: "Shows pools found but not yet imported.",
    content: `[root@solaris ~]# zpool import
  pool: mypool
    id: 12345678912345678
 state: ONLINE
 action: The pool can be imported using its name or ID.
 config:
        mypool       ONLINE
          c2t1d0     ONLINE`,
  },
  {
    id: "zpool-import-name",
    title: "Import a pool by name",
    description: "Standard import after an export.",
    content: `[root@solaris ~]# zpool import mypool`,
  },
  {
    id: "zpool-import-D",
    title: "Recover destroyed pools using -D (rewind/remnant detection)",
    description:
      "zpool import -D shows pools that were destroyed OR have corrupted labels.",
    content: `[root@solaris ~]# zpool import -D
  pool: mypool
    id: 12345678912345678
 state: DESTROYED
 action: The pool can be imported using 'zpool import -D mypool'`,
  },
  {
    id: "zpool-status-xv",
    title: "Check pool errors in detail (zpool status -xv)",
    description:
      "-x means 'only show pools with issues', -v provides detailed error logs.",
    content: `[root@solaris ~]# zpool status -xv
all pools are healthy`,
  },
  {
    id: "zpool-clear",
    title: "Clear device errors (zpool clear)",
    description: "Resets error counters after issues have been fixed.",
    content: `[root@solaris ~]# zpool clear mypool`,
  },
  {
    id: "zpool-scrub",
    title: "Start a scrub",
    description:
      "Scrubbing scans all data for silent corruption (checksums) and repairs from redundant copies.",
    content: `[root@solaris ~]# zpool scrub mypool

[root@solaris ~]# zpool status mypool
  scan: scrub in progress, 10.2% done`,
  },
  {
    id: "zpool-history",
    title: "View all ZFS administrative operations",
    description:
      "Shows pool creation, add/remove, scrubs, snapshots, dataset creation, etc.",
    content: `[root@solaris ~]# zpool history
History for 'mypool':
2025-01-10.12:30:11 zpool create mypool c2t1d0
2025-01-10.12:40:15 zpool scrub mypool
2025-01-10.13:00:11 zfs create mypool/data`,
  },
  {
    id: "zpool-destroy",
    title: "Destroy a pool",
    description:
      "WARNING: Destroys all data in the pool. Only use in labs or confirmed migrations.",
    content: `[root@solaris ~]# zpool destroy mypool`,
  },
];

/* ------------------------------------------------------------
   PAGE START
------------------------------------------------------------ */

export default function ZpoolPage() {
  const lesson = solarisLessons.find((l) => l.slug === "zpool") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "ZPOOL Management"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Master ZFS pool management in Solaris including create, destroy, attach, detach, scrub, history and recovery."
          }
        />
      </Head>

      <SolarisLayout activeSlug="zpool">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 17
          </p>
          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            {lesson.title || "ZPOOL – Storage Pool Management"}
          </h1>
          {lesson.short && (
            <p className="mt-1 max-w-2xl text-sm dark:text-slate-300">{lesson.short}</p>
          )}

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
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center text-xs text-slate-400">
              Video for this chapter will appear here.
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
          {/* INTRO THEORY */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              ZPOOL Overview — the foundation of ZFS
            </h2>
            <p>
              A <strong>ZPOOL</strong> is the top-level storage object in ZFS. All
              ZFS filesystems, volumes, snapshots and clones live inside a pool.
            </p>
            <p>
              A pool is built from one or more <strong>vdevs</strong>
              (virtual devices), which determine redundancy:
            </p>
          </section>

          {/* VDEV TYPES */}
          <section className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<FiHardDrive className="text-lg" />}
              title="Single Disk / Stripe"
              text="Fast but no redundancy. Pool is lost if the disk fails."
            />
            <FeatureCard
              icon={<FiDatabase className="text-lg" />}
              title="Mirror (RAID-1)"
              text="Safest for OS/root pools and critical data. Survives 1 disk failure."
            />
            <FeatureCard
              icon={<FiActivity className="text-lg" />}
              title="RAID-Z (1/2/3)"
              text="Parity-based redundancy. Survives 1, 2, or 3 disk failures respectively."
            />
          </section>

          {/* TERMINAL SECTION */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-step ZPOOL commands with examples
            </h2>

            {zpoolSnippets.map((s, i) => (
              <div key={s.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-xs dark:text-slate-300">{s.description}</p>
                <TerminalOutput
                  content={s.content}
                  title="terminal — zpool"
                  contextLabel="solaris-lab"
                  maxHeight="20rem"
                />
              </div>
            ))}
          </section>

          {/* CHEAT SHEET */}
          <section>
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent mb-3">
              Quick ZPOOL Admin Cheat Sheet
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Creation & expansion"
                points={[
                  "zpool create <pool> <disk>",
                  "zpool create <pool> mirror d1 d2",
                  "zpool create <pool> raidz d1 d2 d3",
                  "zpool add <pool> <disk>",
                  "zpool attach <pool> old-disk new-disk",
                  "zpool detach <pool> disk",
                ]}
              />
              <BulletCard
                heading="Maintenance & recovery"
                points={[
                  "zpool scrub <pool>",
                  "zpool clear <pool>",
                  "zpool export <pool>",
                  "zpool import",
                  "zpool import -D  (show destroyed pools)",
                  "zpool import <pool>",
                  "zpool status -xv",
                  "zpool history",
                ]}
              />
            </div>
          </section>

          {/* SAFETY BOX */}
          <section className="rounded-2xl border border-red-500/50 bg-red-500/10 p-4 shadow-lg shadow-red-900/40 space-y-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <FiAlertTriangle /> Critical Safety Notes
            </h2>
            <ul className="list-disc pl-5 text-[13px] dark:text-red-200 space-y-1">
              <li>
                <strong>zpool destroy</strong> will wipe all data instantly —
                use only in labs.
              </li>
              <li>
                When expanding pools, remember redundancy is determined by vdevs,
                not entire pool.
              </li>
              <li>
                RAID-Z vdevs cannot be shrunk or reshaped; plan topology
                carefully.
              </li>
              <li>
                Use <code>zpool scrub</code> regularly to detect silent corruption.
              </li>
            </ul>
            <p className="flex items-center gap-1 text-red-600 text-xs mt-1">
              Next chapter: ZFS datasets, filesystems, quotas, mountpoints and
              snapshots.
              <FiArrowRight />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
