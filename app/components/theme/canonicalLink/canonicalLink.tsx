"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { WEB_URL } from "@/app/libs/constants";

const CanonicalLink = () => {
  const router = usePathname();
  let url = "";
  if (router === "/use-cases/[slug]") {
    url = WEB_URL + router;
  } else {
    url = WEB_URL + router;
  }
  const canonicalURL = url;
  return (
    <>
      <meta property="og:url" content={canonicalURL} />
      <link rel="canonical" href={canonicalURL} />
    </>
  );
};

export default CanonicalLink;
