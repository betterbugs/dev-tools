import * as React from "react";

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="50" height="50" rx="25" fill="currentColor" />
    <path
      d="M35.0117 22.9883C35.6419 23.418 35.9714 24.0052 36 24.75C35.9714 25.5234 35.6419 26.0964 35.0117 26.4688L22.6367 34.0312C21.9492 34.4609 21.2617 34.4896 20.5742 34.1172C19.8867 33.7161 19.5286 33.1146 19.5 32.3125V17.1875C19.5286 16.3854 19.8867 15.7839 20.5742 15.3828C21.2617 15.0104 21.9492 15.0247 22.6367 15.4258L35.0117 22.9883Z"
      fill="black"
    />
  </svg>
);

export default PlayIcon;
