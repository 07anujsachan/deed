"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MentorCard } from "../components/OurMissionCard";
import { Button } from "@/components/ui/PrimarySmallButton";
import { Check, Handshake } from "lucide-react";
import { useRouter } from "next/navigation";
import AcceptBar from "../components/AcceptBar";
import CommunityGuidelineCard from "@/app/components/UIComponents/CommunityGuidelineCard";

const communityGuidelines = [
  {
    icon: "/guideline/1.png",
    title: "Be Respectful & Kind",
    description:
      "Every student comes from a different background and level of understanding. Listen without judgment, and encourage without pressure.",
  },
  {
    icon: "/guideline/2.png",
    title: "Share Honestly, Not Perfectly",
    description:
      "You do not need to have all the answers, just your real experiences. Authentic stories help students relate and learn far more than textbook advice.",
  },
  {
    icon: "/guideline/3.png",
    title: "Keep It Student-Centered",
    description:
      "This is about helping students make choices that work best for them. Guide, don’t impose. Encourage exploration.",
  },
  {
    icon: "/guideline/4.png",
    title: "Value Their Time & Yours",
    description:
      "If you commit to a session, try your best to show up. Consistency builds trust.",
  },
  {
    icon: "/guideline/5.png",
    title: "Maintain Privacy & Boundaries",
    description:
      "All conversations with students should remain respectful, safe, and professional. Avoid asking for personal contact details beyond what’s needed.",
  },
  {
    icon: "/guideline/6.png",
    title: "Keep Growing as a Mentor",
    description:
      "We’ll share learning resources and community updates to help you evolve as a guide. Stay curious—your growth helps others grow too.",
  },
];

const Page = () => {
  const [checked, setChecked] = useState(false);
  const [isFloating, setIsFloating] = useState(true);

  const anchorRef = useRef(null);
  const router = useRouter();

  const handleProceed = () => {
    if (!checked) return;
    router.push("/mentor/mentorform/step-1");
  };

  // 🔥 Intersection Observer → controls fixed/static behavior
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFloating(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (anchorRef.current) observer.observe(anchorRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* THANK YOU SECTION */}
      <section className='w-full bg-[#E9EAFE] px-3 md:px-8 pt-12 md:pt-20'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-10'>
          <div className='md:w-1/2 text-center md:text-left'>
            <h2 className='text-3xl md:text-6xl font-semibold text-gray-900 md:leading-snug'>
              Thank you for <br />
              choosing to guide <br />
              the next generation
            </h2>

            <p className='mt-6 text-gray-700 text-base md:text-xl md:leading-relaxed max-w-2xl'>
              <span className='font-semibold'>
                We’re truly grateful that you’re here.
              </span>
              <br />
              By becoming a career guide, you’re choosing to make a difference,
              to help school students discover their strengths, make informed
              choices, and see what’s possible beyond their immediate world.
            </p>
          </div>

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

      <div className='text-center w-[50%] space-y-8 mt-20 mx-auto'>
        <p className="text-xl">
          We will be taking you to a form to fill up. This form will have 5
          short steps that help us understand you better, your background,
          interests, and the kind of guidance you’d like to offer.
        </p>
        <div className='bg-blue-600 text-white p-2 rounded-xl flex items-center gap-2 w-[80%] mx-auto'>
          <Handshake className="w-6 h-6 ml-4"/>
          <p className='text-center'>Before you start we would like you to understand the following</p>
        </div>
      </div>

      {/* GUIDELINES */}
 <section className="bg-white mx-3 md:mx-8 mt-12 md:mt-24 rounded-[40px] px-6 md:px-10 py-10 md:py-16 shadow-md">
      {/* Header */}
      <div className="max-w-4xl mb-10">
        <h2 className="text-3xl md:text-4xl font-semibold">
          🤝 Community Guidelines
        </h2>
        <p className="mt-3 text-gray-600 text-lg">
          At Deed, we’re building a community based on respect, empathy, and authenticity.
          Before you begin, please take a moment to go through our simple principles:
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {communityGuidelines.map((item, index) => (
          <CommunityGuidelineCard
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>

      {/* Accept bar section */}
      <div ref={anchorRef} className='w-full flex justify-center my-16'>
        <AcceptBar
          checked={checked}
          setChecked={setChecked}
          onProceed={handleProceed}
          isFloating={isFloating}
        />
      </div>
    </div>
  );
};

export default Page;
