import * as React from "react";

const EllipseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={6}
    height={7}
    viewBox="0 0 6 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={3} cy={3.4292} r={3} fill="white" />
  </svg>
);

export default EllipseIcon;
