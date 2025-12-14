// pages/course/solaris/ilom-snapshot.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiServer,
  FiTool,
  FiDownload,
  FiAlertTriangle,
  FiShield,
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

/* -------------------- CLI TERMINAL SNIPPETS -------------------- */

const ilomCliSnippets = [
  {
    id: "check-snapshot-state",
    title: "Check snapshot component in ILOM CLI",
    description:
      "From the ILOM CLI, you can inspect the snapshot target and its properties.",
    content: `-> cd /SP/diag/snapshot

-> show

 /SP/diag/snapshot
    Targets:
        files
    Properties:
        dump_uri = (none)
        snapshot_state = idle
        snapshot_id = -`,
  },
  {
    id: "set-dump-uri",
    title: "Set dump_uri – where snapshot will be stored",
    description:
      "You can use scp, sftp, nfs or local tmp as per your ILOM version and policy. Example with SCP:",
    content: `-> cd /SP/diag/snapshot

# Format may vary slightly by platform/version:
-> set dump_uri=scp://user@192.168.1.10/tmp

Set 'dump_uri' to 'scp://user@192.168.1.10/tmp'

-> show dump_uri
 dump_uri = scp://user@192.168.1.10/tmp`,
  },
  {
    id: "generate-snapshot",
    title: "Trigger ILOM snapshot generation",
    description:
      "Setting generate_snapshot to true starts the support snapshot creation.",
    content: `-> cd /SP/diag/snapshot
-> set generate_snapshot=true

Generating ILOM snapshot...
Snapshot request accepted. Check 'snapshot_state' for progress.

-> show snapshot_state
 snapshot_state = running

# After some time:
-> show snapshot_state
 snapshot_state = completed

# The snapshot file is now stored at dump_uri path.`,
  },
];

/* -------------------- PAGE COMPONENT -------------------- */

export default function IlomSnapshotPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "ilom-snapshot") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "ILOM Snapshot in Oracle Solaris Servers"} | Solaris
          Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn what an ILOM snapshot is, why it is used for Oracle hardware troubleshooting, and how to generate it via GUI and CLI."
          }
        />
      </Head>

      <SolarisLayout activeSlug="ilom-snapshot">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · ILOM Tools
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            {lesson.title || "ILOM Snapshot – Collection & Usage"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm text-slate-300">
            ILOM snapshot is a support bundle that collects logs, configuration,
            inventory and diagnostic data from the Integrated Lights Out Manager
            (ILOM). Oracle Support often asks for this snapshot when you open a
            hardware SR for SPARC/x86 servers.
          </p>

          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
        </motion.header>

        {/* VIDEO (IF ANY) */}
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
                title={lesson.title || "ILOM Snapshot"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your ILOM snapshot demo video URL in{" "}
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
          {/* WHAT / WHY SECTION */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              What is an ILOM snapshot and why use it?
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiServer className="text-lg" />}
                title="What"
                text="An ILOM snapshot is a compressed support bundle containing logs, event history, hardware inventory and configuration from the server's service processor."
              />
              <FeatureCard
                icon={<FiTool className="text-lg" />}
                title="Why"
                text="Oracle Support uses it to analyse hardware faults, sensor alerts, PSU/fan issues, temperature problems, firmware mismatches and more."
              />
              <FeatureCard
                icon={<FiDownload className="text-lg" />}
                title="How"
                text="You can generate it either from the ILOM web GUI or via the CLI on /SP/diag/snapshot and then download/upload it to My Oracle Support."
              />
            </div>

            <BulletCard
              heading="Typical situations where ILOM snapshot is requested"
              points={[
                "Server random resets / power issues.",
                "PSU/Fan/Sensor alarms on the ILOM dashboard.",
                "DIMM or CPU faults, FMA events.",
                "Firmware_upgrade-related problems.",
                "Any hardware SR opened with Oracle Support.",
              ]}
            />
          </section>

          {/* IMAGE PLACE 1 – LOGIN & NAVIGATION */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Step 1 – Login to ILOM web interface
            </h2>
            <p>
              Open a browser and connect to the ILOM IP address using HTTPS.
              Log in with your ILOM credentials (usually a dedicated admin
              account, not root of the OS).
            </p>

            <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
              <li>URL typically looks like: https://&lt;ilom-ip&gt;/</li>
              <li>Use the username/password you use for service processor.</li>
              <li>
                Ensure you are allowed to take snapshots as per your company’s
                policy.
              </li>
            </ul>

            {/* IMAGE SLOT #1 */}
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80">
              {/* Replace src with your Cloudinary URL */}
              <img
                src="https://res.cloudinary.com/YOUR_ACCOUNT/image/upload/v1234567890/ilom-login.png"
                alt="ILOM login screen"
                className="h-full w-full object-contain"
              />
            </div>

            <p className="mt-1 text-[11px] text-slate-400">
              Image slot 1 – login page screenshot. Replace the{" "}
              <code>src</code> value with your Cloudinary link.
            </p>
          </section>

          {/* IMAGE PLACE 2 – NAVIGATE TO SNAPSHOT PAGE */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Step 2 – Navigate to ILOM Snapshot section
            </h2>

            <p>
              The exact menu name may differ slightly between platforms, but
              generally you will find the snapshot option under{" "}
              <strong>Maintenance / Service / Diagnostics</strong> in the ILOM
              web interface.
            </p>

            <BulletCard
              heading="Typical navigation ideas (may vary by model)"
              points={[
                "Maintenance → ILOM Snapshot",
                "Maintenance → Diagnostics → Snapshot",
                "Service → Snapshot / Service Snapshot",
              ]}
            />

            {/* IMAGE SLOT #2 */}
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80">
              {/* Replace src with your Cloudinary URL */}
              <img
                src="https://res.cloudinary.com/YOUR_ACCOUNT/image/upload/v1234567890/ilom-snapshot-menu.png"
                alt="ILOM snapshot menu"
                className="h-full w-full object-contain"
              />
            </div>

            <p className="mt-1 text-[11px] text-slate-400">
              Image slot 2 – snapshot menu / navigation screenshot.
            </p>
          </section>

          {/* IMAGE PLACE 3 – GENERATE & DOWNLOAD SNAPSHOT */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Step 3 – Generate and download the snapshot (GUI)
            </h2>

            <p>
              On the snapshot page, you&apos;ll typically choose:
            </p>

            <ul className="list-disc pl-5 text-xs text-slate-300 space-y-1">
              <li>Type of snapshot (full / normal / minimal – depends on ILOM).</li>
              <li>Target location (download to browser or remote share).</li>
              <li>Optionally include debug/extended logs if requested by Oracle.</li>
            </ul>

            <BulletCard
              heading="Typical flow"
              points={[
                "Click on <strong>Create Snapshot</strong> or similar button.",
                "Wait while the ILOM collects logs and builds the bundle.",
                "After completion, click the download link/button.",
                "Save the .tar.gz or .zip file to your workstation.",
              ]}
            />

            {/* IMAGE SLOT #3 */}
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80">
              {/* Replace src with your Cloudinary URL */}
              <img
                src="https://res.cloudinary.com/YOUR_ACCOUNT/image/upload/v1234567890/ilom-snapshot-download.png"
                alt="ILOM snapshot download"
                className="h-full w-full object-contain"
              />
            </div>

            <p className="mt-1 text-[11px] text-slate-400">
              Image slot 3 – snapshot generation/download screen.
            </p>
          </section>

          {/* CLI SECTION */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Generating ILOM snapshot from CLI
            </h2>

            <p>
              If you have CLI access to the ILOM (via SSH / serial), you can
              generate the snapshot without using the browser. This is useful in
              restricted environments or when the web UI is not responding.
            </p>

            {ilomCliSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-400">{snippet.description}</p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — ilom snapshot"
                  contextLabel="ilom-cli"
                  maxHeight="18rem"
                />
              </div>
            ))}

            <p className="text-[11px] text-slate-400">
              Exact property names and supported URI schemas may vary by ILOM
              version / platform. Always check <code>show</code> output and
              Oracle documentation for your specific hardware.
            </p>
          </section>

          {/* SECURITY / BEST PRACTICES */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <FiShield className="text-base" />
              Security & Best Practices for ILOM Snapshots
            </h2>

            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-red-100">
              <li>
                ILOM snapshots may contain hostnames, IPs, serial numbers and
                diagnostic data – treat them as sensitive.
              </li>
              <li>
                Store snapshots only on approved locations (ticket system / SR
                attachments / secure share).
              </li>
              <li>
                Delete local copies after uploading to My Oracle Support, if
                your security policy requires it.
              </li>
              <li>
                When opening an SR, mention the snapshot file name and when it
                was collected, so Oracle can correlate logs with events.
              </li>
            </ul>

            <p className="mt-2 text-[12px] text-red-200 flex items-center gap-1">
              ILOM snapshot is often the first thing Oracle asks for – if you
              can collect it quickly and correctly, SR resolution becomes much
              faster.
              <FiAlertTriangle className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
