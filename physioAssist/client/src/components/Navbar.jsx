'use client'
import React , { useState }  from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const [imageError, setImageError] = useState(false);
  
  return (
    <div className='fixed top-0 left-0 w-full z-10'>
        <nav className='flex items-center h-16 bg-white px-8'> 
        {/* Logo */}
    <div className='shrink-0'>
        {imageError ? (
            <span style={{ color: '#324B6F', fontWeight: 'bold', fontSize: '16px' }}>
                PhysioAssist
            </span>
        ) : (
            <Image
                src="/assets/logo.png"
                alt="Logo"
                width={200}
                height={60}
                priority
                onError={() => setImageError(true)}
            />
        )}
    </div>
    {/* Navigation   */}
    <div className="flex-1 flex justify-center ">
      <ul className='flex gap-16 ml-8 text-2xl'>
        <li>
        <Link href="/" className=" text-[#324B6F]  hover:bg-gray-100 transition-colors duration-200">
            Home
        </Link>
        </li>
        <li>
        <Link href="/#How-it-works" className=" text-[#324B6F]  hover:bg-gray-100 transition-colors duration-200">
            How it works
        </Link>
        </li>
      </ul>
    </div>
    {/* button */}
    <div className="shrink-0">
    <button className='text-[#324B6F] text-xl font-semibold border-3 border-[#324B6F] rounded-lg px-4 py-1'>Login</button>
    </div>
    </nav>  
    </div>
  )
}

export default Navbar