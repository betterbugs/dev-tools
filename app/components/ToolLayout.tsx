"use client";

import React from "react";

interface ToolLayoutProps {
  children: React.ReactNode;
}

export default function ToolLayout({ children }: ToolLayoutProps) {
  return (
    <div className="md:max-w-[1170px] mx-auto px-4 py-10">
      {children}
    </div>
  );
}