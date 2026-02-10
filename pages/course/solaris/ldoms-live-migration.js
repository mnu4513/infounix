// pages/course/solaris/ldoms-live-migration.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiShare2, FiActivity, FiAlertTriangle } from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/solarisLessons";
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

const migSnips = [
  {
    title: "Pre-check: same shared storage for root and data",
    desc: "Live migration usually requires shared storage visible to both hosts.",
    content: `# Example: SAN LUNs or shared ZFS (via cluster/storage)
[root@hostA ~]# zpool status
[root@hostB ~]# zpool status

# Ensure domain's disks are on shared pool/LUNs`,
  },
  {
    title: "Dry-run migration",
    desc: "Use -n to validate that migration is possible between source and target.",
    content: `[root@hostA ~]# ldm migrate -n ldg1 hostB
Initiating migration of LDom 'ldg1' to 'hostB'
Checking constraints and compatibility...
Migration check: PASSED`,
  },
  {
    title: "Perform live migration",
    desc: "Without -n, migration actually happens. Domain stays running with short pause.",
    content: `[root@hostA ~]# ldm migrate ldg1 hostB
Initiating migration of LDom 'ldg1' to 'hostB'
LDom ldg1 successfully migrated

# After migration, domain is active on hostB:
[root@hostB ~]# ldm list ldg1
NAME    STATE    FLAGS  CONS  VCPU  MEMORY   UTIL  UPTIME
ldg1    active   -t---- 5000  4     8G       10%   5d`,
  },
];

export default function LdomsLiveMigrationPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "ldoms-live-migration") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "LDOMs – Live Migration of Guest Domains"} |
          InfoUnix
        </title>
      </Head>

      <SolarisLayout activeSlug="ldoms-live-migration">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">
            Solaris SPARC · LDOMs · Migration
          </p>
          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            Live Migration of Guest Domains
          </h1>
          <p className="mt-2 max-w-3xl text-sm dark:text-slate-300">
            Live migration lets you move a running guest domain from one SPARC
            server to another with minimal downtime. It is powerful for
            maintenance, load balancing and hardware replacement – but requires
            careful planning.
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
              Requirements for live migration
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<FiShare2 className="text-lg" />}
                title="Shared storage"
                text="Domain root and data disks must be on shared storage visible on both hosts."
              />
              <FeatureCard
                icon={<FiActivity className="text-lg" />}
                title="Compatible hosts"
                text="CPU features, firmware and LDOMs versions must be compatible."
              />
            </div>

            <BulletCard
              heading="Checklist"
              points={[
                "Same or compatible CPU type and firmware on both hosts.",
                "LDOMs Manager version compatible.",
                "Domain disks on shared storage.",
                "Network connectivity between hosts for migration traffic.",
              ]}
            />
          </section>

          <section className="space-y-6">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Commands: dry-run and live migration
            </h2>

            {migSnips.map((s, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-xs dark:text-slate-400">{s.desc}</p>
                <TerminalOutput
                  content={s.content}
                  title="terminal — live migration"
                  contextLabel="ldoms-lab"
                  maxHeight="16rem"
                />
              </div>
            ))}
          </section>

          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <FiAlertTriangle className="text-base" />
              Important notes
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-red-100">
              <li>Always test migration with non-critical domains first.</li>
              <li>
                For DB / critical apps, coordinate with application team and
                monitor closely.
              </li>
              <li>
                Ensure you have a rollback plan (domain can still run on source
                host if migration fails).
              </li>
            </ul>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
