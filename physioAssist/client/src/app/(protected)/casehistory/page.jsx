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
        <div className="mt-12 mx-w-md mx-auto">
          <label htmlFor="search" className='sr-only'>
            Search
          </label>
           <div className="relative">
        {/* Search icon */}

          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="www.w3.org"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>  
          </div>
            {/* Input field */}
             <input
          type="text"
          id="search"
          name="search"
          className="block w-full py-2 pl-10 pr-4 text-black border border-white bg-white rounded-lg"
          placeholder="Search by symptom, condition, pain region, or date"
        />
         </div>
        </div>
        </div>
      </main>  

    </div>
  )
}

export default History