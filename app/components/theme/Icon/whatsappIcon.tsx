import * as React from "react";

const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id="Icons"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    {...props}
    style={{
      cursor: "pointer", // Optional: Add pointer cursor on hover
    }}
  >
    <defs>
      <style>
        {`
        /* Define hover transition for the st8 path */
        .st8 {
          fill: #FFFFFFB3; /* Initial color */
          transition: fill 0.3s ease; /* Smooth transition on hover */
        }
        .st0 {
          fill: #000000; /* Hover color for st0 path */
        }
        svg:hover .st8 {
          fill: #25D366; /* Hover color for st8 path */
        }

        /* Define hover transition for the st0 path */
        .st0 {
          fill: #ffffff; /* Initial color */
          transition: fill 0.3s ease; /* Smooth transition on hover */
        }
        svg:hover .st0 {
          fill: #3A559F; /* Hover color for st0 path */
        }
      `}
      </style>
    </defs>
    <path
      className="st8"
      d="M17,0C8.7,0,2,6.7,2,15c0,3.4,1.1,6.6,3.2,9.2l-2.1,6.4c-0.1,0.4,0,0.8,0.3,1.1C3.5,31.9,3.8,32,4,32 c0.1,0,0.3,0,0.4-0.1l6.9-3.1C13.1,29.6,15,30,17,30c8.3,0,15-6.7,15-15S25.3,0,17,0z"
    />
    <path
      className="st0"
      d="M25.7,20.5c-0.4,1.2-1.9,2.2-3.2,2.4C22.2,23,21.9,23,21.5,23c-0.8,0-2-0.2-4.1-1.1c-2.4-1-4.8-3.1-6.7-5.8 L10.7,16C10.1,15.1,9,13.4,9,11.6c0-2.2,1.1-3.3,1.5-3.8c0.5-0.5,1.2-0.8,2-0.8c0.2,0,0.3,0,0.5,0c0.7,0,1.2,0.2,1.7,1.2l0.4,0.8 c0.3,0.8,0.7,1.7,0.8,1.8c0.3,0.6,0.3,1.1,0,1.6c-0.1,0.3-0.3,0.5-0.5,0.7c-0.1,0.2-0.2,0.3-0.3,0.3c-0.1,0.1-0.1,0.1-0.2,0.2 c0.3,0.5,0.9,1.4,1.7,2.1c1.2,1.1,2.1,1.4,2.6,1.6l0,0c0.2-0.2,0.4-0.6,0.7-0.9l0.1-0.2c0.5-0.7,1.3-0.9,2.1-0.6 c0.4,0.2,2.6,1.2,2.6,1.2l0.2,0.1c0.3,0.2,0.7,0.3,0.9,0.7C26.2,18.5,25.9,19.8,25.7,20.5z"
    />
  </svg>
);

export default WhatsappIcon;
