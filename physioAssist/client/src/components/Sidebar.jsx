'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getCurrentUser } from '@/lib/api';

const Sidebar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
             
                setUser(userData);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, []);

    return (
        <aside className="fixed top-0 left-0 h-full w-60 p-4 text-black bg-[#FFFFFF] border-r border-gray-200">
            {/* Logo Section */}
            <div className='mb-6'>
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
                    <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
                    </div>
                </div>
            ) : user ? (
                <div className="mb-6 flex items-center gap-3 pb-4 border-b border-gray-200">
                    {/* User Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
                        {user.avatar ? (
                            <Image
                                src={user.avatar}
                                alt={user.name || 'User'}
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                        ) : (
                            <span className="text-lg font-semibold text-gray-600">
                                {user.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                        )}
                    </div>
                    {/* User Info */}
                    <div className="flex-1 overflow-hidden">
                        <p className="font-semibold text-sm text-gray-900 truncate">
                            {user.name || 'User'}
                        </p>
                        
                    </div>
                </div>
            ) : null}

            {/* Navigation */}
            <nav className="mt-24">
                <ul className="space-y-2">
                    <li>
                        <a href="/dashboard" className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/new-case" className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                            New Case
                        </a>
                    </li>
                    <li>
                        <a href="/case-history" className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                            Case History
                        </a>
                    </li>
                    <li>
                        <a href="/settings" className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                            Settings
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Language Toggle & Log Out at Bottom */}
            <div className="absolute bottom-4 left-4 right-4 space-y-2 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm text-gray-600">EN | DE</span>
                </div>
                <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    Log Out
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;