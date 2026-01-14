'use client'
import React, {useEffect, useState} from 'react'
import Sidebar from "@/components/Sidebar";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import {getCaseHistory} from '@/lib/api';


const History = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [cases, setCases] = useState([]);


  // Fetch case history data
  useEffect(() => {
     const fetchCaseHistory = async () => {
      try {
        const data = await getCaseHistory();
        setCases(data.cases); 
      } catch (error) {
        console.error('Failed to fetch case history:', error);
      }
    };

  fetchCaseHistory();

  } , [] );

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
        {/* Filters */}
        <div className='mt-6 flex gap-4 items-center'>
            {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-2">
          Status
        </label>
        <select
          id="status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-white border border-[#324B6F] rounded-lg focus:outline-none"
        >
          <option value="all">All Cases</option>
          <option value="completed">Completed</option>
          <option value="draft">Draft</option>
        </select>
          </div>
         
          {/* Sort By */}
          <div>
            <label htmlFor="sort" className="block text-sm font-medium mb-2">
              Sort By
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2 bg-white border border-[#324B6F] rounded-lg focus:outline-none"
            >
              <option value="newest">Date (Newest First)</option>
              <option value="oldest">Date (Oldest First)</option>
            </select>
          </div>

        </div>
        {/* Case History List */}
        <div className=" mt-8 table-container w-full rounded-lg  overflow-x-hidden" >
        {/* Table Header */}
          <div className="table-header flex bg-[#F6F7FC] font-semibold border-b border-gray-300">
          <div className="w-1/5 p-3">Date</div>
          <div className="w-1/5 p-3">Pain Region</div>
          <div className="w-1/5 p-3">Primary Condition</div>
          <div className="w-1/5 p-3">Status</div>
          <div className="w-1/5 p-3">Action</div>
        </div>
        {/* Table Body */}
      {cases.map((item, index) => (
        <div
          key={item.id}
          className={` flex items-center ${index % 2 === 0 ? "bg-white" : "bg-blue-50"} border-t border-gray-300`}
        >
          <div className="w-1/5 p-3">
           {new Date(item.created_at).toLocaleDateString()}
          </div>
          <div className="w-1/5 p-3">{item.pain_region}</div>
          <div className="w-1/5 p-3">{item.primary_condition || "—"}</div>
          <div className="w-1/5 p-3">
             <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
              Completed
            </span>
          </div>
          <div className="w-1/5 p-3 flex gap-2">
            <button className="text-blue-600">View</button>
            {item.status === "Draft" && <button className="text-gray-600">Continue</button>}
          </div>
        </div>
      ))}
            
        <div className="pagination flex justify-end gap-2 p-3">
          <button className="px-3 py-1 border rounded">Prev</button>
          <span className="px-3 py-1">5/6</span>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>

        </div>

        </div>
      </main>  

    </div>
  )
}

export default History