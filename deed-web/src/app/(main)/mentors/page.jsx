"use client";
import MentorSection from "@/app/components/Mentor";

export default function MentorsPage() {
  return (
    <div>
      <div className='w-[90%] mx-auto'>
        <h2 className='text-6xl leading-relaxed'>
          Connect with mentors and get all
        </h2>
        <h2 className='text-6xl mb-6'>your questions answered</h2>
        <p className='text-gray-600 text-xl font-bold'>
          Here are some mentors who you can connect with-
        </p>
      </div>
      <MentorSection page={"mentors"} />
    </div>
  );
}
