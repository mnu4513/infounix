import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const BlogPreview = () => {
  // Later you can map real posts from an API / filesystem
  const posts = [
    {
      tag: "Linux",
      title: "Understanding systemctl & service management deeply",
      time: "8 min read",
    },
    {
      tag: "Solaris",
      title: "Working with zones, LDOMs & SMF services",
      time: "10 min read",
    },
    {
      tag: "Shell Scripting",
      title: "Building a reusable backup.sh script for configs",
      time: "7 min read",
    },
  ];

  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-slate-200 text-gray-600 dark:text-red-100 pb-16 pt-10 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg bg-gradient-to-r font-bold from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Latest from the blog
            </h2>
            <p className="text-xs text-slate-400 sm:text-sm">
              Deep dives, troubleshooting notes and step-by-step guides.
            </p>
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs text-sky-300 hover:text-sky-200"
          >
            Browse all articles
            <FiArrowRight />
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <motion.article
              key={post.title}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-950/80 p-4 shadow-lg shadow-slate-950/80 backdrop-blur"
            >
              <div>
                <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2 py-1 text-[10px] text-sky-300 ring-1 ring-sky-500/40">
                  {post.tag}
                </span>
                <h3 className="mt-2 text-sm font-semibold text-slate-50 group-hover:text-sky-200">
                  {post.title}
                </h3>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>{post.time}</span>
                <span className="inline-flex items-center gap-1 text-sky-300 group-hover:text-sky-200">
                  Read
                  <FiArrowRight className="text-xs" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
