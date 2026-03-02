import AsanaIcon from '../components/theme/Icon/asanaIcon';
import { AzureBoardIcon } from '../components/theme/Icon/azureBoardIcon';
import ClickupIcon from '../components/theme/Icon/clickupIcon';
import GithubIcon from '../components/theme/Icon/githubIcon';
import JiraIcon from '../components/theme/Icon/jiraIcon';
import LinearIcon from '../components/theme/Icon/linearIcon';
import MSTeamsIcon from '../components/theme/Icon/msTeamsIcon';
import { SentryIcon } from '../components/theme/Icon/sentryIcon';
import SlackIcon from '../components/theme/Icon/slackIcon';
import TrelloIcon from '../components/theme/Icon/trelloIcon';
import { detectBrowser } from './helpers';

// import WordsToNumbers from '../components/developmentToolsComponent/wordsToNumbers';

export const WEB_URL = 'https://www.betterbugs.io';

// Default to Chrome URL during SSR/build, will be correctly determined on client side
export const Extension_URL =
  typeof window !== 'undefined' && detectBrowser() === 'edge'
    ? 'https://microsoftedge.microsoft.com/addons/detail/betterbugs-a-fresh-appro/cbojiblepdmdpjngajmompgkadipidfb'
    : 'https://chrome.google.com/webstore/detail/betterbugs-a-fresh-approa/mdljmlgokccncglfobogbfjgcijldnaj';

export const SEO_META = {
  developmentTools: {
    title: 'Developer Utility Tools - BetterBugs.io',
    description:
      'A suite of free utility tools for developers, QA, support teams, and those working with software. Simplify your everyday tasks with the dev utility tools available completely free on the BetterBugs.io website.',
    ogTitle: 'Developer Utility Tools - BetterBugs.io',
    ogDescription:
      'Checkout the free developer utility tools to simplify your everyday development, QA, and other software-related tasks.',
    ogImage: '/images/og-images/Cover.png',
  },
  not_Found: {
    title: '404 Not Found',
    description: '404 Not Found',
    ogImage: '/images/og-images/error-page.png',
  },
};

export const integrationTools = [
  { name: 'Jira', icon: <JiraIcon />, url: `${WEB_URL}/integration/jira` },
  {
    name: 'Trello',
    icon: <TrelloIcon />,
    url: `${WEB_URL}/integration/trello`,
  },
  {
    name: 'ClickUp',
    icon: <ClickupIcon />,
    url: `${WEB_URL}/integration/clickup`,
  },
  { name: 'Asana', icon: <AsanaIcon />, url: `${WEB_URL}/integration/asana` },
  { name: 'Slack', icon: <SlackIcon />, url: `${WEB_URL}/integration/slack` },
  {
    name: 'GitHub',
    icon: <GithubIcon />,
    url: `${WEB_URL}/integration/github`,
  },
  {
    name: 'Linear',
    icon: <LinearIcon />,
    url: `${WEB_URL}/integration/linear`,
  },
  {
    name: 'Azure Boards',
    icon: <AzureBoardIcon />,
    url: `${WEB_URL}/integration/azure-boards`,
  },
  {
    name: 'MS Teams',
    icon: <MSTeamsIcon />,
    url: `${WEB_URL}/integration/teams`,
  },
  {
    name: 'Sentry',
    icon: <SentryIcon />,
    url: `${WEB_URL}/integration/sentry`,
  },
];

// Development tools constants

export { PATHS } from './paths';


// lorem ipsum text
export const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export { developmentToolsCategoryContent, developmentToolsRoutes } from './developmentToolsRegistry';