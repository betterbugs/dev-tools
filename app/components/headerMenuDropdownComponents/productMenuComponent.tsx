import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import AIIcon from '../theme/Icon/AIIcon';
import RecordingIcon from '../theme/Icon/recordingIcon';
import ReportIcon from '../theme/Icon/reportIcon';
import DevelopersLogIcon from '../theme/Icon/developersLogIcon';
import CollaborationIcon from '../theme/Icon/collabrationIcon';
import QualityIcon from '../theme/Icon/qualityIcon';
import ManagerIcon from '../theme/Icon/managerIcon';
import SupportTeamIcon from '../theme/Icon/supportTeamIcon';
import FounderIcon from '../theme/Icon/founderIcon';
import DeveloperIcon from '../theme/Icon/developersLogIcon';
import AllFeatureIcon from '../theme/Icon/allFeatureIcon';
import AnnotationIcon from '../theme/Icon/annotationIcon';
import { WEB_URL } from '@/app/libs/constants';

const FeaturesMenu = [
  {
    icon: <RecordingIcon />,
    label: 'Record Screens',
    url: `${WEB_URL}/feature`,
    id: 'feature-1',
  },
  {
    icon: <AnnotationIcon />,
    label: 'Create Markups',
    url: `${WEB_URL}/feature`,
    id: 'feature-2',
  },
  {
    icon: <DevelopersLogIcon />,
    label: 'Developer Logs',
    url: `${WEB_URL}/feature`,
    id: 'feature-3',
  },
  {
    icon: <ReportIcon />,
    label: 'Rewind',
    url: `${WEB_URL}/feature`,
    id: 'feature-4',
  },
  {
    icon: <CollaborationIcon />,
    label: 'Collaborate with Team',
    url: `${WEB_URL}/feature`,
    id: 'feature-5',
  },
  {
    icon: <AllFeatureIcon />,
    label: 'Integrate with Project Tools',
    url: `${WEB_URL}/feature`,
    id: 'feature-6',
  },
  {
    icon: <AIIcon />,
    label: 'AI Assistant',
    url: `${WEB_URL}/ai-assistant`,
  },
];

const BB_FOR = [
  {
    icon: <QualityIcon />,
    label: 'QA Engineers',
    url: `${WEB_URL}/solution/qa-engineers`,
  },
  {
    icon: <DeveloperIcon className="mx-1" />,
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

interface ProductMenuComponentProps {
  setCollapsed: (d: any) => void;
}

const ProductMenuComponent = (props: ProductMenuComponentProps) => {
  const { setCollapsed } = props;
  const pathname = usePathname();

  return (
    <div className="relative cursor-pointer">
      <div className="absolute top-[25px] lg:left-[-265px] 2xl:left-[-270px] px-3 md:px-auto mx-auto bg-[#111111] !w-[1280px] md:block hidden">
        <div className="py-14 px-0">
          <div className="flex flex-col md:flex-row items-start justify-evenly lg:gap-6 gap-7">
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
                <p className="text-base text-white/80 pb-1">BetterBugs</p>
                <p className="text-base text-white/80 tracking-[0.5px] mt-1">
                  BetterBugs offers efficient, context-rich, and data-filled
                  workflows for visual bug reporting and streamlines your
                  debugging sessions with the cutting-edge AI Assistant.
                </p>
              </div>
            </div>

            <ul className="grid">
              <div className="text-sm font-medium text-white/70 ml-3 pb-4">
                FEATURES
              </div>
              {FeaturesMenu.map((menu: any, index: any) => (
                <li key={`${menu.label}_${index}`} className="md:px-3 py-1.5">
                  <Link
                    href={menu?.url}
                    className={`${
                      pathname === menu?.url ? 'text-white' : 'text-white/70'
                    } hover:text-white`}
                  >
                    <p className="flex items-center text-center font-normal text-base">
                      <span className="mr-2">{menu.icon}</span>
                      {menu.label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="grid">
              <div className="text-sm font-medium text-white/70 ml-3 pb-4">
                BETTERBUGS FOR
              </div>
              {BB_FOR.map((menu: any, index: any) => (
                <li key={`${menu.label}_${index}`} className="md:px-3 py-1.5">
                  <Link
                    href={menu?.url}
                    className={`${
                      pathname === menu?.url ? 'text-white' : 'text-white/70'
                    } hover:text-white`}
                  >
                    <p className="flex text-center font-normal text-base">
                      <span className="mr-2 mt-1">{menu.icon}</span>
                      {menu.label}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="md:hidden block">
        <div className="text-xs font-normal text-white/80">BetterBugs</div>
        <ul className="grid mt-6">
          <div className="text-xs font-normal text-white/80 pb-4">FEATURES</div>
          {FeaturesMenu.map((menu: any, index: any) => (
            <li key={`${menu.label}_${index}`} className="md:px-3 py-1.5">
              <Link
                href={menu?.url}
                className={`${
                  pathname === menu?.url ? 'text-white' : 'text-white/80'
                } hover:text-white`}
                onClick={() => setCollapsed(false)}
              >
                <p className="flex text-center font-normal text-base">
                  <span className="mr-2 mt-1">{menu.icon}</span>
                  {menu.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="grid mt-6">
          <div className="text-xs font-normal text-white/80 pb-4">
            BETTERBUGS FOR
          </div>
          {BB_FOR.map((menu: any, index: any) => (
            <li key={`${menu.label}_${index}`} className="md:px-3 py-1.5">
              <Link
                href={menu?.url}
                className={`${
                  pathname === menu?.url ? 'text-white' : 'text-white/80'
                } hover:text-white`}
                onClick={() => setCollapsed(false)}
              >
                <p className="flex text-center font-normal text-base">
                  <span className="mr-2 mt-1">{menu.icon}</span>
                  {menu.label}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductMenuComponent;
