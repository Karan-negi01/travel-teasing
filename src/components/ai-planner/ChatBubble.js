"use client";

export default function ChatBubble({ role, children, className = "" }) {
  const isBot = role === "bot";
  return (
    <div
      className={`flex w-full gap-3 ${isBot ? "justify-start" : "justify-end"} ${className}`}
    >
      {isBot && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-400/25 border border-orange-400/40">
          <span className="text-sm font-bold">N</span>
        </div>
      )}
      <div
        className={`max-w-[82%] sm:max-w-[70%] rounded-2xl px-4 py-3.5 leading-relaxed ${
          isBot
            ? "rounded-tl-md bg-white/50 backdrop-blur-md text-gray-800 border border-white/50 shadow-md"
            : "rounded-tr-md bg-gradient-to-br from-orange-500 to-amber-500 text-white border border-orange-400/40 shadow-lg shadow-orange-400/20 backdrop-blur-sm"
        }`}
      >
        {children}
      </div>
      {!isBot && <div className="w-9 shrink-0" />}
    </div>
  );
}
