import * as React from "react";

const NetworkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={21}
    height={20}
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_2953_1080)">
      <path
        d="M8.02527 10.2006L9.62527 11.8006L12.8253 8.60059M16.8253 11.0006C16.8253 15.0006 14.0253 17.0006 10.6973 18.1606C10.523 18.2196 10.3337 18.2168 10.1613 18.1526C6.82527 17.0006 4.02527 15.0006 4.02527 11.0006V5.40056C4.02527 5.18838 4.10955 4.9849 4.25958 4.83487C4.40961 4.68484 4.6131 4.60056 4.82527 4.60056C6.42527 4.60056 8.42527 3.64055 9.81727 2.42455C9.98675 2.27975 10.2024 2.2002 10.4253 2.2002C10.6482 2.2002 10.8638 2.27975 11.0333 2.42455C12.4333 3.64855 14.4253 4.60056 16.0253 4.60056C16.2374 4.60056 16.4409 4.68484 16.591 4.83487C16.741 4.9849 16.8253 5.18838 16.8253 5.40056V11.0006Z"
        stroke="#171717"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2953_1080">
        <rect
          width={19.2}
          height={19.2}
          fill="white"
          transform="translate(0.825195 0.600586)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default NetworkIcon;
