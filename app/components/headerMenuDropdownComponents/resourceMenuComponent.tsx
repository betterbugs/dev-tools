import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DocsIcon from '../theme/Icon/docsIcon';
import BlogsIcon from '../theme/Icon/blogsIcon';
import JiraIcon from '../theme/Icon/jiraIcon';
import LinearIcon from '../theme/Icon/linearIcon';
import SlackIcon from '../theme/Icon/slackIcon';
import AsanaIcon from '../theme/Icon/asanaIcon';
import ClickupIcon from '../theme/Icon/clickupIcon';
import GithubIcon from '../theme/Icon/githubIcon';
import hederStyles from '../layout/Header/headerStyles.module.scss';
import { TeamsIcon } from '../theme/Icon/teamsIcon';
import { TrillioIcon } from '../theme/Icon/trillioIcon';
import { SentryIcon } from '../theme/Icon/sentryIcon';
import { AzureBoardIcon } from '../theme/Icon/azureBoardIcon';
import { WEB_URL } from '@/app/libs/constants';

const KnowledgeHubMenu = [
  {
    icon: <DocsIcon />,
    label: 'Docs',
    url: 'https://docs.betterbugs.io/overview/welcome-to-betterbugs',
  },
  { icon: <BlogsIcon />, label: 'Blog', url: '/blog' },
];

const IntegrationMenu = [
  {
    icon: <JiraIcon />,
    label: 'Jira',
    url: `${WEB_URL}/integration/jira`,
    des: 'Create bug reports to share as Jira issues to your projects.',
  },
  {
    icon: <LinearIcon />,
    label: 'Linear',
    url: `${WEB_URL}/integration/linear`,
    des: 'Share bug reports as Linear issues in your workspace.',
  },
  {
    icon: <SlackIcon />,
    label: 'Slack',
    url: `${WEB_URL}/integration/slack`,
    des: 'Send instant bug reports as messages to your channels.',
  },
  {
    icon: <TeamsIcon />,
    label: 'MS Teams',
    url: `${WEB_URL}/integration/teams`,
    des: 'Share bug reports as messages to your Teams channels.',
  },
  {
    icon: <SentryIcon />,
    label: 'Sentry',
    url: `${WEB_URL}/integration/sentry`,
    des: 'Get all event logs and error stack traces from Sentry within your bug report.',
  },
  {
    icon: <ClickupIcon />,
    label: 'ClickUp',
    url: `${WEB_URL}/integration/clickup`,
    des: 'Capture bugs and share them instantly as ClickUp tasks.   ',
  },
  {
    icon: <AsanaIcon />,
    label: 'Asana',
    url: `${WEB_URL}/integration/asana`,
    des: 'Create bug reports and share as tasks to your Asana projects.',
  },
  {
    icon: <GithubIcon />,
    label: 'GitHub',
    url: `${WEB_URL}/integration/github`,
    des: 'Raise issues directly on GitHub repos with detailed bug reports.',
  },
  {
    icon: <TrillioIcon />,
    label: 'Trello',
    url: `${WEB_URL}/integration/trello`,
    des: 'Create Trello Cards for your workspaces with bug reports. ',
  },
  {
    icon: <AzureBoardIcon />,
    label: 'Azure Boards',
    url: `${WEB_URL}/integration/azure-boards`,
    des: 'Share bug reports instantly to Azure Boards as Azure work items.',
  },
];

interface ResourceMenuComponentProps {
  setCollapsed: (d: any) => void;
}

const ResourceMenuComponent = (props: ResourceMenuComponentProps) => {
  const { setCollapsed } = props;

  const pathname = usePathname();

  return (
    <div className="relative">
      <div className="absolute top-[25px] lg:left-[-480px] 2xl:left-[-485px] md:block hidden mx-auto bg-[#111111] !w-[1280px]">
        <div className="py-6 px-0">
          {' '}
          {/* Added max height and overflow */}
          <div className="flex flex-col md:flex-row items-start justify-evenly">
            {/* Integration */}
            <div
              className={`${hederStyles.integrationContent} grid mt-6 border-r border-white/10 pr-4  max-h-[400px] overflow-y-auto`}
            >
              <p className="text-sm font-medium text-white/70 ml-[90px] pb-4">
                INTEGRATION
              </p>
              <div className="flex flex-wrap justify-center">
                <div className="w-[39%]">
                  <ul className="md:mr-2">
                    {IntegrationMenu.map((menu: any, index: any) => {
                      if (index < IntegrationMenu.length / 2) {
                        return (
                          <li
                            key={`${menu.label}_${index}`}
                            className="md:px-3 py-3"
                          >
                            <Link
                              href={menu?.url}
                              className={`${
                                pathname === menu?.url && 'text-white'
                              } text-white/80 hover:text-white`}
                            >
                              <p className="flex flex-col text-left font-normal text-base">
                                <div className="flex items-center">
                                  <span className="mr-2 mt-1">{menu.icon}</span>
                                  <span className="text-base font-normal text-white">
                                    {menu.label}
                                  </span>
                                </div>
                                <span className="mt-1 text-sm font-normal text-white/80 ml-7">
                                  {menu.des}
                                </span>
                              </p>
                            </Link>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
                <div className="w-[39%]">
                  <ul className="md:ml-2">
                    {IntegrationMenu.map((menu: any, index: any) => {
                      if (index >= IntegrationMenu.length / 2) {
                        return (
                          <li
                            key={`${menu.label}_${index}`}
                            className="md:px-3 py-3"
                          >
                            <Link
                              href={menu?.url}
                              className={`${
                                pathname === menu?.url && 'text-white'
                              } text-white/80 hover:text-white`}
                            >
                              <div className="flex flex-col text-left font-normal text-base">
                                <div className="flex items-center">
                                  <span className="mr-2 mt-1">{menu.icon}</span>
                                  <span className="text-base font-normal text-white">
                                    {menu.label}
                                  </span>
                                </div>
                                <span className="mt-1 text-sm font-normal text-white/80 ml-7">
                                  {menu.des}
                                </span>
                              </div>
                            </Link>
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* Knowledge Hub */}
            <ul className="grid mt-6 pr-20">
              <p className="text-sm font-medium text-white/70 ml-3 pb-4">
                KNOWLEDGE HUB
              </p>
              {KnowledgeHubMenu.map((menu: any, index: any) => {
                return (
                  <li key={`${menu.label}_${index}`} className="md:px-3 py-1.5">
                    <Link
                      href={menu?.url}
                      target="_blank"
                      className={`${
                        pathname === menu?.url && 'text-white'
                      } text-white/80 hover:text-white`}
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
        {/* Integration */}
        <ul className="grid mt-6">
          <p className="text-xs font-normal text-white/80 pb-4">INTEGRATIONS</p>
          {IntegrationMenu?.map((menu: any, index: any) => {
            return (
              <li key={`${menu.label}_${index}`} className="md:px-3 py-3">
                <Link
                  href={menu?.url}
                  className={`${
                    pathname === menu?.url && 'text-white'
                  } text-white/80 hover:text-white`}
                  onClick={() => setCollapsed(false)}
                >
                  <div className="flex flex-col text-left font-normal text-base">
                    <div className="flex items-center">
                      <span className="text-base font-normal text-white ml-1">
                        {menu?.label}
                      </span>
                    </div>
                    <span className="mt-1 text-sm font-normal text-white/80 ml-1">
                      {menu?.des}
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Knowledge Hub */}
        <ul className="grid mt-6">
          <p className="text-xs font-normal text-white/80 pb-4">
            KNOWLEDGE HUB
          </p>
          {KnowledgeHubMenu.map((menu: any, index: any) => {
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
    </div>
  );
};

export default ResourceMenuComponent;
