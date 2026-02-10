// pages/course/solaris/installation-and-setup.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiMonitor,
  FiBox,
  FiHardDrive,
  FiArrowRight,
} from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/SolarisLessons";
import FeatureCard from "../../../components/solaris/FeatureCard";
import BulletCard from "../../../components/solaris/BulletCard";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

export default function InstallationAndSetupPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "installation-and-setup") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Installation and Setup"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Step-by-step guide to creating a Solaris 11 practice lab using VMware: installing VMware, downloading ISO, creating VM, and installing the OS."
          }
        />
      </Head>

      <SolarisLayout activeSlug="installation-and-setup">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 2
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Installation and Setup (VMware Lab)"}
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
                title={lesson.title || "Installation and Setup"}
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
              Objective of this lesson
            </h2>
            <p>
              In this lesson, we will set up a complete{" "}
              <span className="text-sky-300">
                Solaris 11 practice lab using VMware
              </span>{" "}
              on your laptop or desktop. This way you can practice everything
              from this course safely without touching any production system.
            </p>
            <p>
              We will go through 3 main parts:{" "}
              <span className="font-semibold">
                installing VMware → downloading Solaris ISO → creating &
                installing Solaris VM
              </span>
              .
            </p>
          </section>

          {/* Requirements / Environment */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              System requirements for the lab
            </h2>
            <p>
              Before starting, make sure your machine is capable of running a
              virtual machine smoothly.
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiMonitor className="text-lg" />}
                title="Host Machine"
                text="Windows / Linux desktop or laptop with virtualization support enabled in BIOS (Intel VT-x / AMD-V)."
              />
              <FeatureCard
                icon={<FiHardDrive className="text-lg" />}
                title="CPU, RAM & Disk"
                text="Recommended: 4 CPU cores, minimum 8 GB RAM, and at least 60–80 GB free disk space for VMs."
              />
              <FeatureCard
                icon={<FiBox className="text-lg" />}
                title="Software"
                text="VMware Workstation Pro / Player (on Windows or Linux) and Solaris 11 ISO image for x86 platform."
              />
            </div>
          </section>

          {/* Step 1: Install VMware */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step 1 – Install VMware Workstation / Player
            </h2>
            <p>
              VMware will act as the hypervisor where we will create our
              virtual Solaris machine.
            </p>

            <BulletCard
              heading="Download & install VMware"
              points={[
                "Open VMware website and download VMware Workstation Pro or VMware Workstation Player (free for non-commercial use).",
                "Choose the installer for your host OS (Windows / Linux).",
                "Run the installer and follow the default steps (Next → Next → Finish).",
                "After installation, launch VMware and verify it opens without error.",
              ]}
            />

            <p>
              If you already have another hypervisor like VirtualBox, you can
              use that too, but{" "}
              <span className="font-semibold">this course will demo using VMware</span>{" "}
              so screenshots and videos will match VMware UI.
            </p>
          </section>

          {/* Step 2: Download Solaris ISO */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step 2 – Download Solaris 11 ISO
            </h2>
            <p>
              Next we need the installation media (ISO file) for Solaris 11.
              This is similar to having a bootable DVD, but in file form.
            </p>

            <BulletCard
              heading="Getting the Solaris ISO"
              points={[
                "Go to Oracle’s official website and search for 'Oracle Solaris 11 ISO download'.",
                "Create or sign in with an Oracle account (free registration).",
                "Accept the license agreement before downloading.",
                "Make sure you download the ISO for x86 platform (not SPARC) since we are using a normal PC / laptop.",
              ]}
            />

            <p className="text-xs text-slate-400">
              Tip: Put the ISO in a dedicated folder like{" "}
              <code className="rounded bg-slate-900 px-1">
                D:\ISOs\Solaris
              </code>{" "}
              so it’s easier to locate from VMware later.
            </p>
          </section>

          {/* Step 3: Create VM */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step 3 – Create a new Solaris VM in VMware
            </h2>
            <p>
              Now we will create a virtual machine and attach the Solaris ISO to
              it.
            </p>

            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="Basic VM configuration"
                points={[
                  "In VMware, click on 'Create a New Virtual Machine'.",
                  "Choose 'Typical' configuration (enough for this lab).",
                  "Select 'I will install the operating system later' if VMware cannot detect the ISO automatically.",
                  "Choose Guest OS type as 'Solaris' and appropriate version (Solaris 11).",
                ]}
              />
              <BulletCard
                heading="Hardware resources"
                points={[
                  "Assign 2 virtual CPUs (or 1 if your laptop is low on resources).",
                  "Allocate 4 GB RAM if possible (2 GB minimum).",
                  "Create a new virtual disk of around 40–60 GB (split or single file is fine).",
                  "Keep the default virtual network as NAT or Bridged based on your preference.",
                ]}
              />
            </div>

            <p>
              After finishing the wizard, you should see a new VM entry for
              Solaris in your VMware interface.
            </p>
          </section>

          {/* Step 4: Attach ISO & Install */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step 4 – Attach ISO and install Solaris
            </h2>
            <p>
              With the VM created, we now attach the ISO file and perform the
              normal OS installation inside VMware.
            </p>

            <BulletCard
              heading="Booting from ISO"
              points={[
                "Open VM settings and go to the CD/DVD drive section.",
                "Select 'Use ISO image file' and browse to your downloaded Solaris ISO.",
                "Ensure 'Connect at power on' is checked.",
                "Power on the VM – it should boot into the Solaris installer from the ISO.",
              ]}
            />

            <BulletCard
              heading="Solaris installation flow (high level)"
              points={[
                "Choose language and keyboard layout as per your preference.",
                "Select the target disk (the virtual disk we created earlier).",
                "Configure basic network settings (or use automatic / DHCP for now).",
                "Set root password and create a normal user (non-root).",
                "Review the summary and start the installation. Once complete, the VM will reboot into your new Solaris system.",
              ]}
            />
          </section>

          {/* Lab recap / Next steps */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              What you should have after this lesson
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-emerald-50">
              <li>VMware installed and working on your host machine.</li>
              <li>A Solaris 11 ISO downloaded and stored safely.</li>
              <li>
                A fully installed Solaris 11 virtual machine that you can boot
                into anytime.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-emerald-600">
              From the next lessons onwards, we will use this same VM to explore
              commands, users, groups, ZFS, SMF and much more.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
