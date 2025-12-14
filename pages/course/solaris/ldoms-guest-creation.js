// pages/course/solaris/ldoms-guest-creation.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiLayers, FiCpu, FiHardDrive } from "react-icons/fi";

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

const guestSnips = [
  {
    title: "Create a guest domain skeleton",
    desc: "ldm add-domain defines a new domain name.",
    content: `[root@primary ~]# ldm add-domain ldg1

[root@primary ~]# ldm list
NAME             STATE      FLAGS   CONS    VCPU  MEMORY   UTIL  UPTIME
primary          active     -n-cv   SP      8     32G      4%    3d
ldg1             inactive   ------  5000    0     0        0%    0s`,
  },
  {
    title: "Assign vCPUs and memory",
    desc: "ldm set-vcpu and ldm set-memory assign resources to the guest.",
    content: `[root@primary ~]# ldm set-vcpu 4 ldg1
[root@primary ~]# ldm set-memory 8G ldg1

[root@primary ~]# ldm list ldg1
NAME             STATE      FLAGS   CONS    VCPU  MEMORY   UTIL  UPTIME
ldg1             inactive   ------  5000    4     8G       0%    0s`,
  },
  {
    title: "Provide a virtual disk (backed by ZFS volume or file)",
    desc: "Export a backend device from service domain and assign it as vdisk.",
    content: `# On service/primary domain:
[root@primary ~]# zfs create -V 50G rpool/ldoms/ldg1-root

# Add vdsdev (backend) to virtual disk service primary-vds0
[root@primary ~]# ldm add-vdsdev /dev/zvol/dsk/rpool/ldoms/ldg1-root \
    ldg1-root@primary-vds0

# Add vdisk to guest
[root@primary ~]# ldm add-vdisk vdisk0 ldg1-root@primary-vds0 ldg1`,
  },
  {
    title: "Provide a virtual network interface",
    desc: "Create vsw on physical NIC, then add vnet to the guest.",
    content: `# Create virtual switch on net0 (one-time)
[root@primary ~]# ldm add-vsw net-dev=net0 primary-vsw0 primary

# Add vnet to guest
[root@primary ~]# ldm add-vnet vnet0 primary-vsw0 ldg1`,
  },
  {
    title: "Bind and start install (from ISO or network)",
    desc: "Bind finalizes the configuration; then start install (e.g. from virtual DVD).",
    content: `# Bind the domain
[root@primary ~]# ldm bind ldg1

# Start domain (for OS install)
[root@primary ~]# ldm start ldg1

# Connect to console
[root@primary ~]# telnet localhost 5000
# or using 'ldm console ldg1' on some versions

# Inside OBP, boot from network or virtual DVD to install Solaris.`,
  },
];

export default function LdomsGuestCreationPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "ldoms-guest-creation") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "LDOMs – Creating Guest Domains"} | InfoUnix
        </title>
      </Head>

      <SolarisLayout activeSlug="ldoms-guest-creation">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">
            Solaris SPARC · LDOMs · Guest
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            Creating Guest Domains (LDOMs)
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Guest domains are where your applications actually run. In this
            lesson you will create a simple guest LDOM: assign CPU, memory,
            virtual disks, virtual network and start the OS installation.
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
                title={lesson.title || "LDOM guest creation"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your guest creation demo video URL in{" "}
              <code>solarisLessons.js</code>.
            </div>
          )}
        </motion.div>

        {/* MAIN */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed text-slate-200"
        >
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              High-level steps to build a guest domain
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="1. Define domain"
                text="Create the domain entry (name) and assign CPU + memory."
              />
              <FeatureCard
                icon={<FiHardDrive className="text-lg" />}
                title="2. Attach storage & network"
                text="Provide virtual disks and virtual NICs from the service/I/O domain."
              />
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="3. Bind & install OS"
                text="Bind the domain, power it on, then install Solaris inside like a normal SPARC machine."
              />
            </div>

            <BulletCard
              heading="Planning tips"
              points={[
                "Decide CPU and memory sizing based on workload.",
                "Plan ZFS layout for domain disks (root, data, logs, etc.).",
                "Design IP and VLAN for vnets beforehand.",
              ]}
            />
          </section>

          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Commands and examples
            </h2>

            {guestSnips.map((s, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-xs text-slate-400">{s.desc}</p>
                <TerminalOutput
                  content={s.content}
                  title="terminal — guest domain"
                  contextLabel="ldoms-lab"
                  maxHeight="20rem"
                />
              </div>
            ))}
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
