declare global {
  interface Window {
    dataLayer?: any[];
  }
}

// This app is served at betterbugs.io/development-tools via a rewrite proxy,
// so it shares cookies with the marketing site and bb-app on *.betterbugs.io.
const BB_UID_COOKIE = 'bb_uid';

const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return match ? decodeURIComponent(match[1]) : undefined;
};

export const trackEvent = (event: string, params: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return;
  const userId = getCookie(BB_UID_COOKIE);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
    user_id: userId || undefined,
    user_type: userId ? 'logged_in' : 'guest',
  });
};

// Every page in this app is a development-tools page per the GA4 schema
// (page_type: home_page, development_tools, etc.) — no per-route derivation
// needed like on the marketing site.
export const PAGE_TYPE = 'development_tools';

export const PLATFORM = {
  desktop: 'd-web',
  mobile: 'm-web',
} as const;

// For components with no separate desktop/mobile markup, resolve platform
// from viewport width at click time (md breakpoint = 768px, matches Tailwind's `md:`).
export const getRuntimePlatform = (): string => {
  if (typeof window === 'undefined') return PLATFORM.desktop;
  return window.innerWidth < 768 ? PLATFORM.mobile : PLATFORM.desktop;
};

// Shared tracker for header nav / dropdown links.
export const trackNavInteraction = (
  variant: 'desktop' | 'mobile',
  params: {
    sectionName: string;
    subSectionName?: string;
    ctaText: string;
    destinationUrl: string;
  }
) => {
  trackEvent(
    variant === 'desktop' ? 'navigation_interaction' : 'hamburger_menu_interaction',
    {
      page_type: PAGE_TYPE,
      platform: variant === 'desktop' ? PLATFORM.desktop : PLATFORM.mobile,
      section_name: params.sectionName,
      sub_section_name: params.subSectionName ?? 'NA',
      cta_text: params.ctaText,
      destination_url: params.destinationUrl,
    }
  );
};

// Shared trackers for the footer.
export const trackFooterInteraction = (
  sectionName: string,
  ctaText: string,
  destinationUrl: string
) =>
  trackEvent('footer_interaction', {
    page_type: PAGE_TYPE,
    platform: getRuntimePlatform(),
    section_name: sectionName,
    cta_text: ctaText,
    destination_url: destinationUrl,
  });

export const trackSocialInteraction = (ctaText: string) =>
  trackEvent('social_interaction', {
    page_type: PAGE_TYPE,
    platform: getRuntimePlatform(),
    cta_text: ctaText,
  });
