"use client"
import React, { useState } from 'react'
import ContactModal from '@/app/ContactModal/contactModal';

const Footer = () => {

 const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='text-[#000000] py-4 '>
           <div className='px-6 md:px-12 '>
     <div className='flex justify-between gap-8'>
    <div className="flex-1 min-w-[150px]">
        <h3 className='font-semibold text-lg mt-4'>
        Company
        </h3>
        <a href="#about" className="hover:underline cursor-pointer block">
            About PhysiAssist
         </a>


         <a href="#how-it-works" className="hover:underline cursor-pointer block ">
        <p>How It Works</p>
          </a>
        <button 
        onClick={() => setIsModalOpen(true)} 
        className="hover:underline cursor-pointer block text-left"
        >
        Contact Us
        </button>
    </div>
   
    <div className="flex-1 min-w-[150px]">
        <h3 className='font-semibold text-lg mt-4'>
        Legal
        </h3>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Data Security</p>
    </div>

     <div className="flex-1 min-w-[150px]">
        <h3 className='font-semibold text-lg mt-4'>
        Help Center
        </h3>
         <a href="#faq" className="hover:underline cursor-pointer block ">
        <p>FAQ</p>
        </a>
        <p>@physioassist@gmail.com</p>
      
    </div>


     <div className="flex-1 min-w-[150px]">
        <h3 className='font-semibold text-lg mt-4'>
       Language
        </h3>
        <p>Language Selector: EN | DE</p>

    </div>

    </div>
   </div>
       <div className='border-t border-gray-200 mt-5 pt-2 text-center'>
        <p>© 2025 PhysioAssist. All rights reserved.</p>
      </div>  

    <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  )
}

export default Footer