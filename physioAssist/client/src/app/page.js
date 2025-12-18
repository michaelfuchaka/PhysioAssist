import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React from 'react';
import Image from 'next/image';
import { FiClipboard } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { MdOutlineAssignment, MdLanguage ,  MdAssignmentAdd,MdOutlineSearch  } from 'react-icons/md';


export default function Home() {
     


  return (
    <div className='bg-[#FFFFFF] min-h-screen '>
      <Navbar />

      <main >
       {/* Hero Section */}
      <div className='relative h-[70vh] md:h-[80vh] lg:h-[600px] flex items-center 
      justify-center  '>
        <Image
          src='/assets/heroImg.png'
          alt='Hero Image'
          fill
          className='object-cover'
          priority
          />
           <div className='absolute inset-0 bg-linear-to-r from-black/50 to-transparent'></div>

        <div className='relative z-10 pt-8 px-2 max-w-2xl md:px-12 lg:px-16 ml-10 md:ml-6 lg:ml-2  text-left leading-height'>
          <h1 className='text-3xl md:text-2xl lg:text-4xl font-semibold text-white '
            >
            Supporting Physiotherapists in Clinical Decision Making
          </h1>
          <p className='text-lg md:text-xl text-white font-medium mt-4' >
          AI-powered guidance for faster evaluations, note taking, and treatment planning  
          </p>

          <button className='text-[#FFFFFF] mt-8 font-semibold  text-xl bg-[#324B6F] px-8 py-4 
          border-2  border-[#324B6F] rounded-[20px]  shadow-lg hover:shadow-xl hover:bg-white hover:text-[#324B6F] 
          transition-all duration-300 hover:-translate-y-1 '>
          Start Assessment
        </button>
        </div>
          
        </div>

     { /* how it works section */}
      <div id = 'how-it-works' className='scroll-mt-20  text-[#000000]  py-24 '>
        <h1 className=' text-3xl md:text-4xl font-semibold  flex items-center 
        justify-center mb-10'>
          How It Works</h1>
      
       <div className="flex flex-col md:flex-row justify-between items-center  gap-8 px-6 md:px-12">
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
         {/* arrow */}
        <div className="hidden md:block text-[#324B6F] text-4xl  animate-pulse">→</div>

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
        {/* arrow */}
         <div className="hidden md:block text-[#324B6F] text-4xl  animate-pulse">→</div>

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
     <div id="about" 
      className='bg-[#F8FAFC]  text-[#000000] py-24  '>
      <h2 className=' text-2xl md:text-3xl font-semibold  flex items-center 
        justify-center mb-10'>
        What Makes Us Different</h2>

      <p className="max-w-2xl mx-auto text-center text-lg  leading-relaxed mb-12">
        A clinical decision support platform built to streamline physiotherapy
      assessments, documentation, and treatment planning.
      </p>


      <div className="flex flex-col md:flex-row justify-between gap-8 px-6 md:px-12 
      items-center md:items-stretch">
      {/* feature 1 */}
       <div  className="flex flex-col items-center text-center max-w-sm  p-6
        bg-white border border-solid border-[#324B6F] rounded-[10px] shadow-md hover:shadow-xl hover:-translate-y-2  transition-all duration-300 cursor-pointer ">
          <div className="group">
          <MdOutlineSearch size={64} className="text-[#324B6F] group-hover:scale-110 transition-transform duration-300" />
         </div >
          <h2 className='font-semibold text-xl mt-4'>
            Smart Condition Matching 
          </h2>
          <p className='mt-2 leading-relaxed'>
           AI analyzes patient symptoms against a comprehensive physiotherapy
            knowledge base to suggest possible conditions with clinical reasoning 

          </p>
        </div> 

      {/* feature 2 */}
       <div  className="flex flex-col items-center text-center max-w-sm  p-6 bg-white
        border border-solid border-[#324B6F] rounded-[10px] shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
           <div className="group">
           <MdAssignmentAdd size={64} className="text-[#324B6F] group-hover:scale-110 transition-transform duration-300" />
            </div>
          <h2 className='font-semibold text-xl mt-4'>
            Auto-generated SOAP notes
          </h2>
          <p className='mt-2 leading-relaxed'>
            Professional clinical documentation in seconds. Automatically generate 
            complete SOAP notes from your assessments and save 70-90% of documentation 
            time
          </p>
        </div> 

      {/* feature 3 */}
       <div  className="flex flex-col items-center text-center max-w-sm  p-6 bg-white
        border border-solid border-[#324B6F] rounded-[10px] shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">
         <div className="group">
           <MdLanguage size={64} className="text-[#324B6F] group-hover:scale-110 transition-transform duration-300" />
            </div>
          <h2 className='font-semibold text-xl mt-4'>
            Multilingual Support
          </h2>
          <p className='mt-2 leading-relaxed'>
           Generate reports and treatment plans in multiple languages. Full interface 
           translation helps you communicate clearly with diverse patient populations
          </p>
        </div> 
        </div>    
     </div>

     {/* FAQ */}
     <div id='faq' className='text-[#000000] py-24 bg-[#EFF6FF] '> 
      <h2 className=' text-2xl md:text-3xl font-semibold  flex items-center 
        justify-center mb-10'>
        Frequently Asked Questions</h2>
         <div className='grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 max-w-6xl mx-auto'>
      {/* FAQ 1 */}
       <div className='flex gap-2'>
      <h2 className='font-semibold text-lg mt-4 shrink-0'>
        Q1 —   
        </h2>
        <div>
          <h3 className='font-semibold text-lg mt-4'>
        Is PhysioAssist a diagnostic tool?
        </h3>
      <p className='mt-2 leading-relaxed'>
        No. PhysiAssist is a clinical decision support <br />  tool that assists physiotherapists with symptom <br />analysis and treatment planning. It does not <br /> diagnose or replace professional clinical <br />judgment
        </p>
        </div>
       </div>

       {/* FAQ 2 */}
       <div className='flex gap-2'>
      <h2 className='font-semibold text-lg mt-4 shrink-0'>
        Q2 — 
        </h2>
        <div>
          <h3 className='font-semibold text-lg mt-4'>
        How is patient data handled?
        </h3>
      <p className='mt-2 leading-relaxed'>
       All patient data is stored anonymously  <br /> with no personal identifiers. Our  platform  <br /> is GDPR-compliant and uses secure, <br /> encrypted storage to protect sensitive  <br />information
        </p>
        </div>
       </div>

       {/* FAQ 3 */}
      <div className='flex gap-2'>
      <h2 className='font-semibold text-lg mt-4 shrink-0'>
        Q3 — 
        </h2>
        <div>
          <h3 className='font-semibold text-lg mt-4'>
      What languages are currently supported?
        </h3>
      <p className='mt-2 leading-relaxed'>
      PhysiAssist currently supports English and German  <br /> for full interface and report generation. Additional  <br /> languages are in development and will be added  <br />based on user demand
        </p>
        </div>
       </div>

       {/* FAQ 4 */}
       <div className='flex gap-2'>
      <h2 className='font-semibold text-lg mt-4 shrink-0'>
        Q4 — 
        </h2>
        <div>
          <h3 className='font-semibold text-lg mt-4'>
       Do I need special training to use  <br />PhysioAssist?
        </h3>
      <p className='mt-2 leading-relaxed'>
     No special training required. The interface is  <br />intuitive and designed specifically for busy  <br /> clinical workflows. Most therapists can start  <br /> using it effectively within minutes.
        </p>
        </div>
       </div>
  
       </div>
     </div>
      </main>

      <Footer />
    </div>
  );
}
