// pages/course/solaris/ldoms-backup-restore.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiSave, FiRefreshCcw } from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/SolarisLessons";
import BulletCard from "../../../components/solaris/BulletCard";
import FeatureCard from "../../../components/solaris/FeatureCard";
import TerminalOutput from "../../../components/TerminalOutput";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

const backupSnips = [
  {
    title: "Backup all domain bindings to a file",
    desc: "ldm list-bindings -a gives a script-like view that can recreate the setup.",
    content: `[root@primary ~]# ldm list-bindings -a > /var/backups/ldoms-bindings-20250120.txt`,
  },
  {
    title: "Restore configuration on same host",
    desc: "You can feed the binding file back to ldm in a controlled way.",
    content: `[root@primary ~]# ldm init-system
# or apply specific sections (see Oracle docs for version-specific syntax)`,
  },
  {
    title: "Use ZFS snapshots for domain disks",
    desc: "Take ZFS snapshot of domain zvols or datasets before big changes.",
    content: `# Snapshot domain root volume
[root@primary ~]# zfs snapshot rpool/ldoms/ldg1-root@pre_patch

# Rollback if required
[root@primary ~]# zfs rollback rpool/ldoms/ldg1-root@pre_patch`,
  },
];

export default function LdomsBackupRestorePage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "ldoms-backup-restore") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "LDOMs – Backup & Restore"} | InfoUnix
        </title>
      </Head>

      <SolarisLayout activeSlug="ldoms-backup-restore">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">
            Solaris SPARC · LDOMs · Backup
          </p>
          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            Backup & Restore of LDOM Configurations
          </h1>
          <p className="mt-2 max-w-3xl text-sm dark:text-slate-300">
            LDOMs configuration lives in the control domain and on disk. You
            should regularly backup both domain configuration and guest storage
            so you can rebuild or move environments when required.
          </p>
          <div className="mt-3 h-px bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
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
                title={lesson.title || "Installation and Setup"}
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


        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed dark:text-slate-200"
        >
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What to backup?
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<FiSave className="text-lg" />}
                title="Domain config"
                text="Names of domains, CPU/memory allocations, vdisk/vnet mappings (ldm list-bindings)."
              />
              <FeatureCard
                icon={<FiRefreshCcw className="text-lg" />}
                title="Domain data"
                text="Actual OS and application data disks on ZFS or LUNs."
              />
            </div>

            <BulletCard
              heading="Best practice"
              points={[
                "Regularly export domain bindings.",
                "Use ZFS snapshots or backups for each domain root and data filesystems.",
                "Store LDOM config backups with your system documentation.",
              ]}
            />
          </section>

          <section className="space-y-6">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Commands and examples
            </h2>

            {backupSnips.map((s, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-xs dark:text-slate-400">{s.desc}</p>
                <TerminalOutput
                  content={s.content}
                  title="terminal — ldom backup"
                  contextLabel="ldoms-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
