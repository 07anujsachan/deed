import Image from "next/image";
import React from "react";
import Badge from "./Badges";
export const OurMissionCard = ({
  name,
  title,
  description,
  image,
  badges,
  icon,
}) => {
  return (
    <div className='relative w-[300px] md:w-[400px] flex-shrink-0 rounded-2xl bg-white p-4'>
      {/* Image */}
      <div className='relative h-[300px] md:h-[400px]'>
        <img
          src={image}
          alt={image}
          className='rounded-2xl object-cover w-full h-full'
        />

        {/* Badge (optional) */}
        {badges?.length > 0 && (
          <div className='absolute top-3 left-2 flex flex-col gap-1'>
            {badges.map((badge, index) => (
              <Badge color='blue' text={badge} key={index} />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className='p-4 space-y-2'>
        <div className='text-center'>
          {name && (
            <h3 className='text-center text-xl font-semibold'>{name}</h3>
          )}

          {/* Icon (optional) */}
          {icon && <div className='text-gray-600 text-lg'>{icon}</div>}
        </div>

        {title && (
          <h3 className='text-center text-xl font-semibold'>{title}</h3>
        )}

        <p className='text-center text-md text-gray-600 leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
  );
};
