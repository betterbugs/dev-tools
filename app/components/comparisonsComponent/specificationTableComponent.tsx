"use client";
import React, { useRef, useState } from "react";
import SaleshandyIcon from "../theme/Icon/saleshandyIcon";
import NavvonIcon from "../theme/Icon/navvonIcon";
import KukuFmIcon from "../theme/Icon/kukufmIcon";
import KukuFmHoverIcon from "../theme/Icon/kukufmIconHover";
import PlutoIcon from "../theme/Icon/plutoIcon";
import InnovageIcon from "../theme/Icon/innovageIcon";
import GodhrejIcon from "../theme/Icon/godhrejIcon";
import ComparisonTableComponent from "./comparisonTableComponent";

const CLIENTS_TAB = [
  {
    id: 0,
    icon: <GodhrejIcon className="mx-auto md:w-20 md:h-20 hover:text-white" />,
  },
  {
    id: 1,
    icon: (
      <SaleshandyIcon className="mx-auto md:w-40 md:h-20 hover:text-white" />
    ),
  },
  {
    id: 2,
    icon: <NavvonIcon className="mx-auto md:w-24 md:h-24 hover:text-white" />,
  },
  {
    id: 3,
    icon: <KukuFmIcon className="mx-auto md:w-24 md:h-24" />,
    hoverIcon: <KukuFmHoverIcon className="mx-auto md:w-24 md:h-24" />,
  },
  {
    id: 4,
    icon: <PlutoIcon className="mx-auto md:w-24 md:h-24 hover:text-white" />,
  },
  {
    id: 5,
    icon: <InnovageIcon className="mx-auto md:w-24 md:h-24 hover:text-white" />,
  },
];

const SpecificationTableComponent = () => {
  const tabNavbarRef: any = useRef(null);
  const [activeTab, setActiveTab] = useState(CLIENTS_TAB[0]?.id);
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  const handleTabClick = async (key: any) => {
    setActiveTab(key);
  };

  return (
    <div className="md:container mx-auto">
      <div className="flex flex-col justify-center items-center py-12 lg:py-[50px]">
        <h2>Trusted by 3,000+ makers, builders and QA’s</h2>
        <div className="tabContainer md:mt-[10px] mt-8">
          <div className="tabNavbar !px-2" ref={tabNavbarRef}>
            {CLIENTS_TAB?.map((s: any, index: number) => (
              <div
                key={index}
                className="lg:mx-5 mx-3 cursor-pointer md:t-0 md:pt-0 pt-4"
              >
                <div
                  className={`${
                    activeTab === s.id
                      ? "text-white text-base"
                      : "text-white/80 hover:text-white"
                  }`}
                  onClick={() => handleTabClick(s?.id)}
                  style={{
                    transition: "all 0.3s ease-out",
                  }}
                >
                  {activeTab === s?.id || hoveredTab === s?.id
                    ? s?.hoverIcon || s?.icon
                    : s?.icon}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <ComparisonTableComponent />
      </div>
    </div>
  );
};

export default SpecificationTableComponent;
