// pages/course/solaris/zfs-snapshot.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";

import {
  FiCamera,
  FiArchive,
  FiCopy,
  FiRefreshCcw,
  FiTrash2,
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

/* -----------------------------------------------------------
   TERMINAL SNIPPETS — SNAPSHOT COMMANDS
----------------------------------------------------------- */

const snapshotSnippets = [
  {
    id: "create-snapshot",
    title: "Create a snapshot",
    description:
      "Snapshots are instant and lightweight. They do not consume extra space immediately.",
    content: `[root@solaris ~]# zfs snapshot rpool/projectA@before_changes

[root@solaris ~]# zfs list -t snapshot
NAME                             USED  AVAIL  REFER  MOUNTPOINT
rpool/projectA@before_changes     0B      -    32K   -`,
  },
  {
    id: "recursive-snapshot",
    title: "Create recursive snapshot for dataset + children",
    description:
      "Use -r to snapshot entire dataset tree including all sub-datasets.",
    content: `[root@solaris ~]# zfs snapshot -r rpool/projectA@backup_01

# This creates:
rpool/projectA@backup_01
rpool/projectA/logs@backup_01
rpool/projectA/tmp@backup_01`,
  },
  {
    id: "list-snapshots",
    title: "List all snapshots",
    description: "Snapshots appear with @ suffix.",
    content: `[root@solaris ~]# zfs list -t snapshot
NAME                                   USED  AVAIL  REFER  MOUNTPOINT
rpool/projectA@before_changes           0B      -    32K   -
rpool/projectA/logs@before_changes      0B      -    64K   -`,
  },
  {
    id: "snapshot-space",
    title: "Check snapshot space usage",
    description:
      "Snapshots grow as changes happen in the live dataset. They only store changed blocks.",
    content: `[root@solaris ~]# zfs list -t snapshot
NAME                             USED  AVAIL  REFER  MOUNTPOINT
rpool/projectA@before_changes    120M     -    32K   -`,
  },
  {
    id: "rollback",
    title: "Rollback to a snapshot",
    description:
      "WARNING: deletes all changes made after the snapshot. Not reversible.",
    content: `[root@solaris ~]# zfs rollback rpool/projectA@before_changes`,
  },
  {
    id: "rollback-recursive",
    title: "Recursive rollback",
    description:
      "Roll back entire dataset hierarchy to a recursive snapshot.",
    content: `[root@solaris ~]# zfs rollback -r rpool/projectA@backup_01`,
  },
  {
    id: "destroy-snapshot",
    title: "Destroy a snapshot",
    description:
      "Destroys snapshot immediately. If clone exists, force destroy may be needed.",
    content: `[root@solaris ~]# zfs destroy rpool/projectA@before_changes`,
  },
  {
    id: "destroy-snapshot-recursive",
    title: "Destroy recursive snapshot",
    description:
      "Removes snapshot from parent and all children datasets.",
    content: `[root@solaris ~]# zfs destroy -r rpool/projectA@backup_01`,
  },
];

/* -----------------------------------------------------------
   PAGE START
----------------------------------------------------------- */

export default function ZFSSnapshotPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "zfs-snapshot") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "ZFS Snapshots"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn ZFS snapshot creation, recursive snapshots, rollback, destroy and space usage in Solaris."
          }
        />
      </Head>

      <SolarisLayout activeSlug="zfs-snapshot">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 20
          </p>

          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            {lesson.title || "ZFS Snapshots"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm dark:text-slate-300">
            Snapshots are one of the most powerful ZFS features. They are
            instant, lightweight and perfect for backups, rollbacks and cloning.
            In this lesson you will learn how snapshots work internally and how
            to manage them safely.
          </p>

          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#ff5b5b] to-transparent" />
        </motion.header>

        {/* VIDEO */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.05)}
          className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl"
        >
          {lesson.videoUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your video embed URL in solarisLessons.js.
            </div>
          )}
        </motion.div>

        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm dark:text-slate-200"
        >
          {/* THEORY SECTION */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is a ZFS Snapshot?
            </h2>

            <p>
              A ZFS snapshot is a <strong>read-only, point-in-time</strong> copy
              of a dataset. It is created instantly without copying data because
              of ZFS’s <strong>copy-on-write (COW)</strong> mechanism.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiCamera className="text-xl" />}
                title="Instant"
                text="Snapshots take microseconds to create, regardless of dataset size."
              />
              <FeatureCard
                icon={<FiArchive className="text-xl" />}
                title="Space Efficient"
                text="Snapshots consume space only when changes occur after snapshot creation."
              />
              <FeatureCard
                icon={<FiRefreshCcw className="text-xl" />}
                title="Rollback Capable"
                text="Rollback instantly reverts dataset to exact snapshot state."
              />
            </div>
          </section>

          {/* WHEN TO USE SNAPSHOTS */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              When Should You Use ZFS Snapshots?
            </h2>

            <BulletCard
              heading="Ideal Use Cases"
              points={[
                "Before making major configuration changes.",
                "Before software updates or patching.",
                "Before migrations and testing tasks.",
                "For versioning dev/test environments.",
                "For backups using send/receive.",
              ]}
            />
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              ZFS Snapshot Commands with Examples
            </h2>

            {snapshotSnippets.map((s, index) => (
              <div key={s.id} className="space-y-1">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {s.title}
                </h3>

                <p className="text-xs dark:text-slate-400">{s.description}</p>

                <TerminalOutput
                  content={s.content}
                  title="terminal — zfs snapshot"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* CHEAT SHEET */}
          <section>
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent mb-3">
              Snapshot Command Cheat Sheet
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Snapshot Management"
                points={[
                  "zfs snapshot pool/fs@snap",
                  "zfs snapshot -r pool/fs@snap",
                  "zfs list -t snapshot",
                  "zfs destroy pool/fs@snap",
                  "zfs destroy -r pool/fs@snap",
                ]}
              />

              <BulletCard
                heading="Rollback & Restore"
                points={[
                  "zfs rollback pool/fs@snap",
                  "zfs rollback -r pool/fs@snap",
                ]}
              />
            </div>
          </section>

          {/* SAFETY BOX */}
          <section className="rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40 space-y-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <FiAlertTriangle /> Important Notes
            </h3>

            <ul className="list-disc pl-5 text-[13px] dark:text-red-200 space-y-1">
              <li>
                Rollback DELETES all data created after snapshot (be careful).
              </li>
              <li>
                Snapshots cannot be mounted directly; use clone if writable copy
                is needed.
              </li>
              <li>
                Snapshots use space as data changes — monitor their growth.
              </li>
              <li>
                Destroying a snapshot used by clones requires force delete.
              </li>
            </ul>

            <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
              Next: ZFS clone & send/receive for enterprise-grade backups.
              <FiArrowRight />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
