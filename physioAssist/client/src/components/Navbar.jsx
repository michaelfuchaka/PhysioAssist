'use client'
import React , { useState }  from 'react';
import Image from 'next/image';


const Navbar = () => {
    const [imageError, setImageError] = useState(false);
  
  return (
    <div>
        <nav> 
        {/* Logo */}
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
    </nav>  
    </div>
  )
}

export default Navbar