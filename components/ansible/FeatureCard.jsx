import React from "react";
import { motion } from "framer-motion";

export default function FeatureCard({ icon, title, text }) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/90 p-4 shadow-md shadow-slate-950/80"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-gradient-to-br from-[#ff5b5b]/40 via-sky-500/40 to-transparent opacity-40 blur-2xl transition group-hover:opacity-70" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 ring-1 ring-slate-700">
          {icon}
        </div>
        <h3 className="text-[13px] font-semibold text-slate-50">{title}</h3>
      </div>
      <p className="relative mt-2 text-[12px] text-slate-300">{text}</p>
    </motion.article>
  );
}
