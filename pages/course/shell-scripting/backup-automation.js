import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiArchive, FiFolder } from "react-icons/fi";
import ShellLayout from "../../../components/shell/ShellLayout";
import TerminalOutput from "../../../components/TerminalOutput";

export default function BackupAutomation() {
  return (
    <ShellLayout activeSlug="backup-automation">
      <Head>
        <title>Backup Automation Script | Shell Scripting</title>
      </Head>

      <h1 className="text-2xl font-semibold bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">Backup Automation Script</h1>

      <p className="mt-2 dark:text-slate-300">
        This script creates compressed backups with timestamps.
      </p>

      <TerminalOutput
        title="Backup Script"
        content={`#!/bin/bash

SOURCE="/home/user/data"
DEST="/backup"
DATE=$(date +%F)

mkdir -p $DEST
tar -czf $DEST/backup_$DATE.tar.gz $SOURCE

echo "Backup completed successfully"`}
      />

      <p className="mt-4 dark:text-slate-300">
        This script can be scheduled using cron for automated backups.
      </p>
    </ShellLayout>
  );
}
