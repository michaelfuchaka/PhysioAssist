'use client'
import React , { useEffect, useState }  from 'react'
import Sidebar from "@/components/Sidebar";
import { ChevronRight, FileText, TrendingUp, Calendar, Clock, ArrowRight, Activity } from 'lucide-react';
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
        
        <div className='mt-12 flex justify-between  items-center gap-8 '>
        
        {loading ?( 
             <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        ) : user ?(
        <h1>
            {user ? `Welcome ${user.name}` : "Welcome Guest"}
        </h1>
        ):null}
            {/* Button */}
        <Link 
            href="/newcase"
            className="bg-[#324B6F] hover:bg-[#486B9C] text-white px-4 py-2 rounded-xl font-semibold shadow-lg 
            transition-all duration-200  flex items-center gap-2 text-sm"
        >
            <Activity size={20} />
            Start New Analysis
        </Link>
       </div>
                            
    {/* Cases Cards */}
       <div className='mt-6  grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl'>
        {/* Total Cases */}
        <div className='bg-white p-6 rounded-[2xl]  shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group'>
           <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                <FileText className="text-[#324B6F]" size={24} />
            </div>
            <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                <TrendingUp size={16} />
                +23%
            </span>
                </div>
         <h3 className='text-base text-[#000000] mt-2'>Total Cases Analyzed</h3>
           <p className='text-2xl font-bold text-[#324B6F]'>{stats.total_cases}</p>
        </div>

        {/* Cases This Week */}
        <div className=' bg-white p-6 rounded-[2xl]  shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group'>
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                <Calendar className="text-emerald-600" size={24} />
            </div>
            <span className="text-emerald-500 text-sm font-medium flex items-center gap-1">
                <TrendingUp size={16} />
                +12%
            </span>
        </div>
         <h3 className='text-base text-[#000000] mt-2'>Cases This Week</h3>
           <p className='text-2xl font-bold text-[#324B6F]'>{stats.cases_this_week}</p>
        </div>

        {/* Active Drafts */}
        <div className='bg-white p-6 rounded-[2xl]  shadow-sm  border border-gray-100 hover:shadow-md transition-all duration-200 group'>
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-50 rounded-xl group-hover:bg-amber-100 transition-colors">
                <Clock className="text-amber-600" size={24} />
            </div>
            <ArrowRight className="text-gray-400 group-hover:text-amber-600 transition-colors" size={20} />
        </div>
         <h3 className='text-base  text-[#000000] mt-2'>Active Drafts</h3>
           <p className='text-2xl font-bold text-[#324B6F]'>{stats.active_drafts}</p>
        </div>

       </div>

       </div>
      </main>
    </div>
  )
}

export default Dashboard



