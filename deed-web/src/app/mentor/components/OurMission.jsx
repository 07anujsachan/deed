import React, { useRef } from "react";
import { motion } from "framer-motion";
import { sectionVariants } from "@/app/components/UIComponents/motionVariants";
import { MentorCard } from "./OurMissionCard";
import ArrowButton from "@/components/ui/ArrowButton";

const OurMission = ({ teamData }) => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };
  return (
    <motion.section
      variants={sectionVariants}
      initial='hidden'
      whileInView='visible'
      exit='exit'
      viewport={{ once: true, amount: 0.3 }}
      className='bg-white py-4 md:py-12 rounded-[40px] my-12 md:my-24 px-2'
    >
      <div className='text-center my-8 md:my-16'>
        <h2 className='md:text-[56px] text-3xl font-semibold my-4 '>
          {" "}
          Our Mission
        </h2>
        <p className='font-semibold md:text-2xl text-gray-600 text-lg my-4 mt-6'>
          Empower India’s next generation — one conversation at a time
        </p>
        <p className=' md:text-2xl text-base text-gray-600 md:max-w-5xl w-full mx-auto leading-snug'>
          At Deed, we believe that the right guidance can change lives,
          especially in places where opportunities are still catching up. By
          becoming a career guide, you can help students see beyond their
          surroundings, make informed choices, and chase the futures they
          deserve
        </p>
        <p className='font-semibold text-gray-600 md:text-2xl text-xl my-4'>
          Your story could be the spark that changes someone’s life.
        </p>
      </div>
      <div
        ref={scrollRef}
        className='flex gap-4 md:gap-8 overflow-x-auto scroll-smooth scrollbar-hide'
      >
        {teamData.map((item, index) => (
          <MentorCard key={index} {...item} />
        ))}
      </div>
      <div className='flex gap-8 justify-center mt-8'>
        <ArrowButton direction='left' onClick={() => scroll("left")} />
        <ArrowButton direction='right' onClick={() => scroll("right")} />
      </div>
    </motion.section>
  );
};

export default OurMission;
