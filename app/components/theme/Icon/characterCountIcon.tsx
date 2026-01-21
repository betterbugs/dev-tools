import * as React from "react";

const CharacterCountIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 48 48"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <rect width={48} height={48} fill="white" fillOpacity={0.01} />
      <path
        d="M20 9H42"
        stroke="#fffffffff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 19H42"
        stroke="#fffffffff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 29H42"
        stroke="#fffffffff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 39H42"
        stroke="#fffffffff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 29H12L6 39H12"
        stroke="#fffffffff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M11 8.9999L7 9L6.3 16H11.7L11 8.9999Z" fill="#fffff" />
      <path
        d="M6 19L6.3 16M12 19L11.7 16M11.7 16L11 8.9999L7 9L6.3 16M11.7 16H6.3"
        stroke="#fffffffff"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);

export default CharacterCountIcon;
