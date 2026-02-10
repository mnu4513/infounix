// pages/course/solaris/group-management.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiShield,
  FiFolder,
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

/* ---------- Command snippets for individual terminals ---------- */

const groupMgmtSnippets = [
  {
    id: "view-groups",
    title: "View existing groups",
    description:
      "Start by looking at /etc/group to understand which groups already exist on the system.",
    content: `[root@solaris ~]# tail -7 /etc/group
bin::2:root,bin
sys::3:root,uucp
adm::4:root,adm,daemon
daemon::1:root,daemon
staff::10:
dba::60:oracle
appteam::80:devuser,appuser`,
  },
  {
    id: "create-group",
    title: "Create a new group",
    description:
      "Use groupadd to create a new application or project group with a specific GID (optional).",
    content: `[root@solaris ~]# groupadd -g 81 webteam

[root@solaris ~]# getent group webteam
webteam::81:`,
  },
  {
    id: "add-user-to-group",
    title: "Add an existing user to a secondary group",
    description:
      "Use usermod -G (or -a -G depending on OS) to set the list of supplementary groups. On Solaris, -G replaces the list.",
    content: `[root@solaris ~]# id appuser
uid=1101(appuser) gid=10(staff) groups=10(staff)

[root@solaris ~]# usermod -G staff,webteam appuser

[root@solaris ~]# id appuser
uid=1101(appuser) gid=10(staff) groups=10(staff),81(webteam)`,
  },
  {
    id: "verify-membership",
    title: "Verify group membership as that user",
    description:
      "Use su - to switch to the user and check groups from their perspective.",
    content: `[root@solaris ~]# su - appuser
Oracle Corporation      SunOS 5.11      Solaris 11.4

[appuser@solaris ~]$ groups
staff webteam

[appuser@solaris ~]$ id
uid=1101(appuser) gid=10(staff) groups=10(staff),81(webteam)`,
  },
  {
    id: "directory-permissions",
    title: "Use groups for directory access",
    description:
      "Create a shared directory owned by the group and give group write access so all team members can collaborate.",
    content: `[root@solaris ~]# mkdir -p /projects/webapp
[root@solaris ~]# chown root:webteam /projects/webapp
[root@solaris ~]# chmod 2775 /projects/webapp

[root@solaris ~]# ls -ld /projects/webapp
drwxrwsr-x   2 root  webteam      2 Jan 11 11:30 /projects/webapp

[appuser@solaris ~]$ cd /projects/webapp
[appuser@solaris /projects/webapp]$ touch testfile
[appuser@solaris /projects/webapp]$ ls -l
-rw-r--r--   1 appuser  webteam     0 Jan 11 11:31 testfile`,
  },
  {
    id: "modify-delete-group",
    title: "Rename or remove a group",
    description:
      "You can change group attributes with groupmod and remove unused groups with groupdel.",
    content: `[root@solaris ~]# groupmod -n webteam_legacy webteam

[root@solaris ~]# getent group webteam_legacy
webteam_legacy::81:appuser

# Remove a group only after cleaning up membership:
[root@solaris ~]# groupdel webteam_legacy`,
  },
];

export default function GroupManagementPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "group-management") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Group Management"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to create, modify and delete groups in Solaris, and how to use them to control access to shared resources."
          }
        />
      </Head>

      <SolarisLayout activeSlug="group-management">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 5
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Group Management in Solaris"}
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
                title={lesson.title || "Group Management in Solaris"}
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
              Why group management matters
            </h2>
            <p>
              Groups allow you to manage permissions for{" "}
              <span className="font-semibold">
                sets of users instead of individuals
              </span>
              . Instead of giving access user-by-user, you assign permissions to
              a group and add users to it. This is critical for maintainable
              access control on any multi-user Solaris system.
            </p>
            <p>
              In this lesson you will learn how to create groups, add users to
              them, and use groups to control access to shared directories.
            </p>
          </section>

          {/* Concept cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Group-management concepts
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiUsers className="text-lg" />}
                title="Primary vs supplementary groups"
                text="Every user has one primary group recorded in /etc/passwd, and may belong to multiple supplementary groups recorded in /etc/group."
              />
              <FeatureCard
                icon={<FiShield className="text-lg" />}
                title="Access control"
                text="Directory and file permissions are often granted to a group, and all members of that group inherit the same level of access."
              />
              <FeatureCard
                icon={<FiFolder className="text-lg" />}
                title="Project / application groups"
                text="It is common to create one group per project or application team so that ownership and access are easy to reason about."
              />
            </div>
          </section>

          {/* Step-by-step terminals */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-step group-management commands
            </h2>
            <p>
              Use the following commands in your Solaris lab VM to understand
              how groups are stored and how they affect access to shared
              directories.
            </p>

            {groupMgmtSnippets.map((snippet, index) => (
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
              Good practices for groups and shared directories
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Designing groups"
                points={[
                  "Create groups based on roles or applications, not individual users.",
                  "Avoid reusing the same group for unrelated purposes; it becomes hard to reason about permissions.",
                  "Use consistent naming such as appteam, dbteam, backupops, etc.",
                ]}
              />
              <BulletCard
                heading="Managing shared folders"
                points={[
                  "Use the setgid bit (chmod 2775) on shared directories so new files inherit the directory's group.",
                  "Ensure that only the correct group has write access to shared folders.",
                  "Regularly review group membership, especially when people change teams or leave the organisation.",
                ]}
              />
            </div>
          </section>

          {/* Practice box */}
          <section className="space-y-3 rounded-2xl border border-sky-600/50 bg-sky-500/10 p-4 shadow-lg shadow-sky-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Practice task – groups for a small project team
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-sky-50">
              <li>
                Create a group called <code>projectx</code> and add two users to
                it (for example, <code>devuser</code> and <code>opsuser</code>).
              </li>
              <li>
                Create <code>/projects/projectx</code>, set its group ownership
                to <code>projectx</code> and apply <code>chmod 2775</code>.
              </li>
              <li>
                Log in as both users and verify they can create and edit files
                in this directory, and that the group is set correctly.
              </li>
              <li>
                Finally, remove one user from the group and confirm that access
                changes as expected.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-sky-600">
              In upcoming lessons, we will build on users and groups when we
              talk about permissions, services and real-world troubleshooting.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
