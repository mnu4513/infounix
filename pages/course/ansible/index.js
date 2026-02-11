// pages/course/ansible/index.js

import React from "react";
import Head from "next/head";
import AnsibleLayout from "../../../components/ansible/AnsibleLayout";

export default function AnsibleOverviewPage() {
  return (
    <>
      <Head>
        <title>Ansible Automation Course | InfoUnix</title>
        <meta
          name="description"
          content="Learn Ansible automation from scratch with real-world DevOps examples, playbooks, roles, inventory and projects."
        />
      </Head>

      <AnsibleLayout>
        <header className="mb-6">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent md:text-3xl">
            Ansible Automation Course
          </h1>
          <p className="mt-1 text-sm dark:text-slate-300">
            (Complete Ansible Course for Beginners to Advanced)
          </p>
          <hr className="mt-3 border-slate-800" />
        </header>

        <div className="space-y-6 text-sm leading-relaxed dark:text-slate-200">
          
          <section>
            <p>
              This course will teach you Ansible automation from zero level to
              real production level. You will learn how to manage Linux servers,
              deploy applications and automate daily administration tasks using
              Ansible.
            </p>

            <p className="mt-3">
              The course is completely practical with live demos, real playbooks,
              roles, inventory management and DevOps style projects used in IT
              companies.
            </p>
          </section>

          <hr className="border-slate-800" />

          <section>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Prerequisites
            </h2>

            <p className="mt-2">
              To get the most out of this course, you should have:
            </p>

            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Basic knowledge of Linux commands and terminal.</li>
              <li>Understanding of SSH and server login.</li>
              <li>Interest in DevOps and automation.</li>
            </ul>
          </section>

          <hr className="border-slate-800" />

          <section>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Who Should Enroll?
            </h2>

            <p className="mt-2">This course is ideal for:</p>

            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Linux administrators who want to move into DevOps.</li>
              <li>Freshers preparing for DevOps and cloud jobs.</li>
              <li>System engineers who want to automate daily tasks.</li>
              <li>Anyone interested in Infrastructure as Code.</li>
            </ul>
          </section>

          <hr className="border-slate-800" />

          <section>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Course Format
            </h2>

            <p className="mt-2">This course includes:</p>

            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Concept explanations in simple language.</li>
              <li>Live Ansible lab setup and hands-on demos.</li>
              <li>Real playbooks, roles and project implementation.</li>
              <li>Interview questions and job oriented scenarios.</li>
            </ul>
          </section>

        </div>
      </AnsibleLayout>
    </>
  );
}
