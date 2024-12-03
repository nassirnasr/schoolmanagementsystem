import Announcements from "@/components/Announcements"
import AttandanceChart from "@/components/AttandanceChart"
import CountChart from "@/components/CountChart"
import EventCalendar from "@/components/EventCalendar"
import FinanceChart from "@/components/FinanceChart"
import UserCard from "@/components/userCard"

const AdminPage = () => {
  return (
    <div className='flex p-4 gap-4 flex-col md:flex-row h-full'>
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
        <UserCard type="student"/>
        <UserCard type="teacher"/>
        <UserCard type="parent"/>
        <UserCard type="staff"/>
        </div>
        {/* MIDDLE CHART */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
          <CountChart/>
          </div>
          {/* ATTANDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
          <AttandanceChart/>
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart/>
        </div>
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/3">
        <EventCalendar/>
        <Announcements/>
        </div>
    </div>
  )
}

export default AdminPage