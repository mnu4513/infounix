// pages/course/solaris/patch-rollback-troubleshooting.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiRotateCcw,
  FiGitBranch,
  FiActivity,
  FiShield,
  FiTerminal,
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

/* ---------- Terminal snippets ---------- */

const rollbackSnippets = [
  {
    id: "issue-1-server-up",
    title: "Scenario 1 – Server is UP but application broken",
    description:
      "Common case: OS patched successfully, but application/library/version issues appear.",
    content: `[root@solaris ~]# uname -a
SunOS sol11 5.11 11.4.76.182.1 i86pc i386 i86pc

# Application errors in logs
[root@solaris ~]# tail -50 /var/adm/messages
...
Jan 20 23:30:01 appserver[1234]: FATAL: Library version mismatch after update
...

# Check current and previous boot environments
[root@solaris ~]# beadm list
BE               Active Mountpoint Space  Policy Created
solaris          -      -          13.0G  static 2024-01-10 10:15
solaris-11_4_76  NR     /          14.5G  static 2025-01-20 23:05

# Decision: rollback to previous BE 'solaris'`,
  },
  {
    id: "rollback-when-up",
    title: "Rollback when server is UP (beadm activate + reboot)",
    description:
      "Safest rollback: switch active BE back to previous version, then reboot cleanly.",
    content: `[root@solaris ~]# beadm list
BE               Active Mountpoint Space  Policy Created
solaris          -      -          13.0G  static 2024-01-10 10:15
solaris-11_4_76  NR     /          14.5G  static 2025-01-20 23:05

# Activate old BE
[root@solaris ~]# beadm activate solaris

# Output:
# Activated successfully.
# On next reboot, 'solaris' will be used as the default boot environment.

[root@solaris ~]# beadm list
BE               Active Mountpoint Space  Policy Created
solaris          R      -          13.0G  static 2024-01-10 10:15
solaris-11_4_76  N      /          14.5G  static 2025-01-20 23:05

# R = will be used on next reboot
# N = currently running BE

# Reboot cleanly:
[root@solaris ~]# init 6`,
  },
  {
    id: "post-rollback-check",
    title: "Verify rollback after reboot",
    description: "Confirm you are back on old BE and validate applications.",
    content: `[root@solaris ~]# uname -a
SunOS sol11 5.11 11.4.41.111.0 i86pc i386 i86pc

[root@solaris ~]# beadm list
BE               Active Mountpoint Space  Policy Created
solaris          NR     /          13.0G  static 2024-01-10 10:15
solaris-11_4_76  -      -          14.5G  static 2025-01-20 23:05

# Check app again
[root@solaris ~]# systemctl status appserver   # or svcs -xv / logs as per environment`,
  },
  {
    id: "issue-2-not-booting",
    title: "Scenario 2 – Server NOT booting after patch (SPARC OBP)",
    description:
      "If OS doesn’t boot properly after patch, use OBP (OpenBoot PROM) boot menu to choose another BE.",
    content: `# SPARC console example:
{0} ok boot
Boot device: /pci@400/pci@0/pci@8/scsi@0/disk@0,0  File and args:
SunOS Release 5.11 Version 11.4 64-bit
...
panic[cpu0]/thread=...: fatal errors during boot

# Drop to OBP again:
{0} ok`,
  },
  {
    id: "boot-L",
    title: "Use boot -L from OBP to list Boot Environments (SPARC)",
    description:
      "boot -L shows available Solaris boot environments; choose the previous known-good BE.",
    content: `{0} ok boot -L

Boot device: /pci@400/pci@0/pci@8/scsi@0/disk@0,0  File and args: -L
1  solaris-11_4_76
2  solaris

Select environment to boot: [ 1 - 2 ]: 2

# Select '2' (old BE 'solaris')
# System now boots using previous BE`,
  },
  {
    id: "devalias",
    title: "Use devalias to inspect boot devices (SPARC)",
    description:
      "If boot device is misconfigured, devalias helps you find correct disk alias.",
    content: `{0} ok devalias
disk      /pci@400/pci@0/pci@8/scsi@0/disk@0,0
disk1     /pci@400/pci@0/pci@8/scsi@0/disk@1,0
net       /pci@400/pci@1/network@0

# To temporarily boot from disk1:
{0} ok boot disk1 -L`,
  },
  {
    id: "x86-be-menu",
    title: "x86: choose Boot Environment from boot menu",
    description:
      "On x86, Solaris presents a boot menu with available BEs (similar to GRUB/loader).",
    content: `Boot Menu:
 1  solaris-11_4_76
 2  solaris

Enter choice: 2

# Select previous BE and boot; then use beadm from the OS to activate permanently if desired.`,
  },
  {
    id: "app-version-conflict",
    title: "Application version conflict after patching",
    description:
      "Typical situation: OS updated, but application not yet certified or library versions changed.",
    content: `# After patching:
[root@solaris ~]# pkg update --accept
...

# App throws version conflict
[root@solaris ~]# tail -50 /var/adm/messages
appX[2345]: ERROR: Requires libxyz.so.1.2, found 1.3

# Strategy:
# 1) If downtime allowed: rollback to previous BE (beadm activate old_BE).
# 2) Or spin up test system with same SRU and work with app vendor.

# Example rollback:
[root@solaris ~]# beadm list
BE               Active Mountpoint Space  Policy Created
solaris          -      -          13.0G  static 2024-01-10 10:15
solaris-11_4_76  NR     /          14.5G  static 2025-01-20 23:05

[root@solaris ~]# beadm activate solaris
[root@solaris ~]# init 6`,
  },
];

/* ---------- Page component ---------- */

export default function PatchRollbackTroubleshootingPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "patch-rollback-troubleshooting") ||
    {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Patch Rollback & Troubleshooting"} | Solaris Course
          | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Troubleshoot patch issues in Solaris 11 and rollback safely using boot environments, OBP boot menu, and beadm."
          }
        />
      </Head>

      <SolarisLayout activeSlug="patch-rollback-troubleshooting">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 24
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            {lesson.title || "Patch Rollback & Troubleshooting in Solaris 11"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm text-slate-300">
            Even with careful planning, patches can break things. This lesson
            shows how to handle two critical scenarios: server not booting after
            patching, and application issues after patching. You will learn how
            to rollback using Boot Environments (BEs) both when the server is up
            and when it is stuck during boot.
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
                title={lesson.title || "Patch Rollback & Troubleshooting"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your rollback/troubleshooting video URL in{" "}
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
          {/* THEORY: BE-based rollback concept */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Theory: Why Solaris patch rollback is BE-centric
            </h2>
            <p>
              In Solaris 11, patching is designed around{" "}
              <span className="font-semibold">Boot Environments (BEs)</span>.
              Instead of overwriting the running root filesystem,{" "}
              <code>pkg update</code> creates a new ZFS clone (new BE), patches
              it, and activates it for the next boot.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiGitBranch className="text-lg" />}
                title="Atomic change"
                text="Old BE remains untouched. New BE contains patched image. Rollback just means booting previous BE."
              />
              <FeatureCard
                icon={<FiRotateCcw className="text-lg" />}
                title="Rollback = BE switch"
                text="You rarely downgrade packages manually. Instead you boot into the older BE where everything was OK."
              />
              <FeatureCard
                icon={<FiShield className="text-lg" />}
                title="Safer patching"
                text="If patch breaks boot or apps, you simply change active BE via beadm or boot menu/OBP."
              />
            </div>
          </section>

          {/* High-level scenarios */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Two main failure scenarios after patching
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="1. Server is UP but something is broken"
                points={[
                  "OS boots successfully into new BE.",
                  "Applications may fail (version conflicts, configs, libs).",
                  "Network/storage services might misbehave.",
                  "You can still log in via SSH or console.",
                ]}
              />
              <BulletCard
                heading="2. Server is NOT booting properly"
                points={[
                  "Kernel panic at boot, stuck in maintenance, or failing before login prompt.",
                  "Use OBP (SPARC) or boot menu (x86) to select older BE.",
                  "After booting old BE, investigate logs and patch causes.",
                ]}
              />
            </div>
          </section>

          {/* TERMINAL EXAMPLES SECTION */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Practical rollback flows – commands & explanation
            </h2>
            <p>
              The following flows cover both situations: rollback when system is
              running, and rollback when system does not boot cleanly.
            </p>

            {rollbackSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-300">{snippet.description}</p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — rollback"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* HOW-TO: choosing approach */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              How to decide rollback approach
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="When server is UP"
                points={[
                  "Prefer clean rollback via beadm activate old_BE + reboot.",
                  "Communicate downtime to stakeholders; schedule maintenance window.",
                  "Keep new BE for later testing (don’t delete immediately).",
                  "Document which SRU caused the issue and inform application team/vendor.",
                ]}
              />
              <BulletCard
                heading="When server is NOT booting"
                points={[
                  "Use SPARC OBP {0} ok boot -L to list BEs and pick previous.",
                  "On x86, use Solaris boot menu to select older BE.",
                  "Once booted into old BE, run beadm list to confirm.",
                  "Optionally deactivate/remove problematic BE once root cause is understood.",
                ]}
              />
            </div>
          </section>

          {/* Safety block */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <FiAlertTriangle className="text-base" />
              Safety tips for patch rollback
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-red-200">
              <li>
                Never run <code>pkg undo</code>-style experiments on production
                unless specifically recommended by Oracle; rely on BEs instead.
              </li>
              <li>
                Avoid deleting old BEs immediately after successful patch;
                retain at least one known-good BE for some time.
              </li>
              <li>
                For mission-critical apps, coordinate with application teams and
                vendors before patching; confirm certified SRU levels.
              </li>
              <li>
                After rollback, collect logs (<code>/var/adm/messages</code>,{" "}
                <code>/var/log</code>, <code>pkg history</code>) to understand
                what went wrong before attempting patch again.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-red-200">
              Once you are comfortable with BEs, patching and rollback in
              Solaris 11 becomes much less scary — it&apos;s basically branch &
              switch rather than manual downgrade.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
