'use client';

import { UserButton, useUser } from "@clerk/nextjs"
import { FaSearch} from "react-icons/fa";
import { HiChat, HiOutlineSpeakerphone } from "react-icons/hi";

const Navbar = () => {
    const { user } = useUser();

    // Extract user details
    const userName = user?.fullName || "User"; 
    const userRole = user?.publicMetadata?.role as string;

    return (
        <div className='flex items-center justify-between p-4'>
            {/* SEARCH BAR */}
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <FaSearch size={14} className="text-gray-500"/>
                <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none"/>
            </div>
            {/* ICON AND USER */}
            <div className="flex gap-6 items-center justify-end w-full">
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-mySky">
                    <HiChat size={22} className="text-gray-500"/>
                </div>
                <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative hover:bg-mySky">
                    {/* <Image src="/announcement.png" alt="" width={20} height={20}/> */}
                    <HiOutlineSpeakerphone size={22} className="text-gray-500"/>
                    <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center cursor-pointer bg-red-500 text-white rounded-full text-sm">1</div>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs leading-3 font-medium">{userName}</span>
                    <span className="text-[10px] text-gray-500 text-right">{userRole}</span>
                </div>
                {/* <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full"/> */}
                <UserButton/>
            </div>
        </div>
    )
}

export default Navbar