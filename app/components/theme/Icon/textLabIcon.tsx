import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const TextLabIcon: React.FC<Props> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M8 8h8v2h-3v8h-2V10H8V8z"/>
  </svg>
);

export default TextLabIcon;
