"use client"
import { count } from 'console';
import Image from 'next/image';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';



const CountChart = ({boys, girls}:{boys:number, girls:number}) => {
  const data = [
    {
        name: 'Total',
        count: boys+girls,
        fill: 'white',
      },
  {
    name: 'Boys',
    count: boys,
    fill: '#C3EBFA',
  },
  {
    name: 'Girls',
    count: girls,
    fill: '#FAE27C',
  }
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

return (
    <div className='h-[75%] w-full relative'>
        <ResponsiveContainer>
        <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
          <RadialBar
            background
            dataKey="count"
          />
          
        </RadialBarChart>
      </ResponsiveContainer>
      <Image src="/maleFemale.png" alt='' width={50} height={50} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'/>
       </div>
  );
};

export default CountChart