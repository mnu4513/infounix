// pages/course/solaris/zones.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiLayers,
  FiCpu,
  FiServer,
  FiShield,
  FiActivity,
  FiAlertTriangle,
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

const zoneSnippets = [
  {
    id: "check-global-zone",
    title: "Check if you are in the global zone",
    description:
      "In Solaris, the global zone has ID 0. Non-global zones have ID > 0.",
    content: `[root@solaris ~]# zonename
global

[root@solaris ~]# zoneadm list -cv
  ID NAME             STATUS     PATH                           BRAND     IP
   0 global           running    /                              solaris   shared`,
  },
  {
    id: "virtinfo",
    title: "Check virtualization capabilities (kernel zones support)",
    description:
      "virtinfo shows if the system supports kernel zones and what features are available.",
    content: `[root@solaris ~]# virtinfo -a
Hostname: sol11-kz-host
...
kz_enabled     supported
lDom_control   not supported
brand          native

# If 'kz_enabled' is supported/true, you can use kernel zones.`,
  },
  {
    id: "create-kz-zonecfg",
    title: "Create a kernel zone configuration (zonecfg)",
    description:
      "Use brand solaris-kz or template SYSsolaris-kz to define a kernel zone.",
    content: `# Create a new kernel zone definition
[root@solaris ~]# zonecfg -z kz1
zonecfg:kz1> create -t SYSsolaris-kz
zonecfg:kz1> set zonepath=/system/zones/kz1

# Set memory and vCPUs (example)
zonecfg:kz1> add capped-memory
zonecfg:kz1:capped-memory> set physical=4G
zonecfg:kz1:capped-memory> end

zonecfg:kz1> add capped-cpu
zonecfg:kz1:capped-cpu> set ncpus=2
zonecfg:kz1:capped-cpu> end

# Network
zonecfg:kz1> add net
zonecfg:kz1:net> set physical=net0
zonecfg:kz1:net> end

# Verify and commit
zonecfg:kz1> verify
zonecfg:kz1> commit
zonecfg:kz1> exit`,
  },
  {
    id: "install-kz",
    title: "Install the kernel zone",
    description:
      "zoneadm install will create the zone’s root image (can use local or network repo).",
    content: `[root@solaris ~]# zoneadm -z kz1 install
A ZFS file system has been created for this zone.

      Image: Preparing at /system/zones/kz1/root.
  Installing: This may take several minutes...
      Done: Installation completed in 950.123 seconds.

  Next Steps: Boot the zone, then log into the zone console.
              Log in as 'root' to configure the zone.`,
  },
  {
    id: "boot-kz",
    title: "Boot kernel zone and login (zlogin)",
    description:
      "Once installed, boot the zone and access it using zlogin -C (console).",
    content: `[root@solaris ~]# zoneadm -z kz1 boot

[root@solaris ~]# zoneadm list -cv
  ID NAME             STATUS     PATH                           BRAND       IP
   0 global           running    /                              solaris     shared
   1 kz1              running    /system/zones/kz1              solaris-kz  excl

[root@solaris ~]# zlogin -C kz1
[Connected to zone 'kz1' console]

Hostname: kz1
...
kz1 console login: root
Password:
# Now you are inside the kernel zone.`,
  },
  {
    id: "reboot-halt-kz",
    title: "Reboot and halt a kernel zone",
    description:
      "You can manage kernel zones from global zone using zoneadm.",
    content: `# Reboot the kernel zone
[root@solaris ~]# zoneadm -z kz1 reboot

# Gracefully halt the kernel zone
[root@solaris ~]# zoneadm -z kz1 halt

[root@solaris ~]# zoneadm list -cv
  ID NAME             STATUS     PATH                           BRAND       IP
   0 global           running    /                              solaris     shared
   - kz1              installed  /system/zones/kz1              solaris-kz  excl`,
  },
  {
    id: "uninstall-delete-kz",
    title: "Uninstall and remove a kernel zone",
    description:
      "Use uninstall to remove OS image; delete removes the configuration.",
    content: `# Uninstall kernel zone OS image
[root@solaris ~]# zoneadm -z kz1 uninstall -F

# Remove zone configuration
[root@solaris ~]# zonecfg -z kz1 delete -F`,
  },
  {
    id: "zonecfg-info",
    title: "View zone configuration",
    description:
      "Use zonecfg -z <zonename> info to see properties of the zone.",
    content: `[root@solaris ~]# zonecfg -z kz1 info
zonename: kz1
zonepath: /system/zones/kz1
brand: solaris-kz
autoboot: false
...
capped-memory:
    physical: 4G
capped-cpu:
    ncpus: 2`,
  },
];

/* -------------------- PAGE COMPONENT -------------------- */

export default function ZonesPage() {
  const lesson = solarisLessons.find((l) => l.slug === "zones") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Zones & Kernel Zones in Solaris"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Deep dive into Solaris zones, including global zone, non-global zones and kernel zones with detailed configuration and examples."
          }
        />
      </Head>

      <SolarisLayout activeSlug="zones">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Virtualization
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            {lesson.title || "Zones & Kernel Zones in Solaris"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm text-slate-300">
            Zones are Solaris&apos;s built-in OS virtualization technology. The
            global zone owns the hardware; non-global zones are isolated
            environments inside the same OS. Kernel zones go one step further:
            they run their own kernel and SRU level on top of a Solaris host,
            like lightweight VMs with ZFS integration.
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
                title={lesson.title || "Zones & Kernel Zones in Solaris"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your Zones/Kernel Zones video URL in{" "}
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
          {/* WHAT / WHY OVERVIEW */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              What are Zones in Solaris?
            </h2>

            <p>
              A <span className="font-semibold">zone</span> is a virtualized
              Solaris environment that shares the same kernel as the global
              zone, but appears as a separate OS instance to applications and
              users. Zones provide isolation, security and consolidation on a
              single Solaris host.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiServer className="text-lg" />}
                title="Global Zone"
                text="The primary OS instance with full control over hardware and all zones. Zone ID 0."
              />
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="Non-Global Zones"
                text="Isolated environments inside the same kernel, used to separate applications, environments or tenants."
              />
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="Kernel Zones"
                text="Nested Solaris instances with their own kernel & SRU level, running on top of a Solaris host (brand: solaris-kz)."
              />
            </div>

            <BulletCard
              heading="Why use zones?"
              points={[
                "Consolidate many environments on one physical server.",
                "Isolate applications for security and stability.",
                "Simplify patching and rollout (zone-level changes).",
                "Kernel zones allow different SRU levels per guest.",
              ]}
            />
          </section>

          {/* GLOBAL vs NON-GLOBAL vs KERNEL ZONES */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Global Zone, Non-Global Zones, and Kernel Zones – Differences
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <BulletCard
                heading="Global Zone"
                points={[
                  "Zone ID = 0.",
                  "Has full access to hardware, ZFS pools, network interfaces.",
                  "Manages and controls all other zones.",
                  "All admin tasks (zonecfg, zoneadm) are done from here.",
                ]}
              />
              <BulletCard
                heading="Non-Global Zones (brand: solaris)"
                points={[
                  "Share the same kernel as the global zone.",
                  "Can have their own file systems, packages, services.",
                  "Good for app isolation but same kernel/SRU level.",
                ]}
              />
              <BulletCard
                heading="Kernel Zones (brand: solaris-kz)"
                points={[
                  "Run their own Solaris kernel on top of host.",
                  "Can have different SRU level from the host.",
                  "Behave more like full VMs but tightly integrated with ZFS.",
                ]}
              />
            </div>
          </section>

          {/* CHECK WHERE YOU ARE / CAPABILITIES */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Identifying global zone and kernel zone capability
            </h2>

            <TerminalOutput
              content={zoneSnippets[0].content}
              title="terminal — global zone check"
              contextLabel="solaris-lab"
            />

            <TerminalOutput
              content={zoneSnippets[1].content}
              title="terminal — virtinfo"
              contextLabel="solaris-lab"
            />
          </section>

          {/* KERNEL ZONES – THEORY */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Kernel Zones – what and why?
            </h2>

            <p>
              A <span className="font-semibold">kernel zone</span> is a special
              kind of zone that runs its own Solaris kernel, providing an extra
              layer of isolation and flexibility. The host system (global zone)
              sees it as a guest, but inside the kernel zone it looks like a
              full Solaris machine.
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Advantages of kernel zones"
                points={[
                  "Different SRU level from the host – great for testing upgrades.",
                  "Better isolation from host kernel issues.",
                  "Useful when application certification requires a specific SRU.",
                  "Snapshot/clone/migration capabilities (depending on version).",
                ]}
              />
              <BulletCard
                heading="When *not* to use kernel zones"
                points={[
                  "If simple isolation using non-global zones is enough.",
                  "If you don’t want extra overhead of another kernel.",
                  "If hardware resources are very tight.",
                ]}
              />
            </div>
          </section>

          {/* KERNEL ZONES – PRACTICAL FLOW */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Practical: create, install, boot and manage a kernel zone
            </h2>

            {/* create */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                1. Configure kernel zone using zonecfg
              </h3>
              <p className="text-xs text-slate-400">
                Define zonepath, memory/CPU caps, network, and other properties.
              </p>
              <TerminalOutput
                content={zoneSnippets[2].content}
                title="terminal — zonecfg kernel zone"
                contextLabel="solaris-lab"
                maxHeight="20rem"
              />
            </div>

            {/* install */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                2. Install the kernel zone
              </h3>
              <p className="text-xs text-slate-400">
                This creates the OS image for the kernel zone (root filesystem,
                packages). It may use local or network IPS repository.
              </p>
              <TerminalOutput
                content={zoneSnippets[3].content}
                title="terminal — zoneadm install"
                contextLabel="solaris-lab"
                maxHeight="16rem"
              />
            </div>

            {/* boot & zlogin */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                3. Boot the kernel zone and log in
              </h3>
              <p className="text-xs text-slate-400">
                After boot, use <code>zlogin -C &lt;zone&gt;</code> to access
                the console for initial configuration.
              </p>
              <TerminalOutput
                content={zoneSnippets[4].content}
                title="terminal — zoneadm boot & zlogin"
                contextLabel="solaris-lab"
                maxHeight="20rem"
              />
            </div>

            {/* reboot/halt */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                4. Reboot / halt kernel zone
              </h3>
              <p className="text-xs text-slate-400">
                You can manage kernel zones centrally from the global zone.
              </p>
              <TerminalOutput
                content={zoneSnippets[5].content}
                title="terminal — reboot/halt"
                contextLabel="solaris-lab"
                maxHeight="14rem"
              />
            </div>

            {/* uninstall/delete */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                5. Uninstall and remove kernel zone (optional)
              </h3>
              <p className="text-xs text-slate-400">
                When no longer needed, cleanly uninstall and delete the zone.
              </p>
              <TerminalOutput
                content={zoneSnippets[6].content}
                title="terminal — uninstall/delete"
                contextLabel="solaris-lab"
              />
            </div>

            {/* info */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-100">
                6. View configuration anytime
              </h3>
              <TerminalOutput
                content={zoneSnippets[7].content}
                title="terminal — zonecfg info"
                contextLabel="solaris-lab"
              />
            </div>
          </section>

          {/* BEST PRACTICES / SAFETY */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <FiShield className="text-base" />
              Best practices for working with zones
            </h2>

            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-red-100">
              <li>
                Plan CPU and memory allocation; don’t overcommit on production
                without understanding workload.
              </li>
              <li>
                Keep zone configurations (zonecfg export) in version control for
                DR and documentation.
              </li>
              <li>
                Use ZFS snapshots of zone datasets before risky changes/patches,
                especially for kernel zones.
              </li>
              <li>
                Always manage zones from the global zone; avoid hacking files
                directly under zonepath from outside.
              </li>
            </ul>

            <p className="mt-2 text-[12px] text-red-200 flex items-center gap-1">
              Once you&apos;re comfortable with zones and kernel zones, Solaris
              becomes a very powerful consolidation and test platform.
              <FiActivity className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
