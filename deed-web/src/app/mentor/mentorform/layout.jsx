"use client";
import Image from "next/image";
import React from "react";
export default function MentorFormLayout({ children }) {
  return (
    <section>
      <div className='w-full bg-[#E9EAFE] px-6 md:px-16 pt-12 md:pt-20 pb-32 md:pb-40'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-10'>
          {/* LEFT CONTENT */}
          <div className='md:w-1/2 text-center md:text-left'>
            <h2 className='text-3xl md:text-6xl font-semibold text-gray-900 md:leading-snug'>
              Thank you for <br className='mb-2' />
              choosing to guide <br className='mb-2' />
              the next generation
            </h2>

            <p className='mt-6 text-gray-700 text-base md:text-xl md:leading-relaxed max-w-2xl'>
              <span className='font-semibold'>
                We’re truly grateful that you’re here.
              </span>{" "}
              <br />
              By becoming a career guide, you’re choosing to make a difference,
              to help school students discover their strengths, make informed
              choices, and see what’s possible beyond their immediate world.
            </p>
          </div>

          {/* RIGHT ILLUSTRATION */}
          <div className='md:w-1/2 flex justify-end items-end'>
            <Image
              src='/media/mentorForm.png'
              alt='Thank you illustration'
              width={520}
              height={420}
              className='w-full md:max-w-sm max-w-xs'
              priority
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className='mt-8 max-w-[80%] mx-auto relative bottom-32'>
        {children}
      </div>
    </section>
  );
}
