// pages/course/solaris/introduction-to-solaris.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import SolarisLayout from "../../../components/solaris/SolarisLayout";
import FeatureCard from "../../../components/solaris/FeatureCard";
import BulletCard from "../../../components/solaris/BulletCard";
import { solarisLessons } from "../../../components/solaris/SolarisLessons";

import {
  FiShield,
  FiServer,
  FiLayers,
  FiDatabase,
  FiArrowRight,
} from "react-icons/fi";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

export default function IntroductionToSolarisPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "introduction-to-solaris") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Introduction to Solaris"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "High-level introduction to Solaris 11, its key features, and why it is still used in enterprise UNIX environments."
          }
        />
      </Head>

      <SolarisLayout activeSlug="introduction-to-solaris">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 1
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Introduction to Solaris"}
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
                title={lesson.title || "Introduction to Solaris"}
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
          {/* What is Solaris */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is Solaris?
            </h2>
            <p>
              Solaris is an enterprise-grade UNIX operating system originally
              developed by Sun Microsystems and now maintained by Oracle. It is
              designed for stability, scalability and long-running production
              workloads, especially on SPARC servers.
            </p>
            <p>
              You will mostly find Solaris in environments where downtime is
              very costly:{" "}
              <span className="text-sky-300">
                banking, telecom, government, large enterprises
              </span>{" "}
              and legacy datacenters that still run critical applications on
              SPARC hardware.
            </p>
          </section>

          {/* Key features cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold  bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Why do companies still use Solaris?
            </h2>
            <p>
              Even though Linux is more popular now, Solaris still has strong
              features that many enterprises rely on. Think of Solaris as a{" "}
              <span className="text-sky-300">
                specialised, battle-tested UNIX
              </span>{" "}
              made for big, critical systems.
            </p>

            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="Zones & LDOMs"
                text="Built-in virtualization: zones (OS-level) and logical domains (hardware-level) to isolate workloads safely."
              />
              <FeatureCard
                icon={<FiDatabase className="text-lg" />}
                title="ZFS File System"
                text="Powerful filesystem with snapshots, checksums, compression, quotas and easy rollbacks — a huge plus for admins."
              />
              <FeatureCard
                icon={<FiServer className="text-lg" />}
                title="Strong Integration"
                text="Tight integration with SPARC hardware and Oracle stack, giving predictable performance and behaviour."
              />
              <FeatureCard
                icon={<FiShield className="text-lg" />}
                title="Reliability & SMF"
                text="Service Management Facility (SMF) helps keep services healthy and auto-restores failed components."
              />
            </div>
          </section>

          {/* Where do you see Solaris */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold  bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Where will *you* see Solaris as an admin?
            </h2>
            <p>
              If you join an enterprise focused on critical workloads, chances
              are high that you will touch Solaris at some point. Typical places
              where Solaris still runs:
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Banking & Finance"
                points={[
                  "Core banking applications",
                  "Payment switches & reconciliation",
                  "High-availability database servers",
                ]}
              />
              <BulletCard
                heading="Telecom & Networking"
                points={[
                  "Billing systems and mediation servers",
                  "Network management & provisioning apps",
                ]}
              />
              <BulletCard
                heading="Government / PSU"
                points={[
                  "Critical citizen-facing services",
                  "Legacy but stable applications",
                ]}
              />
              <BulletCard
                heading="Large Enterprises"
                points={[
                  "Old but important ERP / internal systems",
                  "Apps that were never migrated off SPARC",
                ]}
              />
            </div>
          </section>

          {/* Solaris vs Linux quick comparison */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold  bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Solaris vs Linux – high-level view
            </h2>
            <p>
              As a system admin, you don&apos;t need to treat Solaris as a
              completely new world. Many concepts are similar to Linux, but the{" "}
              <span className="text-sky-300">
                commands, tools and defaults
              </span>{" "}
              are slightly different.
            </p>

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70">
              <div className="grid grid-cols-2 text-xs font-semibold text-slate-300">
                <div className="border-b border-slate-800 px-3 py-2">
                  In Linux
                </div>
                <div className="border-b border-slate-800 px-3 py-2">
                  In Solaris
                </div>
              </div>
              <div className="grid grid-cols-2 text-[11px] text-slate-200">
                <div className="border-r border-slate-800 px-3 py-2">
                  <span className="font-semibold">systemd</span> used for
                  service management.
                </div>
                <div className="px-3 py-2">
                  <span className="font-semibold">SMF (svcs / svcadm)</span>{" "}
                  handles services with better dependency tracking.
                </div>
                <div className="border-t border-r border-slate-800 px-3 py-2">
                  Popular filesystems: <span className="font-semibold">ext4</span>,
                  XFS, btrfs (optional).
                </div>
                <div className="border-t border-slate-800 px-3 py-2">
                  <span className="font-semibold">ZFS</span> is the default
                  filesystem with snapshots, checksums and more.
                </div>
                <div className="border-t border-r border-slate-800 px-3 py-2">
                  Virtualization often done with KVM, containers or cloud.
                </div>
                <div className="border-t border-slate-800 px-3 py-2">
                  <span className="font-semibold">Zones & LDOMs</span> provide
                  in-built virtualization on the same host.
                </div>
              </div>
            </div>

            <p>
              The goal of this course is to make you comfortable moving between{" "}
              <span className="font-semibold">Linux knowledge</span> you already
              have and Solaris specific tools and workflows.
            </p>
          </section>

          {/* What you will know after this course */}
          <section className="space-y-3 rounded-2xl border border-sky-600/50 bg-sky-500/10 p-4 shadow-lg shadow-sky-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold  bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              After this course, you should be able to…
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-sky-50">
              <li>Log in to Solaris systems confidently and explore them.</li>
              <li>
                Manage users, groups, services, storage and networking on
                Solaris 11.
              </li>
              <li>
                Understand zones, ZFS, SMF and other Solaris-specific building
                blocks.
              </li>
              <li>
                Read and troubleshoot common logs and issues seen in enterprise
                environments.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-sky-200">
              Next up: we move from theory to hands-on by installing Solaris and
              walking through the first boot experience.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}