'use client'
import React from 'react';
import Image from  'next/image';
import { useState } from 'react';


const Sidebar = () => {
    const [imageError, setImageError] = useState(false);

      if (imageError) {
    
    return (
      <span style={{ color: '[#324B6F]', fontWeight: 'bold', fontSize: '16px' }}>
        Logo
      </span>
    );
  }

  return (
    <aside  className=" fixed top-0 left-0 h-full w-64 p-4 text-black bg-[#FFFFFF]">
    <div className='   flex justify-center items-center h-24'>
        <Image
        src = "/assets/logo.png"
        alt ="Logo"
        width ={150}
        height={150}
        priority
        />

    </div>
    </aside>
  )
}

export default Sidebar