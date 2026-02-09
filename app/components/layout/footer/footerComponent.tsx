'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import LinkedinIcon from '../../theme/Icon/linkedinIcon';
import InstagramIcon from '../../theme/Icon/InstagramIcon';
import TwitterIcon from '../../theme/Icon/twitterIcon';
import { Col, Row } from 'antd';
import YouTubeIcon from '../../theme/Icon/youTubeIcon';
import DiscordIcon from '../../theme/Icon/discordIcon';
import { WEB_URL } from '@/app/libs/constants';

const FooterComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [sectionId, setSectionId] = useState<string | null>(null);

  const handleClick = (url: string, id?: string) => (e: any) => {
    e.preventDefault();
    if (id) {
      setSectionId(id);
      router.push(url);
    } else {
      router.push(url);
    }
  };

  useEffect(() => {
    if (sectionId) {
      const timeout = setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
        setSectionId(null); // Reset the sectionId after scrolling
      }, 100); // Adjust the delay as needed
      return () => clearTimeout(timeout);
    }
  }, [pathname, sectionId]);

  useEffect(() => {
    // Scroll to the top of the page when the pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  const footerMenu = [
    { label: 'BetterBugs', url: `${WEB_URL}` },
    { label: 'Our Story', url: `${WEB_URL}/our-story` },
    // { label: "Change log", url: "/" },
    // { label: "Customers", url: "/" },
    { label: 'Blog', url: `${WEB_URL}/blog` },
    {
      label: 'Docs',
      url: 'https://docs.betterbugs.io/overview/welcome-to-betterbugs',
    },
  ];

  const InformationMenu = [
    { label: 'Terms & Conditions', url: `${WEB_URL}/terms-and-condition` },
    { label: 'Privacy Policy', url: `${WEB_URL}/privacy-policy` },
    {
      label: 'Cancellations & Refunds',
      url: `${WEB_URL}/cancellations-and-refunds`,
    },
    // { label: "Glossary Terms", url: "/glossary" },
  ];

  const FeaturesMenu = [
    { label: 'Record Screens', url: `${WEB_URL}/feature`, id: 'feature-1' },

    { label: 'Create Markups', url: `${WEB_URL}/feature`, id: 'feature-2' },

    { label: 'Developer Logs', url: `${WEB_URL}/feature`, id: 'feature-3' },

    { label: 'Rewind', url: `${WEB_URL}/feature`, id: 'feature-4' },

    {
      label: 'Collaborate with Team',
      url: `${WEB_URL}/feature`,
      id: 'feature-5',
    },

    {
      label: 'Integrate with Project Tools',
      url: `${WEB_URL}/feature`,
      id: 'feature-6',
    },

    { label: 'AI Assistant', url: `${WEB_URL}/ai-assistant` },
  ];

  const IntegrationsMenu = [
    { label: 'Slack', url: `${WEB_URL}/integration/slack` },
    { label: 'Jira', url: `${WEB_URL}/integration/jira` },
    { label: 'Linear', url: `${WEB_URL}/integration/linear` },
    { label: 'ClickUp', url: `${WEB_URL}/integration/clickup` },
    { label: 'Asana', url: `${WEB_URL}/integration/asana` },
    { label: 'GitHub', url: `${WEB_URL}/integration/github` },
    { label: 'MS Teams', url: `${WEB_URL}/integration/teams` },
    { label: 'Trello', url: `${WEB_URL}/integration/trello` },
    { label: 'Sentry', url: `${WEB_URL}/integration/sentry` },
    { label: 'Azure Boards', url: `${WEB_URL}/integration/azure-boards` },
  ];

  const UsecasesMenu = [
    { label: 'QA Engineers', url: `${WEB_URL}/solution/qa-engineers` },
    { label: 'Developers', url: `${WEB_URL}/solution/developers` },
    { label: 'Managers', url: `${WEB_URL}/solution/managers` },
    { label: 'Support Teams', url: `${WEB_URL}/solution/support-teams` },
    { label: 'Founders', url: `${WEB_URL}/solution/founders` },
    {
      label: 'Comparisons',
      url: `${WEB_URL}/comparisons/betterbugs-io-vs-bugherd`,
    },
  ];

  // const PartnershipMenu = [
  //   { label: "For agencies", url: "/" },
  //   { label: "For enterprise", url: "/" },
  //   { label: "For individuals", url: "/" },
  //   { label: "Hire a professional", url: "/" },
  // ];

  return (
    <div className="max-w-[1170px] mx-auto">
      <footer className="md:container md:px-auto mx-auto  border-t border-light-primary">
        <div className="py-20 lg:py-[100px] px-4 md:px-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-none lg:flex items-start justify-between lg:gap-5 md:gap-4 gap-7">
            <div className="grid">
              <p className="font-bold text-base">About</p>
              <ul className="grid mt-5">
                {footerMenu.map((menu, index: any) => (
                  <li key={`${menu.label}_${index}`} className="py-1.5">
                    <Link
                      target="_blank"
                      href={menu.url}
                      className={`${
                        pathname === menu.url && 'text-white'
                      } text-white/70 hover:text-white`}
                    >
                      <span className="font-medium text-base text-white/70 hover:text-white">
                        {menu.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid">
              <p className="lg:ml-3 font-bold text-base">Legal</p>
              <ul className="grid mt-5">
                {InformationMenu.map((menu, index: any) => (
                  <li key={`${menu.label}_${index}`} className="lg:px-3 py-1.5">
                    <Link
                      target="_blank"
                      href={menu.url}
                      className={`${
                        pathname === menu.url && 'text-white'
                      } text-white/70 hover:text-white`}
                    >
                      <span className="font-medium text-base text-white/70 hover:text-white">
                        {menu.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid">
              <p className="lg:ml-3 font-bold text-base">Features</p>
              <ul className="grid mt-5">
                {FeaturesMenu.map((menu, index: any) => (
                  <li key={`${menu.label}_${index}`} className="lg:px-3 py-1.5">
                    <Link
                      target="_blank"
                      href={menu.url}
                      onClick={
                        menu.id ? handleClick(menu.url, menu.id) : undefined
                      }
                      className={`${
                        pathname === menu.url && 'text-white'
                      } text-white/70 hover:text-white`}
                    >
                      <span className="font-medium text-base text-white/70 hover:text-white">
                        {menu.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid">
              <p className="lg:ml-3 font-bold text-base">Integrations</p>
              <ul className="grid mt-5">
                {IntegrationsMenu.map((menu, index: any) => (
                  <li key={`${menu.label}_${index}`} className="lg:px-3 py-1.5">
                    <Link
                      target="_blank"
                      href={menu.url}
                      className={`${
                        pathname === menu.url && 'text-secondary'
                      } text-white/70 hover:text-secondary`}
                    >
                      <span className="font-medium text-base text-white/70 hover:text-white">
                        {menu.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid">
              <p className="lg:ml-3 font-bold text-base">Use Cases</p>
              <ul className="grid mt-5">
                {UsecasesMenu.map((menu, index: any) => (
                  <li key={`${menu.label}_${index}`} className="lg:px-3 py-1.5">
                    <Link
                      target="_blank"
                      href={menu.url}
                      className={`${
                        pathname === menu.url && 'text-secondary'
                      } text-white/70 hover:text-secondary`}
                    >
                      <span className="font-medium text-base text-white/70 hover:text-white">
                        {menu.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="grid">
              <p className="lg:ml-3 font-bold text-base">Partner With Us</p>
              <ul className="grid mt-5">
                {PartnershipMenu.map((menu, index: any) => (
                  <li key={`${menu.label}_${index}`} className="lg:px-3 py-1.5">
                    <Link
                      href={menu.url}
                      className={`${
                        pathname === menu.url && "text-secondary"
                      } text-white/70 hover:text-secondary`}
                    >
                      <span className="font-medium text-base text-white/70 hover:text-white">
                        {menu.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>

        <Row className="py-14 flex items-center justify-between border-t border-t-light-primary">
          <Col span={24} md={15} lg={15}>
            <div className="flex flex-wrap items-center gap-3 lg:gap-1">
              <Link href={`${WEB_URL}`} className="flex-shrink-0">
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
              <div className="flex mt-1 lg:mt-5">
                <Link
                  href="https://www.linkedin.com/company/betterbugs/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <div className="w-9 h-9 p-2 rounded-xl flex items-center justify-center cursor-pointer">
                    <LinkedinIcon className="text-white/60 hover:text-white" />
                  </div>
                </Link>
                <Link
                  href="https://twitter.com/BetterBugs"
                  target="_blank"
                  aria-label="Twitter"
                >
                  <div className="w-9 h-9 p-2 rounded-xl flex items-center justify-center cursor-pointer">
                    <TwitterIcon className="text-white/60 hover:text-white" />
                  </div>
                </Link>
                <Link
                  href="https://www.instagram.com/betterbugshq/"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <div className="w-9 h-9 p-2 rounded-xl flex items-center justify-center cursor-pointer">
                    <InstagramIcon className="text-white/60 hover:text-white" />
                  </div>
                </Link>
                <Link
                  href="https://www.youtube.com/@betterbugshq"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <div className="w-10 h-10 p-2 rounded-xl flex items-center justify-center cursor-pointer">
                    <YouTubeIcon className="text-white/60 hover:text-white !w-12 !h-12" />
                  </div>
                </Link>
                <Link
                  href="https://discord.com/invite/HF8XjwVtPh"
                  target="_blank"
                  aria-label="Discord"
                >
                  <div className="w-10 h-10 p-2 rounded-xl flex items-center justify-center cursor-pointer">
                    <DiscordIcon className="text-white/60 hover:text-white !w-12 !h-12" />
                  </div>
                </Link>
              </div>
            </div>
          </Col>
          <Col span={24} md={9} lg={9} className="lg:pt-6 md:pt-0 pt-3">
            <div className="flex md:items-center md:justify-end justify-between gap-2 md:gap-4">
              <p className="text-sm text-white/70 pl-2 md:text-base font-normal cursor-pointer whitespace-nowrap md:mt-0 mt-1.5">
                © {new Date().getFullYear()}, All Rights Reserved
              </p>
              <p className="text-sm text-white/70 md:text-base font-normal cursor-pointer">
                <iframe
                  src="https://status.betterbugs.io/badge?theme=dark"
                  width="200"
                  height="30"
                  frameBorder="0"
                  scrolling="no"
                ></iframe>
              </p>
            </div>
          </Col>
        </Row>
      </footer>
    </div>
  );
};

export default FooterComponent;
