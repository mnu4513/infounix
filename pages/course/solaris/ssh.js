// pages/course/solaris/ssh.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiTerminal,
  FiKey,
  FiShield,
  FiGlobe,
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

/* ---------- Terminal snippets: one flow per box ---------- */

const sshSnippets = [
  {
    id: "check-ssh-service",
    title: "Check if SSH service is running",
    description:
      "On Solaris 11, the SSH daemon (sshd) is managed by SMF. Use svcs to verify its state.",
    content: `[root@solaris ~]# svcs -a | grep ssh
online         10:20:31 svc:/network/ssh:default

[root@solaris ~]# svcs svc:/network/ssh:default
STATE          STIME    FMRI
online         10:20:31 svc:/network/ssh:default`,
  },
  {
    id: "basic-ssh-client",
    title: "Connect to a remote server using SSH",
    description:
      "Use the ssh client to log in to another system. Here we connect as user 'oracle' to host dbserver.",
    content: `[root@solaris ~]# ssh oracle@dbserver
The authenticity of host 'dbserver (192.168.1.20)' can't be established.
RSA key fingerprint is SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'dbserver,192.168.1.20' (RSA) to the list of known hosts.
oracle@dbserver's password: ********

[oracle@dbserver ~]$ hostname
dbserver

[oracle@dbserver ~]$ exit
logout
Connection to dbserver closed.

[root@solaris ~]#`,
  },
  {
    id: "generate-ssh-key",
    title: "Generate an SSH key pair for passwordless login",
    description:
      "Create a key pair for your Solaris user and copy the public key to a remote server.",
    content: `[root@solaris ~]# ssh-keygen -t rsa -b 4096
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.

[root@solaris ~]# ssh-copy-id oracle@dbserver
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/root/.ssh/id_rsa.pub"
oracle@dbserver's password: ********
Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'oracle@dbserver'"`,
  },
  {
    id: "key-based-login",
    title: "Test key-based login (no password prompt)",
    description:
      "After copying the key, SSH should authenticate using the private key automatically.",
    content: `[root@solaris ~]# ssh oracle@dbserver
Last login: Wed Jan 11 11:45:12 2025 from solaris-lab

[oracle@dbserver ~]$ whoami
oracle

[oracle@dbserver ~]$ exit
logout
Connection to dbserver closed.

[root@solaris ~]#`,
  },
  {
    id: "edit-sshd-config",
    title: "View and adjust SSH daemon configuration",
    description:
      "Always make a backup before editing sshd_config, then use vi to make small, controlled changes.",
    content: `[root@solaris ~]# cd /etc/ssh
[root@solaris /etc/ssh]# cp sshd_config sshd_config.bak

[root@solaris /etc/ssh]# vi sshd_config

# (inside vi)
# Example changes:
#   - Disable root login with password:
#     PermitRootLogin no
#
#   - Ensure protocol v2:
#     Protocol 2

:wq      # save and exit

[root@solaris /etc/ssh]# diff sshd_config.bak sshd_config
< PermitRootLogin yes
> PermitRootLogin no

[root@solaris /etc/ssh]# svcadm restart ssh`,
  },
];

export default function SshPage() {
  const lesson = solarisLessons.find((l) => l.slug === "ssh") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "SSH in Solaris"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to use SSH on Solaris for secure remote access, including basic connections, key-based authentication and sshd configuration."
          }
        />
      </Head>

      <SolarisLayout activeSlug="ssh">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 8
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#ff5b5b] md:text-3xl">
            {lesson.title || "SSH in Solaris"}
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
                title={lesson.title || "SSH in Solaris"}
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
          {/* Overview */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Why SSH is critical for administrators
            </h2>
            <p>
              Secure Shell (SSH) is the default way to manage Solaris and most
              Unix-like systems remotely. If SSH is down or misconfigured, you
              may lose remote access to servers completely, so it is important
              to understand both the{" "}
              <span className="font-semibold">
                SSH client and the SSH daemon (sshd)
              </span>
              .
            </p>
            <p>
              In this lesson we focus on checking the SSH service status, making
              basic connections, setting up key-based authentication and doing
              simple, safe sshd configuration changes.
            </p>
          </section>

          {/* Concepts cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              SSH concepts you should know
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiTerminal className="text-lg" />}
                title="SSH client"
                text="The ssh command on Solaris lets you connect securely to remote servers using username/password or keys."
              />
              <FeatureCard
                icon={<FiGlobe className="text-lg" />}
                title="SSH daemon (sshd)"
                text="The sshd service listens on port 22 and accepts incoming connections. On Solaris 11, it is managed via SMF."
              />
              <FeatureCard
                icon={<FiKey className="text-lg" />}
                title="Key-based authentication"
                text="SSH keys allow you to log in without typing passwords, and are safer when used correctly with restricted permissions."
              />
            </div>
          </section>

          {/* Step-by-step terminals */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Step-by-step SSH command flows
            </h2>
            <p>
              Use these examples in your Solaris lab: one system acting as the
              client and another (or the same VM) acting as the SSH server.
            </p>

            {sshSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — ssh"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* Best practices / security */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Security best practices for SSH on Solaris
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Hardening sshd"
                points={[
                  "Disable direct root login where possible (PermitRootLogin no).",
                  "Prefer key-based authentication instead of password-only logins.",
                  "Restrict which users or groups can log in using AllowUsers / AllowGroups.",
                  "Monitor auth logs (/var/adm/messages or equivalent) for repeated failed attempts.",
                ]}
              />
              <BulletCard
                heading="Key hygiene and access control"
                points={[
                  "Protect your private key with a passphrase and correct permissions (~/.ssh should be 700, private key 600).",
                  "Remove unused keys from authorized_keys when users leave or roles change.",
                  "Avoid copying private keys between machines; generate them where they are needed.",
                  "Use separate key pairs for different environments (lab, test, production).",
                ]}
              />
            </div>
          </section>

          {/* Practice box */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
              Hands-on practice – build your SSH workflow
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-emerald-50">
              <li>
                From your Solaris lab VM, connect to another VM or a test
                server using password-based SSH.
              </li>
              <li>
                Generate an SSH key pair and configure passwordless login to the
                same server.
              </li>
              <li>
                Take a backup of <code>sshd_config</code>, make one small
                hardening change, restart ssh and verify that access still
                works.
              </li>
              <li>
                Document your final SSH setup so you can reuse it on future
                servers.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-emerald-200">
              In the next lessons, SSH will be your main entry point for working
              with processes, services, ZFS and other Solaris features.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
