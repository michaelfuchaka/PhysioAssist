'use client'
import React , { useEffect, useState }  from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCurrentUser, logout } from '@/lib/api';
import { useRouter } from 'next/navigation';


const Navbar = () => {
    const [imageError, setImageError] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const router = useRouter();

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

    useEffect(() => {
    const fetchUser = async () => {
        try {
            const userData = await getCurrentUser();
            setUser(userData);
        } catch (error) {
            setUser(null);
        }
    };
    fetchUser();
   }, []); 
     
     
    const closeMenu = () => setIsMenuOpen(false); 

  const handleLogout = async () => {
    try {
        await logout();
        setUser(null);
        router.push('/auth/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
   };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
 };

  return (
    <div className='fixed top-0 left-0 w-full z-50'>
        <nav className='flex items-center justify-between h-16 bg-white px-4 md:px-8 relative z-50'> 
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
        <Link href="/#how-it-works" className=" text-[#324B6F]  hover:text-[#3D7AC4] 
        transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 
        after:h-0.5 after:w-0 after:bg-[#3D7AC4] after:transition-all after:duration-300 
        hover:after:w-full">
            How it works
        </Link>
        </li>
      </ul>
    </div>

     {/* Desktop Login Button */}
     <div className="hidden md:flex">
    {user ? (
    <div className="relative">
        <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
            <div className="w-10 h-10 rounded-full bg-[#324B6F] text-white flex items-center justify-center font-semibold text-sm">
                {getInitials(user.name)}
            </div>
        </button>
        
        {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-2 border-b border-gray-200">
                    <p className="font-semibold text-sm text-[#324B6F]">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link 
                    href="/dashboard" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-[#324B6F] hover:bg-gray-50"
                >
                    Dashboard
                </Link>
                <Link 
                    href="/settings" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-[#324B6F] hover:bg-gray-50"
                >
                    Settings
                </Link>
                <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                    Logout
                </button>
            </div>
        )}
        </div>
    ) : (
        <Link href="/auth/login">
            <button className='text-[#324B6F] text-xl font-semibold border-2 border-[#324B6F] 
            rounded-lg px-4 py-1 hover:bg-[#324B6F] hover:text-white transition-all
            duration-300 hover:scale-105'>
                Login
            </button>
        </Link>
    )}
   </div>
    {/* Mobile: Hamburger */}
    <div className="flex md:hidden">
        {/* Hamburger Button */}
        <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='w-10 h-10 flex flex-col justify-center items-center gap-1.5 relative z-70'
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
            className='md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 '
            style={{ animation: 'fadeIn 0.3s ease-out' }}
            onClick={closeMenu}
        ></div>
         {/* Slide-in Menu */}
        <div className='md:hidden fixed top-16 right-0 h-[calc(100%-4rem)] w-64 bg-white shadow-2xl z-50 '
         style={{ animation: 'slideIn 0.3s ease-out' }}>
        <div className='flex flex-col p-8 pt-8'>
            {user && (
            <>
                <button 
                    onClick={() => setIsAccountOpen(!isAccountOpen)}
                    className='text-[#324B6F] text-xl py-4 border-b border-gray-200
                        hover:bg-gray-50 transition-all duration-200 text-left flex items-center justify-between'
                >
                    Account
                    <span className={`transition-transform duration-200 ${isAccountOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {isAccountOpen && (
                <>
                    <div className='px-4 py-3 ml-4'>
                        <p className="font-semibold text-sm text-[#324B6F]">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link 
                        href="/dashboard"
                        onClick={closeMenu}
                        className='text-[#324B6F] text-xl py-4 ml-4
                            hover:text-[#3D7AC4] hover:pl-2 transition-all duration-200'
                    >
                        Dashboard
                    </Link>
                    <Link 
                        href="/settings"
                        onClick={closeMenu}
                        className='text-[#324B6F] text-xl py-4 ml-4
                            hover:text-[#3D7AC4] hover:pl-2 transition-all duration-200'
                    >
                        Settings
                    </Link>
                </>
                )}
            </>
            )}
            {!isAccountOpen && (
            <>
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
            </>
            )}
            {user && (
            <button 
                onClick={() => { handleLogout(); closeMenu(); }}
                className='w-full text-left text-red-600 text-xl py-4 border-b border-gray-200
                    transition-all duration-200'
            >
                Logout
            </button>
            )}
            {!user && (
            <Link 
                href="/auth/login" 
                onClick={closeMenu}
                className='text-[#324B6F] text-xl py-4 border-b border-gray-200 
                hover:text-[#3D7AC4] hover:pl-2 transition-all duration-200'
            >
                Login
            </Link>
            )}
        </div>
        </div>
    </>
)}

    </div>
  )
}

export default Navbar