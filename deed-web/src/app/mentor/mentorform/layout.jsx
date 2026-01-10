"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RotateCcw } from "lucide-react";
import {
  setMentorSession,
  updateFormData,
  resetForm,
} from "@/redux/mentor/mentorSlice";

const STORAGE_KEY = "mentor_form_data";
const EXPIRY_HOURS = 24;

export default function MentorFormLayout({ children }) {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.mentor.formData);

  /* ============================
     SESSION / STORAGE HANDLING
  ============================ */
  useEffect(() => {
    // 1. Load from LocalStorage on mount
    const savedDataString = localStorage.getItem(STORAGE_KEY);
    if (savedDataString) {
      try {
        const parsed = JSON.parse(savedDataString);
        const { timestamp, data } = parsed;

        // Check Expiry
        const now = new Date().getTime();
        const diffHours = (now - timestamp) / (1000 * 60 * 60);

        if (diffHours < EXPIRY_HOURS) {
          // Valid: Hydrate Redux
          dispatch(updateFormData(data));
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [dispatch]);

  /* ============================
     RESET HANDLING
  ============================ */
  const router = useRouter();
  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the form? All progress will be lost."
      )
    ) {
      dispatch(resetForm());
      localStorage.removeItem(STORAGE_KEY);
      router.push("/mentor/mentorform/step-1");
    }
  };

  // 2. Save to LocalStorage on Redux Change
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      const payload = {
        timestamp: new Date().getTime(),
        data: formData,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }
  }, [formData]);

  /* ============================
     UI LAYOUT (UNCHANGED)
  ============================ */
  return (
    <section className='relative'>
      {/* RESET BUTTON */}
      <button
        onClick={handleReset}
        className='absolute top-4 right-4 md:top-8 md:right-16 z-50 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors bg-white/80 backdrop-blur px-3 py-2 rounded-lg shadow-sm'
      >
        <RotateCcw size={16} />
        Reset Form
      </button>

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

      {/* STEP CONTENT */}
      <div className='mt-8 max-w-[80%] mx-auto relative bottom-32'>
        {children}
      </div>
    </section>
  );
}
