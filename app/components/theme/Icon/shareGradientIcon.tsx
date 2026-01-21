import * as React from "react";

const ShareGradientIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 6C10.1875 6 9.4375 5.6875 8.90625 5.1875L5.96875 6.65625C5.96875 6.75 6 6.875 6 7C6 7.15625 5.96875 7.25 5.96875 7.375L8.90625 8.84375C9.4375 8.34375 10.1875 8 11 8C12.6562 8 14 9.34375 14 11C14 12.6562 12.6562 14 11 14C9.34375 14 8 12.6562 8 11C8 10.875 8 10.75 8 10.6562L5.0625 9.1875C4.53125 9.6875 3.78125 10 3 10C1.34375 10 0 8.65625 0 7C0 5.34375 1.34375 4 3 4C3.78125 4 4.53125 4.34375 5.0625 4.84375L8 3.375C8 3.25 8 3.125 8 3C8 1.34375 9.34375 0 11 0C12.6562 0 14 1.34375 14 3C14 4.65625 12.6562 6 11 6Z"
      fill="url(#paint0_linear_7293_21992)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_7293_21992"
        x1="3.51877"
        y1="-0.999998"
        x2="14.7139"
        y2="-0.504566"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#16FCA9" />
        <stop offset="1" stop-color="#00D1FF" />
      </linearGradient>
    </defs>
  </svg>
);

export default ShareGradientIcon;
