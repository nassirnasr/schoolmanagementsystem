import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex overflow-hidden">
      {/* LEFT SIDE */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-white p-4 flex flex-col">
        {/* Fixed Top Section */}
        <div className="sticky top-0 bg-white z-10">
          <Link href="/" className="flex items-center justify-center lg:justify-start gap-2">
            <Image src="/icon.png" alt="logo" width={32} height={32} />
            <span className="hidden lg:block font-bold">Shule System</span>
          </Link>
        </div>
        {/* Menu */}
        <div className="lg:overflow-y-auto lg:flex-grow ">
          <Menu />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] flex flex-col">
        {/* Fixed Navbar */}
        <div className="sticky top-0 bg-[#F7F8FA] z-10">
          <Navbar />
        </div>
        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
}
