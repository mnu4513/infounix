import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const Courses = () => {
  return (
    <section
      id="courses"
      className="bg-slate-200 dark:bg-slate-950 py-14 text-gray-800 dark:text-red-100"
    >
      
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="bg-gradient-to-r font-bold from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Video Courses & Series
            </h2>
            <p className="text-xs font-serif sm:text-sm">
              Structured playlists to take you from basics to confident admin.
            </p>

            
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <CourseCard
            level="Beginner → Intermediate"
            title="Shell Scripting for Real SysAdmins"
            description="Learn to write scripts for backups, monitoring, health checks, log rotation and automation of day-to-day tasks."
            tags={["Bash", "Cron", "File handling", "Functions"]}
          />
          <CourseCard
            level="Admin Focus"
            title="Linux & Solaris Admin Essentials"
            description="Understand services (systemd/SMF), processes, user management, networking and troubleshooting with real lab setups."
            tags={["systemd / SMF", "Processes", "User mgmt", "Networking"]}
          />
        </div>
      </div>
    </section>
  );
};

const CourseCard = ({ level, title, description, tags }) => (
  <motion.article
    whileHover={{ y: -6, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className="group rounded-3xl border border-slate-800 dark:bg-slate-950/90 p-5 shadow-xl shadow-slate-950/80 backdrop-blur"
  >
    <p className="text-[11px] text-sky-600">{level}</p>
    <h3 className="bg-gradient-to-r font-bold from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">{title}</h3>
    <p className="mt-2 text-[11px] dark:text-slate-300">{description}</p>
    <div className="mt-3 flex flex-wrap gap-2">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full bg-slate-900/80 px-2 py-1 text-[10px] text-slate-200 ring-1 ring-slate-700/80"
        >
          {t}
        </span>
      ))}
    </div>
    <button className="mt-4 inline-flex items-center gap-1 text-[11px] text-sky-300 group-hover:text-sky-200">
      View playlist
      <FiArrowRight className="text-xs" />
    </button>
  </motion.article>
);

export default Courses;
