// pages/course/solaris/files-and-directories.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiFolder,
  FiFileText,
  FiTrash2,
  FiNavigation,
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

/* ---------- Terminal snippets: one small flow per box ---------- */

const fileDirSnippets = [
  {
    id: "pwd-ls",
    title: "Check your current location and list files",
    description:
      "Use pwd to print the current directory and ls to see what files and folders exist there.",
    content: `[root@solaris ~]# pwd
/root

[root@solaris ~]# ls
Desktop  Documents  scripts  backup.sh

[root@solaris ~]# ls -l
total 12
drwxr-xr-x   2 root  root        3 Jan 10 09:10 Desktop
drwxr-xr-x   3 root  root        4 Jan 10 09:20 Documents
drwxr-xr-x   4 root  root        5 Jan 10 09:30 scripts
-rwxr-xr-x   1 root  root     2048 Jan 10 09:35 backup.sh`,
  },
  {
    id: "absolute-relative-cd",
    title: "Change directory using absolute and relative paths",
    description:
      "Absolute paths start from /, relative paths start from where you are right now.",
    content: `[root@solaris ~]# cd /var/log
[root@solaris /var/log]# pwd
/var/log

[root@solaris /var/log]# cd ..
[root@solaris /var]# pwd
/var

[root@solaris /var]# cd log
[root@solaris /var/log]# pwd
/var/log`,
  },
  {
    id: "mkdir-touch-tree",
    title: "Create directories and empty files",
    description:
      "mkdir creates directories, the -p option creates parent directories as needed, and touch creates empty files or updates timestamps.",
    content: `[root@solaris ~]# mkdir lab
[root@solaris ~]# cd lab
[root@solaris ~/lab]# mkdir -p project/docs project/scripts

[root@solaris ~/lab]# cd project
[root@solaris ~/lab/project]# touch README.txt notes.txt script.sh

[root@solaris ~/lab/project]# ls -R
.:
docs  notes.txt  README.txt  script.sh  scripts

./docs:

./scripts:`,
  },
  {
    id: "cp-mv",
    title: "Copy and move files and directories",
    description:
      "cp copies files, cp -r copies directories; mv moves or renames files and folders.",
    content: `[root@solaris ~/lab/project]# ls
docs  notes.txt  README.txt  script.sh  scripts

[root@solaris ~/lab/project]# cp README.txt docs/
[root@solaris ~/lab/project]# cp -r scripts docs/

[root@solaris ~/lab/project]# mv notes.txt notes-old.txt
[root@solaris ~/lab/project]# mv docs /tmp/project-docs

[root@solaris ~/lab/project]# ls
README.txt  script.sh  scripts  notes-old.txt`,
  },
  {
    id: "rm-rmdir",
    title: "Remove files and directories safely",
    description:
      "Use rm for files, rmdir for empty directories and rm -r for directory trees. Be very careful with rm -r.",
    content: `[root@solaris ~/lab/project]# ls
README.txt  script.sh  scripts  notes-old.txt

[root@solaris ~/lab/project]# rm notes-old.txt
[root@solaris ~/lab/project]# rmdir scripts
rmdir: scripts: Directory not empty

[root@solaris ~/lab/project]# rm -r scripts
[root@solaris ~/lab/project]# ls
README.txt  script.sh

# Example of a dangerous pattern – avoid:
[root@solaris ~/lab/project]# rm -rf /
rm: dangerous to operate recursively on '/'`,
  },
];

export default function FilesAndDirectoriesPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "files-and-directories") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Files and Directories"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn practical Solaris commands for navigating the filesystem, creating directories, copying/moving files and removing data safely."
          }
        />
      </Head>

      <SolarisLayout activeSlug="files-and-directories">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 6
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#ff5b5b] md:text-3xl">
            {lesson.title || "Files and Directories in Solaris"}
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
                title={lesson.title || "Files and Directories in Solaris"}
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
              Why focus on files and directories?
            </h2>
            <p>
              Almost everything in Unix-like systems is represented as a file or
              directory. If you can navigate the filesystem confidently, you can
              troubleshoot faster and understand how applications are laid out
              on a Solaris server.
            </p>
            <p>
              In this lesson you will learn how to{" "}
              <span className="font-semibold">
                move around, create structure for projects, copy or move data
                and clean up safely
              </span>{" "}
              using standard Solaris commands.
            </p>
          </section>

          {/* Concept cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Core concepts for working with the filesystem
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiNavigation className="text-lg" />}
                title="Paths"
                text="Absolute paths start from / (root of the filesystem). Relative paths start from your current directory and are shorter for day-to-day work."
              />
              <FeatureCard
                icon={<FiFolder className="text-lg" />}
                title="Directories"
                text="Directories organise files. Commands like ls, cd and mkdir let you explore and build directory structures for your applications."
              />
              <FeatureCard
                icon={<FiFileText className="text-lg" />}
                title="Files"
                text="Files may be configs, logs, binaries or scripts. cat, more, less and tail help you inspect them without editing."
              />
            </div>
          </section>

          {/* Terminals for each flow */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Step-by-step command examples
            </h2>
            <p>
              The following command sequences show realistic mini-scenarios. Try
              them in your Solaris VM to build muscle memory.
            </p>

            {fileDirSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-300">
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

          {/* Safety / rm tips */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Safety tips when removing files and directories
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Be careful with rm -r"
                points={[
                  "Always double-check the path before running rm -r.",
                  "Prefer rm -ri (interactive) when working in critical locations.",
                  "Avoid running rm -rf with wildcards in system directories.",
                ]}
              />
              <BulletCard
                heading="Use safer alternatives first"
                points={[
                  "Move data to a temporary directory before deleting permanently.",
                  "For logs, prefer log rotation rather than manual deletion.",
                  "When in doubt, take a quick backup using cp -r or tar before large cleanups.",
                ]}
              />
            </div>
          </section>

          {/* Practice box */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
              Practice task – create a small project structure
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-emerald-50">
              <li>
                Under your home directory, create a folder{" "}
                <code>solaris-lab</code> with subdirectories{" "}
                <code>configs</code>, <code>logs</code> and{" "}
                <code>scripts</code>.
              </li>
              <li>
                Create some sample files using <code>touch</code> and list them
                with different <code>ls</code> options.
              </li>
              <li>
                Practice copying and moving files between these directories
                until the commands feel natural.
              </li>
              <li>
                Finally, clean up using <code>rm</code>, <code>rm -r</code> and{" "}
                <code>rmdir</code>, making sure you understand exactly what
                disappears at each step.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-emerald-200">
              In upcoming lessons, this directory knowledge will be used when we
              work with configuration files, logs, user homes and ZFS datasets.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
