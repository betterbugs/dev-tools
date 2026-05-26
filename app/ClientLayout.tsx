'use client';
import { Suspense, useContext } from 'react';
import { CookiesProvider } from 'react-cookie';
import {
  LayoutContext,
  LayoutContextModel,
  LayoutContextProvider,
} from './contexts/layoutContexts';
import { ThemeProvider } from './contexts/themeContext';
import HeaderComponent from './components/layout/Header/headerComponent';
import FooterComponent from './components/layout/footer/footerComponent';
import CanonicalLink from './components/theme/canonicalLink/canonicalLink';
import { useMediaQuery } from 'react-responsive';
import dynamic from 'next/dynamic';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
});

const InnerContent = ({ children }: { children: React.ReactNode }) => {
  const { isClient }: LayoutContextModel = useContext(LayoutContext);
  const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  return (
    <div className="relative">
      {isClient && isDesktopOrLaptop && (
        <AnimatedCursor
          innerSize={8}
          outerSize={50}
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={3}
          color="0, 218, 146"
          showSystemCursor={true}
          clickables={[
            'a',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            'link',
            { target: '.custom' },
          ]}
        />
      )}
      <Suspense>
        <HeaderComponent />
      </Suspense>
      {children}
      <FooterComponent />
    </div>
  );
};

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense>
      <CookiesProvider>
        <LayoutContextProvider>
          <ThemeProvider>
            <CanonicalLink />
            <InnerContent>{children}</InnerContent>
          </ThemeProvider>
        </LayoutContextProvider>
      </CookiesProvider>
    </Suspense>
  );
};

export default ClientLayout;
