// pages/course/solaris/super-user.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiShield,
  FiUser,
  FiUserCheck,
  FiKey,
  FiAlertTriangle,
  FiArrowRight,
} from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/SolarisLessons";
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

/* ---------- Terminal snippets for this lesson ---------- */

const superUserSnippets = [
  {
    id: "check-root",
    title: "Identify the super user (root) account",
    description:
      "The root account has UID 0 and unrestricted access. You should always confirm when you are root.",
    content: `[root@solaris ~]# id
uid=0(root) gid=0(root) groups=0(root)

[root@solaris ~]# whoami
root

[root@solaris ~]# grep '^root:' /etc/passwd
root:x:0:0:Super-User:/:/sbin/sh`,
  },
  {
    id: "su-to-root",
    title: "Use su - to become root from a normal user",
    description:
      "A normal user with the right password or role assignment can switch to root using su -. Always use the hyphen (-) to get a full root environment.",
    content: `[devuser@solaris ~]$ id
uid=1100(devuser) gid=10(staff) groups=10(staff)

[devuser@solaris ~]$ su - 
Password: ********
Oracle Corporation      SunOS 5.11      Solaris 11.4

[root@solaris ~]# id
uid=0(root) gid=0(root) groups=0(root)`,
  },
  {
    id: "roles-command",
    title: "Check RBAC roles assigned to your account",
    description:
      "Solaris uses Role-Based Access Control (RBAC). A user can have roles that allow privileged tasks without giving away the root password.",
    content: `[devuser@solaris ~]$ roles
oracle

[devuser@solaris ~]$ su - oracle
Password: ********
Oracle Corporation      SunOS 5.11      Solaris 11.4

[oracle@solaris ~]$ id
uid=1101(oracle) gid=60(dba) groups=60(dba)`,
  },
  {
    id: "pfexec-example",
    title: "Run a privileged command with pfexec",
    description:
      "If RBAC is configured, pfexec lets a user run specific commands with elevated privilege without a full root shell.",
    content: `[devuser@solaris ~]$ pfexec id
uid=0(root) gid=0(root) euid=0(root) egid=0(root) groups=0(root),10(staff)

[devuser@solaris ~]$ pfexec svcs svc:/network/ssh:default
STATE          STIME    FMRI
online         10:20:31 svc:/network/ssh:default`,
  },
  {
    id: "sudo-check",
    title: "Check if sudo is available (optional)",
    description:
      "Some Solaris environments also use sudo. It allows fine-grained command execution as root with logging and policy in /etc/sudoers.",
    content: `[devuser@solaris ~]$ sudo -l
User devuser may run the following commands on this host:
    (root) /usr/sbin/svcs
    (root) /usr/sbin/svcadm

[devuser@solaris ~]$ sudo svcs ssh
STATE          STIME    FMRI
online         10:20:31 svc:/network/ssh:default`,
  },
];

export default function SuperUserPage() {
  const lesson = solarisLessons.find((l) => l.slug === "super-user") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Super User in Solaris"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Understand the root account, RBAC roles, su, pfexec and sudo on Solaris, and how to use elevated privileges safely."
          }
        />
      </Head>

      <SolarisLayout activeSlug="super-user">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 9
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Super User in Solaris"}
          </h1>
          {lesson.short && (
            <p className="mt-1 max-w-2xl text-sm dark:text-slate-300">
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
                title={lesson.title || "Super User in Solaris"}
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
          className="space-y-8 text-sm leading-relaxed dark:text-slate-200"
        >
          {/* Overview */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What is the super user in Solaris?
            </h2>
            <p>
              The super user, traditionally called{" "}
              <span className="font-semibold">root</span>, has full control of
              the system. Root can read and modify any file, manage services,
              storage, networking and security. Because of this power, you must
              be extremely careful when using elevated privileges.
            </p>
            <p>
              Solaris also supports{" "}
              <span className="font-semibold">
                Role-Based Access Control (RBAC)
              </span>
              , which allows administrators to delegate specific privileges
              without handing out the root password to everyone.
            </p>
          </section>

          {/* Concept cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Core super-user concepts
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiShield className="text-lg" />}
                title="root (UID 0)"
                text="The root account is the ultimate authority on the system. Any process running as UID 0 bypasses normal permission checks."
              />
              <FeatureCard
                icon={<FiUser className="text-lg" />}
                title="su and root shells"
                text="su - temporarily switches you to another account, often root. The hyphen (-) loads that user’s environment."
              />
              <FeatureCard
                icon={<FiKey className="text-lg" />}
                title="RBAC, roles and pfexec"
                text="RBAC roles and pfexec allow users to run some privileged commands without giving full root access for everything."
              />
            </div>
          </section>

          {/* Step-by-step terminal flows */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-step commands related to the super user
            </h2>
            <p>
              Use these examples in your Solaris lab. Start from a normal user
              where possible, and switch to root only when needed.
            </p>

            {superUserSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs dark:text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — super user"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* Best practices */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Best practices when working as root
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Minimise root usage"
                points={[
                  "Use normal accounts for day-to-day work; only switch to root when absolutely necessary.",
                  "Keep root sessions short. Exit back to your normal user once the privileged task is complete.",
                  "Avoid running complex one-liner commands as root unless you are fully confident in what they do.",
                ]}
              />
              <BulletCard
                heading="Auditability and control"
                points={[
                  "Prefer RBAC roles, pfexec or sudo so that privileged activity can be logged and controlled.",
                  "Do not share the root password in chat or email; use secure channels and change it when people leave the team.",
                  "Periodically review who has root access or privileged roles on critical systems.",
                ]}
              />
            </div>
          </section>

          {/* Safety box */}
          <section className="space-y-3 rounded-2xl border border-amber-500/60 bg-amber-500/10 p-4 shadow-lg shadow-amber-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-600">
              <FiAlertTriangle className="text-base" />
              Think twice before pressing ENTER as root
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-amber-50">
              <li>
                Always re-read destructive commands (<code>rm -r</code>,{" "}
                <code>zfs destroy</code>, <code>svccfg delete</code>, etc.)
                before executing them as root.
              </li>
              <li>
                When testing new or risky commands, try them first as a normal
                user or in a lab environment.
              </li>
              <li>
                Keep clear separation between lab, test and production servers
                so you don&apos;t accidentally run experiments on the wrong
                system.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-amber-600">
              In upcoming lessons, you will use super-user privileges for
              process management, service control and storage administration.
              Understanding root and roles now will make those topics much
              safer.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
