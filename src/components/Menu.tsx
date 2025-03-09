"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
// Import icons from react-icons (Heroicons & FontAwesome)
import {
  HiHome,
  HiPencilAlt,
  HiClipboardList,
  HiChartBar,
  HiCalendar,
  HiChatAlt,
  HiSpeakerphone,
  HiCog,
  HiLogout,
  HiOutlineViewGrid,
} from "react-icons/hi";
import {
  FaChalkboardTeacher,
  FaUserGraduate,
  FaUserFriends,
  FaUser,
  FaCalendarAlt,
  FaBook,
  FaBookReader,
  FaCoins,
} from "react-icons/fa";

type MenuProps = {
  isOpen: boolean;
  onItemClick?: () => void;
};

const menuItems = [
  {
    title: "MENU",
    items: [
      { icon: HiHome, label: "Home", href: "/", visible: ["admin", "teacher", "student", "parent"] },
      { icon: FaChalkboardTeacher, label: "Teachers", href: "/list/teachers", visible: ["admin", "teacher"] },
      { icon: FaUserGraduate, label: "Students", href: "/list/students", visible: ["admin", "teacher"] },
      { icon: FaUserFriends, label: "Parents", href: "/list/parents", visible: ["admin", "teacher"] },
      { icon: FaBook, label: "Subjects", href: "/list/subjects", visible: ["admin"] },
      { icon: HiOutlineViewGrid, label: "Classes", href: "/list/classes", visible: ["admin", "teacher"] },
      { icon: FaBookReader, label: "Lessons", href: "/list/lessons", visible: ["admin", "teacher", "student", "parent"] },
      { icon: HiPencilAlt, label: "Exams", href: "/list/exams", visible: ["admin", "teacher", "student", "parent"] },
      { icon: HiClipboardList, label: "Assignments", href: "/list/assignments", visible: ["admin", "teacher", "student", "parent"] },
      { icon: HiChartBar, label: "Results", href: "/list/results", visible: ["admin", "teacher", "student", "parent"] },
      { icon: HiCalendar, label: "Attendance", href: "/list/attendance", visible: ["admin", "teacher", "student", "parent"] },
      { icon: FaCalendarAlt, label: "Events", href: "/list/events", visible: ["admin", "teacher", "student", "parent"] },
      { icon: HiChatAlt, label: "Messages", href: "/list/messages", visible: ["admin", "teacher", "student", "parent"] },
      { icon: HiSpeakerphone, label: "Announcements", href: "/list/announcements", visible: ["admin", "teacher", "student", "parent"] },
      { icon: FaCoins, label: "Budget", href: "/budget", visible: ["admin"] },
    ],
  },
  {
    title: "OTHER",
    items: [
      { icon: FaUser, label: "Profile", href: "/profile", visible: ["admin", "teacher", "student", "parent"] },
      { icon: HiCog, label: "Settings", href: "/settings", visible: ["admin", "teacher", "student", "parent"] },
      { icon: HiLogout, label: "Logout", href: "/logout", visible: ["admin", "teacher", "student", "parent"] },
    ],
  },
];

const Menu = ({ isOpen, onItemClick }: MenuProps) => {
  const { user } = useUser();
  const role = (user?.publicMetadata?.role as string) || "admin";

  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="flex flex-col gap-2" key={section.title}>
          {isOpen && (
            <span className="text-gray-400 font-light my-4">
              {section.title}
            </span>
          )}
          {section.items.map((item) => {
            if (item.visible.includes(role)) {
              const IconComponent = item.icon;
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  title={!isOpen ? item.label : undefined}
                  onClick={() => {
                    if (onItemClick) onItemClick();
                  }}
                  className={`flex items-center gap-2 py-2 px-2 rounded-md hover:bg-mySky ${
                    item.label === "Logout" ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  <IconComponent className="text-base" />
                  {isOpen && <span>{item.label}</span>}
                </Link>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
