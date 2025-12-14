// pages/course/solaris/run-levels.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiPower,
  FiAlertTriangle,
  FiGitBranch,
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

/* ---------- Terminal snippets ---------- */

const runlevelSnippets = [
  {
    id: "who-r",
    title: "Check current run level with who -r",
    description:
      "Shows current run level and previous run level with time since change.",
    content: `[root@solaris ~]# who -r
   .       run-level 3  Jan 20 10:15    3   0  S`,
  },
  {
    id: "shutdown-i6",
    title: "Reboot system via shutdown",
    description:
      "-i selects target run level, -g is grace period (seconds), -y auto-confirm.",
    content: `[root@solaris ~]# shutdown -i6 -g0 -y
Shutdown initiated.
The system will be brought to run level 6 now.`,
  },
  {
    id: "init-3",
    title: "Switch to multi-user level 3 via init",
    description:
      "init directly changes run level; usually use shutdown for planned changes.",
    content: `[root@solaris ~]# /sbin/init 3`,
  },
  {
    id: "single-user-S",
    title: "Move to single-user mode (maintenance)",
    description:
      "Single-user mode is for maintenance; only root is allowed and many services are offline.",
    content: `[root@solaris ~]# /sbin/init S

INIT: New run level: S
  (system enters single-user mode; console login as root required)`,
  },
  {
    id: "poweroff-0",
    title: "Graceful OS shutdown to run level 0 (halt)",
    description: "System halts, can be powered off safely.",
    content: `[root@solaris ~]# shutdown -i0 -g60 -y
# Waits 60 seconds then halts the system.`,
  },
];

/* ---------- Run level summary data (for explanation) ---------- */

const runLevelSummary = [
  {
    level: "0",
    name: "Halt",
    desc: "OS is down; system stopped. Safe to power off.",
  },
  {
    level: "s / S",
    name: "Single-user / Maintenance",
    desc: "Minimal environment, root only, for maintenance.",
  },
  {
    level: "1",
    name: "Single-user (legacy)",
    desc: "Historically similar to S; rarely used on modern Solaris.",
  },
  {
    level: "2",
    name: "Multi-user (no network)",
    desc: "Multiple users, basic services, usually minimal or no network.",
  },
  {
    level: "3",
    name: "Multi-user with networking",
    desc: "Normal server mode: multi-user + network services (default).",
  },
  {
    level: "4",
    name: "Unused / Custom",
    desc: "Site-specific usage if configured; often unused.",
  },
  {
    level: "5",
    name: "Power down",
    desc: "Shut down and power off (ACPI-supported systems).",
  },
  {
    level: "6",
    name: "Reboot",
    desc: "Graceful reboot; system restarts.",
  },
];

export default function RunLevelsPage() {
  const lesson = solarisLessons.find((l) => l.slug === "run-levels") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Run Levels in Solaris"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Detailed explanation of Solaris run levels 0, s, S, 1, 2, 3, 4, 5, 6, their differences, and how they map to SMF milestones."
          }
        />
      </Head>

      <SolarisLayout activeSlug="run-levels">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Run Levels
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            {lesson.title || "Run Levels in Solaris"}
          </h1>

          <p className="mt-1 max-w-3xl text-sm text-slate-300">
            Run levels control the overall state of a Solaris system: from halt
            (0) to single-user (S) to full multi-user with networking (3) and
            reboot (6). Modern Solaris uses SMF milestones internally, but run
            levels are still important for administration, troubleshooting and
            interviews.
          </p>

          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
        </motion.header>

        {/* IMAGE BLOCK – replace src with your Cloudinary URL */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.05)}
          className="mb-8 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg shadow-slate-950/80"
        >
          <h2 className="mb-2 text-sm font-semibold text-[#ff5b5b]">
            Visual overview of Solaris run levels
          </h2>
          <p className="text-xs text-slate-300">
            Replace the image URL below with your Cloudinary link to show a
            diagram of run levels (0, S, 1, 2, 3, 4, 5, 6) and transitions.
          </p>
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80">
            <img
              src="https://res.cloudinary.com/your-account/image/upload/v1234567890/solaris-runlevels.png"
              alt="Solaris run level diagram"
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Just replace the <code>src</code> value with your own Cloudinary URL.
          </p>
        </motion.section>

        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed text-slate-200"
        >
          {/* WHAT / WHY */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              What are run levels in Solaris?
            </h2>
            <p>
              Traditional UNIX and Solaris use{" "}
              <span className="font-semibold">run levels</span> to define system
              state. Each run level represents a specific combination of
              started/stopped services and available functionality (single-user,
              multi-user, networking, etc.).
            </p>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiActivity className="text-lg" />}
                title="System state control"
                text="Each run level defines what services and users are allowed – from maintenance mode to full production."
              />
              <FeatureCard
                icon={<FiGitBranch className="text-lg" />}
                title="Transition points"
                text="Changing run level transitions the system between states (e.g. 3 → S for maintenance)."
              />
              <FeatureCard
                icon={<FiPower className="text-lg" />}
                title="Mapped to SMF"
                text="On Solaris 10/11, run levels are implemented internally using SMF milestones."
              />
            </div>
          </section>

          {/* TABLE / SUMMARY OF RUN LEVELS */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Summary of Solaris run levels (0, s/S, 1, 2, 3, 4, 5, 6)
            </h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {runLevelSummary.map((item) => (
                <div
                  key={item.level}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs shadow-md shadow-slate-950/60"
                >
                  <p className="text-[11px] font-semibold text-slate-400">
                    Run Level
                  </p>
                  <p className="text-lg font-bold text-[#ff5b5b]">
                    {item.level}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-100">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-300">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <BulletCard
              heading="Most commonly used in practice"
              points={[
                "S / s    → Single-user/maintenance mode.",
                "3        → Normal multi-user with networking (default server mode).",
                "0, 5, 6  → Shutdown/halt, power off, reboot.",
              ]}
            />
          </section>

          {/* DIFFERENCE: S, s, 1, 2, 3, 4, 5, 6 */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Detailed differences – 0, s/S, 1, 2, 3, 4, 5, 6
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <BulletCard
                heading="Single-user related (s / S / 1)"
                points={[
                  "s and S are effectively the same: single-user (maintenance) mode.",
                  "Only root is allowed to log in (usually on console).",
                  "Network services often stopped; minimal daemons running.",
                  "Used for disk checks, password recovery, repairs.",
                  "Run level 1 is a legacy name similar to S; rarely used on modern systems.",
                ]}
              />
              <BulletCard
                heading="Multi-user related (2 / 3 / 4)"
                points={[
                  "2 → Multi-user without full networking (site-dependent).",
                  "3 → Full multi-user with networking (default production level).",
                  "4 → Generally unused; available for custom configurations if needed.",
                ]}
              />
            </div>
            <BulletCard
              heading="Shutdown & reboot (0 / 5 / 6)"
              points={[
                "0 → Halt OS; system can be powered off.",
                "5 → Power off (ACPI-controlled systems) – effectively halt + power down.",
                "6 → Reboot – system will shutdown and immediately restart.",
              ]}
            />
          </section>

          {/* TERMINAL EXAMPLES */}
          <section className="space-y-6">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Run level commands & examples
            </h2>
            <p>
              In modern Solaris, you usually use <code>shutdown</code> to move
              between run levels cleanly, and <code>who -r</code> to check
              current run level. <code>init</code> calls are still supported and
              commonly used in scripts.
            </p>

            {runlevelSnippets.map((s, index) => (
              <div key={s.id} className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-100">
                  {index + 1}. {s.title}
                </h3>
                <p className="text-xs text-slate-300">{s.description}</p>
                <TerminalOutput
                  content={s.content}
                  title="terminal — run levels"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* SMF / MILESTONES NOTE */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Run levels vs SMF milestones in Solaris 10/11
            </h2>
            <p>
              Under the hood, Solaris 10/11 use{" "}
              <span className="font-semibold">SMF (Service Management
              Facility)</span> and <span className="font-semibold">
                milestones
              </span>{" "}
              to control system state. Run levels are mapped to SMF milestones
              like:
            </p>
            <BulletCard
              heading="Examples"
              points={[
                "Run level 3 → milestone multi-user-server",
                "Run level S → milestone single-user",
              ]}
            />
            <p className="text-xs text-slate-300">
              You can inspect SMF milestones and services with:
            </p>
            <TerminalOutput
              content={`# Check services for multi-user-server milestone
[root@solaris ~]# svcs -p multi-user-server`}
              title="terminal — smf"
              contextLabel="solaris-lab"
            />
          </section>

          {/* SAFETY / BEST PRACTICES */}
          <section className="space-y-3 rounded-2xl border border-red-500/60 bg-red-500/10 p-4 shadow-lg shadow-red-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-300">
              <FiAlertTriangle className="text-base" />
              Safety tips when changing run levels
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] text-red-200">
              <li>
                For production systems, always use{" "}
                <code>shutdown -iX -gN -y</code> instead of direct{" "}
                <code>init X</code> (it gives users/applications time to exit).
              </li>
              <li>
                Inform application teams before moving to S/0/5/6; they might
                need to stop services cleanly.
              </li>
              <li>
                Do not experiment with run levels on critical servers during
                business hours.
              </li>
              <li>
                Combine run level changes with proper{" "}
                <code>pre-post-check</code> steps you defined in the previous
                lesson.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-red-200">
              Once you understand run levels clearly, boot troubleshooting and
              maintenance activities become much easier.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
