// pages/course/solaris/kernel-zones-migration-clone.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiLayers,
  FiCopy,
  FiShare2,
  FiAlertTriangle,
  FiServer,
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

/* ---------- TERMINAL SNIPPETS ---------- */

const kzMigSnippets = [
  {
    id: "list-kz",
    title: "Check existing kernel zones",
    description:
      "Start by listing all zones and identifying kernel zones (brand solaris-kz).",
    content: `[root@hostA ~]# zoneadm list -cv
  ID NAME             STATUS     PATH                           BRAND       IP
   0 global           running    /                              solaris     shared
   1 kz-app01         running    /system/zones/kz-app01         solaris-kz  excl
   - kz-test          installed  /system/zones/kz-test          solaris-kz  excl`,
  },
  {
    id: "clone-kz",
    title: "Clone kernel zone on the same host",
    description:
      "Cloning is useful for creating a copy of an existing zone (lab, testing, pre-change snapshot-style copy).",
    content: `# Syntax: zoneadm -z NEWZONE clone SOURCEZONE

[root@hostA ~]# zoneadm -z kz-app01-clone clone kz-app01
A ZFS clone of the zonepath has been created.

# Verify
[root@hostA ~]# zoneadm list -cv
  ID NAME             STATUS     PATH                           BRAND       IP
   0 global           running    /                              solaris     shared
   1 kz-app01         running    /system/zones/kz-app01         solaris-kz  excl
   - kz-app01-clone   installed  /system/zones/kz-app01-clone   solaris-kz  excl

# Boot the clone
[root@hostA ~]# zoneadm -z kz-app01-clone boot

[root@hostA ~]# zlogin -C kz-app01-clone
# Change hostname, IP, etc. inside the clone as needed.`,
  },
  {
    id: "detach-kz",
    title: "Detach kernel zone before moving to another host",
    description:
      "Detach marks the zone as exported; you then replicate the zone dataset to the target host (e.g. via ZFS send/receive).",
    content: `[root@hostA ~]# zoneadm -z kz-app01 halt

[root@hostA ~]# zoneadm -z kz-app01 detach
Zone 'kz-app01' is now detached.

# Now replicate the underlying ZFS dataset (example, actual pool/dataset may differ):
[root@hostA ~]# zfs list | grep kz-app01
rpool/system/zones/kz-app01      10G   100G   10G  /system/zones/kz-app01

# Send to remote host (simplified example)
[root@hostA ~]# zfs send rpool/system/zones/kz-app01@snap-move | \
                   ssh root@hostB zfs receive rpool/system/zones/kz-app01`,
  },
  {
    id: "attach-kz",
    title: "Attach kernel zone on target host",
    description:
      "After the dataset is available on target host, attach the zone there.",
    content: `# On hostB:

[root@hostB ~]# zonecfg -z kz-app01
zonecfg:kz-app01> create -a /system/zones/kz-app01
zonecfg:kz-app01> exit

# Attach and verify (zonepath already has the dataset)
[root@hostB ~]# zoneadm -z kz-app01 attach -F
Zone 'kz-app01' attached.

[root@hostB ~]# zoneadm list -cv
  ID NAME             STATUS     PATH                           BRAND       IP
   0 global           running    /                              solaris     shared
   - kz-app01         installed  /system/zones/kz-app01         solaris-kz  excl

# Boot on hostB
[root@hostB ~]# zoneadm -z kz-app01 boot`,
  },
  {
    id: "dry-run-migrate",
    title: "Dry-run kernel zone migration (conceptual)",
    description:
      "On platforms that support live migration, you can dry-run migrate to validate compatibility before moving.",
    content: `# Dry-run migration (syntax can vary by SRU; example only):
[root@hostA ~]# zoneadm -z kz-app01 migrate -n hostB

# If checks pass, run actual migration (may do live or cold depending on config):
[root@hostA ~]# zoneadm -z kz-app01 migrate hostB

# Always refer to 'man zoneadm' for your exact Solaris version for options.`,
  },
];

export default function KernelZonesMigrationClonePage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "kernel-zones-migration-clone") ||
    {};

  return (
    <>
      <Head>
        <title>
          {lesson.title ||
            "Kernel Zones – Clone, Detach/Attach & Migration"}{" "}
          | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to clone kernel zones on the same host, move them between hosts with detach/attach and understand the basics of kernel zone migration."
          }
        />
      </Head>

      <SolarisLayout activeSlug="kernel-zones-migration-clone">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Zones · Advanced
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            {lesson.title ||
              "Kernel Zones – Clone, Detach/Attach & Migration"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm text-slate-300">
            After you know how to create and manage kernel zones, the next step
            is to clone them for testing, and move them between hosts for
            maintenance, DR and hardware refresh. This lesson focuses on
            cloning, detach/attach and the idea of migration for kernel zones.
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
                title={lesson.title || "Kernel Zones Migration & Clone"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your kernel zones migration/clone video URL in{" "}
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
          {/* THEORY: CLONE vs MIGRATION vs DETACH/ATTACH */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Clone, detach/attach and migration – what’s the difference?
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiCopy className="text-lg" />}
                title="Clone"
                text="Create a copy of an existing kernel zone on the same host (new hostname/IP inside). Great for testing or staging."
              />
              <FeatureCard
                icon={<FiShare2 className="text-lg" />}
                title="Detach / Attach"
                text="Move a kernel zone from one host to another by detaching, replicating the dataset and attaching on target."
              />
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="Migration"
                text="On supported platforms, move a running (or powered-off) kernel zone to another host, with pre-checks via dry-run."
              />
            </div>

            <BulletCard
              heading="Why do this?"
              points={[
                "Hardware refresh: move zones to new server.",
                "DR / HA: have the same zone on a secondary host.",
                "Testing: clone production-like zone for lab/testing.",
                "Patching: test new SRU in cloned zone before prod.",
              ]}
            />
          </section>

          {/* PRE-REQS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Pre-requisites and planning
            </h2>
            <BulletCard
              heading="Before clone / detach / migrate"
              points={[
                "Zone must not be in the middle of an install/upgrade.",
                "Have enough storage on target (clone or migration).",
                "Ensure same or compatible CPU features between hosts (for migration).",
                "Network/IP plan done for cloned zones (no duplication).",
                "Backups or ZFS snapshots taken for safety.",
              ]}
            />
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Practical: clone, detach/attach and migration commands
            </h2>

            {kzMigSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — kernel zone migration"
                  contextLabel="solaris-lab"
                  maxHeight="20rem"
                />
              </div>
            ))}
          </section>

          {/* SAFETY / BEST PRACTICES */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <FiAlertTriangle className="text-base" />
              Safety notes for kernel zone clone/migration
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-red-100">
              <li>
                Never have the same zone identity (hostname/IP/app config) live
                in two places in production networks.
              </li>
              <li>
                For detach/attach across hosts, make sure SRU levels are
                supported for that combination (check release notes).
              </li>
              <li>
                Always validate after attach/migrate: boot, network, storage
                mounts, application start.
              </li>
              <li>
                For live migration, test small non-critical zones first before
                trying big production workloads.
              </li>
            </ul>
            <p className="mt-2 text-[12px] text-red-200 flex items-center gap-1">
              Once you understand clone and detach/attach, migration is mostly
              about automating the move and adding pre-checks.
              <FiServer className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
