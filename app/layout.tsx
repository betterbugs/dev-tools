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
import { ThemeProvider } from './contexts/themeContext';
import FooterComponent from './components/layout/footer/footerComponent';
import { useMediaQuery } from 'react-responsive';
import { Suspense, useContext } from 'react';
import { CookiesProvider } from 'react-cookie';
import Script from 'next/script';
import dynamic from 'next/dynamic';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), {
  ssr: false,
});

const inter = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const MyApp = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { isClient }: LayoutContextModel = useContext(LayoutContext);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  return (
    <html lang="en" className="dark" data-theme="dark">
      <head>
        <meta
          name="google-site-verification"
          content="MdnRMoBETw7d7ltRJoXu8nAIg6ah5iUdVXpNp_fFGH8"
        />

        <Script src="https://cdn.jsdelivr.net/npm/@betterbugs/web-sdk@0.0.29/recorder.js"></Script>
        {process.env.NEXT_ENV === 'PRODUCTION' && (
          <>
            <script
              type="text/javascript"
              async
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
window.gtag =
  window.gtag ||
  function () {
    window.dataLayer.push(arguments);
  };
                window.gtag('consent', 'default', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
          wait_for_update: 500,
        });
                `,
              }}
            ></script>
            <Script
              async
              type="text/javascript"
              src="https://cdn.kiprotect.com/klaro/v0.7.22/klaro.js"
            ></Script>
            <Script async src="/klaro-config.js"></Script>
            <script
              type="text/javascript"
              async
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K4CX85BZ');`,
              }}
            />
            <script
              type="text/javascript"
              async
              dangerouslySetInnerHTML={{
                __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('${process.env.POSTHOG_API_KEY}', {
                  api_host:'https://us.i.posthog.com',
                  person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
              })`,
              }}
            />
            <script
              id="schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: `
        {
          "@context": "https://schema.org",
            "@type": "Organization",
            "name": "BetterBugs",
            "alternateName": "BetterBugs",
            "url": "https://www.betterbugs.io/",
            "logo": "https://www.betterbugs.io/images/bb-logo.svg",
            "sameAs": [
              "https://twitter.com/BetterBugs",
              "https://www.instagram.com/betterbugshq/",
              "https://www.linkedin.com/company/betterbugs/"
            ]
        }`,
              }}
            />
            <script
              id="schema"
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: `
        {
          "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "BetterBugs",
            "alternateName": "BetterBugs",
            "image": "",
            "@id": "",
            "url": "https://www.betterbugs.io/",
            "telephone": ""
        }`,
              }}
            />
          </>
        )}
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
          <CookiesProvider>
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
          </CookiesProvider>
        </Suspense>
      </body>
    </html>
  );
};
export default MyApp;
