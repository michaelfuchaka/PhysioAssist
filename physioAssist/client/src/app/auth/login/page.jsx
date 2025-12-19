"use client"
import React , {  useState }  from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Login = () => {
 const [imageError, setImageError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div className=' bg-[#F5F5F5] text-[#000000] min-h-screen'>
    <div className='py-5 px-10 flex justify-between items-center'>
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
        <Link href="#" className='text-s no-underline text-[#324B6F] hover:underline' >Don&apos;t have an account? <strong>Sign Up</strong></Link>
    </div>

        <div className='flex-1 flex justify-center items-center p-5'>
        <div className='bg-white p-10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] w-full max-w-[400px]'>
        {/* login form  */}
        <h2 className='mb-2.5 text-[#333] text-[28px]'>
            Welcome Back
             </h2>
         <p className='text-[#666] text-sm mb-7.5'>
            Please enter your details to sign in
            </p>
         <form >
            {/* email */}
            <div className='mb-5'>
                <label className='block mb-2 text-[#333] text-sm font-medium'> Email</label>
                <input 
                type="email" 
                 placeholder="Enter your email" 
                 value={email}
                className='w-full  p-3 border-2 border-[#e0e0e0] rounded-lg text-sm transition-colors duration-300 focus:outline-none focus:border-[#667eea]'
                 onChange={(e) => setEmail(e.target.value)}
                 required
                />
            </div>
            {/* password */}
            <div className='mb-5'>
            <label className="block mb-2 text-[#333] text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
               className='w-full  p-3 border-2 border-[#e0e0e0] rounded-lg text-sm transition-colors duration-300 focus:outline-none focus:border-[#667eea]'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>

             <div className='text-right mb-5'>
                    <a href="#"className='text-[#324B6F] no-underline text-sm hover:underline ' >
                    Forgot password?
                    </a>
              </div>

             <button type="submit" className="w-full p-3.5  bg-[#324B6F] text-white border-none rounded-lg text-base font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ">
                Sign In
            </button> 

             <div className="text-center my-[25px] text-[#999] text-sm">
                or continue with
                </div>
              <div  className="flex ">
             <button type="button" className="flex-1 p-3 border-2 border-[#e0e0e0] bg-white rounded-lg cursor-pointer text-sm transition-colors duration-300 hover:border-[#324B6F] hover:bg-[#f8f9ff]">
                Google
                </button>
                   
              </div>
         </form>
         </div>
        </div> 
    </div>
  )
}

export default Login




