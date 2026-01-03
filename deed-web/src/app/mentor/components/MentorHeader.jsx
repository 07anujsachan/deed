"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CircleUser, Menu, X } from "lucide-react"; // Lucide icons

const MentorHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='w-full px-4 md:px-16 py-4 flex items-center justify-between bg-white shadow-sm relative z-50'>
      {/* Logo Section */}
      <div className='flex items-center gap-3'>
        <Link href='/' className='flex items-center gap-3'>
          <img
            src='/media/logo.png'
            alt='Deed Logo'
            className='w-10 h-10 rounded-xl bg-[#f3f3f3] p-1'
          />
          {/* Hide text on small screens */}
          <div className='hidden sm:block'>
            <h1 className='font-semibold text-xl text-[#111827] '>Deed</h1>
            <p className='text-xs text-gray-500 -mt-1 uppercase'>Solutions</p>
          </div>
        </Link>
      </div>

        <div className='flex items-center gap-6'>
          <Link
            href='/login'
            className='bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-2 rounded-lg text-lg flex gap-3'
          >
            Are you a student ?
            <span>
              {" "}
              <ArrowRight />
            </span>
          </Link>
        </div>
    </header>
  );
};

export default MentorHeader;
