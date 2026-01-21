import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const CodeForgeIcon: React.FC<Props> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} fill="currentColor" {...props}>
    <path d="M8.5 7.5L5 11l3.5 3.5L7 16 3 12l4-4 1.5 1.5zM15.5 7.5L17 8.9 20.9 12 17 15.1l-1.5 1.4L19 12l-3.5-4.5z"/>
    <path d="M12 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z"/>
  </svg>
);

export default CodeForgeIcon;
