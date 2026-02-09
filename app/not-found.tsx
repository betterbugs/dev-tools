'use client';
import Link from 'next/link';
import React from 'react';
import SEOComponent from './components/theme/SEOComponent/SEOComponent';
import { SEO_META, WEB_URL } from './libs/constants';

const NotFound = () => {
  return (
    <>
      <SEOComponent
        title={SEO_META?.not_Found?.title}
        description={SEO_META?.not_Found?.description}
        ogTitle={SEO_META?.not_Found?.title}
        ogDescription={SEO_META?.not_Found?.description}
        ogImage={SEO_META?.not_Found?.ogImage}
      />
      <div className="flex justify-center pt-[100px] pb-[100px] items-center">
        <div className="md:min-h-[400px] flex flex-col items-center justify-center">
          <h1 className="text-[136px] font-black mx-auto text-center blogHeading-gradient">
            404
          </h1>
          <div className="text-center">
            <h1 className="text-base font-normal text-white/70 mt-5">
              Page your looking is not found.
            </h1>
            <span className="text-base font-normal text-white/70">
              Please{' '}
              <Link
                href={WEB_URL}
                className="text-white/70 font-medium underline hover:underline"
              >
                Go back
              </Link>{' '}
              or visit{' '}
              <Link
                href={WEB_URL}
                className="text-white/70 font-medium underline hover:underline"
              >
                Homepage
              </Link>{' '}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
