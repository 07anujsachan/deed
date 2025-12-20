"use client";
import Image from "next/image";
import React, { useState } from "react";
import { MentorCard } from "../components/OurMissionCard";
import { Button } from "@/components/ui/PrimarySmallButton";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

export const communityGuidelines = [
  {
    title: "1. Be Respectful & Kind",
    description:
      "Every student comes from a different background and level of understanding. Listen without judgment, and encourage without pressure.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
    backgroundColor: "bg-[#EAF6FF]",
  },
  {
    title: "2. Share Honestly, Not Perfectly",
    description:
      "You don’t need to have all the answers, just your real experiences. Authentic stories help students relate and learn far more than textbook advice.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
    backgroundColor: "bg-[#EEFAF1]",
  },
  {
    title: "3. Keep It Student-Centered",
    description:
      "This is about helping students make choices that work best for them. Guide, don’t impose. Encourage exploration.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
    backgroundColor: "bg-[#FFF1EC]",
  },
  {
    title: "4. Value Their Time & Yours",
    description:
      "If you commit to a session, try your best to show up. Consistency builds trust.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
    backgroundColor: "bg-[#EEFAF1]",
  },
  {
    title: "5. Maintain Privacy & Boundaries",
    description:
      "All conversations with students should remain respectful, safe, and professional. Avoid asking for personal contact or details beyond what’s needed for mentoring.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
    backgroundColor: "bg-[#FFF6E8]",
  },
  {
    title: "6. Keep Growing as a Mentor",
    description:
      "We’ll share learning resources and community updates to help you evolve as a guide. Stay curious, your growth helps others grow too.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
    backgroundColor: "bg-[#EAF6FF]",
  },
];

const page = () => {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  console.log(checked);
  const handleProceed = () => {
    if (!checked) return;
    router.push("/mentor/mentorform/step-1");
  };

  return (
    <div>
      {/* thankyou mentor section  */}
      <section className='w-full bg-[#E9EAFE] px-6 md:px-16 pt-12 md:pt-20'>
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
              src='/media/thankyou.png'
              alt='Thank you illustration'
              width={520}
              height={420}
              className='w-full md:max-w-xl lg:max-w-2xl mx-auto'
              priority
            />
          </div>
        </div>
      </section>
      <div className=' md:max-w-5xl mx-auto text-center w-full px-6 md:px-16 pt-12 md:pt-20'>
        <h4 className='text-lg md:text-3xl'>
          We will be taking you to a form to fill up. This form will have 5
          short steps that help us understand you better, your background,
          interests, and the kind of guidance you’d like to offer.
        </h4>
        <p className=' text-sm text-gray-600 md:text-lg my-4'>
          But before you start we would like you to understand the following:
        </p>
      </div>

      {/* community guidelines  */}
      <section className='bg-white mx-6 my-12 md:my-24 rounded-[40px] px-6 md:px-8 py-10 md:py-16 shadow-md'>
        {/* HEADER */}
        <div className='max-w-3xl mb-10'>
          <h2 className='text-3xl md:text-4xl font-semibold flex items-center gap-2'>
            🤝 Community Guidelines
          </h2>
          <p className='mt-3 text-gray-700 text-lg leading-relaxed'>
            At Deed, we’re building a community based on respect, empathy, and
            authenticity. Before you begin, please take a moment to go through
            our simple principles:
          </p>
        </div>

        {/* GRID */}
        <div className='flex flex-wrap gap-4'>
          {communityGuidelines.map((item, index) => (
            <MentorCard
              key={index}
              name={item.title}
              description={item.description}
              image={item.image}
              badges={item.badges}
              backgroundColor={item.backgroundColor}
              size="md"
              imageSize="md"
            />
          ))}
        </div>
      </section>

      {/* accept guideline btn  */}
      <div className='mx-6 bg-white rounded-[32px] shadow-md px-6 md:px-8 py-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4'>
        <div className='flex items-start md:items-center gap-4 '>
          <label className='cursor-pointer'>
            <span
              className={`
            w-8 h-8 flex items-center justify-center rounded-xl
            border-2 transition
            ${
              checked
                ? "bg-[#3063DA] border-[#3063DA]"
                : "bg-white border-gray-300"
            }
          `}
            >
              {checked && <Check size={16} className='text-white' />}
            </span>

            <input
              type='checkbox'
              checked={checked}
              onChange={() => setChecked(!checked)}
              className='hidden'
            />
          </label>
          <p className='text-sm md:text-lg max-w-2xl'>
            I have read the community guidelines and I would like to proceed
          </p>
        </div>

        {/* RIGHT: Button */}
        <Button
          text='Take me to the form'
          variant='SecondarySmallButton'
          showRightArrow
          className={`whitespace-nowrap ${
            !checked && "opacity-50 pointer-events-none"
          }`}
          onClick={handleProceed}
        />
      </div>
    </div>
  );
};

export default page;
