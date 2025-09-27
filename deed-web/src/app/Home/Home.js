"use client";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../components/UIComponents/PrimarySmallButton";

import { ChevronLeft, ChevronRight, ArrowRight, Search, X } from "lucide-react";
import MentorSection from "../components/Mentor";
import CareerOption from "../components/CareerOption";

export default function Home({ setTheme }) {
  const scrollRef = useRef(null);
  const [query, setQuery] = useState("");
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth; // container width ke hisaab se move karega
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const [showAllGuides, setShowAllGuides] = useState(false);
  const [active, setActive] = useState("design");
  const activeLink = useSelector((state) => state.global.activeTab);
  const dispatch = useDispatch();

  return (
    <div className="">
      <section className=" text-center mt-6 md:mt-12 px-6">
        <h1 className="text-4xl md:text-[80px] font-semibold leading-snug text-gray-900">
          <span className="">Get real life help about</span> <br />
          <span className="">Career options</span>
        </h1>

        <p className="mt-4 text-gray-600 mx-auto">
          Find the best career choice by accessing to the perspectives and life
          experiences of <br /> others
          <span className="font-semibold italic">
            who’ve been there, done that.
          </span>
        </p>

        {/* Search Bar */}
        <div className="flex justify-center md:mt-20 mt-12 mx-auto">
          <div className="flex items-center gap-2 md:w-[70%]  ">
            {/* Input wrapper */}
            <div className="flex items-center border border-gray-300 rounded-lg flex-grow px-3 py-2 bg-white">
              {/* Left Search Icon */}
              <Search size={18} className="text-gray-500 mr-2" />

              {/* Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Keyword"
                className="flex-grow text-gray-700 outline-none"
              />

              {/* Clear Button (Cross) */}
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-gray-500 ring-1 p-[2px] ring-gray-500 rounded-full"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            {/* Search Button */}
            <button className=" rounded-xl ring-inset ring-2 ring-[#1B752A] bg-[#EFFEF1] shadow-md text-[#1B752A] px-5 py-2  transition flex items-center gap-2">
              Search{" "}
              <span className="text-lg">
                <ArrowRight size={18} />
              </span>
            </button>
          </div>
        </div>
        <img src="/media/stats.png" alt="" className="w-full mt-20" />
      </section>
      {/* mentor  */}

      <MentorSection />
      {/* option section */}
      <div className="bg-[url('/media/carreroptionbg.png')] bg-cover bg-no-repeat w-full py-36 mt-12">
        <div className="mx-auto   my-10 md:w-[47%] flex flex-col justify-center items-center">
          <p className="text-xl  text-center font-semibold">
            Careers Assessment test
          </p>
          <h3 className="text-4xl md:text-5xl my-6 font-semibold leading-snug text-gray-900 w-[90%] text-center">
            Career Options for You
          </h3>
          <p className="mx-auto text-center text-xl font-semibold text-default ">
            A test where you don’t have to worry about marks!
          </p>
          <p className="mx-auto text-center text-lg font-regular text-default ">
            Go through a simple 10 mins assessment test to analyse your
            preferences and get some suggested career options
          </p>

          <Button
            text="Go to the Career Assessment Test"
            variant="PrimarySmallOutlinedButton"
            onClick={() => alert("Saved")}
            className="mt-6  md:text-xl text-sm "
          />
        </div>
      </div>
      {/* career options */}
      <div className="my-20">
        <CareerOption />
      </div>

      {/* career guide section */}
      {/* <div className="py-16">
        <div className="text-center">
          <h4 className="text-default text-2xl font-semibold uppercase">
            experience a career
          </h4>
          <h2 className="text-default text-[50px] font-semibold my-4 ">
            {" "}
            Talk to a Career Guide
          </h2>
          <p className="text-default text-2xl font-medium w-[57%] mx-auto ">
            Career guide is your friend to help! Get on a call with any career
            guide and discuss about the queries you have related to a career
            option
          </p>
        </div>
        <ul className="flex justify-center items-center my-10 ">
          <li
            onClick={() => {
              setActive("design");
            }}
            className={`py-1 px-3 border mr-5  ${
              active === "design"
                ? activeLink === "find"
                  ? "border-primaryButtonBg bg-white rounded-lg"
                  : "border-secondaryButtonBg bg-white rounded-lg"
                : "border-default rounded-lg"
            } `}
          >
            {" "}
            <a
              className={`font-semibold ${
                active === "design"
                  ? activeLink === "find"
                    ? "text-[#0050AE]"
                    : "text-secondaryButtonBg "
                  : "text-black"
              }`}
              href=""
            >
              Design
            </a>
          </li>
          <li
            onClick={() => {
              setActive("technology");
            }}
            className={`py-1 px-3 border mr-5  ${
              active === "technology"
                ? "border-[#0050AE] bg-white rounded-lg"
                : "border-default rounded-lg"
            } `}
          >
            {" "}
            <a
              className={`font-semibold ${
                active === "technology" ? "text-[#0050AE]" : "text-black"
              }`}
              href=""
            >
              Technology
            </a>
          </li>
          <li
            onClick={() => {
              setActive("aviation");
            }}
            className={`py-1 px-3 border mr-5 ${
              active === "aviation"
                ? "border-[#0050AE] bg-white rounded-lg"
                : "border-default rounded-lg"
            } `}
          >
            {" "}
            <a
              className={`font-semibold ${
                active === "aviation" ? "text-[#0050AE]" : "text-black"
              }`}
              href=""
            >
              Aviation
            </a>
          </li>
          <li
            onClick={() => {
              setActive("medical");
            }}
            className={`py-1 px-3 border mr-5 ${
              active === "medical"
                ? "border-[#0050AE] bg-white rounded-lg"
                : "border-default rounded-lg"
            } `}
          >
            {" "}
            <a
              className={`font-semibold ${
                active === "medical" ? "text-[#0050AE]" : "text-black"
              }`}
              href=""
            >
              Medical
            </a>
          </li>
          <li
            onClick={() => {
              setActive("teaching");
            }}
            className={`py-1 px-3 border mr-5 ${
              active === "teaching"
                ? "border-[#0050AE] bg-white rounded-lg"
                : "border-default rounded-lg"
            } `}
          >
            {" "}
            <a
              className={`font-semibold ${
                active === "teaching" ? "text-[#0050AE]" : "text-black"
              }`}
              href=""
            >
              Teaching
            </a>
          </li>
          <li
            onClick={() => {
              setActive("filters");
            }}
            className={`py-1 px-3 border mr-5  ${
              active === "filters"
                ? "border-[#0050AE] bg-white rounded-lg"
                : "border-default rounded-lg"
            } `}
          >
            {" "}
            <a
              className={`font-semibold ${
                active === "filters" ? "text-[#0050AE]" : "text-black"
              }`}
              href=""
            >
              See all filters
            </a>
          </li>
        </ul>
      </div> */}
      {/* Career Guides Section */}
      {/* <div className="py-16">
        <div className="flex     overflow-x-auto space-x-4 ">
          {displayedGuides.map((guide, index) => (
            <div
              key={index}
              className="bg-white basis-1/2  p-4 rounded-lg shadow-md"
            >
              <img
                src={guide.avatar}
                alt={guide.name}
                className=" rounded-lg mx-auto"
              />
              <h3 className="text-2xl text-default font-semibold  mt-4">
                {guide.name}
              </h3>
              <p className=" text-default text-lg font-normal ">
                {guide.workAt}
              </p>
              <p className=" text-default text-lg font-light mt-2">
                {guide.postGraduation}
              </p>
              <p className=" text-default text-lg font-light mt-2">
                {guide.graduation}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAllGuides(!showAllGuides)}
            className={`px-6 py-2 rounded-lg shadow-md text-white md:text-2xl text-md font-semibold  ${
              activeLink === "find"
                ? "bg-primaryButtonBg"
                : "bg-secondaryButtonBg"
            }`}
          >
            {showAllGuides ? "Show Less" : "Show All Guides"}
          </button>
        </div>
      </div> */}
      {/* career options  */}
      {/* <div className="bg-[url('/media/Group89.png')] bg-contain h-full bg-no-repeat  w-full py-[80px]  ">
        <div className="flex justify-center flex-col  items-center">
          <p className="text-default text-2xl font-semibold ">
            {" "}
            Career Assessment Test{" "}
          </p>
          <h4 className="text-default text-[56px] font-semibold my-4 ">
            Career option for you
          </h4>
          <p className=" text-2xl font-normal text-default text-center w-1/2 mt-4">
            A test where you don’t have to worry about marks! Go through a
            simple 10 mins assessment test to analyse your preferences and get
            some suggested career options
          </p>
          <div className=" flex justify-center items-center flex-col">
            <button
              className={`px-6 py-2 rounded-lg shadow-md text-white md:text-2xl text-md font-semibold  mt-9 ${
                activeLink === "find" ? "bg-[#0050AE]" : "bg-[#1B752A]"
              }`}
            >
              {" "}
              Go to the Career Assessment Test{" "}
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
