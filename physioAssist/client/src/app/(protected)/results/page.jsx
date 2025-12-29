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
        <div className='mt-12 '>
        <div className='bg-[#F5F5F5] shadow-sm max-w-lg p-6 rounded-xl'>
            <h2 className='font-semibold text-[#324B6F] text-xl'>
                Possible Conditions
            </h2>

             <button className="flex-1 bg-[#E0E0E0] font-medium py-3 rounded-lg hover:bg-[#D0D0D0] transition-colors">
          Reject All & Re-analyze
          </button>
        </div>
        </div>
        </div>
      </main>
    </div>
  )
}

export default results


