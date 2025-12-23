"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MentorCard } from "../components/OurMissionCard";
import { Button } from "@/components/ui/PrimarySmallButton";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import AcceptBar from "../components/AcceptBar";

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
      <section className='w-full bg-[#E9EAFE] px-6 md:px-16 pt-12 md:pt-20'>
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

      {/* GUIDELINES */}
      <section className='bg-white mx-6 mt-12 md:mt-24 rounded-[40px] px-6 md:px-8 py-10 md:py-16 shadow-md'>
        <div className='max-w-3xl mb-10'>
          <h2 className='text-3xl md:text-4xl font-semibold'>
            🤝 Community Guidelines
          </h2>
          <p className='mt-3 text-gray-700 text-lg'>
            At Deed, we’re building a community based on respect, empathy, and
            authenticity.
          </p>
        </div>

        <div className='flex flex-wrap gap-4'>
          {communityGuidelines.map((item, index) => (
            <MentorCard
              key={index}
              name={item.title}
              description={item.description}
              image={item.image}
              badges={item.badges}
              backgroundColor={item.backgroundColor}
              size='md'
              imageSize='md'
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
