// components/TerminalOutput.jsx
import React from "react";

const TerminalOutput = ({
  content,
  title = "terminal — bash",
  contextLabel = "infounix@prod",
  maxHeight = "20rem",
}) => {
  const lines = content.trimEnd().split("\n");

  return (
    <div className="relative mb-6">
      {/* Glow ring */}
      <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-sky-500/40 via-fuchsia-500/40 to-emerald-500/40 opacity-60 blur-lg" />

      {/* Terminal card */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/95 shadow-xl shadow-slate-950/80">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 py-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="flex h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 text-slate-400">{title}</span>
          </div>
          <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-300">
            {contextLabel}
          </span>
        </div>

        {/* Body */}
        <div
          className="overflow-auto bg-[#050816] px-4 py-3 text-xs font-mono text-slate-100"
          style={{
            maxHeight,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {lines.map((line, index) => {
            const trimmed = line.trimEnd();

            // Empty line
            if (trimmed === "") {
              return <div key={index}>&nbsp;</div>;
            }

            // Prompt pattern: [user@host ~]# command  OR $
            const promptMatch = trimmed.match(/^(\[[^\]]+\]\s*[#$])\s*(.*)$/);
            if (promptMatch) {
              const prompt = promptMatch[1];
              const cmd = promptMatch[2];

              return (
                <div key={index}>
                  <span className="text-slate-500 font-semibold">
                    {prompt}{" "}
                  </span>
                  <span className="text-emerald-300">{cmd}</span>
                </div>
              );
            }

            // Lines that look like FTP/shell commands without prompt
            if (
              trimmed.startsWith("/>") ||
              trimmed.startsWith("ftp") ||
              trimmed.startsWith("lftp") ||
              trimmed.startsWith("sftp")
            ) {
              return (
                <div key={index} className="text-sky-300">
                  {trimmed}
                </div>
              );
            }

            // Success-style lines
            if (
              trimmed.startsWith("✔") ||
              trimmed.toLowerCase().startsWith("active:") ||
              trimmed.toLowerCase().includes("success")
            ) {
              return (
                <div key={index} className="text-emerald-400">
                  {trimmed}
                </div>
              );
            }

            // Error / warning style
            if (
              trimmed.toLowerCase().includes("failed") ||
              trimmed.toLowerCase().includes("error")
            ) {
              return (
                <div key={index} className="text-rose-400">
                  {trimmed}
                </div>
              );
            }

            // Default output line
            return (
              <div key={index} className="text-slate-200">
                {trimmed}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TerminalOutput;
