// pages/course/solaris/patch-management.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiServer,
  FiArchive,
  FiRefreshCcw,
  FiGitBranch,
  FiAlertTriangle,
  FiShield,
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

/* ---------- Terminal snippets: full patch flow ---------- */

const patchSnippets = [
  {
    id: "prechecks",
    title: "Pre-checks: current OS level, BE and IPS state",
    description:
      "Always capture current Solaris version, boot environments and IPS state before patching.",
    content: `[root@localhost:~]# uname -a
SunOS sol11 5.11 11.4.41.111.0 i86pc i386 i86pc

# List boot environments
[root@localhost:~]# beadm list
BE           Active Mountpoint Space  Policy Created
solaris      NR     /          12.5G  static 2024-01-10 10:15
solaris-backup -    -          10.2G  static 2023-12-01 08:00

# Check IPS 'entire' package (constrains system version)
[root@localhost:~]# pkg list -v entire
NAME (PUBLISHER)  VERSION                                IFO
entire            11.4-11.4.41.111.0.1.0.0.0.0           i--`,
  },
  {
    id: "unzip-bundle",
    title: "Extract SRU zipped repo from My Oracle Support",
    description:
      "Downloaded SRU from MOS arrives as a single zip. Unzip it to see README and install-repo script.",
    content: `[root@localhost:~]# unzip p37322549_1100_SOLARIS64.zip
Archive:  p37322549_1100_SOLARIS64.zip
  inflating: README-zipped-repo.txt
  inflating: install-repo.ksh
  inflating: sol-11_4_76_182_1-incr-repo_digest.txt
  inflating: sol-11_4_76_182_1-readme.html
  inflating: sol-11_4_76_182_1-readme.txt`,
  },
  {
    id: "install-repo",
    title: "Run install-repo.ksh to build local SRU repo",
    description:
      "The install-repo script uncompresses multiple zip parts and creates a local IPS repository directory.",
    content: `[root@localhost:~]# ./install-repo.ksh -d /opt/SRU11.4.76
Using p37322547_1100_SOLARIS64 files for sol-11_4_76_182_1-incr-repo download.
Uncompressing p37322547_1100_SOLARIS64_1of10.zip...done.
Uncompressing p37322547_1100_SOLARIS64_2of10.zip...done.
Uncompressing p37322547_1100_SOLARIS64_3of10.zip...done.
Uncompressing p37322547_1100_SOLARIS64_4of10.zip...done.
Uncompressing p37322547_1100_SOLARIS64_5of10.zip...done.
Uncompressing p37322547_1100_SOLARIS64_6of10.zip...done.
Uncompressing p37322547_1100_SOLARIS64_7of10.zip...done.
Uncompressing p37322547_1100_SOLARIS64_8of10.zip...done.
Uncompressing p37322547_1100_SOLARIS64_9of10.zip...done.
Uncompressing p37322547_1100_SOLARIS64_10of10.zip...done.
Repository can be found in /opt/SRU11.4.76.`,
  },
  {
    id: "pkg-publisher-before",
    title: "Check current publishers (base vs SRU repo)",
    description:
      "Publishers tell IPS where to fetch packages from (Oracle network repo, local DVD, local SRU repo, etc.).",
    content: `[root@localhost:~]# pkg publisher
PUBLISHER                   TYPE     STATUS P LOCATION
solaris                     origin   online F https://pkg.oracle.com/solaris/support/`,
  },
  {
    id: "set-publisher-sru",
    title: "Point solaris publisher to local SRU repo",
    description:
      "Use file:// URI pointing to local repo directory created by install-repo.ksh.",
    content: `# EITHER add local repo as an additional origin:
[root@localhost:~]# pkg set-publisher -g file:///opt/SRU11.4.76 solaris

# OR replace all existing origins with this SRU only:
[root@localhost:~]# pkg set-publisher -G "*" -g file:///opt/SRU11.4.76 solaris

# Verify:
[root@localhost:~]# pkg publisher
PUBLISHER  TYPE   STATUS  P LOCATION
solaris    origin online  F file:///opt/SRU11.4.76/`,
  },
  {
    id: "dry-run-update",
    title: "Dry run patching (pkg update -nv)",
    description:
      "-n = no execute, -v = verbose. This shows plan (what will change) without applying.",
    content: `[root@localhost:~]# pkg update -nv
           Packages to remove:       1
           Packages to install:      3
            ...
DOWNLOAD                                PKGS         FILES    XFER (MB)   SPEED
Completed                                4/4       150/150      50.0/50.0  1.0M/s

PHASE                                      ACTIONS
Removal Phase                              10/10
Install Phase                              50/50

# Nothing has been changed yet (dry run only).`,
  },
  {
    id: "final-update",
    title: "Final patch run (pkg update --accept)",
    description:
      "--accept auto-accepts licenses. This will create a new boot environment and install SRU.",
    content: `[root@localhost:~]# pkg update --accept
           Packages to remove:       1
           Packages to install:      3
           Packages to update:     120
            ...
PHASE                                      ACTIONS
Update Phase                             500/500

A clone of solaris exists and has been updated and activated.
On the next boot the Boot Environment solaris-11_4_76 will be mounted on '/'.`,
  },
  {
    id: "beadm-list-after",
    title: "Check boot environments after update",
    description:
      "pkg update auto-creates a new BE. Old one is kept for rollback.",
    content: `[root@localhost:~]# beadm list
BE               Active Mountpoint Space  Policy Created
solaris          N      -          13.0G  static 2024-01-10 10:15
solaris-11_4_76  R      -          14.5G  static 2025-01-20 23:05

# N = currently running
# R = will be used on next reboot`,
  },
  {
    id: "reboot",
    title: "Reboot into new boot environment",
    description:
      "Use init 6 or reboot. On next boot, system uses the new activated BE.",
    content: `[root@localhost:~]# init 6`,
  },
  {
    id: "postchecks",
    title: "Post-checks after patching",
    description:
      "Confirm new OS level, BE status, and IPS entire version after reboot.",
    content: `[root@localhost:~]# uname -a
SunOS sol11 5.11 11.4.76.182.1 i86pc i386 i86pc

[root@localhost:~]# beadm list
BE               Active Mountpoint Space  Policy Created
solaris          -      -          13.0G  static 2024-01-10 10:15
solaris-11_4_76  NR     /          14.5G  static 2025-01-20 23:05

[root@localhost:~]# pkg list -v entire
NAME (PUBLISHER)  VERSION                              IFO
entire            11.4-11.4.76.182.1.0.0.1.0           i--`,
  },
  {
    id: "publisher-reset",
    title: "Reset publisher back to base repo (optional)",
    description:
      "After patching from local SRU, you may want to point solaris publisher back to network/base repo.",
    content: `# Remove local SRU origin:
[root@localhost:~]# pkg unset-publisher solaris

# Then set to base/oracle support repo again (example):
[root@localhost:~]# pkg set-publisher -g https://pkg.oracle.com/solaris/support/ solaris

[root@localhost:~]# pkg publisher
PUBLISHER  TYPE   STATUS  P LOCATION
solaris    origin online  F https://pkg.oracle.com/solaris/support/`,
  },
];

/* ---------- Page component ---------- */

export default function PatchManagementPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "patch-management") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Patch Management in Solaris 11"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn Solaris 11 patch management with IPS: SRU repo bundles, publishers, dry-run vs final patch, and boot environments."
          }
        />
      </Head>

      <SolarisLayout activeSlug="patch-management">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 23
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            {lesson.title || "Patch Management in Solaris 11 (SRU & IPS)"}
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-300">
            Patching in Solaris 11 is done using IPS and SRU repositories. In
            this lesson you&apos;ll see what patches are, why we apply them, how
            base and SRU repos work, how publishers are configured, and how
            boot environments make patching safer.
          </p>
          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
        </motion.header>

        {/* OPTIONAL IMAGE / SHOWERHEAD AREA – MOS DOWNLOAD STEPS */}
        {/* Replace <img> URLs with your Cloudinary images. If you have a custom ShowerHead component,
            you can wrap this markup or pass the URLs as props into it. */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.05)}
          className="mb-8 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/80"
        >
          <h2 className="mb-2 text-sm font-semibold text-[#ff5b5b]">
            How to download SRU bundle from My Oracle Support (visual guide)
          </h2>
          <p className="text-xs text-slate-300">
            You can use screenshots here to show the MOS flow: login, go to
            Patches &amp; Updates, search for SRU ID, download zipped repo,
            verify checksum, etc.
          </p>

{/* Images */}
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {/* EXAMPLE: replace src with your Cloudinary URLs */}
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80">
              <img
                src="https://res.cloudinary.com/YOUR_ACCOUNT/image/upload/v1234567890/mos_step1.png"
                alt="My Oracle Support - search SRU"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80">
              <img
                src="https://res.cloudinary.com/YOUR_ACCOUNT/image/upload/v1234567890/mos_step2.png"
                alt="Download zipped SRU repository"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <p className="mt-2 text-[11px] text-slate-400">
            If you have a custom <code>ShowerHead</code> component, you can move
            these images and title into that component and pass your Cloudinary
            URLs through props.
          </p>
        </motion.section>

        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed text-slate-200"
        >
          {/* THEORY: what / why / how */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Patching – what, why, how in Solaris 11
            </h2>
            <p>
              In Solaris 11, patching is done via{" "}
              <span className="font-semibold">Image Packaging System (IPS)</span>{" "}
              and <span className="font-semibold">Support Repository
              Updates (SRUs)</span>, not traditional patch numbers only. An SRU
              is a tested bundle of fixes released regularly by Oracle.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiRefreshCcw className="text-lg" />}
                title="What"
                text="Patching = updating packages that make up the OS image, usually via a new SRU level."
              />
              <FeatureCard
                icon={<FiShield className="text-lg" />}
                title="Why"
                text="Security fixes, bug fixes, new features, and staying within supported configurations."
              />
              <FeatureCard
                icon={<FiDownload className="text-lg" />}
                title="How"
                text="Download SRU repo, configure publisher, run dry-run, then final pkg update into a new boot environment."
              />
            </div>
          </section>

          {/* Base vs SRU repo + publisher */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Base repository, SRU repository and publishers
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Base repo"
                points={[
                  "Usually Oracle network repository (pkg.oracle.com) or ISO/DVD repository.",
                  "Provides initial OS image and sometimes older SRU levels.",
                  "Publisher name is typically 'solaris'.",
                ]}
              />
              <BulletCard
                heading="SRU repo"
                points={[
                  "Downloaded from My Oracle Support as zipped repo bundles.",
                  "install-repo.ksh builds a local IPS repo directory (e.g. /opt/SRU11.4.76).",
                  "You point the 'solaris' publisher to this local file:/// repo before pkg update.",
                ]}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<FiServer className="text-lg" />}
                title="Publisher – what is it?"
                text="A publisher is the identity of a software source (e.g. solaris). It defines from where IPS fetches packages."
              />
              <FeatureCard
                icon={<FiArchive className="text-lg" />}
                title="Publisher – how to control"
                text="Use pkg publisher to view, pkg set-publisher and pkg unset-publisher to change origins and priorities."
              />
            </div>
          </section>

          {/* Boot environment theory */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Boot Environment (BE) – what and how
            </h2>
            <p>
              A <span className="font-semibold">Boot Environment (BE)</span> is a
              ZFS clone of the root filesystem used at boot. When you run{" "}
              <code>pkg update</code>, Solaris automatically creates a new BE and
              patches that copy. This makes patching <strong>much safer</strong>.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Key points about BE"
                points={[
                  "Old BE remains untouched (rollback possible).",
                  "New BE is created and activated during pkg update.",
                  "Next reboot uses the new BE; old one can be booted again if required.",
                ]}
              />
              <BulletCard
                heading="Basic BE commands"
                points={[
                  "beadm list → list all BEs",
                  "beadm create <name> → manual BE (before risky change)",
                  "beadm activate <name> → mark BE for use at next boot",
                ]}
              />
            </div>
          </section>

          {/* Terminal section */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Full SRU patch flow – step by step (with dry run)
            </h2>
            <p>
              These examples follow a typical offline patching flow using a local
              SRU repo downloaded from My Oracle Support.
            </p>

            {patchSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs text-slate-300">{snippet.description}</p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — patch"
                  contextLabel="solaris-lab"
                  maxHeight="20rem"
                />
              </div>
            ))}
          </section>

          {/* Pre/post checklist */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Pre-check and post-check checklist
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Pre-checks"
                points={[
                  "uname -a → current kernel / SRU",
                  "beadm list → current and previous BEs",
                  "pkg list -v entire → current IPS image version",
                  "pkg publisher → current repo/source",
                  "Disk space in rpool (df -h) → ensure enough for new BE",
                  "Backup critical data / take snapshots if needed.",
                ]}
              />
              <BulletCard
                heading="Post-checks"
                points={[
                  "uname -a → confirm new SRU version.",
                  "beadm list → BE with NR active at /.",
                  "pkg list -v entire → matches target SRU version.",
                  "Basic application checks and service status (svcs -xv).",
                ]}
              />
            </div>
          </section>

          {/* Safety / rollback hint */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <FiAlertTriangle className="text-base" />
              Safety notes & where rollback fits
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-red-200">
              <li>
                Always test new SRUs in a non-production environment first whenever possible.
              </li>
              <li>
                Avoid patching multiple critical servers at once; stagger the updates.
              </li>
              <li>
                Use boot environments instead of trying to downgrade packages manually.
              </li>
              <li>
                If there are post-patch issues, typical rollback is via BE:
                boot into previous BE using the boot menu or{" "}
                <code>beadm activate &lt;old_BE&gt;</code> and reboot.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-red-200">
              For detailed rollback and patch-issue scenarios, it&apos;s better
              to have a dedicated lesson (Patch Rollback &amp; Troubleshooting)
              so that this page remains clean and linear.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
