import * as React from "react";

const RegexIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.225 2.99219V10.9922M10.761 4.99219L17.689 8.99219M10.761 8.99219L17.689 4.99219M7.82502 14.1922C7.82502 13.7678 7.65645 13.3609 7.3564 13.0608C7.05634 12.7608 6.64937 12.5922 6.22502 12.5922H4.62502C4.20068 12.5922 3.79371 12.7608 3.49365 13.0608C3.1936 13.3609 3.02502 13.7678 3.02502 14.1922V15.7922C3.02502 16.2165 3.1936 16.6235 3.49365 16.9236C3.79371 17.2236 4.20068 17.3922 4.62502 17.3922H6.22502C6.64937 17.3922 7.05634 17.2236 7.3564 16.9236C7.65645 16.6235 7.82502 16.2165 7.82502 15.7922V14.1922Z"
      stroke="#FAFAFA"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default RegexIcon;
