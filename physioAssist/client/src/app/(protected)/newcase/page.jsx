'use client';
import React, { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import { ChevronRight,  Check } from 'lucide-react';
import Link from 'next/link';

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

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const fieldError = validate({ ...values, [name]: values[name] });
    setErrors(prev => ({ ...prev, [name]: fieldError[name] }));
  };

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

            <form
              className="space-y-4"
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
              
              {/* Pain Region */}
              <input
                type="text"
                name="painRegion"
                placeholder="Pain Region *"
                value={values.painRegion}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("painRegion")}
              />
              {errors.painRegion && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.painRegion}
                </p>
              )}

              {/* Symptoms */}
              <input
                type="text"
                name="symptoms"
                placeholder="Symptoms *"
                value={values.symptoms}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("symptoms")}
              />
              {errors.symptoms && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.symptoms}
                </p>
              )}

              {/* Duration */}
              <input
                type="text"
                name="duration"
                placeholder="Duration *"
                value={values.duration}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("duration")}
              />
              {errors.duration && (
                <p role="alert" className="text-sm text-red-600">
                  {errors.duration}
                </p>
              )}

              {/* Optional Fields */}
              <input
                type="text"
                name="aggravating"
                placeholder="Aggravating Factors (Optional)"
                value={values.aggravating}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border border-[#324B6F]"
              />

              <input
                type="text"
                name="additional"
                placeholder="Additional Information (Optional)"
                value={values.additional}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#F5F5F5] rounded-xl border border-[#324B6F]"
              />

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  className="flex-1 bg-[#E0E0E0] font-semibold py-3 rounded-lg hover:bg-[#D0D0D0]"
                >
                  Save Draft
                </button>

                <button
                  type="submit"
                  disabled={!formIsValid}
                  className={`flex-1 font-semibold py-3 rounded-lg transition-colors ${
                    formIsValid
                      ? "bg-[#324B6F] text-white hover:bg-slate-700"
                      : "bg-gray-400 cursor-not-allowed text-white"
                  }`}
                >
                  Analyze Symptoms
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
