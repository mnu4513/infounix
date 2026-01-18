import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiClock, FiCalendar, FiArrowRight } from "react-icons/fi";

import ShellLayout from "../../../components/shell/ShellLayout";
import { shellLessons } from "../../../components/shell/shellLessons";
import FeatureCard from "../../../components/solaris/FeatureCard";
import BulletCard from "../../../components/solaris/BulletCard";
import TerminalOutput from "../../../components/TerminalOutput";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.5 } },
});

export default function CronTabPage() {
  return (
    <>
      <Head>
        <title>Crontab Scheduling | Shell Scripting | InfoUnix</title>
      </Head>

      <ShellLayout activeSlug="crontab">
        <motion.div initial="hidden" animate="visible" variants={fadeUp(0)}>
          <h1 className="text-2xl font-semibold text-[#22c55e]">
            Scheduling Scripts with Crontab
          </h1>

          <p className="mt-2 text-slate-300">
            Cron is a time-based job scheduler in Linux used to run scripts automatically.
          </p>

          <section className="mt-6 space-y-4">
            <FeatureCard
              icon={<FiClock />}
              title="What is Crontab?"
              text="Crontab allows users to schedule commands or scripts at fixed times or intervals."
            />

            <TerminalOutput
              title="Edit Crontab"
              content={`crontab -e`}
            />

            <TerminalOutput
              title="Run backup daily at 2 AM"
              content={`0 2 * * * /home/user/backup.sh`}
            />

            <BulletCard
              heading="Crontab Fields"
              points={[
                "Minute (0–59)",
                "Hour (0–23)",
                "Day of Month (1–31)",
                "Month (1–12)",
                "Day of Week (0–7)",
              ]}
            />
          </section>
        </motion.div>
      </ShellLayout>
    </>
  );
}
