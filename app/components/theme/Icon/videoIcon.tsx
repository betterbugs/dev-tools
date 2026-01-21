import * as React from "react";

const VideoIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_2766_62)">
      <path
        d="M13.225 10.392L17.4034 13.1776C17.4636 13.2177 17.5336 13.2407 17.6059 13.2441C17.6781 13.2476 17.75 13.2314 17.8138 13.1972C17.8776 13.1631 17.9309 13.1123 17.9681 13.0502C18.0053 12.9882 18.0249 12.9172 18.025 12.8448V6.28801C18.025 6.21763 18.0064 6.14849 17.9712 6.08757C17.9359 6.02665 17.8852 5.97611 17.8242 5.94105C17.7632 5.90599 17.694 5.88765 17.6236 5.88789C17.5532 5.88813 17.4842 5.90694 17.4234 5.94241L13.225 8.39201M3.62496 4.79199H11.625C12.5086 4.79199 13.225 5.50834 13.225 6.39199V12.792C13.225 13.6756 12.5086 14.392 11.625 14.392H3.62496C2.74131 14.392 2.02496 13.6756 2.02496 12.792V6.39199C2.02496 5.50834 2.74131 4.79199 3.62496 4.79199Z"
        stroke="#FAFAFA"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2766_62">
        <rect
          width={19.2}
          height={19.2}
          fill="white"
          transform="translate(0.424988 -0.00830078)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default VideoIcon;
