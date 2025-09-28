"use client";
import React, { useState } from "react";
import Link from "next/link";
import { CircleUser, Menu, X } from "lucide-react"; // Lucide icons

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full px-4 md:px-16 py-4 flex items-center justify-between bg-white shadow-sm relative z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-3">
  <Link href="/" className="flex items-center gap-3">
    <img
      src="/media/logo.png"
      alt="Deed Logo"
      className="w-10 h-10 rounded-xl bg-[#f3f3f3] p-1"
    />
    {/* Hide text on small screens */}
    <div className="hidden sm:block">
      <h1 className="font-semibold text-xl text-[#111827] ">Deed</h1>
      <p className="text-sm text-gray-500 -mt-1">Decide your education</p>
    </div>
  </Link>
</div>
      <div className="flex gap-6">
        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-10 items-center font-medium text-[#111827]">
          <a href="#" className="hover:underline">
            Careers Archive
          </a>
          <a href="#" className="hover:underline">
            Career Assessment Test
          </a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-2 rounded-lg text-lg flex gap-3"
          >
            Log in
            <span>
              {" "}
              <CircleUser />
            </span>
          </Link>
          <Link
            href="/mentorsignup"
            className="border-2 border-blue-600 text-[#3063DA] hover:bg-blue-50 font-semibold px-5 py-2 rounded-lg text-lg"
          >
            Join as an expert
          </Link>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
  <div className="absolute top-20 left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-left gap-4 py-4 px-6 z-40 ">
    <a
      href="#"
      className="text-[#111827] font-medium"
      onClick={() => setIsOpen(false)}
    >
      Careers Archive
    </a>
    <a
      href="#"
      className="text-[#111827] font-medium"
      onClick={() => setIsOpen(false)}
    >
      Career Assessment Test
    </a>
    <Link
      href="/login"
      className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold text-sm w-full text-center"
      onClick={() => setIsOpen(false)}
    >
      Log in
    </Link>
    <Link
      href="/mentorform"
      className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold text-sm w-full text-center"
      onClick={() => setIsOpen(false)}
    >
      Join as an expert
    </Link>
  </div>
)}

    </header>
  );
};

export default Header;
