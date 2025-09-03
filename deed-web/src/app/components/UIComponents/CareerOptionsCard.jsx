import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";

const CareerOptionCard = ({ imageUrl, title, description, badges = [] }) => {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white p-4">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={300}
          className="rounded-md"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="flex items-center gap-1 bg-[#0085D8] text-white text-sm font-medium px-3 py-1 rounded-lg"
            >
              {badge.showTick && badge.tickPosition === "left" && (
                <span>
                  <Check width={16} />
                </span>
              )}
              <span>{badge.label}</span>
              {badge.showTick && badge.tickPosition === "right" && (
                <span>
                  <Check width={16} />
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default CareerOptionCard;
