// pages/course/solaris/archive.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiArchive,
  FiLayers,
  FiZap,
  FiHardDrive,
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

/* ---------- Terminal snippets: archive & compression flows ---------- */

const archiveSnippets = [
  {
    id: "archive-vs-compress",
    title: "Archive vs compression – see the difference",
    description:
      "Archiving (tar) combines many files into one. Compression (gzip/bzip2/xz) reduces size. Often you archive first, then compress.",
    content: `[root@solaris ~]# ls project
config.yml  index.html  script.sh  README.txt

# Archive only (no compression)
[root@solaris ~]# tar cvf project.tar project
a project/
a project/config.yml
a project/index.html
a project/script.sh
a project/README.txt

[root@solaris ~]# ls -lh project.tar
-rw-r--r--   1 root root   40K Jan 11 12:10 project.tar

# Compress a single file
[root@solaris ~]# gzip README.txt
[root@solaris ~]# ls
project  project.tar  README.txt.gz`,
  },
  {
    id: "gzip-usage",
    title: "gzip – fast compression, good enough for most cases",
    description:
      "gzip is usually the default choice: decent compression with good speed.",
    content: `[root@solaris ~]# ls -lh bigfile.log
-rw-r--r--   1 root root  500M Jan 11 11:00 bigfile.log

[root@solaris ~]# gzip bigfile.log
[root@solaris ~]# ls -lh bigfile.log.gz
-rw-r--r--   1 root root   50M Jan 11 11:05 bigfile.log.gz

# View without decompressing permanently:
[root@solaris ~]# zcat bigfile.log.gz | head
Jan 11 10:00:01 sol11 app[1001]: starting up...
...

# Decompress back
[root@solaris ~]# gunzip bigfile.log.gz
[root@solaris ~]# ls -lh bigfile.log
-rw-r--r--   1 root root  500M Jan 11 11:00 bigfile.log`,
  },
  {
    id: "bzip2-xz",
    title: "bzip2 & xz – better compression, slower speed",
    description:
      "bzip2 and xz usually give a smaller file than gzip, but take more CPU/time. Use them for archives you rarely touch.",
    content: `[root@solaris ~]# ls -lh db_dump.sql
-rw-r--r--   1 root root  2.0G Jan 11 10:30 db_dump.sql

# bzip2: better ratio than gzip, slower
[root@solaris ~]# bzip2 db_dump.sql
[root@solaris ~]# ls -lh db_dump.sql.bz2
-rw-r--r--   1 root root  600M Jan 11 10:40 db_dump.sql.bz2

# View without full decompression:
[root@solaris ~]# bzcat db_dump.sql.bz2 | head
CREATE DATABASE training;
...

# xz: often best ratio, slowest
[root@solaris ~]# xz -k db_dump.sql.bz2
[root@solaris ~]# ls -lh db_dump.sql.bz2.xz
-rw-r--r--   1 root root  400M Jan 11 10:50 db_dump.sql.bz2.xz

# Decompress:
[root@solaris ~]# bunzip2 db_dump.sql.bz2
[root@solaris ~]# unxz db_dump.sql.bz2.xz`,
  },
  {
    id: "tar-archive",
    title: "Create and extract tar archives (no compression)",
    description:
      "Use tar cvf to create an archive, tvf to list it, and xvf to extract it.",
    content: `[root@solaris ~]# ls appdir
bin  conf  logs

[root@solaris ~]# tar cvf appdir.tar appdir
a appdir/
a appdir/bin/
a appdir/bin/start.sh
a appdir/conf/app.conf
a appdir/logs/app.log

[root@solaris ~]# ls -lh appdir.tar
-rw-r--r--   1 root root  5.0M Jan 11 12:20 appdir.tar

# List contents without extracting
[root@solaris ~]# tar tvf appdir.tar
drwxr-xr-x root/root         0 Jan 11 12:20 appdir/
drwxr-xr-x root/root         0 Jan 11 12:20 appdir/bin/
-rwxr-xr-x root/root      1024 Jan 11 12:20 appdir/bin/start.sh
...

# Extract into current directory
[root@solaris ~]# tar xvf appdir.tar`,
  },
  {
    id: "tar-compressed",
    title: "tar with compression: gzip, bzip2, xz",
    description:
      "Combine archiving and compression in a single tar command using -z (gzip), -j (bzip2) or -J (xz).",
    content: `[root@solaris ~]# ls project
config.yml  index.html  script.sh  README.txt

# tar + gzip  → .tar.gz or .tgz (fastest)
[root@solaris ~]# tar czvf project.tar.gz project
[root@solaris ~]# tar tzvf project.tar.gz | head
drwxr-xr-x root/root         0 Jan 11 12:30 project/
-rw-r--r-- root/root      2048 Jan 11 12:30 project/config.yml
...

# tar + bzip2 → .tar.bz2 (smaller, slower)
[root@solaris ~]# tar cjvf project.tar.bz2 project
[root@solaris ~]# tar tjvf project.tar.bz2 | head
...

# tar + xz → .tar.xz (smallest, slowest)
[root@solaris ~]# tar cJvf project.tar.xz project
[root@solaris ~]# tar tJvf project.tar.xz | head
...`,
  },
  {
    id: "tar-extract-compressed",
    title: "Extract compressed tar archives",
    description:
      "Use xzvf / xjvf / xJvf to extract tar archives compressed with gzip, bzip2 and xz.",
    content: `[root@solaris ~]# ls
project.tar.gz  project.tar.bz2  project.tar.xz

# Extract gzip tarball
[root@solaris ~]# tar xzvf project.tar.gz

# Extract bzip2 tarball
[root@solaris ~]# tar xjvf project.tar.bz2

# Extract xz tarball
[root@solaris ~]# tar xJvf project.tar.xz`,
  },
];

export default function ArchivePage() {
  const lesson = solarisLessons.find((l) => l.slug === "archive") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Archive and Compression"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn the difference between archiving and compression, compare gzip/bzip2/xz, and use tar with and without compression on Solaris."
          }
        />
      </Head>

      <SolarisLayout activeSlug="archive">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 13
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-[#ff5b5b] md:text-3xl">
            {lesson.title || "Archive and Compression in Solaris"}
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
                title={lesson.title || "Archive and Compression in Solaris"}
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
              Archive vs compression – core idea
            </h2>
            <p>
              Many admins mix the words <span className="font-semibold">archive</span> and{" "}
              <span className="font-semibold">compression</span>, but they are
              different concepts:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-[13px]">
              <li>
                <span className="font-semibold">Archive</span> = combine
                multiple files/directories into a single file (tar).
              </li>
              <li>
                <span className="font-semibold">Compression</span> = reduce the
                size of data (gzip, bzip2, xz).
              </li>
              <li>
                In practice you often do <span className="font-semibold">
                  tar + compression
                </span>{" "}
                → e.g. <code>.tar.gz</code>, <code>.tar.bz2</code>,{" "}
                <code>.tar.xz</code>.
              </li>
            </ul>
          </section>

          {/* Concept cards: compression types */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Compression types: speed vs ratio
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiZap className="text-lg" />}
                title="gzip (.gz)"
                text="Fastest in most cases, good compression ratio. Ideal for backups and logs you compress regularly."
              />
              <FeatureCard
                icon={<FiArchive className="text-lg" />}
                title="bzip2 (.bz2)"
                text="Slower than gzip but usually better compression. Good when you want smaller archives and can wait a bit longer."
              />
              <FeatureCard
                icon={<FiHardDrive className="text-lg" />}
                title="xz (.xz)"
                text="Often gives the best compression ratio, but slowest. Use for long-term archives or software distributions."
              />
            </div>
          </section>

          {/* Terminals: individual flows */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Step-by-step archive and compression commands
            </h2>
            <p>
              Use these flows in your Solaris lab VM. Work in a test directory
              so you can create and remove archives freely.
            </p>

            {archiveSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — archive"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* Summary bullets: commands cheat sheet */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Quick command cheat sheet
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Compression only"
                points={[
                  "gzip file         → creates file.gz",
                  "gunzip file.gz    → restore original file",
                  "zcat file.gz      → view compressed file",
                  "bzip2 file        → creates file.bz2",
                  "bunzip2 file.bz2  → restore original",
                  "bzcat file.bz2    → view compressed file",
                  "xz file           → creates file.xz",
                  "unxz file.xz      → restore original",
                  "xzcat file.xz     → view compressed file",
                ]}
              />
              <BulletCard
                heading="tar + optional compression"
                points={[
                  "tar cvf  file.tar dir/    → archive only",
                  "tar tvf  file.tar         → list",
                  "tar xvf  file.tar         → extract",
                  "tar czvf file.tar.gz dir/ → tar + gzip",
                  "tar cjvf file.tar.bz2 dir/→ tar + bzip2",
                  "tar cJvf file.tar.xz dir/ → tar + xz",
                  "tar tzvf file.tar.gz      → list gzip tar",
                  "tar tjvf file.tar.bz2     → list bzip2 tar",
                  "tar tJvf file.tar.xz      → list xz tar",
                  "tar xzvf / xjvf / xJvf    → extract compressed tarballs",
                ]}
              />
            </div>
          </section>

          {/* Practice box */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
              Practice task – backup and restore a small project
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-emerald-50">
              <li>
                Create a test directory with a few subdirectories and files
                (scripts, configs, logs).
              </li>
              <li>
                Create archives using <code>tar cvf</code>,{" "}
                <code>tar czvf</code>, <code>tar cjvf</code> and{" "}
                <code>tar cJvf</code>, and compare resulting sizes.
              </li>
              <li>
                Practice listing and extracting archives safely in a separate
                directory so you don&apos;t overwrite existing files.
              </li>
              <li>
                Decide which compression type you will use by default in your
                environment (speed vs size) and document your choice.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-emerald-200">
              Archive and compression skills will be used again for log
              rotation, backups and moving data between Solaris and Linux
              systems.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
