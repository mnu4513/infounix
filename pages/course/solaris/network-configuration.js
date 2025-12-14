// pages/course/solaris/network-configuration.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiGlobe,
  FiServer,
  FiCpu,
  FiLayers,
  FiAlertTriangle,
  FiArrowRight,
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

/* ---------- Terminal snippets: grouped flows ---------- */

const networkSnippets = [
  {
    id: "discover-network",
    title: "Discover current network configuration (ifconfig, dladm, ipadm)",
    description:
      "Start by listing physical links, IP interfaces and addresses using ifconfig, dladm and ipadm.",
    content: `[root@solaris ~]# ifconfig -a
lo0: flags=2001000849<UP,LOOPBACK,RUNNING,MULTICAST,IPv4,VIRTUAL> mtu 8232 index 1
        inet 127.0.0.1 netmask ff000000
net0: flags=1000843<UP,BROADCAST,RUNNING,MULTICAST,IPv4> mtu 1500 index 2
        inet 192.168.131.140 netmask ffffff00 broadcast 192.168.131.255
net1: flags=1000802<BROADCAST,MULTICAST,IPv4> mtu 1500 index 3
        inet 0.0.0.0 netmask 0

# Datalink view (layer-2)
[root@solaris ~]# dladm show-link
LINK        CLASS     MTU    STATE    OVER
net0        phys      1500   up       --
net1        phys      1500   down     --

[root@solaris ~]# dladm show-phys
LINK        MEDIA     STATE    SPEED  DUPLEX    DEVICE
net0        Ethernet  up       1000   full      e1000g0
net1        Ethernet  down     0      unknown   e1000g1

[root@solaris ~]# dladm show-phys -m
LINK        SLOT     ADDRESS            INUSE CLIENT
net0        primary  00:25:90:aa:bb:cc  yes   net0
net1        primary  00:25:90:aa:bb:dd  no    --

[root@solaris ~]# dladm show-phys -L
LINK        LPORT
net0        net0
net1        net1

# IP layer view
[root@solaris ~]# ipadm
NAME        CLASS/TYPE STATE       ADDR
lo0         loopback   ok          ---
   lo0/v4   static     ok          127.0.0.1/8
net0        ip         ok          ---
   net0/v4  static     ok          192.168.131.140/24
net1        ip         down        ---`,
  },
  {
    id: "configure-static-ip",
    title: "Configure a static IP on an interface with ipadm",
    description:
      "Create an IP interface over a datalink (net1), then assign a static IPv4 address. Later we’ll see how to remove it.",
    content: `# Create IP interface object on datalink net1
[root@solaris ~]# ipadm create-ip net1

# Assign static IPv4 address (example address)
[root@solaris ~]# ipadm create-addr -T static -a 192.168.131.142/24 net1/v4

[root@solaris ~]# ipadm
NAME        CLASS/TYPE STATE       ADDR
net1        ip         ok          ---
   net1/v4  static     ok          192.168.131.142/24

# Verify with ifconfig
[root@solaris ~]# ifconfig net1
net1: flags=1000843<UP,BROADCAST,RUNNING,MULTICAST,IPv4> mtu 1500 index 3
        inet 192.168.131.142 netmask ffffff00 broadcast 192.168.131.255

# Remove the IP address and IP interface when no longer needed
[root@solaris ~]# ipadm delete-addr net1/v4
[root@solaris ~]# ipadm delete-ip net1

[root@solaris ~]# ipadm
NAME        CLASS/TYPE STATE       ADDR
net0        ip         ok          ---
   net0/v4  static     ok          192.168.131.140/24`,
  },
  {
    id: "vnic-management",
    title: "Create and delete a VNIC on a physical link",
    description:
      "A VNIC is a virtual NIC built on top of a physical datalink. It appears as a separate link to IP.",
    content: `# Check physical links
[root@solaris ~]# dladm show-link
LINK        CLASS     MTU    STATE    OVER
net0        phys      1500   up       --
net1        phys      1500   up       --

# Create a VNIC over net1
[root@solaris ~]# dladm create-vnic -i net1 vnic0

[root@solaris ~]# dladm show-link
LINK        CLASS     MTU    STATE    OVER
net0        phys      1500   up       --
net1        phys      1500   up       --
vnic0       vnic      1500   up       net1

# Now configure IP on VNIC using ipadm
[root@solaris ~]# ipadm create-ip vnic0
[root@solaris ~]# ipadm create-addr -T static -a 192.168.131.150/24 vnic0/v4

[root@solaris ~]# ipadm
NAME        CLASS/TYPE STATE       ADDR
vnic0       ip         ok          ---
   vnic0/v4 static     ok          192.168.131.150/24

# Delete VNIC (after removing IP)
[root@solaris ~]# ipadm delete-addr vnic0/v4
[root@solaris ~]# ipadm delete-ip vnic0
[root@solaris ~]# dladm delete-vnic vnic0`,
  },
  {
    id: "ipmp-create",
    title: "Configure basic IPMP using VNICs",
    description:
      "IPMP (IP Multipathing) provides link/IP failover and load spreading. Here we build an IPMP group out of two VNICs.",
    content: `# Assume net1 is our underlying physical link
[root@solaris ~]# dladm create-vnic -i net1 vnic0
[root@solaris ~]# dladm create-vnic -i net1 vnic1

[root@solaris ~]# dladm show-link
LINK        CLASS     MTU    STATE    OVER
net0        phys      1500   up       --
net1        phys      1500   up       --
vnic0       vnic      1500   up       net1
vnic1       vnic      1500   up       net1

# Create IPMP interface
[root@solaris ~]# ipadm create-ipmp ipmp1

# Add VNICs as IPMP data links
[root@solaris ~]# ipadm add-ipmp -i vnic0 -i vnic1 ipmp1

# Assign a static IP address to the IPMP interface
[root@solaris ~]# ipadm create-addr -T static -a 192.168.131.200/24 ipmp1/v4

[root@solaris ~]# ipadm
NAME        CLASS/TYPE STATE       ADDR
ipmp1       ipmp       ok          ---
   ipmp1/v4 static     ok          192.168.131.200/24
vnic0       ip         ok          ---
vnic1       ip         ok          ---`,
  },
  {
    id: "ipmp-monitoring",
    title: "Monitor IPMP with ipmpstat and test failover",
    description:
      "Use ipmpstat to see group status and interfaces, and if_mpadm to simulate failure and recovery.",
    content: `# Group-level view
[root@solaris ~]# ipmpstat -g
GROUP   GROUPNAME   STATE     FDT       INTERFACES
ipmp1   ipmp1       ok        --        vnic0 vnic1

# Interface-level view
[root@solaris ~]# ipmpstat -i
INTERFACE GROUP   STATE  SEND   RECV   CMD     RUNNING
vnic0     ipmp1   up     10/10  10/10  default yes
vnic1     ipmp1   up     10/10  10/10  default yes

# Simulate taking vnic0 offline for maintenance
[root@solaris ~]# if_mpadm -d vnic0

[root@solaris ~]# ipmpstat -i
INTERFACE GROUP   STATE  SEND   RECV   CMD     RUNNING
vnic0     ipmp1   down   0/10   0/10   default no
vnic1     ipmp1   up     10/10  10/10  default yes

# Bring vnic0 back
[root@solaris ~]# if_mpadm -r vnic0

[root@solaris ~]# ipmpstat -i
INTERFACE GROUP   STATE  SEND   RECV   CMD     RUNNING
vnic0     ipmp1   up     10/10  10/10  default yes
vnic1     ipmp1   up     10/10  10/10  default yes`,
  },
  {
    id: "ipmp-remove",
    title: "Tear down IPMP configuration cleanly",
    description:
      "When lab testing is done, remove addresses, detach links from IPMP, then delete the group and VNICs.",
    content: `# Remove the IP address on the IPMP interface
[root@solaris ~]# ipadm delete-addr ipmp1/v4

# Remove a VNIC from the IPMP group
[root@solaris ~]# ipadm remove-ipmp -i vnic1 ipmp1

# Remove the IPMP interface
[root@solaris ~]# ipadm delete-ipmp ipmp1

# Delete IP configuration on VNICs (if present) and remove VNICs
[root@solaris ~]# ipadm delete-ip vnic0
ipadm: cannot delete vnic0: object does not exist (if you only used it for IPMP, there may be no ipadm object)

[root@solaris ~]# dladm delete-vnic vnic0
[root@solaris ~]# dladm delete-vnic vnic1

[root@solaris ~]# ipadm
NAME        CLASS/TYPE STATE       ADDR
net0        ip         ok          ---
   net0/v4  static     ok          192.168.131.140/24`,
  },
];

export default function NetworkConfigurationPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "network-configuration") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Network Configuration"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to inspect and configure network interfaces, VNICs and IPMP groups in Solaris using ifconfig, dladm, ipadm and ipmpstat."
          }
        />
      </Head>

      <SolarisLayout activeSlug="network-configuration">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 15
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#ff5b5b] md:text-3xl">
            {lesson.title || "Network Configuration in Solaris"}
          </h1>
          {lesson.short && (
            <p className="mt-1 max-w-2xl text-sm text-slate-300">
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
                title={
                  lesson.title || "Network Configuration in Solaris"
                }
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
          className="space-y-8 text-sm leading-relaxed text-slate-200"
        >
          {/* Overview / Theory */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Solaris network stack: layers you must understand
            </h2>
            <p>
              Solaris network configuration is built in layers. Once you
              understand the difference between{" "}
              <span className="font-semibold">
                datalinks, IP interfaces, VNICs and IPMP groups
              </span>
              , the commands become much easier to remember.
            </p>
          </section>

          {/* Concept cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Core building blocks: dladm, ipadm, VNIC, IPMP
            </h2>
            <div className="grid gap-4 md:grid-cols-4">
              <FeatureCard
                icon={<FiServer className="text-lg" />}
                title="Datalinks (dladm)"
                text="Layer-2 objects representing NICs and VNICs. Use dladm show-link/show-phys to view physical state, MAC, speed and duplex."
              />
              <FeatureCard
                icon={<FiGlobe className="text-lg" />}
                title="IP interfaces (ipadm)"
                text="Layer-3 logical interfaces over datalinks (net0, vnic0, etc.). ipadm manages IP objects and addresses."
              />
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="VNICs"
                text="Virtual NICs built on a physical datalink. Useful for virtualisation, isolation, and IPMP in lab or cloud-like setups."
              />
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="IPMP"
                text="IP Multipathing provides link/IP redundancy and optional load spreading, monitored via ipmpstat."
              />
            </div>
          </section>

          {/* Step-by-step terminals */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Step-by-step: from discovery to VNIC and IPMP
            </h2>
            <p>
              The following flows take you from reading existing configuration,
              to adding a static IP, to creating VNICs and finally building an
              IPMP group with failover testing.
            </p>

            {networkSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — network"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* Summary / theory bullets */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Theory recap: where each command fits
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Command roles"
                points={[
                  "ifconfig -a → legacy view, still useful for quick checks.",
                  "dladm show-link/show-phys → layer-2 state, media, MAC, speed, link status.",
                  "dladm show-phys -m / -L → MAC addresses and logical port info.",
                  "ipadm → layer-3 configuration (create-ip, create-addr, delete-addr, delete-ip).",
                  "dladm create-vnic/delete-vnic → manage VNICs over physical links.",
                ]}
              />
              <BulletCard
                heading="IPMP & failover"
                points={[
                  "ipadm create-ipmp ipmpX → create IPMP interface.",
                  "ipadm add-ipmp -i vnic0 -i vnic1 ipmpX → add interfaces to IPMP group.",
                  "ipadm create-addr -T static -a <IP> ipmpX → assign IP to the IPMP interface.",
                  "ipmpstat -g/-i → check group and interface health.",
                  "if_mpadm -d/-r vnic → simulate or perform offline/online actions for maintenance.",
                ]}
              />
            </div>
          </section>

          {/* Safety / best practices */}
          <section className="space-y-3 rounded-2xl border border-amber-500/60 bg-amber-500/10 p-4 shadow-lg shadow-amber-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-200">
              <FiAlertTriangle className="text-base" />
              Network configuration safety tips
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-amber-50">
              <li>
                When working on remote servers over SSH, be very careful while
                changing the IP of the interface you are currently using.
              </li>
              <li>
                Prefer testing new network configurations on a console session
                (ILO/ALOM/IPMI) or in a lab first.
              </li>
              <li>
                For IPMP, always test failover with <code>ipmpstat</code> and{" "}
                <code>if_mpadm</code> before assuming redundancy is working.
              </li>
              <li>
                Document IP schemes, VNIC mappings and IPMP groups so that
                future admins can understand your design quickly.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-amber-200">
              Once you’re comfortable with these tools, networking on Solaris
              (even with zones and virtualisation) becomes much easier to
              reason about.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
