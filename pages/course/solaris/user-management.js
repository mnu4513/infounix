// pages/course/solaris/user-management.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiUser,
  FiUsers,
  FiLock,
  FiKey,
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

/* ---------- Command snippets shown in individual terminals ---------- */

const userMgmtSnippets = [
  {
    id: "check-current-user",
    title: "Check who you are logged in as",
    description:
      "Before doing any administration work, confirm which account you are using.",
    content: `[root@solaris ~]# whoami
root

[root@solaris ~]# id
uid=0(root) gid=0(root) groups=0(root)`,
  },
  {
    id: "view-passwd",
    title: "View user entries in /etc/passwd",
    description:
      "The /etc/passwd file holds basic account information that is readable by all users.",
    content: `[root@solaris ~]# tail -5 /etc/passwd
daemon:x:1:1:daemon:/usr/sbin:/usr/bin/false
bin:x:2:2:bin:/usr/bin:/usr/bin/false
adm:x:3:4:adm:/var/adm:/usr/bin/false
oracle:x:1001:10:Oracle User:/export/home/oracle:/usr/bin/bash
devuser:x:1100:10:Development User:/export/home/devuser:/usr/bin/bash`,
  },
  {
    id: "create-user",
    title: "Create a new user",
    description:
      "Create a normal user with a home directory and default shell. In Solaris, useradd is the standard tool.",
    content: `[root@solaris ~]# useradd -m -d /export/home/appuser appuser

[root@solaris ~]# passwd appuser
New Password: ********
Re-enter new Password: ********
passwd (appuser):
passwd successfully changed for appuser`,
  },
  {
    id: "create-user-custom",
    title: "Create a new user with custom UID, GID & shell",
    description:
      "Create a normal user with a home directory and default shell. In Solaris, useradd is the standard tool.",
    content: `[root@solaris ~]# useradd -u 1101 -g 10 -m -d /export/home/appuser -s /usr/bin/bash appuser

[root@solaris ~]# passwd appuser
New Password: ********
Re-enter new Password: ********
passwd (appuser):
passwd successfully changed for appuser`,
  },
  {
    id: "verify-user",
    title: "Verify the new account",
    description:
      "Use id, getent and ls to check that the user and home directory were created correctly.",
    content: `[root@solaris ~]# id appuser
uid=1101(appuser) gid=10(staff) groups=10(staff)

[root@solaris ~]# getent passwd appuser
appuser:x:1101:10:appuser:/export/home/appuser:/usr/bin/bash

[root@solaris ~]# ls -ld /export/home/appuser
drwxr-xr-x   5 appuser  staff        5 Jan 11 10:15 /export/home/appuser`,
  },
  {
    id: "switch-user",
    title: "Switch to the new user",
    description:
      "Use su - to test that you can log in as the new account and that the environment looks correct.",
    content: `[root@solaris ~]# su - appuser
Oracle Corporation      SunOS 5.11      Solaris 11.4

[appuser@solaris ~]$ pwd
/export/home/appuser

[appuser@solaris ~]$ echo "User management lab is ready"
User management lab is ready`,
  },
  {
    id: "lock-delete-user",
    title: "Lock or remove a user",
    description:
      "Solaris supports locking accounts and deleting them while optionally preserving the home directory.",
    content: `[root@solaris ~]# passwd -l appuser
passwd (appuser):
Account appuser has been locked.

[root@solaris ~]# userdel -r olduser
#
# -r removes the home directory and mail spool for olduser`,
  },
];

export default function UserManagementPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "user-management") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "User Management"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to create, verify, lock and remove user accounts on Solaris safely using the command line."
          }
        />
      </Head>

      <SolarisLayout activeSlug="user-management">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 4
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "User Management in Solaris"}
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
                title={lesson.title || "User Management in Solaris"}
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
              Goal of this lesson
            </h2>
            <p>
              User management is one of the most common tasks for any Solaris
              administrator. In this lesson you will learn how to{" "}
              <span className="font-semibold">
                create, inspect, lock and remove
              </span>{" "}
              user accounts in a safe and repeatable way.
            </p>
            <p>
              We will focus on normal local users. Network or directory-backed
              users (LDAP, Active Directory, etc.) are built on top of the same
              concepts you learn here.
            </p>
          </section>

          {/* Concept cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Core user-management concepts
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiUser className="text-lg" />}
                title="Accounts & identity"
                text="Each user has a numeric UID, primary group, home directory and login shell. This identity controls file and process ownership."
              />
              <FeatureCard
                icon={<FiLock className="text-lg" />}
                title="/etc/passwd and /etc/shadow"
                text="passwd holds public account data; shadow stores encrypted passwords and password policy. Only root can read shadow."
              />
              <FeatureCard
                icon={<FiUsers className="text-lg" />}
                title="Groups & roles"
                text="Groups collect users to share access, and Solaris RBAC roles allow finer-grained delegation without full root access."
              />
            </div>
          </section>

          {/* Terminals for each step */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-step user-management commands
            </h2>
            <p>
              Below are the exact commands you should try in your lab VM. Each
              block shows a small, focused sequence so you can practice and
              repeat it easily.
            </p>

            {userMgmtSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs dark:text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — bash"
                  contextLabel="solaris-lab"
                  maxHeight="16rem"
                />
              </div>
            ))}
          </section>

          {/* Best practices */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Good practices when managing users
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Safety & auditability"
                points={[
                  "Avoid logging in directly as root whenever possible – use su or roles.",
                  "Always verify the UID, group and home directory before giving access to others.",
                  "Document which users you created and why, especially on shared servers.",
                ]}
              />
              <BulletCard
                heading="Lifecycle management"
                points={[
                  "Lock accounts temporarily instead of deleting if you are not sure.",
                  "When de-provisioning, archive important data from the user’s home directory before removal.",
                  "Regularly review local accounts and disable unused ones.",
                ]}
              />
            </div>
          </section>

          {/* Practice box */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice task – build your own small user set
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-emerald-50">
              <li>Create two new users: <code>devuser</code> and <code>opsuser</code>.</li>
              <li>
                Assign them to appropriate groups and create home directories in{" "}
                <code>/export/home</code>.
              </li>
              <li>
                Log in as both users using <code>su -</code> and confirm that
                file ownership works as expected.
              </li>
              <li>
                Finally, lock one account and remove the other to see the full
                lifecycle.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-emerald-600">
              In the next lesson, we will extend this with group-management so
              that you can manage access for teams instead of individual users.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
