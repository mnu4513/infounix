import React, { useState, useEffect } from "react";
import Head from "next/head";
import examData from "../../data/exam/OracleDatabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ExamPage() {
  const [showAlert, setShowAlert] = useState(true);

  // AUTO DISMISS AFTER 7 SECONDS
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-slate-200 dark:bg-slate-800">
    <Navbar/>
      <Head>
        <title>Oracle Solaris 11 1Z0-811 Exam Dumps | InfoUnix</title>

        <meta
          name="description"
          content="Oracle Solaris 11 1Z0-811 practice exam dumps with questions and answers for learning purpose only. Not affiliated with Oracle."
        />

        <meta
          name="keywords"
          content="1Z0-811, Solaris exam dumps, Oracle Solaris 11 exam, Solaris certification questions, 1Z0-811 practice test"
        />
      </Head>

      <div className="max-w-4xl mx-auto p-4 text-sm">

        {/* ===== ALERT BOX ===== */}

       {showAlert && (
  <div
    className="
      mb-4 p-4 rounded border border-yellow-400 
      bg-yellow-50 dark:bg-slate-900 dark:border-yellow-600
      transition-all duration-700 ease-in-out
      animate-[fadeIn_0.5s]
      relative
    "
  >
    <button
      onClick={() => setShowAlert(false)}
      className="absolute right-2 top-1 text-xl"
    >
      ✕
    </button>

    <h2 className="font-semibold text-yellow-700 dark:text-yellow-400">
      ⚠ Disclaimer Notice
    </h2>

    <p className="mt-1 text-slate-700 dark:text-slate-300">
      We do NOT claim that these questions or answers are 100% correct.
      This content is shared only for learning and practice purpose.
      InfoUnix is NOT affiliated with Oracle and does NOT guarantee
      that you will clear the 1Z0-811 exam using this material.
    </p>

    <p className="text-xs mt-2 text-slate-500">
      This message will disappear automatically...
    </p>
  </div>
)}


        {/* ===== HEADING ===== */}

        <h1
          className="text-2xl font-semibold mb-4 
          bg-gradient-to-r from-sky-400 via-fuchsia-400 to-emerald-400 
          bg-clip-text text-transparent"
        >
          Oracle Solaris 11 1Z0-811 Exam Dumps
        </h1>

        <p className="text-slate-700 dark:text-slate-300 mb-4">
          Practice questions for Oracle Solaris 11 certification preparation.
          Use these for concept understanding and self assessment only.
        </p>

        {/* ===== QUESTIONS ===== */}

        <div className="space-y-6">
          {examData.map((q) => (
            <QuestionCard key={q.id} data={q} />
          ))}
        </div>
      </div>
       <Footer/>
    </div>
  );
}

// ============ QUESTION CARD (SAME AS BEFORE) ============

function QuestionCard({ data }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="border border-slate-300 dark:border-slate-700 rounded-lg p-4 
      bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all"
    >
      <div className="space-y-2">
        <strong className="text-sky-600 dark:text-sky-400">
          Q{data.id}.
        </strong>

        {data.question.map((item, i) => (
          <ContentRenderer key={i} item={item} />
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {data.options.map((opt, i) => (
          <div
            key={i}
            className="border border-slate-200 dark:border-slate-700 p-2 rounded 
            bg-slate-50 dark:bg-slate-800 hover:scale-[1.01] transition-all"
          >
            <ContentRenderer item={opt} />
          </div>
        ))}
      </div>

      <button
        onClick={() => setShow(!show)}
        className="mt-3 px-4 py-1.5 rounded text-white 
        bg-gradient-to-r from-sky-500 to-emerald-500"
      >
        {show ? "Hide Answer" : "Show Answer"}
      </button>

      {show && (
        <div className="mt-3 border border-emerald-400 p-3 rounded">
          <strong className="text-emerald-500">Correct Answer:</strong>

          <div className="mt-2 space-y-2">
            {data.answer.map((ans, i) => (
              <ContentRenderer key={i} item={ans} />
            ))}
          </div>
        </div>
      )}
     
    </div>
  );
}

// ============ RENDER TEXT / COMMAND ============
function ContentRenderer({ item }) {

  if (item.type === "command") {
    return (
      <div className="w-full">
        <pre
          className="
            bg-black text-green-400 
            p-2 rounded text-xs

            overflow-x-auto      // <-- HORIZONTAL SCROLL
            overflow-y-hidden

            whitespace-pre       // formatting same rakhega
            max-w-full
          "
        >
          <code>{item.value}</code>
        </pre>
      </div>
    );
  }

  return (
    <p className="text-slate-800 dark:text-slate-200">
      {item.value}
    </p>
  );
}
