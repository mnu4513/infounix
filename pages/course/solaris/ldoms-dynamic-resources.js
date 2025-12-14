// pages/course/solaris/ldoms-dynamic-resources.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiTrendingUp,
  FiAlertTriangle,
  FiHardDrive,
} from "react-icons/fi";

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

const dynSnips = [
  {
    title: "Add CPUs dynamically to a running domain",
    desc: "Increase vCPUs without reboot (if supported by OS and version).",
    content: `[root@primary ~]# ldm list ldg1
NAME             STATE      FLAGS   CONS    VCPU  MEMORY   UTIL  UPTIME
ldg1             active     -t----  5000    4     8G       25%   10d

# Add 2 more vCPUs
[root@primary ~]# ldm set-vcpu 6 ldg1

[root@primary ~]# ldm list ldg1
ldg1             active     -t----  5000    6     8G       18%   10d`,
  },
  {
    title: "Remove CPUs dynamically",
    desc: "Reduce vCPUs when load is low (careful in production).",
    content: `# Reduce from 6 to 4 vCPUs
[root@primary ~]# ldm set-vcpu 4 ldg1`,
  },
  {
    title: "Increase memory dynamically",
    desc: "Memory add is usually online; removal may require planning.",
    content: `[root@primary ~]# ldm set-memory 12G ldg1

[root@primary ~]# ldm list ldg1
ldg1             active     -t----  5000    4     12G      15%   11d`,
  },
  {
    title: "Dynamic vdisk add",
    desc: "Add extra vdisk while domain is online.",
    content: `# Create backend zvol
[root@primary ~]# zfs create -V 100G rpool/ldoms/ldg1-data

# Add to vds
[root@primary ~]# ldm add-vdsdev /dev/zvol/dsk/rpool/ldoms/ldg1-data \\
    ldg1-data@primary-vds0

# Add vdisk to guest
[root@primary ~]# ldm add-vdisk data1 ldg1-data@primary-vds0 ldg1

# Inside ldg1, new disk appears, then you can format/fdisk/ZFS etc.`,
  },
];

export default function LdomsDynamicResourcesPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "ldoms-dynamic-resources") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "LDOMs – Dynamic Resource Management"} | InfoUnix
        </title>
      </Head>

      <SolarisLayout activeSlug="ldoms-dynamic-resources">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">
            Solaris SPARC · LDOMs · DRS
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            Dynamic CPU, Memory & I/O Management
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            One of the strengths of LDOMs is the ability to adjust resources
            while domains are running. You can add or remove vCPUs, memory and
            virtual disks without always requiring downtime – depending on OS
            and workload.
          </p>
          <div className="mt-3 h-px bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
        </motion.header>

        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed text-slate-200"
        >
          {/* OVERVIEW */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              What is dynamic resource management?
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="vCPU scaling"
                text="Adjust vCPUs assigned to a domain as demand changes."
              />
              <FeatureCard
                icon={<FiTrendingUp className="text-lg" />}
                title="Memory tuning"
                text="Increase memory online; memory remove may need extra care."
              />
              <FeatureCard
                icon={<FiHardDrive className="text-lg" />}
                title="Online disk attach"
                text="Attach new virtual disks without rebooting guests."
              />
            </div>

            <BulletCard
              heading="Why use it?"
              points={[
                "Handle peak loads without overprovisioning always.",
                "Free resources from idle domains.",
                "Support changing app requirements without outages.",
              ]}
            />
          </section>

          {/* COMMANDS */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Commands and examples
            </h2>

            {dynSnips.map((s, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-xs text-slate-400">{s.desc}</p>
                <TerminalOutput
                  content={s.content}
                  title="terminal — dynamic resources"
                  contextLabel="ldoms-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* WARNING BOX */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-200">
              <FiAlertTriangle className="text-base" />
              Caution for production environments
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-red-100">
              <li>
                Coordinate CPU/memory changes with application teams – some apps
                read resources only at startup.
              </li>
              <li>
                Always monitor performance before and after changes (
                <code>prstat</code>, <code>vmstat</code>, <code>iostat</code>).
              </li>
              <li>
                Avoid aggressive shrinking of resources during business hours.
              </li>
            </ul>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
