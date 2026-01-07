import React from 'react'
import Sidebar from "@/components/Sidebar";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const results = () => {
  return (
    <div>
          <Sidebar />
      <main className="ml-60 p-4 bg-[#F5F5F5] text-[#000000] min-h-screen">
        <div className='ml-4'>
            <nav>
        <div className="flex items-center gap-2 text-lg font-semibold">
            <Link href="/dashboard">Dashboard</Link>
            <ChevronRight size={24} className="" />
            <Link href="/newcase">New Case</Link>
       
        </div>
        </nav>
        <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-4" '>
          {/* possible conditions */}
        <div className='bg-[#F5F5F5] shadow-sm max-w-lg p-6 rounded-xl '>
            <h2 className='font-semibold text-[#324B6F] text-xl'>
                Possible Conditions
            </h2>
          <button className="flex-1 bg-[#E0E0E0] font-medium py-2 px-8 rounded-lg hover:bg-[#D0D0D0] transition-colors whitespace-normal">
            Reject All & Re-analyze
          </button>
        </div>
           <div className='flex flex-col gap-4'>
        {/* Recommended treatment plan  */}
        <div  className='bg-[#F5F5F5] shadow-sm max-w-lg p-6 rounded-xl'>
            <h2 className='font-semibold text-[#324B6F] text-xl'>
                Recommended Treatment Plan
            </h2>
        </div>
        {/* Clinical documentation */}
         <div  className='bg-[#F5F5F5] shadow-sm max-w-lg p-6 rounded-xl'>
            <h2 className='font-semibold text-[#324B6F] text-xl'>
                Clinical Documentation
            </h2>
        </div>
        </div>
        </div>
        </div>
      </main>
    </div>
  )
}

export default results


