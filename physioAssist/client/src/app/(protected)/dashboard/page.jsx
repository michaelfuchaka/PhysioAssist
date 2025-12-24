'use client'
import React , { useEffect, useState }  from 'react'
import Sidebar from "@/components/Sidebar";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getCurrentUser, getUserStats } from '@/lib/api';


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total_cases: 0, cases_this_week: 0, active_drafts: 0 });

    useEffect(() => {
           const fetchData = async () => {
               try {
                   const userData = await getCurrentUser();
                   setUser(userData);
                   const statsData = await getUserStats();
                   setStats(statsData);
               } catch (error) {
                   console.error('Failed to fetch data:', error);
               } finally {
                   setLoading(false);
               }
           };
           
           fetchData();
       }, []);


  return (
     
        <div >
        <Sidebar />
            <main className="ml-60 p-4 bg-[#F5F5F5] text-[#000000] min-h-screen">
        <div className='ml-4'>
        <nav>
        <div className="flex items-center gap-2 text-lg font-semibold">
            <Link href="/">Home</Link>
            <ChevronRight size={24} className="" />
            <Link href="/dashboard">Dashboard</Link>
        </div>
        </nav>
        
        <div className='mt-12'>
        
        {loading ?( 
             <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        ) : user ?(
        <h1>
            {user ? `Welcome ${user.name}` : "Welcome Guest"}
        </h1>
        ):null}
       </div>
    
    {/* Cases Cards */}
       <div className='mt-6 grid grid-cols-1 md:grid-cols-3 gap-6'>
        {/* Total Cases */}
        <div className='bg-white p-6 rounded-[20px] shadow-md'>
         <h3 className='text-lg font-semibold text-[#324B6F]'>Total Cases Analyzed</h3>
         <p className='text-3xl font-bold text-[#3D7AC4] mt-2'>{stats.total_cases}</p>
        </div>

        {/* Cases This Week */}
        <div className='bg-white p-6 rounded-[20px] shadow-md'>
         <h3 className='text-lg font-semibold text-[#324B6F]'>Cases This Week</h3>
         <p className='text-3xl font-bold text-[#3D7AC4] mt-2'>{stats.cases_this_week}</p>
        </div>

        {/* Active Drafts */}
        <div className='bg-white p-6 rounded-[20px] shadow-md'>
         <h3 className='text-lg font-semibold text-[#324B6F]'>Active Drafts</h3>
         <p className='text-3xl font-bold text-[#3D7AC4] mt-2'>{stats.active_drafts}</p>
        </div>

       </div>
       </div>
      </main>
    </div>
  )
}

export default Dashboard