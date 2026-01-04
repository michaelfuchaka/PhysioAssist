'use client';
import React, { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import { ChevronRight,  Check } from 'lucide-react';
import Link from 'next/link';

const NewCase = () => {
  // Form state
  const [values, setValues] = useState({
    painRegion: "",
    symptoms: "",
    duration: "",
    aggravating: "",
    additional: ""
  });

    // Character limits
  const charLimits = {
    symptoms: 500,
    aggravating: 300,
    additional: 500
  };

  // Validation state
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (fieldValues = values) => {
    const newErrors = {};

    if (!fieldValues.painRegion?.trim()) {
      newErrors.painRegion = "Pain region is required";
    }
    if (!fieldValues.symptoms?.trim()) {
      newErrors.symptoms = "Symptoms are required";
    }
    if (!fieldValues.duration?.trim()) {
      newErrors.duration = "Duration is required";
    }
    
    // Character limit validation
  if(fieldValues.symptoms?.length > charLimits.symptoms){
    newErrors.symptoms = `Symptoms must be under ${charLimits.symptoms} characters`;
  }
  if(fieldValues.aggravating?.length > charLimits.aggravating){
    newErrors.aggravating = `Aggravating factors must be under ${charLimits.aggravating} characters`;
  }
  if(fieldValues.additional?.length > charLimits.additional){
    newErrors.additional = `Additional information must be under ${charLimits.additional} characters`;
  }
    return newErrors;
  };
// Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  

 // Clear error for this field if it was previously submitted  
  if(submitted){
      const updatedValues = { ...values, [name]: value };
      const fieldError = validate(updatedValues);
      
      if (fieldError[name]) {
        setErrors(prev => ({ ...prev, [name]: fieldError[name] }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const handleBlur = (e) => {
  const { name } = e.target;
  const fieldError = validate({ ...values, [name]: values[name] });
  
  
  if (fieldError[name]) {
    setErrors(prev => ({ ...prev, [name]: fieldError[name] }));
  } else {
 
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }
};
//  Check if form is valid
  const formIsValid =
    values.painRegion.trim() &&
    values.symptoms.trim() &&
    values.duration.trim() &&
    Object.keys(errors).length === 0;

  const inputClass = (field) =>
    `w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border focus:outline-none ${
      errors[field]
        ? "border-red-500"
        : submitted && values[field].trim()
        ? "border-green-500"
        : "border-[#324B6F]"
    }`;

  // Character counter component
  const CharCounter = ({ current, max }) => {
    const percentage = (current / max) * 100;
    const isNearLimit = percentage > 80;
    const isOverLimit = percentage > 100;
    
   return (
      <div className={`text-xs text-right mt-1 ${
        isOverLimit ? 'text-red-600 font-semibold' : 
        isNearLimit ? 'text-orange-500' : 
        'text-gray-500'
      }`}>
        {current} / {max} characters
      </div>
    );
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Form submitted:', values);
        alert('Analysis complete! Results would appear here.');
      } catch (error) {
        console.error('Analysis Failed', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
 

  return (
    <div>
      <Sidebar />
      <main className="ml-60 p-4 bg-[#F5F5F5] text-[#000000] min-h-screen">
        <div className="ml-4">
          <nav>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Link href="/dashboard">Dashboard</Link>
              <ChevronRight size={24} />
              <Link href="/newcase">New Case</Link>
            </div>
          </nav>

          <div className="mt-8 bg-white shadow-sm max-w-lg mx-auto p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4 text-center">
              New Patients Symptom Analysis
            </h2>
        {/* Form submission handling */}
            <form
              className="space-y-4"
              onSubmit ={async (e) =>{
                e.preventDefault();
                setSubmitted(true);
                const validationErrors = validate();
                setErrors(validationErrors);

                if(Object.keys(validationErrors).length === 0){
                  setIsLoading(true);
                  try{
                    // simulate API call
                    await new Promise(resolve => setTimeout (resolve, 2000));
                    console.log('form is valid, proceed');
                    // Navigate to results page or handle success
                  }
                  catch (error){
                    console.error('Analysis Failed', error);
                  }
                  finally{
                    setIsLoading (false);
                  }
                }
              }}
            >
              
              {/* Pain Region */}
              <div className="relative">
                <label htmlFor="painRegion" className="block text-sm font-medium mb-2 text-gray-700">
              Pain Region <span className="text-red-500">*</span>
            </label>
              <input
                id="painRegion"
                type="text"
                name="painRegion"
                placeholder="e.g., Lower back, Right knee, Left shoulder"
                value={values.painRegion}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("painRegion")}
              />
              {submitted && values.painRegion.trim() && !errors.painRegion && (
              <Check className="absolute right-3 top-3.5 text-green-500" size={20} />
            )}
              </div>
              {errors.painRegion && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.painRegion}
                </p>
              )}

              {/* Symptoms */}
              <div className="relative">
                <label htmlFor="symptoms" className="block text-sm font-medium mb-2 text-gray-700">
              Symptoms <span className="text-red-500">*</span>
            </label>
               <input
               id="symptoms"
                name="symptoms"
                placeholder="e.g., Sharp pain, stiffness, swelling"
                value={values.symptoms}
                onChange={handleChange}
                onBlur={handleBlur}
               rows={4}
                className={inputClass("symptoms")}
              />
              {submitted && values.symptoms.trim() && !errors.symptoms && (
              <Check className="absolute right-3 top-3.5 text-green-500" size={20} />
            )}
              </div>
              {errors.symptoms && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.symptoms}
                </p>
              )}
              <CharCounter 
              current={values.symptoms.length} 
              max={charLimits.symptoms}
            />

              {/* Duration */}
              <div className="relative">
                <label htmlFor="duration" className="block text-sm font-medium mb-2 text-gray-700">
                  Duration <span className="text-red-500">*</span>
                </label>
              <input
                id="duration"
                type="text"
                name="duration"
                placeholder="e.g., 3 days, 2 weeks, 6 months"
                value={values.duration}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("duration")}
              />
               {submitted && values.duration.trim() && !errors.duration && (
                <Check className="absolute right-3 top-3.5 text-green-500" size={20} />
              )}
              </div>
              {errors.duration && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.duration}
                </p>
              )}

              {/* Optional Fields */}
              <div className="relative">
                <label htmlFor="aggravating" className="block text-sm font-medium mb-2 text-gray-700">
                  Aggravating Factors <span className="text-gray-400">(Optional)</span>
                </label>
              <input
                id="aggravating"
                name="aggravating"
                placeholder="e.g., Walking, bending, standing"
                value={values.aggravating}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border border-[#324B6F]"
              />
              <CharCounter 
              current={values.aggravating.length} 
              max={charLimits.aggravating}
            />
              </div>
              <div className="relative">
                <label htmlFor="additional" className="block text-sm font-medium mb-2 text-gray-700">
                Additional Information <span className="text-gray-400">(Optional)</span>
              </label>
               <input 
                id="additional"
                name="additional"
               placeholder="e.g., Previous injuries, medications"
                value={values.additional}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border border-[#324B6F]"
              />
              <CharCounter 
                current={values.additional.length} 
                max={charLimits.additional}
              />
              </div>
              {/* buttons  */}
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  className="flex-1 bg-[#E0E0E0] font-semibold py-3 rounded-lg hover:bg-[#D0D0D0]"
                >
                  Save Draft
                </button>
                    {/* button only active after forms are filled */}
                <button
                  type="submit"
                  disabled={!formIsValid || isLoading}
                  className={`flex-1 font-semibold py-3 rounded-lg transition-colors ${
                    formIsValid && !isLoading
                      ? "bg-[#324B6F] text-white hover:bg-slate-700"
                      : "bg-gray-400 cursor-not-allowed text-white"
                  }`}
               >
              {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  fill="none"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Analyzing...
            </span>
          ) : (
            "Analyze Symptoms"
          )}
                 
            </button>
             </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewCase;
