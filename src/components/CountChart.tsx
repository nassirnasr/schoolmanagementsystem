"use client"
import { count } from 'console';
import Image from 'next/image';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        name: 'Total',
        count: 108,
        fill: 'white',
      },
  {
    name: 'Boys',
    count: 54,
    fill: '#C3EBFA',
  },
  {
    name: 'Girls',
    count: 54,
    fill: '#FAE27C',
  }
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

const CountChart = () => {
  return (
    <div className='bg-white rounded-xl w-full h-full p-4'>
        {/* TITLE */}
        <div className='flex items-center justify-between'>
            <h1 className='text-lg font-semibold'>Students</h1>
            <Image src="/moreDark.png" alt='' width={20} height={20}/>
        </div>
        {/* CHART */}
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
        {/* BOTTOM */}
        <div className='flex justify-center gap-16 '>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-mySky rounded-full'/>
                <h1 className='font-bold'>1,265</h1>
                <h2 className='text-xs text-gray-300'>Boys (55%)</h2>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 bg-myYellow rounded-full'/>
                <h1 className='font-bold'>1,061</h1>
                <h2 className='text-xs text-gray-300'>Girls (45%)</h2>
            </div>
        </div>
    </div>
  )
}

export default CountChart