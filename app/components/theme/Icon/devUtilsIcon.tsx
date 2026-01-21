import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const DevUtilsIcon: React.FC<Props> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" {...props}>
    <path d="M14.7 6.3a4 4 0 10-5.657 5.657l-4.95 4.95a1 1 0 101.414 1.414l4.95-4.95A4 4 0 0014.7 6.3zM12 6a2 2 0 110 4 2 2 0 010-4z"/>
    <path d="M19.4 10.6l-1.2-.7-.7-1.2.7-1.2 1.2-.7 1.2.7.7 1.2-.7 1.2-1.2.7z"/>
  </svg>
);

export default DevUtilsIcon;
