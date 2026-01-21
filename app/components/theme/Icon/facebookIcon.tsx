import * as React from "react";

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentcolor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.2857 -0.00878906C15.2143 -0.00878906 16 0.776925 16 1.7055V14.2769C16 15.2412 15.2143 15.9912 14.2857 15.9912H9.35714V10.5626H11.4286L11.8214 7.99121H9.35714V6.34835C9.35714 5.63407 9.71429 4.9555 10.8214 4.9555H11.9286V2.77693C11.9286 2.77693 10.9286 2.59835 9.92857 2.59835C7.92857 2.59835 6.60714 3.84835 6.60714 6.06264V7.99121H4.35714V10.5626H6.60714V15.9912H1.71429C0.75 15.9912 0 15.2412 0 14.2769V1.7055C0 0.776925 0.75 -0.00878906 1.71429 -0.00878906H14.2857Z"
      fill="currentcolor"
      // fillOpacity={0.6}
    />
  </svg>
);

export default FacebookIcon;
