"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // By default, you can set the sidebar open or closed.
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // On mobile (width < 768px), when a menu item is clicked, close the sidebar.
  const handleItemClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMenuOpen(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden relative">
      {/* Overlay on mobile when sidebar is open */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`bg-white p-4 flex flex-col transition-all duration-300 z-50 ${
          menuOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center sticky top-0 bg-white z-10 px-2 py-4">
          <div className="flex-1">
            {menuOpen && (
              <Link href="/" className="flex items-center gap-2">
                <Image src="/icon.png" alt="logo" width={32} height={32} />
                <span className="font-bold text-lg whitespace-nowrap">
                  Shule System
                </span>
              </Link>
            )}
          </div>
          <button onClick={toggleMenu} className="p-2">
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        {/* Menu */}
        <div className="mt-4 flex-grow overflow-y-auto">
          <Menu isOpen={menuOpen} onItemClick={handleItemClick} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow bg-[#F7F8FA]">
        {/* Fixed Navbar */}
        <div className="sticky top-0 bg-[#F7F8FA] z-10">
          <Navbar />
        </div>
        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow">{children}</div>
      </div>
    </div>
  );
}
