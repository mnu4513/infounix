import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";
import ShellLayout from "../../../components/shell/ShellLayout";
import BulletCard from "../../../components/solaris/BulletCard";

export default function BestPractices() {
  return (
    <ShellLayout activeSlug="best-practices">
      <Head>
        <title>Shell Scripting Best Practices | InfoUnix</title>
      </Head>

      <h1 className="text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
        Shell Scripting Best Practices & Interview Tips
      </h1>

      <BulletCard
        heading="Best Practices"
        points={[
          "Always use #!/bin/bash at top",
          "Use set -euo pipefail for safety",
          "Quote variables to prevent word splitting",
          "Use functions for reuse",
          "Add comments for clarity",
        ]}
      />

      <BulletCard
        heading="Interview Tips"
        points={[
          "Explain difference between $@ and $*",
          "Explain exit status and signals",
          "Write a backup or monitoring script live",
          "Explain crontab scheduling",
          "Understand debugging with set -x",
        ]}
      />
    </ShellLayout>
  );
}
