import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'ip-to-hex',
  category: 'Category134',
  route: PATHS.IP_TO_HEX,
  ...{
    hero_section: {
      title: 'IP to Hex Converter',
      description:
        'Convert IP addresses into hexadecimal format instantly – perfect for developers, network engineers, and cybersecurity learners.',
    },
    development_tools_list: [
      { tool: 'Character Count Tool', url: PATHS.CHARACTER_COUNT_TOOL },
      { tool: 'Text Repeater', url: PATHS.TEXT_REPEATER },
      { tool: 'Text Cleaner', url: PATHS.TEXT_COMPARE },
      { tool: 'Word Counter', url: PATHS.WORD_COUNT_TOOL },
      { tool: 'Sort Words', url: PATHS.SORT_WORD },
      { tool: 'JavaScript Minifier', url: PATHS.JAVASCRIPT_MINIFIER },
      { tool: 'Line Count Tool', url: PATHS.LINE_COUNTER_TOOL },
    ],
    development_tools_about_details: {
      about_title: 'What is the IP to Hex Converter?',
      about_description: [
        {
          description:
            'The IP to Hex Converter converts IPv4 addresses (like 192.168.0.1) into their hexadecimal representations.',
        },
        {
          description:
            'It’s useful for networking, debugging, and understanding how IP addresses are stored in low-level systems.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the IP to Hex Converter',
      guide_description: 'Follow these simple steps:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Enter IP address:',
          step_description:
            'Type or paste the IPv4 address (e.g., 192.168.1.1) into the input box.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'Convert to hex:',
          step_description:
            'Click the convert button to instantly calculate the hexadecimal equivalent.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'View results:',
          step_description:
            'The tool will display the hexadecimal representation of the IP.',
        },
        {
          step_key: 'Step 4:',
          step_title: 'Copy or use:',
          step_description:
            'Copy the hex result for networking tasks, debugging, or documentation.',
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Common Uses',
      how_use_description: 'Why you might use this tool:',
      point: [
        {
          title: 'Networking',
          description:
            'Convert IPs to hex for use in low-level networking configurations or debugging.',
        },
        {
          title: 'Cybersecurity',
          description:
            'Analyze IP representations in hexadecimal for packet analysis or intrusion detection.',
        },
        {
          title: 'Learning',
          description:
            'Understand how IP addresses can be represented in different number systems.',
        },
      ],
    },
    meta_data: {
      meta_title: 'IP to Hex Converter – Convert IP Addresses Online',
      meta_description:
        'Easily convert IPv4 addresses into hexadecimal format. Perfect for developers, network engineers, and students.',
      og_title: 'IP to Hex Converter – Free Online Tool',
      og_description:
        'Quickly transform IP addresses into hex equivalents. Ideal for networking, cybersecurity, and debugging.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
