"use client";
import { useGetSingleMentorQuery } from "@/features/mentor/mentorApiSlice";
import { CalendarClock, Headphones } from "lucide-react";
import React, { useState } from "react";

export default function MentorDetailPage({ params }) {
  const { mentorId } = React.use(params);
  console.log(mentorId);
  const { data, isLoading, isError } = useGetSingleMentorQuery(mentorId);
  const [activeTab, setActiveTab] = useState("Overview"); // default tab

  const mentor = data?.data;
  console.log(mentor);

  if (isLoading) return <p className='text-center'>Loading mentor...</p>;

  if (isError) return <p className='text-center'>Error loading mentor</p>;

  return (
    <div className='mx-auto '>
      <div className='min-h-screen bg-[#E3F1E8] font-sans'>
        {/* Header Section */}
        <div className='bg-gradient-to-b from-white to-[#E3F1E8] relative'>
          <div className='max-w-6xl mx-auto px-6 py-12 flex items-center gap-8'>
            {/* Profile Image */}
            <img
              src={mentor?.photo}
              alt='loading'
              className='w-[300px] h-[300px] rounded-full'
            />
            {/* Name + Title */}

            <div className='flex justify-between w-full items-center'>
              <div className='flex-1 '>
                <h1 className='text-2xl font-bold text-gray-900 capitalize'>
                  {mentor?.fullName}
                </h1>
                <p className='text-lg text-gray-700'>
                  {/* UI Designer at Tata Digital */}
                  {mentor?.profession}
                </p>
              </div>

              {/* Connect Button */}
              <button className='bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg shadow-md'>
                Connect with Mentor
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className='max-w-6xl mx-auto px-6 flex gap-8 border-b border-gray-300'>
            {["Overview", "Reviews", "Achievements", "Group Sessions"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium ${
                    activeTab === tab
                      ? "text-green-700 border-b-2 border-green-700"
                      : "text-gray-600"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className='max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-8'>
          {/* Left Column */}
          <div className='col-span-2 space-y-6'>
            {activeTab === "Overview" && (
              <>
                {/* About */}
                <div>
                  <p className='text-gray-800 leading-relaxed text-sm'>
                    {mentor?.about}
                    {/* Hi, I am Kingsley. I am passionate about helping companies
                    enhance their design experiences, refine their ideas and
                    launch impactful solutions. In the past, I have helped
                    companies with millions of customers grow their businesses,
                    and improve and create products by identifying product and
                    user experience problems and opportunities, conceptualizing,
                    prototyping, and working with developers (handoff). */}
                  </p>
                  <p className='text-gray-800 leading-relaxed text-sm mt-3'>
                    I like to be involved in different stages of a digital
                    project, from the seed of the idea, through to sketches,
                    design and even the front-end and back-end build, this means
                    I can jump in at any stage of a project, or take on the
                    whole project, from design to build.
                  </p>
                </div>

                {/* Social Media */}
                <div>
                  <h2 className='text-sm font-semibold text-gray-900 mb-2'>
                    Connect on Social Media
                  </h2>
                  <div className='flex gap-3'>
                    <div className='w-8 h-8 rounded-full bg-gray-300'></div>
                    <div className='w-8 h-8 rounded-full bg-gray-300'></div>
                    <div className='w-8 h-8 rounded-full bg-gray-300'></div>
                    <div className='w-8 h-8 rounded-full bg-gray-300'></div>
                  </div>
                </div>

                {/* Background */}
                <div>
                  <h2 className='text-sm font-semibold text-gray-900 mb-2'>
                    Background
                  </h2>
                  <ul className='space-y-1 text-sm text-gray-700'>
                    <li>
                      <span className='font-medium mr-1 '>Expertise:</span>
                      {mentor?.expertise.map((tag, index) => (
                        <span key={index} className='capitalize'>
                          {tag}
                          {index !== mentor?.expertise.length - 1 && ","}{" "}
                        </span>
                      ))}
                    </li>
                    <li>
                      <span className='font-medium'>Disciplines:</span>{" "}
                      Interaction Design, Visual Design
                    </li>
                    <li>
                      <span className='font-medium'>Language:</span>{" "}
                      {mentor?.languages.map((language, index) => (
                        <span key={index} className='capitalize'>
                          {language}
                          {index !== mentor?.languages.length - 1 && ","}{" "}
                        </span>
                      ))}
                    </li>
                  </ul>
                </div>

                {/* Experience */}
                <div>
                  <h2 className='text-sm font-semibold text-gray-900 mb-2'>
                    Experience
                  </h2>
                  <p className='text-sm text-gray-700'>
                    {mentor?.workExperience}
                  </p>
                </div>
                {/* Experties */}
                {/* <div>
                  <h2 className='text-sm font-semibold text-gray-900 mb-2'>
                    Expertise
                  </h2>
                  <ul className='space-y-1 text-sm text-gray-700'>
                    <li>
                      <span className='font-medium'>Expertise:</span> UI/UX
                      Design, Product Strategy
                    </li>
                    <li>
                      <span className='font-medium'>Disciplines:</span>{" "}
                      Interaction Design, Visual Design
                    </li>
                    <li>
                      <span className='font-medium'>Language:</span> English,
                      Hindi
                    </li>
                  </ul>
                </div> */}

                {/* Education */}

                <div>
                  <h2 className='text-sm font-semibold text-gray-900 mb-2'>
                    Education
                  </h2>

                  {mentor?.education?.length > 0 ? (
                    mentor.education.map((edu, index) => (
                      <p key={index} className='text-sm text-gray-700'>
                        {edu.level
                          ? `${edu.level[0].toUpperCase()}${edu.level.slice(1)}`
                          : "Education"}
                        {edu.subject ? ` in ${edu.subject}` : ""},
                        {edu.institution ? ` ${edu.institution}` : ""}
                      </p>
                    ))
                  ) : (
                    <p className='text-sm text-gray-500 italic'>
                      No education details provided
                    </p>
                  )}
                </div>
              </>
            )}

            {activeTab === "Reviews" && (
              <div>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                  Reviews
                </h2>
                <p className='text-sm text-gray-700'>
                  ⭐⭐⭐⭐⭐ Great mentor, very helpful in UI/UX journey.
                </p>
                <p className='text-sm text-gray-700 mt-2'>
                  ⭐⭐⭐⭐ Learned a lot about design thinking and prototyping.
                </p>
              </div>
            )}

            {activeTab === "Achievements" && (
              <div>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                  Achievements
                </h2>
                <ul className='list-disc list-inside text-sm text-gray-700 space-y-1'>
                  <li>Awwwards Young Designer of the Year 2022</li>
                  <li>Speaker at DesignUp 2023</li>
                  <li>Worked with 10+ global brands</li>
                </ul>
              </div>
            )}

            {activeTab === "Group Sessions" && (
              <div>
                <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                  Group Sessions
                </h2>
                <p className='text-sm text-gray-700'>
                  Upcoming session: "Design Systems 101" - 15th Sept, 2025
                </p>
                <p className='text-sm text-gray-700 mt-2'>
                  Past session: "Intro to UX Research"
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Stats */}
          <div className='bg-white shadow-md rounded-xl w-full p-4 h-fit'>
            <h2 className='text-sm font-semibold text-gray-900 mb-4'>
              Community Statistics
            </h2>
            <div className='grid grid-cols-2 gap-4 text-sm'>
              <div className='flex items-center gap-2'>
                <CalendarClock />
                <div>
                  <p className='font-bold text-gray-900'>21850 mins</p>
                  <p className='text-gray-600 '>Total mentoring time</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Headphones />
                <div>
                  <p className='font-bold text-gray-900'>27 sessions</p>
                  <p className='text-gray-600'>Sessions completed</p>
                </div>
              </div>
              <div>
                <p className='font-bold text-gray-900'>96.43%</p>
                <p className='text-gray-600'>Average Attendance</p>
              </div>
              <div>
                <p className='font-bold text-gray-900'>103</p>
                <p className='text-gray-600'>Karma points</p>
              </div>
            </div>

            {/* Top Areas of Impact */}
            <div className='mt-6'>
              <h2 className='text-sm font-semibold text-gray-900 mb-3'>
                Top areas of impact
              </h2>
              <div className='flex flex-wrap gap-2'>
                <span className='px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700'>
                  UI Design
                </span>
                <span className='px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700'>
                  Prototyping
                </span>
                <span className='px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700'>
                  UX Research
                </span>
                <span className='px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-700'>
                  Product Strategy
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
