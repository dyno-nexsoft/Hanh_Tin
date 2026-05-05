import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * Double Happiness (Song Hỷ) SVG Icon component.
 */
export const DoubleHappinessIcon = ({ size = 24, className, ...props }: IconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M4 4v2h2v2H4v2h2v2H4v2h2v2H4v2h2v2h2v-2h2v2h2v-2h2v2h2v-2h2v-2h-2v-2h2v-2h-2v-2h2v-2h-2V6h2V4h-2V2h-2v2h-2V2h-2v2h-2V2h-2v2H8V2H6v2H4zm4 4h2v2H8V8zm0 4h2v2H8v-2zm8-4h2v2h-2V8zm0 4h2v2h-2v-2z" />
    </svg>
  );
};
