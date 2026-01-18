import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { FiActivity } from "react-icons/fi";
import ShellLayout from "../../../components/shell/ShellLayout";
import TerminalOutput from "../../../components/TerminalOutput";

export default function MonitoringScript() {
  return (
    <ShellLayout activeSlug="monitoring">
      <Head>
        <title>System Monitoring Script | Shell Scripting</title>
      </Head>

      <h1 className="text-2xl font-semibold text-[#22c55e]">
        Simple System Monitoring Script
      </h1>

      <TerminalOutput
        title="Monitoring Script"
        content={`#!/bin/bash

CPU=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}')
MEM=$(free -m | awk 'NR==2{print $3}')
DISK=$(df -h / | awk 'NR==2 {print $5}')

echo "CPU Usage: $CPU%"
echo "Memory Used: $MEM MB"
echo "Disk Usage: $DISK"`} />

      <p className="mt-4 text-slate-300">
        This script helps monitor system health in real-time.
      </p>
    </ShellLayout>
  );
}
