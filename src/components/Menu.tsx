'use client';

import { useUser } from '@clerk/nextjs';
import { routeAccessMap } from "@/lib/settings";
import Image from "next/image";
import Link from "next/link";

const Menu =  () => {
  const { user } = useUser();
  const userRole = user?.publicMetadata.role as string;

  // Helper function to check if user has access to a route
  const hasAccess = (path: string) => {
    const matchingRoute = Object.entries(routeAccessMap).find(([route]) => {
      const pattern = new RegExp(route.replace('(.*)', ''));
      return pattern.test(path);
    });
    return matchingRoute ? routeAccessMap[matchingRoute[0]].includes(userRole) : false;
  };

  const menuItems = [
    {
      title: "MENU",
      items: [
        {
          icon: "/home.png",
          label: "Home",
          href: "/",
        },
        {
          icon: "/teacher.png",
          label: "Teachers",
          href: "/list/teachers",
        },
        {
          icon: "/student.png",
          label: "Students",
          href: "/list/students",
        },
        {
          icon: "/parent.png",
          label: "Parents",
          href: "/list/parents",
        },
        {
          icon: "/subject.png",
          label: "Subjects",
          href: "/list/subjects",
        },
        {
          icon: "/class.png",
          label: "Classes",
          href: "/list/classes",
        },
        {
          icon: "/exam.png",
          label: "Exams",
          href: "/list/exams",
        },
        {
          icon: "/assignment.png",
          label: "Assignments",
          href: "/list/assignments",
        },
        {
          icon: "/result.png",
          label: "Results",
          href: "/list/results",
        },
        {
          icon: "/attendance.png",
          label: "Attendance",
          href: "/list/attendance",
        },
        {
          icon: "/calendar.png",
          label: "Events",
          href: "/list/events",
        },
        {
          icon: "/announcement.png",
          label: "Announcements",
          href: "/list/announcements",
        },
      ],
    },
    {
      title: "OTHER",
      items: [
        {
          icon: "/profile.png",
          label: "Profile",
          href: "/profile",
        },
        {
          icon: "/setting.png",
          label: "Settings",
          href: "/settings",
        },
        {
          icon: "/logout.png",
          label: "Logout",
          href: "/logout",
        },
      ],
    },
  ];

  return (
    <div className='text-sm mt-4'>
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">{i.title}</span>
          {i.items.map((item) => {
            // Show all items in OTHER section, or check access for MENU items
            if (i.title === "OTHER" || hasAccess(item.href)) {
              return (
                <Link href={item.href} key={item.label} className="flex justify-center items-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-mySkyLight">
                  <Image src={item.icon} alt="" width={20} height={20}/>
                  <span className="hidden lg:block">{item.label}</span>
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