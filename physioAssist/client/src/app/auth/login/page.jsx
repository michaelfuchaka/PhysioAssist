"use client"
import React , {  useState }  from 'react';
import Image from 'next/image';

const login = () => {
 const [imageError, setImageError] = useState(false);


  return (
    <div>
    <div >
        <a href="#" >
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
        </a>
        <a href="#" >Don&apos;t have an account? <strong>Sign Up</strong></a>
    </div>

        <div>
        {/* login form  */}
        <h2>Welcome Back </h2>
         <p>Please enter your details to sign in</p>
         <form >
            {/* email */}
            <div>
                <label> Email</label>
                <input 
                type="email" 
                 placeholder="Enter your email" 
                //  value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 required
                />
            </div>
            {/* password */}
            <div>
            <label className="">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
            //   value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>

             <div >
                    <a href="#">Forgot password?</a>
              </div>

             <button type="submit" >
                Sign In
            </button> 

             <div >or continue with</div>
              <div >
             <button type="button" >
                Google
                </button>
                   
              </div>
         </form>
         </div>
    </div>
  )
}

export default login