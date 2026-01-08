'use client';
import React from 'react'
import Sidebar from "@/components/Sidebar";
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { getCaseById, updateCaseConditions } from '@/lib/api';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';


const Results = () => {
  const params = useParams();
  const caseId = params?.id;
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedConditions, setSelectedConditions] = useState({
  primary: null,
  relevant: []
});

  useEffect(() => {
  const fetchCase = async () => {
    try {
      const data = await getCaseById(caseId);
      setCaseData(data);
      setLoading(false);
        
    // Load saved condition selections
    if (data.selected_primary || data.selected_relevant) {
      setSelectedConditions({
        primary: data.selected_primary,
        relevant: data.selected_relevant || []
      });
    }
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
    }
  };
  if (caseId) fetchCase();
}, [caseId]);

const handlePrimaryChange = (conditionName) => {
  setSelectedConditions(prev => ({
    ...prev,
    primary: prev.primary === conditionName ? null : conditionName
  }));
};

const handleRelevantChange = (conditionName) => {
  setSelectedConditions(prev => ({
    ...prev,
    relevant: prev.relevant.includes(conditionName)
      ? prev.relevant.filter(c => c !== conditionName)
      : [...prev.relevant, conditionName]
  }));
};

if (loading) {
  return (
    <div>
      <Sidebar />
      <main className="ml-60 p-4 bg-[#F5F5F5] text-[#000000] min-h-screen">
        <div className='ml-4'>
          <nav>
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Link href="/dashboard">Dashboard</Link>
              <ChevronRight size={24} />
              <Link href="/newcase">New Case</Link>
            </div>
          </nav>
          <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-[#F5F5F5] shadow-sm max-w-lg p-6 rounded-xl'>
              <h2 className='font-semibold text-[#324B6F] text-xl'>Possible Conditions</h2>
              <p className='text-gray-400 mt-4'>Loading...</p>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='bg-[#F5F5F5] shadow-sm max-w-lg p-6 rounded-xl'>
                <h2 className='font-semibold text-[#324B6F] text-xl'>Recommended Treatment Plan</h2>
                <p className='text-gray-400 mt-4'>Loading...</p>
              </div>
              <div className='bg-[#F5F5F5] shadow-sm max-w-lg p-6 rounded-xl'>
                <h2 className='font-semibold text-[#324B6F] text-xl'>Clinical Documentation</h2>
                <p className='text-gray-400 mt-4'>Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
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
        <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-4'>
          {/* possible conditions */}
        <div className='bg-[#F5F5F5] shadow-sm max-w-lg p-6 rounded-xl '>
            <h2 className='font-semibold text-[#324B6F] text-xl mb-2'>
                Possible Conditions
            </h2>
              {caseData?.ai_conditions?.length > 0 ? (
        <div className='space-y-3 mb-4'>
          {caseData.ai_conditions.map((condition, index) => (
            <div key={index} className='bg-white border border-[#324B6F] rounded-lg p-4'>
              <div className='flex justify-between items-start mb-2'>
                <h3 className='font-semibold'>{condition.condition}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  condition.probability === 'high' ? 'bg-red-100 text-red-700' :
                  condition.probability === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {condition.probability}
                </span>
              </div>
              <p className='text-sm text-gray-600 mb-3'>{condition.reasoning}</p>
             <div className='flex gap-3 text-sm'>
              <label className='flex items-center gap-1'>
                <input 
                  type='checkbox' 
                  checked={selectedConditions.primary === condition.condition}
                  onChange={() => handlePrimaryChange(condition.condition)}
                />
                Mark as Primary Diagnosis
              </label>
              <label className='flex items-center gap-1'>
                <input 
                  type='checkbox'
                  checked={selectedConditions.relevant.includes(condition.condition)}
                  onChange={() => handleRelevantChange(condition.condition)}
                />
                Mark as Relevant
              </label>
            </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-gray-500 mb-4'>No conditions available</p>
      )}
         
       {/* Red Flags */}
      {caseData?.red_flags?.length > 0 && (
        <div className='bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-4'>
          <h3 className='font-semibold text-yellow-800 mb-2'>Red Flags Detected - Consider Referral</h3>
          <p className='text-sm text-yellow-900'>{caseData.red_flags.join(', ')}</p>
        </div>
      )}
     
      
        <div className='flex gap-4'>
        <button 
          onClick={async () => {
            try {
              await updateCaseConditions(caseId, selectedConditions);
              alert('Conditions saved successfully');
            } catch (error) {
              alert(error.message);
            }
          }}
          className="flex-1 bg-[#324B6F] text-white font-medium py-2 px-4 rounded-lg hover:bg-slate-700 transition-colors"
        >
          Save Selections
        </button>
        <button 
        onClick={() => setShowRejectModal(true)}
        title="This will discard current analysis and reanalyze the case"
        className="flex-1 border-2 border-[#324B6F] text-[#324B6F] bg-white font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors" >
          Reject All & Re-analyze
        </button>
        {showRejectModal && (
        <>
      <div 
        className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
        style={{ animation: 'fadeIn 0.3s ease-out' }}
        onClick={() => setShowRejectModal(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md mx-4">
      <h3 className="text-lg font-semibold mb-4">Confirm Re-analysis</h3>
      <p className="text-gray-600 mb-6">
        Are you sure you want to reject all conditions and start a new analysis?
      </p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={() => setShowRejectModal(false)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            setShowRejectModal(false);
            // re-analyze logic will be added here
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Yes, Re-analyze
            </button>
          </div>
        </div>
      </div>
       </>
    )}
          
          </div>
    
                
        </div>
           <div className='flex flex-col gap-4'>
        {/* Recommended treatment plan  */}
        <div  className='bg-[#F5F5F5] shadow-sm max-w-lg p-6 rounded-xl'>
            <h2 className='font-semibold text-[#324B6F] text-xl mb-2'>
                Recommended Treatment Plan
            </h2>
           {caseData?.treatment_plan ? (
        <div className='bg-white  border border-[#324B6F] rounded-lg p-4 whitespace-pre-line text-sm text-black'>
            {caseData.treatment_plan}
        </div>
    ) : (
        <p className='text-gray-500'>No treatment plan available</p>
    )} 
        </div>
        {/* Clinical documentation */}
         <div  className='bg-[#F5F5F5] shadow-sm max-w-lg p-6 rounded-xl'>
            <h2 className='font-semibold text-[#324B6F] text-xl mb-2'>
                Clinical Documentation
            </h2>
                {caseData?.soap_note ? (
        <div className='grid grid-cols-2 gap-4'>
            <div className='bg-white rounded-lg p-4'>
                <h3 className='font-semibold mb-2'>Subjective</h3>
                <p className='text-sm text-black'>{caseData.soap_note.subjective}</p>
            </div>
            <div className='bg-white  rounded-lg p-4'>
                <h3 className='font-semibold mb-2'>Objective</h3>
                <p className='text-sm text-black'>{caseData.soap_note.objective}</p>
            </div>
            <div className='bg-white  rounded-lg p-4'>
                <h3 className='font-semibold mb-2'>Assessment</h3>
                <p className='text-sm text-black'>{caseData.soap_note.assessment}</p>
            </div>
            <div className='bg-white  rounded-lg p-4'>
                <h3 className='font-semibold mb-2'>Plan</h3>
                <p className='text-sm text-black'>{caseData.soap_note.plan}</p>
            </div>
        </div>
    ) : (
        <p className='text-gray-500'>No clinical documentation available</p>
    )}

        </div>
        </div>
        </div>
        </div>
      </main>
    </div>
  )
}

export default Results
