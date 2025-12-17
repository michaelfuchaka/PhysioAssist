import Navbar from '@/components/Navbar';
import React from 'react';
import Image from 'next/image';



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
      <div className=' text-[#000000] mt-12 mb-8 '>
        <h1 className=' text-3xl md:text-4xl font-semibold  flex items-center justify-center mb-10'>How It Works</h1>
      
       <div className="flex flex-col md:flex-row justify-between  gap-8 px-6 md:px-12">
       {/* card 1*/}
        <div>
          <Image
          src='/assets/clipboard.png'
          alt='Hero Image'
          width={100}
          height={100}
          className='object-cover'
          priority
          />
          <h2 className='font-semibold text-xl '>
            1.Enter Symptoms 
          </h2>
          <p>
            Detailed input on patient condition

          </p>
        </div> 

       {/* Card 2 */}
      <div>
          <Image
          src='/assets/brain.png'
          alt='Hero Image'
          width={100}
          height={100}
          className='object-cover'
          priority
          />
          <h2 className='font-semibold text-xl '>
            2. AI Matches Symptoms
          </h2>
          <p>
            Cross-reference against medical data
          </p>
        </div>    
     
       {/* Card 3 */}
       <div>
          <Image
          src='/assets/bulb.png'
          alt='Hero Image'
          width={100}
          height={100}
          className='object-cover'
          priority
          />
          <h2 className='font-semibold text-xl '>
           3.Get Clear Recommendations
          </h2>
          <p>
          Personalized treatment plans
          </p>
        </div>  
        </div>   
      </div> 
            
      </main>
    </div>
  );
}
