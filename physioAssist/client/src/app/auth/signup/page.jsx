"use client"
import React , {  useState }  from 'react';
import Image from 'next/image';
import Link from 'next/link';
  

const SignUp = () => {
const [imageError, setImageError] = useState(false);
const [fullName, setFullName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');


  return (
    <div  className=' bg-[#F5F5F5] text-[#000000] min-h-screen'>
     <div className='py-2 px-10 flex justify-between items-center'>
            <Link href="#" className='cursor-pointer' >
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
            </Link>
            <Link href="/auth/login" className='text-s no-underline text-[#324B6F] hover:underline' >Already have an account? <strong>Sign In</strong></Link>
        </div>
        <div className='flex-1 flex justify-center items-center p-5 pt-0'>
         <div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-[400px]'>
           {/* signup form */}
          <h2 className='mb-2 text-[#333] text-xl font-semibold'>
            Create Account
          </h2>
          <p className='text-[#666] text-sm mb-4'>
            Please enter your details to sign up
          </p>

          <form >
            {/* full name */}
            <div className='mb-4'>
              <label className='block mb-2 text-[#333] text-sm font-medium'>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                className='w-full p-3 border-2 border-[#e0e0e0] rounded-lg text-sm transition-colors duration-300 focus:outline-none focus:border-[#667eea]'
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

             {/* email */}
            <div className='mb-4'>
              <label className='block mb-2 text-[#333] text-sm font-medium'>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                className='w-full p-3 border-2 border-[#e0e0e0] rounded-lg text-sm transition-colors duration-300 focus:outline-none focus:border-[#667eea]'
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* password */}
            <div className='mb-4'>
              <label className="block mb-2 text-[#333] text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                className='w-full p-3 border-2 border-[#e0e0e0] rounded-lg text-sm transition-colors duration-300 focus:outline-none focus:border-[#667eea]'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* confirm password */}
            <div className='mb-4'>
              <label className="block mb-2 text-[#333] text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                className='w-full p-3 border-2 border-[#e0e0e0] rounded-lg text-sm transition-colors duration-300 focus:outline-none focus:border-[#667eea]'
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="w-full p-3.5 bg-[#324B6F] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 mb-4">
              Sign Up
            </button>
          
    
          </form>
         </div>
        </div>

    </div>
  )
}

export default SignUp
