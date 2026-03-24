"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideNav from "../Components/SideNav";
import Header from "../Components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#fcfcfc]">
      {/* Sidebar */}
      <SideNav />
      {/* Main content area — offset by sidebar width (w-64 = ml-64) */}
      <div className="ml-65 flex-1 mr-2 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-3">{children}</main>
      </div>
    </div>
  );
}
