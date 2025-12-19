"use client"
import React, { useState } from 'react'
import ContactModal from '@/app/ContactModal/page.jsx';

const Footer = () => {

 const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='text-[#000000]  '>
           <div className='px-6 md:px-12 '>
     <div className='flex flex-col md:flex-row justify-between gap-8  text-sm'>
    <div className="flex-1 min-w-[150px]">
        <h3 className='font-semibold text-lg mt-4'>
        Company
        </h3>
        <a href="#about" className="hover:underline cursor-pointer block py-1.5">
            About PhysiAssist
         </a>


         <a href="#how-it-works" className="hover:underline cursor-pointer block py-1.5">
        <p>How It Works</p>
          </a>
        <button 
        onClick={() => setIsModalOpen(true)} 
        className="hover:underline cursor-pointer block py-1.5 text-left"
        >
        Contact Us
        </button>
    </div>
   
    <div className="flex-1 min-w-[150px]">
        <h3 className='font-semibold text-lg mt-4'>
        Legal
        </h3>
        <p className="py-1.5">Privacy Policy</p>
        <p className="py-1.5">Terms of Service</p>
        <p className="py-1.5">Data Security</p>
    </div>

     <div className="flex-1 min-w-[150px]">
        <h3 className='font-semibold text-lg mt-4'>
        Help Center
        </h3>
         <a href="#faq" className="hover:underline cursor-pointer block py-1.5">
        <p>FAQ</p>
        </a>
        <p className="py-1.5">@physioassist@gmail.com</p>
      
    </div>


     <div className="flex-1 min-w-[150px]">
        <h3 className='font-semibold text-lg mt-4'>
       Language
        </h3>
        <p className="py-1.5">Language Selector: EN | DE</p>

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