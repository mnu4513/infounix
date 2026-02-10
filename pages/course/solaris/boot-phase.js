// pages/course/solaris/boot-phase.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiLayers,
  FiActivity,
  FiAlertTriangle,
  FiTerminal,
  FiArrowRight,
} from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/solarisLessons";
import TerminalOutput from "../../../components/TerminalOutput";
import FeatureCard from "../../../components/solaris/FeatureCard";
import BulletCard from "../../../components/solaris/BulletCard";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.55 },
  },
});

/* ---------- Terminal Snippets ---------- */

const bootSnips = [
  {
    title: "Check boot messages",
    desc: "Boot messages are stored in /var/adm/messages and dmesg output.",
    content: `[root@solaris ~]# dmesg | more
root@solaris # grep -i error /var/adm/messages`,
  },
  {
    title: "Check SMF service failures",
    desc: "Use svcs -xv to check which service is preventing boot.",
    content: `[root@solaris ~]# svcs -xv`,
  },
  {
    title: "List boot environments",
    desc: "Boot environments allow safe rollback during patching.",
    content: `[root@solaris ~]# beadm list`,
  },
  {
    title: "Boot to previous BE from GRUB",
    desc: "Useful if current BE is corrupted.",
    content: `{0} ok boot -L
{0} ok boot BE_name`,
  },
  {
    title: "Check current milestone",
    desc: "Milestones represent boot targets similar to run levels.",
    content: `[root@solaris ~]# svcs milestone/multi-user-server`,
  },
];

/* ---------- Breakdown Components ---------- */

const bootStages = [
  {
    title: "1. Firmware Phase",
    subtitle: "SP → OBP (OpenBoot PROM) / BIOS",
    points: [
      "System starts with SP/BIOS performing POST (hardware checks).",
      "On SPARC: OBP handles device discovery & provides ok prompt.",
      "On x86: BIOS/UEFI loads boot loader.",
    ],
  },
  {
    title: "2. Boot Loader Phase (GRUB)",
    subtitle: "Loads kernel + boot archive",
    points: [
      "GRUB loads unix kernel & boot archive from rpool/boot.",
      "Multiple Boot Environments (BEs) appear in GRUB menu.",
      "Kernel parameters can be modified in GRUB console.",
    ],
  },
  {
    title: "3. Kernel Phase",
    subtitle: "Kernel initializes hardware & root filesystem",
    points: [
      "Kernel loads drivers (device tree built).",
      "Mounts root filesystem from ZFS dataset rpool/ROOT/be_name.",
      "Starts /sbin/init (or SMF bootstrap).",
    ],
  },
  {
    title: "4. SMF Bootstrap Phase",
    subtitle: "Service Management Facility starts",
    points: [
      "SMF repository imported.",
      "core services start: svc:/system/filesystem/*, svc:/system/device/*",
      "Milestones begin progressing.",
    ],
  },
  {
    title: "5. SMF Milestones",
    subtitle: "Replacement for run levels",
    points: [
      "milestone/single-user = Run Level S",
      "milestone/multi-user = Run Level 2",
      "milestone/multi-user-server = Run Level 3",
    ],
  },
  {
    title: "6. Multi-User Mode",
    subtitle: "System ready for users & applications",
    points: [
      "Network initialized.",
      "NFS, SSH, name services, applications start.",
      "Login prompt appears.",
    ],
  },
];

export default function BootPhase() {
  const lesson = solarisLessons.find((l) => l.slug === "boot-phase") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Boot Phase in Solaris"} | Solaris Course | InfoUnix
        </title>
      </Head>

      <SolarisLayout activeSlug="boot-phase">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">
            Solaris · Boot Mechanics
          </p>

          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            Solaris Boot Phase – Complete Deep Dive
          </h1>

          <p className="mt-2 max-w-3xl text-sm dark:text-slate-300">
            Solaris booting starts from firmware (SP/BIOS), goes through GRUB
            bootloader, kernel initialization, and ends in SMF milestones.
            Understanding each phase is essential for troubleshooting boot
            issues and recovering broken systems.
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

        
        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm dark:text-slate-200 leading-relaxed"
        >
          {/* STAGES */}
          <section>
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Solaris Boot Phases Explained
            </h2>
            <p className="mt-2 dark:text-slate-300">
              From power-on until login prompt, Solaris passes through six
              well-defined phases. Each phase can fail independently and is
              useful for troubleshooting.
            </p>

            <div className="grid gap-5 mt-5 md:grid-cols-2">
              {bootStages.map((stage, idx) => (
                <FeatureCard
                  key={idx}
                  icon={<FiLayers />}
                  title={`${stage.title}`}
                  text=""
                >
                  <p className="text-xs text-slate-300 italic">
                    {stage.subtitle}
                  </p>
                  <ul className="mt-2 list-disc text-[11px] pl-4 text-slate-400">
                    {stage.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </FeatureCard>
              ))}
            </div>
          </section>

          {/* TERMINAL SNIPPETS */}
          <section>
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Important Boot Troubleshooting Commands
            </h2>

            {bootSnips.map((snip, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-sm font-semibold dark:text-slate-200">
                  {snip.title}
                </h3>
                <p className="text-xs dark:text-slate-400 mb-2">{snip.desc}</p>
                <TerminalOutput
                  content={snip.content}
                  title="boot-phase"
                  contextLabel="solaris-lab"
                  maxHeight="16rem"
                />
              </div>
            ))}
          </section>

          {/* SMF SECTION */}
          <section>
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              How SMF (Service Management Facility) Controls Boot
            </h2>

            <BulletCard
              heading="SMF Boot Logic"
              points={[
                "SMF imports repository → starts core services",
                "Services have dependencies defined in XML manifests",
                "If one service fails, milestone cannot progress",
                "Run levels map to SMF milestones:",
                "  S → milestone/single-user",
                "  2 → milestone/multi-user",
                "  3 → milestone/multi-user-server",
              ]}
            />

            <TerminalOutput
              content={`# Debug SMF services
[root@solaris ~]# svcs -xv`}
              title="smf-check"
            />
          </section>

          {/* SAFETY SECTION */}
          <section className="rounded-2xl border border-red-500/50 bg-red-500/10 p-4 shadow-lg shadow-red-900/50">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <FiAlertTriangle /> Common Boot Problems
            </h2>
            <ul className="list-disc dark:text-red-200 text-[13px] pl-5 mt-2 space-y-1">
              <li>Corrupted boot archive</li>
              <li>SMF service dependency failure</li>
              <li>Failed kernel driver load</li>
              <li>Filesystem corruption (ZFS issues)</li>
              <li>Wrong BE activated</li>
            </ul>

            <TerminalOutput
              content={`# Rebuild boot archive
[root@solaris ~]# bootadm update-archive -v`}
            />

            <p className="mt-2 text-[12px] text-red-600 flex items-center gap-1">
              Knowing these phases makes Solaris boot troubleshooting far easier.
              <FiArrowRight />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
