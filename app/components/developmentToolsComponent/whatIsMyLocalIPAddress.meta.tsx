import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-is-my-local-ip-address',
  category: 'Category148',
  route: PATHS.WHAT_IS_MY_LOCAL_IP_ADDRESS,
  ...{
    hero_section: {
      title: 'What Is My Local IP Address',
      description:
        'Find your local IPv4/IPv6 addresses using a privacy-friendly WebRTC technique.',
    },
    development_tools_list: [
      { tool: 'What is My IP Address', url: PATHS.WHAT_IS_MY_USER_AGENT },
      { tool: 'IP to Hex', url: PATHS.IP_TO_HEX },
      { tool: 'JSON Viewer', url: PATHS.JSON_PRETTIFIER },
    ],
    development_tools_about_details: {
      about_title: 'What does this tool do?',
      about_description: [
        {
          description:
            'It attempts to discover local network IPs exposed by ICE candidates and SDP while establishing a dummy peer connection.',
        },
        {
          description:
            'Some browsers and networks restrict access to local IPs. Results may vary and can be empty.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to use',
      guide_description: 'Simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Open page:',
          step_description: 'The scan starts automatically.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Rescan:',
          step_description:
            'Click Rescan if you change networks or want to refresh.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy:',
          step_description: 'Copy all detected IPs for sharing or debugging.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Useful for:',
      point: [
        {
          title: 'Debugging',
          description: 'Quickly check local IPs when testing LAN apps.',
        },
        {
          title: 'Networking',
          description: 'Confirm whether IPv6 is active on your environment.',
        },
        {
          title: 'Demos',
          description: 'Show how ICE candidates reveal local endpoints.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What Is My Local IP Address – Detect IPv4/IPv6',
      meta_description:
        'Discover local IPv4 and IPv6 addresses via WebRTC ICE candidates. Works in modern browsers with privacy caveats.',
      og_title: 'What Is My Local IP Address – Free Online Tool',
      og_description:
        'Find local IPs fast. Copy results and rescan. May be limited by browser privacy settings.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
