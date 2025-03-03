import prisma from "@/lib/prisma"
import BigCalendar from "./BigCalendar"
import { adjustedScheduleToCurrentWeek } from "@/lib/utils";
import { toZonedTime } from 'date-fns-tz';

const BigCalendarContainer = async ({type, id}: {type:"teacherId" | "classId", id:string | number}) => {

    const dataRes = await prisma.lesson.findMany({
        where:{
            ...(type === "teacherId" ? {teacherId: id as string} : {classId:id as number})
        }
    });

    const data = dataRes.map(lesson => ({
        title: lesson.name,
        start: toZonedTime(lesson.startTime, 'Africa/Nairobi'),
        end: toZonedTime(lesson.endTime, 'Africa/Nairobi'),
    }));

    const schedule = adjustedScheduleToCurrentWeek(data)

    return (
        <BigCalendar data={schedule}/>
    )
}

export default BigCalendarContainer