import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

const ConverterIcon: React.FC<Props> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} {...props}>
    <path
      d="M0 0 C13.2 0 26.4 0 40 0 C40 16.5 40 33 40 50 C26.8 50 13.6 50 0 50 C0 42.08 0 34.16 0 26 C7.26 26 14.52 26 22 26 C21.67 25.34 21.34 24.68 21 24 C14.07 24 7.14 24 0 24 C0 16.08 0 8.16 0 0 Z "
      fill="#40C056"
      transform="translate(10,0)"
    />
    <path
      d="M0 0 C3.3 0 6.6 0 10 0 C10 0.66 10 1.32 10 2 C6.7 2 3.4 2 0 2 C0 1.34 0 0.68 0 0 Z "
      fill="#3FBF56"
      transform="translate(0,24)"
    />
  </svg>
);

export default ConverterIcon;
