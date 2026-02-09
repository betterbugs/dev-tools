'use client';
import { Button, Collapse, Drawer, Dropdown, Menu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import {
  LayoutContext,
  LayoutContextModel,
} from '@/app/contexts/layoutContexts';
import CrossIcon from '../../theme/Icon/crossIcon';
import MenuIcon from '../../theme/Icon/menuIcon';
import { Extension_URL, WEB_URL } from '@/app/libs/constants';
import DownOutlinedIcon from '../../theme/Icon/downOutlinedIcon';
import hederStyles from '../Header/headerStyles.module.scss';
import { detectBrowser } from '@/app/libs/helpers';
import EdgeIcon from '../../theme/Icon/edgeIcon';
import ProductMenuComponent from '../../headerMenuDropdownComponents/productMenuComponent';
import SolutionMenuComponent from '../../headerMenuDropdownComponents/solutionMenuComponent';
import ResourceMenuComponent from '../../headerMenuDropdownComponents/resourceMenuComponent';
import ToolsMenuComponent from '../../headerMenuDropdownComponents/toolsMenuComponent';

const responsiveHeader = [
  // {
  //   key: "1",
  //   header: "Blog",
  //   url: "/blog",
  // },
  {
    key: '1',
    header: 'Pricing',
    url: '/pricing',
  },
  // {
  //   key: "3",
  //   header: "Developer Tools",
  //   url: "/development-tools",
  // },
  {
    key: '2',
    header: 'BB for Support',
    url: '/customer-support',
  },
  {
    key: '3',
    header: 'MCP',
    url: '/mcp',
  },
];

// const AnnouncementBanner = ({
//   handleCloseBanner,
//   showBanner,
//   isClosing,
// }: any) => (
//   <>
//     {/* {showBanner && (
//       <div
//         className={`bg-[#111111] text-center flex items-center justify-center relative py-[13px] px-[16px] ${
//           isClosing ? "slide-up" : "slide-down"
//         }`}
//       > */}
//     {/* Desktop version */}
//     {/* <div className="text-white hidden lg:flex items-center justify-center gap-[12px] text-sm w-[784px]">
//           <div className="flex">
//             <ProductHuntIcon />
//           </div>
//           <div className="flex flex-col">
//             <span className="text-start text-[16px] font-medium leading-[24px]">
//               We&apos;re Live on Product Hunt!
//             </span>
//             <span className="text-[12px] text-start text-white/60 font-normal leading-[21px]">
//               Help us make a splash! If you love BetterBugs, please take a
//               moment to vote for us on Product Hunt. Your support means the
//               world and helps us grow!
//             </span>
//           </div>
//           <div className="hover:cursor-pointer">
//             <a
//               href="https://www.producthunt.com/posts/betterbugs-io?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-betterbugs&#0045;io"
//               target="_blank"
//             >
//               <img
//                 src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=612916&theme=light&period=daily"
//                 alt="BetterBugs&#0046;io - Capture&#0032;bugs&#0044;&#0032;record&#0032;sessions&#0044;&#0032;and&#0032;fix&#0032;with&#0032;AI | Product Hunt"
//                 width="250"
//                 height="54"
//               />
//             </a>
//           </div>
//         </div> */}

//     {/* Mobile version */}
//     {/* <div className="lg:hidden flex flex-col items-center justify-center gap-2">
//           <div className="flex gap-2">
//             <img
//               src="/images/product_hunt_icon.jpeg.png"
//               alt="Product Hunt Icon"
//               className="w-[40px] h-[40px] mt-1"
//             />
//             <span className="text-start text-[16px] font-medium leading-[24px]">
//               We&apos;re Live on
//               <div>Product Hunt!</div>
//             </span>
//           </div>
//           <div className="hover:cursor-pointer">
//           <a
//               href="https://www.producthunt.com/posts/betterbugs-io?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-betterbugs&#0045;io"
//               target="_blank"
//             >
//               <img
//                 src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=612916&theme=light&period=daily"
//                 alt="BetterBugs&#0046;io - Capture&#0032;bugs&#0044;&#0032;record&#0032;sessions&#0044;&#0032;and&#0032;fix&#0032;with&#0032;AI | Product Hunt"
//                 width="250"
//                 height="54"
//               />
//             </a>
//           </div>
//         </div>

//         <button
//           onClick={handleCloseBanner}
//           className="absolute right-4 top-10 text-white/60 p-2 hover:text-white"
//         >
//           <CrossIcon className="w-3 h-3 !text-white/60 hover:text-white" />
//         </button> */}
//     {/* </div>
//     )} */}
//     {/* {showBanner && (
//       <a
//         href="https://www.producthunt.com/posts/betterbugs-io?embed=true&utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-betterbugs&#0045;io"
//         target="_blank"
//         className="fixed bottom-8 z-50 hover:opacity-80 left-24 lg:left-10"
//       >
//         <img
//           src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=612916&theme=light&period=daily"
//           alt="BetterBugs&#0046;io - Capture&#0032;bugs&#0044;&#0032;record&#0032;sessions&#0044;&#0032;and&#0032;fix&#0032;with&#0032;AI | Product Hunt"
//           width="250"
//           height="54"
//         />
//       </a>
//     )} */}
//   </>
// );

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2024-12-31T23:59:59');
    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-[rgba(0,0,1)] bg-white/60 py-[12px] px-[16px] rounded-[8px]">
      <span className="text-black">{timeLeft.days} Days : </span>
      <span className="text-black">{timeLeft.hours} Hours : </span>
      <span className="text-black">{timeLeft.minutes} Minutes : </span>
      <span className="text-black">{timeLeft.seconds} Seconds </span>
    </div>
  );
};

const HeaderComponent = () => {
  const router = usePathname();
  const searchParams = useSearchParams();
  const utmSource = searchParams.get('utm_source');
  const { collapsed, setCollapsed }: LayoutContextModel =
    useContext(LayoutContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [browser, setBrowser] = useState('chrome');

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  const headerMenu = [
    {
      key: '1',
      label: 'Products',
      url: `${WEB_URL}`,
      dropdown: [
        {
          label: <ProductMenuComponent {...{ setCollapsed }} />,
        },
      ],
    },
    {
      key: '2',
      label: 'Solutions',
      url: `${WEB_URL}`,
      dropdown: [
        {
          label: <SolutionMenuComponent {...{ setCollapsed }} />,
        },
      ],
    },
    {
      key: '3',
      label: 'Integrations',
      url: `${WEB_URL}`,
      dropdown: [
        {
          label: <ResourceMenuComponent {...{ setCollapsed }} />,
        },
      ],
    },
    {
      key: '4',
      label: 'Resources',
      url: `${WEB_URL}`,
      dropdown: [
        {
          label: <ToolsMenuComponent {...{ setCollapsed }} />,
        },
      ],
    },
    // { key: "4", label: "Blog", url: "/blog" },
    { key: '5', label: 'Pricing', url: `${WEB_URL}/pricing` },
    // { key: "6", label: "Developer Tools", url: "/development-tools" },
    { key: '6', label: 'BB for Support', url: `${WEB_URL}/customer-support` },
    { key: '7', label: 'MCP', url: `${WEB_URL}/mcp` },
  ];

  const responsiveContentHeader = [
    {
      key: '1',
      header: 'Products',
      content: <ProductMenuComponent {...{ setCollapsed }} />,
      url: `${WEB_URL}`,
    },
    {
      key: '2',
      header: 'Solutions',
      content: <SolutionMenuComponent {...{ setCollapsed }} />,
      url: `${WEB_URL}`,
    },
    {
      key: '3',
      header: 'Integration',
      content: <ResourceMenuComponent {...{ setCollapsed }} />,
      url: `${WEB_URL}`,
    },
    {
      key: '4',
      header: 'Resources',
      content: <ToolsMenuComponent {...{ setCollapsed }} />,
      url: `${WEB_URL}`,
    },
  ];

  /**
   * Changes made for productHunt banner
   */
  useEffect(() => {
    setShowBanner(true);
  }, []);

  useEffect(() => {
    if (showBanner) {
      document.documentElement.style.setProperty('--banner-height', '0px');
    } else {
      document.documentElement.style.setProperty('--banner-height', '80px');
    }
  }, [showBanner]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 390) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCloseBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowBanner(false);
    }, 300);
  };

  return (
    <>
      <header
        className={`hidden lg:block top-0 w-full z-[50] bg-black border-b border-light-primary`}
      >
        <div className="relative">
          <div className="container mx-auto flex items-center justify-between py-3">
            <Link href={`${WEB_URL}`} className="flex items-center">
              <Image
                src="/images/bb-logo.svg"
                width={190}
                height={32}
                alt="Logo"
                title="betterbugs-logo"
                priority
              />
            </Link>
            <div className="w-full flex items-center ml-8" id="navbar-default">
              <ul className="flex gap-2 p-4 lg:p-0 mt-4 lg:flex-row space-x-2 lg:my-0">
                {headerMenu?.map(menu => (
                  <li
                    key={`headermenu_${menu?.key}`}
                    className="cursor-pointer py-1 flex items-center justify-center"
                  >
                    {menu.label === 'Products' ||
                    menu.label === 'Solutions' ||
                    menu.label === 'Integrations' ||
                    (menu.label === 'Resources' && menu?.dropdown) ? (
                      <Dropdown
                        placement="bottom"
                        menu={{
                          items: (menu?.dropdown ?? []).map((item, index) => ({
                            key: index,
                            label: <p>{item?.label}</p>,
                          })),
                        }}
                        trigger={['hover']}
                      >
                        <p
                          className={`${
                            router == menu?.url && '!text-white'
                          } text-white/80 hover:text-white ${
                            hederStyles.hoverEffect
                          }`}
                          onClick={e => e.preventDefault()}
                        >
                          <span className="font-medium flex items-center gap-1 text-sm text-white/70 hover:text-white">
                            {menu?.label}{' '}
                            <span>
                              <DownOutlinedIcon className="text-white/80 hover:text-white" />
                            </span>
                          </span>
                        </p>
                      </Dropdown>
                    ) : (
                      <Link href={menu?.url}>
                        <p
                          className={`${
                            router == menu?.url && '!text-white'
                          } font-medium text-sm text-white/80 hover:text-white flex items-center gap-1`}
                        >
                          <span>{menu?.label}</span>
                          {menu?.url === '/mcp' && (
                            <span
                              className="ml-1 font-semibold text-black bg-primary rounded-sm px-[3px] py-[2px] leading-none"
                              style={{ fontSize: 11 }}
                            >
                              New
                            </span>
                          )}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="ml-auto">
                <Link
                  href={`https://app.betterbugs.io/login${
                    utmSource ? `?utm_source=${utmSource}` : ''
                  }`}
                  target="_blank"
                >
                  <div className="flex font-medium items-center text-white/80 hover:text-white py-4 px-6 text-sm">
                    Login
                  </div>
                </Link>
              </div>
              <div>
                <Link
                  href={`https://app.betterbugs.io/login${
                    utmSource ? `?utm_source=${utmSource}` : ''
                  }`}
                  target="_blank"
                >
                  <Button
                    className={`font-medium flex items-center rounded-full border !border-light-primary btn-gradient ${
                      isScrolled
                        ? 'scroll-gradient !text-base py-5 px-6'
                        : 'bg-[#FFFFFF0D] !text-white/80 !text-base py-5 px-6'
                    }`}
                  >
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* responsive header menu */}
      <div className="xl:hidden lg:hidden">
        <div className=" flex md:container mx-3 items-center py-4 relative border-b border-light-primary">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center">
              <div
                className="xl:hidden cursor-pointer mr-4"
                onClick={() => setCollapsed(true)}
              >
                <MenuIcon className="w-10 h-10" />
              </div>
              <Link href={`${WEB_URL}`}>
                <Image
                  src="/images/bb-logo.svg"
                  width={150}
                  height={32}
                  alt="Logo"
                  title="betterbugs-logo"
                  priority
                />
              </Link>
            </div>
            <div className="ml-auto">
              <Link
                href={`https://app.betterbugs.io/login${
                  utmSource ? `?utm_source=${utmSource}` : ''
                }`}
                target="_blank"
              >
                <Button
                  className={`btn-primary font-medium flex items-center rounded-full border !border-light-primary text-[#FFFFFF0D] hover:bg-primary scroll-gradient !text-base px-4 !h-10`}
                >
                  Get started
                </Button>
              </Link>
            </div>
          </div>
          <Drawer
            placement="right"
            onClose={() => setCollapsed(false)}
            open={collapsed}
            width={270}
            maskClosable={true}
            mask={true}
            closable={false}
            styles={{
              body: { padding: 0 },
              header: { padding: '16px 24px' },
            }}
          >
            <div className="h-full lg:overflow-y-hidden overflow-y-scroll bg-[#111111] shadow-xl">
              <div className="overflow-y-auto py-6 px-4 z-50">
                <div className="flex items-center justify-between text-xs font-normal">
                  <p>MENU</p>
                  <div
                    onClick={() => setCollapsed(false)}
                    className="p-2 cursor-pointer"
                  >
                    <CrossIcon />
                  </div>
                </div>
                <div className={`mt-5 ${hederStyles.collapse}`}>
                  <Collapse accordion ghost>
                    {responsiveContentHeader?.map((item: any, index) => (
                      <Collapse.Panel
                        className={hederStyles.accordion}
                        header={
                          <p className="text-white text-lg font-medium py-3">
                            {item.header}
                          </p>
                        }
                        key={index}
                      >
                        {item.content && <p>{item.content}</p>}
                      </Collapse.Panel>
                    ))}
                  </Collapse>
                  {responsiveHeader?.map((data: any, index: any) => (
                    <Link href={data.url} key={index}>
                      <p
                        className="text-white text-lg font-medium py-3"
                        onClick={() => setCollapsed(false)}
                      >
                        {data.header}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center px-4 mb-5">
                <Link target="_blank" href={Extension_URL}>
                  <Button className="btn-primary text-sm flex items-center justify-center gap-1 rounded-full px-4">
                    {browser === 'edge' ? (
                      <EdgeIcon className="w-7 h-7" />
                    ) : (
                      <Image
                        src="/images/chrome.svg"
                        width={30}
                        height={20}
                        alt="chrome-img"
                        title="chrome"
                      />
                    )}
                    <div className="text-sm">
                      {browser === 'edge' ? 'Add to Edge' : 'Add to Chrome'}
                    </div>
                    <span className="bg-black font-body text-xs font-normal py-1.5 px-3 text-white rounded-[30px]">
                      FREE
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
