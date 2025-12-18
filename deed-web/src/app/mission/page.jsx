"use client";
import React, { useRef } from "react";
import { Button } from "../components/UIComponents/PrimarySmallButton";
import OurMission from "../components/OurMission";
import { OurMissionCard } from "../components/UIComponents/OurMissionCard";
import ArrowButton from "../components/UIComponents/ArrowButton";
import FAQSection from "../components/FaqSection";
import { sectionVariants } from "../components/UIComponents/motionVariants";
import { motion } from "framer-motion";
const teamData = [
  {
    name: "Robert Fox",
    role: "Senior Developer",
    description:
      "Because I've had to learn everything the hard way, I want to help others learn an easier way.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
  },
  {
    name: "Georgia Lupi",
    role: "Product Designer",
    description:
      "Because I've had to learn everything the hard way, I want to make a difference.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
  },
  {
    name: "Jane Cooper",
    role: "Photographer",
    description:
      "Because I've had to learn everything the hard way, I want to help others.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
  },
  {
    name: "Jane Cooper",
    role: "Photographer",
    description:
      "Because I've had to learn everything the hard way, I want to help others.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
  },
  {
    name: "Jane Cooper",
    role: "Photographer",
    description:
      "Because I've had to learn everything the hard way, I want to help others.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
  },
  {
    name: "Jane Cooper",
    role: "Photographer",
    description:
      "Because I've had to learn everything the hard way, I want to help others.",
    image: "/media/Anuj.jpg",
    badges: ["Badge"],
  },
];
export const careerGuideData = [
  {
    title: "Feel empowered",
    description:
      "Be part of a community of mentors who support each other and inspire meaningful conversations. Your guidance can give someone the confidence to move forward.",
    image: "/media/Anuj.jpg",
  },
  {
    title: "Tools to mentor",
    description:
      "Our tools make mentoring easy — from booking sessions and managing calendars to hosting group discussions, everything is designed to support you.",
    image: "/media/Anuj.jpg",
  },
  {
    title: "Create real impact",
    description:
      "Your experience can change how someone thinks about their future. Help students make informed decisions and avoid mistakes you had to learn the hard way.",
    image: "/media/Anuj.jpg",
  },
  {
    title: "Grow your leadership",
    description:
      "Mentoring helps you sharpen communication, empathy, and leadership skills — qualities that benefit you personally and professionally.",
    image: "/media/Anuj.jpg",
  },
  {
    title: "Give back meaningfully",
    description:
      "If you’ve benefited from guidance in your journey, this is your chance to pass it on and make opportunities more accessible for others.",
    image: "/media/Anuj.jpg",
  },
];

const page = () => {
  const scrollRef = useRef(null);
  const scroll = (direction) => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };
  return (
    <div>
      {/* hero section  */}
      <motion.section
        variants={sectionVariants}
        initial='hidden'
        whileInView='visible'
        exit='exit'
        viewport={{ once: true, amount: 0.3 }}
        className='text-center mt-6 md:mt-12 px-6'
      >
        <div>
          <h1 className='text-4xl md:text-[80px] font-semibold leading-snug text-gray-900'>
            <span className=''>Share Your Journey.</span> <br />
            <span className=''>Shape Someone’s Future</span>
          </h1>

          <p className='mt-6 text-xl md:text-2xl text-gray-600 mx-auto'>
            Help students find their path by sharing the lessons, stories, and
            insights <br />
            <span className='font-semibold'>from your own journey</span>
          </p>
          <Button
            className='mt-9'
            text={"Get Started"}
            type='button'
            variant={"SecondarySmallButton"}
          />
          <img
            loading='lazy'
            className='w-11/12 mx-auto mt-20'
            src='/media/mission.png'
            alt='mission'
          />
        </div>
      </motion.section>

      {/* our mission section  */}
      <OurMission teamData={teamData} />

      {/* why career guide  */}
      <motion.section
        variants={sectionVariants}
        initial='hidden'
        whileInView='visible'
        exit='exit'
        viewport={{ once: true, amount: 0.3 }}
        className='py-4 md:py-12 mx-6 rounded-[40px] my-12 md:my-24'
      >
        <div className='text-center my-8 md:my-16'>
          <h2 className='text-default md:text-[56px] text-4xl font-semibold my-4 '>
            {" "}
            Why to become a career guide
          </h2>
          <p className='mt-4 md:text-2xl text-lg text-gray-600 md:w-[52%] w-full mx-auto leading-snug'>
            You’ve walked the path they’re just beginning.{" "}
            <span className='font-semibold'>
              Your insights, challenges, and wins can light the way for someone
              who’s still figuring it out
            </span>
            . Becoming a career guide lets you give back, inspire confidence,
            and make career guidance more real and relatable for students.
          </p>
        </div>
        <div
          ref={scrollRef}
          className='flex gap-4 md:gap-8 overflow-x-auto scroll-smooth scrollbar-hide'
        >
          {careerGuideData.map((item, index) => (
            <OurMissionCard key={index} {...item} />
          ))}
        </div>
        <div className='flex gap-8 justify-center mt-8'>
          <ArrowButton direction='left' onClick={() => scroll("left")} />
          <ArrowButton direction='right' onClick={() => scroll("right")} />
        </div>
      </motion.section>

      {/* faq section  */}
      <FAQSection />
    </div>
  );
};

export default page;
