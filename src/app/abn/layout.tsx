import React from "react";

const navClass =
  "w-full flex items-center justify-center px-6 py-4 bg-primary shadow-md sticky top-0 z-10";
const logoClass =
  "text-xl font-bold text-primary-foreground tracking-tight flex items-center gap-2";

export default function AbnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Nav */}
      <nav className={navClass}>
        <span className={logoClass}>
          <span className="text-xs font-normal text-white">Powered by</span>
          <span className="ml-1 text-primary-foreground font-bold">Quick ABN</span>
        </span>
      </nav>
      {children}
    </div>
  );
}
