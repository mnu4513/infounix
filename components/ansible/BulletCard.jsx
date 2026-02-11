import React from "react";
import { motion } from "framer-motion";

export default function BulletCard({ heading, points }) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-slate-800 bg-slate-950/80 p-3 text-[12px] text-slate-200 shadow-sm shadow-slate-950/80"
    >
      <h3 className="text-[13px] font-semibold text-slate-50">{heading}</h3>
      <ul className="mt-1 list-disc space-y-1 pl-4">
        {points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </motion.article>
  );
}
