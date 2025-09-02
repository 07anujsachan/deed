import { Check, ChevronDown, GraduationCap } from "lucide-react";
import { useState } from "react";

const MentorCard = ({ imageUrl, tags = [], name, title, education = [] }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-2xl  h-[540px]  shadow-md p-4 w-full max-w-xs border">
      {/* Image + Tags */}
      <div className="relative rounded-xl overflow-hidden aspect-square bg-checkerboard">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-1 bg-[#0085D8] text-white text-sm font-medium px-3 py-1 rounded-lg"
            >
              <Check size={16} />
              {tag}
            </div>
          ))}
        </div>
      </div>

      {/* Name and Job Title */}
      <div className="mt-4">
        <h2 className="text-xl font-bold text-black">{name}</h2>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>

      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center mt-4 text-left"
      >
        <span className="text-sm font-semibold text-gray-800">Education</span>
        <ChevronDown
          className={`transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
          size={18}
        />
      </button>

      {/* Accordion Content */}
      {isExpanded && (
        <div className="space-y-4 mt-3">
          {education.map((item, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-[#0085D8]">
                <GraduationCap size={16} />
              </div>
              <div>
                <h3 className="font-bold text-black leading-tight text-sm">
                  {item.degree}
                </h3>
                <p className="text-sm text-gray-700 leading-snug whitespace-pre-line">
                  {item.institute}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentorCard;
