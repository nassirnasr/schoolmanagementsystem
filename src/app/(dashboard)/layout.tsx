"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [screenSize, setScreenSize] = useState("large");
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize("small");
        setMenuOpen(false);
      } else if (window.innerWidth < 1024) {
        setScreenSize("medium");
        setMenuOpen(false);
      } else {
        setScreenSize("large");
        setMenuOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("menuOpen", menuOpen.toString());
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <motion.div
        animate={{ width: menuOpen ? 256 : 64 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`bg-white h-full flex flex-col shadow-md relative transition-all duration-300 
          ${menuOpen ? "backdrop-blur-md" : ""}`}
      >
        {/* Logo & System Name */}
        <div className="flex flex-col items-center py-6">
          <motion.div
            key={menuOpen.toString()}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image src="/icon.png" alt="logo" width={40} height={40} className="mb-2" />
          </motion.div>

          <AnimatePresence>
            {menuOpen && screenSize === "large" && (
              <motion.span
                key="shule-system"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="font-bold text-lg text-center"
              >
                Shule System
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Toggle Button */}
        <button onClick={toggleMenu} className="p-3 rounded-md hover:bg-gray-100">
          {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>

        {/* Menu with Scroll */}
        <div className="mt-6 flex-grow w-full overflow-y-auto px-2 scrollbar-thin scrollbar-thumb-gray-300">
          <Menu isOpen={menuOpen || screenSize === "large"} />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow bg-[#F7F8FA] px-4 py-2">
        <div className="sticky top-0 bg-[#F7F8FA] z-10 ">
          <Navbar />
        </div>
        <div className="overflow-y-auto flex-grow p-4">{children}</div>
      </div>
    </div>
  );
}