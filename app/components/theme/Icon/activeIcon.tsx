import * as React from "react";

const ActiveIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={7.41187} cy={7.41187} r={3.41187} fill="#00DA92" />
    <circle
      cx={7.41187}
      cy={7.41187}
      r={5.41187}
      stroke="white"
      strokeOpacity={0.3}
      strokeWidth={4}
    />
  </svg>
);

export default ActiveIcon;
