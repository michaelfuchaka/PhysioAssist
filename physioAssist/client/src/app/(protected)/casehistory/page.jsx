import React from 'react'
import Sidebar from "@/components/Sidebar";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const History = () => {
  return (
    <div>
        <Sidebar />
         <main className="ml-60 p-4 bg-[#F5F5F5] text-[#000000] min-h-screen">
        <div className='ml-4'>
          <nav>
        <div className="flex items-center gap-2 text-lg font-semibold">
            <Link href="/newcase">New Case</Link>
            <ChevronRight size={24} className="" />
            <Link href="/casehistory">Case History</Link>
        </div>
        </nav>
        </div>
      </main>  

    </div>
  )
}

export default History