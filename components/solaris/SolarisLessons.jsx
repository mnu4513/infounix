// components/solaris/solarisLessons.js

export const solarisLessons = [
  {
    id: "overview",
    slug: null, // special: main page /course/solaris
    title: "Course Overview",
    short: "Solaris System Administration Course in Hindi",
    videoUrl: "",
  },
  {
    id: "introduction-to-solaris",
    slug: "introduction-to-solaris",
    title: "Introduction to Solaris",
    short: "Overview of Solaris OS and use-cases.",
    videoUrl: "",
  },
  {
    id: "installation-and-setup",
    slug: "installation-and-setup",
    title: "Installation and Setup",
    short: "Installing Solaris 11 and initial configuration.",
    videoUrl: "",
  },
  {
    id: "basic-commands",
    slug: "basic-commands",
    title: "Basic Commands",
    short: "Everyday terminal commands for admins.",
    videoUrl: "",
  },
  {
    id: "user-management",
    slug: "user-management",
    title: "User Management",
    short: "Users, passwords and profiles.",
    videoUrl: "",
  },
  {
    id: "group-management",
    slug: "group-management",
    title: "Group Management",
    short: "Managing local groups and access.",
    videoUrl: "",
  },
  {
    id: "files-and-directories",
    slug: "files-and-directories",
    title: "Files and Directories",
    short: "Navigation and file operations.",
    videoUrl: "",
  },
  {
    id: "vi-editor",
    slug: "vi-editor",
    title: "VI Editor",
    short: "Editing files efficiently using vi.",
    videoUrl: "",
  },
  {
    id: "ssh",
    slug: "ssh",
    title: "SSH",
    short: "Remote access and key-based login.",
    videoUrl: "",
  },
  {
    id: "super-user",
    slug: "super-user",
    title: "Super User",
    short: "Root, sudo and privilege concepts.",
    videoUrl: "",
  },
  {
    id: "process-management",
    slug: "process-management",
    title: "Process Management",
    short: "ps, prstat and handling processes.",
    videoUrl: "",
  },
  {
    id: "service-management",
    slug: "service-management",
    title: "Service Management",
    short: "SMF services, svcs and svcadm.",
    videoUrl: "",
  },
  {
    id: "system-monitoring",
    slug: "system-monitoring",
    title: "System Monitoring",
    short: "CPU, memory, disk and tools.",
    videoUrl: "",
  },
  {
    id: "archive",
    slug: "archive",
    title: "Archive",
    short: "Creating and restoring archives.",
    videoUrl: "",
  },
  {
    id: "link",
    slug: "link",
    title: "Link",
    short: "Soft and hard links in Solaris.",
    videoUrl: "",
  },
  {
    id: "network-configuration",
    slug: "network-configuration",
    title: "Network Configuration",
    short: "IP, routes, net services.",
    videoUrl: "",
  },
  {
  id: "storage-basics",
  slug: "storage-basics",
  title: "Storage Basics in Solaris",
  short:
    "Understand disks, slices, device naming, VTOC/EFI labels, and using format before creating zpools.",
  videoUrl: "",
},
{
  id: "zpool",
  slug: "zpool",
  title: "ZPOOL – Pool Management in Solaris",
  short:
    "Learn how to create, manage, monitor and repair ZFS storage pools. Covers vdevs, mirrors, import/export, scrub and more.",
  videoUrl: "",
},
{
  id: "zfs",
  slug: "zfs",
  title: "ZFS Filesystem & Dataset Management",
  short:
    "Create, destroy, tune and manage ZFS datasets, mountpoints, properties, quotas and snapshots in Solaris.",
  videoUrl: "",
},
  {
    id: "zfs-quota-reservation",
    slug: "zfs-quota-reservation",
    title: "ZFS Quota & Reservation",
    short: "Space control in ZFS.",
    videoUrl: "",
  },
  {
    id: "zfs-snapshot",
    slug: "zfs-snapshot",
    title: "ZFS Snapshot",
    short: "Snapshots and rollbacks.",
    videoUrl: "",
  },
  {
    id: "swap",
    slug: "swap",
    title: "Swap",
    short: "Swap configuration and monitoring.",
    videoUrl: "",
  },
  {
    id: "nfs",
    slug: "nfs",
    title: "NFS",
    short: "Network File System basics.",
    videoUrl: "",
  },
  {
    id: "patch-management",
    slug: "patch-management",
    title: "Patch Management",
    short: "Updating and patching Solaris.",
    videoUrl: "",
  },{
  id: "patch-rollback-troubleshooting",
  slug: "patch-rollback-troubleshooting",
  title: "Patch Rollback & Troubleshooting in Solaris 11",
  short:
    "Handle patch failures, non-booting systems, and application issues using boot environments, OBP boot menu, and practical rollback strategies.",
  videoUrl: ""
},
  {
    id: "pre-post-check",
    slug: "pre-post-check",
    title: "Pre Post Check",
    short: "pre & post check on reboot.",
    videoUrl: "",
  },
  {
    id: "ldom",
    slug: "ldom",
    title: "LDOM",
    short: "Logical domains in Solaris.",
    videoUrl: "",
  },
    {
    id: "zones",
    slug: "zones",
    title: "Zones",
    short: "Zones in Solaris.",
    videoUrl: "",
  },{
  id: "kernel-zones-migration-clone",
  slug: "kernel-zones-migration-clone",
  title: "Kernel Zones – Clone, Detach/Attach & Migration",
  short:
    "Learn how to safely clone kernel zones, move them between hosts using detach/attach, and understand the basics of kernel zone migration.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},
{
  id: "zones-troubleshooting",
  slug: "zones-troubleshooting",
  title: "Zones Troubleshooting in Solaris",
  short:
    "Troubleshoot common issues with Solaris zones and kernel zones: install failures, boot problems, zlogin issues, resource errors and SMF problems.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},{
  id: "ldoms-overview",
  slug: "ldoms-overview",
  title: "Oracle VM for SPARC (LDOMs) – Concepts & Architecture",
  short:
    "Understand LDOMs, Oracle VM for SPARC, SPARC hypervisor, and key roles: control, service, I/O and guest domains.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},
{
  id: "ldoms-primary-setup",
  slug: "ldoms-primary-setup",
  title: "LDOMs – Install LDoms Manager & Configure Primary Domain",
  short:
    "Install LDoms Manager packages and configure the primary/control domain with real command outputs.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},
{
  id: "ldoms-guest-creation",
  slug: "ldoms-guest-creation",
  title: "LDOMs – Creating Guest Domains",
  short:
    "Create a guest LDOM with CPU, memory, vnets and virtual disks, including install and first boot.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},
{
  id: "ldoms-io-domain",
  slug: "ldoms-io-domain",
  title: "LDOMs – Configuring I/O & Service Domains",
  short:
    "Configure I/O domains and service domains providing virtual disks and networks to guest domains.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},
{
  id: "ldoms-dynamic-resources",
  slug: "ldoms-dynamic-resources",
  title: "LDOMs – Dynamic Resource Management",
  short:
    "Add and remove CPUs, memory and I/O dynamically for running domains using ldm add/set operations.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},
{
  id: "ldoms-live-migration",
  slug: "ldoms-live-migration",
  title: "LDOMs – Live Migration of Guest Domains",
  short:
    "Migrate a guest LDOM from one physical SPARC server to another with minimal downtime.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},
{
  id: "ldoms-iso-sharing",
  slug: "ldoms-iso-sharing",
  title: "LDOMs – Sharing ISO Images to Multiple Guests",
  short:
    "Serve a single ISO image read-only to multiple guest domains via virtual disk service.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},
{
  id: "ldoms-backup-restore",
  slug: "ldoms-backup-restore",
  title: "LDOMs – Backup & Restore of Domain Configurations",
  short:
    "Backup and restore LDOM configurations and guest disks using ldm list-bindings and ZFS.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},
{
  id: "ldoms-cleanup",
  slug: "ldoms-cleanup",
  title: "LDOMs – Removing Domains & Virtual Services",
  short:
    "Cleanly remove guest domains and associated virtual disk/network services.",
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID"
},
  {
    id: "cronjob",
    slug: "cronjob",
    title: "Cronjob",
    short: "Job scheduling using crontab.",
    videoUrl: "",
  },
  {
    id: "run-level",
    slug: "run-level",
    title: "Run Level",
    short: "Run level in Solaris.",
    videoUrl: "",
  },
  {
    id: "boot-phase",
    slug: "boot-phase",
    title: "Boot Phase",
    short: "Boot phase in Solaris.",
    videoUrl: "",
  },
  {
    id: "ilom-sanpshot",
    slug: "ilom-sanpshot",
    title: "ILOM Snapshot",
    short: "ILDOM snapshot through UI",
    videoUrl: "",
  },
  {
    id: "explorer",
    slug: "explorer",
    title: "Explorer",
    short: "Collecting explorer logs.",
    videoUrl: "",
  },
  {
    id: "interview-prep",
    slug: "interview-prep",
    title: "Interview Preparation",
    short: "Solaris interview preparation.",
    videoUrl: "",
  },
];
