"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Col, Row } from "antd";
import { Extension_URL } from "@/app/libs/constants";
import { detectBrowser } from "@/app/libs/helpers";
import EdgeIcon from "../../theme/Icon/edgeIcon";
import { SocialTooltip } from "@/app/components/ui/socialTooltip";
import { DiscordLogo, InstagramLogo, LinkedinLogo, XLogo } from "@phosphor-icons/react";

const SOCIAL_LINKS = [
  {
    href: "https://discord.com/invite/HF8XjwVtPh",
    ariaLabel: "Discord",
    tooltip: "Discord",
    Icon: DiscordLogo,
    color: "#5865F2",
  },
  {
    href: "https://www.instagram.com/betterbugshq/",
    ariaLabel: "Instagram",
    tooltip: "Instagram",
    Icon: InstagramLogo,
    color: "#E1306C",
  },
  {
    href: "https://twitter.com/BetterBugs",
    ariaLabel: "Twitter",
    tooltip: "Twitter",
    Icon: XLogo,
    color: "#1DA1F2",
  },
  {
    href: "https://www.linkedin.com/company/betterbugs/",
    ariaLabel: "LinkedIn",
    tooltip: "LinkedIn",
    Icon: LinkedinLogo,
    color: "#0077B5",
  },
];

const FooterComponent = () => {
  const searchParams = useSearchParams();
  const utmSource = searchParams.get("utm_source");
  const [browser, setBrowser] = useState("chrome");

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  return (
    <div className="max-w-[1170px] mx-auto">
      <footer className="md:container md:px-auto mx-auto border-t border-light-primary">
        <div className="py-20 lg:py-[100px] px-4 md:px-0">
          <div className="flex flex-col items-center justify-center gap-8">
            <Link href="https://betterbugs.io" className="flex-shrink-0">
              <Image
                src="/images/bb-logo.svg"
                width={580}
                height={100}
                alt="Logo"
                title="betterbugs-logo"
                className="mx-2 w-[211px] lg:w-[470px]"
                priority
              />
            </Link>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link
                href={`https://app.betterbugs.io/login${
                  utmSource ? `?utm_source=${utmSource}` : ""
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="text-white/80 hover:text-white text-base font-medium transition-colors">
                  Login
                </div>
              </Link>
              <Link target="_blank" rel="noopener noreferrer" href={Extension_URL}>
                <button className="group flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-gradient-to-r hover:from-[#16fca9] hover:to-[#00d1ff] hover:text-black transition-all duration-300 shadow-lg hover:shadow-[#16fca9]/50">
                  {browser === "edge" ? (
                    <EdgeIcon className="w-5 h-5" />
                  ) : (
                    <Image
                      src="/images/chrome.svg"
                      width={20}
                      height={20}
                      alt="chrome-img"
                      title="chrome"
                    />
                  )}
                  <span className="text-sm">
                    {browser === "edge" ? "Add to Edge" : "Add to Chrome"}
                  </span>
                  <span className="bg-black text-white text-xs font-normal py-1 px-2.5 rounded-full">
                    FREE
                  </span>   
                </button>
              </Link>
            </div>
            <SocialTooltip items={SOCIAL_LINKS} />
          </div>
        </div>

        <Row className="py-14 flex items-center justify-between border-t border-t-light-primary">
          <Col span={24} className="text-center">
            <p className="text-sm text-white/70 md:text-base font-normal">
              © {new Date().getFullYear()} BetterBugs. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default FooterComponent;
