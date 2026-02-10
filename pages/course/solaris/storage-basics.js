// pages/course/solaris/storage-basics.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiHardDrive,
  FiDatabase,
  FiServer,
  FiLayers,
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

/* ---------- Terminal snippets for storage basics ---------- */

const storageSnippets = [
  {
    id: "list-disks-format",
    title: "Discover disks using format (and echo | format trick)",
    description:
      "format is the classic Solaris tool to view disks and labels. Use echo | format when you only want a summary and don’t need the interactive menu.",
    content: `[root@solaris ~]# echo | format
Searching for disks...done

AVAILABLE DISK SELECTIONS:
       0. c0t5000CCA01A2B3C4Dd0 <ATA-ST4000DM000-1F21-AB12-4.00TB>
          /scsi_vhci/disk@g5000cca01a2b3c4d
          /dev/chassis/SYS/HD0/disk
       1. c0t5000CCA01A2B3C4Ed0 <ATA-ST4000DM000-1F21-AB12-4.00TB>
          /scsi_vhci/disk@g5000cca01a2b3c4e
          /dev/chassis/SYS/HD1/disk

Specify disk (enter its number): 
# (format exits immediately because we piped an empty line)

# To enter interactive mode:
[root@solaris ~]# format
Searching for disks...done

AVAILABLE DISK SELECTIONS:
       0. c0t5000CCA01A2B3C4Dd0 <ATA-ST4000DM000-1F21-AB12-4.00TB>
       1. c0t5000CCA01A2B3C4Ed0 <ATA-ST4000DM000-1F21-AB12-4.00TB>
Specify disk (enter its number): 0
selecting c0t5000CCA01A2B3C4Dd0
[disk formatted]
format>`,
  },
  {
    id: "vtoc-vs-efi",
    title: "Check disk label type (VTOC vs EFI)",
    description:
      "Older Solaris used VTOC (for smaller disks); modern systems typically use EFI labels for large disks. You can see label type from format or prtvtoc.",
    content: `# Inside format interactive menu:
format> label
[0] SMI Label
[1] EFI Label
Specify Label type[0]: 1
# (Example only – DO NOT relabel production disks without planning!)

# To see VTOC/partition layout (for VTOC-labelled disk)
[root@solaris ~]# prtvtoc /dev/rdsk/c0t5000CCA01A2B3C4Dd0s2
* /dev/rdsk/c0t5000CCA01A2B3C4Dd0s2 partition map
*
* Dimensions:
*     512 bytes/sector
*  7814037168 sectors
*  7814037120 accessible sectors
*
* Flags:
*  1: unmountable
*  0: mountable
*
*                          First     Sector    Last
* Partition  Tag  Flags    Sector     Count    Sector  Mount Directory
       0      4    00          0 1953504000 1953503999  /
       1      7    00 1953504000 1953504000 3907007999  /u01
       2      5    00          0 7814037120 7814037119  backup`,
  },
  {
    id: "device-names",
    title: "Understand Solaris disk device names",
    description:
      "Solaris uses controller/target identifiers and slices. ZFS usually uses whole disks (s2) or by-id links from /dev/dsk.",
    content: `[root@solaris ~]# ls -l /dev/dsk/c0t5000CCA01A2B3C4Dd0s*
lrwxrwxrwx   1 root root  70 Jan 11 11:00 /dev/dsk/c0t5000CCA01A2B3C4Dd0s0 -> ../../devices/.../c0t5000CCA01A2B3C4Dd0s0
lrwxrwxrwx   1 root root  70 Jan 11 11:00 /dev/dsk/c0t5000CCA01A2B3C4Dd0s1 -> ../../devices/.../c0t5000CCA01A2B3C4Dd0s1
lrwxrwxrwx   1 root root  70 Jan 11 11:00 /dev/dsk/c0t5000CCA01A2B3C4Dd0s2 -> ../../devices/.../c0t5000CCA01A2B3C4Dd0s2

# Notes:
# - c0  = controller 0
# - t... = target (SCSI address / WWN)
# - d0  = disk 0
# - s0, s1, s2 = slices (Solaris partitions)
#   s2 usually represents "whole disk"

# For ZFS pools you normally use the whole disk slice s2 or stable /dev/dsk links.`,
  },
  {
    id: "prepare-for-zpool",
    title: "Checklist before creating a zpool on a disk",
    description:
      "Before using disks for ZFS, make sure they’re not in use by old filesystems, SVM, VXVM, etc. You can double-check with mount, df and format.",
    content: `# 1) Check current filesystems
[root@solaris ~]# df -h
Filesystem             Size   Used  Available Capacity  Mounted on
rpool/ROOT/solaris      40G    10G        30G    25%    /
rpool/export/home       60G    20G        40G    34%    /export/home

# 2) Check if any legacy volume manager is using the disk
# (examples only, commands vary by environment)
[root@solaris ~]# metastat   # Solaris Volume Manager (if used)
[root@solaris ~]# vxprint    # Veritas Volume Manager (if used)

# 3) See disk in format
[root@solaris ~]# echo | format
AVAILABLE DISK SELECTIONS:
       0. c0t5000CCA01A2B3C4Dd0 <4.00TB>
       1. c0t5000CCA01A2B3C4Ed0 <4.00TB>

# For lab/demo, we assume disk 1 is free and will be used for a new zpool later.`,
  },
];

export default function StorageBasicsPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "storage-basics") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Storage Basics in Solaris"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Understand Solaris disk naming, labels, format output and how to prepare disks before creating ZFS zpools."
          }
        />
      </Head>

      <SolarisLayout activeSlug="storage-basics">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 16
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Storage Basics in Solaris"}
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
                title={lesson.title || "Storage Basics in Solaris"}
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
              Why storage basics matter before ZFS
            </h2>
            <p>
              ZFS hides many low-level details, but as a Solaris administrator
              you still need a clear mental model of{" "}
              <span className="font-semibold">
                disks, labels (VTOC/EFI), slices and device names
              </span>{" "}
              before you create zpools.
            </p>
            <p>
              In this lesson, you will learn how to use{" "}
              <code>format</code>, <code>prtvtoc</code> and{" "}
              <code>df</code> to understand your disks and ensure they are safe
              to use for new pools.
            </p>
          </section>

          {/* Concept cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Core storage concepts in Solaris
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiHardDrive className="text-lg" />}
                title="Disks and LUNs"
                text="A disk (or LUN from a SAN) is the basic block device. Solaris presents them with controller/target IDs and slices."
              />
              <FeatureCard
                icon={<FiDatabase className="text-lg" />}
                title="Labels & slices"
                text="Disks are labelled (VTOC or EFI). Labels define slices (s0, s1, s2…) which older tools use; ZFS generally uses whole disk (s2)."
              />
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="From disks to zpools"
                text="ZFS builds zpools on top of one or more whole disks or vdevs. A clean understanding here avoids data loss later."
              />
            </div>
          </section>

          {/* Terminals */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-step storage discovery commands
            </h2>
            <p>
              Use these examples on your lab system to identify free disks for
              ZFS. Never relabel or destroy disks on production systems without
              a clear plan and backups.
            </p>

            {storageSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs dark:text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — storage"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* Summary / cheat sheet */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Small cheat sheet – storage discovery
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Key commands"
                points={[
                  "echo | format → quick disk list (non-interactive).",
                  "format → full interactive disk tool (labels, geometry, etc.).",
                  "prtvtoc /dev/rdsk/cXtYdZs2 → view VTOC partition map.",
                  "df -h → see mounted filesystems (what is already in use).",
                  "metastat / vxprint → check if SVM/Veritas are using disks (if installed).",
                ]}
              />
              <BulletCard
                heading="Before using a disk for ZFS"
                points={[
                  "Confirm it is not part of root pool (rpool) or any mounted filesystem.",
                  "Confirm it’s not used by SVM, Veritas or any hardware RAID you don’t intend to touch.",
                  "Make a note of the device path (/dev/dsk/...) you will use for zpool create.",
                  "If necessary, plan whether to use whole disk (s2) or a slice (older practices).",
                ]}
              />
            </div>
          </section>

          {/* Safety box */}
          <section className="space-y-3 rounded-2xl border border-amber-500/60 bg-amber-500/10 p-4 shadow-lg shadow-amber-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-600">
              <FiAlertTriangle className="text-base" />
              Storage safety tips before ZFS work
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-amber-50">
              <li>
                Never run <code>format</code> → <code>label</code> or{" "}
                <code>zpool create</code> on a disk unless you are 100% sure it
                is free. These operations can destroy data.
              </li>
              <li>
                Prefer to do dangerous operations from a console/IPMI session,
                not over SSH, in case you drop the management network.
              </li>
              <li>
                Always take screenshots or notes of <code>format</code> and{" "}
                <code>zpool status</code> for documentation and recovery.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-amber-600">
              In the next lessons, we will build on this foundation to create
              zpools and ZFS filesystems confidently.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
