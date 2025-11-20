import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export const Card = ({
  children,
  padding = "md",
  hover = false,
  className = "",
  ...props
}: CardProps) => {
  const paddingClasses = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200 shadow-sm
        ${paddingClasses[padding]}
        ${hover ? "transition-shadow hover:shadow-md cursor-pointer" : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

