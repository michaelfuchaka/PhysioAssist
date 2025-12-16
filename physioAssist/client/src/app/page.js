import Navbar from '@/components/Navbar';
import React from 'react';
import Image from 'next/image';



export default function Home() {
     


  return (
    <div className='bg-[#FFFFFF] min-h-screen '>
      <Navbar />
      <main >
       {/* hero */}
        <div className='relative h-[600px] flex items-center justify-center'>
          <Image
            src='/assets/heroImg.png'
            alt='Hero Image'
            fill
            className='object-cover absolute inset-0 bg-black/20'
            priority
            />
          <div className='relative z-10 pt-32 px-8 text-center  max-w-4xl mx-auto'>
            <h1 className='text-4xl md:text-5xl font-semibold text-[#1E3A5F]'>
              Supporting Physiotherapists in Clinical Decision Making
            </h1>
            <p className='text-lg md:text-xl text-[#374151] font-medium mt-4'>
            AI-powered guidance for faster evaluations, note taking, and treatment planning  
            </p>
          </div>
          
        </div>
      </main>
    </div>
  );
}
