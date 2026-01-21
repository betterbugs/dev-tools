'use client';
import { useSearchParams, usePathname } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
// import Intercom from '@intercom/messenger-js-sdk';
import Gleap from 'gleap';
import { initializePaddle, Paddle } from '@paddle/paddle-js';

export interface LayoutContextModel {
  collapsed: boolean;
  setCollapsed: (d: boolean) => void;
  scrollToSection: (d: string) => void;
  paddle: Paddle | undefined;
  setPaddle: (d: Paddle | undefined) => void;
  isClient: boolean;
}

const initialState: LayoutContextModel = {
  collapsed: false,
  setCollapsed: () => {},
  scrollToSection: (d: string) => {},
  paddle: undefined,
  setPaddle: () => {},
  isClient: false,
};

export const LayoutContext = createContext(initialState);

export const LayoutContextProvider = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);

  const [cookies, setCookie] = useCookies(['utm_source']);

  const searchParams = useSearchParams();
  const utmSource = searchParams.get('utm_source');
  const path = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [paddle, setPaddle] = useState<Paddle>();

  useEffect(() => {
    setIsClient(true);
    if (paddle?.Initialized) {
      paddle?.Update({
        token: process.env.PADDLE_CLIENT_TOKEN || '',
      });
    } else
      initializePaddle({
        token: process.env.PADDLE_CLIENT_TOKEN || '',
      }).then((paddleInstance: Paddle | undefined) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
        }
      });
  }, []);

  useEffect(() => {
    if (
      (path === '/nestify' || path.includes('development-tools')) &&
      Gleap.getInstance().initialized
    ) {
      Gleap.destroy();
    } else if (
      !Gleap.getInstance().initialized &&
      path !== '/nestify' &&
      !path.includes('development-tools')
    ) {
      Gleap.setUseCookies(true);
      Gleap.initialize(process.env.GLEAP_API_KEY || '');
    }
  }, [path, Gleap.getInstance().initialized]);

  useEffect(() => {
    if (utmSource) {
      const cookieExpirationDate = () => {
        const expirationDate = new Date();
        expirationDate.setTime(
          expirationDate.getTime() + 24 * 60 * 60 * 1000 * 7 * 2
        );
        return expirationDate;
      };
      setCookie('utm_source', utmSource?.replaceAll('"', ''), {
        path: '/',
        secure: false,
        httpOnly: false,
        expires: cookieExpirationDate(),
        domain: 'betterbugs.io',
      });
    }
  }, [utmSource]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId.slice(2));

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      const yOffset = -103;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <LayoutContext.Provider
      value={{
        collapsed,
        setCollapsed,
        scrollToSection,
        paddle,
        setPaddle,
        isClient,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};
