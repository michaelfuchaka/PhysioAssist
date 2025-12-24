'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getCurrentUser } from '@/lib/api';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/api';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, []);

    const handleLogout = async () => {
    try {
        await logout();
        setUser(null);
        router.push('/auth/login');
    } catch (error) {
        console.error('Logout failed:', error);
    }
   };

    return (
    <aside className="fixed top-0 left-0 h-full w-60 p-4 text-black bg-[#FFFFFF] border-r border-gray-200 flex flex-col">
            {/* Logo Section */}
            <div className='mb-0'>
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

            {/* User Profile Section */}
            {loading ? (
                <div className="mb-6 flex items-center gap-3">
                    <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    </div>
                </div>
            ) : user ? (
               <div className="flex flex-col items-center gap-2 pb-4 border-b border-gray-200">
                    {/* User Avatar */}
                    <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                            <Image
                                src={user.avatar}
                                alt={user.name || 'User'}
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                        ) : (
                            <span className="text-xl font-semibold text-gray-600">
                                {user.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                    {/* User Info */}
                    <div className="text-center">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                            {user.name || 'User'}
                        </p>
                        
                    </div>
                </div>
            ) : null}
            {/* Navigation */}
            <nav className="mt-6">
                <ul className="space-y-2">
                    <li>
                        <Link href="/"className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathname === '/' ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathname === '/dashboard' ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/newcase"  className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathname === '/newcase' ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}>

                            New Case
                        </Link>
                    </li>
                    <li>
                        <Link href="/casehistory" className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathname === '/casehistory' ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}>
                            Case History
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" className={`block px-4 py-2 rounded-lg transition-colors duration-200 ${pathname === '/settings' ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}>
                            Settings
                        </Link>
                    </li>
                </ul>
            </nav>
            

            {/* Language Toggle & Log Out at Bottom */}
          <div className="mt-auto space-y-2 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm text-gray-600">EN | DE</span>
                </div>
         <button 
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
            Log Out
        </button>
            </div>
        </aside>
    );
}

export default Sidebar;