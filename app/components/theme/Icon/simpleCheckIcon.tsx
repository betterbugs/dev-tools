import * as React from "react";

const SimpleCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19 8L10.5 16.5C10.375 16.6667 10.2083 16.75 10 16.75C9.79167 16.75 9.61458 16.6771 9.46875 16.5312L4.96875 12.0312C4.67708 11.6771 4.67708 11.3229 4.96875 10.9688C5.32292 10.6771 5.67708 10.6771 6.03125 10.9688L10 14.9375L17.9688 6.96875C18.3229 6.67708 18.6771 6.67708 19.0312 6.96875C19.3229 7.32292 19.3125 7.66667 19 8Z"
      fill="#00DA92"
    />
  </svg>
);

export default SimpleCheckIcon;
