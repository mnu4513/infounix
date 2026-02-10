// pages/course/solaris/nfs.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiServer,
  FiMonitor,
  FiFolder,
  FiShield,
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

/* ---------- Terminal snippets: server + client flows ---------- */

const nfsSnippets = [
  {
    id: "pkg-nfs",
    title: "Check and install NFS packages (server & client)",
    description:
      "Most Solaris 11 systems already have NFS, but you can verify and install using IPS.",
    content: `[root@localhost:~]# pkg list nfs
NAME (PUBLISHER)                                  VERSION                    IFO
service/network/nfs                               0.5.11-0.175.3.0.0.30.0    i--

# If not installed:
[root@localhost:~]# pkg install pkg://solaris/service/network/nfs`,
  },
  {
    id: "start-nfs-service",
    title: "Enable and start NFS server service (SMF)",
    description:
      "Use svcadm to enable NFS server and svcs to verify it is online.",
    content: `[root@localhost:~]# svcadm enable svc:/network/nfs/server

# Start/restart immediately:
[root@localhost:~]# svcadm restart svc:/network/nfs/server

# Verify status:
[root@localhost:~]# svcs svc:/network/nfs/server
STATE          STIME    FMRI
online         10:21:03 svc:/network/nfs/server:default`,
  },
  {
    id: "dfstab-basic-share",
    title: "Configure a basic NFS share in /etc/dfs/dfstab",
    description:
      "dfstab defines which directories are exported. shareall reads this file and activates exports.",
    content: `[root@localhost:~]# vi /etc/dfs/dfstab

# Example line inside dfstab:
share -F nfs -o rw,anon=0 /export/home

# Meaning:
# -F nfs       → NFS share
# -o rw        → read/write for allowed clients
# anon=0       → map anonymous users to root (lab only, not recommended in prod)
# /export/home → directory to export

# Apply all shares from dfstab:
[root@localhost:~]# shareall

# See active shares:
[root@localhost:~]# share
-               /export/home   rw   "NFS export of home"`,
  },
  {
    id: "dfstab-client-specific",
    title: "Share directory with specific clients and permissions",
    description:
      "Use rw= / ro= / root= to control which clients and hosts get which access level.",
    content: `[root@localhost:~]# vi /etc/dfs/dfstab

# Example: project share with different access per client
share -F nfs -o rw=10.0.0.10,ro=10.0.0.20,root=adminhost /export/projects

# Explanation:
# rw=10.0.0.10     → client 10.0.0.10 has read/write access
# ro=10.0.0.20     → client 10.0.0.20 is read-only
# root=adminhost   → root user from 'adminhost' is not squashed
# (other clients are denied by default)

[root@localhost:~]# shareall
[root@localhost:~]# share
-  /export/projects  rw=10.0.0.10,ro=10.0.0.20,root=adminhost`,
  },
  {
    id: "firewall-note",
    title: "Firewall ports needed for NFS (conceptual)",
    description:
      "On systems with firewall/pf configured, make sure NFS-related ports are allowed.",
    content: `# Typical ports (varies by version/config):
# 2049/tcp,udp   → NFS
# 111/tcp,udp    → rpcbind
# 20048/tcp,udp  → mountd (in some configurations)

# On Solaris 11 with IPF or ipfilter/pf, adjust rules accordingly.
# This is environment-specific, so follow local security policy.`,
  },
  {
    id: "client-mount",
    title: "Mount NFS share on client temporarily",
    description:
      "Mount the exported directory on a local mountpoint. Great for testing.",
    content: `# On NFS client:
[root@client:~]# mkdir -p /mnt/nfs_home

[root@client:~]# mount -F nfs 192.168.1.10:/export/home /mnt/nfs_home

# Verify:
[root@client:~]# mount
...
192.168.1.10:/export/home  on  /mnt/nfs_home  remote/read-write/setuid/devices/rstchown/xattr/dev=2560002 on Fri Jan 10 11:05:43 2025`,
  },
  {
    id: "client-vfstab",
    title: "Automount NFS share using /etc/vfstab",
    description:
      "Add an entry so the share mounts automatically at boot on the client.",
    content: `# On NFS client:
[root@client:~]# vi /etc/vfstab

# Example line:
192.168.1.10:/export/home  -  /mnt/nfs_home  nfs  -  yes  rw

# Fields:
# server:/path   -   mountpoint  fstype  -  mount-at-boot  mount-options

# After saving, either reboot or run:
[root@client:~]# mount /mnt/nfs_home`,
  },
  {
    id: "verify-share",
    title: "Verify exports from server and mounts from client",
    description:
      "Use share/showmount on server, mount on client to confirm configuration.",
    content: `# On NFS server:
[root@server:~]# share
-  /export/home      rw   "Home export"
-  /export/projects  rw=10.0.0.10,ro=10.0.0.20,root=adminhost

[root@server:~]# showmount -e
export list for server:
 /export/home      (everyone)
 /export/projects  10.0.0.10,10.0.0.20

# On NFS client:
[root@client:~]# mount | grep nfs
192.168.1.10:/export/home on /mnt/nfs_home ...`,
  },
  {
    id: "umount-client",
    title: "Unmount NFS share on client",
    description:
      "Always unmount cleanly before removing vfstab entries or shutting down server for maintenance.",
    content: `[root@client:~]# umount /mnt/nfs_home`,
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting common NFS issues",
    description:
      "Use svcs, showmount, logs and ping to diagnose most problems.",
    content: `# 1) Check NFS server service:
[root@server:~]# svcs svc:/network/nfs/server
STATE          STIME    FMRI
online         10:21:03 svc:/network/nfs/server:default

# 2) Check exports:
[root@server:~]# share
[root@server:~]# showmount -e

# 3) On client – test ping:
[root@client:~]# ping 192.168.1.10

# 4) Check logs for errors:
[root@server:~]# tail -50 /var/adm/messages
[root@server:~]# tail -50 /var/log/syslog

# 5) If mount fails, verify dfstab syntax and run:
[root@server:~]# shareall`,
  },
];

export default function NFSPage() {
  const lesson = solarisLessons.find((l) => l.slug === "nfs") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "NFS in Solaris"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to configure NFS server and client in Solaris, manage exports, set client-specific permissions, and troubleshoot issues."
          }
        />
      </Head>

      <SolarisLayout activeSlug="nfs">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 22
          </p>

          <h1 className="mt-1 text-3xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
            {lesson.title || "NFS – Network File System in Solaris"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm dark:text-slate-300">
            NFS lets you share files and directories over the network so that
            remote systems can access them as if they were local. In Solaris,
            NFS is tightly integrated with SMF and IPS, making it easy to set up
            reliable file sharing between Unix systems.
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
                title={lesson.title || "NFS in Solaris"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add the YouTube embed URL for this lesson in{" "}
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
          {/* OVERVIEW / THEORY */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              NFS overview – server, client and exports
            </h2>
            <p>
              <span className="font-semibold">NFS (Network File System)</span>{" "}
              allows one Solaris system to act as an{" "}
              <span className="font-semibold">NFS server</span> and share
              directories, while other systems act as{" "}
              <span className="font-semibold">NFS clients</span> and mount those
              shared directories over the network.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiServer className="text-lg" />}
                title="NFS Server"
                text="Exports directories to the network using dfstab/SMF and provides file data to clients."
              />
              <FeatureCard
                icon={<FiMonitor className="text-lg" />}
                title="NFS Client"
                text="Mounts exported directories and accesses them as if they were local filesystems."
              />
              <FeatureCard
                icon={<FiFolder className="text-lg" />}
                title="Exports"
                text="Shared directories controlled by share/dfstab with options like rw, ro, root, anon and client lists."
              />
            </div>
          </section>

          {/* PERMISSIONS / CLIENT-SPECIFIC EXPLANATION */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Sharing to specific clients with custom permissions
            </h2>
            <p>
              NFS exports in Solaris support fine-grained access control. You
              can specify:
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Common share options"
                points={[
                  "rw           → read/write access for allowed clients",
                  "ro           → read-only access",
                  "rw=host1     → only host1 has rw (others denied unless explicitly listed)",
                  "ro=host2     → host2 read-only",
                  "root=host3   → allow root access from host3 (no root-squash)",
                  "anon=uid     → map anonymous users to UID (0 = root, often unsafe)",
                ]}
              />
              <BulletCard
                heading="Example usage"
                points={[
                  "share -F nfs -o rw=10.0.0.10 /export/projects",
                  "share -F nfs -o ro=10.0.0.20 /export/reports",
                  "share -F nfs -o rw=10.0.0.10,ro=10.0.0.20,root=adminhost /export/projects",
                ]}
              />
            </div>
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-step: NFS server and client in Solaris
            </h2>
            <p>
              Walk through these examples in your lab environment using two VMs:
              one as <span className="font-semibold">server</span> and one as{" "}
              <span className="font-semibold">client</span>.
            </p>

            {nfsSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs dark:text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — nfs"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* SUMMARY / CHEAT SHEET */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Quick NFS cheat sheet (Solaris)
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="On the NFS server"
                points={[
                  "pkg list nfs / pkg install nfs",
                  "svcadm enable svc:/network/nfs/server",
                  "edit /etc/dfs/dfstab → add share lines",
                  "shareall → activate all exports",
                  "share / showmount -e → verify",
                ]}
              />
              <BulletCard
                heading="On the NFS client"
                points={[
                  "pkg list nfs / pkg install nfs (if needed)",
                  "mkdir /mnt/nfs_home",
                  "mount -F nfs server:/export/home /mnt/nfs_home",
                  "edit /etc/vfstab for permanent mounts",
                  "mount /mnt/nfs_home, umount /mnt/nfs_home",
                ]}
              />
            </div>
          </section>

          {/* SAFETY / BEST PRACTICES */}
          <section className="space-y-3 rounded-2xl border border-amber-500/60 bg-amber-500/10 p-4 shadow-lg shadow-amber-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-600">
              <FiShield className="text-base" />
              Security and best practices for NFS
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-amber-50">
              <li>
                Avoid using <code>anon=0</code> and wide-open root access in
                production; prefer mapping anonymous users to non-privileged
                UIDs.
              </li>
              <li>
                Restrict NFS shares to specific clients using{" "}
                <code>rw=</code> and <code>ro=</code> options instead of
                exporting to everyone.
              </li>
              <li>
                Document all NFS exports and their allowed clients to avoid
                confusion later.
              </li>
              <li>
                Monitor logs in <code>/var/adm/messages</code> and{" "}
                <code>/var/log/syslog</code> for NFS-related errors regularly.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-amber-600">
              NFS is often combined with ZFS and zones – in later lessons, you
              can export ZFS datasets and mount them inside Solaris zones for
              flexible architectures.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
