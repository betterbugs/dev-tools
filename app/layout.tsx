'use client';
import 'antd/dist/reset.css';
import './styles/global.scss';
import { Poppins } from 'next/font/google';
import HeaderComponent from './components/layout/Header/headerComponent';
import CanonicalLink from './components/theme/canonicalLink/canonicalLink';
import {
  LayoutContext,
  LayoutContextModel,
  LayoutContextProvider,
} from './contexts/layoutContexts';
import { ThemeProvider, useTheme } from './contexts/themeContext';
import FooterComponent from './components/layout/footer/footerComponent';
import AnimatedCursor from 'react-animated-cursor';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';
import { Suspense, useContext } from 'react';

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const MyApp = ({ children }: { children: JSX.Element }): JSX.Element => {
  const path = usePathname();
  const { isClient }: LayoutContextModel = useContext(LayoutContext);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <html lang="en">
      <head>
        <link rel="alternate" href="https://www.betterbugs.io/" />
        <link href="/favicon.ico" rel="icon" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <CanonicalLink />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Suspense>
          <LayoutContextProvider>
            <ThemeProvider>
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
                      {
                        target: '.custom',
                      },
                    ]}
                  />
                )}
                <Suspense>
                  <HeaderComponent />
                </Suspense>
                {children}
                <FooterComponent />
              </div>
            </ThemeProvider>
          </LayoutContextProvider>
        </Suspense>
      </body>
    </html>
  );
};
export default MyApp;
