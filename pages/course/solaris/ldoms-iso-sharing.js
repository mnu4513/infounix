// pages/course/solaris/ldoms-iso-sharing.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiDisc, FiCopy } from "react-icons/fi";

import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/solarisLessons";
import BulletCard from "../../../components/solaris/BulletCard";
import FeatureCard from "../../../components/solaris/FeatureCard";
import TerminalOutput from "../../../components/TerminalOutput";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

const isoSnip = {
  title: "Share a single ISO read-only to multiple guests",
  desc: "Example using ldm add-vdsdev with options=ro, then add-vdisk to guests.",
  content: `# ISO stored on service/primary domain:
[root@primary ~]# ls /export/home
sol-10-u10-ga2-sparc-dvd.iso

# Add as virtual disk server backend (read-only)
[root@primary ~]# ldm add-vdsdev options=ro \
    /export/home/sol-10-u10-ga2-sparc-dvd.iso newiso2@primary-vds0

# Attach ISO as virtual DVD to guest ldg1
[root@primary ~]# ldm add-vdisk dvd0 newiso2@primary-vds0 ldg1

# Attach same ISO to another guest ldg2
[root@primary ~]# ldm add-vdisk dvd0 newiso2@primary-vds0 ldg2

# Inside guests, boot from dvd0 via OBP to install OS.`,
};

export default function LdomsIsoSharingPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "ldoms-iso-sharing") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "LDOMs – Sharing ISO Images to Multiple Guests"} |
          InfoUnix
        </title>
      </Head>

      <SolarisLayout activeSlug="ldoms-iso-sharing">
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs tracking-[0.3em] text-slate-400">
            Solaris SPARC · LDOMs · ISO
          </p>
          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            Sharing One ISO Image with Multiple Guest Domains
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Instead of copying ISO files multiple times, you can expose a single
            ISO from the service domain as a read-only virtual disk device and
            attach it to many guests. Useful for OS installs and recovery tools.
          </p>
          <div className="mt-3 h-px bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
        </motion.header>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed text-slate-200"
        >
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Concept: virtual DVD from ISO
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <FeatureCard
                icon={<FiDisc className="text-lg" />}
                title="Backend"
                text="ISO is presented as a vdsdev backend on the virtual disk service."
              />
              <FeatureCard
                icon={<FiCopy className="text-lg" />}
                title="Frontend"
                text="Each guest sees it as a vdisk (virtual DVD) attached to the domain."
              />
            </div>
            <BulletCard
              heading="Benefits"
              points={[
                "One ISO file instead of many copies.",
                "Consistent install media for all guests.",
                "Easy to update / replace with new ISO.",
              ]}
            />
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Commands and example
            </h2>
            <TerminalOutput
              content={isoSnip.content}
              title="terminal — ISO sharing"
              contextLabel="ldoms-lab"
              maxHeight="18rem"
            />
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
