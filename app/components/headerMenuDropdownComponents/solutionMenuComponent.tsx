'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import QualityIcon from '../theme/Icon/qualityIcon';
import DeveloperIcon from '../theme/Icon/developersLogIcon';
import ManagerIcon from '../theme/Icon/managerIcon';
import SupportTeamIcon from '../theme/Icon/supportTeamIcon';
import FounderIcon from '../theme/Icon/founderIcon';
import Image from 'next/image';
import ComaresionBugHeardIcon from '../theme/Icon/comaresionBugHeardIcon';
import { WEB_URL } from '@/app/libs/constants';
// import { fetchComparisonAPI } from '@/api/comparison';

const RoleMenu = [
  {
    icon: <QualityIcon />,
    label: 'QA Engineers',
    url: `${WEB_URL}/solution/qa-engineers`,
  },
  {
    icon: <DeveloperIcon className="mx-1 " />,
    label: 'Developers',
    url: `${WEB_URL}/solution/developers`,
  },
  {
    icon: <ManagerIcon />,
    label: 'Managers',
    url: `${WEB_URL}/solution/managers`,
  },
  {
    icon: <SupportTeamIcon />,
    label: 'Support Teams',
    url: `${WEB_URL}/solution/support-teams`,
  },
  {
    icon: <FounderIcon />,
    label: 'Founders',
    url: `${WEB_URL}/solution/founders`,
  },
];

// Default fallback menu
const defaultComparesionsMenu = [
  {
    icon: <ComaresionBugHeardIcon />,
    label: 'BetterBugs.io vs. BugHerd',
    url: `${WEB_URL}/comparisons/betterbugs-io-vs-bugherd`,
  },
];

// const PartnershipMenu = [
//   {
//     icon: <EnterpriseIcon />,
//     label: "Enterprise companies",
//     url: "/",
//   },
//   { icon: <AgenciesIcon />, label: "For agencies", url: "/" },
//   { icon: <HireProfessionalsIcon />, label: "Hire a professional", url: "/" },
// ];

interface SolutionMenuComponentProps {
  setCollapsed: (d: any) => void;
}

const SolutionMenuComponent = (props: SolutionMenuComponentProps) => {
  const { setCollapsed } = props;
  const pathname = usePathname();
  const [comparesionsMenu, setComparesionsMenu] = useState(
    defaultComparesionsMenu
  );

  // useEffect(() => {
  //   const fetchComparisons = async () => {
  //     try {
  //       const response = await fetchComparisonAPI({});
  //       if (response?.ok) {
  //         const data = await response.json();
  //         if (data?.data && data?.data?.length > 0) {
  //           const menuItems = data?.data?.map((item: any) => {
  //             const attributes = item?.attributes || {};
  //             return {
  //               icon: (
  //                 <Image
  //                   src={attributes?.Navigation_Icon?.data?.attributes?.url}
  //                   alt={
  //                     attributes?.Navigation_Icon?.data?.attributes?.name ||
  //                     'compare-icon'
  //                   }
  //                   width={24}
  //                   height={24}
  //                 />
  //               ),
  //               label: attributes?.Navigation_Title || 'Comparison',
  //               url: `/comparisons/${attributes?.Slug}`,
  //             };
  //           });
  //           setComparesionsMenu(menuItems);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching comparisons:', error);
  //       // Keep default menu on error
  //     }
  //   };

  //   fetchComparisons();
  // }, []);

  return (
    <>
      <div className="absolute top-[25px] lg:left-[-378px] 2xl:left-[-375px] md:block hidden mx-auto bg-[#111111] !w-[1280px]">
        <div className="py-14 px-0">
          <div className="flex gap-10 justify-center">
            <div className="flex flex-row justify-start items-start w-[42%] p-4">
              <div className="flex-shrink-0 mt-[35px]">
                <Image
                  src={'/images/bb-icon.svg'}
                  alt={'bb-logo'}
                  width={90}
                  height={90}
                />
              </div>
              <div className="flex flex-col justify-start ml-6">
                <p className="text-base text-white/80 pb-1">OVERVIEW</p>
                <p className="text-base text-white/80 tracking-[0.5px] mt-1">
                  BetterBugs is made for you, regardless of your role. It&#39;s
                  perfect for QA professionals, developers, managers, support
                  teams, and company founders.
                </p>
              </div>
            </div>
            {/* role */}
            <ul className="grid mt-6">
              <p className="text-sm font-medium text-white/70 ml-3 pb-4">
                SOLUTIONS BY ROLE
              </p>
              {RoleMenu.map((menu: any, index: any) => {
                return (
                  <li key={`${menu.label}_${index}`} className="md:px-3 py-1.5">
                    <Link
                      href={menu?.url}
                      className={`${
                        pathname === menu?.url && 'text-white'
                      } text-white/70 hover:text-white`}
                    >
                      <p className="flex text-center font-normal text-base">
                        <span className="mr-2 mt-1">{menu.icon}</span>
                        {menu.label}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* PartnershipMenu */}
            <ul className="mt-6">
              <p className="text-sm font-medium text-white/70 ml-3 pb-4">
                COMPARISON
              </p>
              {comparesionsMenu.map((menu: any, index: any) => {
                return (
                  <li key={`${menu.label}_${index}`} className="md:px-3 py-1.5">
                    <Link
                      href={menu?.url}
                      className={`${
                        pathname === menu?.url && 'text-white'
                      } text-white/70 hover:text-white`}
                    >
                      <p className="flex text-center font-normal text-base">
                        <span className="mr-2 mt-1">{menu.icon}</span>
                        {menu.label}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* responsive view */}
      <div className="md:hidden block">
        {/* role */}
        <ul className="grid mt-6">
          <p className="text-xs font-normal text-white/80 pb-4">
            SOLUTION BY ROLE
          </p>
          {RoleMenu.map((menu: any, index: any) => {
            return (
              <li key={`${menu.label}_${index}`} className="md:px-3 py-1.5">
                <Link
                  href={menu?.url}
                  className={`${
                    pathname === menu?.url && 'text-white'
                  } text-white/80 hover:text-white`}
                  onClick={() => setCollapsed(false)}
                >
                  <p className="flex text-center font-normal text-base">
                    <span className="mr-2 mt-1">{menu.icon}</span>
                    {menu.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* PartnershipMenu */}
        <ul className="grid mt-6">
          <p className="text-xs font-normal text-white/80 pb-4">COMPARISON</p>
          {comparesionsMenu.map((menu: any, index: any) => {
            return (
              <li key={`${menu.label}_${index}`} className="md:px-3 py-1.5">
                <Link
                  href={menu?.url}
                  className={`${
                    pathname === menu?.url && 'text-white'
                  } text-white/80 hover:text-white`}
                  onClick={() => setCollapsed(false)}
                >
                  <p className="flex text-center font-normal text-base">
                    <span className="mr-2 mt-1">{menu.icon}</span>
                    {menu.label}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default SolutionMenuComponent;
