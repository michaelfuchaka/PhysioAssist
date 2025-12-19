import React, { useState } from 'react';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-black">✕</button>
        <h2 className="text-2xl font-bold mb-4 text-[#324B6F]">Contact PhysiAssist</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#324B6F] outline-none" />
          <input type="email" placeholder=" Email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#324B6F] outline-none" />
          <textarea placeholder="How can we help?" rows="4" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#324B6F] outline-none" />
          <button className="w-full bg-[#324B6F] text-white font-semibold py-3 rounded-lg hover:bg-slate-700 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};
export default ContactModal;