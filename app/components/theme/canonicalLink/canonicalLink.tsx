"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { WEB_URL } from "@/app/libs/constants";

// usePathname() omits Next.js basePath (/development-tools) in production
const CANONICAL_BASE_PATH = "/development-tools";

const buildCanonicalPath = (pathname: string | null): string => {
  if (!pathname || pathname === "/") return CANONICAL_BASE_PATH;

  if (
    pathname === CANONICAL_BASE_PATH ||
    pathname.startsWith(`${CANONICAL_BASE_PATH}/`)
  ) {
    return pathname;
  }

  return `${CANONICAL_BASE_PATH}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
};

const CanonicalLink = () => {
  const router = usePathname();
  const canonicalURL = WEB_URL + buildCanonicalPath(router);
  return (
    <>
      <meta property="og:url" content={canonicalURL} />
      <link rel="canonical" href={canonicalURL} />
    </>
  );
};

export default CanonicalLink;
