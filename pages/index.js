import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Hero_1 from "../components/Hero_1";
import Courses from "../components/Courses";
import BlogPreview from "../components/BlogPreview";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>InfoUnix – Linux, Solaris & DevOps Tutorials</title>
        <meta
          name="description"
          content="infounix.com – Practical Linux, Solaris, shell scripting and DevOps tutorials from a real Unix admin."
        />
      </Head>

      <div className="min-h-screen bg-red-50 text-slate-50 antialiased dark:bg-slate-950 dark:text-white">
        <Navbar />
        <Hero />
        <Hero_1/>
        <Courses />
        <BlogPreview />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}
