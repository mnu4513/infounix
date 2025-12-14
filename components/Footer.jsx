import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-4 text-[11px] text-slate-500">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 md:flex-row md:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} InfoUnix. Built by a Unix admin.</p>
        <div className="flex gap-4">
          <a href="/" className="hover:text-sky-300">
            Privacy
          </a>
          <a href="/" className="hover:text-sky-300">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
