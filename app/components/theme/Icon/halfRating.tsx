import React from "react";

export const HalfRatingIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={18}
      height={17}
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.47553 1.08156L10.7696 5.06434C10.9704 5.68237 11.5464 6.10081 12.1962 6.10081H16.3839C16.8683 6.10081 17.0697 6.72062 16.6778 7.00532L13.2899 9.46681C12.7641 9.84878 12.5442 10.5258 12.745 11.1439L14.0391 15.1266C14.1887 15.5873 13.6615 15.9704 13.2696 15.6857L9.88168 13.2242C9.35595 12.8422 8.64405 12.8422 8.11832 13.2242L4.73037 15.6857C4.33851 15.9704 3.81127 15.5873 3.96095 15.1266L5.25503 11.1439C5.45584 10.5258 5.23585 9.84878 4.71012 9.46681L1.32217 7.00532C0.930313 6.72062 1.1317 6.10081 1.61606 6.10081H5.8038C6.45364 6.10081 7.02958 5.68237 7.23039 5.06434L8.52447 1.08156C8.67415 0.620905 9.32585 0.620901 9.47553 1.08156Z"
        fill="url(#paint0_linear_615_4629)"
        stroke="#F9B628"
      />
      <defs>
        <linearGradient
          id="paint0_linear_615_4629"
          x1={1.5}
          y1={5.5}
          x2={16.5}
          y2={5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F9B628" />
          <stop offset={0.526042} stopColor="#F9B628" />
          <stop offset={0.526142} stopColor="#F9B628" stopOpacity={0} />
          <stop offset={1} stopColor="#F9B628" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
};
