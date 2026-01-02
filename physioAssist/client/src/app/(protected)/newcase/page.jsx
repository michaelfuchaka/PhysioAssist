'use client';
import React from 'react'
import Sidebar from "@/components/Sidebar"; 
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from "react";


const NewCase = () => {
  const [values, setValues] = useState({
    painRegion: "",
    symptoms: "",
    duration: "",
    aggravating: "",
    additional: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (fieldValues = values) =>{
    const newErrors = {};

    if (!fieldValues.painRegion.trim()) {
    newErrors.painRegion = "Pain region is required";
  }
   if (!fieldValues.symptoms.trim()) {
    newErrors.symptoms = "Symptoms are required";
  }

  if (!fieldValues.duration.trim()) {
    newErrors.duration = "Duration is required";
  }

  return newErrors;

  };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setValues(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleBlur = (e) => {
  if (!submitted) return;

  const { name } = e.target;
  const fieldErrors = validate({ [name]: values[name] });

  setErrors(prev => ({
    ...prev,
    ...fieldErrors
  }));
};

  return (
    <div> 
      <Sidebar />
       <main className="ml-60 p-4 bg-[#F5F5F5] text-[#000000] min-h-screen">
        <div className='ml-4'>
          <nav>
        <div className="flex items-center gap-2 text-lg font-semibold">
            <Link href="/dashboard">Dashboard</Link>
            <ChevronRight size={24} className="" />
            <Link href="/newcase">New Case</Link>
        </div>
        </nav>
        {/* Page Header */}
        <div className='mt-8 bg-white shadow-sm max-w-lg mx-auto p-6 rounded-xl'> 
          <h2 className='text-xl font-bold mb-4 text-center'>
            New Patients Symptom Analysis
          </h2>
              {/* Form Inputs */}
          <form className='space-y-4'
           onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);

          const validationErrors = validate();
          setErrors(validationErrors);

          if (Object.keys(validationErrors).length === 0) {
            console.log("Form is valid, proceed");
          }
        }}
          >
            <input 
            type="text" 
            name="painRegion"
            placeholder="Pain Region" 
            value={values.painRegion}
            onChange={handleChange}
            onBlur={handleBlur}
            required 
            className=' w-full px-4 py-3  bg-[#F5F5F5]
             rounded-xl  border border-[#324B6F] focus:outline-none  focus:border-[#324B6F]' />
          <input type="text" placeholder="Symptoms" required className=' w-full px-4 py-3  bg-[#F5F5F5]
             rounded-xl  border border-[#324B6F] focus:outline-none  focus:border-[#324B6F]' />
          <input type="text" placeholder="Duration " required className=' w-full px-4 py-3  bg-[#F5F5F5]
             rounded-xl  border border-[#324B6F] focus:outline-none  focus:border-[#324B6F]' />
           <input type="text" placeholder="Aggravating Factors (Optional)" className=' w-full px-4 py-3  bg-[#F5F5F5]
             rounded-xl  border border-[#324B6F] focus:outline-none  focus:border-[#324B6F]' />
          <input type="text" placeholder="Additional Information(Optional) "  className=' w-full px-4 py-3  bg-[#F5F5F5]
             rounded-xl  border border-[#324B6F] focus:outline-none  focus:border-[#324B6F]' />
         <div className='flex gap-4 mt-6'>
         <button className="flex-1 bg-[#E0E0E0] font-semibold py-3 rounded-lg hover:bg-[#D0D0D0] transition-colors">
          Save Draft
          </button>
         <button className="flex-1 bg-[#324B6F] text-white font-semibold py-3 rounded-lg hover:bg-slate-700 transition-colors">
          Analyze Symptoms
          </button>
          </div>
         </form>
        </div>
        </div>
      </main>  
    
    </div>
  )
}

export default NewCase;