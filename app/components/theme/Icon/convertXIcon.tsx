import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const ConvertXIcon: React.FC<Props> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="3" ry="3" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M7 9h6l-2-2 1.4-1.4L17 8.2l-4.6 4.6L11 11l2-2H7V9z"/>
    <path d="M17 15H11l2 2-1.4 1.4L7 15.8l4.6-4.6L13 13l-2 2h6v0z"/>
  </svg>
);

export default ConvertXIcon;
