"use client";

import CareerOptionCard from "./UIComponents/CareerOptionsCard";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../components/UIComponents/PrimarySmallButton";
const careerOptions = [
  {
    imageUrl: "/carreroptions/design.png",
    title: "Design",
    description: "Course Description",
    badges: [
      { label: "Badge", showTick: true, tickPosition: "left" },
      { label: "Badge", showTick: true, tickPosition: "right" },
    ],
  },
  {
    imageUrl: "/carreroptions/fineart.png",
    title: "Fine Art",
    description: "Course Description",
    badges: [
      { label: "Badge", showTick: true, tickPosition: "left" },
      { label: "Badge", showTick: false },
    ],
  },
  {
    imageUrl: "/carreroptions/engineering.png",
    title: "Engineering",
    description: "Course Description",
    badges: [
      { label: "STEM", showTick: true, tickPosition: "right" },
      { label: "Technology", showTick: false },
    ],
  },
  {
    imageUrl: "/carreroptions/design.png",
    title: "Medicine",
    description: "Course Description",
    badges: [
      { label: "Science", showTick: true, tickPosition: "left" },
      { label: "Healthcare", showTick: true, tickPosition: "right" },
    ],
  },
  {
    imageUrl: "/carreroptions/fineart.png",
    title: "Business",
    description: "Course Description",
    badges: [
      { label: "Management", showTick: true, tickPosition: "left" },
      { label: "Finance", showTick: false },
    ],
  },
  {
    imageUrl: "/carreroptions/engineering.png",
    title: "Law",
    description: "Course Description",
    badges: [
      { label: "Legal Studies", showTick: true, tickPosition: "left" },
      { label: "Critical Thinking", showTick: false },
    ],
  },
  {
    imageUrl: "/carreroptions/design.png",
    title: "Architecture",
    description: "Course Description",
    badges: [
      { label: "Creativity", showTick: true, tickPosition: "right" },
      { label: "Planning", showTick: false },
    ],
  },
  {
    imageUrl: "/carreroptions/fineart.png",
    title: "Psychology",
    description: "Course Description",
    badges: [{ label: "Human Behavior", showTick: true, tickPosition: "left" }],
  },
  {
    imageUrl: "/carreroptions/engineering.png",
    title: "Journalism",
    description: "Course Description",
    badges: [
      { label: "Media", showTick: true, tickPosition: "left" },
      { label: "Communication", showTick: true, tickPosition: "right" },
    ],
  },
  {
    imageUrl: "/carreroptions/design.png",
    title: "Computer Science",
    description: "Course Description",
    badges: [
      { label: "Coding", showTick: true, tickPosition: "left" },
      { label: "AI/ML", showTick: true, tickPosition: "right" },
    ],
  },
];
export default function CareerOption() {
  const cardScrollRef = useRef(null);
  const router = useRouter();

  const scroll = (dir) => {
    if (cardScrollRef.current) {
      cardScrollRef.current.scrollBy({
        left: dir === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-[90%] mx-auto relative mt-12">
      {/* Title */}
      <div className="text-center my-16">
        <h4 className="text-default text-2xl font-semibold uppercase">
          Careers Archive
        </h4>
        <h2 className="text-default md:text-[50px] text-4xl font-semibold my-4 ">
          {" "}
          A Collection of Career options
        </h2>
        <p className="text-default md:text-2xl text-xl font-medium md:w-[52%] mx-auto ">
          Read about the career options and the most important details to make a
          well informed decision for your future
        </p>
      </div>

      {/* Cards */}
      <div className="relative">
        <div
          ref={cardScrollRef}
          className="flex gap-4 scroll-pl-1 snap-x snap-mandatory overflow-x-auto scrollbar-hide py-4"
          style={{ scrollBehavior: "smooth" }}
        >
          {careerOptions.map((option, index) => (
            <div
              key={index}
              className="snap-start shrink-0"
              style={{ width: "300px" }}
            >
              <CareerOptionCard {...option} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex justify-between items-center">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-xl border-2 border-[#1B752A] bg-[#EFFEF1] shadow-md text-[#1B752A] font-semibold"
        >
          <ChevronLeft size={24} />
        </button>

        <Button
          text="See All Careers"
          variant="PrimarySmallOutlinedButton"
          onClick={() => router.push("/career")}
          className="md:ml-6 md:text-xl text-sm"
        />

        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-xl border-2 border-[#1B752A] bg-[#EFFEF1] shadow-md text-[#1B752A] font-semibold"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
