import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'what-is-my-isp',
  category: 'Category158',
  route: PATHS.WHAT_IS_MY_ISP,
  ...{
    hero_section: {
      title: 'What Is My ISP (Internet Service Provider)?',
      description:
        'Detect your Internet Service Provider instantly with our free online tool. Get detailed information about your ISP, IP address, location, and network details.',
    },
    development_tools_list: [
      { tool: 'What is my browser?', url: PATHS.WHAT_IS_MY_BROWSER },
      { tool: 'What is my user agent?', url: PATHS.WHAT_IS_MY_USER_AGENT },
      {
        tool: 'What is my local IP address?',
        url: PATHS.WHAT_IS_MY_LOCAL_IP_ADDRESS,
      },
      { tool: 'What is my browser size?', url: PATHS.WHATS_MY_BROWSER_SIZE },
      { tool: 'Internet speed test', url: PATHS.INTERNET_SPEED_TEST },
    ],
    development_tools_about_details: {
      about_title: 'What is ISP Detection?',
      about_description: [
        {
          description:
            'ISP detection is the process of identifying your Internet Service Provider based on your public IP address. This tool provides real-time information about your network connection.',
        },
        {
          description:
            'The tool automatically detects your ISP, IP address, location, and other network details to help you understand your internet connection better.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the ISP Detection Tool',
      guide_description:
        'Using our ISP detection tool is simple and automatic:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Automatic Detection',
          step_description:
            'The tool automatically detects your ISP information when you visit the page. No manual input required.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'View Results',
          step_description:
            'See your ISP name, IP address, organization, country, region, city, and timezone information displayed clearly.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy Information',
          step_description:
            "Use the 'Copy All Info' button to copy all your ISP details to your clipboard for easy sharing or documentation.",
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases for ISP Detection',
      how_use_description: 'ISP detection is useful for various purposes:',
      point: [
        {
          title: 'Network Troubleshooting',
          description:
            'Identify your ISP to troubleshoot connectivity issues, contact support, or verify your internet service provider.',
        },
        {
          title: 'Security Analysis',
          description:
            "Verify your network connection and ensure you're connected through your expected ISP for security purposes.",
        },
        {
          title: 'Geolocation Verification',
          description:
            'Check if your IP address location matches your physical location for privacy and security verification.',
        },
        {
          title: 'Development Testing',
          description:
            'Test how your application handles different ISPs and network conditions during development.',
        },
        {
          title: 'Content Delivery Optimization',
          description:
            'Understand your ISP to optimize content delivery and ensure proper CDN routing for better performance.',
        },
        {
          title: 'VPN Detection',
          description:
            "Verify if you're using a VPN or proxy by checking if your detected ISP matches your expected provider.",
        },
        {
          title: 'Network Documentation',
          description:
            'Document your network configuration and ISP details for IT management and network administration.',
        },
        {
          title: 'Compliance and Auditing',
          description:
            'Verify network connections for compliance requirements and security auditing purposes.',
        },
      ],
    },
    meta_data: {
      meta_title: 'What Is My ISP - Internet Service Provider Detection Tool',
      meta_description:
        'Detect your ISP instantly with our free online tool. Get your Internet Service Provider, IP address, location, and network details automatically.',
      og_title: 'What Is My ISP - Free ISP Detection Tool',
      og_description:
        'Find out your Internet Service Provider, IP address, and location with our instant detection tool.',
      og_image: '/images/og-images/Cover.png',
    },
  }
};
