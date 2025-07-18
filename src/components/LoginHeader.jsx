import React from "react";

export default function LoginHeader() {
  return (
    <header
      className="fixed top-0 left-0 z-50 w-full h-20 bg-blue-600 shadow-sm font-inter"
    >
      <div className="flex items-center h-full max-w-6xl px-6 mx-auto space-x-3">
        <img src="src/images/logo.svg" alt="Logo" className="w-auto h-10" />
        <span className="text-lg font-medium tracking-tight text-white select-none">
          Medical System
        </span>
      </div>
    </header>
  );
}
