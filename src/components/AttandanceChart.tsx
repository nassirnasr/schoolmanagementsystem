"use client"
import Image from 'next/image';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const AttandanceChart = ({data} : {data: {name:string, present:number, absent:number}[];}) => {
  return (
   
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
  
  )
}

export default AttandanceChart