'use client';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import BlogListComponent from '../../blogComponent/blogListComponent';
import CardComponent from '../../cardComponent/cardComponent';
import GlossaryListComponent from '../../glossaryComponent/glossaryListComponent';
import tabStyles from '../../../glossary/glossaryStyles.module.scss';
import { LayoutContext } from '@/app/contexts/layoutContexts';

interface CustomTabComponentProps {
  tab?: any;
  categoryDataDetails?: any;
  categoryGlossaryDataDetails?: any;
  isLoading?: boolean;
  type?: any;
  isLoad?: boolean;
  searchCount?: string;
  searchValue?: string;
  isSearch?: boolean;
  handleBlogByCategoryId?: (d: any) => any;
  onChange?: (index: any) => void;
  priceData?: any;
  handleGlossaryByCategoryId?: (d: any) => any;
}

const CustomTabComponent = (props: CustomTabComponentProps) => {
  const {
    tab,
    categoryDataDetails,
    categoryGlossaryDataDetails,
    isLoading,
    type,
    isLoad,
    isSearch,
    searchCount,
    searchValue,
    priceData,
    handleBlogByCategoryId,
    onChange,
    handleGlossaryByCategoryId,
  } = props;

  let initialActiveTab;
  if (type === 'caseStudy') {
    initialActiveTab = tab[0].id;
  } else if (type === 'price') {
    initialActiveTab = tab.findIndex((t: any) => t.title === 'Yearly');
  } else {
    initialActiveTab = 0;
  }

  const [activeTab, setActiveTab] = useState(initialActiveTab);

  const handleTabClick = async (key?: any, Name?: string, id?: any) => {
    setActiveTab(key);
    if (typeof handleBlogByCategoryId === 'function') {
      handleBlogByCategoryId(key);
    }
    if (typeof handleGlossaryByCategoryId === 'function') {
      handleGlossaryByCategoryId(key);
    }
    if (onChange) {
      onChange(key);
    }
  };

  useEffect(() => {
    if (typeof handleBlogByCategoryId === 'function') {
      handleBlogByCategoryId(activeTab);
    }
    if (typeof handleGlossaryByCategoryId === 'function') {
      handleGlossaryByCategoryId(activeTab);
    }
  }, [activeTab]);

  const getPriceData = () => {
    return activeTab === 0 ? priceData.monthly : priceData.yearly;
  };

  return (
    <>
      <div
        className={
          type === 'glossary'
            ? tabStyles.customTabContainer
            : 'customTabContainer'
        }
      >
        <div
          className={`mt-4  gap-[10px]  ${
            type === 'glossary' ? 'md:gap-2' : 'md:gap-[14px]'
          } ${
            type === 'glossary' ? tabStyles.customTabNavbar : 'customTabNavbar'
          }`}
        >
          {type === 'blog' && (
            <div className="customNavTabContainer">
              <p
                className={`tabTitle ${activeTab === 0 && 'activeTab'}`}
                onClick={() => handleTabClick(0, 'All topics')}
                style={{
                  transition: 'all 0.2s ease-out',
                }}
              >
                All topics
              </p>
            </div>
          )}
          {type === 'glossary' && (
            <div className={tabStyles.customNavTabContainer}>
              <p
                className={`${tabStyles.tabTitle} ${
                  activeTab === 0 && tabStyles.activeTab
                }`}
                onClick={() => handleTabClick(0, '0-9')}
                style={{
                  transition: 'all 0.2s ease-out',
                }}
              >
                0-9
              </p>
            </div>
          )}
          {type === 'whatsNew'
            ? tab?.map((s: any, index: any) => (
                <div key={index} className="customNavTabContainer">
                  <p
                    className={`tabTitle ${activeTab === s.key && 'activeTab'}`}
                    onClick={() => handleTabClick(s.key, index)}
                    style={{
                      transition: 'all 0.3s ease-out',
                    }}
                  >
                    {s.title}
                  </p>
                </div>
              ))
            : type === 'price'
            ? tab?.map((s: any, index: number) => (
                <div key={index} className="customNavTabContainer">
                  <p
                    className={`tabTitle ${activeTab === s.key && 'activeTab'}`}
                    onClick={() => handleTabClick(s.key)}
                    style={{
                      transition: 'all 0.3s ease-out',
                    }}
                  >
                    {s.title}
                  </p>
                </div>
              ))
            : type === 'glossary'
            ? tab?.map((s: any, index: number) => (
                <div key={index} className={tabStyles.customNavTabContainer}>
                  <p
                    className={`${tabStyles.tabTitle} ${
                      activeTab === s.id && tabStyles.activeTab
                    }`}
                    onClick={() => handleTabClick(s.id, s.attributes?.Title)}
                    style={{
                      transition: 'all 0.3s ease-out',
                    }}
                  >
                    {s.attributes?.Title}
                  </p>
                </div>
              ))
            : tab?.map((s: any, index: number) => (
                <div key={index} className={'customNavTabContainer'}>
                  <p
                    className={`${'tabTitle'} ${
                      activeTab === s.id && 'activeTab'
                    }`}
                    onClick={() => handleTabClick(s.id, s.attributes?.Name)}
                    style={{
                      transition: 'all 0.3s ease-out',
                    }}
                  >
                    {s.attributes?.Name}
                  </p>
                </div>
              ))}
        </div>
        <div className="customTabContent pt-9">
          <div className="tabContentContainer activeTabContent">
            <BlogListComponent
              {...{
                data: categoryDataDetails,
                isLoading,
                isLoad,
                isSearch,
                searchCount,
                searchValue,
              }}
            />
            {type === 'glossary' && (
              <GlossaryListComponent
                {...{
                  data: categoryGlossaryDataDetails,
                }}
              />
            )}
          </div>
        </div>
        {priceData && (
          <div>
            <Suspense>
              <CardComponent
                priceData={getPriceData()}
                activePlanIndex={1}
                isYearlyPlan={activeTab === 1}
              />
            </Suspense>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomTabComponent;
