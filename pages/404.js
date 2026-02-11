"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  const router = useRouter();

  return (
    <>
    <Navbar/>

    <div
      className="relative min-h-screen overflow-hidden
      bg-[#9fa5b4] dark:bg-[#050505]
      transition-colors duration-300"
    >

      {/* ===== LIGHT MODE GRID ===== */}
      <div className="absolute inset-0 opacity-30 dark:opacity-0
        bg-[linear-gradient(#6366f11a_1px,transparent_1px),
        linear-gradient(90deg,#6366f11a_1px,transparent_1px)]
        bg-[size:60px_60px]"
      />

      {/* ===== GRADIENT ORBS (VISIBLE BOTH MODES) ===== */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px]
        bg-purple-400/30 dark:bg-purple-700/20
        rounded-full blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px]
        bg-blue-400/30 dark:bg-blue-700/20
        rounded-full blur-[120px]"
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />

      {/* ===== PLANET ===== */}
      <motion.div
        className="absolute top-[15%] left-[10%]
        w-28 h-28 md:w-40 md:h-40
        bg-gradient-to-br from-orange-300 to-pink-500
        dark:from-purple-600 dark:to-pink-700
        rounded-full shadow-2xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* ===== MOON ===== */}
      <motion.div
        className="absolute top-[35%] right-[15%]
        w-12 h-12 md:w-16 md:h-16
        bg-gray-300 dark:bg-gray-400
        rounded-full shadow-lg"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      {/* ===== FLOATING ASTRONAUT ===== */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/2026/2026502.png"
        className="absolute w-24 md:w-36"
        style={{ bottom: "15%", left: "12%" }}
        animate={{
          y: [0, -25, 0],
          rotate: [0, 6, -6, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* ===== STARS (VISIBLE IN BOTH THEMES) ===== */}
      <div className="absolute inset-0">
        {[...Array(45)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full
              bg-gray-600 dark:bg-white"
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 min-h-screen
        flex flex-col items-center justify-center px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[120px] md:text-[170px] font-black
          bg-gradient-to-r from-purple-600 to-blue-600
          text-transparent bg-clip-text"
        >
          404
        </motion.h1>

        <motion.h2
          className="text-2xl md:text-3xl font-semibold
          text-gray-800 dark:text-gray-200"
        >
          Lost Between the Planets 🌍
        </motion.h2>

        <p className="bg-gradient-to-r from-purple-600 to-blue-600
          text-transparent bg-clip-text
          mt-2 text-center max-w-md font-semibold"
        >
          This page is orbiting somewhere unknown.
          Let’s bring you back safely.
        </p>

        {/* ===== BUTTONS ===== */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">

          <Link
            href="/"
            className="
            px-8 py-3 rounded-xl font-medium
            bg-gradient-to-r from-purple-600 to-blue-600
            hover:from-purple-500 hover:to-blue-500
            text-white transition-all duration-300
            shadow-lg hover:shadow-purple-500/30
            "
          >
            Return Home
          </Link>

          <button
            onClick={() => router.back()}
            className="
            px-8 py-3 rounded-xl font-medium
            bg-white/70 dark:bg-white/10
            hover:bg-white dark:hover:bg-white/20
            text-gray-800 dark:text-white
            border border-gray-200 dark:border-white/10
            backdrop-blur-md
            transition-all duration-300
            "
          >
            Go Back
          </button>

        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
