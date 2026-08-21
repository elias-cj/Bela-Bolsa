"use client";

import React, { useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ToastProvider } from "@/components/admin/Toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-luxury-ivory dark:bg-[#070708] text-luxury-charcoal dark:text-luxury-ivory flex">
        {/* Collapsible Sidebar */}
        <AdminSidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        {/* Main Content Area */}
        <div
          className={`flex-grow flex flex-col min-w-0 transition-all duration-300 ${
            isCollapsed ? "lg:pl-20" : "lg:pl-64 sm:lg:pl-72"
          }`}
        >
          {/* Header */}
          <AdminHeader onOpenMobileSidebar={() => setMobileOpen(true)} />

          {/* Page Body */}
          <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
