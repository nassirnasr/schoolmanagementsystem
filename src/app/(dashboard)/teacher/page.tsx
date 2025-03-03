import Announcements from "@/components/Announcements"
import BigCalendarContainer from "@/components/BigCalenderContainer"
import { auth } from "@clerk/nextjs/server"

const TeacherPage = async () => {

  const {userId} =await auth()
  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row flex-1'>
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
      <div className="bg-white h-full p-4 rounded-md">
        <h1 className="text-xl font-semibold ">Schedule</h1>
        <BigCalendarContainer type="teacherId" id={userId!}/>
      </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
      <Announcements/>
      </div>
      
    </div>
  )
}

export default TeacherPage