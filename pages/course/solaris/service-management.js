// pages/course/solaris/service-management.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiSettings,
  FiRefreshCw,
  FiAlertCircle,
  FiCheckCircle,
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

/* ---------- SMF (service management) command snippets ---------- */

const serviceSnippets = [
  {
    id: "svcs-list",
    title: "List and filter services with svcs",
    description:
      "svcs shows the state of SMF services. Use -a for all, -xv for detailed fault information.",
    content: `[root@solaris ~]# svcs | head
STATE          STIME    FMRI
online         10:20:31 svc:/system/filesystem/minimal:default
online         10:20:32 svc:/system/filesystem/local:default
online         10:20:33 svc:/network/loopback:default
online         10:20:34 svc:/system/identity:domain
online         10:20:35 svc:/system/name-service-cache:default
online         10:20:36 svc:/network/ssh:default
online         10:20:37 svc:/system/cron:default

[root@solaris ~]# svcs -a | grep ssh
online         10:20:36 svc:/network/ssh:default

[root@solaris ~]# svcs -xv
svc:/network/dns/client:default (Domain Name Service)
 State: offline since Wed Jan 11 11:30:15 2025
Reason: Start method exited with $SMF_EXIT_ERR_CONFIG.
   See: http://support.oracle.com/msg/SMF-8000-2Q`,
  },
  {
    id: "svcadm-restart",
    title: "Restart a service safely with svcadm",
    description:
      "svcadm restart is the standard way to restart SMF services instead of killing processes directly.",
    content: `[root@solaris ~]# svcs ssh
STATE          STIME    FMRI
online         10:20:36 svc:/network/ssh:default

[root@solaris ~]# svcadm restart ssh

[root@solaris ~]# svcs ssh
STATE          STIME    FMRI
online         11:45:02 svc:/network/ssh:default`,
  },
  {
    id: "disable-enable",
    title: "Disable and enable services",
    description:
      "Use svcadm disable to stop and mark a service disabled, and enable to bring it back with dependencies.",
    content: `[root@solaris ~]# svcs cron
STATE          STIME    FMRI
online         10:20:37 svc:/system/cron:default

[root@solaris ~]# svcadm disable cron

[root@solaris ~]# svcs cron
STATE          STIME    FMRI
disabled       11:50:01 svc:/system/cron:default

[root@solaris ~]# svcadm enable cron

[root@solaris ~]# svcs cron
STATE          STIME    FMRI
online         11:51:12 svc:/system/cron:default`,
  },
  {
    id: "check-log-deps",
    title: "Check service logs and dependencies",
    description:
      "svcs -L shows the log file for a service, and -d shows its dependencies. These are critical for troubleshooting.",
    content: `[root@solaris ~]# svcs -xv dns/client
svc:/network/dns/client:default (Domain Name Service)
 State: offline since Wed Jan 11 11:30:15 2025
Reason: Start method exited with $SMF_EXIT_ERR_CONFIG.
   See: http://support.oracle.com/msg/SMF-8000-2Q
   See: /var/svc/log/network-dns-client:default.log
Impact: 2 dependent services are not running:
        svc:/network/nfs/client:default
        svc:/network/something/else:default

[root@solaris ~]# svcs -L dns/client
/var/svc/log/network-dns-client:default.log

[root@solaris ~]# svcs -d dns/client
STATE          STIME    FMRI
online         10:20:33 svc:/network/loopback:default`,
  },
  {
    id: "svcprop-config",
    title: "View service properties with svcprop",
    description:
      "svcprop reads configuration properties stored in the SMF repository. It is often used along with svccfg for advanced tuning.",
    content: `[root@solaris ~]# svcprop -p general/enabled network/ssh:default
true

[root@solaris ~]# svcprop -p options/tcp_listen_port network/ssh:default
22

[root@solaris ~]# svcprop -p start/exec network/ssh:default
/usr/lib/ssh/sshd`,
  },
];

export default function ServiceManagementPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "service-management") || {};

  return (
    <>
      <Head>
        <title>
          {lesson.title || "Service Management"} | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content={
            lesson.short ||
            "Learn how to use Solaris SMF tools like svcs, svcadm and svcprop to list, restart, enable, disable and troubleshoot services."
          }
        />
      </Head>

      <SolarisLayout activeSlug="service-management">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-5"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Solaris · Lesson 11
          </p>
          <h1 className="mt-1 text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            {lesson.title || "Service Management in Solaris"}
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
                title={lesson.title || "Service Management in Solaris"}
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
              What is SMF and why is it important?
            </h2>
            <p>
              Solaris uses the{" "}
              <span className="font-semibold">
                Service Management Facility (SMF)
              </span>{" "}
              to manage system and application services. Instead of classic
              init scripts, Solaris services are represented as FMRI objects,
              have dependencies and can be automatically restarted when they
              fail.
            </p>
            <p>
              As an administrator, you will constantly use{" "}
              <code>svcs</code>, <code>svcadm</code> and{" "}
              <code>svcprop</code> to inspect, control and troubleshoot
              services.
            </p>
          </section>

          {/* Concept cards */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Key SMF and service-management concepts
            </h2>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiSettings className="text-lg" />}
                title="Services & instances"
                text="Each SMF service can have one or more instances. They are identified by FMRI strings like svc:/network/ssh:default."
              />
              <FeatureCard
                icon={<FiCheckCircle className="text-lg" />}
                title="States"
                text="Services can be online, offline, disabled, maintenance, etc. The state tells you if the service is running and healthy."
              />
              <FeatureCard
                icon={<FiRefreshCw className="text-lg" />}
                title="Admin actions"
                text="svcadm enable, disable and restart are the proper ways to control SMF services, respecting dependencies and restarts."
              />
            </div>
          </section>

          {/* Step-by-step terminals */}
          <section className="space-y-5">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Step-by-step SMF commands
            </h2>
            <p>
              Use the following flows in your Solaris lab VM, especially for
              services you&apos;re allowed to restart (like SSH, test daemons or
              custom apps).
            </p>

            {serviceSnippets.map((snippet, index) => (
              <div key={snippet.id} className="space-y-2">
                <h3 className="text-sm font-semibold dark:text-slate-100">
                  {index + 1}. {snippet.title}
                </h3>
                <p className="text-xs dark:text-slate-300">
                  {snippet.description}
                </p>
                <TerminalOutput
                  content={snippet.content}
                  title="terminal — smf"
                  contextLabel="solaris-lab"
                  maxHeight="18rem"
                />
              </div>
            ))}
          </section>

          {/* Troubleshooting focus */}
          <section className="space-y-3">
            <h2 className="text-base font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Troubleshooting services with SMF
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              <BulletCard
                heading="When a service is in maintenance/offline"
                points={[
                  "Run svcs -xv service-name to get a human-readable explanation and log path.",
                  "Check the log file shown by svcs -L to see detailed error messages.",
                  "Verify configuration files referenced by the service (syntax, permissions, ownership).",
                  "After fixing the underlying issue, use svcadm clear or enable to bring the service out of maintenance.",
                ]}
              />
              <BulletCard
                heading="General SMF good practices"
                points={[
                  "Avoid killing service daemons directly; use svcadm restart instead.",
                  "Document any manual changes to SMF properties or custom services.",
                  "Test service restarts and dependency impacts in your lab before applying to production.",
                ]}
              />
            </div>
          </section>

          {/* Safety / practice box */}
          <section className="space-y-3 rounded-2xl border border-emerald-500/50 bg-emerald-500/10 p-4 shadow-lg shadow-emerald-900/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Hands-on practice – SMF in your lab
            </h2>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-[13px] dark:text-emerald-50">
              <li>
                Use <code>svcs</code> and <code>svcs -a</code> to explore all
                services on your Solaris VM. Identify which ones are most
                important (SSH, cron, name services, etc.). 
              </li>
              <li>
                Try restarting a safe service (for example, SSH) using{" "}
                <code>svcadm restart ssh</code> and watch the state change.
              </li>
              <li>
                Intentionally misconfigure a non-critical test service in the
                lab, observe the maintenance state, then fix it using logs and{" "}
                <code>svcs -xv</code>.
              </li>
              <li>
                Build a small personal checklist for SMF troubleshooting:
                commands you will always run when a service goes down.
              </li>
            </ul>
            <p className="mt-2 flex items-center gap-1 text-[12px] text-emerald-600">
              Understanding SMF will make later topics like monitoring, logging
              and performance tuning much easier to handle.
              <FiArrowRight className="text-xs" />
            </p>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
