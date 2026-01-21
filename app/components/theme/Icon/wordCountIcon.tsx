import * as React from "react";

const WordCountIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    fill="currentColor"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <rect width={16} height={16} id="icon-bound" fill="none" />
      <path
        id="list-numbered"
        d="M0,10l0,-1l2,0c0.552,0 1,0.448 1,1l0,1c-0,0.552 -0.448,1 -1,1l-0.75,0c-0.066,-0 -0.13,0.026 -0.177,0.073c-0.047,0.047 -0.073,0.111 -0.073,0.177c0,0.153 0,0.347 0,0.5c-0,0.066 0.026,0.13 0.073,0.177c0.047,0.047 0.111,0.073 0.177,0.073l1.75,0l0,1l-2,0c-0.552,-0 -1,-0.448 -1,-1l0,-1c0,-0.552 0.448,-1 1,-1l0.75,-0c0.066,0 0.13,-0.026 0.177,-0.073c0.047,-0.047 0.073,-0.111 0.073,-0.177c0,-0.153 0,-0.347 0,-0.5c0,-0.066 -0.026,-0.13 -0.073,-0.177c-0.047,-0.047 -0.111,-0.073 -0.177,-0.073l-1.75,0Zm4,1l12,0l0,2l-12,0l0,-2Zm0,-4l12,0l0,2l-12,0l0,-2Zm-3,-3.75c0,-0.066 -0.026,-0.13 -0.073,-0.177c-0.047,-0.047 -0.111,-0.073 -0.177,-0.073l-0.75,0l0,-1l1,0c0.552,0 1,0.448 1,1c-0,1.185 0,4 0,4l-1,0l0,-3.75Zm3,-0.25l12,0l0,2l-12,0l0,-2Z"
      />
    </g>
  </svg>
);

export default WordCountIcon;
