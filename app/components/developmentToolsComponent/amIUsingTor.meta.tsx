import { PATHS } from '@/app/libs/paths';
import React from 'react';

export const meta = {
  slug: 'am-i-using-tor',
  category: 'Category159',
  route: PATHS.AM_I_USING_TOR,
  ...{
    hero_section: {
      title: 'Am I Using Tor?',
      description:
        "Detect if you're using Tor (The Onion Router) with our comprehensive detection tool. Check your anonymity status and verify your Tor connection instantly.",
    },
    development_tools_list: [
      { tool: 'What is my browser?', url: PATHS.WHAT_IS_MY_BROWSER },
      { tool: 'What is my user agent?', url: PATHS.WHAT_IS_MY_USER_AGENT },
      { tool: 'What is my ISP?', url: PATHS.WHAT_IS_MY_ISP },
      {
        tool: 'What is my local IP address?',
        url: PATHS.WHAT_IS_MY_LOCAL_IP_ADDRESS,
      },
      { tool: 'Internet speed test', url: PATHS.INTERNET_SPEED_TEST },
    ],
    development_tools_about_details: {
      about_title: 'What is Tor Detection?',
      about_description: [
        {
          description:
            "Tor detection is the process of determining whether you're using the Tor network for anonymous browsing. This tool uses multiple methods to verify your Tor connection status.",
        },
        {
          description:
            'The tool checks for Tor exit nodes, browser signatures, and other indicators to provide accurate detection of Tor usage with confidence levels.',
        },
      ],
    },
    development_tools_steps_guide: {
      guide_title: 'How to Use the Tor Detection Tool',
      guide_description:
        'Using our Tor detection tool is automatic and comprehensive:',
      steps: [
        {
          step_key: 'Step 1:',
          step_title: 'Automatic Detection',
          step_description:
            'The tool automatically runs multiple detection methods when you visit the page, including IP verification and browser analysis.',
        },
        {
          step_key: 'Step 2:',
          step_title: 'View Results',
          step_description:
            'See your Tor status (YES/NO), confidence level, and detailed explanation of how the detection was performed.',
        },
        {
          step_key: 'Step 3:',
          step_title: 'Copy Results',
          step_description:
            "Use the 'Copy Result' button to save your detection results for documentation or sharing purposes.",
        },
      ],
    },
    development_tools_how_use: {
      how_use_title: 'Use Cases for Tor Detection',
      how_use_description:
        'Tor detection is useful for various privacy and security purposes:',
      point: [
        {
          title: 'Privacy Verification',
          description:
            'Verify that your Tor browser is working correctly and your traffic is being routed through the Tor network.',
        },
        {
          title: 'Security Auditing',
          description:
            'Check if your anonymous browsing setup is functioning properly for security and privacy audits.',
        },
        {
          title: 'Network Troubleshooting',
          description:
            'Diagnose Tor connection issues and verify that your anonymity is being maintained.',
        },
        {
          title: 'Research and Development',
          description:
            'Test Tor detection methods and understand how different anonymity tools work in practice.',
        },
        {
          title: 'Educational Purposes',
          description:
            'Learn about Tor network operation and how anonymity detection works for educational purposes.',
        },
        {
          title: 'Compliance Verification',
          description:
            "Verify that your organization's privacy policies are being followed when using Tor for sensitive operations.",
        },
        {
          title: 'Penetration Testing',
          description:
            'Test security measures and verify that Tor usage is properly detected in security assessments.',
        },
        {
          title: 'Digital Forensics',
          description:
            'Understand Tor detection methods for digital forensics and cybersecurity investigations.',
        },
      ],
    },
    meta_data: {
      meta_title: 'Am I Using Tor? - Tor Detection Tool',
      meta_description:
        "Detect if you're using Tor with our comprehensive detection tool. Check your anonymity status, verify Tor connection, and understand your privacy level.",
      og_title: 'Am I Using Tor? - Free Tor Detection Tool',
      og_description:
        "Find out if you're using Tor with our instant detection tool. Verify your anonymity and privacy status.",
      og_image: '/images/og-images/Cover.png',
    },
  }
};
