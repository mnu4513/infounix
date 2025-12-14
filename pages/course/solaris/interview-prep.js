// pages/course/solaris/interview-preparation.js

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiTarget,
  FiBook,
  FiShield,
  FiCpu,
  FiCloudLightning,
  FiAlertTriangle,
  FiSearch,
  FiLayers,
  FiHardDrive,
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
    transition: { delay, duration: 0.4, ease: "easeOut" },
  },
});

export default function InterviewPreparationPage() {
  const lesson =
    solarisLessons.find((l) => l.slug === "interview-preparation") || {};

  return (
    <>
      <Head>
        <title>
          Solaris Interview Preparation | Solaris Course | InfoUnix
        </title>
        <meta
          name="description"
          content="Complete Solaris Interview Preparation: SMF, ZFS, Zones, Kernel Zones, LDOMs, networking, patching, troubleshooting, and real-world Solaris admin scenarios."
        />
      </Head>

      <SolarisLayout activeSlug="interview-preparation">
        {/* HEADER */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeUp(0)}
          className="mb-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Solaris · Interview Preparation
          </p>

          <h1 className="mt-1 text-3xl font-semibold text-[#ff5b5b]">
            Solaris Interview Preparation — Complete Guide
          </h1>

          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            This final lesson is your Solaris interview playbook. It combines
            concepts, commands, real-world scenarios and typical questions asked
            in L1/L2/L3 Solaris and SPARC admin interviews, so you can answer
            confidently with practical examples instead of just theory.
          </p>

          <div className="mt-3 h-px w-full bg-gradient-to-r from-[#ff5b5b] via-slate-700 to-transparent" />
        </motion.header>

        {/* VIDEO (optional) */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.05)}
          className="mb-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 shadow-xl shadow-slate-950/80"
        >
          {lesson.videoUrl ? (
            <div className="aspect-video w-full">
              <iframe
                src={lesson.videoUrl}
                title={
                  lesson.title || "Solaris Interview Preparation | InfoUnix"
                }
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center text-xs text-slate-400">
              Add your interview prep video URL in{" "}
              <code>solarisLessons.js</code> (slug:{" "}
              <code>interview-preparation</code>).
            </div>
          )}
        </motion.div>

        {/* MAIN CONTENT */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="space-y-10 text-sm leading-relaxed text-slate-200"
        >
          {/* LEVEL OVERVIEW */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Interview Structure – Levels & Expectations
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiTarget className="text-lg" />}
                title="Level 1 – Basic Solaris Admin"
                text="Linux/Solaris basics, users/groups, run-levels, SMF, filesystem, basic troubleshooting, logs."
              />
              <FeatureCard
                icon={<FiBook className="text-lg" />}
                title="Level 2 – Core Solaris Engineer"
                text="ZFS, Zones, SMF deep dive, networking (ipadm/dladm/IPMP), IPS patching, system monitoring."
              />
              <FeatureCard
                icon={<FiShield className="text-lg" />}
                title="Level 3 – SPARC / Enterprise"
                text="LDOMs, kernel zones, storage & performance tuning, live migration, DR design, complex troubleshooting."
              />
            </div>

            <BulletCard
              heading="How to use this page"
              points={[
                "For every topic: know 1–2 lines of definition, 3–4 important commands, and 1 real problem you solved.",
                "Do not just memorise commands – be ready to explain why you used them.",
                "Use stories: 'Once in production I faced X, I did Y, and result was Z'.",
              ]}
            />
          </section>

          {/* SECTION 1: SMF, RUN LEVELS, REPO.DB */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              SMF, Milestones, Run Levels & repository.db
            </h2>

            <p>
              SMF (Service Management Facility) is one of the favourite topics
              in Solaris interviews because it shows how comfortable you are
              with modern Solaris service management and boot process.
            </p>

            <h3 className="mt-2 text-sm font-semibold text-slate-100">
              Q1: What is SMF? How is it different from init scripts?
            </h3>
            <p>
              SMF replaces legacy <code>/etc/init.d</code> scripts. It manages
              services via FMRIs like <code>svc:/network/ssh:default</code> with
              proper dependencies, states, and logging. Instead of manual shell
              scripts in different run-level directories, SMF gives you a
              central framework to enable/disable/troubleshoot services.
            </p>

            <TerminalOutput
              title="Checking and fixing an SMF service"
              contextLabel="interview-smf"
              maxHeight="18rem"
              content={`# List all services
svcs

# Show only services with issues and explanations
svcs -xv

# Example: fix SSH service in maintenance after bad config
svcs -xv svc:/network/ssh:default
vi /etc/ssh/sshd_config    # correct the error

svcadm clear svc:/network/ssh:default
svcadm restart svc:/network/ssh:default

svcs -xv svc:/network/ssh:default`}
            />

            <p className="text-xs text-slate-400">
              Real-life example:{" "}
              <span className="text-slate-200">
                “App team reported SSH down. Instead of just restarting
                services, I used <code>svcs -xv</code> and found SSH in{" "}
                <code>maintenance</code> state due to invalid config. Fixed the
                file, cleared and restarted the service. Issue resolved without
                reboot.”
              </span>
            </p>

            <h3 className="mt-3 text-sm font-semibold text-slate-100">
              Q2: What is a milestone? How is it related to run levels?
            </h3>
            <p>
              Milestones are SMF targets that group services together, similar
              to run levels. Examples:{" "}
              <code>milestone/single-user:default</code>,{" "}
              <code>milestone/multi-user:default</code>,{" "}
              <code>milestone/multi-user-server:default</code>.
            </p>
            <p>
              In Solaris 11, milestones are more important than classic run
              levels, but you can still view run-level with <code>who -r</code>.
            </p>

            <TerminalOutput
              title="Milestones and run levels"
              contextLabel="interview-smf"
              maxHeight="12rem"
              content={`# Show current run level
who -r

# See milestone services
svcs milestone

# Move to multi-user-server milestone
svcadm milestone -d milestone/multi-user-server:default`}
            />

            <h3 className="mt-3 text-sm font-semibold text-slate-100">
              Q3: What is <code>repository.db</code>? What if it is corrupted?
            </h3>
            <p>
              <code>/etc/svc/repository.db</code> is the main SMF service
              configuration database. It stores service definitions, properties
              and state. If it is corrupted, SMF may fail to start correctly and
              the system may boot with very limited services.
            </p>
            <p>
              In worst-case scenarios, you boot to single-user, move corrupted
              repo aside, and restore from backup:
            </p>

            <TerminalOutput
              title="Fixing a corrupted SMF repository (worst-case)"
              contextLabel="interview-smf"
              maxHeight="12rem"
              content={`cp /etc/svc/repository.db /etc/svc/repository.db.bad
cp /etc/svc/repository.db.bak /etc/svc/repository.db
reboot`}
            />
          </section>

          {/* SECTION 2: ZFS DEEP DIVE */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              ZFS Deep Dive – ARC, L2ARC, ZIL, Snapshots, Send/Receive
            </h2>

            <BulletCard
              heading="High-value ZFS concepts"
              points={[
                "ARC & L2ARC – read cache in RAM and SSD.",
                "ZIL & SLOG – synchronous write log and dedicated log device.",
                "Snapshots, clones, quotas, reservations.",
                "ZFS send/receive for backup and DR.",
                "Self-healing via checksums and redundancy.",
              ]}
            />

            <h3 className="mt-2 text-sm font-semibold text-slate-100">
              ARC, L2ARC, ZIL & SLOG
            </h3>
            <p>
              ZFS keeps frequently used data in RAM cache called{" "}
              <strong>ARC</strong> (Adaptive Replacement Cache). If you add an
              SSD as L2ARC, cold data can be cached there as a second-level
              cache. <strong>ZIL</strong> (ZFS Intent Log) stores synchronous
              writes. If you add a fast SSD as a separate log device (
              <strong>SLOG</strong>), synchronous write performance (databases,
              NFS) improves.
            </p>

            <TerminalOutput
              title="Adding a separate log device (SLOG)"
              contextLabel="interview-zfs"
              maxHeight="10rem"
              content={`# Example: add SLOG to pool for sync write performance
zpool add appPool log c2t1d0

# Check status
zpool status appPool`}
            />

            <p className="text-xs text-slate-400">
              Example story:{" "}
              <span className="text-slate-200">
                “Our Oracle DB on ZFS had high latency for synchronous writes.
                We added a dedicated SSD SLOG to the pool. After that, DB
                commit times improved significantly according to the DBA team.”
              </span>
            </p>

            <h3 className="mt-3 text-sm font-semibold text-slate-100">
              Snapshots, clones, quota vs reservation
            </h3>

            <TerminalOutput
              title="Snapshots / clones / quotas / reservations"
              contextLabel="interview-zfs"
              maxHeight="18rem"
              content={`# Take snapshot before patch
zfs snapshot appPool/appFS@pre_patch

# Rollback if patch fails
zfs rollback appPool/appFS@pre_patch

# Create clone for testing
zfs clone appPool/appFS@pre_patch appPool/appFS_clone

# Limit maximum usage for a dataset
zfs set quota=500G appPool/projects/proj1

# Guarantee minimum space
zfs set reservation=100G appPool/logs`}
            />

            <p>
              In interviews, explain quota/reservation with a scenario: logs
              get a reservation so they can’t be starved; users get quotas so
              they can’t fill up the entire pool.
            </p>

            <h3 className="mt-3 text-sm font-semibold text-slate-100">
              ZFS send/receive – backup and DR
            </h3>

            <TerminalOutput
              title="ZFS send/receive"
              contextLabel="interview-zfs"
              maxHeight="14rem"
              content={`# Full replication of snapshot to remote host
zfs send appPool/appFS@day1 | ssh dr-host zfs receive drPool/appFS

# Incremental replication between two snapshots
zfs send -i appPool/appFS@day1 appPool/appFS@day2 | \\
  ssh dr-host zfs receive drPool/appFS`}
            />

            <p className="text-xs text-slate-400">
              Interview story:{" "}
              <span className="text-slate-200">
                “We implemented nightly ZFS send/receive between DC and DR.
                During a DR drill, we imported the DR pool and started the app
                from replicated data with minimal RPO.”
              </span>
            </p>
          </section>

          {/* SECTION 3: ZONES & KERNEL ZONES */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Zones & Kernel Zones – Concepts and Practical Usage
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<FiLayers className="text-lg" />}
                title="Global zone"
                text="Zone ID 0, full control of hardware and other zones."
              />
              <FeatureCard
                icon={<FiBook className="text-lg" />}
                title="Non-global zones"
                text="Isolated environments sharing same kernel, great for app separation."
              />
              <FeatureCard
                icon={<FiCpu className="text-lg" />}
                title="Kernel zones"
                text="Zones with their own kernel and SRU level, like light VMs on Solaris."
              />
            </div>

            <h3 className="mt-2 text-sm font-semibold text-slate-100">
              Basic zone commands
            </h3>

            <TerminalOutput
              title="Zones overview"
              contextLabel="interview-zones"
              maxHeight="18rem"
              content={`# In global zone
zoneadm list -cv

# Inside zone
zonename

# View zone configuration
zonecfg -z appzone info

# Verify and fix configuration
zonecfg -z appzone verify

# Install and boot a zone
zoneadm -z appzone install
zoneadm -z appzone boot

# Clone a zone
zoneadm -z appzone-clone clone appzone`}
            />

            <h3 className="mt-3 text-sm font-semibold text-slate-100">
              Exclusive-IP vs Shared-IP zones
            </h3>
            <p>
              In <strong>shared-IP</strong>, the zone shares network stack with
              global zone and IPs are configured in global. In{" "}
              <strong>exclusive-IP</strong>, the zone gets its own IP stack and
              you configure networking inside zone (recommended in Solaris 11).
            </p>

            <p className="text-xs text-slate-400">
              Good interview line:{" "}
              <span className="text-slate-200">
                “In Solaris 11, I normally use exclusive-IP zones so each zone
                has its own IP stack and firewall, and I configure IP addresses
                inside the zone using <code>ipadm</code>.”
              </span>
            </p>
          </section>

          {/* SECTION 4: LDOMs / ORACLE VM FOR SPARC */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              LDOMs (Oracle VM for SPARC) – Domain Roles & Lifecycle
            </h2>

            <BulletCard
              heading="Key domain types to mention"
              points={[
                "Control Domain – runs ldmd, manages all domains.",
                "Primary Domain – first domain on system; usually control + service + I/O.",
                "Service Domain – provides virtual disk (vds) and virtual switch (vsw).",
                "I/O Domain (root) – owns physical PCIe root complexes/HBAs/NICs.",
                "Guest Domain – runs the application workload.",
              ]}
            />

            <h3 className="mt-2 text-sm font-semibold text-slate-100">
              Guest domain lifecycle (create → bind → install → boot)
            </h3>

            <TerminalOutput
              title="Creating a guest LDOM (ldg1)"
              contextLabel="interview-ldoms"
              maxHeight="22rem"
              content={`# Create domain
ldm add-domain ldg1

# Assign resources
ldm set-vcpu 4 ldg1
ldm set-memory 8G ldg1

# Create ZFS volume for root disk
zfs create -V 50G rpool/ldoms/ldg1-root

# Export volume via VDS and add vdisk
ldm add-vdsdev /dev/zvol/dsk/rpool/ldoms/ldg1-root ldg1-root@primary-vds0
ldm add-vdisk vdisk0 ldg1-root@primary-vds0 ldg1

# Network via vsw/vnet
ldm add-vsw net-dev=net0 primary-vsw0 primary
ldm add-vnet vnet0 primary-vsw0 ldg1

# Bind and start
ldm bind ldg1
ldm start ldg1

# Connect console and install Solaris inside
ldm console ldg1   # or: telnet localhost 5000`}
            />

            <h3 className="mt-3 text-sm font-semibold text-slate-100">
              Dynamic resource changes (vCPU / memory / vdisk)
            </h3>

            <TerminalOutput
              title="Dynamic resource operations in LDOMs"
              contextLabel="interview-ldoms"
              maxHeight="18rem"
              content={`# Increase vCPUs online
ldm set-vcpu 8 ldg1

# Increase memory (usually online)
ldm set-memory 16G ldg1

# Add extra data disk
zfs create -V 100G rpool/ldoms/ldg1-data
ldm add-vdsdev /dev/zvol/dsk/rpool/ldoms/ldg1-data ldg1-data@primary-vds0
ldm add-vdisk data1 ldg1-data@primary-vds0 ldg1`}
            />

            <h3 className="mt-3 text-sm font-semibold text-slate-100">
              SP configurations (spconfig) – DR point
            </h3>
            <p>
              Always mention <strong>SP config</strong> because it shows
              real-world DR knowledge. An SP configuration is a snapshot of the
              current LDOM layout stored on the service processor.
            </p>

            <TerminalOutput
              title="SP configuration commands"
              contextLabel="interview-ldoms"
              maxHeight="12rem"
              content={`# List SP configs
ldm list-spconfig

# Save current layout as 'prod-layout'
ldm add-spconfig prod-layout`}
            />

            <p className="text-xs text-slate-400">
              Interview line:{" "}
              <span className="text-slate-200">
                “After any major LDOM change, I always run{" "}
                <code>ldm add-spconfig</code> to save a named SP config. If the
                primary OS is reinstalled, I can recover the LDOM layout from
                SP.”
              </span>
            </p>
          </section>

          {/* SECTION 5: NETWORKING */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Networking – ipadm, dladm, IPMP
            </h2>

            <BulletCard
              heading="Key Solaris 11 networking points"
              points={[
                "ipadm – manages IP configuration (persistent).",
                "dladm – manages data links, VLANs, aggregations.",
                "IPMP – provides IP-level failover between NICs.",
              ]}
            />

            <TerminalOutput
              title="Configuring IP and IPMP (basic example)"
              contextLabel="interview-net"
              maxHeight="20rem"
              content={`# Configure static IP on net0
ipadm create-ip net0
ipadm create-addr -T static -a 10.1.1.10/24 net0

# View links and addresses
dladm show-phys
dladm show-link
ipadm show-addr

# Configure simple IPMP group ipmp0 on net0 + net1
ipadm create-ipmp ipmp0
ipadm add-ipmp -i net0 -i net1 ipmp0
ipadm create-addr -T static -a 10.1.1.20/24 ipmp0

# Monitor IPMP
ipmpstat -g
ipmpstat -i`}
            />
          </section>

          {/* SECTION 6: PATCHING / IPS / BEADR */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Patching & IPS – Solaris 10 vs Solaris 11
            </h2>

            <BulletCard
              heading="When they ask about patching"
              points={[
                "Solaris 10 used patchadd/patchrm and patch clusters.",
                "Solaris 11 uses IPS (pkg) and SRU repositories.",
                "Boot environments (BEs) allow safe rollback after patching.",
              ]}
            />

            <TerminalOutput
              title="Basic Solaris 11 patching flow"
              contextLabel="interview-patch"
              maxHeight="20rem"
              content={`# Check publishers and repo
pkg publisher

# Set local repository
pkg set-publisher -G "*" -g file:///opt/localrepo solaris

# Dry-run update
pkg update -nv

# Actual update with license accept
pkg update --accept

# Manage boot environments
beadm list
beadm create prepatch
# After update, a new BE is usually created by pkg automatically.
# Activate and reboot if needed
beadm activate solaris-11-4-76    # example name
init 6`}
            />

            <p className="text-xs text-slate-400">
              Interview hint:{" "}
              <span className="text-slate-200">
                Always mention that you do <code>pkg update -nv</code> first
                (dry-run), check disk space and read release notes. It shows
                maturity.
              </span>
            </p>
          </section>

          {/* SECTION 7: TROUBLESHOOTING SCENARIOS */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[#ff5b5b]">
              Real Troubleshooting Scenarios (L2/L3 Style)
            </h2>

            <BulletCard
              heading="Scenarios you should be ready to explain"
              points={[
                "Server not booting – use OBP 'boot -L' to choose previous BE.",
                "Zone stuck in 'incomplete' state and how you fixed it.",
                "Kernel zone failing to boot due to insufficient memory.",
                "ZFS pool degraded – identifying and replacing bad disk.",
                "SMF service in maintenance and recovering it.",
                "High CPU or memory usage – prstat, pstack, vmstat, iostat.",
                "Network outage – dladm/ipadm/IPMP troubleshooting.",
              ]}
            />

            <TerminalOutput
              title="Example: cleaning an incomplete zone"
              contextLabel="interview-troubleshoot"
              maxHeight="16rem"
              content={`zoneadm list -cv

# If appzone is incomplete or broken:
zoneadm -z appzone uninstall -F
zonecfg -z appzone delete -F

# Then recreate from proper zonecfg file / template`}
            />

            <TerminalOutput
              title="Example: ZFS pool degraded & scrub"
              contextLabel="interview-troubleshoot"
              maxHeight="14rem"
              content={`zpool status
zpool status -xv    # show errors verbosely

# Start scrub
zpool scrub rpool

# After replacement:
zpool replace rpool c3t0d0 c3t1d0`}
            />
          </section>

          {/* SECTION 8: HR / BEHAVIOURAL & CHECKLIST */}
          <section className="space-y-4 rounded-2xl border border-[#ff5b5b]/60 bg-[#ff5b5b]/10 p-4 shadow-lg shadow-[#ff5b5b]/40">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-red-200">
              <FiCloudLightning className="text-base" />
              HR & Behavioural Questions + Final Checklist
            </h2>

            <BulletCard
              heading="Common HR questions for Solaris roles"
              points={[
                "Tell me about a critical production issue you handled on Solaris.",
                "What is the hardest technical problem you solved on Solaris/LDOMs?",
                "How do you keep your Solaris skills updated?",
                "Have you worked with change management and CAB processes?",
              ]}
            />

            <BulletCard
              heading="What NOT to say"
              points={[
                "Don't say: 'I only know commands, not troubleshooting'.",
                "Don't say: 'I have never worked on production, only lab' (better: mention lab + mock production).",
                "Don't say: 'I don't know Solaris 11 at all' — instead say you are familiar and improving.",
              ]}
            />

            <div className="mt-3 flex items-start gap-2">
              <FiSearch className="mt-0.5 text-sm text-red-200" />
              <div>
                <h3 className="text-xs font-semibold text-red-100">
                  Last-minute revision checklist
                </h3>
                <ul className="mt-1 list-disc pl-5 text-[13px] text-red-50 space-y-1">
                  <li>ZFS: list, snapshot, clone, send/receive, quota/reservation.</li>
                  <li>Zones: create, clone, migrate, troubleshoot incomplete zone.</li>
                  <li>Kernel zones: create, boot, memory/CPU caps.</li>
                  <li>LDOMs: domain roles, create guest, dynamic resources, SP config.</li>
                  <li>SMF: svcs -xv, milestones, repository.db basics.</li>
                  <li>Networking: ipadm, dladm, IPMP commands.</li>
                  <li>Patching: pkg, publishers, BE with beadm.</li>
                  <li>Performance: prstat, vmstat, iostat, mpstat, pstack.</li>
                </ul>
              </div>
            </div>
          </section>
        </motion.div>
      </SolarisLayout>
    </>
  );
}
