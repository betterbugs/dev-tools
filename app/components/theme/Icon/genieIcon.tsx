import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const GenieIcon: React.FC<Props> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" {...props}>
    <path d="M3 11h2v2H3v-2zm16 0h2v2h-2v-2zM11 3h2v2h-2V3zm-5.657 2.343l1.414-1.414L8.172 5.343 6.757 6.757 5.343 5.343zm12.97 0L18.9 6.757 17.485 5.343l1.414-1.414 1.414 1.414zM9 15l6-6 1.414 1.414-6 6H9v-1.414z"/>
    <path d="M7 17h3v3H7z"/>
  </svg>
);

export default GenieIcon;
