// pages/course/solaris/ldoms-primary-setup.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiCpu, FiTool, FiTerminal, FiAlertTriangle } from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/SolarisLessons";
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

/* -------------------- TERMINAL SNIPPETS -------------------- */

const primarySnips = [
  {
    title: "Check platform is LDOM-capable",
    desc: "virtinfo and prtconf can show virtualization support on SPARC.",
    content: `[root@primary ~]# virtinfo -a
Platform:  sun4v
Logical Domains support: enabled
Role: control primary io service

[root@primary ~]# prtconf -vp | grep -i sun4v`,
  },
  {
    title: "Check & install LDoms Manager package",
    desc: "Depending on Solaris/firmware, LDoms Manager is pkg or preinstalled.",
    content: `[root@primary ~]# pkg list '*ldoms*'
NAME (PUBLISHER)                         VERSION                 IFO
system/ldoms/ldomsmanager                3.6-0.175.3.0.0.30.0    i--

# If not installed:
[root@primary ~]# pkg install system/ldoms/ldomsmanager`,
  },
  {
    title: "Enable ldmd service (LDOM manager daemon)",
    desc: "ldmd manages all domain configuration and runs in control domain.",
    content: `[root@primary ~]# svcs ldmd
STATE          STIME    FMRI
disabled       10:12:34 svc:/platform/sun4v/ldmd:default

[root@primary ~]# svcadm enable ldmd

[root@primary ~]# svcs ldmd
STATE          STIME    FMRI
online         10:13:01 svc:/platform/sun4v/ldmd:default`,
  },
  {
    title: "Basic ldm list output on fresh system",
    desc: "Shows the primary/control domain and current resources/roles.",
    content: `[root@primary ~]# ldm list
NAME             STATE      FLAGS   CONS    VCPU  MEMORY   UTIL  UPTIME
primary          active     -n-cv   SP      8     32G      5%    2d 3h

# FLAGS typically show roles:
#  c = control domain
#  v = virtual I/O service domain
#  n = master domain
#  i/o roles depend on config`,
  },
  {
    title: "List and create SP configurations (spconfig)",
    desc: "Save current domain layout into SP (service processor) config so it can survive OS reinstall.",
    content: `# List existing SP configs
[root@primary ~]# ldm list-spconfig
factory-default
initial-setup

# Save current running configuration as a new SP config
[root@primary ~]# ldm add-spconfig prod-layout

# Verify again
[root@primary ~]# ldm list-spconfig
factory-default
initial-setup
prod-layout`,
  },
];

export default function LdomsPrimarySetupPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "ldoms-primary-setup") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title ||
            "LDOMs – Install LDoms Manager & Configure Primary Domain"}{" "}
          | InfoUnix
        </title>
      </Head>

      <SolarisLayout activeSlug="ldoms-primary-setup">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">
            Solaris SPARC · LDOMs · Primary
          </p>
          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            Install LDoms Manager & Configure the Primary Domain
          </h1>
          <p className="mt-2 max-w-3xl text-sm dark:text-slate-300">
            Before you can create guest domains, the primary domain must be
            configured as a control/service domain and LDoms Manager (ldmd)
            needs to be running. In many Oracle SPARC systems this is mostly
            preconfigured, but you should still know all the checks and also how
            to save the layout into an SP configuration (spconfig).
          </p>
          <div className="mt-3 h-px bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
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
                title={lesson.title || "LDOM primary setup"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your primary domain setup video URL in{" "}
              <code>solarisLessons.js</code>.
            </div>
          )}
        </motion.div>

        {/* MAIN */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed dark:text-slate-200"
        >
          {/* OVERVIEW */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Role of the primary / control domain
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="Control plane"
                text="Runs ldmd and controls creation, binding and starting/stopping of all domains."
              />
              <FeatureCard
                icon={<FiTool className="text-lg" />}
                title="Default service & I/O"
                text="Often also provides virtual disk and network services to guests."
              />
              <FeatureCard
                icon={<FiTerminal className="text-lg" />}
                title="Admin entry point"
                text="You log into the primary domain to run ldm and manage the entire SPARC server."
              />
            </div>

            <BulletCard
              heading="Typical journey"
              points={[
                "Verify platform supports LDOMs.",
                "Install/verify LDoms Manager.",
                "Enable ldmd service.",
                "Confirm primary has correct roles (control/service/io).",
                "Save final layout to SP config (spconfig).",
              ]}
            />
          </section>

          {/* TERMINAL STEPS */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-step: configure primary/control domain
            </h2>

            {primarySnips.map((s, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-xs dark:text-slate-400">{s.desc}</p>
                <TerminalOutput
                  content={s.content}
                  title="terminal — primary domain"
                  contextLabel="ldoms-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* NEW SECTION: SP CONFIG EXPLANATION */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              SP configuration (spconfig) – what it is and why it matters
            </h2>

            <p>
              When you create domains with <code>ldm</code>, the configuration
              is stored in the control domain (primary) and in the SP
              (service processor) when you explicitly save it as an{" "}
              <span className="font-semibold">SP configuration</span>, usually
              called <code>spconfig</code>.
            </p>

            <BulletCard
              heading="What is an SP config file?"
              points={[
                "A named snapshot of the current LDOM layout stored on the SP (not just inside Solaris).",
                "Contains domain definitions, CPU/memory assignments, vdisk/vnet mappings etc.",
                "Examples: factory-default, initial-setup, prod-layout.",
              ]}
            />

            <BulletCard
              heading="Use cases of SP config"
              points={[
                "If you reinstall or repair the primary domain OS, you can rebuild LDOM layout from SP config.",
                "Move from temporary lab layout to final production layout and save it as a named config.",
                "Keep multiple named configs for different scenarios (e.g. normal vs. maintenance layouts).",
              ]}
            />

            <BulletCard
              heading="What if you never create SP config?"
              points={[
                "Domain layout lives only in the running control domain OS.",
                "If that OS/disk is lost or reinstalled without export, you lose the LDOM configuration.",
                "Disks/LUNs might still exist, but you must manually recreate all domains and mappings.",
                "So in real environments, you should ALWAYS save a stable layout using ldm add-spconfig.",
              ]}
            />
          </section>

          {/* SAFETY */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-600">
              <FiAlertTriangle className="text-base" />
              Important notes
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-red-100">
              <li>
                Primary domain is critical: if it is down, you usually cannot
                manage other domains.
              </li>
              <li>
                After building or modifying domains, take a new SP config (
                <code>ldm add-spconfig</code>) and note the name in your
                documentation.
              </li>
              <li>
                Combine SP configs with regular <code>ldm list-bindings</code>{" "}
                exports and ZFS snapshots of domain disks for complete DR
                strategy.
              </li>
            </ul>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
