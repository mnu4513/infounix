import React from "react";
import Head from "next/head";
import SolarisLayout from "../../../components/solaris/SolarisLayout";
import { solarisLessons } from "../../../components/solaris/solarisLessons";
import { motion } from "framer-motion";
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  },
});

export default function SolarisOverviewPage() {

    const lesson =
      solarisLessons.find((l) => l.slug === "installation-and-setup") || {};
  return (
    <>
      <Head>
        <title>Solaris System Administration Course in | InfoUnix</title>
        <meta
          name="description"
          content="Learn essential skills and techniques for efficiently managing Solaris 11 systems with this Solaris System Administration Course in Hindi."
        />
      </Head>

      <SolarisLayout>
        <header className="mb-6">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            Solaris System Administration Course
          </h1>
          <p className="mt-1 text-sm text-slate-950 dark:text-slate-300">
            (Solaris Administration Course for Beginners)
          </p>
          <hr className="mt-3 border-slate-800" />
        </header>

        <div className="space-y-6 text-sm leading-relaxed text-slate-950 dark:text-slate-200">
          <section>
            <p>
              Learn essential skills and techniques for efficiently managing
              Solaris 11 systems with this comprehensive System Administration
              course.
            </p>
            <p className="mt-3">
              Whether you&apos;re a beginner or an experienced professional,
              this course will equip you with the knowledge and hands-on
              experience needed to effectively administer Solaris environments.
            </p>
          </section>


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

          <section>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent ">
              Prerequisites
            </h2>
            <p className="mt-2">
              To get the most out of this course, you should have:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Basic knowledge of Unix/Linux operating systems.</li>
              <li>
                Familiarity with command-line interfaces and system
                administration concepts.
              </li>
            </ul>
          </section>

          <hr className="border-slate-800" />

          <section>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent ">
              Who Should Enroll?
            </h2>
            <p className="mt-2">This course is ideal for:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Students interested in Unix/Linux system administration careers.
              </li>
              <li>System administrators managing Solaris 11 environments.</li>
              <li>
                IT professionals looking to enhance their Solaris system
                administration skills.
              </li>
            </ul>
          </section>

          <hr className="border-slate-800" />

          <section>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent ">
              Course Format
            </h2>
            <p className="mt-2">This course includes:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                Concept explanations in simple Hindi with real-world examples.
              </li>
              <li>
                Live terminal demos from actual Solaris environments.
              </li>
              <li>
                Step-by-step labs covering services, ZFS, networking and
                troubleshooting.
              </li>
            </ul>
          </section>
        </div>
      </SolarisLayout>
    </>
  );
}
