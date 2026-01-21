import React from "react";

export const QaIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21 0H3C1.346 0 0 1.346 0 3V24H24V3C24 1.346 22.654 0 21 0ZM10.418 13.406L5.662 18.162L4.248 16.748L9.004 11.992L4.248 7.252L5.662 5.838L10.418 10.594C11.193 11.369 11.193 12.631 10.418 13.406ZM20 18H12V16H20V18Z"
        fill="#1B2422"
      />
    </svg>
  );
};
