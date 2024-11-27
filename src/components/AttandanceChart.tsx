"use client"
import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Mon',
    present: 40,
    absent: 60,
  },
  {
    name: 'Tue',
   
    present: 98,
    absent: 40,
  },
  {
    name: 'Wed',

    present: 50,
    absent: 50,
  },
  {
    name: 'Thu',

    present:60,
    absent: 40,
  },
  {
    name: 'Fri',

    present: 48,
    absent: 22,
  },
];
const AttandanceChart = () => {
  return (
    <div className='bg-white rounded-lg p-4 h-full'>
        <div className='flex justify-between items-center'>
            <h1 className='font-semibold text-lg'>Attandance</h1>
            <Image src="/moreDark.png" alt="" width={20} height={20}/>
        </div>
        <ResponsiveContainer width="100%" height="90%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
          <XAxis dataKey="name" 
          axisLine={false} 
          tick={{fill:"#d1d5db"}} 
          tickLine={false}
          />
          <YAxis 
          tick={{fill:"#d1d5db"}} 
          tickLine={false} />
          <Tooltip 
          contentStyle={{borderRadius:"10px" , borderColor:"lightgray"}}
          />
          <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop:"20px" , paddingBottom:"40px"}}/>
          <Bar dataKey="present" fill="#C3EBFA" legendType='circle' />
          <Bar dataKey="absent" fill="#FAE27C" legendType='circle'/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AttandanceChart