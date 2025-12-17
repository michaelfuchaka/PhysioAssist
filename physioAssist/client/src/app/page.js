import Navbar from '@/components/Navbar';
import React from 'react';
import Image from 'next/image';
import { FiClipboard } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { MdOutlineAssignment } from 'react-icons/md';
import {MdOutlineSearch } from "react-icons/md";
import { MdAssignmentAdd } from "react-icons/md";
import { MdLanguage } from "react-icons/md";





export default function Home() {
     


  return (
    <div className='bg-[#FFFFFF] min-h-screen '>
      <Navbar />

      <main >
       {/* Hero Section */}
      <div className='relative h-[70vh] md:h-[80vh] lg:h-[600px] flex items-center justify-center  '>
        <Image
          src='/assets/heroImg.png'
          alt='Hero Image'
          fill
          className='object-cover'
          priority
          />
        <div className='relative z-10 pt-8 px-2 max-w-2xl md:px-12 lg:px-16 ml-10 md:ml-6 lg:ml-2  text-left leading-height'>
          <h1 className='text-3xl md:text-2xl lg:text-4xl font-semibold text-[#1E3A5F] 
          text-shadow-[0_1px_2px_rgba(0,0,0,0.1)] '
            >
            Supporting Physiotherapists in Clinical Decision Making
          </h1>
          <p className='text-lg md:text-xl text-[#11203d] font-medium mt-4
           text-shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
            >
          AI-powered guidance for faster evaluations, note taking, and treatment planning  
          </p>

          <button className='text-[#FFFFFF] mt-8 font-semibold ml-24 text-xl bg-[#324B6F] px-6 py-3 
          border-2  border-[#324B6F] rounded-[20px] hover:bg-white hover:text-[#324B6F] 
          transition-all duration-300 '>
          Start Assessment
        </button>
        </div>
          
        </div>

     { /* how it works section */}
      <div id = 'how-it-works' className='scroll-mt-20  text-[#000000] mt-12 mb-8 '>
        <h1 className=' text-3xl md:text-4xl font-semibold  flex items-center 
        justify-center mb-10'>
          How It Works</h1>
      
       <div className="flex flex-col md:flex-row justify-between  gap-8 px-6 md:px-12">
       {/* card 1*/}
        <div  className="flex flex-col items-center text-center">
           <MdOutlineAssignment size={64} className="text-[#324B6F]" />
          <h2 className='font-semibold text-xl mt-4'>
            1.Enter Symptoms 
          </h2>
          <p className='mt-2 '>
            Detailed input on patient condition

          </p>
        </div> 

       {/* Card 2 */}
      <div className="flex flex-col items-center text-center">
          <FaBrain size={64} className="text-[#324B6F]" />
          <h2 className='font-semibold text-xl mt-4'>
            2. AI Matches Symptoms
          </h2>
          <p className='mt-2'>
            Cross-reference against medical data
          </p>
        </div>    
     
       {/* Card 3 */}
       <div className="flex flex-col items-center text-center">
            <HiOutlineLightBulb size={64} className="text-[#324B6F]" />
          <h2 className='font-semibold text-xl mt-4'>
           3.Get Clear Recommendations
          </h2>
          <p className='mt-2'>
          Personalized treatment plans
          </p>
        </div>  
        </div>   
      </div> 
            
     {/* features */}
     <div className='text-[#000000] mt-16 mb-8'>
      <h2 className=' text-2xl md:text-3xl font-semibold  flex items-center 
        justify-center mb-10'>
        Powerful Features For Modern Physiotherapy Practice</h2>

      {/* feature 1 */}
       <div  className="flex flex-col items-center text-center max-w-sm mx-auto my-10 p-6 bg-white border border-solid border-[#324B6F] rounded-[10px] shadow-lg">
           <MdOutlineSearch size={64} className="text-[#324B6F]" />
          <h2 className='font-semibold text-xl mt-4'>
            Smart Condition Matching 
          </h2>
          <p className='mt-2 '>
           AI analyzes patient symptoms against a comprehensive physiotherapy knowledge base to suggest possible conditions with clinical reasoning 

          </p>
        </div> 

      {/* feature 2 */}
       <div  className="flex flex-col items-center text-center max-w-sm mx-auto my-10 p-6 bg-white border border-solid border-[#324B6F] rounded-[10px] shadow-lg">
           <MdAssignmentAdd size={64} className="text-[#324B6F]" />
          <h2 className='font-semibold text-xl mt-4'>
            Auto-generated SOAP notes
          </h2>
          <p className='mt-2 '>
            Professional clinical documentation in seconds. Automatically generate complete SOAP notes from your assessments and save 70-90% of documentation time
          </p>
        </div> 

      {/* feature 3 */}
       <div  className="flex flex-col items-center text-center max-w-sm mx-auto my-10 p-6 bg-white border border-solid border-[#324B6F] rounded-[10px] shadow-lg">
           <MdLanguage size={64} className="text-[#324B6F]" />
          <h2 className='font-semibold text-xl mt-4'>
            Multilingual Support
          </h2>
          <p className='mt-2 '>
           Generate reports and treatment plans in multiple languages. Full interface translation helps you communicate clearly with diverse patient populations
          </p>
        </div>     
     </div>
      </main>
    </div>
  );
}
