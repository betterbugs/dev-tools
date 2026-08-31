'use client';

import React from 'react';
import Link from 'next/link';
import BlogsIcon from '../theme/Icon/blogsIcon';
import DeveloperIcon from '../theme/Icon/developersLogIcon';
import MCPIcon from '../theme/Icon/mcpIcon';
import { WEB_URL } from '@/app/libs/constants';
import { trackNavInteraction } from '@/app/libs/analytics';

const ToolsMenuComponent = ({
  setCollapsed,
  sectionName = 'Resources',
}: {
  setCollapsed?: (v: boolean) => void;
  sectionName?: string;
}) => {
  const handleClick = () => setCollapsed?.(false);

  const trackDesktop = (ctaText: string, url: string) =>
    trackNavInteraction('desktop', {
      sectionName,
      ctaText,
      destinationUrl: url,
    });

  const trackMobile = (ctaText: string, url: string) =>
    trackNavInteraction('mobile', {
      sectionName,
      ctaText,
      destinationUrl: url,
    });

  return (
    <div className="relative">
      {/* desktop view */}
      <div className="absolute top-[25px] lg:left-[-60px] 2xl:left-[-65px] md:block hidden mx-auto bg-[#111111] min-w-[240px] max-w-[260px] border border-white/10 p-3 shadow-lg">
        {/* Knowledge Hub */}
        <ul className="grid mt-2 pr-2">
          <li className="md:px-2 py-1.5">
            <Link
              href={`${WEB_URL}/blog`}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 text-sm"
              onClick={() => trackDesktop('Blogs', `${WEB_URL}/blog`)}
            >
              <span className="mt-0.5">
                <BlogsIcon />
              </span>
              Blogs
            </Link>
          </li>
          <li className="md:px-2 py-1.5">
            <Link
              href={`${WEB_URL}/development-tools`}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 text-sm"
              onClick={() =>
                trackDesktop('Developer Tools', `${WEB_URL}/development-tools`)
              }
            >
              <span className="mt-0.5">
                <DeveloperIcon />
              </span>
              Developer Tools
            </Link>
          </li>
          <li className="md:px-2 py-1.5">
            <Link
              href={`${WEB_URL}/mcp`}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 text-sm"
              onClick={() => trackDesktop('MCP', `${WEB_URL}/mcp`)}
            >
              <span className="mt-0.5">
                <MCPIcon />
              </span>
              MCP
            </Link>
          </li>
        </ul>
      </div>

      {/* responsive view */}
      <div className="md:hidden block">
        {/* Knowledge Hub */}
        <ul className="grid mt-6">
          <li className="md:px-3 py-1.5">
            <Link
              href={`${WEB_URL}/blog`}
              onClick={() => {
                trackMobile('Blogs', `${WEB_URL}/blog`);
                handleClick();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 text-sm"
            >
              <span className="mt-0.5">
                <BlogsIcon />
              </span>
              Blogs
            </Link>
          </li>
          <li className="md:px-3 py-1.5">
            <Link
              href={`${WEB_URL}/development-tools`}
              onClick={() => {
                trackMobile('Developer Tools', `${WEB_URL}/development-tools`);
                handleClick();
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5 text-sm"
            >
              <span className="mt-0.5">
                <DeveloperIcon />
              </span>
              Developer Tools
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ToolsMenuComponent;
