// pages/course/solaris/link.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiLink,
  FiLink2,
  FiGitCommit,
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

/* ---------- Terminal snippets: hard vs soft links in practice ---------- */

const linkSnippets = [
  {
    id: "basic-hard-link",
    title: "Create a hard link and compare inodes",
    description:
      "Hard links are additional directory entries pointing to the same inode (same underlying file) on the same filesystem.",
    content: `[root@solaris ~]# cd /export/home/lab
[root@solaris ~/lab]# echo "Solaris link demo" > original.txt

[root@solaris ~/lab]# ln original.txt hardlink.txt

[root@solaris ~/lab]# ls -li
123456 -rw-r--r--   2 root root      20 Jan 11 12:00 hardlink.txt
123456 -rw-r--r--   2 root root      20 Jan 11 12:00 original.txt

# Note:
# - Same inode number (123456)
# - Link count is 2 (second column)`,
  },
  {
    id: "basic-soft-link",
    title: "Create a soft (symbolic) link and compare inodes",
    description:
      "Soft links are separate files that store a path to the target. They have their own inode and can span filesystems.",
    content: `[root@solaris ~/lab]# ln -s original.txt softlink.txt

[root@solaris ~/lab]# ls -li
123456 -rw-r--r--   2 root root      20 Jan 11 12:00 hardlink.txt
123456 -rw-r--r--   2 root root      20 Jan 11 12:00 original.txt
123789 lrwxrwxrwx   1 root root      12 Jan 11 12:02 softlink.txt -> original.txt

# Note:
# - softlink.txt has a DIFFERENT inode (123789)
# - Type 'l' (symlink) in ls output
# - It only stores the path 'original.txt'`,
  },
  {
    id: "delete-original-hard-vs-soft",
    title: "Delete the original file and see how links behave",
    description:
      "When you remove the original name, hard links still work (same inode). Soft links become broken pointers.",
    content: `[root@solaris ~/lab]# ls -li
123456 -rw-r--r--   2 root root      20 Jan 11 12:00 hardlink.txt
123456 -rw-r--r--   2 root root      20 Jan 11 12:00 original.txt
123789 lrwxrwxrwx   1 root root      12 Jan 11 12:02 softlink.txt -> original.txt

[root@solaris ~/lab]# rm original.txt

[root@solaris ~/lab]# ls -li
123456 -rw-r--r--   1 root root      20 Jan 11 12:00 hardlink.txt
123789 lrwxrwxrwx   1 root root      12 Jan 11 12:02 softlink.txt -> original.txt

# Check contents:
[root@solaris ~/lab]# cat hardlink.txt
Solaris link demo

[root@solaris ~/lab]# cat softlink.txt
cat: cannot open softlink.txt: No such file or directory

# Explanation:
# - The data still exists via hardlink.txt (inode 123456)
# - softlink.txt points to a path that no longer exists → broken symlink`,
  },
  {
    id: "delete-hardlink",
    title: "Delete hard links and watch the link count",
    description:
      "The file data on disk is removed only when the last hard link is deleted and no process is using it.",
    content: `[root@solaris ~/lab]# ls -li
123456 -rw-r--r--   1 root root      20 Jan 11 12:00 hardlink.txt
123789 lrwxrwxrwx   1 root root      12 Jan 11 12:02 softlink.txt -> original.txt

[root@solaris ~/lab]# rm hardlink.txt

[root@solaris ~/lab]# ls -li
123789 lrwxrwxrwx   1 root root      12 Jan 11 12:02 softlink.txt -> original.txt

[root@solaris ~/lab]# cat softlink.txt
cat: cannot open softlink.txt: No such file or directory

# Now:
# - inode 123456 has no directory entries, so data is freed.
# - softlink.txt still exists but is a broken link.`,
  },
  {
    id: "limits-hard-soft",
    title: "Limitations: directories and filesystems",
    description:
      "Hard links cannot cross filesystems and are normally not used for directories. Soft links have more flexibility but can break.",
    content: `# Cross-filesystem example (assume /data is a different filesystem)
[root@solaris ~]# cd /export/home/lab
[root@solaris ~/lab]# touch file1

[root@solaris ~/lab]# ln file1 /data/file1
ln: cannot create /data/file1: Invalid cross-device link

# But soft link works across filesystems:
[root@solaris ~/lab]# ln -s /export/home/lab/file1 /data/file1-link

# Hard link to directory is usually restricted:
[root@solaris ~/lab]# ln project project_hard
ln: cannot create hard link project_hard to project: Is a directory

# But soft link to directory is common:
[root@solaris ~/lab]# ln -s /export/home/lab/project /projects/current
[root@solaris ~/lab]# ls -ld /projects/current
lrwxrwxrwx   1 root root    24 Jan 11 12:30 /projects/current -> /export/home/lab/project`,
  },
];

export default function LinkPage() {
  const lesson = solarisLessons.find((l) => l.slug === "link") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Hard and Soft Links"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn the difference between hard links and soft (symbolic) links in Solaris, how they relate to inodes, and how they behave when files are deleted."
          }
        />
      </Head>

      <SolarisLayout activeSlug="link">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 14
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#ff5b5b] md:text-3xl">
            {lesson.title || "Hard Links and Soft Links in Solaris"}
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
                title={lesson.title || "Hard and Soft Links in Solaris"}
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
              What are links in Unix/Solaris?
            </h2>
            <p>
              A “link” is simply another name or pointer to a file. Solaris, like
              other Unix systems, supports{" "}
              <span className="font-semibold">hard links</span> and{" "}
              <span className="font-semibold">soft (symbolic) links</span>. Both
              help you avoid copying data and allow multiple paths to refer to
              the same content.
            </p>
            <p>
              To really understand the difference, you must think in terms of{" "}
              <span className="font-semibold">inodes</span> — the internal
              structures that store metadata and point to file data on disk.
            </p>
          </section>

          {/* Concept cards: inode + link types */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Inodes, hard links and soft links – conceptually
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiGitCommit className="text-lg" />}
                title="Inode = the real file"
                text="The inode stores file metadata (size, timestamps, permissions, disk blocks). Directory entries (names) point to inodes; data lives behind the inode."
              />
              <FeatureCard
                icon={<FiLink2 className="text-lg" />}
                title="Hard link = extra name"
                text="A hard link is another directory entry pointing to the same inode. Same inode number, same data; only the name is different."
              />
              <FeatureCard
                icon={<FiLink className="text-lg" />}
                title="Soft link = special file"
                text="A soft (symbolic) link is a small file that stores a path to another file or directory. It has its own inode and can break if the target path disappears."
              />
            </div>
          </section>

          {/* Terminals showing behaviour */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Step-by-step: hard vs soft links with inodes
            </h2>
            <p>
              Work through these examples in your lab. Watch the inode numbers
              and link counts carefully — they tell the real story behind the
              names.
            </p>

            {linkSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — links"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* Comparison section */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Hard link vs soft link – detailed comparison
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Hard links"
                points={[
                  "Same inode as the original file (check with ls -li).",
                  "Share the same permissions, owner, group and timestamps.",
                  "Data stays on disk until the LAST hard link is removed.",
                  "Cannot span filesystems (must be on the same filesystem).",
                  "Normally not allowed for directories (to avoid loops).",
                  "Deleting any one name does NOT affect access via other hard links.",
                ]}
              />
              <BulletCard
                heading="Soft (symbolic) links"
                points={[
                  "Different inode; type shown as 'l' in ls output.",
                  "Stores a path to the target; can point to files or directories.",
                  "Can cross filesystems and even point to non-existent paths.",
                  "If the target is removed or moved, the symlink becomes broken.",
                  "Permissions of the symlink itself are usually irrelevant; access depends on the target file.",
                  "Very common for configs, shared directories and compatibility symlinks.",
                ]}
              />
            </div>
          </section>

          {/* Safety / usage patterns */}
          <section className="space-y-3 rounded-2xl border border-amber-500/60 bg-amber-500/10 p-4 shadow-lg shadow-amber-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-200">
              <FiAlertTriangle className="text-base" />
              When to use which type of link?
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-amber-50">
              <li>
                Use <span className="font-semibold">soft links</span> when you
                want flexibility: pointing to directories, crossing filesystems,
                or creating human-friendly paths (e.g.{" "}
                <code>/var/www/current</code> → <code>release-123</code>).
              </li>
              <li>
                Use <span className="font-semibold">hard links</span> when you
                want multiple names for exactly the same file data and you are
                sure everything is on the same filesystem.
              </li>
              <li>
                Be careful when cleaning up: removing the “original” name of a
                file may not actually delete the data if hard links still
                exist.
              </li>
              <li>
                Periodically check for broken symlinks in critical trees (e.g.{" "}
                <code>find /path -xtype l</code>) to avoid surprises.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-amber-200">
              Understanding inodes and links will help you a lot when working
              with backups, NFS mounts, ZFS snapshots and even package
              management.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
