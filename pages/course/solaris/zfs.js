// pages/course/solaris/zfs.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";

import {
  FiFolder,
  FiFileText,
  FiDatabase,
  FiColumns,
  FiCloudLightning,
  FiAlertTriangle,
  FiHardDrive,
  FiArchive,
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
   TERMINAL SNIPPETS — ZFS COMMANDS
----------------------------------------------------------- */

const zfsSnippets = [
  {
    id: "zfs-list",
    title: "List all ZFS datasets (zfs list)",
    description:
      "Shows all datasets, mountpoints, and usage. Most important command for day-to-day checks.",
    content: `[root@solaris ~]# zfs list
NAME                 USED  AVAIL  REFER  MOUNTPOINT
rpool                12G    48G    32K   legacy
rpool/ROOT           10G    48G    32K   legacy
rpool/ROOT/solaris   10G    48G    10G   /
rpool/export         1.5G   48G    32K   /export
rpool/export/home    1.5G   48G   1.5G   /export/home`,
  },
  {
    id: "zfs-create",
    title: "Create a dataset (filesystem)",
    description:
      "Datasets are lightweight and instant. ZFS encourages creating many small datasets.",
    content: `[root@solaris ~]# zfs create rpool/testdata

[root@solaris ~]# zfs list rpool/testdata
NAME              USED  AVAIL  REFER  MOUNTPOINT
rpool/testdata     32K    48G    32K  /rpool/testdata`,
  },
  {
    id: "zfs-destroy",
    title: "Destroy a dataset",
    description:
      "Deletes dataset and its data instantly. Cannot destroy if children exist.",
    content: `[root@solaris ~]# zfs destroy rpool/testdata`,
  },
  {
    id: "zfs-mountpoint-none",
    title: "Disable mountpoint",
    description:
      "Useful when using dataset for raw backup, clones, volumes or other non-filesystem purposes.",
    content: `[root@solaris ~]# zfs set mountpoint=none rpool/projectA`,
  },
  {
    id: "zfs-mountpoint-set",
    title: "Set custom mountpoint",
    description:
      "When you want dataset mounted somewhere else than default path.",
    content: `[root@solaris ~]# zfs set mountpoint=/apps/projectA rpool/projectA

[root@solaris ~]# df -h /apps/projectA
Filesystem                  Size  Used  Available  Capacity  Mounted on
rpool/projectA               48G  32K        48G        1%   /apps/projectA`,
  },
  {
    id: "zfs-get-all",
    title: "View all ZFS properties (zfs get all)",
    description: "Shows 100+ tunables including compression, quota, checksum.",
    content: `[root@solaris ~]# zfs get all rpool/projectA | head
NAME                PROPERTY                VALUE        SOURCE
rpool/projectA      type                    filesystem   -
rpool/projectA      creation                Fri Jan 10    -
rpool/projectA      used                    32K          -
rpool/projectA      available               48G          -
rpool/projectA      mountpoint              /apps/projectA  local
rpool/projectA      compression             off          default`,
  },
  {
    id: "zfs-quota",
    title: "Set quota and reservation",
    description: "Quota = max size allowed. Reservation = guaranteed space.",
    content: `[root@solaris ~]# zfs set quota=5G rpool/projectA
[root@solaris ~]# zfs set reservation=1G rpool/projectA

[root@solaris ~]# zfs get quota,reservation rpool/projectA
NAME            PROPERTY       VALUE  SOURCE
projectA        quota          5G     local
projectA        reservation    1G     local`,
  },
  {
    id: "zfs-compression",
    title: "Enable compression",
    description:
      "lz4 is fast, safe and recommended for almost all datasets. Saves space.",
    content: `[root@solaris ~]# zfs set compression=lz4 rpool/logs

[root@solaris ~]# zfs get compression rpool/logs
NAME        PROPERTY     VALUE  SOURCE
rpool/logs  compression  lz4    local`,
  },
  {
    id: "zfs-snapshot",
    title: "Create a snapshot",
    description:
      "Snapshots are read-only and almost instant. Perfect for backups and rollbacks.",
    content: `[root@solaris ~]# zfs snapshot rpool/projectA@before_changes

[root@solaris ~]# zfs list -t snapshot
NAME                             USED  AVAIL  REFER  MOUNTPOINT
rpool/projectA@before_changes     0B      -    32K   -`,
  },
  {
    id: "zfs-rollback",
    title: "Rollback to snapshot",
    description:
      "Reverts dataset to exact state at snapshot. WARNING: destroys newer data.",
    content: `[root@solaris ~]# zfs rollback rpool/projectA@before_changes`,
  },
  {
    id: "zfs-clone",
    title: "Clone a snapshot",
    description:
      "Clones are writable datasets created from snapshots. Excellent for development/testing.",
    content: `[root@solaris ~]# zfs clone rpool/projectA@before_changes rpool/projectA_clone

[root@solaris ~]# zfs list
rpool/projectA_clone     32K     5G      32K     /rpool/projectA_clone`,
  },
  {
    id: "zfs-send-recv",
    title: "Backup and restore using send/receive",
    description: "Most powerful backup tool for ZFS.",
    content: `# Full backup
[root@solaris ~]# zfs send rpool/projectA@before_changes > backup.zfs

# Restore on same or different server
[root@solaris ~]# zfs receive rpool/projectA_restored < backup.zfs`,
  },
  {
    id: "df",
    title: "Verify mountpoints using df -h",
    description:
      "df makes it clear which dataset is mounted where and how much space it uses.",
    content: `[root@solaris ~]# df -h
Filesystem                     Size   Used  Available  Capacity  Mounted on
rpool/projectA                  5G     32K       5G        1%    /apps/projectA
rpool/projectA_clone            5G     32K       5G        1%    /rpool/projectA_clone`,
  },
];

/* -----------------------------------------------------------
   PAGE
----------------------------------------------------------- */

export default function ZFSPage() {
  const lesson = solarisLessons.find((l) => l.slug === "zfs") || {};

  return (
    <>
      <Head>
        <title>{lesson.title || "ZFS Administration"} | Solaris Course | InfoUnix</title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn ZFS dataset management including create/destroy, mountpoints, quotas, compression, snapshots and clones."
          }
        />
      </Head>

      <SolarisLayout activeSlug="zfs">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 18
          </p>

          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            {lesson.title || "ZFS Filesystem & Dataset Management"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm dark:text-slate-300">
            ZFS datasets are lightweight, flexible filesystems that support
            compression, quotas, reservations, snapshots, clones and seamless
            mountpoint control. This chapter teaches everything.
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
          {/* SECTION: THEORY */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is a ZFS Dataset?
            </h2>
            <p>
              A ZFS dataset is a flexible filesystem OR volume created inside a
              <strong> ZPOOL</strong>. Datasets support advanced features:
            </p>
          </section>

          {/* INFO CARDS */}
          <section className="grid gap-4 md:grid-cols-3">
            <FeatureCard
              icon={<FiFolder className="text-xl" />}
              title="Filesystem Dataset"
              text="Default dataset type. Mounts into the filesystem tree and stores files."
            />

            <FeatureCard
              icon={<FiDatabase className="text-xl" />}
              title="ZFS Volume"
              text="Block device dataset used for Oracle DB, iSCSI, or raw storage."
            />

            <FeatureCard
              icon={<FiArchive className="text-xl" />}
              title="Snapshots & Clones"
              text="Instant copy-on-write snapshots and writable clones without needing extra space."
            />
          </section>

          {/* SECTION: TERMINAL OUTPUTS */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              ZFS Dataset Commands with Examples
            </h2>

            {zfsSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-1">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs dark:text-slate-400">{snippet.description}</p>

                <TerminalOutput
                  content={snippet.content}
                  title="terminal — zfs"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* CHEAT SHEET */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Quick ZFS Dataset Cheat Sheet
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Dataset Management"
                points={[
                  "zfs list — list datasets",
                  "zfs create pool/fs — create filesystem",
                  "zfs destroy pool/fs — destroy filesystem",
                  "zfs get all pool/fs — show all properties",
                ]}
              />

              <BulletCard
                heading="Dataset Tuning"
                points={[
                  "zfs set mountpoint=/dir pool/fs",
                  "zfs set compression=lz4 pool/fs",
                  "zfs set quota=10G pool/fs",
                  "zfs set reservation=1G pool/fs",
                ]}
              />
            </div>
          </section>

          {/* SAFETY BOX */}
          <section className="rounded-2xl border border-red-500/60 bg-red-500/10 p-4 space-y-2 shadow-md shadow-red-900/40">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <FiAlertTriangle /> Important Safety Notes
            </h3>
            <ul className="list-disc pl-5 text-[13px] dark:text-red-200 space-y-1">
              <li>Destroying datasets instantly removes all data.</li>
              <li>
                Rollback will DELETE all changes made after snapshot creation.
              </li>
              <li>ZFS send/receive backups must be kept safely.</li>
              <li>
                Mountpoint changes can break applications if done during runtime.
              </li>
            </ul>

            <p className="flex items-center gap-1 text-xs text-red-600 mt-1">
              Next chapter: Snapshots & Send/Receive in advanced depth
              <FiArrowRight />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
