import Announcements from "@/components/Announcements"
import BigCalendar from "@/components/BigCalendar"
import BigCalendarContainer from "@/components/BigCalenderContainer"
import prisma from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"

const ParentPage = async () => {
  const { userId } = await auth()

  // Check if userId is null
  if (!userId) {
    return <div>User not authenticated</div>
  }

  // Fetch the student data based on the parent's relationship
  const student = await prisma.student.findFirst({
    where: {
      parent: {
        id: userId
      }
    },
    include: {
      class: true
    }
  })

  if (!student) {
    return <div>No student found for this parent.</div>
  }

  return (
    <div className='p-4 flex gap-4 flex-col xl:flex-row flex-1'>
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="bg-white h-full p-4 rounded-md">
          <h1 className="text-xl font-semibold ">Schedule ({student.name})</h1>
          <BigCalendarContainer type="classId" id={student.classId} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  )
}

export default ParentPage