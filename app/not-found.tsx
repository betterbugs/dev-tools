"use client";
import Link from "next/link";
import React from "react";
import SEOComponent from "./components/theme/SEOComponent/SEOComponent";
import { SEO_META, WEB_URL } from "./libs/constants";

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
              The page you're looking for was not found.
            </h1>
            <div className="mt-6 flex gap-6 justify-center">
              <Link
                href="/"
                className="px-4 py-2 border border-white/40 rounded-md text-white hover:bg-white hover:text-black transition"
              >
                Back to Development Tools
              </Link>

              <Link
                href={WEB_URL}
                className="px-4 py-2 bg-white text-black rounded-md hover:opacity-80 transition"
              >
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
