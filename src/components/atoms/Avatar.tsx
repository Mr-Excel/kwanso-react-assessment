import type { ImgHTMLAttributes } from "react";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg" | "xl";
  alt: string;
}

export const Avatar = ({
  src,
  alt,
  size = "md",
  className = "",
  ...props
}: AvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const fallbackInitials = alt
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full bg-gray-200 flex items-center justify-center
        overflow-hidden flex-shrink-0
        ${className}
      `}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          {...props}
        />
      ) : (
        <span className="text-gray-600 font-medium text-xs">
          {fallbackInitials}
        </span>
      )}
    </div>
  );
};

