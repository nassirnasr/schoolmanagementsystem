// src/app/(dashboard)/list/parents/[id]/page.tsx
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalenderContainer";
import FormModel from "@/components/FormModel";
import Performance from "@/components/Performance";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Class, Parent } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FaEnvelope, FaLocationArrow, FaPhoneAlt, FaSearchLocation, FaUserCircle } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const SingleParentPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const parent: Parent & { students: { id: string; name: string; class: Class }[] } | null = await prisma.parent.findUnique({
    where: { id },
    include: {
      students: { include: { class: true } }, // Include class information for each student
    },
  });

  if (!parent) {
    return notFound();
  }

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-mySky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              {/* Commenting out image logic since there are no images in the database */}
              {/* {parent.img ? (
                <Image
                  src={parent.img}
                  alt=""
                  width={144}
                  height={144}
                  className="w-36 h-36 rounded-full object-cover"
                />
              ) : ( */}
              <FaUserCircle className="w-36 h-36 text-gray-500" />
              {/* )} */}
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">{parent.name}</h1>
                {role === "admin" && (
                  <FormModel table="parent" type="update" data={parent} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <FaPhoneAlt size={18}/>
                  <span>{parent.phone || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                <FaEnvelope size={18}/>
                  <span>{parent.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                    <FaLocationArrow size={18}/>
                  <span>{parent.address || "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* STUDENT SCHEDULES */}
        <div className="mt-4 bg-white rounded-md p-4">
          <h1 className="text-lg font-semibold">Children's Schedules</h1>
          {parent.students.map((student) => (
            <div key={student.id} className="mb-4">
              <h2 className="font-semibold">{student.name}'s Schedule</h2>
              <BigCalendarContainer type="classId" id={student.class.id} />
            </div>
          ))}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            {parent.students.map((student) => (
              <Link
                key={student.id}
                className="p-3 rounded-md bg-lamaSkyLight"
                href={`/list/students/${student.id}`}
              >
                {student.name}'s Profile
              </Link>
            ))}
            {/* Add more shortcuts as needed */}
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleParentPage;