'use client';
import { useState } from 'react';
import glossaryStyles from '../../../glossary/glossaryStyles.module.scss';
import Link from 'next/link';
import { WEB_URL } from '@/app/libs/constants';

interface GlossaryTabComponentProps {
  tab?: any;
  glossaryData?: any;
}

const GlossaryTabComponent = (props: GlossaryTabComponentProps) => {
  const { tab, glossaryData } = props;

  let initialActiveTab = tab[0]?.id || 0;

  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const handleTabClick = async (key?: any, Name?: string) => {
    setActiveTab(key);
  };

  return (
    <div className={glossaryStyles.customTabContainer}>
      <div className="mt-4 customTabNavbar gap-[10px] md:gap-[14px]">
        <p
          className={`${glossaryStyles.tabTitle}  ${
            activeTab === 0 ? glossaryStyles.activeTab : ''
          }`}
          onClick={() => handleTabClick(0, '0-9')}
          style={{
            transition: 'all 0.2s ease-out',
          }}
        >
          0-9
        </p>
        {tab?.data?.map((s: any, index: number) => (
          <div key={index} className="customNavTabContainer">
            <p
              className={`${glossaryStyles.tabTitle} ${
                activeTab === s.id ? 'activeTab' : ''
              }`}
              onClick={() => handleTabClick(s.id, s.attributes?.Name)}
              style={{
                transition: 'all 0.3s ease-out',
              }}
            >
              {s.attributes?.Title}
            </p>
          </div>
        ))}
      </div>

      {!glossaryData && (
        <div
          className={`flex justify-start items-center flex-wrap gap-[11px] md:gap-[4px] mx-4 md:mx-0 ${glossaryStyles.customTabNavbar}`}
        >
          {tab?.map((s: any, index: number) => (
            <div key={index} className={glossaryStyles.customNavTabContainer}>
              <Link href={`${WEB_URL}/glossary`} target="_blank">
                <p
                  className={`${glossaryStyles.slugTabTitle} ${
                    activeTab.key === s.key && glossaryStyles.activeTab
                  }`}
                  onClick={() => handleTabClick(s)}
                  style={{
                    transition: 'all 0.3s ease-out',
                  }}
                >
                  {s.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GlossaryTabComponent;
