// pages/course/solaris/zones-troubleshooting.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiAlertTriangle,
  FiActivity,
  FiTool,
  FiTerminal,
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

const zoneTroubleSnips = [
  {
    id: "zoneadm-listv",
    title: "Quick view of zone states",
    description:
      "First step: see which zone is failing and in what state (configured, installed, running, incomplete, etc.).",
    content: `[root@solaris ~]# zoneadm list -cv
  ID NAME             STATUS     PATH                           BRAND       IP
   0 global           running    /                              solaris     shared
   - appzone          installed  /zones/appzone                 solaris     excl
   - kz-db01          incomplete /system/zones/kz-db01          solaris-kz  excl`,
  },
  {
    id: "zonecfg-verify",
    title: "zonecfg verify – configuration errors",
    description:
      "If a zone is in 'configured' or 'incomplete', run verify to see missing/invalid resources.",
    content: `[root@solaris ~]# zonecfg -z appzone verify
zonecfg:appzone: No such physical interface 'net999'

# Fix:
zonecfg:appzone> remove net
zonecfg:appzone> add net
zonecfg:appzone:net> set physical=net0
zonecfg:appzone:net> end
zonecfg:appzone> verify
zonecfg:appzone> commit
zonecfg:appzone> exit`,
  },
  {
    id: "zoneadm-install-errors",
    title: "zoneadm install – missing repository / IPS issues",
    description:
      "Install failures often come from IPS repo problems or wrong publisher.",
    content: `[root@solaris ~]# zoneadm -z appzone install
A ZFS file system has been created for this zone.
  ...

pkg: unable to contact valid package repository.
zoneadm: zone 'appzone': WARNING: install failed

# Check IPS configuration:
[root@solaris ~]# pkg publisher
[root@solaris ~]# ping pkg.oracle.com

# Fix publisher and retry:
[root@solaris ~]# pkg set-publisher -g file:///export/localrepo solaris

[root@solaris ~]# zoneadm -z appzone install`,
  },
  {
    id: "kz-insufficient-resources",
    title: "Kernel zone fails to boot – insufficient memory/CPU",
    description:
      "If caps are too high for available host resources, kernel zone may not boot.",
    content: `[root@solaris ~]# zoneadm -z kz-db01 boot
zoneadm: zone 'kz-db01': not enough memory to boot this zone

# Check configuration:
[root@solaris ~]# zonecfg -z kz-db01 info capped-memory
capped-memory:
    physical: 64G

# If host has only 32G or heavily used, reduce cap:
[root@solaris ~]# zonecfg -z kz-db01
zonecfg:kz-db01> select capped-memory
zonecfg:kz-db01:capped-memory> set physical=16G
zonecfg:kz-db01:capped-memory> end
zonecfg:kz-db01> commit
zonecfg:kz-db01> exit

# Retry boot:
[root@solaris ~]# zoneadm -z kz-db01 boot`,
  },
  {
    id: "zlogin-fails",
    title: "zlogin fails – zone not ready or console in use",
    description:
      "If you can’t log in, check zone state and use -C carefully.",
    content: `[root@solaris ~]# zlogin appzone
zlogin: cannot connect to zone appzone; zone is down

# Check status:
[root@solaris ~]# zoneadm list -cv
  ID NAME             STATUS     PATH               BRAND    IP
   0 global           running    /                  solaris  shared
   - appzone          installed  /zones/appzone     solaris  excl

# Boot the zone:
[root@solaris ~]# zoneadm -z appzone boot

# Now console:
[root@solaris ~]# zlogin -C appzone
[Connected to zone 'appzone' console]`,
  },
  {
    id: "kernel-zone-boot-failure-logs",
    title: "Kernel zone boot failures – check logs",
    description:
      "If a kernel zone fails during OS boot, use console and logs inside the zone.",
    content: `[root@solaris ~]# zlogin -C kz-db01
[Connected to zone 'kz-db01' console]
...
panic[cpu0]: some kernel error
...

# After investigating, you may need to boot single-user inside the kernel zone,
# or roll back BE within the zone (like a normal Solaris system).`,
  },
  {
    id: "remove-incomplete-zone",
    title: "Clean up 'incomplete' zone",
    description:
      "Sometimes a failed install leaves a zone in incomplete state. Clean and recreate if needed.",
    content: `[root@solaris ~]# zoneadm list -cv
  ID NAME             STATUS     PATH                           BRAND       IP
   0 global           running    /                              solaris     shared
   - kz-db02          incomplete /system/zones/kz-db02          solaris-kz  excl

[root@solaris ~]# zoneadm -z kz-db02 uninstall -F
[root@solaris ~]# zonecfg -z kz-db02 delete -F`,
  },
  {
    id: "zone-logs",
    title: "Where to look for zone-related logs on global zone",
    description:
      "Zone install/boot messages often appear in these logs.",
    content: `[root@solaris ~]# tail -100 /var/adm/messages | grep -i zone

[root@solaris ~]# ls /var/log/zones
appzone.install.log
kz-db01.console.log
kz-db01.install.log`,
  },
];

/* ---------- PAGE COMPONENT ---------- */

export default function ZonesTroubleshootingPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "zones-troubleshooting") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Zones Troubleshooting in Solaris"} | Solaris Course
          | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Troubleshoot common issues with Solaris zones and kernel zones: config errors, install failures, boot problems, login issues and resource errors."
          }
        />
      </Head>

      <SolarisLayout activeSlug="zones-troubleshooting">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Zones · Troubleshooting
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            {lesson.title || "Zones Troubleshooting in Solaris"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm text-slate-300">
            Zones are powerful, but when something goes wrong you need a
            standard approach: check state, verify configuration, look at logs,
            fix resources and try again. This lesson covers typical zone and
            kernel zone problems and how to fix them in real environments.
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
                title={lesson.title || "Zones Troubleshooting"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your zones troubleshooting demo video URL in{" "}
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
          {/* HIGH LEVEL APPROACH */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Troubleshooting approach – zones and kernel zones
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiActivity className="text-lg" />}
                title="1. Identify state"
                text="Use zoneadm list -cv to see the current state: configured, installed, running, incomplete, shutting_down, etc."
              />
              <FeatureCard
                icon={<FiTool className="text-lg" />}
                title="2. Verify configuration"
                text="Use zonecfg verify to catch missing network, datasets, pool or other resource problems."
              />
              <FeatureCard
                icon={<FiTerminal className="text-lg" />}
                title="3. Check logs & retry"
                text="Look into /var/log/zones, /var/adm/messages, and inside the zone (for kernel zones) before retrying boot/install."
              />
            </div>

            <BulletCard
              heading="Common problem areas"
              points={[
                "Wrong or missing network interfaces.",
                "IPS repository / publisher issues during install.",
                "Insufficient memory/CPU for kernel zones.",
                "Kernel zone OS issues (inside the guest).",
                "Leftover 'incomplete' zones from failed attempts.",
              ]}
            />
          </section>

          {/* TERMINAL EXAMPLES / SCENARIOS */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Typical issues & how to fix them
            </h2>

            {zoneTroubleSnips.map((snippet, index) => (
              <div key={snippet.id} className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — zones troubleshooting"
                  contextLabel="solaris-lab"
                  maxHeight="20rem"
                />
              </div>
            ))}
          </section>

          {/* CHECKLIST / SUMMARY */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <FiAlertTriangle className="text-base" />
              Troubleshooting checklist – zones & kernel zones
            </h2>

            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-red-100">
              <li>Always start with <code>zoneadm list -cv</code>.</li>
              <li>
                If config-related: <code>zonecfg -z &lt;zone&gt; verify</code>.
              </li>
              <li>
                If install-related: check IPS (<code>pkg publisher</code>,
                network, repo availability).
              </li>
              <li>
                If boot-related: check logs, resources and for kernel zones,
                treat them like mini-Solaris systems (BEs, SMF, etc.).
              </li>
              <li>
                Clean up failed/incomplete zones before retrying, to avoid
                confusion.
              </li>
            </ul>

            <p className="mt-2 text-[12px] text-red-200 flex items-center gap-1">
              With a consistent checklist, even complex zone and kernel zone
              issues become manageable instead of scary.
              <FiActivity className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
