import Image from "next/image";
import AttandanceChart from "./AttandanceChart";
import prisma from "@/lib/prisma";
import { FaEllipsisH } from "react-icons/fa";

const AttandanceChartContainer = async () => {

    const today = new Date()
    const dayOfWeek = today.getDate()
    const daySinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const lastMonday = new Date(today)

    lastMonday.setDate(today.getDate() - daySinceMonday)
    const resData = await prisma.attendance.findMany({
        where: {
            date: {
                gte: lastMonday
            }
        },
        select: {
            date: true,
            present: true,
        }
    })
    

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    const attendanceMap : {[key:string] : {present:number; absent:number}} = {
        Mon: {present: 0, absent: 0},
        Tue: {present: 0, absent: 0},
        Wed: {present: 0, absent: 0},
        Thu: {present: 0, absent: 0},
        Fri: {present: 0, absent: 0},
    };

    resData.forEach(item=>{
        const itemDate = new Date(item.date)

        if (dayOfWeek >= 1 && dayOfWeek <=5){
            const dayName = daysOfWeek[dayOfWeek - 1];

            if(item.present){
                attendanceMap[dayName].present += 1;
            }else {
                attendanceMap[dayName].absent += 1;
            }
        }
    })
    const data  = daysOfWeek.map((day) => ({
        name:day,
        present: attendanceMap[day].present,
        absent: attendanceMap[day].absent,
    }));
    return (
        <div className='bg-white rounded-lg p-4 h-full'>
        <div className='flex justify-between items-center'>
            <h1 className='font-semibold text-lg'>Attandance</h1>
            <FaEllipsisH size={18} className="text-gray-500 cursor-pointer"/>
        </div>
        <AttandanceChart data={data}/>
        </div>
    );
}

export default AttandanceChartContainer;