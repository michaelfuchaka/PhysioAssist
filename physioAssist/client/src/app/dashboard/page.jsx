'use client'
import React , { useEffect, useState }  from 'react'
import Sidebar from "@/components/Sidebar";
import { ChevronRight } from 'lucide-react';


const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
           const fetchUser = async () => {
               try {
                   const userData = await getCurrentUser();
                   setUser(userData);
               } catch (error) {
                   console.error('Failed to fetch user:', error);
               } finally {
                   setLoading(false);
               }
           };
           
           fetchUser();
       }, []);


  return (
     
        <div >
        <Sidebar />
            <main className="ml-60 p-4 bg-[#F5F5F5] text-[#000000] min-h-screen">
        <div className='ml-4'>
        <nav>
        <div className="flex items-center gap-2 text-lg font-semibold">
            <a href="/home">Home</a>
            <ChevronRight size={24} className="" />
            <span className="">Dashboard</span>
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
       </div>
      </main>
    </div>
  )
}

export default Dashboard