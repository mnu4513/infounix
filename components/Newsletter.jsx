import React from "react";

const Newsletter = () => {
  const handleSubmit = (e) => e.preventDefault();

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-slate-200 text-gray-600 dark:text-red-100 pb-16 pt-10 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-sky-500/40 bg-gradient-to-r dark:from-slate-950 via-slate-900/80 to-slate-950 p-6 shadow-2xl shadow-sky-500/30 backdrop-blur md:grid-cols-[1.6fr,1fr] md:p-8">
          <div className="space-y-3">
            <h2 className="text-lg bg-gradient-to-r font-bold from-sky-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent">
              Stay ahead in your Unix journey
            </h2>
            <p className="text-xs dark:text-slate-200 sm:text-sm">
              Get notified when new tutorials, scripts and videos drop on
              InfoUnix. No spam, only admin-grade content.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-4 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="h-10 flex-1 rounded-full border border-slate-600 dark:bg-slate-900/60 px-4 text-xs  dark:text-slate-100 outline-none ring-sky-500/40 placeholder:text-slate-500 focus:border-sky-500 focus:ring-1"
              />
              <button
                type="submit"
                className="flex h-10 items-center justify-center rounded-full bg-sky-500 px-5 text-xs font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:-translate-y-0.5 hover:bg-sky-400"
              >
                Join Free
              </button>
            </form>

            <p className="text-[11px] dark:text-slate-400">
              Use this box later to connect with your email service / API.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-200">
            <p className="font-semibold text-gray-700 dark:text-sky-200">Need help?</p>
            <p className="text-gray-800 dark:text-slate-200">
              Have a production issue, interview coming up, or topic you want
              covered? Send a message and it might turn into the next InfoUnix
              tutorial.
            </p>
            <div className="space-y-1 text-[11px] text-gray-600 dark:text-slate-300">
              <p>
                ✉️ Email:{" "}
                <span className="font-mono text-sky-400">
                  admin@infounix.com
                </span>
              </p>
              <p>💬 Add your social links here in future.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
