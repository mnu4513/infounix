// pages/course/solaris/zfs-quota-reservation.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";

import {
  FiFolder,
  FiDatabase,
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
   TERMINAL SNIPPETS — QUOTA & RESERVATION
----------------------------------------------------------- */

const quotaSnippets = [
  {
    id: "check-default",
    title: "Check default quota/reservation",
    description: "By default both values are 'none'.",
    content: `[root@solaris ~]# zfs get quota,reservation rpool/projectA
NAME            PROPERTY       VALUE       SOURCE
rpool/projectA  quota          none        default
rpool/projectA  reservation    none        default`,
  },
  {
    id: "set-quota",
    title: "Set dataset quota",
    description:
      "Quota limits how much maximum space the dataset can consume.",
    content: `[root@solaris ~]# zfs set quota=5G rpool/projectA

[root@solaris ~]# zfs get quota rpool/projectA
NAME            PROPERTY  VALUE  SOURCE
projectA        quota     5G     local`,
  },
  {
    id: "set-reservation",
    title: "Set dataset reservation",
    description:
      "Reservation guarantees space for the dataset, even if pool is full.",
    content: `[root@solaris ~]# zfs set reservation=2G rpool/projectA

[root@solaris ~]# zfs get reservation rpool/projectA
NAME            PROPERTY       VALUE  SOURCE
projectA        reservation    2G     local`,
  },
  {
    id: "quota-vs-reservation",
    title: "Observe both quota and reservation",
    description:
      "Dataset has guaranteed 2G minimum and max limit of 5G allowed.",
    content: `[root@solaris ~]# zfs get quota,reservation rpool/projectA
NAME            PROPERTY       VALUE  SOURCE
projectA        quota          5G     local
projectA        reservation    2G     local`,
  },
  {
    id: "remove-quota",
    title: "Remove quota (set to none)",
    description: "Setting to none removes the limit.",
    content: `[root@solaris ~]# zfs set quota=none rpool/projectA`,
  },
  {
    id: "remove-reservation",
    title: "Remove reservation",
    description: "Dataset no longer guarantees reserved space.",
    content: `[root@solaris ~]# zfs set reservation=none rpool/projectA`,
  },
  {
    id: "df-check",
    title: "Verify mount space using df -h",
    description: "df -h reflects quota effect on visible space.",
    content: `[root@solaris ~]# df -h /apps/projectA
Filesystem                       Size   Used   Available   Mounted on
rpool/projectA                   5G     32K       5G       /apps/projectA`,
  },
];

/* -----------------------------------------------------------
   PAGE START
----------------------------------------------------------- */

export default function ZFSQuotaReservationPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "zfs-quota-reservation") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "ZFS Quota and Reservation"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn ZFS quota, reservation, their differences, how to set, remove, and verify them in Solaris."
          }
        />
      </Head>

      <SolarisLayout activeSlug="zfs-quota-reservation">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 19
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            {lesson.title || "ZFS Quota & Reservation"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm text-slate-300">
            Quota restricts the maximum space a dataset can use. Reservation
            guarantees a minimum space that is always set aside. Both are
            powerful ZFS properties that help control disk usage in shared
            environments.
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
          className="space-y-10 text-sm text-slate-200"
        >
          {/* THEORY SECTION */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Understanding Quota and Reservation in ZFS
            </h2>

            <p>
              Both <strong>quota</strong> and <strong>reservation</strong> are
              filesystem-level properties used to control space allocation in
              ZFS datasets.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<FiFolder className="text-xl" />}
                title="Quota"
                text="Quota sets the maximum limit a dataset can consume. It prevents a dataset from growing beyond the assigned size."
              />
              <FeatureCard
                icon={<FiDatabase className="text-xl" />}
                title="Reservation"
                text="Reservation guarantees space even if the pool becomes full. Ensures the dataset always has available capacity."
              />
            </div>
          </section>

          {/* Difference */}
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Difference Between Quota & Reservation
            </h2>

            <BulletCard
              heading="Key Differences"
              points={[
                "Quota caps usage — dataset cannot exceed quota.",
                "Reservation guarantees — ensures dataset always has reserved space.",
                "Quota affects df -h available space.",
                "Reservation reduces pool's free space immediately even if unused.",
                "Both properties can coexist (e.g., reservation=1G, quota=5G).",
              ]}
            />
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              ZFS Quota & Reservation Commands
            </h2>

            {quotaSnippets.map((s, index) => (
              <div key={s.id} className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {s.title}
                </h3>

                <p className="text-xs text-slate-400">{s.description}</p>

                <TerminalOutput
                  content={s.content}
                  title="terminal — zfs quota/reservation"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* CHEAT SHEET */}
          <section>
            <h2 className="text-base font-semibold text-[#ff5b5b] mb-3">
              Quick Cheatsheet
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Common Commands"
                points={[
                  "zfs set quota=5G pool/fs",
                  "zfs set reservation=1G pool/fs",
                  "zfs get quota,reservation pool/fs",
                  "df -h /mountpoint",
                ]}
              />

              <BulletCard
                heading="Remove Limits"
                points={[
                  "zfs set quota=none pool/fs",
                  "zfs set reservation=none pool/fs",
                ]}
              />
            </div>
          </section>

          {/* SAFETY BOX */}
          <section className="rounded-2xl border border-red-500/50 bg-red-500/10 p-4 shadow-lg shadow-red-900/40 space-y-2">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <FiAlertTriangle /> Important Notes
            </h3>

            <ul className="list-disc pl-5 text-[13px] text-red-200 space-y-1">
              <li>
                High reservation values can make the pool appear full even when
                datasets are empty.
              </li>
              <li>
                Quota on root datasets may cause boot issues — apply carefully.
              </li>
              <li>
                Removing reservation does not reclaim space until dataset usage
                is checked.
              </li>
            </ul>

            <p className="flex items-center gap-1 text-xs text-red-200 mt-1">
              Next: ZFS compression, deduplication & performance tuning.
              <FiArrowRight />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
