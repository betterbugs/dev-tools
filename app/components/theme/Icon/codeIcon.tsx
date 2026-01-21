import * as React from "react";

const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 25 25"
    id="Code"
    {...props}
  >
    <defs>
      <linearGradient id="a">
        <stop
          offset={0}
          stopColor="#00da92"
          className="stopColor24f3d2 svgShape"
        />
        <stop
          offset={0.394}
          stopColor="#06f0a3"
          className="stopColor0674f0 svgShape"
        />
        <stop
          offset={0.507}
          stopColor="#61b599"
          className="stopColor6961b5 svgShape"
        />
        <stop
          offset={0.813}
          stopColor="#46f3ba"
          className="stopColorf34660 svgShape"
        />
        <stop
          offset={1}
          stopColor="#07eea2"
          className="stopColoree078d svgShape"
        />
      </linearGradient>
      <linearGradient
        xlinkHref="#a"
        id="b"
        x1={868.253}
        x2={937.656}
        y1={521.354}
        y2={588.736}
        gradientTransform="translate(-695.12 619.834)scale(.80097)"
        gradientUnits="userSpaceOnUse"
      />
    </defs>
    <g
      fill="#ffffff"
      transform="translate(3.991 -1032.865)"
      className="colorffffff svgShape"
    >
      <rect
        width={25}
        height={25}
        x={-3.991}
        y={1032.865}
        fill="url(#b)"
        rx={5.283}
        ry={5.283}
      />
      <path
        d="M5 6v14h16V6H5zm1 1h14v2H6V7zm0 3h14v9H6v-9zm5.313 2.031L8.937 14.5l2.376 2.469.718-.688-1.719-1.781 1.72-1.781-.72-.688zm3.374 0-.718.688 1.719 1.781-1.72 1.781.72.688 2.406-2.469-2.407-2.469z"
        color="#000"
        fontFamily="sans-serif"
        fontWeight={400}
        overflow="visible"
        style={{
          textIndent: 0,
          textAlign: "start",
          lineHeight: "normal",
          textTransform: "none",
        }}
        transform="translate(-3.991 1032.865)"
        fill="#000000"
        className="color000000 svgShape"
      />
    </g>
  </svg>
);

export default CodeIcon;
