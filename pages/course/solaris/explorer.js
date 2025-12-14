// pages/course/solaris/explorer.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiTool,
  FiFileText,
  FiUploadCloud,
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

/* -------------------- TERMINAL SNIPPETS -------------------- */

const explorerSnippets = [
  {
    id: "check-package",
    title: "Check if explorer is installed",
    description:
      "Explorer is usually part of Oracle Explorer Data Collector. On newer systems it may be in a support tools bundle.",
    content: `[root@solaris ~]# pkg list '*explorer*'
NAME (PUBLISHER)                                  VERSION                    IFO
application/enterprise/oracle-explorer            8.8.0-0.175.3.0.0.30.0     i--`,
  },
  {
    id: "explorer-version",
    title: "Check explorer version and help",
    description:
      "Good practice before running it – also mention version in SR.",
    content: `[root@solaris ~]# explorer -V
Oracle Explorer (Data Collector) version 8.8.0

[root@solaris ~]# explorer -help`,
  },
  {
    id: "explorer-k-first",
    title: "First-time configuration: explorer -k",
    description:
      "The -k option creates a configuration profile (.explorerrc) with what data to collect and where to save logs.",
    content: `[root@solaris ~]# explorer -k

Oracle Explorer Configuration
-----------------------------
This dialog will ask you questions about which modules to enable,
where to store output, contact/SR info, etc.

... (answer prompts as per your environment) ...

Configuration saved in: /etc/opt/SUNWexplo/default/explorer

# After this, plain 'explorer' will reuse this configuration.`,
  },
  {
    id: "run-explorer",
    title: "Collect explorer logs using default configuration",
    description:
      "After configuration is done once, just run explorer to collect a fresh bundle.",
    content: `[root@solaris ~]# explorer

Oracle Explorer will now run using configuration:
  /etc/opt/SUNWexplo/default/explorer

Collecting system data ...
  - Hardware inventory
  - OS configuration
  - ZFS, disks, controllers
  - Logs and platform-specific info
...

Explorer run completed.
Output bundle: /var/opt/SUNWexplo/output/EXPLR_hostname_01192025_01.tar.gz`,
  },
  {
    id: "explorer-output",
    title: "Check explorer output directory and files",
    description:
      "Output location depends on configuration; default is often under /var/opt/SUNWexplo/output or /opt/SUNWexplo/output.",
    content: `[root@solaris ~]# ls -lh /var/opt/SUNWexplo/output
total 120M
-rw-r--r--   1 root root  25M Jan 19 22:10 EXPLR_hostname_01192025_01.tar.gz
-rw-r--r--   1 root root  26M Dec 10 11:30 EXPLR_hostname_12102024_01.tar.gz`,
  },
  {
    id: "compress-rename",
    title: "Optionally rename file before uploading to SR",
    description:
      "Some admins like to add SR number or short description to the filename.",
    content: `[root@solaris ~]# cd /var/opt/SUNWexplo/output

[root@solaris output]# mv EXPLR_hostname_01192025_01.tar.gz EXPLR_hostname_SR3-12345678_01192025.tar.gz`,
  },
  {
    id: "schedule-explorer-cron",
    title: "Optional: schedule regular explorer collection via cron",
    description:
      "Some sites run explorer weekly/monthly and keep last N bundles for trend analysis.",
    content: `[root@solaris ~]# crontab -e

# Example: run explorer every Sunday at 02:00
0 2 * * 0 /usr/bin/explorer > /var/log/explorer_cron.log 2>&1`,
  },
];

/* -------------------- PAGE COMPONENT -------------------- */

export default function ExplorerPage() {
  const lesson = solarisLessons.find((l) => l.slug === "explorer") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Oracle Explorer in Solaris"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "What Oracle Explorer is, why Oracle Support asks for explorer logs, and how to run explorer and explorer -k to collect support bundles."
          }
        />
      </Head>

      <SolarisLayout activeSlug="explorer">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Support Tools
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            {lesson.title || "Oracle Explorer (explorer) in Solaris"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm text-slate-300">
            <code>explorer</code> is Oracle&apos;s data collection tool for
            Solaris systems. It collects detailed information about hardware,
            OS, storage, network and configuration. Oracle Support often asks
            for an explorer output when you open an SR for OS or hardware
            issues.
          </p>

          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
        </motion.header>

        {/* VIDEO (optional) */}
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
                title={lesson.title || "Oracle Explorer in Solaris"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your Explorer demo video URL in{" "}
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
          {/* WHAT / WHY / HOW */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              What is Oracle Explorer? Why is it used?
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiTool className="text-lg" />}
                title="What"
                text="Explorer is a support data collector for Solaris hosts: hardware, OS, storage, network, logs and firmware information."
              />
              <FeatureCard
                icon={<FiFileText className="text-lg" />}
                title="Why"
                text="Oracle Support uses explorer bundles to quickly understand your system environment and investigate SRs faster."
              />
              <FeatureCard
                icon={<FiUploadCloud className="text-lg" />}
                title="How"
                text="You run explorer on the Solaris host, then upload the generated .tar.gz file to My Oracle Support under your SR."
              />
            </div>

            <BulletCard
              heading="Typical cases where explorer is requested"
              points={[
                "Hardware issues (disks, HBAs, NICs, controllers).",
                "Performance cases where OS / storage details are needed.",
                "Kernel panics or frequent system crashes.",
                "Complex patching / SRU / configuration problems.",
              ]}
            />
          </section>

          {/* FIRST-TIME vs REGULAR USAGE */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              First time vs regular runs – explorer -k vs explorer
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="explorer -k (first time)"
                points={[
                  "Runs an interactive configuration dialog.",
                  "Lets you choose which modules to run (hw, disks, Solaris, etc.).",
                  "Configures output directory and naming.",
                  "Saves a profile under /etc/opt/SUNWexplo/default/explorer (path may vary).",
                ]}
              />
              <BulletCard
                heading="explorer (repeat runs)"
                points={[
                  "Uses saved configuration (no questions asked).",
                  "Suitable for regular/automated collections.",
                  "Usually what you run when Oracle asks: 'Please send latest explorer'.",
                ]}
              />
            </div>
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Step-by-step: collecting explorer logs
            </h2>

            {explorerSnippets.map((snip, index) => (
              <div key={snip.id} className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snip.title}
                </h3>
                <p className="text-xs text-slate-400">{snip.description}</p>
                <TerminalOutput
                  content={snip.content}
                  title="terminal — explorer"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* WHAT EXPLORER COLLECTS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              What does explorer actually collect?
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Typical content inside explorer bundle"
                points={[
                  "Hardware inventory (CPU, memory, FRUs, serial numbers).",
                  "Disk layout, controllers, ZFS pools, slices, multipath status.",
                  "OS info: uname, patch/SRU level, packages.",
                  "Network interfaces and configuration.",
                  "Important logs: /var/adm/messages, crash info, etc.",
                ]}
              />
              <BulletCard
                heading="Benefits for troubleshooting"
                points={[
                  "No need for multiple screenshots/emails with partial data.",
                  "Oracle engineer can reproduce environment view locally.",
                  "Faster root cause analysis and recommendations.",
                ]}
              />
            </div>
          </section>

          {/* BEST PRACTICES / SAFETY */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <FiAlertTriangle className="text-base" />
              Best practices when running explorer
            </h2>

            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-red-100">
              <li>
                Always run explorer as <code>root</code> on the Solaris host
                (needs full system access).
              </li>
              <li>
                Prefer running during normal load if possible, so performance
                metrics reflect real workload.
              </li>
              <li>
                Do not edit files inside the explorer bundle – upload as-is to
                My Oracle Support.
              </li>
              <li>
                If hostname or environment is sensitive, follow your company&apos;s
                policy (sometimes masking is allowed, but ask Oracle first). 
              </li>
              <li>
                For long-running issues, keep a history of explorer bundles over
                time for comparison (before/after changes).
              </li>
            </ul>

            <p className="mt-2 text-[12px] text-red-200 flex items-center gap-1">
              A clean explorer bundle attached to your SR is one of the fastest
              ways to get meaningful feedback from Oracle Support.
              <FiServer className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
