import * as React from "react";

const TextConverterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 25 25"
    id="Text"
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
        gradientTransform="translate(-691.13 614.331)scale(.80097)"
        gradientUnits="userSpaceOnUse"
      />
    </defs>
    <g
      transform="translate(0 -1027.362)"
      fill="#000000"
      className="color000000 svgShape"
    >
      <rect
        width={25}
        height={25}
        y={1027.362}
        fill="url(#b)"
        rx={5.283}
        ry={5.283}
      />
      <path
        fill="#ffffff"
        d="M7 7v3h1V8h4v10H9.969v1H15v-1h-2V8h4v2h1V7H7z"
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
        transform="translate(0 1027.362)"
        className="colorffffff svgShape"
      />
    </g>
  </svg>
);

export default TextConverterIcon;
