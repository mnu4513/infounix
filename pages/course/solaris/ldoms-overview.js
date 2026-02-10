// pages/course/solaris/ldoms-overview.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiLayers,
  FiShield,
  FiGitBranch,
  FiActivity,
} from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/SolarisLessons";
import FeatureCard from "../../../components/solaris/FeatureCard";
import BulletCard from "../../../components/solaris/BulletCard";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

export default function LdomsOverviewPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "ldoms-overview") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title ||
            "Oracle VM for SPARC (LDOMs) – Concepts & Architecture"}{" "}
          | InfoUnix
        </title>
      </Head>

      <SolarisLayout activeSlug="ldoms-overview">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">
            Solaris SPARC · LDOMs · Concepts
          </p>
          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            Oracle VM for SPARC (LDOMs) – Concepts & Architecture
          </h1>
          <p className="mt-2 max-w-3xl text-sm dark:text-slate-300">
            Oracle VM for SPARC, also called Logical Domains (LDOMs), allows you
            to split a SPARC server into multiple logical machines. Each domain
            runs its own OS instance, with dedicated virtual CPUs, memory and
            I/O resources provided by the SPARC hypervisor.
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
                title={lesson.title || "LDOMs Concepts"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your LDOMs overview video URL in{" "}
              <code>solarisLessons.js</code>.
            </div>
          )}
        </motion.div>

        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed dark:text-slate-200"
        >
          {/* WHAT & WHY */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is Oracle VM for SPARC / LDOM?
            </h2>
            <p>
              <span className="font-semibold">
                Oracle VM for SPARC (LDOMs)
              </span>{" "}
              is a hardware virtualization technology built into SPARC servers.
              A single physical SPARC system can be split into multiple{" "}
              <span className="font-semibold">domains</span>, each behaving like
              an independent server: its own OS instance, hostname, IPs,
              applications and security boundaries.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="Hardware virtualisation"
                text="LDOMs use the SPARC hypervisor in firmware to carve up CPU, memory and I/O into separate domains."
              />
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="Multiple domains"
                text="Each domain can run its own Solaris (or other supported OS) with separate lifecycle and resources."
              />
              <FeatureCard
                icon={<FiShield className="text-lg" />}
                title="Isolation & flexibility"
                text="Faults in one domain do not crash others. Resources can be reallocated dynamically in many cases."
              />
            </div>

            <BulletCard
              heading="Why use LDOMs?"
              points={[
                "Consolidate many workloads on one SPARC server.",
                "Separate environments: prod / UAT / dev / DR on same box.",
                "Assign dedicated resources per application or tenant.",
                "Support different OS versions / patch levels in separate domains.",
              ]}
            />
          </section>

          {/* HYPERVISOR & TYPES */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Hypervisor basics – Type 1 vs Type 2 and where LDOMs fits
            </h2>
            <p>
              A <span className="font-semibold">hypervisor</span> is the layer
              that creates and manages virtual machines or domains.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Type 1 (bare metal) hypervisor"
                points={[
                  "Runs directly on hardware (no host OS underneath).",
                  "Examples: Oracle VM for SPARC (LDOMs), VMware ESXi, Hyper-V (bare metal mode).",
                  "High performance and isolation.",
                ]}
              />
              <BulletCard
                heading="Type 2 (hosted) hypervisor"
                points={[
                  "Runs on top of an OS as an application.",
                  "Examples: VirtualBox, VMware Workstation.",
                  "Simpler for desktops/labs; not as close to hardware.",
                ]}
              />
            </div>

            <BulletCard
              heading="Where does LDOM hypervisor sit?"
              points={[
                "SPARC servers implement the hypervisor in firmware – a type 1 bare metal hypervisor.",
                "Solaris itself runs inside a domain (often the primary domain), not directly on hardware.",
                "Domains talk to the hypervisor for CPU, memory and I/O access.",
              ]}
            />
          </section>

          {/* HOW LDOM DIFFERS FROM OTHER VIRTUALIZATION */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              How LDOMs differ from other virtualization solutions
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Compared to zones"
                points={[
                  "Zones share a single OS instance (same kernel).",
                  "LDOMs are separate domains at hardware level.",
                  "You can run zones inside a domain – two-level virtualization.",
                ]}
              />
              <BulletCard
                heading="Compared to x86 hypervisors"
                points={[
                  "LDOMs are tightly integrated with SPARC CPU features.",
                  "I/O virtualization often uses service and I/O domains.",
                  "Management is via ldm CLI (and sometimes OEM tools).",
                ]}
              />
            </div>
          </section>

          {/* TERMINOLOGY: CONTROL / SERVICE / I/O / GUEST */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Key LDOM terms: primary, control, service, I/O and guest domains
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Primary domain"
                points={[
                  "First domain created on the system, usually at factory.",
                  "Typically runs Solaris and LDoms Manager (ldmd).",
                  "Often combined with other roles: control + service + I/O.",
                ]}
              />
              <BulletCard
                heading="Control domain"
                points={[
                  "Domain that runs ldmd and controls configuration of all LDOMs.",
                  "You run ldm commands here (create, bind, start, stop domains).",
                  "Usually the same as the primary domain.",
                ]}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Service domain"
                points={[
                  "Provides virtual services to other domains:",
                  "  – Virtual disk service (VDS) for vdisks.",
                  "  – Virtual network switch (vsw) for vnets.",
                  "Can be the same as control/primary domain.",
                ]}
              />
              <BulletCard
                heading="I/O domain (root domain)"
                points={[
                  "Domain with direct ownership of physical PCIe root complex or HBAs.",
                  "Direct access to physical disks/NICs; can export them as virtual devices.",
                  "You can have multiple I/O domains for high availability.",
                ]}
              />
            </div>

            <BulletCard
              heading="Guest domain (logical domain)"
              points={[
                "Regular domain that runs workloads (DB, apps, web, etc.).",
                "Receives virtual CPUs, memory and I/O from the hypervisor and service/I/O domains.",
                "Does not control other domains.",
              ]}
            />
          </section>

          {/* SUMMARY */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <FiActivity className="text-base" />
              Summary: big picture of LDOMs
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-emerald-50">
              <li>SPARC hypervisor (type 1) splits hardware into domains.</li>
              <li>
                Control/primary domain runs ldmd, manages other domains via{" "}
                <code>ldm</code>.
              </li>
              <li>Service/I/O domains provide virtual disks and networks.</li>
              <li>Guest domains run applications using virtual resources.</li>
            </ul>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
