// pages/course/solaris/ldoms-io-domain.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiHardDrive, FiServer, FiLayers } from "react-icons/fi";

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

const ioSnips = [
  {
    title: "Assign a PCIe root complex to an I/O domain",
    desc: "Example: move a PCI nexus from primary to io-domain.",
    content: `# List PCI root complexes
[root@primary ~]# ldm list-io

NAME                                      TYPE   BUS      DOMAIN
pci_0                                     BUS    pci@500  primary
pci_1                                     BUS    pci@600  primary

# Create I/O domain
[root@primary ~]# ldm add-domain io-domain1

# Assign pci_1 to io-domain1
[root@primary ~]# ldm set-io pci_1 io-domain1

# Set resources
[root@primary ~]# ldm set-vcpu 4 io-domain1
[root@primary ~]# ldm set-memory 8G io-domain1

[root@primary ~]# ldm bind io-domain1
[root@primary ~]# ldm start io-domain1`,
  },
  {
    title: "Create virtual disk service on service domain",
    desc: "vds provides virtual disks to guests.",
    content: `# On primary or dedicated service domain:
[root@primary ~]# ldm add-vds primary-vds0 primary

# Add backend device to vds
[root@primary ~]# ldm add-vdsdev /dev/zvol/dsk/rpool/ldoms/ldg1-root \
    ldg1-root@primary-vds0

# Add vdisk to guest
[root@primary ~]# ldm add-vdisk vdisk0 ldg1-root@primary-vds0 ldg1`,
  },
  {
    title: "Create virtual switch on I/O/service domain",
    desc: "vsw bridges physical NIC to virtual NICs.",
    content: `# Create vsw on net0
[root@primary ~]# ldm add-vsw net-dev=net0 primary-vsw0 primary

# Add vnet to guest
[root@primary ~]# ldm add-vnet vnet0 primary-vsw0 ldg1`,
  },
];

export default function LdomsIoDomainPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "ldoms-io-domain") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "LDOMs – Configuring I/O & Service Domains"} |
          InfoUnix
        </title>
      </Head>

      <SolarisLayout activeSlug="ldoms-io-domain">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">
            Solaris SPARC · LDOMs · I/O
          </p>
          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            Configuring I/O & Service Domains
          </h1>
          <p className="mt-2 max-w-3xl text-sm dark:text-slate-300">
            I/O domains own physical PCI buses. Service domains provide virtual
            disks and networks to guest domains. In many installations, the
            primary domain is both, but for high availability you can split the
            roles across multiple domains.
          </p>
          <div className="mt-3 h-px bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
        </motion.header>

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
                title={lesson.title || "LDOM I/O domain"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your I/O domain configuration video URL in{" "}
              <code>solarisLessons.js</code>.
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
              I/O domain vs service domain – quick recap
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<FiHardDrive className="text-lg" />}
                title="I/O domain"
                text="Owns physical PCI root complexes and HBAs; has direct hardware access."
              />
              <FeatureCard
                icon={<FiServer className="text-lg" />}
                title="Service domain"
                text="Exports virtual disks (vds) and networks (vsw) to guests using physical devices from I/O domain."
              />
            </div>

            <BulletCard
              heading="Common layouts"
              points={[
                "Small setups: primary = control + service + I/O.",
                "HA setups: dedicated I/O/service domains for redundancy.",
              ]}
            />
          </section>

          <section className="space-y-6">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Basic I/O and service domain configuration – examples
            </h2>

            {ioSnips.map((s, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {i + 1}. {s.title}
                </h3>
                <p className="text-xs dark:text-slate-400">{s.desc}</p>
                <TerminalOutput
                  content={s.content}
                  title="terminal — io domain"
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
