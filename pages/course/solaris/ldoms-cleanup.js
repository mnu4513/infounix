// pages/course/solaris/ldoms-cleanup.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiTrash2, FiAlertTriangle } from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/SolarisLessons";
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

const cleanupSnips = [
  {
    title: "Stop and unbind a guest domain",
    desc: "Before removal, halt and unbind the domain.",
    content: `[root@primary ~]# ldm stop ldg1
[root@primary ~]# ldm unbind ldg1`,
  },
  {
    title: "Remove vdisks and vnets",
    desc: "Detach front-end devices from guest.",
    content: `[root@primary ~]# ldm list -l ldg1 | egrep 'VDISK|VNET'

# Example:
[root@primary ~]# ldm remove-vdisk dvd0 ldg1
[root@primary ~]# ldm remove-vdisk vdisk0 ldg1
[root@primary ~]# ldm remove-vnet vnet0 ldg1`,
  },
  {
    title: "Delete the guest domain",
    desc: "Once devices removed, delete the domain definition.",
    content: `[root@primary ~]# ldm remove-domain ldg1`,
  },
  {
    title: "Remove backend vdsdev and ZFS volumes",
    desc: "Clean up backend resources on service domain.",
    content: `# Remove backend device from vds
[root@primary ~]# ldm remove-vdsdev ldg1-root@primary-vds0

# Destroy ZFS volume
[root@primary ~]# zfs destroy rpool/ldoms/ldg1-root`,
  },
];

export default function LdomsCleanupPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "ldoms-cleanup") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "LDOMs – Removing Domains & Services"} | InfoUnix
        </title>
      </Head>

      <SolarisLayout activeSlug="ldoms-cleanup">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">
            Solaris SPARC · LDOMs · Cleanup
          </p>
          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            Removing LDOMs & Virtual Services
          </h1>
          <p className="mt-2 max-w-3xl text-sm dark:text-slate-300">
            When a guest is no longer needed, you should remove it cleanly:
            shut down, detach virtual devices, delete the domain and clean up
            backend storage. This avoids orphaned configs and wasted space.
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
              High-level removal steps
            </h2>
            <BulletCard
              heading="Order of operations"
              points={[
                "Stop and unbind domain.",
                "Remove vdisks and vnets from domain.",
                "Remove backend vdsdev from service domain.",
                "Delete domain.",
                "Destroy ZFS volumes if no longer needed.",
              ]}
            />
          </section>

          <section className="space-y-6">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Commands and example
            </h2>

            {cleanupSnips.map((s, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-xs dark:text-slate-400">{s.desc}</p>
                <TerminalOutput
                  content={s.content}
                  title="terminal — ldom cleanup"
                  contextLabel="ldoms-lab"
                  maxHeight="16rem"
                />
              </div>
            ))}
          </section>

          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <FiAlertTriangle className="text-base" />
              Be careful before deleting
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-red-100">
              <li>Take backups or snapshots if there is any chance of reuse.</li>
              <li>Double-check domain name; do not remove the wrong guest.</li>
              <li>Verify no other domains use the same backend ZFS volume.</li>
            </ul>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
