// pages/course/solaris/pre-post-check.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/SolarisLessons";
import TerminalOutput from "../../../components/TerminalOutput";
import FeatureCard from "../../../components/solaris/FeatureCard";
import BulletCard from "../../../components/solaris/BulletCard";
import {
  FiList,
  FiCheckCircle,
  FiAlertTriangle,
  FiCpu,
  FiServer,
  FiDatabase,
  FiHardDrive,
} from "react-icons/fi";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5 },
  },
});

const prechecks = [
  {
    title: "OS Version",
    command: "uname -a",
  },
  {
    title: "Boot Environments",
    command: "beadm list",
  },
  {
    title: "IPS Image Version",
    command: "pkg list -v entire",
  },
  {
    title: "Repository / Publisher",
    command: "pkg publisher",
  },
  {
    title: "Failed Services",
    command: "svcs -xv",
  },
  {
    title: "System Logs",
    command: "tail -100 /var/adm/messages",
  },
  {
    title: "Disk Space",
    command: "df -h",
  },
  {
    title: "CPU / Memory Load",
    command: "prstat -a",
  },
  {
    title: "Network Interfaces",
    command: "ipadm show-if; dladm show-link",
  },
  {
    title: "ZFS Pool Health",
    command: "zpool status -xv",
  },
  {
    title: "ZFS Filesystem Status",
    command: "zfs list",
  },
];

const postchecks = [
  {
    title: "Confirm OS Level",
    command: "uname -a",
  },
  {
    title: "Confirm Active Boot Environment",
    command: "beadm list",
  },
  {
    title: "Confirm Entire Package Level",
    command: "pkg list -v entire",
  },
  {
    title: "Check failed services",
    command: "svcs -xv",
  },
  {
    title: "Confirm Application Status",
    command: "svcs -a | grep app",
  },
  {
    title: "Verify /var/adm/messages",
    command: "tail -100 /var/adm/messages",
  },
  {
    title: "Check Pool & Filesystem Health",
    command: "zpool status -xv; zfs list",
  },
  {
    title: "Check Network Reachability",
    command: "ping <gateway>; netstat -rn",
  },
  {
    title: "Check system load",
    command: "prstat -a",
  },
];

export default function PrePostCheck() {
  const lesson = solarisLessons.find((l) => l.slug === "pre-post-check") || {};

  return (
    <>
      <Head>
        <title>Pre & Post Check in Solaris | InfoUnix</title>
      </Head>

      <SolarisLayout activeSlug="pre-post-check">
        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">Solaris · Lesson 25</p>

          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            Pre-Check & Post-Check in Solaris
          </h1>

          <p className="mt-2 max-w-3xl text-sm dark:text-slate-300">
            Pre-check ensures the system is healthy before patching or reboot.
            Post-check validates the server is stable after patching, SRU updates,
            migrations, or maintenance work. This is a mandatory skill for every Solaris administrator.
          </p>

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

        {/* WHAT / WHY / HOW */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.05)}
        >
          <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            What is Pre-Check & Post-Check?
          </h2>
          <p className="text-sm dark:text-slate-300 mt-2">
            A **pre-check** verifies that the system is in a stable and supportable state
            *before* making changes such as:
          </p>

          <ul className="list-disc pl-5 mt-2 dark:text-slate-300 text-sm">
            <li>Patching (SRU upgrades)</li>
            <li>Critical changes</li>
            <li>Reboot / kernel updates</li>
            <li>Application upgrades</li>
          </ul>

          <p className="text-sm dark:text-slate-300 mt-3">
            A **post-check** confirms that everything is working correctly
            *after* the patch or reboot.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <FeatureCard
              icon={<FiList />}
              title="What"
              text="A structured list of health checks done before & after changes."
            />
            <FeatureCard
              icon={<FiAlertTriangle />}
              title="Why"
              text="To catch issues early and avoid failed boot or broken apps."
            />
            <FeatureCard
              icon={<FiCheckCircle />}
              title="How"
              text="Using standard Solaris commands for system validation."
            />
          </div>
        </motion.section>

        {/* PRE CHECKS */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="mt-10"
        >
          <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent mb-3">
            Pre-Check — Detailed Before Patching / Reboot
          </h2>

          <div className="space-y-5">
            {prechecks.map((item, index) => (
              <div key={index}>
                <p className="font-semibold dark:text-slate-200 text-sm">
                  {index + 1}. {item.title}
                </p>
                <TerminalOutput
                  content={item.command}
                  title="pre-check"
                  contextLabel="solaris-lab"
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* POST CHECKS */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.15)}
          className="mt-10"
        >
          <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent mb-3">
            Post-Check — After Patching / Reboot
          </h2>

          <div className="space-y-5">
            {postchecks.map((item, index) => (
              <div key={index}>
                <p className="font-semibold dark:text-slate-200 text-sm">
                  {index + 1}. {item.title}
                </p>
                <TerminalOutput
                  content={item.command}
                  title="post-check"
                  contextLabel="solaris-lab"
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* SUMMARY BLOCK */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.2)}
          className="mt-10 rounded-2xl border border-amber-500/60 bg-amber-500/10 p-4 shadow-lg shadow-amber-900/40"
        >
          <h2 className="text-sm font-semibold text-amber-700 flex items-center gap-2">
            <FiCheckCircle /> Summary — Must Do Before & After Any Change
          </h2>

          <ul className="list-disc pl-5 mt-2 dark:text-amber-100 text-sm">
            <li>Collect OS, BE, repo, service health before patching.</li>
            <li>Confirm no failed services in pre-check.</li>
            <li>After patching, verify OS level + BE has changed.</li>
            <li>Check apps, network, disk space, pools, logs.</li>
            <li>Document pre & post check results for compliance.</li>
          </ul>
        </motion.section>
      </SolarisLayout>
    </>
  );
}
