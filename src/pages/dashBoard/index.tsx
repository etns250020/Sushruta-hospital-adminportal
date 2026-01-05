import { ArrowRight, Facebook, Twitter } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="relative min-h-[90vh] w-full bg-white flex flex-col items-center justify-center overflow-hidden font-sans  my-2">
      {/* Decorative Top Pattern (Adjusted for white bg) */}
      {/* <div className="absolute top-0 left-0 w-full h-48 opacity-40 pointer-events-none overflow-hidden">
         <svg width="100%" height="100%" viewBox="0 0 1000 200" preserveAspectRatio="none">
            <path d="M0,0 L1000,0 L1000,100 C800,150 200,50 0,100 Z" fill="#005BAB" opacity="0.2" />
            <circle cx="50" cy="20" r="40" fill="#E91E63" opacity="0.4" />
            <circle cx="150" cy="10" r="60" fill="#4CAF50" opacity="0.3" />
            <circle cx="300" cy="30" r="50" fill="#FFC107" opacity="0.4" />
            <rect x="450" y="-20" width="100" height="100" fill="#9C27B0" opacity="0.3" transform="rotate(45 500 30)" />
            <circle cx="650" cy="10" r="70" fill="#2196F3" opacity="0.4" />
            <circle cx="850" cy="40" r="50" fill="#FF5722" opacity="0.3" />
            <path d="M950,-50 L1050,150 L850,150 Z" fill="#00BCD4" opacity="0.2" />
         </svg>
      </div> */}

      <div className="z-10 flex flex-col items-center text-center px-4 space-y-8 animate-in mt-10 fade-in zoom-in duration-700">
        {/* Main Heading (Deep Blue Text) */}
        <div className="space-y-0 text-[#102A63]">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none italic uppercase">
            Coming
          </h1>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none italic uppercase -mt-4">
            Soon
          </h1>
        </div>

        {/* Subtext (Darker Grayish Blue) */}
        <p className="text-xl md:text-2xl text-[#38419D] italic font-medium" style={{ fontFamily: "'Dancing Script', cursive" }}>
          We are Still Working on it.
        </p>

        {/* Email Subscription Field */}
        <div className="relative w-full max-w-[500px] mt-10">
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-1 shadow-xl overflow-hidden group focus-within:ring-4 focus-within:ring-blue-100 transition-all">
            <input 
              type="text" 
              placeholder="Your Email and Get Notified..." 
              className="flex-1 bg-transparent px-6 py-4 text-gray-700 placeholder:text-gray-400 focus:outline-none text-sm md:text-base font-medium"
            />
            <button className="h-12 w-12 rounded-full bg-[#38419D] flex items-center justify-center text-white hover:bg-[#102A63] transition-colors shadow-lg active:scale-95 group-hover:translate-x-0.5">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Social Links (Deep Blue) */}
        <div className="flex items-center gap-6 pt-10 text-[#38419D]/60 ">
          <button className="flex items-center gap-2 hover:text-[#102A63] transition-colors group">
            <Facebook className="h-4 w-4" />
            <span className="text-sm font-bold tracking-widest uppercase">facebook</span>
          </button>
          <button className="flex items-center gap-2 hover:text-[#102A63] transition-colors group">
            <Twitter className="h-4 w-4" />
            <span className="text-sm font-bold tracking-widest uppercase">twitter</span>
          </button>
        </div>

        {/* Copyright (Subtle Gray) */}
        <div className="pt-20">
          <p className="text-[11px] text-gray-400 uppercase tracking-[0.2em] font-medium">
             Copyright 2026 Admin Portal 
          </p>
        </div>
      </div>

      {/* Background subtle radial gradient to add depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.02)_100%)] pointer-events-none" />
      
      {/* External Font Import for Subtext */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');
      `}</style>
    </div>
  );
}