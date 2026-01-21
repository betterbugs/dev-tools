import * as React from "react";

const DeviceIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_2766_17)">
      <path
        d="M4.02502 3.79189C4.02502 3.36755 4.19359 2.96058 4.49365 2.66052C4.79371 2.36047 5.20067 2.19189 5.62502 2.19189H15.225C15.6494 2.19189 16.0563 2.36047 16.3564 2.66052C16.6564 2.96058 16.825 3.36755 16.825 3.79189V16.5919C16.825 17.0162 16.6564 17.4232 16.3564 17.7233C16.0563 18.0233 15.6494 18.1919 15.225 18.1919H13.305M6.42502 14.9919H6.43302M4.02502 6.99189H8.82502C9.70867 6.99189 10.425 7.70824 10.425 8.59189V16.5919C10.425 17.4756 9.70867 18.1919 8.82502 18.1919H4.02502C3.14136 18.1919 2.42502 17.4756 2.42502 16.5919V8.59189C2.42502 7.70824 3.14136 6.99189 4.02502 6.99189Z"
        stroke="#FAFAFA"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2766_17">
        <rect
          width={19.2}
          height={19.2}
          fill="white"
          transform="translate(0.0250244 0.591797)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default DeviceIcon;
