import React from "react";

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 p-4 m-2 border border-neutral-200 shadow-sm rounded-2xl flex items-center justify-between">
      {/* Left Side: Branding & Context */}
      <div className="flex flex-col">
        <h1 className="text-lg font-bold text-slate-800 leading-tight">
          Chandrapur District Central Co-operative Bank
        </h1>
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          Admin Dashboard
        </p>
      </div>

      {/* Right Side: Action/Profile Placeholder */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-slate-700">Administrator</p>
          <p className="text-xs text-green-600 font-medium">System Online</p>
        </div>
        <div className="h-10 w-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-500 font-bold">
          AD
        </div>
      </div>
    </header>
  );
};

export default Header;
