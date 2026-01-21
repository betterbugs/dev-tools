/*
By default, Klaro will load the config from a global 'klaroConfig' variable. You
can change this by specifying the 'data-klaro-config' attribute on your script:
<script src="klaro.js" data-klaro-config="myConfigVariableName"
*/
// Ensure dataLayer & gtag shim exist early for Google Consent Mode (v2)

var klaroConfig = {
  version: 1,
  cookieExpiresAfterDays: 60,
  name: 'default',
  status: 'active',
  id: '96d0c31266eae7153471b9a874330359',
  elementID: 'klaro',
  storageMethod: 'cookie',
  cookieName: 'klaro',
  lang: 'zz',
  languages: ['en'],
  hideToggleAll: false,
  htmlTexts: true,
  showDescriptionEmptyStore: false,
  embedded: false,
  groupByPurpose: true,
  purposeOrder: [
    'performance',
    'analytics',
    'marketing',
    'advertising',
    'livechat',
  ],
  default: false,
  mustConsent: false,
  disablePoweredBy: true,
  acceptAll: true,
  hideDeclineAll: false,
  noticeAsModal: false,
  translations: {
    zz: {
      purposes: {
        advertising: {},
        analytics: {},
        marketing: {},
        performance: {},
      },
    },
    en: {
      consentNotice: {
        description:
          'We use <b>analytics and other necessary</b> cookies. Manage or withdraw consent anytime.',
        learnMore: 'Manage cookies',
      },
      decline: 'Decline',
      ok: 'Accept',
      purposes: {
        advertising: {},
        marketing: {},
        performance: {},
        analytics: {
          description:
            'These help us understand how our website is used and improve performance. We only collect anonymous or aggregated data.',
        },
        necessary: {
          description:
            'These cookies are essential for the website to function properly. They enable basic features like navigation and secure access.',
        },
      },
    },
  },
  styling: {
    theme: ['bottom', 'left'],
  },
  services: [
    {
      name: 'google-analytics',
      title: 'Google Analytics 4',
      purposes: ['analytics'],
      cookies: [/^_ga(_.*)?$/, /^_gid$/, /^_gat(_.*)?$/],
      required: false,
      optOut: false,
      onlyOnce: true,
      onAccept: `window.gtag && window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
      window.gtag && window.gtag('event', 'consent_updated');
      `,
      onDecline: `window.gtag && window.gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      window.gtag && window.gtag('event', 'consent_updated');
      `,
      translations: {
        en: {
          description:
            'Measures website traffic and usage patterns to help us improve the site experience.',
        },
        zz: {
          cookieDetailsUrl:
            'https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage',
          privacyPolicyUrl: 'https://policies.google.com/privacy?hl={lang}',
          title: 'Google Analytics',
        },
      },
    },
    {
      name: 'clarity',
      title: 'Microsoft Clarity',
      purposes: ['analytics'],
      cookies: [
        /^_clck$/,
        /^_clsk$/,
        /^CLID$/,
        /^ANONCHK$/,
        /^MR$/,
        /^MUID$/,
        /^SM$/,
      ],
      required: false,
      optOut: false,
      onlyOnce: true,
      onAccept: `window.gtag && window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
      window.gtag && window.gtag('event', 'consent_updated');
      `,
      onDecline: `window.gtag && window.gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
      window.gtag && window.gtag('event', 'consent_updated');
      `,
      translations: {
        en: {
          description:
            'Captures anonymized session interactions (like clicks or scrolls) to analyze usability and design performance.',
        },
        zz: {
          cookieDetailsUrl: 'https://clarity.microsoft.com/privacy',
        },
      },
    },
    {
      name: 'posthog',
      title: 'PostHog',
      purposes: ['analytics'],
      cookies: [/^ph(_.*)?$/],
      required: false,
      optOut: false,
      onlyOnce: true,
      onAccept: `window.posthog?.opt_in_capturing();`,
      onDecline: `window.posthog?.opt_out_capturing();`,
      translations: {
        en: {
          description:
            'Tracks feature usage and product behavior to help us enhance user experience.',
        },
        zz: {
          cookieDetailsUrl: 'https://posthog.com/privacy',
        },
      },
    },
    {
      name: 'paddle',
      title: 'Paddle',
      required: true,
      purposes: ['necessary'],
      translations: {
        en: {
          description:
            'Handles secure payments, subscriptions, and licensing. Required for transactions to work correctly.',
        },
        zz: {
          cookieDetailsUrl: 'https://www.paddle.com/legal/privacy',
        },
      },
    },
    {
      name: 'gleap',
      title: 'Gleap',
      required: true,
      purposes: ['necessary'],
      translations: {
        en: {
          description:
            'Provides in-app support. Helps us respond to issues and improve your experience.',
        },
        zz: {
          cookieDetailsUrl: 'https://www.gleap.io/legal/privacy-policy',
        },
      },
    },
  ],
};

window.europeanRegionCountryCodes = [
  // EEA countries (EU + EFTA)
  'AT', // Austria
  'BE', // Belgium
  'BG', // Bulgaria
  'HR', // Croatia
  'CY', // Cyprus
  'CZ', // Czech Republic
  'DK', // Denmark
  'EE', // Estonia
  'FI', // Finland
  'FR', // France
  'DE', // Germany
  'GR', // Greece
  'HU', // Hungary
  'IS', // Iceland
  'IE', // Ireland
  'IT', // Italy
  'LV', // Latvia
  'LI', // Liechtenstein
  'LT', // Lithuania
  'LU', // Luxembourg
  'MT', // Malta
  'NL', // Netherlands
  'NO', // Norway
  'PL', // Poland
  'PT', // Portugal
  'RO', // Romania
  'SK', // Slovakia
  'SI', // Slovenia
  'ES', // Spain
  'SE', // Sweden

  // Plus UK and Switzerland
  'GB', // United Kingdom
  'CH', // Switzerland
];

(async () => {
  try {
    const response = await fetch('/api/get-geo-location');
    if (!response.ok) {
      console.warn(
        'Failed to fetch geo location:',
        response.status,
        response.statusText
      );
      // Set strict defaults (denied) prior to any vendor loading
      if (window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          wait_for_update: 500,
        });
        window.gtag('event', 'consent_updated');
      }
      klaroConfig = null;
    }
    const data = await response.json();
    if (data?.geo?.country) {
      window.isEU = europeanRegionCountryCodes.includes(data.geo.country);
      if (window.isEU) {
        // Set strict defaults (denied) prior to any vendor loading
        window.klaroConfig = klaroConfig;
        window.klaro.setup(klaroConfig);
      } else {
        // Set strict defaults (denied) prior to any vendor loading
        if (window.gtag) {
          window.gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            wait_for_update: 500,
          });
          window.gtag('event', 'consent_updated');
        }
        klaroConfig = null;
      }
    } else {
      // Set strict defaults (denied) prior to any vendor loading
      if (window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          wait_for_update: 500,
        });
        window.gtag('event', 'consent_updated');
      }
      klaroConfig = null;
    }
  } catch (error) {
    // Set strict defaults (denied) prior to any vendor loading
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      wait_for_update: 500,
    });
    klaroConfig = null;
  }
})();
