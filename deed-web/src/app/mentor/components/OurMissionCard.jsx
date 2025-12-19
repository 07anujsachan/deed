import Badge from "@/components/ui/Badges";
import React from "react";
import clsx from "clsx";

const sizeStyles = {
  sm: "w-[260px]",
  md: "w-[300px] md:w-[400px]", // ✅ DEFAULT (same as before)
  lg: "w-[420px]",
};

const imageHeightStyles = {
  sm: "h-[220px]",
  md: "h-[300px] md:h-[400px]", // ✅ DEFAULT
  lg: "h-[420px]",
};

const titleSizeStyles = {
  sm: "text-lg",
  md: "text-xl", // ✅ DEFAULT
  lg: "text-2xl",
};

const variantStyles = {
  default: "p-4",
  compact: "p-3",
  guideline: "p-4",
};

export const MentorCard = ({
  name,
  title,
  description,
  image,
  badges,
  icon,

  // 🔹 Customization props
  size = "md",
  titleSize = "md",
  imageSize = "md",
  variant = "default",
  align = "center",
  backgroundColor = "bg-white",
  className = "",
}) => {
  return (
    <div
      className={clsx(
        "relative flex-shrink-0 rounded-2xl",
        sizeStyles[size],
        variantStyles[variant],
        backgroundColor,
        className
      )}
    >
      {/* IMAGE */}
      <div className={clsx("relative", imageHeightStyles[imageSize])}>
        <img
          src={image}
          alt={name || title || "card image"}
          className='rounded-2xl object-cover w-full h-full'
        />

        {/* BADGES */}
        {badges?.length > 0 && (
          <div className='absolute top-3 left-2 flex flex-col gap-1'>
            {badges.map((badge, index) => (
              <Badge key={index} color='blue' text={badge} />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className='p-4 space-y-2'>
        {(name || title) && (
          <div className={`text-${align}`}>
            {name && (
              <h3 className={clsx("font-semibold", titleSizeStyles[titleSize])}>
                {name}
              </h3>
            )}

            {title && (
              <h3 className={clsx("font-semibold", titleSizeStyles[titleSize])}>
                {title}
              </h3>
            )}

            {icon && <div className='text-gray-600 text-lg mt-1'>{icon}</div>}
          </div>
        )}

        {description && (
          <p
            className={clsx(
              "text-md text-gray-600 leading-relaxed",
              `text-${align}`
            )}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
