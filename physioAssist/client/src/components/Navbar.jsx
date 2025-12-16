'use client'
import React , { useEffect, useState }  from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {
    const [imageError, setImageError] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
   

    // Prevent body scroll when menu is open
    useEffect ( () => {
         if (isMenuOpen) {
             document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }    
        return () => {
            document.body.style.overflow = 'unset';
        };
     }, [isMenuOpen]);
     
     
    const closeMenu = () => setIsMenuOpen(false); 


  return (
    <div className='fixed top-0 left-0 w-full z-50'>
        <nav className='flex items-center justify-between h-16 bg-white px-4 md:px-8'> 
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
    {/*  Desktop Navigation   */}
    <div className="hidden flex-1  md:flex  justify-center ">
      <ul className='flex gap-16 ml-8 text-2xl'>
        <li>
        <Link href="/" className=" text-[#324B6F]  hover:text-[#3D7AC4] transition-colors
         duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 
         after:w-0 after:bg-[#3D7AC4] after:transition-all after:duration-300 
         hover:after:w-full">
            Home
        </Link>
        </li>
        <li>
        <Link href="/#How-it-works" className=" text-[#324B6F]  hover:text-[#3D7AC4] 
        transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 
        after:h-0.5 after:w-0 after:bg-[#3D7AC4] after:transition-all after:duration-300 
        hover:after:w-full">
            How it works
        </Link>
        </li>
      </ul>
    </div>

     {/* Desktop Login Button */}
    <div className=" hidden md:block  shrink-0">
    <button className='text-[#324B6F] text-xl font-semibold border-2 border-[#324B6F] 
    rounded-lg px-4 py-1 hover:bg-[#324B6F] hover:text-white transition-all
     duration-300 hover:scale-105'>
        Login
    </button>
    </div>

    {/* Mobile: Login + Hamburger */}
    <div className="flex md:hidden items-center gap-4">
        <button className='text-[#324B6F] text-base font-semibold border-2 border-[#324B6F] rounded-lg px-3 py-1 hover:bg-[#324B6F] hover:text-white transition-all duration-300'>
            Login
        </button>
        
        {/* Hamburger Button */}
        <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='w-10 h-10 flex flex-col justify-center items-center gap-1.5'
            aria-label="Menu"
        >
            <span className={`w-6 h-0.5 bg-[#324B6F] transition-all duration-300
                ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#324B6F] transition-all duration-300 
                ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-[#324B6F] transition-all duration-300 
                ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
    </div>
    </nav>  
    
    {/* Mobile Menu Overlay */}
    {isMenuOpen && (
    <>
        {/* Backdrop */}
        <div 
            className='md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
            onClick={closeMenu}
        ></div>
         {/* Slide-in Menu */}
        <div className='md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-2xl z-50'>
        <div className='flex flex-col p-8 pt-20'>
            <Link 
                href="/"
                onClick={closeMenu}
                className='text-[#324B6F] text-xl py-4 border-b border-gray-200
                    hover:text-[#3D7AC4] hover:pl-2 transition-all duration-200'
            >
                Home
            </Link>
            
            <Link 
                href="/#how-it-works"
                onClick={closeMenu}
                className='text-[#324B6F] text-xl py-4 border-b border-gray-200 
                hover:text-[#3D7AC4] hover:pl-2 transition-all duration-200'
            >
                How it works
            </Link>
        </div>
        </div>
    </>
)}

    </div>
  )
}

export default Navbar