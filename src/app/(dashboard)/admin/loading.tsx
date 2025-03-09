import React from "react";

const AdminPageSkeleton = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <div className="flex p-4 gap-4 flex-col md:flex-row h-full">
      {/* LEFT SIDE */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* User Cards Skeleton */}
        <div className="flex gap-4 justify-between flex-wrap">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-full sm:w-1/4 bg-gray-300 h-32 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
        {/* Middle Charts Skeleton */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* Count Chart Skeleton */}
          <div className="w-full lg:w-1/3 h-[450px] bg-gray-300 rounded-md animate-pulse"></div>
          {/* Attendance Chart Skeleton */}
          <div className="w-full lg:w-2/3 h-[450px] bg-gray-300 rounded-md animate-pulse"></div>
        </div>
        {/* Bottom Chart Skeleton */}
        <div className="w-full h-[500px] bg-gray-300 rounded-md animate-pulse"></div>
      </div>
      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        {/* Calendar Skeleton */}
        <div className="h-64 bg-gray-300 rounded-md animate-pulse"></div>
        {/* Announcements Skeleton */}
        <div className="h-40 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
};

export default function LoadingAdminPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return <AdminPageSkeleton searchParams={searchParams} />;
}
