"use client";
import { useState, useRef } from "react";
import { Button } from "../components/UIComponents/PrimarySmallButton";
import MentorCard from "../components/UIComponents/Mentorcard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetMentorsQuery } from "@/features/mentor/mentorApiSlice";
import { useRouter } from "next/navigation";

// Dummy mentors data (all same image + master added in education)
// const mentors = [
//   {
//     imageUrl: "/media/anuj.jpg",
//     name: "Anurag Sachan",
//     title: "UI/UX Designer",
//     categories: ["design"],
//     tags: ["Design", "UX", "Figma"],
//     education: [
//       {
//         degree: "Masters in Design (M.Des.)",
//         institute: "National Institute of Design, Bangalore",
//       },
//       {
//         degree: "Bachelor of Fine Art (BFA)",
//         institute: "College of Art, Delhi University, New Delhi",
//       },
//     ],
//   },
//   {
//     imageUrl: "/media/anuj.jpg",
//     name: "Rohit Kumar",
//     title: "Frontend Developer & UI/UX",
//     categories: ["development", "design"],
//     tags: ["React", "JavaScript", "Tailwind"],
//     education: [
//       {
//         degree: "Masters in Design (M.Des.)",
//         institute: "National Institute of Design, Bangalore",
//       },
//       {
//         degree: "B.Tech in Computer Science",
//         institute: "IIT Kanpur",
//       },
//     ],
//   },
//   {
//     imageUrl: "/media/anuj.jpg",
//     name: "Sneha Verma",
//     title: "Educator",
//     categories: ["teaching"],
//     tags: ["Education", "Training"],
//     education: [
//       {
//         degree: "Masters in Design (M.Des.)",
//         institute: "National Institute of Design, Bangalore",
//       },
//       {
//         degree: "M.Ed",
//         institute: "Delhi University",
//       },
//       {
//         degree: "B.Ed",
//         institute: "Jamia Millia Islamia, New Delhi",
//       },
//     ],
//   },
//   {
//     imageUrl: "/media/anuj.jpg",
//     name: "Rahul Sharma",
//     title: "Software Engineer",
//     categories: ["development"],
//     tags: ["Node.js", "Next.js", "API"],
//     education: [
//       {
//         degree: "Masters in Design (M.Des.)",
//         institute: "National Institute of Design, Bangalore",
//       },
//       {
//         degree: "B.Tech in Information Technology",
//         institute: "NIT Trichy",
//       },
//     ],
//   },
//   {
//     imageUrl: "/media/anuj.jpg",
//     name: "Priya Mehta",
//     title: "Doctor & Medical Researcher",
//     categories: ["medical"],
//     tags: ["MBBS", "Research"],
//     education: [
//       {
//         degree: "Masters in Design (M.Des.)",
//         institute: "National Institute of Design, Bangalore",
//       },
//       {
//         degree: "MBBS",
//         institute: "AIIMS, Delhi",
//       },
//       {
//         degree: "MD in Medicine",
//         institute:
//           "Postgraduate Institute of Medical Education and Research, Chandigarh",
//       },
//     ],
//   },
//   {
//     imageUrl: "/media/anuj.jpg",
//     name: "Amit Singh",
//     title: "Artist & Entrepreneur",
//     categories: ["art", "business"],
//     tags: ["Fine Arts", "Startup"],
//     education: [
//       {
//         degree: "Masters in Design (M.Des.)",
//         institute: "National Institute of Design, Bangalore",
//       },
//       {
//         degree: "Bachelor of Fine Arts",
//         institute: "MS University, Baroda",
//       },
//       {
//         degree: "MBA",
//         institute: "IIM Ahmedabad",
//       },
//     ],
//   },
// ];

const allFilters = [
  "Top rated",
  "Art",
  "Fine Art",
  "Medical",
  "Teaching",
  "Technology",
  "Business",
  "Design",
  "Development",
];

export default function MentorSection({ page }) {
  const [activeFilters, setActiveFilters] = useState([]);
  const filterScrollRef = useRef(null);
  const cardScrollRef = useRef(null);
  const { data, isLoading, error } = useGetMentorsQuery({});
  const mentors = data?.data || [];
  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredMentors =
    activeFilters.length === 0
      ? mentors
      : mentors.filter((m) =>
          m.expertise.some((cat) =>
            activeFilters
              .map((f) => f.toLowerCase())
              .includes(cat.toLowerCase())
          )
        );

  const scroll = (dir) => {
    if (cardScrollRef.current) {
      cardScrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error?.data?.message}</div>;

  return (
    <div className='w-[90%] mx-auto relative mt-12'>
      {/* Title */}
      {page === "home" && (
        <div className='mx-auto text-center md:w-[80%] mb-10'>
          <h2 className='text-3xl md:text-5xl mb-6 font-semibold leading-snug text-gray-900'>
            Talk to a Top Rated Career Guide
          </h2>
          <p>
            <strong>Career guides are your friends to help!</strong>
          </p>
          <p>
            Get on a call with any career guide and discuss about the queries
            <br /> you have related to a career option
          </p>
        </div>
      )}

      {/* Filters */}
      {page === "mentors" && (
        <>
        
      <p className='mb-2'>Quick filters:</p>
        <div
          ref={filterScrollRef}
          className='flex gap-2 mb-6 overflow-x-auto scrollbar-hide snap-x items-center'
        >
          {/* All filter - Always active */}
          <button
            disabled
            className='px-4 py-2 rounded-xl border bg-green-100 text-green-700 border-green-500 font-semibold shrink-0 snap-start'
          >
            See all filters
          </button>
          <div className='w-[2px] h-9  bg-gray-900'></div>
          {allFilters.map((filter, i) => (
            <button
              key={i}
              onClick={() => toggleFilter(filter)}
              className={`px-4 py-2 rounded-xl border shrink-0 snap-start flex items-center gap-2 ${
                activeFilters.includes(filter)
                  ? "text-green-700 border-green-500 font-semibold"
                  : "text-gray-800 border-gray-300"
              }`}
            >
              {filter}
              {activeFilters.includes(filter) && <span>✕</span>}
            </button>
          ))}
        </div>
        </>
      )}

      {/* Mentor Cards */}
      <div className='relative'>
        <div
          ref={cardScrollRef}
          className='flex gap-4 scroll-pl-4 snap-x snap-mandatory overflow-x-auto scrollbar-hide'
          style={{ scrollBehavior: "smooth" }}
        >
          {filteredMentors.map((mentor, index) => (
            <div
              key={index}
              className='snap-start shrink-0'
              style={{ width: "300px" }} // fixed card width
            >
              <MentorCard {...mentor} education={mentor.education.slice(-2)} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {page === "home" && (
        <div className='mt-8 flex justify-between items-center'>
          <button
            onClick={() => scroll("left")}
            className='  p-2 rounded-xl border-2 border-[#1B752A] bg-[#EFFEF1] shadow-md text-[#1B752A] text-semibold'
          >
            <ChevronLeft size={24} />
          </button>

          <Button
            text='See All Mentors'
            variant='PrimarySmallOutlinedButton'
            onClick={() => useRouter().push("/mentors")}
            className='md:ml-6 md:text-xl text-sm '
          />

          <button
            onClick={() => scroll("right")}
            className='  p-2 rounded-xl border-2 border-[#1B752A] bg-[#EFFEF1] shadow-md text-[#1B752A] text-semibold'
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
