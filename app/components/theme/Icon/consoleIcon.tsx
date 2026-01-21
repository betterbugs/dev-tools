import * as React from "react";

const ConsoleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.625 14.1918L8.425 9.3918L3.625 4.5918M10.025 15.7918H16.425"
      stroke="#FAFAFA"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ConsoleIcon;
