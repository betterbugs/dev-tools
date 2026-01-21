import * as React from "react";

const AsanaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="mask0_4501_11163"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={1}
      width={20}
      height={18}
    >
      <path
        d="M14.1318 5.372C14.1318 7.64545 12.2774 9.49669 10 9.49669C7.7226 9.49669 5.86815 7.64545 5.86815 5.372C5.86815 3.09855 7.7226 1.24731 10 1.24731C12.3099 1.24731 14.1318 3.06608 14.1318 5.372ZM4.63185 10.5035C2.35445 10.5035 0.5 12.3547 0.5 14.6282C0.5 16.9016 2.35445 18.7529 4.63185 18.7529C6.90925 18.7529 8.7637 16.9016 8.7637 14.6282C8.7637 12.3547 6.94178 10.5035 4.63185 10.5035ZM15.3682 10.5035C13.0908 10.5035 11.2363 12.3547 11.2363 14.6282C11.2363 16.9016 13.0908 18.7529 15.3682 18.7529C17.6455 18.7529 19.5 16.9016 19.5 14.6282C19.5 12.3547 17.6781 10.5035 15.3682 10.5035Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_4501_11163)">
      <path
        d="M9.99983 1.05249C15.7584 1.05249 20.4108 5.69682 20.4108 11.4454C20.4108 17.194 15.7584 21.8383 9.99983 21.8383C4.24126 21.8383 -0.411133 17.194 -0.411133 11.4454C-0.378599 5.69682 4.2738 1.05249 9.99983 1.05249Z"
        fill="url(#paint0_radial_4501_11163)"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_4501_11163"
        cx={0}
        cy={0}
        r={1}
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(10.0122 11.4363) rotate(-90) scale(10.3888 10.4068)"
      >
        <stop stopColor="#FFB900" />
        <stop offset={0.6} stopColor="#F95D8F" />
        <stop offset={0.9991} stopColor="#F95353" />
      </radialGradient>
    </defs>
  </svg>
);

export default AsanaIcon;
