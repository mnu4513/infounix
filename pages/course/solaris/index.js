import React from "react";
import Head from "next/head";
import SolarisLayout from "../../../components/solaris/SolarisLayout";

export default function SolarisOverviewPage() {
  return (
    <>
      <Head>
        <title>Solaris System Administration Course in Hindi | InfoUnix</title>
        <meta
          name="description"
          content="Learn essential skills and techniques for efficiently managing Solaris 11 systems with this Solaris System Administration Course in Hindi."
        />
      </Head>

      <SolarisLayout>
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-[#ff5b5b] md:text-3xl">
            Solaris System Administration Course in Hindi
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            (Solaris Administration Course for Beginners)
          </p>
          <hr className="mt-3 border-slate-800" />
        </header>

        <div className="space-y-6 text-sm leading-relaxed text-slate-200">
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

          <hr className="border-slate-800" />

          <section>
            <h2 className="text-lg font-semibold text-[#ff5b5b]">
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
            <h2 className="text-lg font-semibold text-[#ff5b5b]">
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
            <h2 className="text-lg font-semibold text-[#ff5b5b]">
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
