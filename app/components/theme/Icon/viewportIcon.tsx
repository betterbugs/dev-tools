import * as React from "react";

const ViewportIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_2766_131)">
      <path
        d="M5.02501 6.99199H5.03301M8.22501 6.99199H8.23301M11.425 6.99199H11.433M3.42501 3.79199H16.225C17.1087 3.79199 17.825 4.50834 17.825 5.39199V14.992C17.825 15.8756 17.1087 16.592 16.225 16.592H3.42501C2.54136 16.592 1.82501 15.8756 1.82501 14.992V5.39199C1.82501 4.50834 2.54136 3.79199 3.42501 3.79199Z"
        stroke="#FAFAFA"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2766_131">
        <rect
          width={19.2}
          height={19.2}
          fill="white"
          transform="translate(0.225037 0.591797)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default ViewportIcon;
