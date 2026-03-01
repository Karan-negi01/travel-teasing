"use client";

export default function ChatBubble({ role, children, className = "" }) {
  const isBot = role === "bot";
  return (
    <div
      className={`flex w-full gap-3 ${isBot ? "justify-start" : "justify-end"} ${className}`}
    >
      {isBot && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/25 ring-2 ring-violet-200/40">
          <span className="text-sm font-bold">N</span>
        </div>
      )}
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3.5 leading-relaxed text-[15px] ${
          isBot
            ? "rounded-tl-md bg-gradient-to-br from-violet-50 to-white text-stone-800 border border-violet-100/80 shadow-sm"
            : "rounded-tr-md bg-gradient-to-br from-violet-500 to-purple-600 text-white border border-violet-400/50 shadow-lg shadow-violet-500/20"
        }`}
      >
        {children}
      </div>
      {!isBot && <div className="w-10 shrink-0" />}
    </div>
  );
}
